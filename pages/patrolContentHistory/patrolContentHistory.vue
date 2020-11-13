<template>
	<scroll-view class="container-body" scroll-y="true" :scroll-top="scrolltop" lower-threshold="50" @scrolltolower="scrollLoading"
	 @scrolltoupper="onPullDownRefresh">
		<navigator class="input-list" style='border-bottom:1rpx solid #C0C0C0;border-top:0rpx solid #FFF;margin:0rpx' v-for="(item, index) in taskDetail"
		 :url="getPatrolPageDetailUrl(item)" :key="index">
			<view class="input-item" style='padding:0rpx'>
				<text class="input-item-lable">机房名称</text>
				<view class="input-item-content">
					<input class='record_title' disabled='true' style='color:#000;font-size:35rpx' type="text" :value='item.machineRoom'
					 name="title"></input>
				</view>
			</view>

			<view class="input-item" style='padding:0rpx'>
				<text class="input-item-lable">设备名称</text>
				<view class="input-item-content">
					<input class='record_title' disabled='true' type="text" :value='item.deviceName' name="title"></input>
				</view>
			</view>

			<view class="input-item" style='padding:0rpx;border-top:1rpx solid #FFFFFF'>
				<text class="input-item-lable">设备IP</text>
				<view class="input-item-content">
					<input class='record_title' disabled='true' type="text" :value='item.deviceIP' name="title"></input>
				</view>
			</view>

			<view class="input-item" style='padding:0rpx;border-top:1rpx solid #FFFFFF'>
				<text class="input-item-lable">状态</text>
				<view class="input-item-content">
					<input class='record_title' :style="item.companyId==''?'':'color: #179B16'" disabled='true' type="text" :value="item.companyId==''?'未检测':'已检测'"
					 name="title"></input>
				</view>
			</view>
		</navigator>
	</scroll-view>
</template>

<script>
	import serviceCode from '@/apis/index.js';
	const app = getApp();
	const pageSize = 10;
	export default {
		data() {
			return {
				taskDetail: [],
				faultId: '',
				companyId: '',
				pageNo: 0,
				lastTime: 0,
			}
		},
		onLoad(options) {
			this.faultId = options.faultId;
			this.companyId = options.companyId;
		},
		onShow() {
			this.taskDetail = [];
			this.pageNo = 0;
			this.dealTask();
		},
		methods: {
			getPatrolPageDetailUrl(item) {
				console.log(item)
				let companyId = item.companyId == '' ? 0 : 1;
				return '../patrolPageDetail/patrolPageDetail?faultId=' + this.faultId + '&state=' + companyId + '&instanceId=' + item.companyName + '&deviceId=' + item.id + '&activiInstanceId=' + item.deptId + '&companyId=' + item.companyId
			},

			imageLoad: function(e) { //获取图片真实宽度  
				let imgwidth = e.detail.width;
				// let	imgheight = e.detail.height;
				//宽高比  
				let	ratio = imgwidth / imgheight;

				//计算的高度值  
				let viewHeight = 750 / ratio;
				let imgheight = viewHeight;
				let imgheights = this.imgheights;
				//把每一张图片的对应的高度记录到数组里  
				imgheights[e.target.dataset.id] = imgheight;

				this.imgheights = imgheights

			},

			bindchange: function(e) {
				this.current = e.detail.current
			},

			chooseImage: function() {
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						let tempFilePaths = res.tempFilePaths;
					}
				})
			},

			bindtapClick: function(e) {
				console.log(e);
			},

			dealTask: function() {
				let nowTime = new Date().getTime();
				if ((nowTime - this.lastTime) < 500) {
					console.log("重复提交")
					return;
				}

				this.lastTime = nowTime;

				this.pageNo = this.pageNo + 1;

				let param = {
					"userId": uni.getStorageSync("userInfo").id,
					"faultId": this.faultId,
					"pageNo": this.pageNo,
					"pageSize": pageSize
				};
				this.$request({
					url: serviceCode["GET_PATROL_TASK_DETAIL"],
					method: 'POST',
					data: param,
					success: (res) => {
						this.taskDetail = this.taskDetail.concat(res.info)
						console.log('this.taskDetail', this.taskDetail)
					}
				})
			},

			onPullDownRefresh: function(e) {
				this.taskDetail = [];
				this.pageNo = 0;
				this.dealTask();
			},

			scrollLoading: function(e) {
				this.dealTask();
			}
		}
	}
</script>

<style>
	.index-banner {
		width: 100%;
		height: 454rpx;
	}

	.index-banner .slide-image {
		width: 100%;
	}

	.add_view {
		height: 50rpx;
		width: 100%;
		background: #FA9901;
		display: flex;
		flex-direction: row
	}

	.floor_account_text {
		color: #FFFFFF;
		text-align: center;
		width: 100%
	}

	.add_image_button {
		height: 30rpx;
		width: 30rpx;
		margin: 10rpx 10rpx;
	}

	.index-menu {
		width: 100%;
		display: -webkit-flex;
		display: -webkit-box;
		display: flex;
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		background: #fff;
	}

	.index-menu-item {
		-webkit-flex: 0 0 25%;
		-webkit-box-flex: 0;
		flex: 0 0 25%;
		max-width: 25%;
		text-align: center;
		margin-top: 10rpx;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		margin-bottom: -1rpx;
	}

	.btn_menu {
		border: none;
		text-align: center;
		padding: 0;
		margin: 0;
		flex-direction: column;
	}

	.index-menu-item image {
		width: 110rpx;
		height: 110rpx;
	}

	.index-menu-item text {
		display: block;
		font-size: 30rpx;
		line-height: 1.4;
		white-space: nowrap;
	}
</style>
