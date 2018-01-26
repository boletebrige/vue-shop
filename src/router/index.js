import Vue from 'vue'
import Router from 'vue-router'
import ProductsPage from '@/components/ProductsPage'
import Product from '@/components/Product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductsPage',
      component: ProductsPage
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product
    }
  ]
})
