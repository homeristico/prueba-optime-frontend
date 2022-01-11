console.log('running ...')

const cargarEliminar = (id) => {
    document.getElementById('eliminarProducto').value = id;
}

const filtro = async (e) => {
    
    try {

        const res = await fetch('http://localhost:8000/product/filtro/'+e.target.value);
        const datos = await res.json();        
        renderTable(datos.productos);
        
    } catch (error) {
        console.log(error)
    }
}

const ActualizarProducto = async (e) => {
    e.preventDefault(); 

    const idUpdate = document.querySelector('#idUpdate').value;
    const codeUpdate = document.querySelector('#codeUpdate').value;
    const nameUpdate = document.querySelector('#nameUpdate').value;
    const descriptionUpdate = document.querySelector('#descriptionUpdate').value;
    const brandUpdate = document.querySelector('#brandUpdate').value;
    const priceUpdate = document.querySelector('#priceUpdate').value;

    try {

        const res = await fetch('http://localhost:8000/product/update',{
            method:"PUT",
            body:JSON.stringify({
                id:idUpdate,
                code:codeUpdate,
                name:nameUpdate,
                description:descriptionUpdate,
                brand:brandUpdate,
                price:priceUpdate,                
            })
        });
        const datos = await res.json();
        
        cargarDatos();
        
        
    } catch (error) {
        console.log(error)                                                            
    }

    
}

const editar = async (id) => {
    

    try {
        const res = await fetch('http://localhost:8000/product/get/'+id,{
            method:"GET"
        });
        const datos = await res.json();
        
        document.querySelector('#idUpdate').value= datos.producto.id;
        document.querySelector('#codeUpdate').value= datos.producto.code;
        document.querySelector('#nameUpdate').value= datos.producto.name;
        document.querySelector('#descriptionUpdate').value= datos.producto.description;
        document.querySelector('#brandUpdate').value= datos.producto.brand;
        document.querySelector('#priceUpdate').value= datos.producto.price;
        
        //cargarDatos();
    } catch (error) {
        console.log(error)
    }
}


const eliminar = async () => {
    const id = document.getElementById('eliminarProducto').value;
    

    try {
        const res = await fetch('http://localhost:8000/product/delete/'+id,{
            method:"DELETE"
        });
        const datos = await res.json();
        
        cargarDatos();
    } catch (error) {
        console.log(error)
    }

}

const limpiarCampos = () => {
    document.querySelector('#code').value='';
    document.querySelector('#name').value='';
    document.querySelector('#description').value='';
    document.querySelector('#brand').value='';
    document.querySelector('#price').value='';
    document.querySelector('#categorias').value='';
}

const guardarProducto = async (e) => {
    e.preventDefault();         
    const code = document.querySelector('#code').value;
    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const brand = document.querySelector('#brand').value;
    const price = document.querySelector('#price').value;
    const categoria = document.querySelector('#categorias').value;
    

    try {

        const res = await fetch('http://localhost:8000/product/resgistro',{
            method:"POST",
            body:JSON.stringify({
                code,
                name,
                description,
                brand,
                price,
                category_id:categoria
            })
        });
        const datos = await res.json();
        
        cargarDatos();
        limpiarCampos();
        
    } catch (error) {
        console.log(error)                                                            
    }

    

}

const cargarCategorias = async () => {
    let arregloCategorias = '';

    try {

        const res = await fetch('http://localhost:8000/category');
        const datos = await res.json();

        for(let categoria of datos.categorias){
            arregloCategorias += `
                <option value="${categoria.id}">${categoria.name}</option>
            `; 
        }

        document.getElementById('categorias').innerHTML = arregloCategorias;        
        document.getElementById('categoriasFiltro').innerHTML += arregloCategorias;
        
        
        
        
    } catch (error) {
        console.log(error)
    }
}
cargarCategorias();

const renderTable = (productos) => {
    let arregloProductos = '';
    for(let producto of productos){
        arregloProductos += `
        <tr>
            <th scope="row">${producto.code}</th>
            <td>${producto.name}</td>            
            <td>${producto.brand}</td>
            <td>${producto.price}</td>
            <td>${producto.description}</td>
            <td>${producto.updatedAt.substr(0,10)}</td>
            <td>
                <i class="bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editar(${producto.id})"></i>
                <i class="bi bi-trash" data-bs-toggle="modal" data-bs-target="#exampleModalDelete" onclick="cargarEliminar(${producto.id})"></i>
            </td>
         </tr>  
        `;
    }

    document.querySelector('#tbody').innerHTML = arregloProductos;
}


const cargarDatos = async () => {

    try {

        const res = await fetch('http://localhost:8000/product');
        const datos = await res.json();
        
        renderTable(datos.productos);
        
    } catch (error) {
        console.log(error)
    }

}

cargarDatos();