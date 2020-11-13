<template>
	<view class='describe_group'>
		<textarea class='describe_textarea' placeholder='请输入描述' maxlength='100' @input='bindInputValue' @confirm='bindConfirmValue'
		 :value='serviceContent'></textarea>
		<text class='describe_number'>{{fontNum}}/100</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fontNum: 0,
				serviceContent: '',
			};
		},
		onLoad() {
			this.serviceContent = uni.getStorageSync('serviceDescribe')
		},
		methods: {
			bindInputValue(e) {
				this.fontNum = e.detail.cursor;
			},

			bindConfirmValue(e) {
				uni.setStorageSync('serviceDescribe', e.detail.value);
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="scss">
	.describe_group {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #F7F7F8;
	}

	.describe_textarea {
		width: 100%;
		height: 220rpx;
		background: #FFF;
		margin: 5rpx;
	}

	.describe_number {
		text-align: right;
		margin-right: 20rpx;
		margin-top: 5rpx;
	}
</style>
