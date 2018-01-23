<template>
    <div>
      <div class="products-container">
        <div class="product" v-for="product in manufacturer[0].products" :key="product.id">
          <img :src="product.image" alt="Product image">
          <div class="overlay">
            CART ICON
          </div>
          <div class="price">{{ product.price }}</div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'ProductsPage',
  data () {
    return {
      manufacturer: [
        { name: 'Apple',
          products: [
            { id: 0, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$20' },
            { id: 1, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$20' },
            { id: 2, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$20' },
            { id: 3, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$20' },
            { id: 4, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$20' },
            { id: 5, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$20' },
            { id: 6, model_name: 'MacBook Pro 2017', image: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Blue_Tshirt.jpg', price: '$20' },
            { id: 7, model_name: 'MacBook Pro 2017', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Crew_neck_T-shirt.jpg', price: '$20' },
            { id: 8, model_name: 'MacBook Pro 2017', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Crew_neck_T-shirt.jpg', price: '$20' }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.price{
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  position: absolute;
  right: 0;
  bottom: 40px;
  background: #ff3a7d;
  color: #fff;
  text-align: center;
  padding: 1em 2em;
  width: 306px;
  &::before {
    content: "";
    position: absolute;
    display: block;
    bottom: -1em;
    border: 1.5em solid #ed3775;
    left: -2em;
    border-right-width: 1.5em;
    border-left-color: transparent;
    border-style: solid;
    border-color: #d33169 transparent transparent transparent;
    bottom: -1em;
    left: 0;
    border-width: 1em 0 0 1em;
  }
}
</style>
