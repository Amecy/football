<template>
  <div class="tab">
    <ul>
      <router-link tag="li" v-for="(item, index) in routes" :key="index" :to="item.to">{{item.name}}</router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      routes: {
        type: Array,
        default () {
          return [
            { to: '/news', name: '资讯' },
            { to: '/race', name: '赛程' },
            { to: '/video', name: '视频' },
            { to: '/data', name: '数据' }
          ]
        }
      }
    },
  	date() {
  	},
  	mounted() {
      setTimeout(() => {
      },20)
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
	.tab
		ul
			display: flex
			justify-content: center
			width: 100%
			height: 2.8rem
			line-height: 2.8rem
			font-size: 1.1rem
			li
				flex: 1
				border-bottom: 1px solid $color-border
			  & .router-link-active
				  color: $color-g
				  border-bottom:1px solid $color-g
</style>
