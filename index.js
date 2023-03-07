import { menuArray } from "./data.js";

const menuItemContainer = document.getElementById('hero-container')
const addItemBtn = document.getElementById('add-btn')
const yourOrderSection = document.getElementById('your-order')

let itemsOrdered = []

document.addEventListener('click', function(e){
   if(e.target.dataset.button === 'Pizza'){
       handlePizzaClick(e.target.dataset.button)
   }
   else if(e.target.dataset.button === 'Hamburger'){
       handleHamburgerClick(e.target.dataset.button)
   }
   else if(e.target.dataset.button === 'Beer'){
       handleBeerClick(e.target.dataset.button)
   }

})



function handlePizzaClick(pizzas){
    
    menuArray.forEach((element) => {
        if(element.name === pizzas){
            itemsOrdered.push(element)
            
        }
        
    }
    )

    console.log(itemsOrdered)}

function handleHamburgerClick(hamburgers){
    
    menuArray.forEach((element) => {
        
        if(element.name === hamburgers){
            itemsOrdered.push(element)

        }
        
    })
    console.log(itemsOrdered)
}

function handleBeerClick(beers){
    menuArray.forEach((element) => {
        if(element.name === beers){
            itemsOrdered.push(element)
        }
    })
    console.log(itemsOrdered)
}

function render(){

    menuArray.forEach(function(item){
        
        menuItemContainer.innerHTML += `
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
                <button class="add-item-btn" data-button="${item.name}">+</button>
            </div>

    

                

        </div>
    `
    })
    
}

/* ADD ITEM BUTTON FUNCTION */



render()








