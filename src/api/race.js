import axios from 'common/js/http'
import {formatDate} from 'common/js/util'

// 获取赛事
export function getRace() {
	const url = '/data/tab/new/important'
	let start = `${formatDate(new Date(), 1)} 16:00:00`
	return axios.get(url, {
	  params: { start }
	})
}


// 获取赛事详情
export function getDetail(id, type) {
  const url = `/mobile/match/${type}/${id}`
  return axios.get(url)
}
