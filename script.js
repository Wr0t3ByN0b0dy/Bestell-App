const CONTAINER_PIZZA = document.getElementById("pizza");
const CONTAINER_PASTA = document.getElementById("pasta");
const CONTAINER_DESSERT = document.getElementById("dessert");
const CONTAINER_DRINKS = document.getElementById("drinks");
const CONTAINER_BASKED = document.getElementById("basked");

let total_price = 0;
let delivery = false;

const orders = {};

function formatPrice(num) {
  return num.toFixed(2) + " €";
}

function getDishes(container, dishArray, func, category) {
  for (let i = 0; i < dishArray.length; i++) {
    container.innerHTML += func(i, dishArray, category);
  }
}

function renderDishes() {
  getDishes(CONTAINER_PIZZA, dishes.pizza, createDishTemplate, "pizza");
  getDishes(CONTAINER_PASTA, dishes.pasta, createDishTemplate, "pasta");
  getDishes(CONTAINER_DESSERT, dishes.dessert, createDishTemplate, "dessert");
  getDishes(CONTAINER_DRINKS, dishes.drinks, createDishTemplate, "drinks");
}

function createOrder(index, category) {
  const key = `${category}-${index}`;
  const dishObject = dishes[category][index];

  let priceContainer = document.getElementById("price-total");

  total_price += dishObject.price;
  priceContainer.innerText = `Gesammtpreis: ${formatPrice(total_price)}`;

  if (orders[key]) {
    orders[key].amount++;
    updateOrderItemDOM(key);
    return;
  } else {
    orders[key] = {
      category,
      index: index,
      amount: 1,
      price: dishObject.price,
    };
  }

  CONTAINER_BASKED.innerHTML += createOrderTemplate(key, dishObject);
}

function updateOrderItemDOM(key) {
  const item = orders[key];
  const container = CONTAINER_BASKED.querySelector(`[data-key="${key}"]`);

  if (!container) return;
  container.querySelector(".dish-amount").innerText = item.amount + "x";
  container.querySelector(".dish-price").innerText = formatPrice(
    item.amount * item.price
  );
}

document.addEventListener("click", (element) => {
  const addBtn = element.target.closest(".add-to-basked-btn");
  if (addBtn) {
    const index = addBtn.dataset.index;
    const category = addBtn.dataset.category;
    createOrder(index, category);
    return;
  }
});
