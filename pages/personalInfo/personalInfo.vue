<template>
	<view class="group">
		<view class="group_title">
			<text class='group_title_text'>个人信息</text>
		</view>

		<view class='group-body'>
			<view class='input-list'>
				<view class='input-item'>
					<text class='input-item-lable'>账户</text>
					<view class="input-item-content">
						<text>{{userName}}</text>
					</view>
				</view>

				<view class='input-item'>
					<text class='input-item-lable'>账户角色</text>
					<view class="input-item-content">
						<text>{{userRole}}</text>
					</view>
				</view>

				<view class='input-item'>
					<text class='input-item-lable'>联系电话</text>
					<view class="input-item-content">
						<text>{{userPhone}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				userName: "",
				userPhone: "",
				userRole: ""
			}
		},
		onShow() {
			let userName = uni.getStorageSync("userInfo").userName;
			let userPhone = uni.getStorageSync("userInfo").mobile;
			let userRole = uni.getStorageSync("appRole");

			this.userName = userName == '' ? '--' : userName;
			this.userPhone = userPhone == '' ? '--' : userPhone;
			this.userRole = userRole == '1' ? '甲方工程师' : userRole == '2' ? '乙方工程师' : userRole == '3' ? '服务台' : userRole == '4' ?'甲方领导':'乙方领导';
		},
		methods: {

		}
	}
</script>

<style>
	.group_title {
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		flex-direction: row;
		padding-left: 20rpx;
		background: #f9f9f9;
	}

	.group_title_text {
		height: 70rpx;
		flex: 1;
		line-height: 70rpx;
	}
</style>
