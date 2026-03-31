const API_URL = 'https://inicio-basedatos-production.up.railway.app';

// ── Vistas ───────────────────────────────────────────────────────────────────
const vistaRegistro = document.getElementById('vista-registro');
const vistaLogin    = document.getElementById('vista-login');
const irLogin       = document.getElementById('ir-login');
const irRegistro    = document.getElementById('ir-registro');

irLogin.addEventListener('click', (e) => {
    e.preventDefault();
    vistaRegistro.style.display = 'none';
    vistaLogin.style.display    = 'flex';
});

irRegistro.addEventListener('click', (e) => {
    e.preventDefault();
    vistaLogin.style.display    = 'none';
    vistaRegistro.style.display = 'flex';
});

// ── Referencias registro ─────────────────────────────────────────────────────
const formularioRegistro  = document.getElementById('formulario-registro');
const inputPassword       = document.getElementById('password');
const inputConfirmar      = document.getElementById('confirmar-password');
const barraSeguridad      = document.getElementById('nivelseguridad');
const errorConfirmacion   = document.getElementById('error-confirmacion');
const mensajeRegistro     = document.getElementById('mensaje-registro');
const checkVerPass        = document.getElementById('ver-contrasena');
const checkVerConfirm     = document.getElementById('mostrar-confirmacion');

// ── Barra de fortaleza de contraseña ─────────────────────────────────────────
inputPassword.addEventListener('input', () => {
    const valor = inputPassword.value;
    let fortaleza = 0;

    if (valor.length >= 5)       fortaleza += 30;
    if (valor.match(/[A-Z]/))    fortaleza += 30;
    if (valor.match(/[0-9]/))    fortaleza += 40;

    barraSeguridad.style.width = fortaleza + '%';

    if (fortaleza <= 40)      barraSeguridad.style.background = '#ef4444';
    else if (fortaleza <= 70) barraSeguridad.style.background = '#f59e0b';
    else                      barraSeguridad.style.background = '#22c55e';

    if (inputConfirmar.value !== '') validarCoincidencia();
});

// ── Validación confirmación ───────────────────────────────────────────────────
function validarCoincidencia() {
    if (inputConfirmar.value === '') {
        errorConfirmacion.style.display = 'none';
        inputConfirmar.style.borderColor = 'transparent';
        return true;
    }
    if (inputPassword.value !== inputConfirmar.value) {
        errorConfirmacion.style.display = 'block';
        inputConfirmar.style.borderColor = 'var(--color-error)';
        return false;
    } else {
        errorConfirmacion.style.display = 'none';
        inputConfirmar.style.borderColor = 'var(--color-exitoso)';
        return true;
    }
}

inputConfirmar.addEventListener('input', validarCoincidencia);

// ── Mostrar / ocultar contraseñas ────────────────────────────────────────────
checkVerPass.addEventListener('change', () => {
    inputPassword.type = checkVerPass.checked ? 'text' : 'password';
});

checkVerConfirm.addEventListener('change', () => {
    inputConfirmar.type = checkVerConfirm.checked ? 'text' : 'password';
});

// ── Registro ─────────────────────────────────────────────────────────────────
formularioRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validarCoincidencia()) {
        setMensaje(mensajeRegistro, 'Las contraseñas no coinciden.', 'error');
        return;
    }

    const username = document.getElementById('username').value.trim();
    const password = inputPassword.value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            setMensaje(mensajeRegistro, '¡Registro exitoso! Ya puedes iniciar sesión.', 'exito');
            formularioRegistro.reset();
            barraSeguridad.style.width = '0%';
            errorConfirmacion.style.display = 'none';
            inputConfirmar.style.borderColor = 'transparent';
        } else {
            setMensaje(mensajeRegistro, data.error || 'Error al registrar.', 'error');
        }
    } catch (err) {
        setMensaje(mensajeRegistro, 'No se pudo conectar al servidor.', 'error');
    }
});

// ── Login ─────────────────────────────────────────────────────────────────────
const formularioLogin  = document.getElementById('formulario-login');
const mensajeLogin     = document.getElementById('mensaje-login');
const checkVerLogin    = document.getElementById('mostrar-login');
const loginPasswordEl  = document.getElementById('login-password');

checkVerLogin.addEventListener('change', () => {
    loginPasswordEl.type = checkVerLogin.checked ? 'text' : 'password';
});

formularioLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = loginPasswordEl.value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            setMensaje(mensajeLogin, '¡Bienvenido! Redirigiendo...', 'exito');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 800);
        } else {
            setMensaje(mensajeLogin, data.error || 'Credenciales incorrectas.', 'error');
        }
    } catch (err) {
        setMensaje(mensajeLogin, 'No se pudo conectar al servidor.', 'error');
    }
});

// ── Utilidad ──────────────────────────────────────────────────────────────────
function setMensaje(el, texto, tipo) {
    el.textContent = texto;
    el.className   = 'mensaje-feedback ' + (tipo || '');
}