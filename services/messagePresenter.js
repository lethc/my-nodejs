const sanitizeHtml = require('sanitize-html')

// El Markdown se convierte solo para mostrarlo; MongoDB conserva el texto original.
async function presentMessages(documents) {
    const {marked} = await import('marked')
    return documents.map(document => {
        const message = {
            _id: document._id?.toString(),
            username: document.username,
            message: document.message,
            role: document.role || 'user'
        }
        if (message.role === 'assistant') {
            const html = marked.parse(message.message, {gfm: true, breaks: true, async: false})
            // Lista cerrada de etiquetas: permite formato, pero no scripts, imagenes ni formularios.
            message.html = sanitizeHtml(html, {
                allowedTags: ['p', 'br', 'strong', 'em', 'del', 'ul', 'ol', 'li', 'blockquote',
                    'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'a',
                    'table', 'thead', 'tbody', 'tr', 'th', 'td'],
                allowedAttributes: {a: ['href', 'title'], ol: ['start']},
                allowedSchemes: ['http', 'https', 'mailto'],
                allowProtocolRelative: false
            })
        }
        return message
    })
}

module.exports = presentMessages
