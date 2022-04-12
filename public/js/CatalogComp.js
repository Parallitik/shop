const product = {
    props: ['img', 'product'],
    template:`
    <ul class="catalog__products-list">
        <li class="catalog__products-item">
            <div class="products__item-wrp">
                <div class="products__item-wrp-overlay">
                    <img :src="img" class="catalog__products-item-img" alt="img-product">
                    <button class="products__item-basket-btn" @click="$root.$refs.cart.addProduct(product)">Add to Cart</button>
                </div>
                <h3 class="catalog__products-item-title">{{ product.product_name }}</h3>
                <p class="catalog__products-item-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p class="catalog__products-item-price">$<span>{{ product.price }} $</span></p>
            </div>
        </li>
    </ul>
    `
}

const products = {
    components: {product},
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: './img/img-catalog/card-1.jpg',
            filtered: []
        }
    },
    mounted () {
        console.log (this.$root.$refs)

        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    methods: {
        filter (val) {
			let regExp = new RegExp (val, 'i');
            this.filtered = this.products.filter (el => regExp.test (el.product_name))
        }
    },
    template: `
            <div class="catalog__products">
                <product v-for="product of filtered" :key="product.id_product" :img="imgCatalog" :product="product"></product>
            </div>
            `
}