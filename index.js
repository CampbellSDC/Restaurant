import { menuArray } from "./data.js";

const menuItemContainer = document.getElementById('hero-container')



function render(){

    menuArray.forEach(function(item){
        menuItemContainer.innerHTML += `
        <div id="menu-item-container">
        <div class="item-graphic">
            <img src="${item.emoji}" alt="pizza slice icon">
        </div>
        <div class="item-text">
            <h2 id="menu-item">${item.name}</h2>
            <p id="pizza-toppings">${item.ingredients}</p>
            <h4 id="pizza-price">${item.price}</h4>     
        </div>
        <button id="add-btn">+</button>
        </div>
    `
    })
    
}

render()






