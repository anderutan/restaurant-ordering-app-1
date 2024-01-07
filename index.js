import { menuArray } from '/data.js';

const body = document.querySelector('body');

document.addEventListener('click', function (e) {
  if (e.target.dataset.addBtn) {
    handleAddBtnClick(e.target.dataset.addBtn);
  } else if (e.target.id === 'order-remove-btn') {
    handleRemoveBtnClick(e);
  } else if (e.target.id === 'complete-order-btn') {
    handleCompleteOrderBtnClick();
  } else if (e.target.id === 'pay-btn') {
    handlePayBtnClick(e);
  }
  calculateTotalPrice();
});

function render(array) {
  renderHeader();
  renderMain(array);
}

function renderHeader() {
  const header = document.createElement('header');
  header.classList.add('heading');
  header.setAttribute('id', 'heading');

  const h1 = document.createElement('h1');
  h1.textContent = `Anderu's Diner`;

  const para = document.createElement('p');
  para.textContent = 'The best burgers and pizza in town.';

  header.appendChild(h1);
  header.appendChild(para);

  body.appendChild(header);
}

function renderMain(array) {
  const menu = renderMenu(array);
  const orderSection = renderOrder();

  const main = document.createElement('main');
  main.classList.add('ordering-section');
  main.setAttribute('id', 'ordering-section');
  main.appendChild(menu);
  main.appendChild(orderSection);

  body.appendChild(main);
}

function renderMenu(array) {
  const divMenuItemsSection = document.createElement('div');
  divMenuItemsSection.classList.add('menu-items');
  divMenuItemsSection.setAttribute('id', 'menu-items');

  array.forEach((item) => {
    const divMenuItem = document.createElement('div');
    divMenuItem.classList.add('menu-item');
    divMenuItem.setAttribute('id', 'menu-item');

    const iconImg = document.createElement('img');
    iconImg.src = item.image;
    iconImg.alt = `${item.name} Icon`;

    const divItemDetail = document.createElement('div');
    divItemDetail.classList.add('item-detail');

    const h3 = document.createElement('h3');
    h3.classList.add('item-name');
    h3.textContent = item.name;

    const paraDesc = document.createElement('p');
    paraDesc.classList.add('item-description');
    paraDesc.textContent = item.ingredients.join(', ');

    const paraPrice = document.createElement('p');
    paraPrice.classList.add('item-price');
    paraPrice.textContent = `$${item.price}`;

    const addButton = document.createElement('button');
    addButton.classList.add('add-btn');
    addButton.setAttribute('id', 'add-btn');
    addButton.setAttribute('data-add-btn', `${item.id}`);
    addButton.textContent = '+';

    divItemDetail.appendChild(h3);
    divItemDetail.appendChild(paraDesc);
    divItemDetail.appendChild(paraPrice);

    divMenuItem.appendChild(iconImg);
    divMenuItem.appendChild(divItemDetail);
    divMenuItem.appendChild(addButton);

    divMenuItemsSection.appendChild(divMenuItem);
  });
  return divMenuItemsSection;
}

function renderOrder() {
  const divCustomerOrderSection = document.createElement('div');
  divCustomerOrderSection.classList.add('customer-order-section');
  divCustomerOrderSection.setAttribute('id', 'customer-order-section');

  const para = document.createElement('p');
  para.classList.add('order-title');
  para.textContent = 'Your order';

  const divOrderItemsSection = document.createElement('div');
  divOrderItemsSection.classList.add('order-items-section');
  divOrderItemsSection.setAttribute('id', 'order-items-section');

  const divTotalPriceSection = document.createElement('div');
  divTotalPriceSection.classList.add('total-price-section');
  divTotalPriceSection.setAttribute('id', 'total-price-section');

  const paraTotal = document.createElement('p');
  paraTotal.classList.add('total-price-tag');
  paraTotal.textContent = 'Total price';

  const paraPrice = document.createElement('p');
  paraPrice.classList.add('total-price');
  paraPrice.setAttribute('id', 'total-price');
  paraPrice.textContent = 0.0;

  const completeOrderBtn = document.createElement('button');
  completeOrderBtn.classList.add('complete-order-btn');
  completeOrderBtn.setAttribute('id', 'complete-order-btn');
  completeOrderBtn.textContent = 'Complete order';

  divTotalPriceSection.appendChild(paraTotal);
  divTotalPriceSection.appendChild(paraPrice);

  divCustomerOrderSection.appendChild(para);
  divCustomerOrderSection.appendChild(divOrderItemsSection);
  divCustomerOrderSection.appendChild(divTotalPriceSection);
  divCustomerOrderSection.appendChild(completeOrderBtn);

  return divCustomerOrderSection;
}

function handleAddBtnClick(itemId) {
  const targetItemObj = menuArray.filter(function (item) {
    return item.id === +itemId;
  })[0];

  const divOrderItemsSection = document.querySelector('#order-items-section');

  const divOrderItem = document.createElement('div');
  divOrderItem.classList.add('order-item');
  divOrderItem.setAttribute('id', 'order-item');

  const paraName = document.createElement('p');
  paraName.classList.add('item-name');
  paraName.setAttribute('id', 'item-name');
  paraName.textContent = targetItemObj.name;

  const button = document.createElement('button');
  button.classList.add('order-remove-btn');
  button.setAttribute('id', 'order-remove-btn');
  button.textContent = 'remove';

  const paraPrice = document.createElement('p');
  paraPrice.classList.add('order-item-price');
  paraPrice.setAttribute('id', 'order-item-price');
  paraPrice.textContent = `$${targetItemObj.price.toFixed(2)}`;

  divOrderItem.appendChild(paraName);
  divOrderItem.appendChild(button);
  divOrderItem.appendChild(paraPrice);

  divOrderItemsSection.appendChild(divOrderItem);
}

function handleRemoveBtnClick(event) {
  event.target.parentElement.remove();
}

function handlePayBtnClick(event) {
  event.preventDefault();
  document.querySelector('.card-detail').style.display = 'none';
  document.querySelector('.customer-order-section').style.display = 'none';

  const name = document.querySelector('#name');
  const cardNum = document.querySelector('#card-num');
  const cardCvv = document.querySelector('#cvv-num');

  localStorage.setItem('name', name.value);
  localStorage.setItem('cardNumber', cardNum.value);
  localStorage.setItem('cardCvv', cardCvv.value);

  thankYouMessage();
}

function thankYouMessage() {
  const divThankYou = document.createElement('div');
  divThankYou.classList.add('thank-you-message');
  divThankYou.setAttribute('id', 'thank-you-message');

  const para = document.createElement('p');
  const name = localStorage.getItem('name');
  para.textContent = `Thanks, ${name}! Your order is on its way!`;

  const divRating = document.createElement('div');
  divRating.classList.add('rating-card');

  const paraRate = document.createElement('p');
  paraRate.textContent = 'Please rate our service!';

  const breakEl = document.createElement('br');

  const span1 = createStar(1);
  const span2 = createStar(2);
  const span3 = createStar(3);
  const span4 = createStar(4);
  const span5 = createStar(5);

  const paraOutput = document.createElement('p');
  paraOutput.classList.add('output');
  paraOutput.setAttribute('id', 'output');
  paraOutput.textContent = 'Rating is: 0/5';

  divRating.appendChild(paraRate);
  divRating.appendChild(breakEl);
  divRating.appendChild(span1);
  divRating.appendChild(span2);
  divRating.appendChild(span3);
  divRating.appendChild(span4);
  divRating.appendChild(span5);
  divRating.appendChild(paraOutput);

  divThankYou.appendChild(para);
  divThankYou.appendChild(divRating);

  document.querySelector('#ordering-section').appendChild(divThankYou);

  starRating();
}

// idea from https://www.geeksforgeeks.org/star-rating-using-html-css-and-javascript/
function starRating() {
  const stars = document.querySelectorAll('.star');
  const output = document.querySelector('#output');

  function gfg(n) {
    remove();
    let cls = '';
    for (let i = 0; i < n; i++) {
      if (n == 1) cls = 'one';
      else if (n == 2) cls = 'two';
      else if (n == 3) cls = 'three';
      else if (n == 4) cls = 'four';
      else if (n == 5) cls = 'five';
      stars[i].className = 'star ' + cls;
    }
    output.textContent = 'Rating is: ' + n + '/5';
  }
  function remove() {
    let i = 0;
    while (i < 5) {
      stars[i].className = 'star';
      i++;
    }
  }

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      gfg(index + 1);
    });
  });
}

function createStar(index) {
  const star = document.createElement('span');
  star.classList.add('star');
  star.textContent = '★';
  return star;
}

function calculateTotalPrice() {
  const totalPriceElement = document.querySelector('#total-price');
  const orderItemPrices = document.querySelectorAll('.order-item-price');

  let total = 0;
  orderItemPrices.forEach((price) => {
    total += parseFloat(price.textContent.replace('$', ''));
  });

  totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

function handleCompleteOrderBtnClick() {
  const divCardDetail = document.createElement('div');
  divCardDetail.classList.add('card-detail');
  divCardDetail.setAttribute('id', 'card-detail');

  const form = document.createElement('form');
  form.classList.add('card-detail-form');

  const divCardDetailTitle = document.createElement('div');
  divCardDetailTitle.classList.add('card-detail-title');
  divCardDetailTitle.setAttribute('id', 'card-detail-title');

  const img = document.createElement('img');
  img.src = 'image/credit.png';

  const para = document.createElement('p');
  para.classList.add('form-title');
  para.textContent = 'Enter card details';

  const inputName = document.createElement('input');
  inputName.type = 'text';
  inputName.setAttribute('id', 'name');
  inputName.setAttribute('required', 'true');
  inputName.name = 'name';
  inputName.placeholder = 'Enter your name';

  const inputNumber = document.createElement('input');
  inputNumber.type = 'number';
  inputNumber.setAttribute('id', 'card-num');
  inputNumber.setAttribute('required', 'true');
  inputNumber.name = 'card-number';
  inputNumber.placeholder = 'Enter card number';

  const inputCvv = document.createElement('input');
  inputCvv.type = 'number';
  inputCvv.setAttribute('id', 'cvv-num');
  inputCvv.setAttribute('required', 'true');
  inputCvv.name = 'cvv-number';
  inputCvv.placeholder = 'Enter CVV';

  const handleInput = function () {
    let inputValue = this.value;

    if (this.id === 'card-num') {
      if (inputValue.length > 16) {
        inputValue = inputValue.slice(0, 16);
      }
    } else if (this.id === 'cvv-num') {
      if (inputValue.length > 3) {
        inputValue = inputValue.slice(0, 3);
      }
    }

    this.value = inputValue;
  };

  inputNumber.addEventListener('input', handleInput);
  inputCvv.addEventListener('input', handleInput);

  const button = document.createElement('button');
  button.classList.add('pay-btn');
  button.setAttribute('id', 'pay-btn');
  button.textContent = 'Pay';

  divCardDetailTitle.appendChild(img);
  divCardDetailTitle.appendChild(para);

  form.appendChild(divCardDetailTitle);
  form.appendChild(inputName);
  form.appendChild(inputNumber);
  form.appendChild(inputCvv);
  form.appendChild(button);

  divCardDetail.appendChild(form);
  body.appendChild(divCardDetail);
}

render(menuArray);
