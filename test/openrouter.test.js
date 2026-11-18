const test = require('node:test')
const assert = require('node:assert/strict')
const OpenRouterService = require('../services/openRouterService')

const history = [{username: 'Prueba', message: 'Hola', role: 'user'}]
const success = content => ({ok: true, json: async () => ({choices: [{finish_reason: 'stop', message: {role: 'assistant', content}}]})})

test('sin clave no se realiza ninguna solicitud', async () => {
    const service = new OpenRouterService({apiKey: '', fetchImpl: () => assert.fail('No debe llamar al proveedor')})
    await assert.rejects(service.reply(history), /OPENROUTER_API_KEY/)
})

test('usa Chat Completions, autenticacion Bearer y roles de conversacion', async () => {
    const service = new OpenRouterService({apiKey: 'clave-de-prueba', model: 'openrouter/free', fetchImpl: async (url, request) => {
        assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions')
        assert.ok(!url.includes('clave-de-prueba'))
        assert.equal(request.headers.Authorization, 'Bearer clave-de-prueba')
        const body = JSON.parse(request.body)
        assert.equal(body.model, 'openrouter/free')
        assert.equal(body.messages[0].role, 'system')
        assert.equal(body.messages[1].role, 'user')
        assert.equal(body.messages[2].role, 'assistant')
        assert.equal(body.messages[3].content, 'Prueba: Dame un ejemplo')
        assert.equal(body.max_tokens, 1024)
        assert.equal(body.stream, false)
        return success('Un ejemplo sencillo.')
    }})
    const answer = await service.reply([...history, {role: 'assistant', message: 'Hola'}, {username: 'Prueba', message: 'Dame un ejemplo'}])
    assert.equal(answer, 'Un ejemplo sencillo.')
})

test('acota el contexto y agrupa turnos consecutivos del mismo rol', async () => {
    const service = new OpenRouterService({apiKey: 'prueba', fetchImpl: async (url, request) => {
        const messages = JSON.parse(request.body).messages
        assert.equal(messages.length, 2)
        assert.equal(messages[1].content.split('\n').length, 20)
        assert.ok(messages[1].content.startsWith('Prueba: 5\n'))
        return success('Respuesta')
    }})
    await service.reply(Array.from({length: 25}, (_, i) => ({username: 'Prueba', message: String(i)})))
})

test('acepta un identificador con proveedor y sufijo gratuito', async () => {
    const service = new OpenRouterService({apiKey: 'prueba', model: 'proveedor/modelo:free', fetchImpl: async (url, request) => {
        assert.equal(JSON.parse(request.body).model, 'proveedor/modelo:free')
        return success('Respuesta')
    }})
    assert.equal(await service.reply(history), 'Respuesta')
})

for (const [status, expected] of [[400, /rechazo/], [401, /API key/], [402, /creditos/], [403, /permisos/], [404, /OPENROUTER_MODEL/], [429, /cuota/], [503, /disponible/]]) {
    test(`error HTTP ${status} sin exponer el cuerpo del proveedor`, async () => {
        const service = new OpenRouterService({apiKey: 'prueba', fetchImpl: async () => ({ok: false, status, json: () => assert.fail('No leer errores del proveedor')})})
        await assert.rejects(service.reply(history), expected)
    })
}

test('maneja errores de proveedor dentro de HTTP 200 sin exponer detalles', async () => {
    const service = new OpenRouterService({apiKey: 'prueba', fetchImpl: async () => ({ok: true, json: async () => ({error: {code: 429, message: 'Contenido privado'}})})})
    await assert.rejects(service.reply(history), error => /cuota/.test(error.message) && !error.message.includes('Contenido privado'))
})

test('timeout y errores de red producen mensajes claros', async () => {
    for (const [error, expected] of [[Object.assign(new Error('interno'), {name: 'TimeoutError'}), /demasiado/], [new TypeError('interno'), /Internet/]]) {
        const service = new OpenRouterService({apiKey: 'prueba', fetchImpl: async () => {throw error}})
        await assert.rejects(service.reply(history), expected)
    }
})

test('no guarda como respuesta una salida vacia o bloqueada', async () => {
    for (const body of [{}, {choices: [{finish_reason: 'content_filter', message: {content: 'No mostrar'}}]}, {choices: [{message: {refusal: 'No permitido', content: 'No mostrar'}}]}]) {
        const service = new OpenRouterService({apiKey: 'prueba', fetchImpl: async () => ({ok: true, json: async () => body})})
        await assert.rejects(service.reply(history), /no (devolvio|pudo responder)/)
    }
})

test('extrae solo texto visible y omite campos de razonamiento', async () => {
    const service = new OpenRouterService({apiKey: 'prueba', fetchImpl: async () => ({ok: true, json: async () => ({choices: [{message: {
        reasoning: 'No mostrar', content: [{type: 'text', text: 'Hola'}, {type: 'image_url'}, {type: 'text', text: ' mundo'}]
    }}]})})})
    assert.equal(await service.reply(history), 'Hola mundo')
})
