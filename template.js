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
