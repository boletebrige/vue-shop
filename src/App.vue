<template>
  <div id="app">
    <router-link to="/">
      <h1 class="shop-title">Digital<br><span>Retail</span></h1>
    </router-link>
    <router-view/>
    <h1 class="ribbon">
      <span class="ribbon-content">&copy; Copyright 2017.</span>
    </h1>
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './styles/styles';
</style>
