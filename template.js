function createDishTemplate(index, dish, category) {
  return `
    <div class="dish my-16 add-to-basked-btn" data-action="add-to-basked" data-index="${index}" data-category="${category}">
      <div class="px-16">
        <h3 class="dish-name py-16">${dish[index].name}</h3>
        <p class="ingredients">- ${dish[index].ingredients}</p>
      </div>
      <div class="flex-row">
        <p class="dish-price">${formatPrice(dish[index].price)}</p>
      </div>
    </div>
  `;
}

function createOrderTemplate(key, dishObject) {
  return `
    <div class="order-item py-16" data-key="${key}">
      <h4 class="order-name px-16">${dishObject.name}</h4>
        <div class="order py-16">
          <p class="dish-amount">1x</p>
          <p class="dish-price">${formatPrice(dishObject.price)}</p>
          <div class="order-btn-container">
            <button data-action="cart-add" class="cart-btn" data-key="${key}">+</button>
            <button data-action="cart-remove" class="cart-btn" data-key="${key}">-</button>
          </div>
        </div>
        <hr class="separator" />
    </div>
  `;
}

function createOrderDialog(key, value) {
  return `
    <div class="dialog-order-card px-32">
      <h4 class="py-16 font-size-24">${value.name}</h4>
        <div class="dialog-amount-price py-16">
          <p class="font-size-24">${value.amount}x</p>
          <p class="font-size-24 color-255-81-0">${formatPrice(
            value.amount * value.price
          )}</p>
        </div>
    </div>
    <hr class="separator" />
  `;
}

function createDialogFooter(delivery, total_price) {
  if (delivery) {
    return `
      <div>
        <p class="font-size-28">Die voraussichtliche Lieferzeit beträgt ca. 25-30 Minuten.</p>
        <div class="dialog-footer-price py-16">
          <p class="font-size-24">Gesammtpreis</p>
          <p class="font-size-24 color-255-81-0">${formatPrice(total_price)}</p>
        </div>
      </div>
    `;
  } else {
    return `
    <div>
        <p class="font-size-28">Die voraussichtliche Abholzeit beträgt ca. 15-20 Minuten.</p>
        <div class="dialog-footer-price py-16">
          <p class="font-size-24">Gesammtpreis</p>
          <p class="font-size-24 color-255-81-0">${formatPrice(total_price)}</p>
        </div>
      </div>
    `;
  }
}
