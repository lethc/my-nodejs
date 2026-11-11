// Lógica de panel.html: consulta el endpoint protegido /dashboard enviando el JWT.

const resultado = document.getElementById('resultado')
const mensaje = document.getElementById('mensaje')
const btnSalir = document.getElementById('btnSalir')

// Borra el token y vuelve a la pantalla de login
function cerrarSesion() {
    localStorage.removeItem('token')
    window.location.href = '/login.html'
}

async function cargarDashboard() {
    const token = localStorage.getItem('token')

    // Sin token no hay sesión: se redirige sin llamar a la API
    if (!token) {
        cerrarSesion()
        return
    }

    try {
        const respuesta = await fetch('/dashboard', {
            // verifyToken espera el formato "Authorization: Bearer <token>"
            headers: { 'Authorization': 'Bearer ' + token }
        })

        // 401: token inválido o alterado, por lo que la sesión ya no sirve
        if (respuesta.status === 401) {
            cerrarSesion()
            return
        }

        // La ruta responde texto plano, p. ej. "Dashboard.Usuariocorreo@dominio"
        resultado.textContent = await respuesta.text()
    } catch (error) {
        resultado.textContent = ''
        mensaje.textContent = 'No se pudo conectar con el servidor'
    }
}

btnSalir.addEventListener('click', cerrarSesion)
cargarDashboard()
