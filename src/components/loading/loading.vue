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
   width: 100%
   height: auto
   padding: 20% 0
   img
     width: auto;
     height: 8rem;
     opacity: 0.8;
</style>
