<template>
  <div class="race-detail">
    <!-- 比赛双方信息 -->
    <div class="top" v-if="match">
      <div class="item">
        <img class="logo" :src="match.team_A.logo" alt="logo">
        <p>{{match.team_A.name}}</p>
      </div>
      <div class="item center">
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
      <stats v-if="0===curType && info" :data="info"></stats>
      <lineup v-if="1===curType && info" :data="info"></lineup>
      <analysis v-if="2===curType && info" :data="info"></analysis>
      <highlights v-if="3===curType && info" :data="info"></highlights>
    </div>
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
  import Loading from 'components/loading/loading'
  import Stats from 'pages/race/stats'
  import Analysis from 'pages/race/analysis'
  import Lineup from 'pages/race/lineup'
  import Highlights from 'pages/race/highlights'
  import { getDetail } from 'api/race'
  import { formatTimes, getLocalDate, getLocalHour } from 'common/js/util'

  export default {
  	data() {
  		return {
        loading: true,
        curType: 2,
  			typeArray: ['situation', 'lineup', 'analysis', 'highlights'],


        info: null,
        match: null,
        show_time_day: '',
        show_time_min: '',
  		}
  	},
  	mounted() {
      const { id } = this.$route.query
      const type = this.typeArray[this.curType]
//      this.__getDetail(0, 'situation')
      this.__getDetail(id, type)
    },
  	methods: {
      selectType(e) {
        const { idx } = e.target.dataset
        this.curType = parseInt(idx)
      },

  	  __getDetail(id, type) {
        getDetail(id, type).then(res => {
          this.loading = false
          switch (this.curType) {
            case 0:
              return this.initStats(res)
            case 1:
              return this.initLineup(res)
            case 2:
              return this.initAnalysis(res)
            case 3:
              return this.initHighlights(res)
          }
        })
      },
      initStats(res) {
        console.log(res)
      },
      initLineup(res) {},
      initAnalysis(res) {
        const { info, match, show_time_day, show_time_min } = res.data
        const statusMap = {
          "Played": "已结束",
          "Fixture": "",
        }
        this.info = info
        this.show_time_day = show_time_day
        this.show_time_min = show_time_min
        this.match = {
          ...match,
          status: statusMap[match.status]
        }
        console.log(info)
      },
      initHighlights(res) {},
  	},
  	components: {
  	  Loading,
      Stats,
      Lineup,
      Analysis,
      Highlights,
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.race-detail
  position: absolute
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
    .center
      margin-top: 10px
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
