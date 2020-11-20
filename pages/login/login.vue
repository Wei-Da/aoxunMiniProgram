<template>
	<view class="login-view">
		<u-toast ref="uToast" />
		<form report-submit="true" @submit="bindLogin">
			<view class="logo">
				<image class="logo-img" src="../../static/images/logo.png" mode="aspectFit"></image>
				<text class="logo-title">派单易</text>
			</view>
			<view class="form-item">
				<view class="iconfont icon-user form-item-img"></view>
				<input class="input" type="text" :value="usernameValue" name="usernameValue" placeholder="请输入用户名" />
			</view>
			<view class="form-item">
				<view class="iconfont icon-password form-item-img"></view>
				<input class="input" :password="true" :value="passwordValue" name="passwordValue" placeholder="请输入密码" />
			</view>
			<view class="form-item">
				<view class="iconfont icon-bianhao1 form-item-img"></view>
				<input class="input" type="text" :value="serialValue" name="serialValue" placeholder="请输入公司编号" />
			</view>
			<view class="form-item">
				<checkbox-group class="checkbox-wrap" @change="checkboxChange">
					<label class="label" v-for="(item, index) in checkboxItems" :key="item.value">
						<checkbox :value="item.value" :checked="item.isChecked" color="#09bb07" />{{item.name}}
					</label>
				</checkbox-group>
			</view>
			<view class="form-item">
				<radio-group class="checkbox-wrap" @change="radioChange">
					<label class="label" v-for="(item, index) in radioItems" :key="item.value">
						<view class="">
							<radio :value="item.value" :checked="item.isChecked" color="#09bb07" />
						</view>
						<view class="">
							{{item.name}}
						</view>
					</label>
				</radio-group>
			</view>
			<view class="form-item">
				<button type="default" class="login" hover-class="hover" formType="submit">登录</button>
			</view>
		</form>
		<view class="product">
			<text class="product-company">Copyright © 2017-2018 南京碧慧电子技术有限公司.</text>
			<text class="product-company">All Rights Reserved</text>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	import serviceCode from '@/apis/index.js';

	export default {
		data() {
			return {
				loginTypeValue: '1',
				usernameValue: '',
				passwordValue: '',
				serialValue: '',
				checkboxItems: [{
						value: 'usernameValue',
						name: '记住用户名',
						isChecked: false
					},
					{
						value: 'passwordValue',
						name: '记住密码',
						isChecked: false
					}
				],
				radioItems: [{
						value: 'quickWarrantyLogin',
						name: '快速保修登录',
						isChecked: false
					},
					{
						value: 'regularLogin',
						name: '正常登录',
						isChecked: true
					}
				]
			};
		},
		onLoad() {
			console.log('login页面onLoad')
			uni.setStorageSync("userInfo", "");
			// 获取用户名, 密码和公司编号
			const username = uni.getStorageSync('usernameValue')
			const password = uni.getStorageSync('passwordValue')
			const serial = uni.getStorageSync('serial')
			if (username) {
				this.usernameValue = username;
				this.checkboxItems[0].isChecked = true;
			}
			if (password) {
				this.passwordValue = password;
				this.checkboxItems[1].isChecked = true;
			}
			serial ? this.serialValue = serial : this.serialValue = '';

			let provider = '';
			let weixinCode = '';
			uni.getProvider({
				service: "oauth",
				success: (res) => {
					provider = res.provider[0]
				}
			})

			uni.login({
				provider: provider,
				success: (res) => {
					weixinCode = res.code;
				}
			})
			console.log('weixinCode: ', weixinCode)
			try {
				uni.setStorageSync('weixinCode', weixinCode);
			} catch (e) {
				uni.setStorageSync('weixinCode', '');
			}


		},
		methods: {
			bindLogin(e) {
				console.log('登录', e)
				const username = e.detail.value.usernameValue;
				const password = e.detail.value.passwordValue;
				const serial = e.detail.value.serialValue;
				this.dealFormIds(e.detail.formId);
				
				// 用户信息效验
				const regular = "^[ ]+$";
				const rule = new RegExp(regular);
				if (username === "" || rule.test(username)) {
					this.$refs.uToast.show({
						title: '用户名不能为空',
						type: 'error',
					})
					return;
				}
				if (password === "" || rule.test(password)) {
					this.$refs.uToast.show({
						title: '密码不能为空',
						type: 'error',
					})
					return;
				}
				if (serial === "" || rule.test(serial)) {
					this.$refs.uToast.show({
						title: '公司编号不能为空',
						type: 'error',
					})
					return;
				}

				// 存储公司编号
				uni.setStorageSync('serial', serial)
				// 存储用户名称
				if (this.checkboxItems[0].isChecked) {
					uni.setStorageSync('usernameValue', username)
				}
				// 存储密码
				if (this.checkboxItems[1].isChecked) {
					uni.setStorageSync('passwordValue', password)
				}

				serviceCode["IMAGE_URL"] = 'getImageByImageName.adr?routerCompany=' + serial + '&imageName=';
				serviceCode["CHECK_IMAGE_URL"] = 'getImageByImagePath.adr?routerCompany=' + serial + '&imageName=';

				const weixinCode = uni.getStorageSync('weixinCode')

				this.$request({
					url: serviceCode["LOGIN"],
					method: "POST",
					data: {
						username: username,
						password: password,
						weixinCode: weixinCode,
					},
					success: (res) => {
						console.log('LOGIN', res)
						if (res.resultcode === '1' || res.resultcode === 1) { // 用户名或密码错误
							this.$refs.uToast.show({
								title: res.detail,
								type: 'error',
							})
							return;
						}
						if (res.resultcode === '2' || res.resultcode === 2) {
							uni.setStorageSync("userInfo", {
								"companyId": res.companyId,
								"appRole": res.roleId,
								"id": res.id,
								"mobile": res.mobile,
								"userName": res.userName,
								"deptId": res.deptId,
								"isRepair": res.isRepair,
								"loginName": res.loginName
							})
							uni.setStorageSync('mobile', res.mobile)
							uni.setStorageSync('sessionId', res.sessionId)
							console.log('this.loginTypeValue', this.loginTypeValue)
							if (res.mouleId == '7') {
								uni.setStorageSync('appRole', '2');
								if (this.loginTypeValue == '0') {
									console.log('mineCreateService')
									uni.redirectTo({
										url: '/pages/mineCreateService/mineCreateService',
									})
								} else {
									console.log('customerPage')
									uni.switchTab({
										url: '/pages/customerPage/customerPage',
										success: () => {
											console.log('switchTab成功')
										},
										fail: (err) => {
											console.log('switchTab失败')
										}
									})
								}
								return;
							}

							if (res.mouleId == '8') {
								uni.setStorageSync('appRole', '3')
								if (this.loginTypeValue == '0') {
									uni.redirectTo({
										url: '/pages/createService/createService',
									})
								} else {
									uni.switchTab({
										url: '/pages/customerPage/customerPage',
									})
								}
								return;
							}

							if (res.mouleId == '1' || res.mouleId == '3') {
								uni.setStorageSync('appRole', '1');
								if (this.loginTypeValue == '0') {
									uni.redirectTo({
										url: '/pages/customerCreateService/customerCreateService',
									})
								} else {
									uni.switchTab({
										url: '/pages/customerPage/customerPage',
									})
								}
								return;
							}

							if (res.mouleId == '2') { // 甲方领导
								uni.setStorageSync('appRole', '4')
								if (this.loginTypeValue == '0') {
									uni.redirectTo({
										url: '/pages/customerCreateService/customerCreateService',
									})
								} else {
									uni.switchTab({
										url: '/pages/customerPage/customerPage',
									})
								}
								return;
							}

							if (res.mouleId == '6') { // 乙方领导
								uni.setStorageSync('appRole', '5')
								if (this.loginTypeValue == '0') {
									uni.redirectTo({
										url: '/pages/mineCreateService/mineCreateService',
									})
								} else {
									uni.switchTab({
										url: '/pages/customerPage/customerPage',
									})
								}
								return;
							}

							if (res.mouleId == '13') {
								uni.setStorageSync('appRole', '3')
								if (this.loginTypeValue == '0') {
									//uni.setStorageSync('LoginType', '0');
									uni.redirectTo({
										url: '/pages/createService/createService',
									})
								} else {
									uni.switchTab({
										url: '/pages/customerPage/customerPage',
									})
								}
								return;
							}
						}
					},
					// 返回空
					onError: () => {
						this.$refs.uToast.show({
							title: '公司编号错误',
							type: 'error',
						})
					},
					fail: () => {

					}
				})
			},
			checkboxChange(e) {
				const items = this.checkboxItems
				const values = e.detail.value;
				for (let i = 0; i < items.length; i++) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'isChecked', true)
					} else {
						this.$set(item, 'isChecked', false)
					}
				}
			},
			radioChange: function(e) {
				if (e.detail.value === 'quickWarrantyLogin') {
					this.loginTypeValue = '0'
				} else {
					this.loginTypeValue = '1'
				}
			},

			dealFormIds: function(formId) {
				let formIds = app.globalData.gloabalFomIds; //获取全局数据中的推送码gloabalFomIds数组
				if (!formIds) formIds = [];
				let data = {
					formId: formId,
					expire: parseInt(new Date().getTime()) + 604800000 //计算7天后的过期时间时间戳
				}
				formIds.push(data); //将data添加到数组的末尾
				app.globalData.gloabalFomIds = formIds; //保存推送码并赋值给全局变量
			},
		}
	}
</script>

<style lang="scss">
	.login-view {
		.logo {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 300rpx;

			&-img {
				width: 68rpx;
				height: 50rpx;
			}

			&-title {
				margin-left: 10rpx;
			}
		}

		.form-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 80%;
			height: 80rpx;
			margin: 0rpx auto 35rpx;

			&-img {
				font-size: 50rpx;
			}

			.input {
				width: 100%;
				height: 100%;
				margin-left: 10rpx;
			}

			.checkbox-wrap {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.label {
					display: flex;
					align-items: center;
				}
			}

			.login {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				background-color: #49b2f2;
				color: #FFFFFF;
			}
		}

		.product {
			width: 100%;
			position: fixed;
			bottom: 0;

			&-company {
				display: block;
				width: 100%;
				height: 30rpx;
				text-align: center;
				line-height: 30rpx;
				font-size: 20rpx;
			}
		}
	}
</style>
