class ProductList {
    constructor (container='.catalog__products') {
        this.container = container;
        this.goods = [];
        this.totalPrice = 0;
        this._fetchProducts(); // метод вызывается в текущем классе
        this.render();
    }
    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Jacket', price: 2000, img: './img/img-catalog/card-1.jpg" alt="product-1" width="360" height="420"'},
            {id: 2, title: 'T-Shirt', price: 20, img: './img/img-catalog/card-2.jpg" alt="product-2" width="360" height="420"'},
            {id: 3, title: 'Jacket', price: 200, img: './img/img-catalog/card-3.jpg" alt="product-3" width="360" height="420"'},
            {id: 4, title: 'Coat', price: 50, img: './img/img-catalog/card-4.jpg" alt="product-4" width="360" height="420"'},
            {id: 5, title: 'Polo', price: 30, img: './img/img-catalog/card-5.jpg" alt="product-5" width="360" height="420"'},
            {id: 6, title: 'Shoes', price: 70, img: './img/img-catalog/card-6.jpg" alt="product-6" width="360" height="420"'},
            {id: 7, title: 'Shirt', price: 110, img: './img/img-catalog/card-7.jpg" alt="product-7" width="360" height="420"'},
            {id: 8, title: 'Socks', price: 80, img: './img/img-catalog/card-8.jpg" alt="product-8" width="360" height="420"'},
            {id: 9, title: 'Jacket', price: 150, img: './img/img-catalog/card-9.jpg" alt="product-9" width="360" height="420"'}
        ]
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
    getTotalPrice() {
        this.goods.forEach(product => {
            this.totalPrice += product.price; 
        })
        console.log(`Общая стоимость товаров составляет ${this.totalPrice}`);
        return this.totalPrice;
    }
}

class ProductItem {
    constructor (product){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.img;
    }
    render() {
        return `<ul class="catalog__products-list">
                    <li class="catalog__products-item">
                    <div class="products__item-wrp">
                    <div class="products__item-wrp-overlay">
                        <img class="catalog__products-item-img" src="${this.img}">
                        <button class="products__item-basket-btn">Add to Cart</button>
                    </div>
                    <h3 class="catalog__products-item-title">${this.title}</h3>
                    <p class="catalog__products-item-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p class="catalog__products-item-price">$<span>${this.price}</span></p>
                    </div>
                    </li>
                </ul>`
    }
}

// проверка работы кода
const productList = new ProductList();
productList.getTotalPrice();

// классы ДЗ №2

class CartListProducts {
    constructor (container='') {
        this.container = container;
        this.goods = [];
        this.totalPrice = 0;
        this.fetchCartGoods();
    };
    _fetchCartGoods() {
        this.goods = [];
        //метод заполняет массив товаров, приобретаемых пользователем
    }
    getPriceOfCart(){
        //метод высчитывает общую стоимость товаров в корзине
    }
}

class CartProduct {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
        this.color = product.color; // добавлен цвет товара
        this.size = size; //добавлен размер товара
    }
    render() {
        //метод заполнения верстки товаров в корзине
    }
    getTotalPrice(product) {
        //метод определяет общую стоимость конкретного товара в корзине
    }
    getTotalQuantity(product){
        //метод определяет общее количество конкретного товара, помещенного пользователем в корзину
    }
}
