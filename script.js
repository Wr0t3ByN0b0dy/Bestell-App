const CONTAINER_PIZZA = document.getElementById("pizza");
const CONTAINER_PASTA = document.getElementById("pasta");
const CONTAINER_DESSERT = document.getElementById("dessert");
const CONTAINER_DRINKS = document.getElementById("drinks");
const CONTAINER_BASKED = document.getElementById("basked");
const ORDER_DIALOG = document.getElementById("order-dialog");
const BODY = document.getElementsByTagName("body")[0];

let total_price = 0;
let rounded_total_price = 0;
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

  total_price += dishObject.price;
  rounded_total_price = Math.round(total_price);
  document.getElementById("price-value").innerText = `${formatPrice(
    total_price
  )}`;
  document.getElementById("meal-value").innerText = `${formatPrice(
    total_price
  )}`;

  if (orders[key]) {
    orders[key].amount++;
    updateOrderItemDOM(key);
    return;
  } else {
    orders[key] = {
      category,
      index: index,
      amount: 1,
      name: dishObject.name,
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

function createDialog(orders) {
  const orderDialogCard = document.getElementById("dialog-container");
  const orderDialogFooter = document.getElementById("dialog-footer");
  Object.entries(orders).map(([key, value]) => {
    orderDialogCard.innerHTML += createOrderDialog(key, value);
  });
  orderDialogFooter.innerHTML = createDialogFooter(delivery, total_price);
  ORDER_DIALOG.showModal();
  ORDER_DIALOG.classList.toggle("d-none");
  BODY.classList.toggle("overflow-hidden");
}

const buttonActions = {
  "add-to-basked": addToBaskedBtn,
  "cart-add": cartAddBtn,
  "cart-remove": cartRemoveBtn,
  delivery: deliveryBtn,
  pickup: pickupBtn,
  confirm: confirmBtn,
  "open-basked": openBaskedBtn,
  "close-basked": closeBaskedBtn,
};

function addToBaskedBtn(btn) {
  const index = btn.dataset.index;
  const category = btn.dataset.category;

  createOrder(index, category);

  document.getElementById("confirm-order").disabled = false;
}

function cartAddBtn(btn) {
  const key = btn.dataset.key;
  if (!orders[key]) return;

  orders[key].amount++;
  total_price += orders[key].price;
  rounded_total_price = Math.round(total_price);

  updateOrderItemDOM(key);

  document.getElementById("price-value").innerText = `${formatPrice(
    total_price
  )}`;
  document.getElementById("meal-value").innerText = `${formatPrice(
    total_price
  )}`;
}

function cartRemoveBtn(btn) {
  const key = btn.dataset.key;
  if (!orders[key]) return;

  console.log("Debug: dataset-key: " + key);

  orders[key].amount--;
  total_price -= orders[key].price;
  rounded_total_price = Math.round(total_price);

  document.getElementById("price-value").innerText = `${formatPrice(
    total_price
  )}`;
  document.getElementById("meal-value").innerText = `${formatPrice(
    total_price
  )}`;

  if (orders[key].amount <= 0) {
    delete orders[key];
    CONTAINER_BASKED.querySelector(`[data-key="${key}"]`)?.remove();
  } else {
    updateOrderItemDOM(key);
  }

  console.log(total_price);
  if (
    (rounded_total_price === 5 && delivery === true) ||
    (rounded_total_price === 0 && delivery === false)
  ) {
    document.getElementById("confirm-order").disabled = true;
  }
}

function deliveryBtn(btn) {
  if (delivery) return;
  delivery = true;

  total_price += 5;
  rounded_total_price = Math.round(total_price);
  document.getElementById("price-value").innerText = `${formatPrice(
    total_price
  )}`;
  document.getElementById("deliver-value").innerText = `5.00 €`;

  document
    .querySelector("[data-action='pickup']")
    .classList.remove("active-btn");
  btn.classList.add("active-btn");
}

function pickupBtn(btn) {
  if (!delivery) return;
  delivery = false;

  total_price -= 5;
  rounded_total_price = Math.round(total_price);
  document.getElementById("price-value").innerText = `${formatPrice(
    total_price
  )}`;
  document.getElementById("deliver-value").innerText = `0.00 €`;

  document
    .querySelector("[data-action='delivery']")
    .classList.remove("active-btn");
  btn.classList.add("active-btn");
}

function confirmBtn() {
  createDialog(orders);
}

function openBaskedBtn() {
  document
    .getElementById("menu-list-container")
    .classList.add("hide-menu-list");

  document
    .getElementById("main-basked-container")
    .classList.remove("hide-basked");
}

function closeBaskedBtn() {
  document
    .getElementById("menu-list-container")
    .classList.remove("hide-menu-list");

  document.getElementById("main-basked-container").classList.add("hide-basked");
}

document.addEventListener("click", (element) => {
  if (ORDER_DIALOG.open) {
    const orderDialogCard = document.getElementById("dialog-container");
    const rect = ORDER_DIALOG.getBoundingClientRect();
    const inDialog =
      element.clientX >= rect.left &&
      element.clientX <= rect.right &&
      element.clientY >= rect.top &&
      element.clientY <= rect.bottom;

    if (!inDialog) {
      ORDER_DIALOG.close();
      BODY.classList.toggle("overflow-hidden");
      ORDER_DIALOG.classList.toggle("d-none");
      orderDialogCard.innerHTML = "";
    }
  }

  const btn = element.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  const handleButtons = buttonActions[action];

  if (handleButtons) {
    handleButtons(btn);
  }
});
