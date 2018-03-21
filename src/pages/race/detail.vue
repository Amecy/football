<template>
  <div class="race-detail">
    <!-- 比赛双方信息 -->
    <div class="top" v-if="match">
      <div class="item">
        <img class="logo" :src="match.team_A.logo" alt="logo">
        <p>{{match.team_A.name}}</p>
      </div>
      <div class="item">
        <p>{{show_time_day}} {{show_time_min}} {{match.competition.short_name}}</p>
        <p class="score" v-if="''===match.status">VS</p>
        <p class="score" v-else>{{match.team_A.score}} - {{match.team_B.score}}</p>
        <p>{{match.status}}</p>
      </div>
      <div class="item">
        <img class="logo" :src="match.team_B.logo" alt="logo">
        <p>{{match.team_B.name}}</p>
      </div>
    </div>
    <!-- 赛程导航 -->
    <div class="nav">
      <ul @click="selectType">
        <li :class="{ active: curType === 0 }" data-idx="0">赛况</li>
        <li :class="{ active: curType === 1 }" data-idx="1">阵容</li>
        <li :class="{ active: curType === 2 }" data-idx="2">分析</li>
        <li :class="{ active: curType === 3 }" data-idx="3">集锦</li>
      </ul>
    </div>
    <div class="content">
      <situation v-if="0===curType && info" :data="info.statistics"></situation>
      <lineup v-if="1===curType && info" :data="info.statistics"></lineup>
      <highlights v-if="3===curType && info" :data="info.statistics"></highlights>
    </div>
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
  import Loading from 'components/loading/loading'
  import Situation from 'pages/race/situation'
  import Lineup from 'pages/race/lineup'
  import Highlights from 'pages/race/highlights'
  import { getDetail } from 'api/race'
  import { formatTimes, getLocalDate, getLocalHour } from 'common/js/util'

  export default {
  	data() {
  		return {
        loading: true,
        curType: 0,
  			type: 'situation',
        info: null,
        match: null,
        show_time_day: '',
        show_time_min: '',
  		}
  	},
  	mounted() {
      setTimeout(() => {
      },20)
      this.__getDetail()
    },
  	methods: {
      __getDetail() {
        const { id } = this.$route.query
        getDetail(id, this.type).then(res => {
          const { info, match, show_time_day, show_time_min } = res.data
          const statusMap = {
            "Played": "已结束",
            "Fixture": "",
          }

          this.loading = false
          this.info = info
          this.show_time_day = show_time_day
          this.show_time_min = show_time_min
          this.match = {
            ...match,
            status: statusMap[match.status]
          }
        })
      },
      selectType(e) {
        const { idx } = e.target.dataset
        this.curType = parseInt(idx)
      }
  	},
  	components: {
  	  Loading,
      Situation,
      Lineup,
      Highlights
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.race-detail
  position: fixed
  width: 100%
  top: 6rem
  bottom: 0
  .top
    display: flex
    align-items center
    height: 140px
    background: url("~common/images/bg_match.jpg") no-repeat
    background-size cover
    color: #fff
    font-size .8rem
    .item
      flex: 1
      .logo
        width: 3.82rem
        height 3.82rem
        margin-bottom: .625rem
      .score
        margin: 10px 0
        font-size 1.6rem
  .nav

  ul
    display: flex
    justify-content: center
    width: 100%
    height: 2.8rem
    line-height: 2.8rem
    font-size: 1.1rem
    li
      flex: 1
    .active::after
      content: ''
      display block
      width: 60%
      margin auto
      height: 2px
      margin-top: -2px
      background-color: $color-g

</style>
