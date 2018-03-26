<template>
	<div :class="['loading', mask?'mask':'', alpha?'alpha':'']">
    <!-- 跳跃的点 -->
    <div v-if="loadingType === 'dot'" class="wrap">
      <div class="loader">
        <div class="loader-inner ball-pulse-sync">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <!-- 轮转~ -->
    <div v-else-if="loadingType === 'ring'" class="wrap">
      <div class="loader-inner line-spin-fade-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else class="wrap">
      <img :src="loading" alt="加载中...">
    </div>
	</div>
</template>

<script>
export default {
  props: {
    // 加载动画类型
    loadingType: {
      type: String,
      default: 'ring'
    },
    // 加载时是否包含背景
    mask: {
      type: Boolean,
      default: false
    },
    // mask 是否半透明
    alpha: {
      type: Boolean,
      default: false
    }
  },
  data() {
  	let loadImg = require("common/images/loading.gif")
  	return {
      loading: loadImg
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $loading-bg = rgba(0,0,0,0.6)
  .loading
    position: fixed
    top: 0
    width: 100%
    height: 100%
    z-index: 500
    display: flex
    align-items: center
    justify-content: center
  .mask
    background: #fff
  .alpha
    background-color: rgba(255,255,255,0.3)
   img
     width: auto
     height: 8rem
     opacity: 0.8

  .wrap
    position: relative
    box-sizing: border-box
    display: flex
    flex: 0 1 auto
    flex-direction: column
    flex-grow: 1
    flex-shrink: 0
    flex-basis: 25%
    max-width: 25%
    height: 50px
    align-items: center
    justify-content: center
    .ball-pulse-sync
      & > div
        display: inline-block
        background-color: $loading-bg
        width: 6px
        height: 6px
        border-radius: 100%
        margin: 2px
        animation: ball-pulse-sync 0.6s 0.07s infinite ease-in-out
        animation-fill-mode: both
        &:nth-child(1)
          animation: ball-pulse-sync 0.6s 0.07s infinite ease-in-out
        &:nth-child(2)
          animation: ball-pulse-sync 0.6s 0.14s infinite ease-in-out
        &:nth-child(3)
          animation: ball-pulse-sync 0.6s 0.21s infinite ease-in-out
    .line-spin-fade-loader
      position: relative
      transform scale(0.7)
      & > div
        position: absolute
        width: 5px
        height: 15px
        background-color: $loading-bg
        border-radius: 2px
        margin: 2px
        animation-fill-mode: both
        &:nth-child(1)
          top: 20px;
          left: 0;
          animation: line-spin-fade-loader 0.96s 0.12s infinite ease-in-out
        &:nth-child(2)
          top: 13.63636px
          left: 13.63636px
          transform: rotate(-45deg)
          animation: line-spin-fade-loader 0.96s 0.24s infinite ease-in-out
        &:nth-child(3)
          top: 0
          left: 20px
          transform: rotate(90deg)
          animation: line-spin-fade-loader 0.96s 0.36s infinite ease-in-out
        &:nth-child(4)
          top: -13.63636px
          left: 13.63636px
          transform: rotate(45deg)
          animation: line-spin-fade-loader 0.96s 0.48s infinite ease-in-out
        &:nth-child(5)
          top: -20px
          left: 0
          animation: line-spin-fade-loader 0.96s 0.6s infinite ease-in-out
        &:nth-child(6)
          top: -13.63636px
          left: -13.63636px
          transform: rotate(-45deg)
          animation: line-spin-fade-loader 0.96s 0.72s infinite ease-in-out
        &:nth-child(7)
          top: 0
          left: -20px
          transform: rotate(90deg)
          animation: line-spin-fade-loader 0.96s 0.84s infinite ease-in-out
        &:nth-child(8)
          top: 13.63636px
          left: -13.63636px
          transform: rotate(45deg)
          animation: line-spin-fade-loader 0.96s 0.96s infinite ease-in-out

  @keyframes ball-pulse-sync
    33%
      transform: translateY(10px)
    66%
      transform: translateY(-10px)
    100%
      transform: translateY(0)
  @keyframes line-spin-fade-loader
    0%
      opacity: 0.3
    100%
      opacity: 1
</style>
