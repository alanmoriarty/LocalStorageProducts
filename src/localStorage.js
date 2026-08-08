// Protección de ruta
const loggedUser = localStorage.getItem('loggedUser');
if (!loggedUser) window.location.href = 'login.html';

document.getElementById('welcomeMsg').textContent = `Hola, ${loggedUser}`;
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('loggedUser');
    window.location.href = 'login.html';
});

const form = document.getElementById('productForm');
const nombreInput = document.getElementById('nombre');
const precioInput = document.getElementById('precio');
const cantidadInput = document.getElementById('cantidad');
const editIndexInput = document.getElementById('editIndex');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const tableBody = document.getElementById('productTable');

function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function renderTable() {
    const products = getProducts();
    tableBody.innerHTML = products.map((p, i) => `
        <tr>
            <td>${p.nombre}</td>
            <td>$${p.precio}</td>
            <td>${p.cantidad}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="editProduct(${i})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const products = getProducts();
    const product = {
        nombre: nombreInput.value.trim(),
        precio: precioInput.value,
        cantidad: cantidadInput.value
    };
    const idx = editIndexInput.value;

    if (idx !== '') {
        products[idx] = product;
    } else {
        products.push(product);
    }

    saveProducts(products);
    resetForm();
    renderTable();
});

function editProduct(i) {
    const products = getProducts();
    const p = products[i];
    nombreInput.value = p.nombre;
    precioInput.value = p.precio;
    cantidadInput.value = p.cantidad;
    editIndexInput.value = i;
    submitBtn.textContent = 'Actualizar';
    cancelBtn.classList.remove('d-none');
}

function deleteProduct(i) {
    const products = getProducts();
    products.splice(i, 1);
    saveProducts(products);
    renderTable();
}

cancelBtn.addEventListener('click', resetForm);

function resetForm() {
    form.reset();
    editIndexInput.value = '';
    submitBtn.textContent = 'Agregar';
    cancelBtn.classList.add('d-none');
}

renderTable();
