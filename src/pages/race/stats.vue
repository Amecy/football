<template>
  <div class="situation">
    <div v-if="data.statistics" class="content">
      <h3>技术统计</h3>
      <ol class="statisitics">
        <li>
          <div>
            <span>{{data.statistics.team_A.short_name}}</span>
            <img :src="data.statistics.team_A.logo" alt="team_logo">
          </div>
          <small></small>
          <div>
            <img :src="data.statistics.team_B.logo" alt="team_logo">
            <span>{{data.statistics.team_B.short_name}}</span>
          </div>
        </li>
        <li v-for="o in data.statistics.list">
          <!--<div :class="o.team_A.class">{{o.team_A.value}}</div>-->
          <div>
            <small class="value">{{o.team_A.value}}</small>
            <i class="bg"><i :class="['percent', o.team_A.class]" :style="{'width': o.team_A.per+'%'}"></i></i>
          </div>
          <small>{{o.type}}</small>
          <div>
            <i class="bg"><i :class="['percent', o.team_B.class]" :style="{'width': o.team_B.per+'%'}"></i></i>
            <small class="value">{{o.team_B.value}}</small>
          </div>
        </li>
      </ol>
    </div>

    <ul v-if="data.relateArticle" class="title">
      <h3>相关阅读</h3>
      <router-link v-for="item in data.relateArticle" tag="li" :key="item.id" :id="item.id"
                   :to="{ path: '/news/detail', query: {id: item.id}}">
        <div class="left">
          <img v-lazy="item.thumb">
        </div>
        <div class="right">
          <h4>{{item.title}}</h4>
          <p>{{item.description}}</p>
        </div>
        <span>{{item.commentsTotal}}评论</span>
      </router-link>
    </ul>
    <div v-if="!data.statistics && !data.events && !data.relateArticle" class="empty">
      暂无比赛信息
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Object,
        require: true
      },
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
    h3
      padding: 10px 20px
      background-color: $color-lightgray
      font-weight: 700
    .team-wrap
      display: flex
      margin: auto
      width: 70%
      justify-content: space-around
      padding: .5rem 0
  ol.statisitics
    font-size .8rem
    li
      display: flex
      align-items center
      height 2rem
      &:first-child
        margin-bottom: 4px
        box-shadow 0 2px 2px $color-lightgray
        div
          display block
      div
        flex 5
        display: flex
        &:first-child
          text-align right
          .percent
            left unset
            right: 0
        .value
          margin 0 .4rem
        i
          position: relative
        .percent
          position: absolute
          top: 0
          left: 0
          display: block
          width: 50%
          height: 100%
          background-color: $color-g
        .ranks_l
          background-color: $color-gray
      .bg
          width: 60%
          background-color: $color-lightgray
      small
        flex 2
        text-align center
      span
        margin: 0 .4rem
        vertical-align middle
      img
        width: 1.5625rem
        height: 1.5625rem
        vertical-align: middle
  ul.title
    h3
      padding: 10px 20px
      background-color: $color-lightgray
      font-weight: 700
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
        h4
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
