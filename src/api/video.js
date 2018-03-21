import axios from 'common/js/http'

// 获取视频列表
export function getVideos(page) {
	const url = 'mobile/tab/43/archives'
	return axios.get(url, {
	  params: {page:page}
	})
}

// 获取视频列表
export function getVodeoList(targetUrl) {
  const url = targetUrl || 'app/tabs/iphone/11.json?mark=gif&version=576&from=msite_com'
  return axios.get(url)
}

// 获取视频详情页信息
export function getInfo(id) {
  const url = `/v2/article/detail/${id}?from=msite_com`
  return axios.get(url)
}
