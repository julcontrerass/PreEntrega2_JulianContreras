const formularioProductos = document.getElementById('product-form');
const listaProductos = document.getElementById('product-list');

let productos = [];

function filtrarProductos(terminoBusqueda) {
  return productos.filter((producto) => {
    return producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase());
  });
}

function renderizarProductos() {
  listaProductos.innerHTML = '';

  const terminoBusqueda = document.getElementById('search-input').value;
  let productosFiltrados = productos;

  if (terminoBusqueda) {
    productosFiltrados = filtrarProductos(terminoBusqueda);
  }

  const productosOrdenados = productosFiltrados.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));

  productosOrdenados.forEach((producto, index) => {
    const elementoProducto = document.createElement('div');
    elementoProducto.className = 'product-item';
    elementoProducto.innerHTML = `
      <img src="${URL.createObjectURL(producto.imagen)}" alt="${producto.nombre}">
      <div class="product-details">
        <div><strong>Nombre:</strong> ${producto.nombre}</div>
        <div><strong>Valor:</strong> $${producto.valor}</div>
        <div><strong>Categoría:</strong> ${producto.categoria}</div>
      </div>
      <button onclick="editarProducto(${index})">Editar</button>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    listaProductos.appendChild(elementoProducto);
  });
}

function agregarProducto(nombre, valor, categoria, imagen) {
  const nuevoProducto = {
    nombre: nombre,
    valor: parseFloat(valor),
    categoria: categoria,
    imagen: imagen,
  };
  productos.push(nuevoProducto);
  renderizarProductos();
  alert('¡Producto agregado correctamente!');
}

function editarProducto(index) {
  const nombreProducto = prompt('Ingrese el nuevo nombre del producto:', productos[index].nombre);
  const valorProducto = prompt('Ingrese el nuevo valor del producto:', productos[index].valor);
  const categoriaProducto = prompt('Ingrese la nueva categoría del producto:', productos[index].categoria);

  if (nombreProducto && valorProducto && categoriaProducto) {
    productos[index].nombre = nombreProducto;
    productos[index].valor = parseFloat(valorProducto);
    productos[index].categoria = categoriaProducto;
    renderizarProductos();
    alert('¡Producto editado correctamente!');
  }
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  renderizarProductos();
  alert('¡Producto eliminado correctamente!');
}

formularioProductos.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombreProducto = document.getElementById('product-name').value;
  const valorProducto = document.getElementById('product-value').value;
  const categoriaProducto = document.getElementById('product-category').value;
  const imagenProducto = document.getElementById('product-image').files[0];

  agregarProducto(nombreProducto, valorProducto, categoriaProducto, imagenProducto);
  formularioProductos.reset();
});

document.getElementById('sort-button').addEventListener('click', () => {
  renderizarProductos();
});

document.getElementById('search-input').addEventListener('input', () => {
  renderizarProductos();
});
