import store from '../../store/index.js'

export const websiteUrl = 'https://www.njbhhelp.com/'

export const request = (param) => {
	let url = param.url;
	let method = param.method || 'GET';
	let header = param.header || {};
	let data = param.data || {};
	// 参数 serial(公司编号) 每次请求都要传参

	data["routerCompany"] = uni.getStorageSync('serial') || '';
	data["sessionId"] = uni.getStorageSync('sessionId') || '';

	//防止重复提交，相同请求间隔时间不能小于500毫秒
	let nowTime = new Date().getTime();

	// 请求方式: GET POST 
	if (method) {
		method = method.toUpperCase(); // 小写转成大写
		if (method === "POST") {
			header = {
				"content-type": "application/x-www-form-urlencoded;charset=utf-8"
			}
		} else {
			header = {
				"content-type": "application/json"
			}
		}
	}

	// 发起请求 加载动画
	if (!param.hideLoading) {
		uni.showLoading({
			title: "加载中..."
		})
	}

	// 发起网络请求
	uni.request({
		url: websiteUrl + url,
		method: method,
		header: header,
		data: data,
		success: res => {
			if (!res.data) {
				param.onError()
				return;
			}
			if (res.data.encode === 200 || res.data.encode === '200') { // 访问成功, 调用success
				typeof param.success == "function" && param.success(res.data);
			}
			if (res.data.encode !== 200 || res.data.encode !== '200') {
				if (res.data.encode === 300 || res.data.encode === '300') { // 登录踢出
					store.commit('isForceLoginout', true)
					store.commit('logout')
				}
				if (res.data.encode === 310 || res.data.encode === '310') { // 登录超时
					store.commit('isLoginTimeOut', true)
					store.commit('logout')
				}
			}


		},
		fail: (e) => {
			uni.showToast({
				title: '请求失败 , 请重试',
				icon: "none"
			})
			typeof param.fail == "function" && param.fail('请求失败 , 请重试');
		},
		complete: () => {
			// console.log("网络请求complete");
			uni.hideLoading();
			typeof param.complete == "function" && param.complete(e.data);
			return;
		}
	})
}
