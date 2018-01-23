<template>
    <div>
      <div class="products-container">
        <div class="product" v-for="product in manufacturer[0].products" :key="product.id">
          <img :src="product.image" alt="Product image">
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
            { id: 0, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$1999' },
            { id: 1, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$1999' },
            { id: 2, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$1999' },
            { id: 3, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$1999' },
            { id: 4, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$1999' },
            { id: 5, model_name: 'MacBook Pro 2017', image: './static/shirt.png', price: '$1999' },
            { id: 6, model_name: 'MacBook Pro 2017', image: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Blue_Tshirt.jpg', price: '$1999' },
            { id: 7, model_name: 'MacBook Pro 2017', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Crew_neck_T-shirt.jpg', price: '$1999' },
            { id: 8, model_name: 'MacBook Pro 2017', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Crew_neck_T-shirt.jpg', price: '$1999' }
          ]
        }
      ]
    }
  }
}
</script>
