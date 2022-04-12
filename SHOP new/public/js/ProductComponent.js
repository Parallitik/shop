Vue.component('products', {
    data(){
        return {
            catalogUrl: `/catalogData.json`,
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
            <div class="catalog__products">
                <product v-for="product of filtered" :key="product.id_product" :img="product.imgProduct" :product="product"></product>
            </div>
            `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `            
            <ul class="catalog__products-list">
                <li class="catalog__products-item">
                    <div class="products__item-wrp">
                        <div class="products__item-wrp-overlay">
                            <img :src="img" class="catalog__products-item-img" :alt="product.product_name">
                            <button class="products__item-basket-btn" @click="$root.$refs.cart.addProduct(product)">Add to Cart</button>
                        </div>
                        <h3 class="catalog__products-item-title">{{ product.product_name }}</h3>
                        <p class="catalog__products-item-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p class="catalog__products-item-price">$<span>{{ product.price }} $</span></p>
                    </div>
                </li>
            </ul>
            `
})