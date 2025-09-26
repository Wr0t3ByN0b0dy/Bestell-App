const CONTAINER_PIZZA = document.getElementById("pizza");
const CONTAINER_PASTA = document.getElementById("pasta");
const CONTAINER_DESSERT = document.getElementById("dessert");
const CONTAINER_DRINKS = document.getElementById("drinks");
const CONTAINER_BASKED = document.getElementById("basked");
const ORDER_DIALOG = document.getElementById("order-dialog");

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

  const priceContainer = document.getElementById("price-total");

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
}

document.addEventListener("click", (element) => {
  const addOrderBtn = element.target.closest(".add-to-basked-btn");
  const cartBtn = element.target.closest(".cart-btn");
  const baskedBtn = element.target.closest(".basked-btn");

  if (addOrderBtn) {
    const index = addOrderBtn.dataset.index;
    const category = addOrderBtn.dataset.category;
    createOrder(index, category);

    document.getElementById("confirm-order").disabled = false;
  }

  if (cartBtn) {
    const key = cartBtn.dataset.key;
    const action = cartBtn.dataset.action;
    const priceContainer = document.getElementById("price-total");

    if (!orders[key]) return;

    if (action === "plus") {
      orders[key].amount++;
      total_price += orders[key].price;
      priceContainer.innerText = `Gesammtpreis: ${formatPrice(total_price)}`;
      updateOrderItemDOM(key);
    } else if (action === "minus") {
      orders[key].amount--;
      total_price -= orders[key].price;
      priceContainer.innerText = `Gesammtpreis: ${formatPrice(total_price)}`;
      updateOrderItemDOM(key);
      if (orders[key].amount <= 0) {
        delete orders[key];
        const el = CONTAINER_BASKED.querySelector(`[data-key="${key}"]`);
        if (el) el.remove();
      } else {
        updateOrderItemDOM(key);
      }
      if (total_price == 0 || delivery == true) {
        document.getElementById("confirm-order").disabled = true;
      }
    }
  }

  if (baskedBtn) {
    const action = baskedBtn.dataset.action;
    const priceContainer = document.getElementById("price-total");

    if (action === "delivery") {
      if (delivery) return;

      delivery = true;
      total_price += 5;
      priceContainer.innerText = `Gesammtpreis: ${formatPrice(total_price)}`;
    } else if (action === "pickup") {
      if (!delivery) return;

      delivery = false;
      total_price -= 5;
      priceContainer.innerText = `Gesammtpreis: ${formatPrice(total_price)}`;
    } else {
      createDialog(orders);
    }
  }
});
