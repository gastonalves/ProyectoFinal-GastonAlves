let articulos = JSON.parse(localStorage.getItem('articulos')) || [];

document.getElementById('formularioArticulo').addEventListener('submit', function(event) {
    event.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let cantidad = parseInt(document.getElementById('cantidad').value);
    let precio = parseFloat(document.getElementById('precio').value);
    
    let articulo = { nombre, cantidad, precio };
    articulos.push(articulo);
    localStorage.setItem('articulos', JSON.stringify(articulos));

    mostrarArticulos();
    animarArticulos();
    document.getElementById('formularioArticulo').reset();
});

document.getElementById('calcularTotal').addEventListener('click', function() {
    let totalCompra = calcularTotal(articulos);
    mostrarTotal(totalCompra);
    animarTotal();
});

document.getElementById('cargarDatos').addEventListener('click', function() {
    cargarDatosPredefinidos();
});

document.getElementById('eliminarArticulos').addEventListener('click', function() {
    eliminarTodosLosArticulos();
});

function mostrarArticulos() {
    let resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
    articulos.forEach(articulo => {
        let p = document.createElement('p');
        p.textContent = `${articulo.nombre} - Cantidad: ${articulo.cantidad}, Precio unitario: $${articulo.precio.toFixed(2)}`;
        resultadosDiv.appendChild(p);
    });
}

function calcularTotal(articulos) {
    return articulos.reduce((total, articulo) => total + (articulo.cantidad * articulo.precio), 0);
}



function mostrarTotal(total) {
    let totalDiv = document.getElementById('total');
    totalDiv.innerHTML = `<p style="color: #f6f6f6;">El total de la compra es: $${total.toFixed(2)}</p>`;
}

async function cargarDatosPredefinidos() {
    try {
        let response = await fetch('datos.json');
        let data = await response.json();
        data.forEach(item => articulos.push(item));
        localStorage.setItem('articulos', JSON.stringify(articulos));
        mostrarArticulos();
        animarArticulos();
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
}
document.getElementById('eliminarArticulos').addEventListener('click', function() {
    eliminarTodosLosArticulos();
    artEliminado();
});

function eliminarTodosLosArticulos() {
    articulos = [];
    localStorage.removeItem('articulos');
    mostrarArticulos();
    document.getElementById('total').innerHTML = '';
}

function artEliminado() {
    const mensajeEliminado = document.getElementById('mensajeEliminado');
    mensajeEliminado.classList.add('mensaje-visible');
    setTimeout(() => {
        mensajeEliminado.classList.remove('mensaje-visible');
    }, 3000);
}

function eliminarTodosLosArticulos() {
    articulos = [];
    localStorage.removeItem('articulos');
    mostrarArticulos();
    document.getElementById('total').innerHTML = '';
}

function animarArticulos() {
    anime({
        targets: '.resultados p',
        translateX: [-100, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: anime.stagger(100)
    });
}

function animarTotal() {
    anime({
        targets: '#total p',
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
    });
}

mostrarArticulos();
