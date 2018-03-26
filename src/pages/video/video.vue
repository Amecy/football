<template>
  <div class="video">
    <scroll ref="scroll" class="video-content" :data="videos" :pullup="true" :pulldown="true" v-on:scrollToEnd="_getMoreData" v-on:pulldown="reload">
      <div>
        <h2>热门视频</h2>
        <ul>
          <router-link v-for="(item,index) in videos" :to="{ path: 'video/detail', query: {id: item.id}}" tag="li" :key="index">
            <div class="left">
              <img v-lazy="item.thumb">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURUxpcf///////////////////////////////////////////////////////////////////////////////////////////////1SsvH4AAAAYdFJOUwBMs4bjHJz6BO0kNQx4zY4tWqnbEznBbDOVJXoAAAJiSURBVFjDrVhZgqsgEETZQUVFTd//pK81M3kZw2rkU6Gkuqs3CYktPtF58FpK7YeZTpzULdUIBqfFRKOKATjdz+uWTitfCFn4OtFW749o2V2MkACe2vNzSz2AFCYL0FEEmNfwy3VGENqlERqkkPqQEWiUJmVFBzDY9EfsAOCiduUDyD5rddVLGCJmHRmwtcTgK24cgzfUsC1lXl820AG+o4a2WDqqBf1xD84qEA4MdrJHN8DQ1YTA5wEBbKkLo4WB+KMokLYyEomV8KaxjkFPqlcP7D8VBxu5sDZwL+FLOV6BGKU0L1sKcmm9DnIJ5hqEAfkUB4U5FPZtk8eYgR5C0xAKrhZjOiuVFbQ6NOFDb4+Um3W1P7QhwhufaTvHpj8MyoI8yG/uT7NZge1W1SoFkWaDhjRkgpakIZJsWpjQpTQHkWKzH99hshBxNjuJAWwJRIyNhQEdwosgImwMukRDVwgRZLOAJhJIMQR8klEgv4XAfd8S6ZBIhTlDGzma8wan3iAtVyRwHhe4uyPMbgh2dIlNppxkn2j3lPNd4qNH4rsh/SaKAC8sAujWL0qR+ymI8mpBlD8F8YayfEdzcEOLsjdKj3qEx3ujhIFST2WUf2NcgO/qEDp/cgJ2opuqQVDbR69rNMw1DfQM2gQGgXKMHSEQ32vdMLFGRhpf5JfRR0aa52BVoI9HfLBCv+D8t2UuMm44Q3bpIVOKRJrgOAezKaMYJxEkNuoigHR5DZp5H7h7e/Kwsv0+cM9lqcW4Y8Zv+2bkCKT42PTPsd+V5ybVCH8uqr7m58PbLxCGpDRL/wL5BziQPzLwEcJpAAAAAElFTkSuQmCC" alt="" class="img-wrap">
            </div>
            <div class="right">
              <p>{{item.title}}</p>
              <span v-text="item.comments_total+'评论'"></span>
            </div>
          </router-link>
        </ul>
      </div>
      <loading :alpha="true" v-show="loading"></loading>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/scroll/scroll'
  import Loading from 'components/loading/loading'
  import { getVodeoList } from 'api/video'
  export default {
  	data() {
  		return {
  		  loading: false,
        videos: [],
        url: '',
  		}
  	},
    mounted() {
      this.$nextTick(()=>{
        this._getVideos()
        this.$refs.scroll.refresh()
      })
    },
    methods: {
  	  reload() {
        this.url = ''
        this._getVideos()
      },
      _getVideos() {
  	    this.loading = true
        getVodeoList(this.url).then((res)=>{
          this.loading = false
          if("OK" === res.statusText) {
            const { articles, next } = res.data
            this.videos = [...this.videos, ...articles]
            this.url = next
          }
        })
      },
      _getMoreData(){
        this._getVideos(++this.page)
        this.$refs.scroll.refresh()
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  .video
    position: fixed
    width: 100%
    top: 6rem
    bottom: 0
    .video-content
      height: 100%
      overflow: hidden
    h2
      padding: .8rem 0
      color: $color-g
      border-bottom: 1px solid #e9e9e9
    ul
      li
        display: flex
        padding: .5rem 0
        border-bottom: 1px solid #e9e9e9
        .left
          position: relative
          flex: 2
          margin-left: .5rem
          img
            width: auto
            height: 5rem
          .img-wrap
            position: absolute
            left: 0
            right: 0
            top: 0
            bottom: 0
            margin: auto
            width: 2rem
            height: 2rem
        .right
          flex: 5
          padding: 0 .5rem
          text-align: left
          font-size: .9rem
          position: relative
          p
            font-size: 1rem
            line-height: 1.5rem
          span
            position: absolute
            bottom: 0
            color: $color-dark
            right: .5rem
</style>
