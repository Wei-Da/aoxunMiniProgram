<template>
	<view>
		<view class='info_group'>
			<view v-if="noticeTypes.length == 0 && isFinishRequest" class='no_data_view'>
				<image src="../../static/images/no_data.png"></image>
				<text class='no_data_text'>没有数据</text>
			</view>
			<navigator v-if="noticeTypes.length != 0" v-for="(item, index) in noticeTypes" :key="index" class="info_item" :url='getUrl(item)'>
				<view style='display: flex;flex: 1'>
					<image class='info_image' src='../../static/images/menu1.png'></image>
					<text class='info_text'>{{item.noticeTitle}}</text>
				</view>
				<image class='info_image_transfer' src='../../static/images/transfer.png'></image>
			</navigator>
		</view>

	</view>
</template>

<script>
	import serviceCode from '@/apis/index.js';

	export default {
		data() {
			return {
				noticeTypes: [],
				isFinishRequest: false
			}
		},
		onLoad() {
			this.requestNoticeType();
		},
		methods: {
			requestNoticeType: function() {
				this.$request({
					url: serviceCode["GET_NOTICE_TYPE"],
					method: 'POST',
					success: (res) => {
						this.noticeTypes = res.info;
						this.isFinishRequest = true
						console.log('this.noticeTypes', this.noticeTypes)
					},
					onError: () => {
						this.isFinishRequest = true
					}
				})

			},
			getUrl(item) {
				return '../noticeContentTitle/noticeContentTitle?noticeType=' + item.noticeTypeId + '&noticeTitle=' + item.noticeTitle
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
</style>
