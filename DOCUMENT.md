## 组件

### 全局组件
- Loading（加载动画）
- Scroll（滑动管理）
- SideBar（侧边栏）
- Slider（轮播）
- Tab（顶部导航）
- Top（顶部logo）

#### Loading
loading 组件显示加载动画，分别在每个需要加载动画的页面引入和定制。此组件通过父组件的v-show来设置是否显示，loading动画对外提供了三个参数（loadingType、mask、alpha）

- `loadingType<String>` : 加载动画的类型（共三种），默认是旋转点加载
- `mask<Boolean>` ： 加载时是否包含背景，默认false
- `alpha<Boolean>` : mask是否半透明

#### SideBar
sidebar 组件显示一些额外内容，可作为个人中心的入口或个人中心的集成，通过props传来的visible控制是否显示

- `visible<Boolean>` : sidebar是否可见，默认false，__必选参数__

#### Tip
tip 组件在下拉刷新时显示文字提示，配合`Scroll`组件使用

- `changeTip<Boolean>` : 是否更换提示内容，__必选参数__，显示为：‘下拉刷新’ 或 ‘松开刷新’

#### Top
top 组件显示app的logo和名称，对子路由提供返回功能，加入侧边栏sidebar

#### Tab
tab 组件生成路由导航

- `routes<Array>` : 路由对象数组，有默认值，用来生成路由导航。形式：[{to: '/news',name: '资讯'}]

#### Scroll
scroll 组件是对 `better-scroll` 的封装，生成滚动区域，对此区域的滚动进行监控和处理，提供一个 `<slot>` 来插入滚动区域的内容。`better-scroll`地址：[BScroll](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html)

```javascript
	props: {
        /**
         * 1 滚动的时候会派发scroll事件，会截流。
         * 2 滚动的时候实时派发scroll事件，不会截流。
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        probeType: {
          type: Number,
          default: 1
        },
        /**
         * 点击列表是否派发click事件
         */
        click: {
          type: Boolean,
          default: true
        },
        /**
         * 是否开启横向滚动
         */
        scrollX: {
          type: Boolean,
          default: false
        },
        /**
         * 是否派发滚动事件
         */
        listenScroll: {
          type: Boolean,
          default: false
        },
        /**
         * 列表的数据
         */
        data: {
          type: Array,
          default: null
        },
        /**
         * 是否派发滚动到底部的事件，用于上拉加载
         */
        pullup: {
          type: Boolean,
          default: false
        },
        /**
         * 是否派发顶部下拉的事件，用于下拉刷新
         */
        pulldown: {
          type: Boolean,
          default: false
        },
        /**
         * 是否派发列表滚动开始的事件
         */
        beforeScroll: {
          type: Boolean,
          default: false
        },
        /**
         * 当数据更新后，刷新scroll的延时。
         */
        refreshDelay: {
          type: Number,
          default: 20
        }
      }
```

#### Slider
slider 组件显示轮播图，轮播效果是传统的滑动效果，指示器是半透明白色，对外有三个可选参数，基本实现是利用`better-scroll`创建一个横向滑动的区域，js初始化轮播参数控制播放过程

- `loop<Boolean>` : 是否循环播放，默认是
- `autoPlay<Boolean>` : 是否自动播放，默认是
- `interval<Number>` : 轮播间隔，默认4s

	
### 细节组件
- 数据页
	- score（积分榜）
	- shooter（射手榜）
	- assist（助攻榜）
	- schedule（赛程榜） 

- 赛程详情页
	- stats（赛况）
	- lineup（阵容）
	- analysis（分析）
	- highlights（集锦）

	#### Stats
	赛况：props传入data，以此生成技术统计、相关阅读。若没有技术统计和相关阅读，显示提示信息：暂无赛况信息
	
	#### Lineup
	阵容：props传入data，以此生成首发阵容、后补阵容。若没有首发阵容和后补阵容，显示提示信息：暂无阵容信息
	
	#### Analysis
	分析：props传入data，以此生成盘口指数、对赛往绩、最近成绩。若没有任何信息，显示提示信息：暂无信息
	
	#### Highlights
	集锦：props传入data，以此生成战报、GIF合集，若没有战报和GIF合集，显示提示信息：暂无相关集锦

## 路由
### 介绍：
项目采用 `vue-router` 作为路由，在 `router/index.js` 中导入页面，创建
`vue-router`实例，建立页面与路由的关系。

此处没有使用嵌套路由，而是将所有路由都设为一级路由，依据路由的path来判断是否是二级路由。（方便配合拦截器实现二级路由的管理）


### 列表：
- /news => /news/detail
- /race => /race/detail
- /video => /video/detail
- /data

### 路由拦截
```javascript
router.beforeEach((to, from, next) => {
  // 设置back标志(是否是二级路由)，提供给 top 组件
  window.back = to.path.split('/').length > 2

  // 没有匹配成功的路由，跳转到index页面,to.matched.length一级路由返回1，二级路由返回2，以此类推
  if (to.matched.length >= 1) {
    next()
  } else {
    next({path: '/news'})
  }
})
```

### 路由传值：
```javascript
const News = () => import('pages/news/news.vue')
const router = new VueRouter({
	routes: [
		{
			path: '/news',		// * 路由路径
			component: News,		// * 路由
			name: news,			// 可选：为此路由命名
		}
	]
})
```

要链接到一个路由，可以给 `<router-link>` 的 to 属性传一个对象，有 query 和 params 两种方式：

- query 传值

	```javascript
	<router-link :to="{ path: '/news', query: { id: 123 }}">item</router-link>
	```
	
	这等同于：
	
	```javascript
	router.push({ name: 'news', params: { id: 123 }})
	```
	
	上面的方式可以在目标页面通过 `this.$route.query` 拿到 `{id: 123}`，实际路由会变成 `news?id=123`

- params 传值

	```javascript
	<router-link :to="{ name: 'news', params: { id: 123 }}">User</router-link>
	```
	
	这等同于：
	
	```javascript
	router.push({ name: 'news', params: { id: 123 }})
	```
	此种方式可以在目标页面通过 `this.$route.params` 拿到 `{id: 123}`，实际路由就是routes配置的 `news`
	
##### 对比： query 传值会改变路由地址，刷新不影响结果，params 传值不改变路由地址，但是刷新会失去本次的传值



## 页面
### app入口：main.js

- 创建 Vue 实例，加载路由
- 配置延迟加载
- 使用 fastclick
- 导入默认样式
- 去除生产环境提示


## 其他
### fastclick
##### 使用原因： 优化移动端浏览器单击事件300ms的延迟
##### 问题原因：
在移动端，手指在屏幕上快速点击两次，浏览器会将页面缩放至原始比例。浏览器在区分用户行为时，就是以 300ms 区分此次点击是单击还是双击。所以通常情况下，若不进行特殊处理，移动端浏览器在派发 click 事件的时候，一般会出现 300ms 左右的延迟。

这就意味着，我们单击页面的时候移动端浏览器不会立即作出反应，而是等一会儿才会出现单击效果，处理单击事件。在移动WEB兴起的初期，用户对这 300ms 的延迟感觉不明显。但是随着用户对交互体验的要求越来越高，移动端这300ms的点击延迟逐渐变得明显而无法忍受。
##### 基本原理：
禁用移动端点击300ms延迟的方法有许多，各有优缺。__fastclick__ 的实现原理是在检测到 touchend 事件的时候，通过 DOM 自定义事件立即触发一个模拟的 click 事件，并把浏览器在 300ms 之后真正的 click 事件阻止掉

__核心代码__：

```javascript
FastClick.prototype.onTouchEnd = function(event) { 
	// 一些状态监测代码 
	// 从这里开始
	if (!this.needsClick(targetElement)) { 
		// 如果这不是一个需要使用原生click的元素，则屏蔽原生事件，避免触发两次click 
		event.preventDefault();
		// 触发一次模拟的click 
		this.sendClick(targetElement, event); 
	}
}
```
##### 使用：

```javascript
// main.js

import fastclick from 'fastclick'

// 将fastclick挂载到body上，解决所有元素的300ms点击延迟
fastclick.attach(document.body)
```


### stylus
##### 简介： stylus 是一种类似 sass、less 的 css 书写方式。它拥有变量、函数、条件判断等语法，既可以像sass、less一样用编程的方式书写css，又可以省略传统css的大括号、冒号、分号

### 图片懒加载
##### 简介：懒加载使用了 `vue-lazyload` 插件，可以为图片设置懒加载的延迟、动画、失败状态等状态
##### 代码：
```javascript
// main.js

import VueLazyload from 'vue-lazyload'

/**
	将lazyload挂载到vue实例上
	
	preLoad: 预加载高度比
	error: 加载失败时显示的图片
	loading: 加载过程中显示的图片
	attempt: 尝试次数
*/
Vue.use(VueLazyload, {
	preLoad: 1.3,	
	error: require('common/images/default.jpg'),
	loading: require('common/images/loading.gif'),
	attempt: 1
})
```

### 定制路由缓存
`router/index.js`中配置单个路由时，使用可选参数 `meta: { keepAlive: true }` 作为标识，在`App.vue` 中以此作为是否 keep-alive 的依据，最终实现路由的缓存。如：

```javascript
// router/index.js

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	routes: [
		// 缓存渲染结果
		{
	      path: '/news',
	      component: News,
	      meta: { keepAlive: true }
	    },
	    // 不缓存渲染结果
	    {
	      path: '/news/detail',
	      component: NewsDetail
	    }
	]
})

export default router



// App.vue
<template>
  <div id="app">
	...
    <transition name="fade">
      <!-- keep-alive：缓存已渲染的内容  -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!-- 不缓存结果的路由 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

```

### http
http 请求使用 axios，将 axios 的配置抽离到 `http.js` 中，使用时 import 即可

配置：
因为 proxy 设置了拦截 `/api` 开始的请求，所以为了统一这个前缀，封装 axios 时，给 axios 的 baseURL 设置为 `/api`。这样一来利用 axios 发送的请求都会被代理

```javascript
// 引入axios
import axios from 'axios'

// 超时时间 和 url前缀
axios.defaults.timeout = 10000
axios.defaults.baseURL = '/api'

// http请求拦截器
axios.interceptors.request.use(config => {
	return config
}, error => {
 	console.log('req error')
	return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {
	return data
}, error => {
 	console.log('res error...')
	return Promise.reject(error)
})

export default axios
```

### webpack

- 端口：8080
- 不自动打开浏览器
- 打包后资源文件位于 dist/static
- 资源根目录 /
- 代理
	- 原理：本地发送的所有请求都会被 proxy 拦截到并加以判断，符合要求的请求才会被 proxy 代理，代理时根据规则将请求替换成 target 下的对应请求，最后返回此次代理请求的数据
	- 代理项： `/api` 开头的请求
	- 目标： https://api.dongqiudi.com
	- 重写路径： '/api' 部分替换成 '' （` ^/api: '/' ` 效果相同）
	- [理解](https://segmentfault.com/q/1010000012607105)：

		使用代理, 首先你得有一个标识, 告诉他你这个连接要用代理, 不然的话, 可能你的 html, css, js这些静态资源都跑去代理. 所以我们只要接口用代理, 静态文件用本地.
		
		`'/api': {}` 就是告诉node, 我接口只要是`/api`开头的才用代理.所以你的接口就要这么写 `/api/xx/xx`. 最后代理的路径就是 `http://xxx.xx.com/api/xx/xx`.
		
		可是不对啊, 我正确的接口路径里面没有`/api`啊. 所以就需要 __pathRewrite__,用`'^/api' : ''`, 把`/api`去掉, 这样既能有正确标识, 又能在请求接口的时候去掉 api
	- 代码
			
		```javascript
		// see http://vuejs-templates.github.io/webpack for documentation.
		var path = require('path')
		
		module.exports = {
		  build: {
		    env: require('./prod.env'),
		    index: path.resolve(__dirname, '../dist/index.html'),
		    assetsRoot: path.resolve(__dirname, '../dist'),
		    assetsSubDirectory: 'static',
		    assetsPublicPath: './',
		    productionSourceMap: true,
		    // Gzip off by default as many popular static hosts such as
		    // Surge or Netlify already gzip all static assets for you.
		    // Before setting to `true`, make sure to:
		    // npm install --save-dev compression-webpack-plugin
		    productionGzip: false,
		    productionGzipExtensions: ['js', 'css'],
		    // Run the build command with an extra argument to
		    // View the bundle analyzer report after build finishes:
		    // `npm run build --report`
		    // Set to `true` or `false` to always turn it on or off
		    bundleAnalyzerReport: process.env.npm_config_report
		  },
		  dev: {
		    env: require('./dev.env'),
		    port: 8080,
		    autoOpenBrowser: false,
		    assetsSubDirectory: 'static',
		    assetsPublicPath: '/',
		    // /api/posts/1  => https://api.dongqiudi.com/posts/1
		    proxyTable: {
		        '/api':{
		            target: 'https://api.dongqiudi.com',
		            changeOrigin: true,
		            pathRewrite: {
		              '^/api': ''
		            }
		        }
		    },
		    // CSS Sourcemaps off by default because relative paths are "buggy"
		    // with this option, according to the CSS-Loader README
		    // (https://github.com/webpack/css-loader#sourcemaps)
		    // In our experience, they generally work as expected,
		    // just be aware of this issue when enabling this option.
		    cssSourceMap: false
		  }
		}
		
		```