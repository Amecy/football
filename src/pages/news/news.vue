<template>
  <div class="news">
    <scroll ref="scroll" class="news-content" :data="newsList"
            :pullup="true" :pulldown="true" :listenScroll="true"
            v-on:pulldown="reload" v-on:scrollToEnd="_getMoreData" v-on:scroll="scroll">
      <div>
        <tip :changeTip="changeTip"></tip>
        <div v-if="ads.length" class="slider-wrapper" ref="sliderWrapper">
          <slider :interval="2000" :autoPlay="true" :loop="true">
            <div v-for="item in ads" :key="item.picUrl">
              <a :href="item.linkUrl" target="_blank">
                <img :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <h2>最新资讯</h2>
        <ul class="title">
          <router-link v-for="(item, idx) in newsList" tag="li" :id="item.id" :key="idx"
                       :to="{ path: 'news/detail', query: {id: item.id}}">
            <div class="left">
              <img v-lazy="item.litpic">
            </div>
            <div class="right">
              <!--<h3 v-text="item.title"></h3>-->
              <h3>{{item.title}}</h3>
              <p>{{item.description}}</p>
            </div>
            <span>{{item.comments_total}}评论</span>
          </router-link>
        </ul>
      </div>
    </scroll>
    <loading :alpha="true" v-show="loading"></loading>
  </div>
</template>

<script>
import Tip from 'components/tip/tip'
import Slider from 'components/slider/slider'
import Scroll from 'components/scroll/scroll'
import Loading from 'components/loading/loading'
import { getNews } from 'api/news'
  export default {
  	data() {
  		return {
        ads: [{
         linkUrl: 'https://github.com/Amecy',
         picUrl: require('common/images/1.jpg')
        },{
         linkUrl: 'https://github.com/Amecy',
         picUrl: require('common/images/2.jpg')
        },{
         linkUrl: 'https://github.com/Amecy',
         picUrl: require('common/images/3.jpg')
        },{
         linkUrl: 'https://github.com/Amecy',
         picUrl: require('common/images/4.jpg')
        }],
        curPage: 1, // 当前页
        newsList: [],
        changeTip: false,
        loading: false
  		}
  	},
  	created() {
      this._getNews(this.curPage)
  	},
  	methods: {
      reload() {
        this.curPage = 1
        this._getNews(1)
      },
      _getMoreData() {
        this._getNews(this.curPage)
      },
      _getNews(page) {
        if (1 === page) {
          this.loading = true
        }
        getNews(page).then((res) => {
          this.changeTip = false
          if(res.statusText === 'OK') {
            this.loading = false
            this.curPage += 1
            this.newsList = this.newsList.concat(res.data.list.articles)
          }
        })
      },
      scroll(pos) {
        this.changeTip = pos.y > 50
      }
  	},
  	computed: {

  	},
  	watch: {

  	},
    components: {
      Slider,
      Scroll,
      Loading,
      Tip
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.news
  position: fixed
  width: 100%
  top: 0
  bottom: 0
  .news-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    h2
      padding: .8rem 0
      color: $color-g
      border-top: 1px solid $color-border
      border-bottom: 1px solid $color-border
    ul.title
      li
        display: flex
        justify-content: center
        padding: .5rem 0
        border-bottom: 1px solid $color-border
        position: relative
        .left
          flex: 2
          margin-left: .5rem
          img
            width: auto
            height: 5rem
            max-width: 6.7rem
        .right
          flex: 5
          padding: 0 .5rem
          text-align: left
          h3
            font-size: 1rem
            line-height: 1.5rem
            margin-bottom: .2rem
          p
            font-size: .6rem
            line-height: 1rem
            color: #8a8787
        span
          position: absolute
          bottom: 5px
          right: 5px
          font-size: .6rem
          color: #8a8787
      li:hover
        color: $color-g
</style>
