<template>
  <div class="situation">
    <div v-if="data.asia_companys || data.euro_companys" class="item">
      <h3>盘口指数</h3>
      <div class="item-wrap no-padding">
        <table v-if="data.asia_companys">
          <thead>
            <tr class="tr-gray">
              <th width="24%">亚盘</th>
              <th width="13%">类型</th>
              <th width="13%">主陪</th>
              <th width="13%">让球</th>
              <th width="13%">客陪</th>
              <th width="24%">变化时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(o, idx) in data.asia_companys" :class="o.color">
              <td>{{o.name}}</td>
              <td>及时</td>
              <td>{{o.now.homeWin}}</td>
              <td>{{o.now.draw}}</td>
              <td>{{o.now.awayWin}}</td>
              <td>{{o.now.ts}}</td>
            </tr>
          </tbody>
        </table>
        <table v-if="data.euro_companys">
          <thead>
          <tr class="tr-gray">
            <th width="24%">欧陪</th>
            <th width="13%">类型</th>
            <th width="13%">主陪</th>
            <th width="13%">让球</th>
            <th width="13%">客陪</th>
            <th width="24%">变化时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(o, idx) in data.euro_companys" :class="o.color">
            <td>{{o.name}}</td>
            <td>及时</td>
            <td>{{o.now.homeWin}}</td>
            <td>{{o.now.draw}}</td>
            <td>{{o.now.awayWin}}</td>
            <td>{{o.now.ts}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 对赛往绩 -->
    <div v-if="data.battle_history && data.battle_history.list.length > 0" class="item">
      <h3>{{data.battle_history.name}}</h3>
      <div class="item-wrap">
        <div class="team-name">
          <span>{{data.team_A}}</span>
          <span class="history">近{{data.battle_history.list.length}}场交锋记录</span>
          <span>{{data.team_B}}</span>
        </div>
        <div class="tip">
          <div class="item-tip win" :style="{'flex': data.battle_history.team_A.win + 1}">{{data.battle_history.team_A.win}}胜</div>
          <div class="item-tip draw" :style="{'flex': data.battle_history.team_A.draw + 1}">{{data.battle_history.team_A.draw}}平</div>
          <div class="item-tip lose" :style="{'flex': data.battle_history.team_B.win + 1}">{{data.battle_history.team_B.win}}胜</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th width="15%">日期</th>
            <th width="15%">赛事</th>
            <th width="27.5%">主队</th>
            <th width="15%">比分</th>
            <th width="27.5%">客队</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(o, idx) in data.battle_history.list" :key="idx" :class="o.color">
            <td class="date"><div>{{o.year}}</div>{{o.date}}</td>
            <td>{{o.competition}}</td>
            <td>{{o.team_A_name}}</td>
            <td>{{o.score}}</td>
            <td>{{o.team_B_name}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 最近战绩 -->
    <div v-if="data.recent_record" class="item">
      <h3>{{data.recent_record.name}}</h3>
      <!-- team_A -->
      <div v-if="data.recent_record.team_A">
        <div class="title">
          <img :src="data.team_A_logo" alt="">{{data.team_A}}
        </div>
          <table>
            <thead>
            <tr>
              <th width="15%">日期</th>
              <th width="15%">赛事</th>
              <th width="27.5%">主队</th>
              <th width="15%">比分</th>
              <th width="27.5%">客队</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(o, idx) in data.recent_record.team_A" :class="o.color">
              <td class="date"><div>{{o.year}}</div>{{o.date}}</td>
              <td>{{o.competition}}</td>
              <td>{{o.team_A_name}}</td>
              <td>{{o.score}}</td>
              <td>{{o.team_B_name}}</td>
            </tr>
            </tbody>
          </table>
      </div>
      <!-- team_B -->
      <div v-if="data.recent_record.team_B">
        <div class="title">
          <img :src="data.team_B_logo" alt="">{{data.team_B}}
        </div>
          <table>
            <thead>
            <tr>
              <th width="15%">日期</th>
              <th width="15%">赛事</th>
              <th width="27.5%">主队</th>
              <th width="15%">比分</th>
              <th width="27.5%">客队</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(o, idx) in data.recent_record.team_B" :class="o.color">
              <td class="date"><div>{{o.year}}</div>{{o.date}}</td>
              <td>{{o.competition}}</td>
              <td>{{o.team_A_name}}</td>
              <td>{{o.score}}</td>
              <td>{{o.team_B_name}}</td>
            </tr>
            </tbody>
          </table>
      </div>
    </div>

    <div v-else class="empty">
      暂无信息
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
    },

    mounted() {
//      console.log('22333',this.data)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.situation
  text-align left
  .empty
    margin-top: 4rem
    text-align: center
    color: $color-dark
  .item
    position: relative
    h3
      padding: 10px 20px
      background-color: $color-lightgray
      font-weight: 700
    .item-wrap
      padding: .9375rem .75rem
      .team-name
        display: flex
        justify-content space-between
        font-size .9rem
        margin-bottom: .625rem
        span
          font-weight 500
        .history
          flex 1
          text-align center
      .tip
        display: flex
        color: #fff
        font-size .8rem
        .item-tip
          line-height: 1.875rem;
        .win
          padding-left .625rem;
          background-color: $color-red
        .draw
          text-align center
          background-color: $color-green
        .lose
          padding-right .625rem;
          text-align right
          background-color: $color-blue
    .no-padding
      padding: 0
      tr
        border none
        th
          color: $color-dark
        td
          padding: .6rem
    .title
      display: flex
      align-items center
      padding: .8rem 0
      background-image: linear-gradient(90deg, rgba(0,0,0,.03), transparent)
      img
        padding-left: .8rem
        padding-right: .2rem
        width: 1.5rem
        height: 1.5rem
  table
    width: 100%
    font-size .8rem
    .tr-gray
      background-color: $color-border
    tr
      border-top: 1px solid #e8e8e8
      th
        text-align center
        color: $color-gray
        line-height: 2rem
      td
        text-align: center
        vertical-align middle
        padding: .4rem 0
      .date
        color: $color-gray
    .win
      td
        &:nth-child(4)
          color: #fff
          after-wrap(#fff, $color-red)
    .draw
      td
        &:nth-child(4)
          color: #fff
          after-wrap(#fff, $color-green)
    .lose
      td
        &:nth-child(4)
          after-wrap(#fff, $color-blue)
</style>
