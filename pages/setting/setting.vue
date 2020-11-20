<template>
	<view>
		<u-modal title="温馨提示" v-model="modalHidden" @confirm="modalChange" @cancel="modalCancel" :mask-close-able="true"
		 :show-cancel-button="true">
			<view class="modal-text">
				确定退出登录
			</view>
		</u-modal>

		<view class='info_group'>
			<navigator class="info_item" url='../personalInfo/personalInfo'>
				<view style='display: flex;flex: 1'>
					<image class='info_image' src='../../static/images/menu3.png'></image>
					<text class='info_text'>个人信息</text>
				</view>
				<image class='info_image_transfer' src='../../static/images/transfer.png'></image>
			</navigator>

			<navigator class="info_item" url='../modifyPwd/modifyPwd'>
				<view style='display: flex;flex: 1'>
					<image class='info_image' src='../../static/images/menu4.png'></image>
					<text class='info_text'>密码修改</text>
				</view>
				<image class='info_image_transfer' src='../../static/images/transfer.png'></image>
			</navigator>

			<navigator class="info_item" url='../modifyLoginName/modifyLoginName'>
				<view style='display: flex;flex: 1'>
					<image class='info_image' src='../../static/images/menu5.png'></image>
					<text class='info_text'>电话号码修改</text>
				</view>
				<image class='info_image_transfer' src='../../static/images/transfer.png'></image>
			</navigator>

			<navigator class="info_item" url='../versionsPage/versionsPage'>
				<view style='display: flex;flex: 1'>
					<image class='info_image' src='../../static/images/menu6.png'></image>
					<text class='info_text'>版本信息</text>
				</view>
				<image class='info_image_transfer' src='../../static/images/transfer.png'></image>
			</navigator>

		</view>

		<!-- <form report-submit='true' class="btn-submit" style='background: #F8F8F8;' @submit='loginOut'> -->
			<button class="btn-block btn-orange" form-type='submit' @click="loginOut">退出登录</button>
		<!-- </form> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalHidden: false,
			}
		},
		methods: {
			loginOut: function(e) {
				this.modalHidden = true;
			},

			modalChange: function() {
				uni.setStorageSync('appRole', '');
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},

			modalCancel: function() {
				this.modalHidden = false;
			}
		}
	}
</script>

<style>
	.info_group {
		display: flex;
		flex: 1;
		background: #F8F8F8;
		flex-direction: column;
	}

	.info_item {
		display: flex;
		flex-direction: row;
		height: 80rpx;
		width: 100%;
		padding: 10rpx;
		align-content: center;
		background: #FFFFFF;
		border-bottom: 1rpx solid #e8e8e8;
	}

	.info_image {
		height: 40rpx;
		width: 40rpx;
		margin: 20rpx;
	}

	.info_text {
		height: 60rpx;
		line-height: 60rpx;
		padding: 10rpx;
	}

	.info_image_transfer {
		height: 40rpx;
		width: 23rpx;
		margin: 20rpx;
		margin-right: 25rpx;
	}

	.personal_info {
		display: flex;
		flex-direction: column;
		background: #F8F8F8;
		padding-top: 20rpx;
	}
	
	.modal-text {
		text-align: center;
	}
	
	.btn-block {
		position: fixed;
		bottom: 0;
	}
</style>
