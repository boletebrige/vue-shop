<template>
<div v-if="product">
    <div class="categories single">
      <router-link to="/"><span class="fi flaticon-buildings"></span></router-link>
    </div>
    <div class="divider"></div>
    <div class="product-container cf">
      <div class="product-gallery" style="height: 500px">
        <!-- swiper1 -->
        <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
          <swiper-slide class="slide" v-for="(image, index) in product.images" :key="index" :style="{ 'background-image': 'url(' + image + ')' }"></swiper-slide>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        </swiper>
        <!-- swiper2 Thumbs -->
        <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
          <swiper-slide class="slide thumb" v-for="(image, index) in product.images" :key="index" :style="{ 'background-image': 'url(' + image + ')' }"></swiper-slide>
        </swiper>
      </div>
      <div class="product-info">
        <div class="info-item">
          <h2 class="title">{{ product.name }}</h2>
        </div>
        <div class="info-item" v-for="(category, index) in product.categories" :key="index">
          <multiselect
            :placeholder="category.name"
            v-model="selectedOptions[category.name]"
            :options="category.values">
          </multiselect>
        </div>
        <div class="info-item price cf">
          <div class="amount noselect">
            <span @click="changeAmount('-')" class="fi flaticon-minus-symbol operators"></span>
            <span class="noselect amount-value">{{ amount }}</span>
            <span @click="changeAmount('+')" class="fi flaticon-plus-symbol operators"></span>
          </div>
          <p>{{ Number(product.price) * amount }} USD</p>
        </div>
        <button class="add-to-cart" @click="addToCart"><span class="fi flaticon-commerce"></span>Add to cart</button>
      </div>
      <div class="product-details" v-if="product.description">
        <h2>Details</h2>
        <div class="divider"></div>
        <p>
          {{ product.description }}
        </p>
      </div>
    </div>
    <sweet-modal title="This is a Tabbed Modal" ref="cartModal">
      <sweet-modal-tab title="Tab 1" id="tab1">Contents of Tab 1</sweet-modal-tab>
      <sweet-modal-tab title="Tab 2" id="tab2">Contents of Tab 2</sweet-modal-tab>
      <sweet-modal-tab title="Tab 3" id="tab3" disabled>Tab 3 is disabled</sweet-modal-tab>
      <!-- icons is an object containing SVG strings -->
    </sweet-modal>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Multiselect from 'vue-multiselect'
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import { TSHIRTS, MUGS, STICKERS } from '../data/products.js'

var storage = window.localStorage

export default {
  name: 'Product',
  components: {
    swiper,
    swiperSlide,
    Multiselect,
    SweetModal,
    SweetModalTab
  },
  data () {
    return {
      cart: [],
      product: null,
      products: null,
      selectedOptions: [],
      amount: 1,
      // swiper options
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },
  mounted () {
    // swiper settings
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
    this.products = [].concat(TSHIRTS, MUGS, STICKERS)
    this.products.forEach(el => {
      if (el.id === Number(this.$route.params.id)) {
        this.product = el
      }
    })
    // check if car is in localstorage
    if (storage.getItem('cart')) {
      this.cart = JSON.parse(storage.getItem('cart'))
    } else {
      storage.setItem('cart', JSON.stringify(this.cart))
    }
    console.log(this.cart)
  },
  methods: {
    changeAmount (operator) {
      switch (operator) {
        case '-':
          this.amount === 1 ? this.amount = this.amount : this.amount--
          break
        case '+':
          this.amount++
          break
      }
    },
    addToCart () {
      // console.log(this.selectedOptions)
      // change ammount number if product is selected
      // if (this.cart.length === 0) {
      //   this.cart.push({id: this.product.id, image: this.product.images[0], name: this.product.name, price: this.product.price, amount: this.amount, selectedOptions: this.selectedOptions})
      //   storage.setItem('cart', JSON.stringify(this.cart))
      //   console.log(this.cart)
      // } else {
      //   this.cart.forEach(el => {
      //     if (el.id === this.product.id && el.selectedOptions === this.selectedOptions) {
      //       el.amount += this.amount
      //       storage.setItem('cart', JSON.stringify(this.cart))
      //       console.log('if', this.cart)
      //     } else {
      //       this.cart.push({id: this.product.id, image: this.product.images[0], name: this.product.name, price: this.product.price, amount: this.amount, selectedOptions: this.selectedOptions})
      //       storage.setItem('cart', JSON.stringify(this.cart))
      //       console.log('else', this.cart)
      //     }
      //   })
      // }
      this.cart.push({id: this.product.id, image: this.product.images[0], name: this.product.name, price: this.product.price, amount: this.amount, selectedOptions: this.selectedOptions})
      storage.setItem('cart', JSON.stringify(this.cart))
      console.log(this.cart)
      this.$refs.cartModal.open()
    }
  }
}
</script>
