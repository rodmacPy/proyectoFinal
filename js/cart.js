const orderItems = document.getElementById('order-items')
const templateCard = document.getElementById('template-card').content //accede a los contenidos del template que esta en html
const fragment = document.createDocumentFragment()
//para mostrar el alert
const divAlert = document.getElementById('alert')
//botones
const btn_confirmar = document.getElementById('btn_confirmar')
const pagar = document.getElementById('pagar')

const mminput = document.getElementById('mm')
const aainput = document.getElementById('aa')

const mmspan = document.querySelector('.mm')
const aaspan = document.querySelector('.aa')

const nameinput =document.getElementById('nombreinput')
const namespan = document.querySelector('.nombre')


const numeroTarjeta = document.getElementById('numeroTarjeta')
const formulario = document.querySelector('.form')
const nTarjeta = document.getElementById('nTarjeta')


document.addEventListener('DOMContentLoaded', () => {
    if(!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]))
    fetchData()
})
function fetchData () {
    const getLocalCart = JSON.parse( localStorage.getItem('cart') )
    createCards(getLocalCart)
}

//remover item del localStorage
const removeItem = (prod) => {
    const getLocalCart = JSON.parse( localStorage.getItem('cart') )
    const existe = getLocalCart.filter( el => el.id === prod)
    getLocalCart.forEach((local, idx) => {
        if(local.id === prod) getLocalCart.splice(idx, 1);
    })
    localStorage.setItem('cart', JSON.stringify(getLocalCart));
    location.reload();
}

// Obtiene el total a pagar
const totalCart = () => {
    const getLocalCart = JSON.parse( localStorage.getItem('cart') )
    let res = getLocalCart.reduce( (sum, item) => sum + item['precio'], 0 )
    document.getElementById('prueba').innerHTML = `Total a pagar: ${new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'PYG' }).format(res)}`
}


// crea los item utilizando el contenido del template
let btn;
const createCards = data =>{
    data.forEach((product, index) => {
        templateCard.querySelector('h5').textContent = product.producto
        templateCard.querySelector('.description').textContent = product.descripcion
        templateCard.querySelector('.price').textContent = product.precio
        templateCard.querySelector('.card').id = product.id
        templateCard.querySelector('img').setAttribute('src', product.img_url)
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
        // Obtencion del boton hijo dentro de cada card creado por su index dentro del dom
        btn = fragment.children[index].children[1].children[3]
        btn.addEventListener('click', (e) => {
            removeItem(product.id)
        })
    });
    orderItems.appendChild(fragment)
}
// completar numero de tarjeta
nTarjeta.addEventListener('input', (e) => {
    let typedValue = e.target.value;
    // agrega un espacio cada 4 digitos
    nTarjeta.value = typedValue.replace(/\s/g, '').replace(/\D/g, '').replace(/([0-9]{4})/g, '$1 ').trim(); 
    numeroTarjeta.textContent = typedValue;

    // si la tarjeta comienza en (3, 4, 5, 6), cambia la imagen del logo
    const imagen = document.createElement('img');
    if(typedValue == ''){
        numeroTarjeta.textContent = "#### #### #### #### ####"
    }
    if( typedValue[0] == 3 ){
        logoMarca.innerHTML = '';
        imagen.src = 'img/americanExpress.png';
        logoMarca.appendChild(imagen);
    }
    if( typedValue[0] == 4 ){
        logoMarca.innerHTML = '';
        imagen.src = 'img/visa.png';
        logoMarca.appendChild(imagen);
    }
    if ( typedValue[0] == 5 ) {
        logoMarca.innerHTML = '';
        imagen.src = 'img/mastercard.png';
        logoMarca.appendChild(imagen);
    }else if ( typedValue[0] == 6 ) {
        logoMarca.innerHTML = '';
        
        imagen.src = 'img/discover.png';
        logoMarca.appendChild(imagen);
    }
    
});
// completar mm en tarjeta

nameinput.addEventListener('input', (e) => {
    let typed = e.target.value;
    namespan.textContent = typed;
    if(typed == ''){
        namespan.textContent = "name username";
    }
});

mminput.addEventListener('input', (e) => {
    let typed = e.target.value;
    mmspan.textContent = typed;
    if(typed == ''){
        mmspan.textContent = "mm";
    }
});
// completar aa en tarjeta
aainput.addEventListener('input', (e) => {
    let typed = e.target.value;
    aaspan.textContent = typed;
    if(typed == ''){
        aaspan.textContent = "aa";
    }
});


pagar.addEventListener('click', () =>{
    // mostrar alert
    divAlert.style.display="flex"
})
btn_confirmar.addEventListener('click', () =>{
    // ocultar alert
    divAlert.style.display="none"
    //vaciar carrito
    localStorage.removeItem('cart')
})
totalCart()