<template>
	<view>
		<scroll-view class="container-body" :scroll-y="true" :scroll-top="scrolltop" lower-threshold="50" @scrolltolower="scrollLoading"
		 @scrolltoupper="onPullDownRefresh">
			<view class='info_group'>
				<view v-if="serviceList.length == 0 && isFinishRequest" class='no_data_view'>
					<image src="../../static/images/no_data.png"></image>
					<text class='no_data_text'>没有数据</text>
				</view>
				<navigator v-if="serviceList.length != 0" class="info_item" v-for="(item, index) in serviceList" @click='bindtapTurnto'
				 :data-index='index' :key="index">
					<view style='display: flex;flex: 1'>
						<text class='info_text'>{{item.noticeTitle}}</text>
					</view>
					<image class='info_image_transfer' src='../../static/images/transfer.png'></image>
				</navigator>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	const app = getApp();
	import serviceCode from '@/apis/index.js';
	const recorderManager = uni.getRecorderManager();

	export default {
		data() {
			return {
				serviceList: [],
				scrolltop: null, //滚动位置
				page: 0, //分页
				lastTime: 0,
				noticeType: '',
				isFinishRequest: false
			}
		},
		onLoad(options) {
			this.noticeType = options.noticeType;
			uni.setNavigationBarTitle({
				title: options.noticeTitle
			})
		},
		onShow() {
			this.fetchServiceData();
		},
		methods: {
			fetchServiceData: function() { //获取服务数据
				let nowTime = new Date().getTime();
				if ((nowTime - this.lastTime) < 500) {
					console.log("重复提交")
					return;
				}
				this.lastTime = nowTime;
				const perpage = 10;

				this.page = this.page + 1

				const page = this.page;

				var param = {
					"page": this.page,
					"rows": perpage,
					"sn.type": this.noticeType,
					"sn.state": 4,
					"sn.uid": uni.getStorageSync('userInfo').id
				};

				this.$request({
					url: serviceCode["GET_NOTICE_CONTENT"],
					data: param,
					method: 'POST',
					success: (res) => {
						this.serviceList = this.serviceList.concat(res.root);
						this.isFinishRequest = true;
						console.log('this.serviceList: ', this.serviceList)
					},
					onError: () => {
						this.isFinishRequest = true;
					}
				})

			},
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
