const test = require('node:test')
const assert = require('node:assert/strict')
const presentMessages = require('../services/messagePresenter')

test('convierte negritas, cursivas, listas y codigo sin modificar el texto original', async () => {
    const markdown = '**Negrita**, *cursiva* y `codigo`\n\n- Uno\n- Dos\n\n```js\nconst a = 1\n```'
    const document = {username: 'Asistente Virtual', role: 'assistant', message: markdown}
    const [result] = await presentMessages([document])
    assert.match(result.html, /<strong>Negrita<\/strong>/)
    assert.match(result.html, /<em>cursiva<\/em>/)
    assert.match(result.html, /<ul>[\s\S]*<li>Uno<\/li>/)
    assert.match(result.html, /<pre><code>const a = 1/)
    assert.equal(result.message, markdown)
    assert.equal(document.html, undefined)
})

test('filtra scripts, eventos, imagenes y protocolos peligrosos', async () => {
    const [result] = await presentMessages([{role: 'assistant', message: '<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n<a href="javascript:alert(1)" onclick="alert(1)">Enlace</a>\n\n[Seguro](https://example.com)'}])
    assert.ok(!/<script|<img|onerror|onclick|javascript:/i.test(result.html))
    assert.match(result.html, /href="https:\/\/example.com"/)
})

test('no interpreta Markdown ni acepta HTML precalculado de usuarios', async () => {
    const [result] = await presentMessages([{username: '<b>Ana</b>', message: '**Hola** <img src=x>', html: '<script>malicioso</script>'}])
    assert.equal(result.role, 'user')
    assert.equal(result.message, '**Hola** <img src=x>')
    assert.equal(result.html, undefined)
})

test('conserva saltos y renderiza mensajes almacenados del asistente', async () => {
    const [result] = await presentMessages([{_id: {toString: () => 'id'}, role: 'assistant', message: 'Uno\nDos'}])
    assert.equal(result._id, 'id')
    assert.match(result.html, /Uno<br\s*\/?>Dos/)
})
