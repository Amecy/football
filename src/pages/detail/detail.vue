<template>
  <div class="detail">
    <div class="header">
      <i class="iconfont icon-fanhui" @click="back" v-if="back"></i>
      <i class="iconfont icon-zuqiu"></i>
      天下足球
    </div>
    <iframe :src="url" frameborder="0" name="test" id="dom01" :height="fHeight"></iframe>
  </div>
</template>

<script>
import Sidebar from 'components/sidebar/sidebar'
  export default {
  	date() {
  		return {
        isSidebar: false
  		}
  	},
    computed: {
      url() {
        let id = this.$route.query.id
        return `http://www.dongqiudi.com/share/article/${id}`
      },
      fHeight() {
        return window.innerHeight
      }
    },
    methods: {
      back(){
        history.go(-2)
      },
      openSidebar() {
        this.isSidebar = true
      },
      closeSidebar(){
        this.isSidebar = false
      }
    },
    components: {
      Sidebar
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.detail
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 100
  .header
    width: 100%
    height: 3.2rem
    line-height: 3.2rem
    font-size: 1.2rem
    text-align: center
    color: $color-w
    background: $color-g
    position: relative
    color: #fff
    .icon-fanhui
      position: absolute
      top: 0
      left: 0
      font-size: 1.5rem
      padding: .8rem
      z-index: 20
      color: #fff
    .icon-sidebar
      position: absolute
      top: .5rem
      right: 0
      font-size: 1.5rem
      padding: 0 .5rem
      z-index: 20
      color: #fff
  iframe
    width: 100%
</style>
