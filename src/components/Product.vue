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
        <div class="info-item size">
          <multiselect
            placeholder="Size"
            v-model="selectedSize"
            :options="optionsSize">
          </multiselect>
        </div>
        <div class="info-item color">
          <multiselect
            v-model="selectedColor"
            :options="optionsColor">
          </multiselect>
        </div>
        <div class="info-item amount noselect">
          <span @click="changeAmount('-')" class="fi flaticon-minus-symbol operators"></span>
          <span class="noselect amount-value">{{ amount }}</span>
          <span @click="changeAmount('+')" class="fi flaticon-plus-symbol operators"></span>
        </div>
        <div class="info-item price">
          <p>{{ Number(product.price) * amount }} USD</p>
        </div>
        <button class="add-to-cart"><span class="fi flaticon-commerce"></span>Add to cart</button>
      </div>
      <div class="product-details">
        <h2>Details</h2>
        <div class="divider"></div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur perferendis consectetur facere perspiciatis, tempora modi? Necessitatibus, reprehenderit quod illum asperiores quos eius? Incidunt pariatur ad repellat a laudantium exercitationem veniam!Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur perferendis consectetur facere perspiciatis, tempora modi? Necessitatibus, reprehenderit quod illum asperiores quos eius? Incidunt pariatur ad repellat a laudantium exercitationem veniam!
          <br>
          <br>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur perferendis consectetur facere perspiciatis, tempora modi? Necessitatibus, reprehenderit quod illum asperiores quos eius? Incidunt pariatur ad repellat a laudantium exercitationem veniam!
        </p>
      </div>
    </div>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Multiselect from 'vue-multiselect'
import { TSHIRTS, MUGS, STICKERS } from '../data/products.js'

export default {
  name: 'Product',
  components: {
    swiper,
    swiperSlide,
    Multiselect
  },
  data () {
    return {
      product: null,
      products: null,
      selectedColor: null,
      optionsColor: ['list', 'of', 'options'],
      selectedSize: null,
      optionsSize: ['list', 'of', 'options'],
      amount: 1,
      testImg: ['/static/shirt.png', '/static/shirt.png', '/static/shirt.png'],
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
    }
  }
}
</script>
<style lang="scss">
.single {
  margin: 0 0 0 2px;
  margin-top: 40px;
  width: 84px;
}
.swiper-container {
  // background-color: #000;
}
.swiper-slide {
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.gallery-top {
  height: 80% !important;
  width: 100%;
}
.gallery-thumbs {
  height: 20% !important;
  box-sizing: border-box;
  padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
.product-container {
  padding-bottom: 80px;
  .product-gallery {
    width: 50%;
    float: left;
    .thumb {
      cursor: pointer;
    }
  }
  .product-info {
    width: 50%;
    float: left;
    font-family: 'Roboto', sans-serif;
    .info-item {
      padding: 20px 30px;
      .title {
        text-align: left;
        font-size: 28px;
        font-weight: 300;
      }
    }
    .amount {
      text-align: right;
      .operators {
        cursor: pointer;
        color: #989898;
        -webkit-transition: opacity 0.5s ease-in; /* For Safari 3.1 to 6.0 */
        transition: opacity 0.5s ease-in;
        &:hover {
          opacity: 0.6;
        }
      }
      .amount-value {
        font-weight: 400;
        font-size: 20px;
        padding: 0 20px;
      }
    }
    .price {
      padding-top: 50px;
      text-align: right;
      font-size: 45px;
      font-weight: 500;
      color: #3d3d3d;
    }
    .add-to-cart {
      float: right;
      margin-top: 20px;
      margin-right: 30px;
      color: #fff;
      background-color: #ff3a7d;
      padding: 5px 50px;
      font-size: 20px;
      border: 2px solid #fff;
      outline: 2px solid #ff3a7d;
      cursor: pointer;
      -webkit-transition: background-color 0.5s ease-in, border 0.5s ease-in, color 1s ease-in; /* For Safari 3.1 to 6.0 */
      transition: background-color 0.5s ease-in, border 0.5s ease-in, color 1s ease-in;
      &:hover {
        color: #ff3a7d;
        background-color: #fff;
        border: 2px solid #ff3a7d;
        outline: 2px solid #fff;
      }
      span {
        padding-right: 20px;
        font-size: 32px;
        vertical-align: middle;
      }
    }
  }
  .product-details {
    display: inline-block;
    font-family: 'Roboto', sans-serif;
    text-align: left;
    padding: 20px;
    h2 {
      font-size: 32px;
      line-height: 46px;
      font-weight: 500;
      border-bottom: 5px solid #ff3a7d;
      max-width: 320px;
      width: 100%;
    }
    .bold-divider {
      border-bottom: 5px solid #ff3a7d;
      max-width: 320px;
      width: 100%;
    }
    p {
      padding: 20px;
      font-weight: 300;
      font-size: 18px;
      line-height: 22px;
    }
  }
}
</style>
