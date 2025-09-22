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
