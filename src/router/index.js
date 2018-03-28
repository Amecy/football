import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const News = () => import('pages/news/news.vue')
const NewsDetail = () => import('pages/news/detail.vue')

const Race = () => import('pages/race/race.vue')
const RaceDetail = () => import('pages/race/detail.vue')

const Data = () => import('pages/data/data.vue')

const Video = () => import('pages/video/video.vue')
const VideoDetail = () => import('pages/video/detail.vue')

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      component: News,
      meta: { keepAlive: true }
    },
    {
      path: '/news/detail',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/race',
      component: Race,
      meta: { keepAlive: true }
    },
    {
      path: '/race/detail',
      name: 'RaceDetail',
      component: RaceDetail
    },
    {
      path: '/video',
      component: Video,
      meta: { keepAlive: true }
    },
    {
      path: '/video/detail',
      component: VideoDetail
    },
    {
      path: '/data',
      component: Data,
      meta: { keepAlive: true }
    },

    // 设置404错误页面
    // {
    //    path:'*',
    //    component:Error
    // }
  ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
  // 设置back标志，提供给 top 组件
  window.back = to.path.split('/').length > 2

  // 没有匹配成功的路由，跳转到index页面,to.matched.length一级路由返回1，二级路由返回2，以此类推
  if (to.matched.length >= 1) {
    next()
  } else {
    next({path: '/news'})
  }
})

export default router
