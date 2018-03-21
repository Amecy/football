<template>
  <div class="detail">
    <h3 v-html="innerContent"></h3>
    <video controls autoplay src="https://dqdvideofile.qnssl.com/yFXAd9bp_5242141251.mp4?sign=50e4e40395ec153bbdb8baf3090cefb2&t=5ab0dd90"></video>
    <video src="https://dqdvideofile.qnssl.com/Pbkn8fZd_8908611251.mp4?sign=e87f6dfd827965acfe700b58d33d5b25&t=5ab21e8b"></video>
  </div>
</template>

<script>
  import { getHTMLText } from 'common/js/util'
  import { getInfo } from 'api/video'
  export default {
    data() {
      return {
        innerContent: '',
        video: null,
      }
    },

    mounted() {
      const { id } = this.$route.query
      this.id = id
      this.__getInfo(id)
    },

    methods: {
      __getInfo(id) {
        getInfo(id).then(res => {
          const { body } = res.data.data
          this.innerContent = body.replace('div', 'video').replace('div', 'video')
          console.log(res.data, body.replace('div', 'video').replace('div', 'video'))
        })
      }
    }
  }
</script>

<style lang="stylus" res="stylesheet/stylus">

</style>
