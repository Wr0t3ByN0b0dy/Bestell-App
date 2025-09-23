function createDishTemplate(index, dish, category) {
  return `
    <div class="dish my-16 add-to-basked-btn" data-index="${index}" data-category="${category}">
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
            <button class="cart-btn" data-action="plus" data-key="${key}">+</button>
            <button class="cart-btn" data-action="minus" data-key="${key}">-</button>
          </div>
        </div>
        <hr class="separator" />
    </div>
  `;
}

function createOrderDialog(key, value) {
  return `
    <div class="dialog-order-card">
      <h4 class="px-16 py-16">${value.name}</h4>
        <div class="dialog-amount-price px-32 py-16">
          <p>${value.amount}x</p>
          <p>${formatPrice(value.amount * value.price)}</p>
        </div>
        <hr class="separator" />
    </div>
  `;
}

function createDialogFooter(delivery, total_price) {
  if (delivery) {
    return `
      <div>
        <p>Die voraussichtliche Lieferzeit beträgt ca. 25-30 Minuten.</p>
        <div>
          <p>Gesammtpreis</p>
          <p>${formatPrice(total_price)}</p>
        </div>
      </div>
    `;
  } else {
    return `
    <div>
        <p>Die voraussichtliche Abholzeit beträgt ca. 15–20 Minuten.</p>
        <div>
          <p>Gesammtpreis</p>
          <p>${formatPrice(total_price)}</p>
        </div>
      </div>
    `;
  }
}
