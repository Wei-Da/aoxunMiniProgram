<template>
	<view>
		<u-toast ref="uToast" />
		<form class='container-body' :report-submit='true' @submit='modifyLoginName'>
			<view class='input-account'>
				<text class='page_text'>原电话:</text>
				<text class='login_name_text'>{{originalMobile}}</text>
			</view>

			<view class='input-account'>
				<text class='page_text'>新电话:</text>
				<input class='account-content' placeholder='请输入新电话' name="newMobile" :value='newMobile'></input>
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
				originalMobile: '',
				popErrorMsg: '',
			}
		},
		onLoad() {
			this.originalMobile = uni.getStorageSync('mobile')
		},
		methods: {
			modifyLoginName: function(e) {
				console.log('修改电话')
				this.dealFormIds(e.detail.formId);
				let newMobile = e.detail.value.newMobile;
				if (newMobile == '') {
					this.$refs.uToast.show({
						title: '请输入新的电话号码',
						type: 'error',
					})
					return;
				}
				const param = {
					"userId": uni.getStorageSync('userInfo').id,
					"mobile": newMobile,
				}
				
				this.$request({
					url: serviceCode["MODIFY_MOBILE"],
					method: 'POST',
					data: param,
					success: (res) => {
						if (res.resultcode == '1') {
							uni.navigateBack({

							})
							uni.setStorageSync('mobile', newMobile);
						} else {
							this.$refs.uToast.show({
								title: '电话号码修改失败',
								type: 'error',
							})
						}
					},
					onError() {
						
					}
				})
			},

			//定时器提示框3秒消失  
			ohShitfadeOut() {
				var fadeOutTimeout = setTimeout(() => {
					this.popErrorMsg = '';

				}, 3000);
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
			}
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
