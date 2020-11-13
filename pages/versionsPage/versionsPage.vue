<template>
	<view class='container'>
		<form class='container-body' report-submit='true' @submit='doLogin'>
			<view class='logo-content'>
				<view class='logo-content-detail'>
					<image class='logo-content-detail-image' src='../../static/images/logo.png'></image>
					<text class='logo-content-detail-text'>派单易</text>
					<text class='logo-content-detail-text'>V 3.3.02</text>
				</view>
			</view>
		</form>
		<view class="copyright">			
			<view class='product-company'>Copyright © 2017-2018 南京碧慧电子技术有限公司.</view>
			<view class='product-company'>All Rights Reserved</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	
	.product-company {
		width: 100%;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
		font-size: 20rpx;
	}

	.logo-content {
		width: 100%;
		height: 300rpx;
		justify-content: center;
		display: flex;
	}

	.logo-content-detail {
		display: flex;
		flex-direction: column;
		width: 160rpx;
		margin-top: 130rpx;
	}

	.logo-content-detail-image {
		width: 110rpx;
		height: 80.88rpx;
		justify-content: center;
		margin-left: 25rpx;
		margin-right: 25rpx;
	}

	.logo-content-detail-text {
		height: 50rpx;
		line-height: 50rpx;
		margin-left: 10rpx;
		text-align: center;

	}

	.input-account {
		display: flex;
		flex-direction: row;
		height: 80rpx;
		margin: 20rpx 60rpx;

	}

	.account-name {
		height: 67rpx;
		line-height: 67rpx;
		text-align: center;
		margin-right: 15rpx;
	}

	.account-content {
		height: 65rpx;
		width: 100%;
		border-bottom: 1rpx solid gainsboro;
		font-size: 25rpx;

	}

	.account-checkbox {
		height: 20rpx;
		width: 300rpx;
	}

	.account-image {
		height: 46rpx;
		width: 50rpx;
		margin: 9.5rpx 0;
		margin-right: 15rpx;
	}

	.tip-text {
		text-align: center;
		padding: 20rpx;
		color: red;
	}

	.radio-group {
		display: flex;
		flex-direction: row;
		flex: 1;
	}

	.radio-item {
		position: static;
	}
	
	.copyright {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
