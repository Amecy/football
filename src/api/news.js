import axios from 'common/js/http'

//  var qs = require('qs') // 使用qs自动将请求头的Content-Type设置为application/x-www-form-urlencoded
// get方法传参用params:{},post方法传参用data:{}，如post方法要以form data方式传参则要使用qs
var qs = require('qs')

// 获取最新资讯列表
export function getNews(curPage) {
  let extra = curPage === 1 ? '' : `?page=${curPage}`
  let url = '/mobile/tab/1/archives' + extra
  return axios.get(url)
}

// 获取资讯详情
export function getInfo(id) {
  let url = `/v2/article/detail/${id}?from=msite_com`
  return axios.get(url)
}

// 获取回复列表
export function getCommend(id) {
  let url = `/v2/article/${id}/hot?size=10&version=576&from=msite_com`
  return axios.get(url)
}
