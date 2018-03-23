<template>
  <div class="sidebar" v-show="visible">
    <transition name="slide">
      <div class="wrapper" v-show="visible">
        <i class="iconfont icon-close" @click="close"></i>
        <div class="top">
          <img src="../../common/images/avatar.jpg">
        </div>
        <div class="content">
          <p>Amecy</p>
          <h3>天下足球<br /> 不专业、不权威</h3>
        </div>
      </div>
      </transition>
    <div class="mask" @click.stop="close"></div>
  </div>
</template>
<script>

// 动画效果如果是组件内要搭配v-show，如果是在引用的组件包裹的transition则需要用v-if
// css动画的样式要写在transition标签里面的第一个元素下面
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .sidebar
    .mask
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      z-index: 30
      background: rgba(0,0,0,.6)
    .wrapper
      width: 60%
      height: 100%
      position: fixed
      top: 0
      right: 0
      z-index: 40
      background: rgba(0,0,0,0.8)
      color: #16b13a

      &.slide-enter-active, &.slide-leave-active
        transition: all .2s cubic-bezier(0, 0, 0.3, 1)
      &.slide-enter, &.slide-leave-to
        transform: translateX(50%)
        opacity: 0;
  .icon-close
        position: absolute
        top: 0
        right: 0
        font-size: 1rem
        padding: 1.2rem 1rem
        z-index: 20
        color: #fff
      &:after
        content: 'X'
        position: absolute
        top: .5rem
        right: .5rem
        color: #fff
        font-size: 1.2rem
        display: none
      .top
        width: 5rem
        height: 5rem
        margin: 0 auto
        padding: 25% 0 4% 0
        img
          width: 100%
      .content
        p
          font-size: 1.2rem
          line-height: 1.4rem
          color: #fff
        h3
          padding-top: 8%
          color: rgba(244,210,32,1)
          font-size: 1.2rem
          line-height: 1.4rem
</style>
