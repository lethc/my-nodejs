const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ejs = require('ejs')

function view() {
    const html = ejs.render(fs.readFileSync(path.join(__dirname, '../views/index.ejs'), 'utf8'), {title: 'Chat'})
    const callbacks = {}, sends = []
    const elements = Object.fromEntries(['username', 'writeMessage', 'writing', 'messages', 'botStatus'].map(id => [id, {
        value: '', textContent: '', children: [], handlers: {}, scrollHeight: 100,
        addEventListener(event, handler) {this.handlers[event] = handler},
        replaceChildren() {this.children = []}, appendChild(child) {this.children.push(child)}, focus() {}
    }]))
    const socket = {connected: true, on(event, handler) {callbacks[event] = handler}, timeout() {return this}, emit(event, data, acknowledge) {sends.push({event, data, acknowledge})}}
    vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1], {
        io: () => socket, document: {getElementById: id => elements[id], createElement: () => ({})},
        clearTimeout() {}, setTimeout() {}, alert() {}
    })
    elements.username.value = 'Ana'
    elements.writeMessage.value = 'Hola'
    return {elements, sends, callbacks}
}

test('no borra el texto antes de confirmar el guardado ni si es rechazado', () => {
    const v = view()
    v.elements.writeMessage.handlers.keydown({key: 'Enter', preventDefault() {}})
    assert.equal(v.elements.writeMessage.value, 'Hola')
    assert.equal(v.elements.writeMessage.disabled, true)
    v.sends[0].acknowledge(null, {ok: false, saved: false, error: 'Falta clave'})
    assert.equal(v.elements.writeMessage.value, 'Hola')
    assert.equal(v.elements.writeMessage.disabled, false)
    assert.equal(v.elements.writing.textContent, 'Falta clave')
})

test('limpia el texto si quedo guardado y distingue respuestas del asistente', () => {
    const v = view()
    v.elements.writeMessage.handlers.keydown({key: 'Enter', preventDefault() {}})
    v.sends[0].acknowledge(null, {ok: true, saved: true})
    assert.equal(v.elements.writeMessage.value, '')
    v.callbacks['all-messages']([{username: 'Asistente Virtual', message: '<b>Hola</b>', role: 'assistant'}])
    assert.equal(v.elements.messages.children[0].textContent, 'Asistente Virtual:<b>Hola</b>')
    assert.equal(v.elements.messages.children[0].className, 'message message--assistant')
    v.callbacks['bot-status']({busy: true})
    assert.equal(v.elements.botStatus.textContent, 'Asistente Virtual está pensando...')
})
