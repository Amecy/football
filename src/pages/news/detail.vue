<template>
  <div class="news-detail">
    <div v-if="info">
      <article>
        <h4>{{info.title}}</h4>
        <p class="time">{{info.writer}} {{info.time}}</p>
        <div v-html="info.body" class="content"></div>
        <div class="source">消息参考来源：{{info.source}}</div>
      </article>
      <!-- 回复列表 -->
      <div class="comments">热门回复</div>
      <section v-if="comments.length > 0">
        <div class="comment-item" v-for="o in comments" :key="o.id">
          <div class="top">
            <img v-if="o.avatar" :src="o.avatar" alt="avatar" class="avatar">
            <div class="right">
              <p>{{o.name}}</p>
              <span>{{o.created_at}}</span>
            </div>
            <div class="up">{{o.up}}赞️</div>
          </div>
          <p v-html="o.content"></p>
        </div>
      </section>
      <div class="empty" v-else>
        暂无回复
      </div>
    </div>

    <loading v-show="loading"></loading>
  </div>
</template>

<script>
  import Loading from 'components/loading/loading'
  import { getInfo, getCommend } from 'api/news'

  export default {
  	data() {
  		return {
        info: '',
        comments: [],
        loading: false,
        isSidebar: false
  		}
  	},

    mounted() {
  	  this.loading = true
      let id = this.$route.query.id
      getInfo(id).then(res => {
        this.loading = false
        const { data } = res.data
        const body = data.body.replace('data-src', 'src')
        this.info = { ...data, body }
      })
      getCommend(id).then(res => {
        const { errCode, data } = res.data
        if (0 === errCode) {
          let comments = data.comment_list
          const userList = data.user_list.filter(o => {
            let id = o.id.toString()
            return (id !== '0' && id !== '99999999')
          })
          comments = comments.map((o, idx) => {
            if (comments[idx]){
              return {
                ...o,
                name: userList[idx].username,
                avatar: userList[idx].avatar
              }
            } else {
              return o
            }
          })
          console.log(comments)
          this.comments = comments
        }
      })
    },

    methods: {
    },

    components: {
  	  Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.news-detail
  position: absolute
  width: 100%
  top: 6rem
  bottom: 0
  article
    padding: 1rem
    text-align left
    h4
      font-size 1.2rem
      line-height: 1.4
    .time
      font-size: .8rem
      line-height: 2.4
      color: $color-gray
      border-bottom 1px solid $color-border
    .content
      margin-top: 1rem
      h2
        font-size 1.1rem
        font-weight 500
        margin-top: 2rem
        line-height: 1.4
      h2::before
        content ''
        height .9rem
        display: inline-block
        padding-right .8rem
        border-left 2px solid $color-g
      img
        width: 100%
      p
        margin: 10px 0
        line-height: 1.6
        text-align justify
        color: $color-dark
    .source
      padding: 1rem 0
      font-size .8rem
      color: $color-gray

  .empty
    padding: 2rem 0
    color: $color-gray
    text-align center
    font-weight: 300
  .comments
    text-align left
    font-weight 700
    padding: 1rem 0 1rem 1rem
    background-color: $color-lightgray
  section
    text-align left
    padding-bottom: 2rem
    .comment-item
      padding: 1rem
      border-bottom 1px solid $color-border
      &:last-child
        border none
      img
        height: 1.3rem
        vertical-align text-top
      .top
        display: flex
        position: relative
        margin-bottom: 1rem
        .avatar
          display: inline-block
          width: 2.6rem
          height: 2.6rem
          border-radius 2px;
        .right
          display flex
          flex-direction column
          justify-content space-between
          margin-left: .6rem
          padding: .1rem 0
          p
            color: $color-g
          span
            color $color-gray
            font-size .8rem
      .up
        position: absolute
        right: 0
        top: 0
        color $color-gray
        font-weight 300
        font-size .8rem
</style>
