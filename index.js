import { menuArray } from "./data.js";

const menuItemContainer = document.getElementById("hero-container");

const checkoutItems = document.getElementById("your-order");
const itemNames = document.getElementById("ordered-items");
const modal = document.getElementById('modal-container')
const payBtn = document.getElementById('payBtn')
const name = document.getElementById('name')

const orderQuantity = {};

let itemsOrdered = [];

document.addEventListener("click", function (e) {
  if (
    e.target.dataset.button === "0" ||
    e.target.dataset.button === "1" ||
    e.target.dataset.button === "2"
  ) {
    newOrderItems(e.target.dataset.button);
  } else if (e.target.dataset.button === "removeBtn") {
    const itemId = e.target.closest("#order-line-item").dataset.id;
    removeBtn(itemId);
  } else if (e.target.dataset.button === "completeOrderBtn") {
    completeOrder();
  }
});

// COMPLETE ORDER BUTTON FUNCTION

function completeOrder() {
  modal.classList.remove('hidden')
}


payBtn.addEventListener('click', function(){
    modal.classList.add('hidden')
    const fullName = name.value
    itemNames.classList.add('hidden')
    let thankYouNote = ''

    thankYouNote = `
    <div class='thank-you-note'>

        <p>Thanks, ${fullName}, your order is on it's way! </p>

    </div>
    `

    checkoutItems.innerHTML = thankYouNote
    


})

//ITEMS ADDED TO ORDER
function newOrderItems(itemId) {
  const targetItem = menuArray.filter((item) => {
    return item.id == itemId;
  })[0];

  if (itemsOrdered.includes(targetItem)) {
    
    orderQuantity[targetItem.name] += 1;
  } else {
    
    orderQuantity[targetItem.name] = 1;
    itemsOrdered.push(targetItem);
  }

  renderOrder();
  console.log(orderQuantity);
}


// RENDER ORDERS

function renderOrder() {
  let orderHtml = "";
  let multipleItemHtml = "";
  const item = document.getElementById("item");
  let total = 0;

  itemsOrdered.forEach(({ name, price, id }) => {
    const quantity = orderQuantity[name];
    let itemTotalPrice = price * orderQuantity[name];
    total += itemTotalPrice;
    orderHtml += `
        <div id="order-line-item" data-id="${id}" >
            <div id='item'>
                <h2>${name}</h2>
                <button class="remove-btn" data-button="removeBtn">remove</button>
                ${
                  quantity > 1
                    ? `<h3 class="multiple-items"> X ${quantity}</h3>`
                    : ""
                }
               
            </div>
    
            <h3>$${itemTotalPrice}</h3>
        </div>
        `;
  });

  checkoutItems.classList.remove("hidden");
  itemNames.innerHTML = orderHtml;
  getTotalPrice();
}

//GET TOTAL PRICE FOR ORDERS

function getTotalPrice() {
  let total = 0;
  let itemTotal = document.getElementById("item");

  for (let i = 0; i < itemsOrdered.length; i++) {
    for (let j = 0; j < Object.keys(orderQuantity).length; j++) {
      if (itemsOrdered[i].name === Object.keys(orderQuantity)[j]) {
        let sumTotal = itemsOrdered[i].price * Object.values(orderQuantity)[j];
        total += sumTotal;
        const priceElements = document.querySelectorAll(
          `[data-name="${itemsOrdered[i].name}"] [data-price="${itemsOrdered[i].price}"]`
        );

        priceElements.forEach((element) => {
          element.textContent = `
                        $${sumTotal}
                    `;
        });
      }
    }
  }

  const totalElement = document.getElementById("total");
  totalElement.textContent = `
    $${total}
   `;
}

// REMOVE ITEM FROM ORDER LIST

function removeBtn(itemId) {
  /* One issue I had here was that the ItemId parameter was given as a string
    while the item.id below was returned as a number, and I was trying to return
    two items with strict equality. Changing it to loose equality fixed the issue
    */
  const targetItem = menuArray.filter((item) => {
    return item.id == itemId;
  })[0];

  if (itemsOrdered.includes(targetItem) >= 0) {
    orderQuantity[targetItem.name]--;

    if (orderQuantity[targetItem.name] === 0) {
      itemsOrdered = itemsOrdered.filter((item) => item !== targetItem);
    }
    renderOrder();
  }
}

function render() {
  let itemsHtml = "";
  menuArray.forEach(function (item) {
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
    `;
  });
  menuItemContainer.innerHTML = itemsHtml;
}

render();
