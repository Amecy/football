<template>
  <div id="app">
    <div class="wrap">
      <top :isBack="isBack()"></top>
      <tab></tab>
    </div>
    <transition name="fade">
      <!-- keep-alive：缓存已渲染的内容  -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!-- 不缓存结果的路由 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Top from 'components/top/top'
import Tab from 'components/tab/tab'
export default {
  name: 'app',
  mounted() {
    console.info("%c天下足球"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:4em")
  },
  methods: {
    isBack() {
      return window.back
    }
  },
  components: {
    Top,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app
  text-align: center
  .wrap
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 999;
    background: #fff;
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
