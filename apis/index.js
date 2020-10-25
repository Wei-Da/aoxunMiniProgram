import request from '@/utils/request/index.js'

export function androidLogin(data) {
	return request({
		url: '/androidLogin',
		method: 'POST',
		data,
	})
}