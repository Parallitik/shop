const filter_el = {
    data () {
        return {
            userSearch: ''
        }
    },
    template: `
    <form class="header__search-form" action="#" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
        <input class="header__search-form-input" type="text" v-model='userSearch'>
    </form>
    `
}