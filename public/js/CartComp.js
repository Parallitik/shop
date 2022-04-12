const cartItem = {
    props: ['cart_item', 'img'],
    template: `
            <div class="cart-hover-info__wrp">
                <div class="cart-hover-info__list">
                    <img :src="img" alt="img-product" class="cart-hover-info__item-img">
                    <p class="cart-hover-info__item">{{ cart_item.product_name }}</p>
                    <p class="cart-hover-info__item">Quantity: {{ cart_item.quantity }}</p>
                    <p class="cart-hover-info__item">$ {{ cart_item.price }} each</p>
                    <p class="cart-hover-info__item">$ {{ cart_item.quantity * cart_item.price }}</p>
                </div>
                <button class="cart-hover-info__item-btn" @click="$root.$refs.cart.remove(cart_item)">&times;</button>
            </div>
        `
}

const cart = {
    components: {'cart-item': cartItem},
    data () {
        return {
            cartUrl: '/getBasket.json',
            imgCart: './img/img-catalog/card-1.jpg',
            cartShown: false,
            cartItems: []
        }
    },
    methods: {
        addProduct (product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result){
                    let find = this.cartItems.find(el => el.id_product === product.id_product);
                    if(find){
                        find.quantity++;
                    } else {
                        let prod = Object.assign ({quantity: 1}, product)
                        this.cartItems.push (prod)
                    }
                } else {
                    console.log('Some error')
                }
            })
        }, 
        remove (product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result){
                    if (product.quantity > 1) {
                        product.quantity-- 
                    } else {
                        this.cartItems.splice (this.cartItems.indexOf (product), 1)
                    }
                }
            })
        }
    },
    mounted () {
        this.$parent.getJson(`${API + this.cartUrl}`)
        .then(data => {
            for(let el of data.contents){
                this.cartItems.push(el);
            }
        })
    },
    template: `
    <div>
        <a @mouseover="cartShown = !cartShown" class="header__link header__link-cart" href="./shopping-cart.html">
            <svg class="header__link-img-basket" width="33" height="29">
                <use xlink:href="#basket"></use>
            </svg>
            <svg class="header__link-cart-counter-img" width="19" height="19">
                <use xlink:href="#cart-counter"></use>
            </svg>
        </a>
            <div @mouseleave="cartShown = !cartShown" class="cart-hover-info" v-show="cartShown">
                <ul class="cart-hover-info__list-header">
                    <li class="cart-hover-info__item-header">Карточка товара</li>
                    <li class="cart-hover-info__item-header">Наименование товара</li>
                    <li class="cart-hover-info__item-header">Количество</li>
                    <li class="cart-hover-info__item-header">Цена за шт.</li>
                    <li class="cart-hover-info__item-header">Итого</li>
                </ul>
                <cart-item v-for="product of cartItems" :key="product.id_product" :img="imgCart" :cart_item="product"></cart-item>
                <p class="cart-hover-info__item-header-empty" v-if="cartItems.length == 0">Ваша корзина пуста :(</p>
            </div>
    </div>
    `
}