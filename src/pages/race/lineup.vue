<template>
  <div class="situation">
    <div v-if="data.lineup || data.sub">
      <div v-if="data.sub" class="content">
        <h3>首发阵容</h3>
        <div v-for="o in data.lineup" class="wrap">
          <div class="left">
            <span>{{o.team_A.person}}</span>
            <img :src="o.team_A.person_logo" alt="avatar">
          </div>
          <div class="right">
            <img :src="o.team_B.person_logo" alt="avatar">
            <span>{{o.team_B.person}}</span>
          </div>
        </div>
      </div>
      <div v-if="data.sub" class="content">
        <h3>后补阵容</h3>
        <div v-for="o in data.sub" class="wrap">
          <div class="left">
            <span>{{o.team_A.person}}</span>
            <img :src="o.team_A.person_logo" alt="avatar">
          </div>
          <div class="right">
            <img :src="o.team_B.person_logo" alt="avatar">
            <span>{{o.team_B.person}}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      暂无阵容信息
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
    .wrap
      display: flex
      font-size .8rem
      &:nth-child(2n+1)
        background-image: linear-gradient(90deg, transparent 10%, rgba(200,200,200,.3), transparent 90%)
      .left
        flex 1
        padding-right: 1.875rem
        text-align right
      .right
        flex 1
        padding-left: 1.875rem
      span
        display: inline-block;
        max-width: 6.5625rem;
        margin: 0 .6rem
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: middle;
      img
        width: 2.4rem
        height: 2.4rem
        margin: .4rem 0
        border: 1px solid $color-border
        border-radius 2px
        vertical-align: middle
</style>
