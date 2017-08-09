<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus" rel="sheetstyle/stylus">
  body
    background-color #ebebeb !important
    margin 0

  #app
    -webkit-font-smoothing antialiased;
    -moz-osx-font-smoothing grayscale;
    color #2c3e50;
    background #fff
    position absolute
    width 100%
  #logo
    padding 20px 20px 10px 20px
    margin 0px
    background-color #ffffff
</style>
