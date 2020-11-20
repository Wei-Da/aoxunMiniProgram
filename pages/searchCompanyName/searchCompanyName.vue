<template>
	<view class='all_group'>
		<view class='title_group'>
			<view class='title_group_search'>
				<image class='search_image' src='../../static/images/search_img.png'></image>
				<input class='search_input' placeholder='请输入关键词' @input='onInputListener' :value='keyWords'></input>
				<image v-show='deleteHidden' class='delete_image' src='../../static/images/search_edit_delete.png' @click='clearInputData'></image>
			</view>
			<text class='title_cancel' @click='keywordSearch'>搜索</text>
		</view>

		<view class='group-detail' v-if='!searchHiddlen && hasRecord'>
			<view class='record_history_group'>
				<text class='record_history_text'>常搜公司:</text>
				<view class='record_content_group'>
					<block v-for="(item, index) in recordHistory">
						<text class='record_content' @click='chooseKeyword' :data-pickername='item'>{{item}}</text>
					</block>
				</view>
			</view>
		</view>

		<view class='group-detail' v-if='!searchHiddlen'>
			<text class='record_history_text' style='background: #F0EFF4'>公司名称:</text>
			<block v-for="(item, index) in deviceList">
				<text class='device_name' :data-index='index' @click='chooseDevice'>{{item}}</text>
			</block>
		</view>

		<view class='group-detail' v-if='searchHiddlen'>
			<block v-for="(item, index) in searchDeviceList">
				<text class='device_name' :data-index='index' @click='chooseSerachDevice'>{{item.name}}</text>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyWords: '',
				keyWordList: '',
				deviceList: [],
				deleteHidden: true,
				searchDeviceList: [],
				searchHiddlen: false,
				recordHistory: [],
				hasRecord: false
			}
		},
		onLoad(options) {
			let temDeviceList = [];
			let passData = options.deviceNames.split('_');
			for (let i = 1; i < passData.length; i++) {
				temDeviceList[i - 1] = passData[i];
			}
			this.deviceList = temDeviceList;
			if (uni.getStorageSync('recordCompanyName') != "") {
				this.recordHistory = uni.getStorageSync('recordCompanyName');
				this.hasRecord = true;
			}
		},
		methods: {
			onInputListener: function(e) {
				if (e.detail.value != '') {
					this.deleteHidden = false;
					this.keyWords = e.detail.value;
				} else {
					this.deleteHidden = true;
				}
			},

			clearInputData: function() {
				this.deleteHidden = true;
				this.keyWords = '';
				this.searchHiddlen = false
			},

			sortData: function(keyword) {
				let recordHistory = this.recordHistory;
				let arrangRecord = [];
				let newKeyword = true;
				if (recordHistory.length == 3) {
					for (let i = 0; i < recordHistory.length; i++) {
						if (keyword == recordHistory[i]) {
							if (i == 0) {
								arrangRecord = recordHistory;
							} else if (i == 1) {
								arrangRecord[0] = recordHistory[i];
								arrangRecord[1] = recordHistory[0];
								arrangRecord[2] = recordHistory[2];
							} else if (i == 2) {
								arrangRecord[0] = recordHistory[i];
								arrangRecord[1] = recordHistory[0];
								arrangRecord[2] = recordHistory[1];
							}
							newKeyword = false
							break
						}
					}
					if (newKeyword) {
						arrangRecord[0] = keyword;
						for (let i = 0; i < recordHistory.length - 1; i++) {
							arrangRecord[i + 1] = recordHistory[i];
						}
					}
				} else {
					arrangRecord[0] = keyword;
					for (let i = 0; i < recordHistory.length; i++) {
						arrangRecord[i + 1] = recordHistory[i];
					}
				}
				uni.setStorageSync('recordCompanyName', arrangRecord);
				this.recordHistory = arrangRecord;
				this.hasRecord = true;

			},

			clearRecord: function() {
				uni.removeStorageSync(this.path);
				this.keyWordList = '';
			},

			keywordSearch: function() {
				if (this.keyWords == '') {
					return;
				}
				let deviceList = this.deviceList;
				let searchDevice = [];
				this.sortData(this.keyWords);
				for (let i = 0; i < deviceList.length; i++) {
					if (deviceList[i].indexOf(this.keyWords) >= 0) {
						let tempDevice = {
							name: deviceList[i],
							index: i
						};
						searchDevice.push(tempDevice);
					}
				}
				if (searchDevice.length != 0) {
					this.sortData(this.keyWords);
					this.searchDeviceList = searchDevice;
					this.searchHiddlen = true;
				}
			},

			chooseKeyword: function(e) {
				this.keyWords = e.currentTarget.dataset.pickername;
				this.deleteHidden = false;
				this.keywordSearch();
			},

			chooseDevice: function(e) {
				uni.setStorageSync("companyNameIndex", e.currentTarget.dataset.index)
				uni.navigateBack({

				})
			},

			chooseSerachDevice: function(e) {
				uni.setStorageSync("companyNameIndex", this.searchDeviceList[e.currentTarget.dataset.index].index)
				uni.navigateBack({

				})
			}
		}
	}
</script>

<style>
	.all_group {
		/* display: flex; */
		flex-direction: column;
	}

	.title_group {
		display: flex;
		flex-direction: row;
		background: #49B2F2;
		height: 90rpx;
		justify-content: center;
		align-items: center;
	}

	.title_group_search {
		display: flex;
		flex-direction: row;
		flex: 1;
		height: 60rpx;
		border: 1rpx solid white;
		border-radius: 8rpx;
		background: white;
		margin-left: 15rpx;
		align-items: center;
	}

	.title_cancel {
		width: 100rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		color: white;
	}

	.search_image {
		width: 60rpx;
		height: 60rpx;
	}

	.delete_image {
		width: 50rpx;
		height: 50rpx;
	}

	.search_input {
		display: flex;
		flex: 1;
		height: 60rpx;
	}

	.record_operaction {
		display: flex;
		flex-direction: row;
		background: #f6f6f6;
		height: 90rpx;
		align-items: center;
	}

	.record_operaction_item_left {
		display: flex;
		flex-direction: row;
		height: 60rpx;
		margin-left: 15rpx;
	}

	.search_operation_image {
		width: 40rpx;
		height: 40rpx;
		margin: 10rpx 0rpx;
	}

	.search_operation_text {
		height: 60rpx;
		line-height: 60rpx;
		margin-left: 8rpx;
	}

	.record_operaction_item_right {
		display: flex;
		flex-direction: row;
		height: 60rpx;
		margin-right: 15rpx;
	}

	.space_view {
		display: flex;
		flex: 1;
		height: 60rpx;
	}

	.search_clear_text {
		height: 60rpx;
		line-height: 60rpx;
		color: #49B2F2;
		margin-left: 8rpx;
	}

	.keyWords_record {
		height: 70rpx;
		border-bottom: 1rpx solid #C0C0C0;
	}

	.keyWords_record_text {
		height: 70rpx;
		line-height: 70rpx;
		margin-left: 20rpx;
	}

	.service-list {
		padding: 0 20rpx;
	}

	.service-item {
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #e8e8e8;
	}

	.service-img {
		width: 126rpx;
		height: auto;
	}

	.service-item image {
		width: 126rpx;
		height: 126rpx;
		margin: 10.5px 0;
	}

	.service-text {
		flex: 1;
		margin-left: 20rpx;
		width: 100%;
	}

	.service-text .service-tite {
		color: #333;
		width: 100%;
		font-size: 34rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.service-tags {
		margin: 6rpx 0;
	}

	.service-tags text {
		padding: 6rpx 16rpx;
		border: 1rpx solid #f7982a;
		line-height: 1;
		color: #f7982a;
		font-size: 28rpx;
		border-radius: 4rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		white-space: nowrap;
	}

	.service-city {
		color: #666;
	}

	.group-detail {
		display: flex;
		flex-direction: column;
	}

	.record_history_group {
		display: flex;
		flex-direction: column;
		height: 160rpx;
	}

	.record_history_text {
		padding: 10rpx;
	}

	.record_content_group {
		display: flex;
		flex-direction: row;
		margin-left: 10rpx;
		margin-right: 10rpx;
	}

	.record_content {
		height: 60rpx;
		width: 100%;
		line-height: 60rpx;
		font-size: 25rpx;
		text-align: center;
		margin: 0 10rpx;
		background: #F0EFF4;
		border-radius: 5rpx;
	}

	.device_name {
		height: 70rpx;
		line-height: 70rpx;
		border-bottom: 1rpx solid #F0EFF4;
		padding-left: 20rpx;
	}
</style>
