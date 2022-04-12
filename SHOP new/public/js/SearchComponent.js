Vue.component('search-form', {
   data() {
      return {
         userSearch: ''
      }
   },
   template: `
            <form class="header__search-form" method="post" action="#" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
               <input class="header__search-form-input" type="text" v-model='userSearch'>
            </form>
            `
});