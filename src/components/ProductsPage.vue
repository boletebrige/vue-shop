<template>
    <div>
      <div class="categories">
        <!--  -->
        <span class="fi flaticon-shirt" :class="{ 'active': (products === tshirts) }" @click="category(tshirts)"></span>
        <span class="fi flaticon-mug" :class="{ 'active': (products === mugs) }" @click="category(mugs)"></span>
        <span class="fi flaticon-sticker" :class="{ 'active': (products === stickers) }" @click="category(stickers)"></span>
      </div>
      <div class="divider"></div>
      <div class="products-container">
        <div class="product" v-for="product in products" :key="product.id">
          <img :src="product.image" alt="Product image">
          <div class="overlay">
            <span class="fi flaticon-search"></span>
          </div>
          <div class="price">{{ product.price }}</div>
        </div>
      </div>
    </div>
</template>
<script>
import { TSHIRTS, MUGS, STICKERS } from '../data/products.js'

export default {
  name: 'ProductsPage',
  data () {
    return {
      products: TSHIRTS,
      tshirts: TSHIRTS,
      mugs: MUGS,
      stickers: STICKERS
    }
  },
  methods: {
    category (category) {
      this.products = category
    }
  },
  mounted () {
    // this.category(TSHIRTS)
  }
}
</script>
