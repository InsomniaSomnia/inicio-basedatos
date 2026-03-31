document.addEventListener('DOMContentLoaded', () => {

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        document.getElementById('nombre-usuario').textContent = payload.username;
    } catch {
        document.getElementById('nombre-usuario').textContent = 'Usuario';
    }

    document.getElementById('cerrar-sesion').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

});