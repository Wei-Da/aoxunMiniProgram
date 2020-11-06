<template>
	<view class="container">
		<image v-show="isNeedSearch" class='search-btn' src='../../static/images/search_button.png' @click='onSearch'></image>
		<template v-if="serviceList.length > 0">
			<navigator v-for="(item, index) in serviceList" :key="index" class="service" :url="getUrl(item)">
				<view class="service-left">
					<image v-if="item.faultStatus == 1 || item.faultStatus == 3" class="service-left-img" src="../../static/images/serious_note.png"
					 mode="aspectFill"></image>
					<image v-else-if="item.faultStatus == 5 || item.faultStatus == 6" class="service-left-img" src="../../static/images/warnning_note.png"
					 mode="aspectFill"></image>
					<image v-else class="service-left-img" src="../../static/images/normal_note.png" mode="aspectFill"></image>
				</view>
				<view class="service-right">
					<view class="service-right-tite service-right-text">{{ item.title }}</view>
					<view class="service-right-text">
						<text class="service-right-tags-text">
							{{ item.companyName }}
						</text>
					</view>
					<view class="service-right-date service-right-text">{{ item.faultDate }}</view>
				</view>
			</navigator>
		</template>
		<template v-else>
			<view class='no-data'>
				<image class="no-data-img" src="../../static/images/no_data.png"></image>
				<text class='no-data-text'>没有数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	import serviceCode from '@/apis/index.js';
	export default {
		data() {
			return {
				serviceList: [],
				page: 1, // 分页,
				url: '',
				type: 0,
				faultInfo: '',
				changeInfo: false,
				isNeedSearch: true
			}
		},
		onLoad(option) {
			this.url = option.url;
			this.type = option.type;
			if (option.title) {
				uni.setNavigationBarTitle({
					title: option.title
				})
			}
			if (option.faultInfo) {
				this.faultInfo = option.faultInfo
			}
			if (option.changeInfo) {
				this.changeInfo = true
			}
			if (option.isNeedSearch === false || option.isNeedSearch === 'false') {
				this.isNeedSearch = false
			}
		},
		onShow() {
			this.fetchServiceData()
		},
		onPullDownRefresh() {
			this.page = 1;
			this.serviceList = [];
			this.fetchServiceData()
		},
		onReachBottom() {
			this.fetchServiceData()
		},
		methods: {
			fetchServiceData() { // 获取服务数据
				let formData = {
					'page': this.page,
					'rows': 10
				}
				if (this.type) {
					formData.type = this.type
				}
				if (this.faultInfo) {
					let getId
					if(this.faultInfo === 'personid' || this.faultInfo === 'sysuserid') {
						getId = uni.getStorageSync('userInfo').id
					} else if(this.faultInfo === 'original' || this.faultInfo === 'companyid') {
						getId = uni.getStorageSync('userInfo').companyId
					}
					formData['faultInfo.' + this.faultInfo] = getId
				}
				if (this.changeInfo) {
					if (uni.getStorageSync('appRole') == '3') {
						formData['changeInfo.sysType'] = '1'
					} else {
						formData['changeInfo.sysType'] = '2'
						formData['changeInfo.changeUserid'] = uni.getStorageSync("userInfo").id
					}
				}
				this.$request({
					url: serviceCode[this.url],
					method: 'POST',
					data: formData,
					success: (res) => {
						this.serviceList = this.serviceList.concat(res.info)
						this.page++
						console.log("serviceList", this.serviceList)
					}
				})
			},
			onSearch() {
				uni.navigateTo({
					url: '/pages/searchPage/searchPage'
				})
			},
			getUrl(item) {
				console.log("item.faultStatus", item.faultStatus)
				console.log("item.version", item.version)
				if(item.faultStatus == '5' || item.faultStatus == '6') {
					return `../../pages/waitServiceDetail/waitServiceDetail?item=${encodeURIComponent(JSON.stringify(item))}`
				} else if(item.faultStatus == '3') {
					return `../../pages/waitConfirmDetail/waitConfirmDetail?item=${encodeURIComponent(JSON.stringify(item))}`
				} else if(item.version == '3.3') {
					return `../../pages/serviceHistoryRecordDetail/serviceHistoryRecordDetail?item=${encodeURIComponent(JSON.stringify(item))}`
				} else {
					return `../../pages/oldVersionFileDetail/oldVersionFileDetail?item=${encodeURIComponent(JSON.stringify(item))}`
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;

		.search-btn {
			position: fixed;
			right: 40rpx;
			bottom: 60rpx;
			width: 90rpx;
			height: 90rpx;
			z-index: 100;
		}

		.service {
			width: 100%;
			height: 222rpx;
			display: flex;
			align-items: center;
			padding: 20rpx 0;
			border-bottom: 2rpx solid #e8e8e8;

			&-left {
				display: flex;
				align-items: center;
				width: 126rpx;
				height: 100%;

				&-img {
					width: 126rpx;
					height: 126rpx;
				}
			}

			&-right {
				margin-left: 20rpx;
				flex: 1;
				overflow: hidden;

				&-text {
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 34rpx;
					white-space: nowrap;
					margin-bottom: 10rpx;
				}

				&-title {
					color: #333;
				}

				&-tags {
					&-text {
						display: inline-block;
						padding: 6rpx 16rpx;
						border: 2rpx solid #f7982a;
						line-height: 28rpx;
						color: #f7982a;
						font-size: 28rpx;
						border-radius: 4rpx;
					}
				}

				&-date {
					color: #666;
				}
			}
		}

		.no-data-img {
			width: 100%;
		}
	}
</style>
