'use strict';

const cartInfo = document.querySelector('.cart-hover-info');
/**
 * Функция отображения всплывающего окна корзины
 */
function iconMouseoverHandler() {
    cartInfo.style.display = 'block';
}
/**
 * Функция скрытия всплывающего окна корзины
 */
function iconMouseoutHandler() {
    cartInfo.style.display = 'none';
}

const cartIcon = document.querySelector('.header__link-cart');

cartIcon.addEventListener('mouseover', iconMouseoverHandler);
cartIcon.addEventListener('mouseout', iconMouseoutHandler);

class Product {
    constructor(name, quantity, price, totalPrice) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.totalPrice = totalPrice;
    }
}

let cartInfoArray = [];

const btnOverlay = document.querySelectorAll('.products__item-basket-btn');
btnOverlay.forEach(function(btn) {
    btn.addEventListener('click', btnOverlayClickHandler);
})

/**
 * Основная функция добавления информации во всплывающее окно корзины при клике на кнопку карточки товара
 * @param {event} event - pointerevent по кнопке 'Add to cart' в карточке товара
 */
function btnOverlayClickHandler(event) {
    let parentTag = event.currentTarget.parentElement;
    let nameOfProductTag = parentTag.nextElementSibling;
    let quantityOfGoods = 1;
    let descriptionOfProductTag = nameOfProductTag.nextElementSibling;
    let priceCartInfoTag = descriptionOfProductTag.nextElementSibling.lastElementChild;
    let addedProduct = new Product(nameOfProductTag.innerText, quantityOfGoods, +(priceCartInfoTag.innerText), +(priceCartInfoTag.innerText));

    // Добавление первого товара
    if (cartInfoArray.length == 0) {
        cartInfoArray.push(addedProduct);
        addNewInfoOfProduct();
    } else {
    // Поиск уже внесенного товара и корректива его данных, без добавления новой строки товара
        for (let i = 0; i < cartInfoArray.length; i++) {
            if (addedProduct.name == cartInfoArray[i].name) {
                cartInfoArray[i].quantity = cartInfoArray[i].quantity + 1;
                document.getElementById(`quantityOfGoods-${i + 1}`).textContent = cartInfoArray[i].quantity;
                cartInfoArray[i].totalPrice = cartInfoArray[i].price * cartInfoArray[i].quantity;
                document.getElementById(`priceCartInfo-${i + 1}`).textContent = cartInfoArray[i].totalPrice.toFixed(2);
            }
        } 
    }
    // Проверка на наличие нового товара в корзине. Результат проверки - внесения нового товара
    for (let i = 0; i <= cartInfoArray.length; i++) {
        if (i == cartInfoArray.length) {
            cartInfoArray.push(addedProduct);
            addNewInfoOfProduct();
            break;
        } else if (addedProduct.name == cartInfoArray[i].name) {
            break;
        }
    }

    changeTotalPriceOfAllProducts();
    showCounter();
}

/**
 * Функция добавления информации по выбранному товару в разметку всплывающего окна корзины. В шаблонном литерале вычитаем единицу для того,
 * чтобы сослаться на первый объект массива - [0], тогда как длина массива с одним объектом равна единице.
 */
function addNewInfoOfProduct() {
    const cartInfoTotalPrice = document.querySelector('.cart-hover-info__total-price');
    cartInfoTotalPrice.insertAdjacentHTML('beforebegin',
    `<ul class="cart-hover-info__list">
        <li id="nameOfProduct-${cartInfoArray.length}" class="cart-hover-info__item">${cartInfoArray[(cartInfoArray.length - 1)].name}</li>
        <li class="cart-hover-info__item"><span id="quantityOfGoods-${cartInfoArray.length}" class="cart-hover-info__item-q-counter">${cartInfoArray[(cartInfoArray.length - 1)].quantity}</span> шт.</li>
        <li class="cart-hover-info__item">$<span id="unitPrice-${cartInfoArray.length}">${cartInfoArray[(cartInfoArray.length - 1)].price}</span></li>
        <li class="cart-hover-info__item">$<span id="priceCartInfo-${cartInfoArray.length}" class="cart-hover-info__item-total-price">${cartInfoArray[(cartInfoArray.length - 1)].totalPrice}</span></li>
    </ul>`)
}  

let totalPriceOfProducts = document.getElementById('totalPrice');

/**
 * Функция по вычислению общей суммы всех отправленных в корзину товаров
 */
function changeTotalPriceOfAllProducts() {
    let totalPriceCollection = document.querySelectorAll('.cart-hover-info__item-total-price');
    let total = 0;
    
    totalPriceCollection.forEach(function(totalPrice) {
        total = +total + +totalPrice.textContent;
    })
    totalPriceOfProducts.textContent = total.toFixed(2);
}

/**
 * Функция по вычислению количества товара и передачи итогового значения в счетчик, расопложенный возле иконки корзины
 */
function showCounter() {
    let imgPinkEl = document.querySelector('.header__link-cart-counter-img');
    let numIconCounter = document.querySelector('.header__link-cart-counter');
    let totalQuantityCollection = document.querySelectorAll('.cart-hover-info__item-q-counter');
    let totalQuantity = 0;

    if (cartInfoArray.length > 0) {
        imgPinkEl.style.display = 'block';
        numIconCounter.style.display = 'block';      
        totalQuantityCollection.forEach(function(quantity) {
            totalQuantity = totalQuantity + +quantity.textContent;
        })

        numIconCounter.textContent = totalQuantity;
    } else {
        imgPinkEl.style.display = 'none';
        numIconCounter.style.display = 'none';
    }
}