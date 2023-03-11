import { menuArray } from "./data.js";

const menuItemContainer = document.getElementById('hero-container')


const checkoutItems = document.getElementById('your-order')
const itemNames = document.getElementById('ordered-items')

const orderQuantity = {}

let itemsOrdered = []



document.addEventListener('click', function(e){
    
   if(e.target.dataset.button === '0' || e.target.dataset.button === '1' || e.target.dataset.button === '2'){
        newOrderItems(e.target.dataset.button)
    }
    else if(e.target.dataset.button === "removeBtn"){

    }
    else if(e.target.dataset.button === "completeOrderBtn"){
        completeOrder()
    }
    
  
})

// COMPLETE ORDER BUTTON FUNCTION

function completeOrder() {
    console.log("You've completed your order")
}


//ITEMS ADDED TO ORDER
function newOrderItems(itemId) {
    const targetItem = menuArray.filter((item)=>{
        return item.id == itemId
    })[0]

    if(itemsOrdered.includes(targetItem)){
        //If order basket already contains the selected item, no need to add to basket just increment the quantity

        // remove button will need to decrement this count and update totals
            orderQuantity[targetItem.name]+=1;
        }else{
         //If order basket does not contain the selected item then set quantity to one and add to basket
            orderQuantity[targetItem.name]=1;
            itemsOrdered.push(targetItem)
        }
    
    
    renderOrder()
    console.log(orderQuantity)
}




function renderOrder(){
    
    let orderHtml = ''
    let multipleItemHtml = ''
    const item = document.getElementById('item')
    let total = 0
    
    itemsOrdered.forEach(({name, price}) => {
        const quantity = orderQuantity[name]
        let itemTotalPrice = price * orderQuantity[name]
        total += itemTotalPrice
        orderHtml += `
        <div id="order-line-item" >
            <div id='item'>
                <h2>${name}</h2>
                <button class="remove-btn">remove</button>
                ${quantity > 1 ? `<h3 class="multiple-items"> X ${quantity}</h3>` : ''}
               
            </div>
    
            <h3>$${itemTotalPrice}</h3>
        </div>
        `
    })
        
    checkoutItems.classList.remove('hidden')
    itemNames.innerHTML = orderHtml
    getTotalPrice()
   
}






function getTotalPrice()  {
    let total = 0
    let itemTotal = document.getElementById('item')
    console.log(itemsOrdered)
    for(let i = 0; i<itemsOrdered.length; i++){
        for(let j =0; j < Object.keys(orderQuantity).length; j++){
            if(itemsOrdered[i].name === Object.keys(orderQuantity)[j]){
                let sumTotal = itemsOrdered[i].price * Object.values(orderQuantity)[j]
                total += sumTotal
                const priceElements = document.querySelectorAll('[data-name="${itemsOrdered[i].name .price')

                priceElements.forEach(element => {
                    element.textContent = `
                        $${sumTotal}
                    `
                })
            }
        }
    }
   
   const totalElement = document.getElementById('total')
   totalElement.textContent =  `
    $${total}
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





render()








