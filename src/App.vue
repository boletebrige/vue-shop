<template>
  <div id="app">
    <h1>Digital<br><span>Retail</span></h1>
    <div class="categories">
      <span class="fi flaticon-shirt active"></span>
      <span class="fi flaticon-mug"></span>
      <span class="fi flaticon-sticker"></span>
    </div>
    <div class="divider"></div>
    <router-view/>
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
