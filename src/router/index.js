import Vue from 'vue'
import Router from 'vue-router'
import ProductsPage from '@/components/ProductsPage'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'

// Vue.use(VueMaterial)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductsPage',
      component: ProductsPage
    }
  ]
})
