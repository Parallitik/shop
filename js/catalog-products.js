const products = [
    {id: 1, title: 'Notebook', price: 2000, img: './img/img-catalog/card-1.jpg" alt="product-1" width="360" height="420"'},
    {id: 2, title: 'Mouse', price: 20, img: './img/img-catalog/card-2.jpg" alt="product-2" width="360" height="420"'},
    {id: 3, title: 'Keyboard', price: 200, img: './img/img-catalog/card-3.jpg" alt="product-3" width="360" height="420"'},
    {id: 4, title: 'Gamepad', price: 50, img: './img/img-catalog/card-4.jpg" alt="product-4" width="360" height="420"'},
    {id: 5, title: 'Gamepad', price: 50, img: './img/img-catalog/card-5.jpg" alt="product-5" width="360" height="420"'},
    {id: 6, title: 'Gamepad', price: 50, img: './img/img-catalog/card-6.jpg" alt="product-6" width="360" height="420"'},
    {id: 7, title: 'Gamepad', price: 50, img: './img/img-catalog/card-7.jpg" alt="product-7" width="360" height="420"'},
    {id: 8, title: 'Gamepad', price: 50, img: './img/img-catalog/card-8.jpg" alt="product-8" width="360" height="420"'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return  `<ul class="catalog__products-list">
                <li class="catalog__products-item">
                    <div class="products__item-wrp">
                        <div class="products__item-wrp-overlay">
                            <img class="catalog__products-item-img" src="${item.img}">
                            <button class="products__item-basket-btn">Add to Cart</button>
                        </div>
                        <h3 class="catalog__products-item-title">${item.title}</h3>
                        <p class="catalog__products-item-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p class="catalog__products-item-price">$<span>${item.price}</span></p>
                        </div>
                    </li>
            </ul>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.catalog__products').innerHTML = productsList.join('');
};

renderPage(products);

// В массив productsList вносятся все элементы, разделямые запятыми. 
// Насколько я понимаю, при использовании метода InnerHTML наш массив преобразуется в строковое значение и имеет те самые ненужные нам запятые.
// Решение: использовать сепаратор ('') метода join. В возвращаемой строке элементы массива ничем не разделяются, то есть запятая исчезает.