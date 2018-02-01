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
        <!-- <div class="info-item" v-for="(category, index) in product.categories" :key="index">
          <multiselect
            :placeholder="category.name"
            v-model="selectedOptions[category.name]"
            :options="category.values">
          </multiselect>
        </div> -->
        <div v-if="product.categories">
          <div class="info-item" v-if="product.categories[0]">
            <multiselect
              :placeholder="product.categories[0].name"
              v-model="option"
              :options="product.categories[0].values">
            </multiselect>
          </div>
        </div>
        <div v-if="product.categories">
          <div class="info-item" v-if="product.categories[1]">
            <multiselect
              :placeholder="product.categories[1].name"
              v-model="option1"
              :options="product.categories[1].values">
            </multiselect>
          </div>
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
    <sweet-modal title="This is a Tabbed Modal" ref="cartModal" width="80%">
      <sweet-modal-tab title="Tab 1" id="tab1">{{ cart }}</sweet-modal-tab>
      <sweet-modal-tab title="Tab 2" id="tab2">Contents of Tab 2</sweet-modal-tab>
      <sweet-modal-tab title="Tab 3" id="tab3" disabled>Tab 3 is disabled</sweet-modal-tab>
      <!-- icons is an object containing SVG strings -->
    </sweet-modal>
    <sweet-modal ref="alertModal">Select all options</sweet-modal>
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
      option: null,
      option1: null,
      i: [],
      sOption: null,
      arrayO: ['One', 'Two'],
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
        slideToClickedSlide: true,
        slidesOffsetBefore: -200
      }
    }
  },
  mounted () {
    // get product from list of products
    this.products = [].concat(TSHIRTS, MUGS, STICKERS)
    this.products.forEach(el => {
      if (el.id === Number(this.$route.params.id)) {
        this.product = el
      }
    })
    // check if cart is in localstorage
    storage.getItem('cart') ? this.cart = JSON.parse(storage.getItem('cart')) : storage.setItem('cart', JSON.stringify(this.cart))
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
      if (!this.option && !this.option1 && this.product.categories) {
        // show alert if product have option for select
        this.$refs.alertModal.open()
      } else {
        if (this.cart.length === 0) {
          // add product to cart
          this.cart.push({id: this.product.id, image: this.product.images[0], name: this.product.name, price: this.product.price, amount: this.amount, option: this.option, option1: this.option1})
          storage.setItem('cart', JSON.stringify(this.cart))
          this.$refs.cartModal.open()
          console.log('first item', this.cart)
        } else {
          if (this.cart.some(el => (el.id === this.product.id && el.option === this.option && el.option1 === this.option1))) {
            // if product already in cart increase amount in cart
            this.cart.forEach(el => {
              if (el.id === this.product.id && el.option === this.option && el.option1 === this.option1) {
                el.amount += this.amount
                // restart amount
                this.amount = 1
              }
            })
            storage.setItem('cart', JSON.stringify(this.cart))
            this.$refs.cartModal.open()
            console.log('increment', this.cart)
          } else {
            // else add product to cart
            this.cart.push({id: this.product.id, image: this.product.images[0], name: this.product.name, price: this.product.price, amount: this.amount, option: this.option, option1: this.option1})
            storage.setItem('cart', JSON.stringify(this.cart))
            this.$refs.cartModal.open()
            console.log('push', this.cart)
          }
        }
      }
    }
  }
}
</script>
