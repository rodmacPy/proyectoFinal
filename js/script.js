const productos = document.getElementById('productos')
const templateCard = document.getElementById('template-card').content // agarra el contenido del template
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () =>{
    if(!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]))
fetchData()
})
function fetchData () {
    fetch('./js/datos.json').then(resp => resp.json()).then(createCards)
}


const fetchProductById = (product) => {
    const getLocalCart = JSON.parse(localStorage.getItem('cart'))
    // console.log(getLocalCart)
    // return
    getLocalCart.push(product)
    localStorage.setItem('cart', JSON.stringify(getLocalCart))
}


let btn;
// Creacion de los elementos del json utilizando la estructura del template
const createCards = data =>{
    data.forEach((product, index) => {
        templateCard.querySelector('h5').textContent = product.producto
        templateCard.querySelector('p').textContent = product.precio
        templateCard.querySelector('img').setAttribute('src', product.img_url)
        templateCard.querySelector('.btn').dataset.id = product.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
        // Obtencion del boton hijo dentro de cada card creado por su index dentro del dom
        btn = fragment.children[index].children[1].children[2]
        // Evento de click dentro de cada boton
        btn.addEventListener('click', (e) => {
            const randomNum = Math.random()
            // Obtencion del atributo data id dentro del boton de cada card
            const productId = e.target.getAttribute('data-id')
            const dataSend = {
                id: randomNum,
                producto: product.producto,
                precio: product.precio,
                img_url: product.img_url
            }
            
            fetchProductById(dataSend)
        })
    });
    productos.appendChild(fragment)
}


