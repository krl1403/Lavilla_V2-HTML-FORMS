// Get the div elements using id
const mainList = document.getElementById("dishList");
const juiceList = document.getElementById("juiceList");
const coffeeList = document.getElementById("coffeeList");
const dessertsList = document.getElementById("dessertsList");

function initProducts(listID, category) {
    fetch("./products.json")
      .then(res => res.json())
      .then(data => {
        const products = data[category];
  
        products.forEach((value, key) => {
          let newCard = document.createElement('div');
          newCard.className = "col";
  
          newCard.innerHTML = `
            <div class="card h-100 border-0 shadow">
              <img src="${value.image}" class="card-img-top" alt="${value.name}">
              <div class="card-body">
                <h5 class="card-title">${value.name}</h5>
                <h6>&#8369; <span class="price">${value.price.toLocaleString()}</span></h6>
                <p class="card-text">${value.description}</p> 
                <button type="button" onclick="addToCart(${key}, ${products.key})" class="btn btn-success">Add to cart</button>
              </div>
            </div>
          `;
          listID.appendChild(newCard);
        });
      });
  }

// Display menu
initProducts(mainList, "main");
initProducts(juiceList, "juice");
initProducts(coffeeList, "coffee");
initProducts(dessertsList, "desserts");

/* Modal Cart */
let count = 0;
function updateCartCount() {
    count += 1;
    document.getElementById("quantity").innerHTML = count;
    console.log("Cart quantity updated:", count);
}

function addToCart(category) {
    updateCartCount();
}