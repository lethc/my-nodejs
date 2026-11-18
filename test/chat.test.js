const test = require('node:test')
const assert = require('node:assert/strict')
const register = require('../socket')

function fixture(overrides = {}) {
    const documents = [], broadcasts = []
    let onConnection
    const messageService = {
        async create(data) {documents.push({...data}); return data},
        async getAll() {return [...documents]},
        async getRecent(limit) {return documents.slice(-limit)}
    }
    const openRouterService = {isConfigured: () => true, reply: async () => 'Respuesta de prueba'}
    Object.assign(messageService, overrides.messageService)
    Object.assign(openRouterService, overrides.openRouterService)
    const io = {on(event, handler) {onConnection = handler}, emit(event, data) {broadcasts.push({event, data})}}
    register(io, {messageService, openRouterService})
    const socket = {events: [], handlers: {}, on(event, cb) {this.handlers[event] = cb}, emit(event, data) {this.events.push({event, data})}, broadcast: {emit() {}}}
    return {documents, broadcasts, socket, connect: () => onConnection(socket)}
}

test('guarda usuario y asistente, y transmite el historial final', async () => {
    const f = fixture({openRouterService: {reply: async history => {
        assert.deepEqual(history, [{username: 'Ana', message: 'Hola', role: 'user'}])
        return 'Hola Ana'
    }}})
    await f.connect()
    let result
    await f.socket.handlers['new-message']({username: ' Ana ', message: ' Hola ', role: 'assistant'}, value => {result = value})
    assert.equal(result.ok, true)
    assert.deepEqual(f.documents, [
        {username: 'Ana', message: 'Hola', role: 'user'},
        {username: 'OpenRouter', message: 'Hola Ana', role: 'assistant'}
    ])
    assert.equal(f.broadcasts.filter(event => event.event === 'all-messages').at(-1).data.length, 2)
    assert.deepEqual(f.broadcasts.at(-1), {event: 'bot-status', data: {busy: false}})
})

test('no consume cuota ni escribe si falta clave o el mensaje es invalido', async () => {
    const f = fixture({openRouterService: {isConfigured: () => false, reply: () => assert.fail('No debe generar')}})
    await f.connect()
    for (const data of [{username: 'Ana', message: 'Hola'}, {username: ' ', message: ' '}, {username: 'Ana', message: 'a'.repeat(4001)}]) {
        let result
        await f.socket.handlers['new-message'](data, value => {result = value})
        assert.equal(result.saved, false)
    }
    assert.equal(f.documents.length, 0)
})

test('si OpenRouter falla conserva la pregunta y no inventa una respuesta', async () => {
    const f = fixture({openRouterService: {reply: async () => {throw new Error('Cuota agotada')}}})
    await f.connect()
    let result
    await f.socket.handlers['new-message']({username: 'Ana', message: 'Hola'}, value => {result = value})
    assert.equal(result.ok, false)
    assert.equal(result.saved, true)
    assert.match(result.error, /guardado.*Cuota agotada/)
    assert.equal(f.documents.length, 1)
    assert.equal(f.socket.events.at(-1).event, 'chat-error')
})

test('si MongoDB falla no consulta OpenRouter y no confirma el guardado', async () => {
    const f = fixture({messageService: {create: async () => {throw new Error('DB interna')}}, openRouterService: {reply: () => assert.fail('No debe generar')}})
    await f.connect()
    let result
    await f.socket.handlers['new-message']({username: 'Ana', message: 'Hola'}, value => {result = value})
    assert.equal(result.saved, false)
    assert.match(result.error, /MongoDB/)
    assert.ok(!result.error.includes('DB interna'))
})

test('rechaza preguntas simultaneas para no mezclar turnos en la sala', async () => {
    let finish, started
    const entered = new Promise(resolve => {started = resolve})
    const f = fixture({openRouterService: {reply: () => {started(); return new Promise(resolve => {finish = resolve})}}})
    await f.connect()
    const first = f.socket.handlers['new-message']({username: 'Ana', message: 'Uno'})
    await entered
    let second
    await f.socket.handlers['new-message']({username: 'Luis', message: 'Dos'}, value => {second = value})
    assert.equal(second.saved, false)
    assert.match(second.error, /otra pregunta/)
    finish('Respuesta')
    await first
    assert.equal(f.documents.filter(document => document.role === 'user').length, 1)
})
