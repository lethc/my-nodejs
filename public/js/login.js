// Lógica de login.html: envía las credenciales a la API y guarda el JWT recibido.

const formLogin = document.getElementById('formLogin')
const mensaje = document.getElementById('mensaje')
const btnIngresar = document.getElementById('btnIngresar')

// Si ya hay un token guardado, no tiene sentido mostrar el login otra vez
if (localStorage.getItem('token')) {
    window.location.href = '/panel.html'
}

formLogin.addEventListener('submit', async (evento) => {
    // Evita que el navegador recargue la página al enviar el formulario
    evento.preventDefault()
    mensaje.textContent = ''
    btnIngresar.disabled = true

    try {
        const respuesta = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        })

        if (!respuesta.ok) {
            // En error la API responde JSON: { message } o { error }
            const datos = await respuesta.json()
            mensaje.textContent = datos.message || datos.error || 'No se pudo iniciar sesión'
            return
        }

        // En éxito la API responde el token como texto plano (res.send(token))
        const token = await respuesta.text()
        localStorage.setItem('token', token)
        window.location.href = '/panel.html'
    } catch (error) {
        mensaje.textContent = 'No se pudo conectar con el servidor'
    } finally {
        // Se reactiva el botón tanto si salió bien como si falló
        btnIngresar.disabled = false
    }
})
