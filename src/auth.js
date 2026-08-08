const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const actionBtn = document.getElementById('actionBtn');
const toggleBtn = document.getElementById('toggleBtn');
const alertBox = document.getElementById('alertBox');
const formTitle = document.getElementById('formTitle');

let isLogin = true;

function showAlert(msg, type = 'danger') {
    alertBox.textContent = msg;
    alertBox.className = `alert alert-${type}`;
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

actionBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) return showAlert('Completa todos los campos.');

    const users = getUsers();

    if (isLogin) {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) return showAlert('Usuario o contraseña incorrectos.');
        localStorage.setItem('loggedUser', username);
        window.location.href = 'index.html';
    } else {
        if (users.find(u => u.username === username)) return showAlert('El usuario ya existe.');
        users.push({ username, password });
        saveUsers(users);
        showAlert('Cuenta creada. Ahora puedes ingresar.', 'success');
        isLogin = true;
        formTitle.textContent = 'Iniciar Sesión';
        actionBtn.textContent = 'Ingresar';
        toggleBtn.textContent = '¿No tienes cuenta? Regístrate';
    }
});

toggleBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? 'Iniciar Sesión' : 'Registrarse';
    actionBtn.textContent = isLogin ? 'Ingresar' : 'Registrarse';
    toggleBtn.textContent = isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión';
    alertBox.className = 'alert d-none';
});
