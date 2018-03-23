<template>
	<div class="loading">
		<img :src="loading" alt="加载中...">
	</div>
</template>

<script>
export default {
  data() {
  	let loadImg = require("common/images/loading.gif")
  	return {
      loading: loadImg
  	}
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading
    position: fixed
    top: 0
    width: 100%
    height: 100%
    z-index: 500
    display: flex
    align-items: center
    justify-content: center
   img
     width: auto;
     height: 8rem;
     opacity: 0.8;
</style>
