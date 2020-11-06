<template>
	<view>
		<view class="container container-gray">
			<form class='container-body' report-submit='true' @submit='applySubmit'>
				<view class="group">
					<view class="group-header">添加记录</view>
					<view class="group-body">
						<view class="input-list">
							<view class="input-item">
								<text class="input-item-lable">标题</text>
								<view class="input-item-content">
									<input type="text" placeholder="请输入标题" :value='title' :name="title"></input>
								</view>
							</view>

							<view class="input-item input-item-full">
								<text class="input-item-label">描述</text>
								<textarea placeholder="请输入描述" :value='serviceContent' name="serviceContent" maxlength="140"></textarea>
							</view>

						</view>
					</view>

					<view class="group-header">图片</view>
					<view class="group-body">
						<view class="img-upload">

							<view class="gallery">
								<view class="item" v-for="(item, index) in uploadimgs" :key="index">
									<image :style="{width: imageWidth + 'px', height: imageWidth + 'px'}" :src="item" @click="previewImage(item)"
									 mode="aspectFill" />
									<!-- 删除按钮 -->
									<view class="delete" @click="deleteImage(index)">
										<image :style="{left: imageWidth / 2 - 10 + 'px'}" src='../../static/images/icon_delete.png' />
									</view>
								</view>
								<view class="item">
									<image :style="{width: imageWidth + 'px', height: imageWidth + 'px'}" src='../../static/images/icon_add.png'
									 class="button-upload" @click="chooseImage" />
								</view>
							</view>

						</view>
					</view>

				</view>

				<view class="btn-submit">
					<button class="btn-block btn-orange" form-type='submit'>提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import serviceCode from '@/apis/index.js';
	export default {
		data() {
			return {
				companyNames: [],
				companyNameIndex: 0,
				companyInfos: [],
				serviceLevels: [],
				serviceLevelIndex: 0,
				influenceLevels: [],
				influenceLevelIndex: 0,
				serviceDetails: [],
				serviceDetailIndex: 0,
				pictures: [],
				index: 0,
				createTime: "yy-mm-dd",
				endTime: "yy-mm-dd",
				uploadimgs: [],
				editable: false, //是否可编辑
				title: '',
				changeType: '其它',
				isOther: true,
				popErrorMsg: '',
				serviceIp: '',
				serviceContent: '',
				faultId: '',
				processId: '',
				processPerId: '',
				imageWidth: '',
			};
		},
		onLoad(options) {
			this.faultId = options.faultId;
			this.processId = options.processId;
			this.processPerId = options.processPerId;
			this.title = options.faultTitle;

			uni.getSystemInfo({
				success: (res) => {
					this.imageWidth = res.windowWidth / 6 - 10;
				}
			});
		},
		onShow() {
			const timeType = uni.getStorageSync("timeType");
			if (timeType == "Y") {
				const createTime = uni.getStorageSync("createTime");
				uni.setStorageSync("timeType", "")
				uni.setStorageSync("createTime", "")
				this.createTime = createTime == '' ? 'yy-mm-dd' : createTime;
			} else if (timeType == "N") {
				const endTime = uni.getStorageSync("endTime");
				uni.setStorageSync("timeType", "")
				uni.setStorageSync("endTime", "")
				this.endTime = endTime == '' ? 'yy-mm-dd' : endTime;
			}
		},
		methods: {
			chooseImage: function() {
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						const tempFilePaths = res.tempFilePaths;
						this.uploadimgs = tempFilePaths;
					}
				})
			},
			previewImage: function(src) {
				const pictures = this.uploadimgs;
				uni.previewImage({
					current: src, // 当前显示图片的http链接
					urls: pictures, // 需要预览的图片http链接列表
				})
			},
			deleteImage: function(e) {
				const index = e;
				const images = this.uploadimgs;
				images.splice(index, 1);
				this.uploadimgs = images;
			},
			applySubmit: function(e) {
				this.dealFormIds(e.detail.formId);
				let title = e.detail.value.title;
				let serviceContent = e.detail.value.serviceContent;
				if (title == '') {
					uni.showToast({
						title: '请输入标题'
					})
					return;
				}
				this.title = title;
				if (serviceContent == '') {
					uni.showToast({
						title: '请填输入服务描述'
					})
					return
				}
				this.serviceContent = serviceContent;
				// 判断是否有图片要提交
				if (this.uploadimgs.length == 0) {
					this.uploadNoImageAndData();
				} else {
					uni.showLoading({
						title: '加载中',
					});
					this.uploadImageAndData(0, this.uploadimgs.length);
				}
			},
			// 有图片提交
			uploadImageAndData(i, length) {
				uni.uploadFile({
					url: this.$websiteUrl + serviceCode["ADD_SERVICE_RECORD"],
					fileType: 'image',
					filePath: this.uploadimgs[i],
					name: 'attachment',
					formData: {
						'forwardRecord.faultId': this.faultId,
						'forwardRecord.userId': uni.getStorageSync('userInfo').id,
						'forwardRecord.time': this.getNowFormatDate(),
						'forwardRecord.context': this.serviceContent,
						'forwardRecord.title': this.title,
						"stamp": '2',
						'state': '1',
						'processId': this.processId,
						'processPerId': this.processPerId,
						'routerCompany': uni.getStorageSync("serial"),
						'sessionId': uni.getStorageSync("sessionId")
					},
					success: (res) => {
						console.log('成功')
						console.log(res)
					},
					fail: (res) => {
						console.log('失败');
						console.log(res);
					},

					complete: () => {
						i++
						if (i == length) {
							uni.hideLoading();
							uni.navigateBack({
								url: '../waitServiceDetail/waitServiceDetail',
							})
						} else {
							this.uploadImageAndData(i, length);
						}
					},
				})
			},
			// 没有图片提交
			uploadNoImageAndData() {
				let param = {
					'forwardRecord.faultId': this.faultId,
					'forwardRecord.userId': uni.getStorageSync('userInfo').id,
					'forwardRecord.time': this.getNowFormatDate(),
					'forwardRecord.context': this.serviceContent,
					'forwardRecord.title': this.title,
					"stamp": '4',
					'state': '',
					'attachment': '',
					'processId': this.processId,
					'processPerId': this.processPerId,
				}
				this.$request({
					url: serviceCode["ADD_SERVICE_RECORD"],
					post: "POST",
					data: param,
					success: (res) => {
						uni.navigateTo({
							url: "../waitServiceDetail/waitServiceDetail"
						})
					}
				})
			},
			getNowFormatDate: function() {
				let date = new Date();
				let seperator1 = "-";
				let seperator2 = ":";
				let month = date.getMonth() + 1;
				let strDate = date.getDate();
				let hour = date.getHours();
				let minutes = date.getMinutes();
				let seconds = date.getSeconds();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				if (hour >= 0 && hour <= 9) {
					hour = "0" + hour;
				}
				if (minutes >= 0 && minutes <= 9) {
					minutes = "0" + minutes;
				}
				if (seconds >= 0 && seconds <= 9) {
					seconds = "0" + seconds;
				}
				const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
					" " + hour + seperator2 + minutes +
					seperator2 + seconds;
				return currentdate;
			},
			dealFormIds: function(formId) {
				let formIds = app.globalData.gloabalFomIds; //获取全局数据中的推送码gloabalFomIds数组
				if (!formIds) formIds = [];
				let data = {
					formId: formId,
					expire: parseInt(new Date().getTime()) + 604800000 //计算7天后的过期时间时间戳
				}
				formIds.push(data); //将data添加到数组的末尾
				app.globalData.gloabalFomIds = formIds; //保存推送码并赋值给全局变量
			}
		}
	}
</script>

<style lang="scss">
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.container-page {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.group {
		display: block;
		width: 100%;
	}

	.group-header {
		line-height: 70rpx;
		display: flex;
		padding: 0 20rpx;
		background: #f9f9f9;
	}

	.group-body {
		background: #fff;
		border-top: 1rpx solid #ddd;
		border-bottom: 1rpx solid #ddd;
	}

	.img-upload {
		font-size: 0;
		overflow: hidden;
		margin: 5rpx 5rpx;
	}

	.group-body .input-list {
		margin: 0;
		border: none;
		padding: 0 20rpx;
		background: #fff;
		border-top: 1rpx solid #ddd;
		border-bottom: 1rpx solid #ddd;
	}

	.input-list .input-item {
		padding: 20rpx;
		line-height: 2.4;
		display: flex;
		font-size: 30rpx;
		border-top: 1rpx solid #e8e8e8;
	}

	.input-item-content {
		display: flex;
		align-items: center;
	}

	.input-item-lable {
		display: block;
		color: #666;
	}

	.image-dis {
		margin: 5rpx;
		width: 80rpx;
		height: 80rpx;
	}

	.input-item-change {
		display: block;
		width: 2em;
		color: #49B2F2;

	}

	.add_image {
		background: #FFF;
		border-top: 1rpx solid #ddd;
	}

	.input-item-full {
		flex-wrap: wrap;
	}

	textarea {
		display: block;
		position: relative;
		width: 100%;
		height: 200rpx;
		border: 1rpx solid #e8e8e8;
		padding: 20rpx;
		box-sizing: border-box;
	}

	/*画廊*/
	.gallery {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	/*每张图片所占容器*/
	.item {
		position: relative;
		margin: 5px;
	}

	/*删除按钮*/
	.delete {
		position: absolute;
		height: 20px;
		bottom: 0;
		width: 100%;
		background: #ccc;
		opacity: .8;
	}

	.delete image {
		position: absolute;
		width: 20px;
		height: 20px;
	}
	
	.btn-orange {
		margin-top: 20rpx;
    background: #49B2F2;
    color: #fff;
	}
</style>
