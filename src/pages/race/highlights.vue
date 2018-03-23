<template>
  <div class="situation">
    <!-- 战报 -->
    <div v-if="data.article || data.content" class="content">
      <h3>战报</h3>
      <div class="wrap">
        <video v-if="data.article" :src="data.article" controls></video>
        <p>{{data.content}}</p>
      </div>
    </div>
    <!-- gif -->
    <div v-if="data.gifCollection && data.gifCollection.length > 0" class="content">
      <h3>GIF合集</h3>
      <div class="wrap flex">
        <div v-for="o in data.gifCollection" class="card">
          <img :src="o.thumb" alt="图片">
          <p>{{o.title}}</p>
          <div>
            <span>{{o.time}}'</span>
            <span>{{o.comments_total}}评论</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!data.article && !data.content && !(data.gifCollection && data.gifCollection.length>0)" class="empty">
      暂无相关集锦
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        require: true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.situation
  text-align left
  .empty
    margin-top: 4rem
    text-align: center
    color: $color-dark
  .content
    position: relative
    background-color: #f8f8f8
    h3
      padding: .8rem
      background-color: $color-lightgray
      font-weight: 700
    .flex
      display: flex
      flex-wrap wrap
    .wrap
      padding: .8rem
      & > p
        line-height: 1.5625rem
        font-size: .9375rem
      video
        width: 100%
        margin-bottom: 1rem
        background: url(http://static1.dongqiudi.com/web-new/static/mobile/share/def_without_icon.jpg?20170330) no-repeat
        background-position: 50%
        background-size: cover
        object-fit: contain
      .card
        width: 50%
        box-sizing border-box
        border 2px solid #fafafa
        background-color: #fff
        img
          width: 100%
        p
          padding: 0 .9375rem 0 .5rem;
          height: 2rem;
          margin-top: .375rem;
          line-height: 1rem;
          font-size: .75rem;
          overflow: hidden;
        div
          display: flex
          justify-content space-between
          padding: .5625rem .5rem
          line-height: 1
          font-size: .75rem
          span:first-child
            color: $color-g
          span:last-child
            color: $color-gray
</style>
