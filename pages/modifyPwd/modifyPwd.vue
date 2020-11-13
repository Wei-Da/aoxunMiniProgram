<template>
	<view>
		<u-toast ref="uToast" />
		<form class='container-body' :report-submit='true' @submit='modifyPwd'>
			<view class='input-account'>
				<text class='page_text'>原密码:</text>
				<input class='account-content' placeholder='请输入原密码' :password='true' name="originalPwd" :value='originalPwd'></input>
			</view>

			<view class='input-account'>
				<text class='page_text'>新密码:</text>
				<input class='account-content' placeholder='请输入新密码' :password='true' name="newPwd" :value='newPwd'></input>
			</view>

			<view class='input-account'>
				<text class='page_text'>密码确认:</text>
				<input class='account-content' placeholder='请输入确认密码' :password='true' name="confirmPwd" :value='confirmPwd'></input>
			</view>
			<view class="btn-submit">
				<button class='btn-block btn-orange' form-type='submit'>确认修改</button>
			</view>
		</form>
	</view>
</template>

<script>
	const app = getApp()
	import serviceCode from '@/apis/index.js';
	export default {
		data() {
			return {

			}
		},
		methods: {
			modifyPwd: function(e) {
				this.dealFormIds(e.detail.formId);
				let originalPwd = e.detail.value.originalPwd;
				let newPwd = e.detail.value.newPwd;
				let confirmPwd = e.detail.value.confirmPwd;
				if (originalPwd == '') {
					this.$refs.uToast.show({
						title: '请输入原密码',
						type: 'error',
					})
					return;
				}
				if (newPwd == '') {
					this.$refs.uToast.show({
						title: '请输入新密码',
						type: 'error',
					})
					return;
				}
				if (confirmPwd == '') {
					this.$refs.uToast.show({
						title: '请输入确认密码',
						type: 'error',
					})
					return;
				}
				if (newPwd != confirmPwd) {
					this.$refs.uToast.show({
						title: '两次密码不一致，请重新确认',
						type: 'error',
					})
					return;
				}

				let param = {
					"userId": uni.getStorageSync('userInfo').id,
					"password": confirmPwd,
					"oldPassword": originalPwd
				}

				this.$request({
					url: serviceCode["MODIFY_PWD"],
					method: 'POST',
					data: param,
					success: (res) => {
						if (res.resultcode == '1') {
							wx.navigateBack({

							})
						} else {
							this.$refs.uToast.show({
								title: '密码修改失败',
								type: 'error',
							})
						}
					}
				})
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

<style>
	.input-account {
		display: flex;
		flex-direction: row;
		height: 80rpx;
		margin: 20rpx 20rpx;
	}

	.account-content {
		height: 80rpx;
		width: 100%;
		border-bottom: 1rpx solid gainsboro;
		font-size: 25rpx;

	}

	.page_text {
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	.login_name_text {
		height: 80rpx;
		width: 100%;
		line-height: 80rpx;
		font-size: 25rpx;
	}
</style>
