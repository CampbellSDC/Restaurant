import { menuArray } from "./data.js";

const menuItemContainer = document.getElementById('hero-container')
const addItemBtn = document.getElementById('add-btn')


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
                <button id="add-btn">+</button>
            </div>

    

                

        </div>
    `
    })
    
}

/* ADD ITEM BUTTON FUNCTION */

// addItemBtn.addEventListener('click', () => {

// })

render()








