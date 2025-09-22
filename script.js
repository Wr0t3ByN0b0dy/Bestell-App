const SEC_PIZZA = document.getElementById("pizza");
const SEC_PASTA = document.getElementById("pasta");
const SEC_DESSERT = document.getElementById("dessert");
const SEC_DRINKS = document.getElementById("drinks");

function formatPrice(num) {
  return num.toFixed(2) + " €";
}

function getDishes(container, dishArray, func, category) {
  for (let i = 0; i < dishArray.length; i++) {
    container.innerHTML += func(i, dishArray, category);
  }
}

function renderDishes() {
  getDishes(SEC_PIZZA, dishes.pizza, createDishTemplate, "pizza");
  getDishes(SEC_PASTA, dishes.pasta, createDishTemplate, "pasta");
  getDishes(SEC_DESSERT, dishes.dessert, createDishTemplate, "dessert");
  getDishes(SEC_DRINKS, dishes.drinks, createDishTemplate, "drinks");
}
