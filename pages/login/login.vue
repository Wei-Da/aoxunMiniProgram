<template>
	<view class="content">
		<view class="logo">
			<image class="img" src="../../static/images/logo.png" mode="aspectFit"></image>
			<text class="title">派单易</text>
		</view>
		<form @submit="formSubmit">
			<view class="form-item">				
				<view class="iconfont icon-user form-item-img"></view>
				<input class="input" name="input" placeholder="请输入用户名" maxlength="-1" />
			</view>
			<view class="form-item">				
				<view class="iconfont icon-user form-item-img"></view>
				<input class="input" name="input" placeholder="请输入密码" maxlength="-1" />
			</view>
		</form>
	</view>
</template>

<script>
	import { androidLogin } from '@/apis/index.js';
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			androidLogin()
		}
	}
</script>

<style lang="scss">
	.content {
		.logo {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 300rpx;
			.img {
				width: 68rpx;
				height: 50rpx;
			}
			.title {
				margin-left: 10rpx;
			}
		}
		.form-item {
			display: flex;
			align-items: center;
			width: 80%;
			height: 80rpx;
			margin: 20rpx 60rpx;
			.form-item-img {
				font-size: 50rpx;
			}
			.input {
				width: 100%;
				height: 100%;
				margin-left: 10rpx;
			}
		}
	}
</style>
