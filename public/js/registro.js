// Lógica de registro.html: valida el formulario y registra el usuario con POST /auth/register.

const formRegistro = document.getElementById('formRegistro')
const mensaje = document.getElementById('mensaje')
const btnRegistrar = document.getElementById('btnRegistrar')

// Muestra un texto debajo del formulario; "exito" lo pinta en verde en lugar de rojo
function mostrarMensaje(texto, exito = false) {
    mensaje.textContent = texto
    mensaje.classList.toggle('exito', exito)
}

formRegistro.addEventListener('submit', async (evento) => {
    // Evita que el navegador recargue la página al enviar el formulario
    evento.preventDefault()
    mostrarMensaje('')

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmar = document.getElementById('confirmar').value

    // Esta comprobación solo existe en el frontend: la API recibe únicamente email y password
    if (password !== confirmar) {
        mostrarMensaje('Las contraseñas no coinciden')
        return
    }

    btnRegistrar.disabled = true

    try {
        const respuesta = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        // La API responde JSON: { message } si salió bien, { error } si falló
        const datos = await respuesta.json()

        if (!respuesta.ok) {
            mostrarMensaje(datos.error || datos.message || 'No se pudo registrar el usuario')
            return
        }

        mostrarMensaje(datos.message + '. Redirigiendo al login...', true)
        formRegistro.reset()
        // Pausa breve para que el usuario alcance a leer el aviso
        setTimeout(() => { window.location.href = '/login.html' }, 1500)
    } catch (error) {
        mostrarMensaje('No se pudo conectar con el servidor')
    } finally {
        // Se reactiva el botón tanto si salió bien como si falló
        btnRegistrar.disabled = false
    }
})
