Vue.component( 'cart', {
    data() {
        return {
            showCart: false,
            cartItems: [],
        }
    },
    methods: {
        addProduct( product ) {
            let find = this.cartItems.find( el => el.id_product === product.id_product );
            if ( find ) {
                this.$parent.putJson( `/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: 1 } )
                    .then( data => {
                        if ( data.result ) {
                            find.quantity++;
                        }
                    } )
            } else {
                let prod = Object.assign( { quantity: 1 }, product );
                this.$parent.postJson( `api/cart/${ product.id_product }/${ product.product_name }`, prod )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.push( prod );
                        }
                    } )
            }
        },
        remove( product ) {
            if ( product.quantity > 1 ) {
                this.$parent.putJson( `/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: -1 } )
                    .then( data => {
                        if ( data.result ) {
                            product.quantity--;
                        }
                    } )
            } else {
                this.$parent.delJson( `/api/cart/${ product.id_product }/${ product.product_name }`, product )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.splice( this.cartItems.indexOf( product ), 1 );
                        } else {
                            console.log( 'error' );
                        }
                    } )
            }
        },
    },
    mounted() {
        this.$parent.getJson( `/api/cart` )
            .then( data => {
                for ( let el of data.contents ) {
                    this.cartItems.push( el )
                }
            } );
    },
    template: `
    <div>
        <a @mouseover="showCart = !showCart" class="header__link header__link-cart" href="./shopping-cart.html">
            <svg class="header__link-img-basket" width="33" height="29">
                <use xlink:href="#basket"></use>
            </svg>
            <svg class="header__link-cart-counter-img" width="19" height="19">
                <use xlink:href="#cart-counter"></use>
            </svg>
        </a>
        <div @mouseleave="showCart = !showCart" class="cart-hover-info" v-show="showCart">
        <ul class="cart-hover-info__list-header" v-show="showCart">
            <li class="cart-hover-info__item-header">Карточка товара</li>
            <li class="cart-hover-info__item-header">Наименование товара</li>
            <li class="cart-hover-info__item-header">Количество</li>
            <li class="cart-hover-info__item-header">Цена за шт.</li>
            <li class="cart-hover-info__item-header">Итого</li>
        </ul>
            <cart-item 
            v-for="item of cartItems" 
            :key="item.id_product"
            :cart-item="item"
            :img="item.imgCart"
            @remove="remove"></cart-item>
            <p class="cart-hover-info__item-header-empty" v-if="cartItems.length == 0">Ваша корзина пуста :(</p>
        </div>
    </div>`
} );

Vue.component( 'cart-item', {
    props: [ 'cartItem', 'img' ],
    template: `
            <div class="cart-hover-info__wrp">
                <div class="cart-hover-info__list">
                    <img :src="img" alt="img-product" class="cart-hover-info__item-img">
                    <p class="cart-hover-info__item">{{cartItem.product_name}}</p>
                    <p class="cart-hover-info__item">Quantity: {{cartItem.quantity}}</p>
                    <p class="cart-hover-info__item">$ {{cartItem.price}} each</p>
                    <p class="cart-hover-info__item">$ {{cartItem.quantity*cartItem.price}}</p>
                </div>
                <button class="cart-hover-info__item-btn" @click="$emit('remove', cartItem)">&times;</button>
            </div>
            `
} )