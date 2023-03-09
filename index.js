import { menuArray } from "./data.js";

const menuItemContainer = document.getElementById('hero-container')


const checkoutItems = document.getElementById('your-order')
const itemNames = document.getElementById('ordered-items')

let itemsOrdered = []



document.addEventListener('click', function(e){
    
   if(e.target.dataset.button){
        newOrderItems(e.target.dataset.button)
    }
    
  
})


function newOrderItems(itemId) {
    const targetItem = menuArray.filter((item)=>{
        

       return item.id == itemId
    // if(item.name === itemId){
    //     console.log(item)

    
    })[0]
    
    itemsOrdered.push(targetItem)
    console.log(itemsOrdered)
    renderOrder()
    
}


function renderOrder(){
    
    let orderHtml = ''
   
    itemsOrdered.forEach(({name, price}) => {
        
       
        orderHtml += `
        <div id="order-line-item" >
        <div id='item'>
            <h2>${name}</h2>
            <button class="remove-btn">remove</button>
        </div>

        <h3>$${price}</h3>
        </div>
        `
    })
    
   checkoutItems.classList.remove('hidden')
    itemNames.innerHTML = orderHtml
    getTotalPrice()
}   

function getTotalPrice()  {
    let total = document.getElementById('total')
    const sum = itemsOrdered.reduce((price, total)=> price + total.price, 0 )

    total.innerHTML =`
        $${sum}
    ` 

    
}



function render(){
    let itemsHtml = ''
    menuArray.forEach(function(item){
        
        itemsHtml += `
        <div class="menu-item-container">

            <div class="emoji-item-container">

                <div class="emoji">
                    <img  src="${item.emoji}" alt="${item.alt}">
                </div>

                <div class="item-text">
                    <h2 id="menu-item">${item.name}</h2>
                    <p id="pizza-toppings">${item.ingredients}</p>
                    <h4 id="pizza-price">$${item.price}</h4>     
                </div>
                <button class="add-item-btn" data-button="${item.id}">+</button>
            </div>

    

                

        </div>
    `
    })
    menuItemContainer.innerHTML = itemsHtml
    
}

/* ADD ITEM BUTTON FUNCTION */



render()








