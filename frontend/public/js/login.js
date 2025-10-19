document.addEventListener('DOMContentLoaded', function () {
    // Agarra el modal
    const form = document.getElementById('loginForm');
    if (!form) return;
    const pwd = document.getElementById('password')
    // Mostrar u ocultar contraseña
    const toggle = document.getElementById('toggleLoginPassword')
    // Si contraseña y botón existen
    if (toggle && pwd) {
        // Le agrega un evento de click al ojo
        toggle.addEventListener('click', () => {
            // Si la contraseña es tipo password pasa a ser text, si no, sigue siendo password
            pwd.type = pwd.type === 'password' ? 'text' : 'password'
            // Ojo abierto
            toggle.classList.toggle('bi-eye');
            // Ojo cerrado
            toggle.classList.toggle('bi-eye-slash');
        })
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value;
        const errorDiv = document.getElementById('loginError');
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
        if (!email || !password) {
            errorDiv.textContent = 'Email y password requeridos';
            errorDiv.style.display = 'block';
            return;
        }
        try {
            const resp = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await resp.json();
            if (!resp.ok) {
                errorDiv.textContent = data.message || 'Error al iniciar sesión';
                errorDiv.style.display = 'block';
                return;
            }
            // Guardar token
            localStorage.setItem('token', data.token);
            // Redirigir según rol
            if (data.rol === 'empleado') {
                window.location.href = '/ofertas';
            } else if (data.rol === 'empleador') {
                window.location.href = '/empleador';
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            errorDiv.textContent = 'Error de red o del servidor';
            errorDiv.style.display = 'block';
        }
    });

    // Evento para cerrar el modal login
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('modalLogin').close();
        });
    }
});