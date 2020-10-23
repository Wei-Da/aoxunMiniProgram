<template>
	<view class="content">
		<view class="logo">
			<image class="img" src="../../static/images/logo.png" mode="aspectFit"></image>
			<text class="title">派单易</text>
		</view>
		<form @submit="formSubmit">
			<icon type="personal" size="26"/>
			<input class="input" name="input" placeholder="这是一个输入框" maxlength="-1" />
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
		.input {
			
		}
	}
</style>
