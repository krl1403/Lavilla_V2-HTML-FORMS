// let buttons = document.querySelector(".btn-success");

// let listProducts = [];

// Locations of the json file
const mainDishLoc = "./main.json";
const juiceLoc = "./juice.json";
const coffeeLoc = "./coffee.json";
const dessertsLoc = "./desserts.json";

// Get the div elements using id
const mainList = document.getElementById("dishList");
const juiceList = document.getElementById("juiceList");
const coffeeList = document.getElementById("coffeeList");
const dessertsList = document.getElementById("dessertsList");

function initProducts(jsonLocation, listID) {
    fetch(jsonLocation)
        .then(res => res.json())
        .then(menu => {
            menu.forEach((value, key) => {
                let newCard = document.createElement('div');
                newCard.className = "col";

                newCard.innerHTML = `
                <div class="card h-100 border-0 shadow">
                    <img src="${value.image}" class="card-img-top" alt="${value.name}">
                    <div class="card-body">
                        <h5 class="card-title">${value.name}</h5>
                        <h6>&#8369; <span class="price">${value.price.toLocaleString()}</span></h6>
                        <p class="card-text">${value.description}</p> 
                        <button onclick="addToCart(${key})" class="btn btn-success">Add to cart</button>
                    </div>
                </div>
            `;
                listID.appendChild(newCard);
            });
        })
};

// Display the list from the json file
initProducts(mainDishLoc, mainList);
initProducts(juiceLoc, juiceList);
initProducts(coffeeLoc, coffeeList);
initProducts(dessertsLoc, dessertsList);
