<template>
  <div id="app">
    <h1 class="shop-title">Digital<br><span>Retail</span></h1>
    <div class="categories">
      <span class="fi flaticon-shirt active"></span>
      <span class="fi flaticon-mug"></span>
      <span class="fi flaticon-sticker"></span>
    </div>
    <div class="divider"></div>
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

.ribbon {
  font-size: 16px !important;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  position: relative;
  background: #ff3a7d;
  color: #fff;
  text-align: center;
  padding: 1em 2em;
  margin: 2em auto 3em;
  margin-top: -40px;
}
.ribbon:before, .ribbon:after {
  content: "";
  position: absolute;
  display: block;
  bottom: -1em;
  border: 1.5em solid #ed3775;
  z-index: -1;
}
.ribbon:before {
  left: -2em;
  border-right-width: 1.5em;
  border-left-color: transparent;
}
.ribbon:after {
  right: -2em;
  border-left-width: 1.5em;
  border-right-color: transparent;
}
.ribbon .ribbon-content:before, .ribbon .ribbon-content:after {
  content: "";
  position: absolute;
  display: block;
  border-style: solid;
  border-color: #804f7c transparent transparent transparent;
  bottom: -1em;
}
.ribbon .ribbon-content:before {
  left: 0;
  border-width: 1em 0 0 1em;
}
.ribbon .ribbon-content:after {
  right: 0;
  border-width: 1em 1em 0 0;
}
</style>
