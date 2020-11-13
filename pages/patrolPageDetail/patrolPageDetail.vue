<template>
	<view>
		<u-toast ref="uToast" />
		<view class="ad_popError" v-if="popErrorMsg">{{popErrorMsg}}</view>
		<form class='container-body' report-submit='true' @submit='applySubmit' v-if='state == 0'>
			<view class='patrol_standard_des_group'>
				<text class='patrol_standard_text'>点检标准：</text>
				<text class='patrol_standard_des_text'>{{patrolStandard}}</text>
			</view>

			<view class='patrol_standard_image_check'>
				<text class='patrol_standard_image_check_text'>原图：</text>
				<view class="group-body">
					<view class="img-upload">
						<view class="img-item" @click="previewImage" v-for="(item, index) in originalimgs" :key="index">
							<image :src="item" :data-src='item' mode="aspectFill"></image>
						</view>
						<image class="img-add" v-if="originalimgs.length == 0" src='../../static/images/no_image.png'></image>
					</view>
				</view>
			</view>

			<view class='patrol_standard_image_check'>
				<text class='patrol_standard_image_check_text'>巡检图：</text>
				<view class="group-body">
					<view class="img-upload">
						<view class="gallery">
							<view class="item" v-for="(item, index) in uploadPatrolimgs" :key="index">
								<image :style="{ width: imageWidth + 'px', height: imageWidth + 'px' }" :src="item" @click="previewPatrolImage"
								 mode="aspectFill" />
								<!-- 删除按钮 -->
								<view class="delete" @click="deleteImage" :data-index="index">
									<image :style="{ left: imageWidth / 2 - 10 + 'px' }" src='../../static/images/icon_delete.png' />
								</view>
							</view>
							<view class="item">
								<image :style="{ width: imageWidth + 'px', height: imageWidth + 'px' }" src='../../static/images/icon_add.png'
								 class="button-upload" @click="choosePatrolImage" />
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="input-item-patrol">
				<text class="input-item-lable">描述</text>
				<text type='text' style='flex:1;text-align: right;line-height: 70rpx' @click='transferDescribe'>{{serviceDescribe}}</text>
				<image class="transfer_image" src='../../static/images/transfer.png'></image>
			</view>

			<text class='patrol_standard_text' style='margin-bottom: 10rpx;margin-top: 10rpx'>点检结果：</text>

			<view class='input-account' style='margin-top: 10rpx'>
				<radio-group class="radio-group" @change="resultChange">
					<radio class='radio-item' style='font-size:25rpx' :value="patrolResult[0].value" :checked='patrolResult[0].checked'>{{patrolResult[0].name}}</radio>
					<view style='flex:1'></view>
					<radio class='radio-item' style='font-size:25rpx' :value="patrolResult[1].value" :checked='patrolResult[1].checked'>{{patrolResult[1].name}}</radio>
				</radio-group>
			</view>

			<button type='primary' class='result_button' form-type='submit'>提交</button>
		</form>

		<form class='container-body' @submit='updateRecord' v-if='state == 1'>
			<view class='patrol_standard_des_group'>
				<text class='patrol_standard_text'>点检标准：</text>
				<text class='patrol_standard_des_text'>{{patrolStandard}}</text>
			</view>

			<view class='patrol_standard_image_check'>
				<text class='patrol_standard_image_check_text'>原图：</text>
				<view class="group-body">
					<view class="img-upload">
						<view class="img-item" @click="previewImage" v-for="(item, index) in originalimgs" :key="index">
							<image :src="item" :data-src='item' mode="aspectFill"></image>
						</view>
						<image class="img-add" v-if="originalimgs.length == 0" src='../../static/images/no_image.png'></image>
					</view>
				</view>
			</view>

			<view class='patrol_standard_image_check'>
				<text class='patrol_standard_image_check_text'>巡检图：</text>
				<view class="group-body">
					<view class="img-upload">
						<view class="gallery">
							<view class="item" v-for="(item, index) in uploadPatrolimgs" :key="index">
								<image :style="{ width: imageWidth + 'px', height: imageWidth + 'px' }" :src="item" @click="previewPatrolImage"
								 mode="aspectFill" />
								<!-- 删除按钮 -->
								<view class="delete" @click="deleteImage" :data-index="index">
									<image :style="{ left: imageWidth / 2 - 10 + 'px'}" src='../../static/images/icon_delete.png' />
								</view>
							</view>
							<view class="item">
								<image :style="{ width: imageWidth + 'px', height: imageWidth + 'px' }" src='../../static/images/icon_add.png'
								 class="button-upload" @click="choosePatrolImage" />
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="input-item-patrol">
				<text class="input-item-lable">描述</text>
				<text type='text' style='flex:1;text-align: right;line-height: 70rpx' @click='transferDescribe'>{{serviceDescribe}}</text>
				<image class="transfer_image" src='../../static/images/transfer.png'></image>
			</view>

			<text class='patrol_standard_text' style='margin-bottom: 10rpx;margin-top: 10rpx'>点检结果：</text>

			<view class='input-account' style='margin-top: 10rpx'>
				<radio-group class="radio-group" @change="resultChange">
					<radio class='radio-item' style='font-size:25rpx' :value="patrolResult[0].value" :checked='patrolResult[0].checked'>{{patrolResult[0].name}}</radio>
					<view style='flex:1'></view>
					<radio class='radio-item' style='font-size:25rpx' :value="patrolResult[1].value" :checked='patrolResult[1].checked'>{{patrolResult[1].name}}</radio>
				</radio-group>
			</view>

			<button type='primary' class='result_button' form-type='submit'>提交</button>

		</form>
	</view>
</template>

<script>
	import serviceCode from '@/apis/index.js';
	const app = getApp();

	export default {
		data() {
			return {
				uploadPicture: '../../static/images/add_image.png',
				originalimgs: [],
				uploadPatrolimgs: [],
				faultId: '',
				deviceId: '',
				state: '',
				patrolStandard: '',
				serviceDescribe: '请输入描述',
				patrolResult: [{
						name: "设备正常",
						value: "1",
						checked: true
					},
					{
						name: "设备异常",
						value: "2"
					},
				],
				patrolResultValue: '1',
				instanceId: '',
				activiInstanceId: '',
				companyId: '',
				patrolImageInfo: [],
				isNewImage: false,
				imageWidth: '',
				popErrorMsg: '',
			}
		},
		onLoad(options) {
			uni.getSystemInfo({
				success: (res) => {
					this.imageWidth = res.windowWidth / 6 - 10;
					this.faultId = options.faultId;
					this.state = options.state;
					this.instanceId = options.instanceId;
					this.deviceId = options.deviceId;
					this.activiInstanceId = options.activiInstanceId;
					this.companyId = options.companyId
				}
			});
			if (this.state == '0') {
				this.getPatrolStandard();
			} else {
				this.getPatrolRecord();
			}
		},
		onShow() {
			const serviceDescribe = uni.getStorageSync('serviceDescribe');
			this.serviceDescribe = serviceDescribe == '' ? '请输入描述' : serviceDescribe.length < 10 ? serviceDescribe :
				serviceDescribe.substring(0, 10) + '...';
		},
		onUnload() {
			uni.setStorageSync("serviceDescribe", "");
		},
		methods: {
			choosePatrolImage: function() {
				uni.chooseImage({
					count: 4, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						let tempFilePaths = res.tempFilePaths;
						let canAddPaths = [];
						let addPicSize = 4 - this.uploadPatrolimgs.length;
						if (addPicSize > 0) {
							if (tempFilePaths.length < addPicSize + 1) {
								this.uploadPatrolimgs = this.uploadPatrolimgs.concat(tempFilePaths);
								this.isNewImage = true;
							} else {
								for (let i = 0; i < addPicSize; i++) {
									canAddPaths[i] = tempFilePaths[i]
								}
								this.uploadPatrolimgs = this.uploadPatrolimgs.concat(canAddPaths);
								this.isNewImage = true;
							}

						}
					}
				})
			},

			previewImage: function(e) {
				const pictures = this.originalimgs;
				uni.previewImage({
					current: e.target.dataset.src, // 当前显示图片的http链接
					urls: pictures, // 需要预览的图片http链接列表
				})
			},

			previewPatrolImage: function(e) {
				const pictures = this.uploadPatrolimgs;
				uni.previewImage({
					current: e.target.dataset.src, // 当前显示图片的http链接
					urls: pictures, // 需要预览的图片http链接列表
				})
			},

			transferDescribe: function() {
				uni.navigateTo({
					url: '../serviceDescribe/serviceDescribe',
				})
			},

			getPatrolStandard: function() {
				const param = {
					"faultId": this.faultId,
					"deviceId": this.deviceId
				};
				this.$request({
					url: serviceCode["GET_PATROL_RECORD"],
					method: 'POST',
					data: param,
					success: (res) => {
						let temOriginal = [];
						for (let i = 0; i < res.listEquImage.length; i++) {
							temOriginal[i] = this.$websiteUrl + serviceCode["ORIGINAL_IMAGE"] + '?imageName=' + res.listEquImage[i].url;
						}
						this.patrolStandard = res.inspStandard;
						this.originalimgs = temOriginal;
					}
				})
			},

			getPatrolRecord: function() {
				let tempFilePath = [];
				let temOriginal = [];
				let imageInfo = [];
				let param = {
					"reportId": this.companyId,
					"deviceId": this.deviceId
				};
				this.$request({
					url: serviceCode["GET_PATROL_COMPLETE_RECORD"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < res.listImage.length; i++) {
							tempFilePath[i] = this.$websiteUrl + serviceCode["PATROL_IMAGE"] + '?imageName=' + res.listImage[i].imagePath;
							imageInfo[i] = {
								path: tempFilePath[i],
								imageId: res.listImage[i].imageId
							};
						}
						for (let i = 0; i < res.listEquImage.length; i++) {
							temOriginal[i] = this.$websiteUrl + serviceCode["ORIGINAL_IMAGE"] + '?imageName=' + res.listEquImage[i].url;
						}
						uni.setStorageSync('serviceDescribe', res.listReport[0].reportRemark);

						this.patrolStandard = res.inspStandard;
						this.serviceDescribe = res.listReport[0].reportRemark;
						this.uploadPatrolimgs = tempFilePath;
						this.originalimgs = temOriginal;
						this.patrolResult = res.listReport[0].status == '1' ? [{
								name: "设备正常",
								value: "1",
								checked: true
							},
							{
								name: "设备异常",
								value: "2"
							},
						] : [{
								name: "设备正常",
								value: "1"
							},
							{
								name: "设备异常",
								value: "2",
								checked: true
							},
						];
						this.patrolImageInfo = imageInfo;

					}
				})
			},

			uploadImageAndData: function(i, length) {
				uni.showLoading({
					title: '加载中...',
				})
				// console.log("图片路径");
				// console.log(this.uploadPatrolimgs[i]);
				// console.log(this.uploadPatrolimgs[i].lastIndexOf('.'));
				// console.log(this.uploadPatrolimgs[i].substring(this.uploadPatrolimgs[i].lastIndexOf('.')+1));
				uni.uploadFile({
					url: this.$websiteUrl + serviceCode["SUBMIT_PATROL_RESULT"],
					filePath: this.uploadPatrolimgs.length == 0 ? '' : this.uploadPatrolimgs[i],
					name: 'attachment',
					formData: {
						'status': this.patrolResultValue,
						'faultId': this.faultId,
						'deviceId': this.deviceId,
						'userId': uni.getStorageSync("userInfo").id,
						'reportId': '',
						// 'instanceId': this.instanceId,
						'textAreaVal': this.serviceDescribe == '请输入描述' ? '' : this.serviceDescribe,
						'imageNum': i,
						// 'taskId': this.taskId
						'imgFormat': this.uploadPatrolimgs.length == 0 ? '' : this.uploadPatrolimgs[i].substring(this.uploadPatrolimgs[
							i].lastIndexOf('.') + 1),
						'routerCompany': uni.getStorageSync("serial"),
						'sessionId': uni.getStorageSync("sessionId"),
					},
					success: (res) => {
						console.log('成功');
						console.log(res);
					},
					fail: (res) => {
						console.log('失败');
						console.log(res);
					},

					complete: () => {
						if (length > 0) {
							i++;
							if (i == length) {
								uni.hideLoading();
								uni.navigateBack({

								})
							} else {
								this.uploadImageAndData(i, length);
							}
						} else {
							uni.hideLoading();
							uni.navigateBack({

							})
						}

					},
				})
			},

			resultChange: function(e) {
				this.patrolResultValue = e.detail.value;
			},

			applySubmit: function(e) {
				console.log(e);
				if (this.uploadPatrolimgs.length == 0) {
					this.$refs.uToast.show({
						title: '请加入巡检图片',
						type: 'error',
					})
					return;
				}
				this.uploadImageAndData(0, this.uploadPatrolimgs.length);
			},

			deleteImage: function(e) {
				console.log(e);
				let index = e.currentTarget.dataset.index;
				let images = this.uploadPatrolimgs;
				this.removeImage(images[index], index)
			},

			removeImage: function(imagePath, index) {
				let param = {
					"imageId": ''
				};
				for (let i = 0; i < this.patrolImageInfo.length; i++) {
					if (this.patrolImageInfo[i].path == imagePath) {
						param = {
							"imageId": this.patrolImageInfo[i].imageId
						}
					}
				}
				if (param.imageId != '') {
					this.$request({
						url: serviceCode["REMOV_PATROL_IMAGE"],
						method: 'POST',
						data: param,
						success: (res) => {
							let images = this.uploadPatrolimgs;
							images.splice(index, 1);
							this.uploadPatrolimgs = images;
						}
					})
				} else {
					let images = this.uploadPatrolimgs;
					images.splice(index, 1);
					this.uploadPatrolimgs = images;
				}
			},
			/**
			 * 回看巡检时更新数据
			 */
			updateRecord: function() {
				if (this.isNewImage) {
					this.uploadImageAndData(0, this.uploadPatrolimgs.length);
				} else {
					this.uploadNoImageAndData();
				}
			},

			uploadNoImageAndData: function() {
				let param = {
					'status': this.patrolResultValue,
					'faultId': this.faultId,
					'deviceId': this.deviceId,
					'userId': uni.getStorageSync("userInfo").id,
					'reportId': '',
					// 'instanceId': this.instanceId,
					'textAreaVal': this.serviceDescribe == '请输入描述' ? '' : this.serviceDescribe,
					'imageNum': '',
					// 'taskId': this.taskId,
					'uploadType': '1'
				};
				this.$request({
					url: serviceCode["SUBMIT_PATROL_RESULT"],
					method: 'POST',
					data: param,
					success: (res) => {
						uni.navigateBack({

						})
					}
				})
			},
		}
	}
</script>

<style>
	.device_des_group {
		display: flex;
		flex-direction: row;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #C0C0C0;
	}

	.device_des_image {
		height: 70rpx;
		width: 68rpx;
		margin-left: 35rpx;
		margin-top: 25rpx;
		margin-right: 15rpx;
	}

	.device_des_text_view {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-left: 5rpx;
		margin-top: 12rpx;
	}

	.patrol_standard_des_group {
		display: flex;
		flex-direction: column;
		padding-bottom: 10rpx;
		padding-top: 10rpx;
	}

	.patrol_standard_text {
		margin-left: 25rpx;
	}

	.patrol_standard_text_detail {
		display: flex;
		flex-direction: row;
		width: 100%;
		/* text-align: center */
	}

	.patrol_standard_des_text {
		height: 200rpx;
		padding: 5rpx;
		margin: 10rpx;
		flex: 1;
		border: 1rpx solid #C0C0C0;
		font-size: 27rpx;
	}

	/*  重写 checkbox 样式  */
	checkbox .wx-checkbox-input {
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;

	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		border: none;
		background: green;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}

	.patrol_standard_image_check {
		display: flex;
		flex-direction: column;
	}

	.patrol_standard_image_check_text {
		height: 70rpx;
		line-height: 70rpx;
		margin-left: 25rpx;
	}

	.patrol_standard_image_check_line {
		width: 10rpx;
		background: white
	}

	.patrol_standard_image_check_picture {
		width: 100%;
		height: 260rpx;
	}

	.patrol_standard_result {
		display: flex;
		flex-direction: column;
		border-bottom: 1rpx solid #C0C0C0;
		padding: 20rpx 20rpx;
	}

	.patrol_standard_result_button_group {
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
	}

	.patrol_standard_note {
		padding: 20rpx 20rpx;
	}

	.result_button {
		width: 100%;
		margin: 20rpx 5rpx;
	}

	.input-item-patrol {
		height: 70rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		border-bottom: 1rpx solid #DDDDDD;
	}

	.input-item-lable {
		display: block;
		width: 5em;
		color: #666;
		line-height: 70rpx;
		margin-left: 25rpx;
	}

	.input-account {
		display: flex;
		flex-direction: row;
		height: 80rpx;
		margin: 20rpx 60rpx;
	}

	.radio-group {
		display: flex;
		flex-direction: row;
		flex: 1;
	}

	.radio-item {
		position: static;

	}

	/*画廊*/
	.gallery {
		/*margin-bottom: 100rpx;*/
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
</style>
