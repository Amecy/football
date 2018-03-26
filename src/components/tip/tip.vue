<template>
  <div class="tip" ref="tip">
    {{changeTip ? '↑松开刷新' : '↓下拉刷新'}}
  </div>
</template>

<script>
  export default {
    props: {
      changeTip: {
        type: Boolean,
        default: false,
        required: true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.tip
  display flex
  flex-direction column-reverse
  position: relative
  text-align: center
  height: 6rem
  padding: 1rem 0
  box-sizing border-box
  color $color-gray
  font-weight 400
</style>