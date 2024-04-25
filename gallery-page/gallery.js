// Get the div elements using id
const mainList = document.getElementById("dishList");
const juiceList = document.getElementById("juiceList");
const coffeeList = document.getElementById("coffeeList");
const dessertsList = document.getElementById("dessertsList");
const listArray = [mainList, juiceList, coffeeList, dessertsList];
const nameArray = ["main", "juice", "coffee", "desserts"];

function initProducts(listID, category) {
  fetch("./products.json")
    .then(res => res.json())
    .then(data => {
      const products = data[category];

      products.forEach((value) => {
        let newCard = document.createElement('div');
        newCard.className = "col";

        newCard.innerHTML = `
            <div class="card h-100 border-0 shadow">
              <img src="${value.image}" class="card-img-top" alt="${value.name}">
              <div class="card-body">
                <h5 class="card-title">${value.name}</h5>
                <h6>&#8369; <span class="price">${value.price.toLocaleString()}</span></h6>
                <p class="card-text">${value.description}</p> 
                <button onclick="addToCart('${value.name}', '${value.price}')" class="btn btn-success">Add to cart</button>
              </div>
            </div>
          `;
        listID.appendChild(newCard);
      });
    });
}

// Display menu
for (let i = 0; i < 4; i++)
  initProducts(listArray[i], nameArray[i])

/* Modal Cart */
let listCard = document.querySelector('.listCard'); // ul
let total = document.querySelector('.total'); // 
let quantity = document.querySelector('.quantity')
let count = 0;
let prTotal = 0;

function updateCartCount(one) {
  count += one;
  quantity.innerHTML = count;
  console.log("Cart quantity updated:", count);
}

// Array to store items in the cart
let cartItems = [];

function addToCart(name, price) {
  price = parseInt(price);

  // Check if the item is already in the cart
  const existingItem = cartItems.find(item => item.name === name && item.price === price);

  if (existingItem) {
    // If the item is already in the cart, increment its quantity
    existingItem.quantity++;
  } else {
    // If the item is not in the cart, add it
    cartItems.push({ name: name, price: price, quantity: 1 });
  }

  // Update the cart display
  updateCartDisplay();

  // Update the total price, quantity, and add toast alert
  updateTotalPrice(price);
  updateCartCount(1);
  createToast(name, price);
}

function updateCartDisplay() {
  // Clear the existing items in the cart display
  listCard.innerHTML = '';

  // Loop through the cart items and add them to the cart display
  cartItems.forEach(item => {
    let newDiv = document.createElement('li');
    newDiv.className = "d-flex justify-content-between align-items-center py-2";

    newDiv.innerHTML = `
      <div><h6>Name: ${item.name}</h6></div>
      <div><h6>Price: ${item.price}</h6></div>
      <div><h6>Quantity: ${item.quantity}</h6></div>
      <div><button class="btn btn-danger" onclick="removeItem('${item.name}', ${item.price})">Delete</button></div>
    `;
    listCard.appendChild(newDiv);
  });
}

function updateTotalPrice(price) {
  prTotal += price;

  total.innerHTML = `Total: &#8369;${prTotal}`;
}

function removeItem(name, price) {
  // Find the index of the item to remove
  const index = cartItems.findIndex(item => item.name === name && item.price === price);

  // If the item is found, decrement its quantity
  if (index !== -1) {
    cartItems[index].quantity--;

    // If the quantity becomes zero, remove the item from the cartItems array
    if (cartItems[index].quantity === 0) {
      cartItems.splice(index, 1);
    }

    // Update cart status
    updateCartDisplay();
    updateTotalPrice(-price);
    updateCartCount(-1);
  }
}

let toastContainer = document.querySelector('.toast-container');

function createToast(name, price) {
  let toast = document.createElement('div');
  toast.className = "toast";
  toast.role = "alert";
  toast.ariaLive = "assertive";
  toast.ariaAtomic = "true";

  toast.innerHTML = `
    <div class="toast-header">
        <strong class="me-auto">Added to Cart!</strong>
        <small>Just now</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        <div class="d-flex justify-content-between ">
          <div>${name}</div>
          <div>${price}</div>
        </div>
      </div>
  `

  // Append the toast to the container
  toastContainer.appendChild(toast);

  let toastInstance = new bootstrap.Toast(toast);
  toastInstance.show();
}