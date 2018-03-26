<template>
  <div class="detail">
    <iframe :src="url" id="iframe" frameborder="0"></iframe>
    <loading v-show="loading" :mask="true" :alpha="false"></loading>
  </div>
</template>

<script>
  import Loading from 'components/loading/loading'
  import { getHTMLText } from 'common/js/util'
  import { getInfo } from 'api/video'
  export default {
    data() {
      return {
        loading: true,
        url: ''
      }
    },

    mounted() {
      const { id } = this.$route.query
      this.url = `https://m.dongqiudi.com/article/${id}.html`
      this.initContent()
    },

    methods: {
      // 初始化内容，去除多余部分
      initContent() {
        this.loading = true
        let iframe = document.querySelector('#iframe')
        if (iframe.attachEvent) {
          iframe.attachEvent('onload', this.removeExtra)
        } else {
          iframe.onload = this.removeExtra
        }
      },

      // 去除多余部分
      removeExtra() {
        this.loading = false
        let child = iframe.contentWindow.document
        let extra = child.querySelector('.comm-container')
        let hot = child.querySelector('.hot-video-list-container:last-child')
        let ad = child.querySelector('.icon-red-btn')
        let more = child.querySelector('.list-container')

        extra.style.display = 'none'
        hot.style.display = 'none'
        ad.style.display = 'none'
        more.addEventListener('click', this.initContent)
      }
    },

    components: {
      Loading
    }
  }


</script>

<style lang="stylus" res="stylesheet/stylus">
.detail
  iframe
    position: absolute
    top: 2.3rem
    left: 0
    width: 100%
    height: 100%
  a
    display none !important
</style>
