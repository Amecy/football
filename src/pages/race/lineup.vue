<template>
  <div class="situation">
    <div v-if="data" class="content">
      <h3>手法阵容</h3>
      <div class="team-wrap">
        <div>乌迪内斯</div>
        <div>萨索洛</div>
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

      mounted() {
        console.log('22333',this.data)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.situation
  .empty
    margin-top: 4rem
    text-align: center
    color: $color-dark
  .content
    position: relative
    h3
      padding: 10px 20px
      background-color: #e8e8e8
      font-weight: 700
    .team-wrap
      display: flex
      margin: auto
      width: 70%
      justify-content: space-around
      padding: .5rem 0
</style>
