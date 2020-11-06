<template>
	<view>
		<!-- uView的toast -->
		<u-toast ref="uToast" />
		<form class='container-body' report-submit='true' @submit='applySubmit'>

			<view class='patrol_standard_image_check'>
				<text class='patrol_standard_image_check_text'>验收图：</text>
				<view class="group-body">
					<view class="img-upload">
						<view class="gallery">
							<view class="item" v-for="(item, index) in uploadPatrolimgs" :key="index">
								<image :style="{width: imageWidth + 'px', height: imageWidth + 'px'}" :src="item" @click="previewPatrolImage(item)"
								 mode="aspectFill" />
								<!-- 删除按钮 -->
								<view class="delete" @click="deleteImage(index)">
									<image :style="{left: imageWidth / 2 - 10 + 'px'}" src='../../static/images/icon_delete.png' />
								</view>
							</view>
							<view class="item">
								<image mode="aspectFill" :style="{width: imageWidth + 'px', height: imageWidth + 'px'}" src='../../static/images/icon_add.png'
								 class="button-upload" @click="choosePatrolImage" />
							</view>
						</view>
					</view>
				</view>
			</view>

			<button type='primary' class='result_button' form-type='submit'>提交</button>
		</form>

	</view>
</template>

<script>
	import serviceCode from '@/apis/index.js';
	export default {
		data() {
			return {
				uploadPicture: '../../static/images/add_image.png',
				uploadPatrolimgs: [],
				faultId: '',
				patrolStandard: '',
				patrolResultValue: '1',
				patrolImageInfo: [],
				isNewImage: false,
				imageWidth: '',
				popErrorMsg: '',
				imageInfo: []
			};
		},
		onLoad(options) {
			this.faultId = options.faultId;
			uni.getSystemInfo({
				success: function(res) {
					this.imageWidth = res.windowWidth / 6 - 10
				}
			});
			this.getPatrolStandard()
		},
		methods: {
			getPatrolStandard() {
				const param = {
					"faultId": this.faultId
				};
				this.$request({
					url: serviceCode["QUERY_CHECK_PICTURE"],
					method: "PSOT",
					success: (res) => {
						let temOriginal = [];
						for (let i = 0; i < res.listFaultImage.length; i++) {
							temOriginal[i] = this.$websiteUrl + serviceCode["CHECK_IMAGE_URL"] + res.listFaultImage[i].imagePath;
						}
						this.imageInfo = res.listFaultImage;
						this.uploadPatrolimgs = temOriginal;
					}
				})
			},
			choosePatrolImage() {
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
								this.uploadPatrolimgs = this.uploadPatrolimgs.concat(tempFilePaths)
								this.isNewImage = true
							} else {
								for (let i = 0; i < addPicSize; i++) {
									canAddPaths[i] = tempFilePaths[i]
								}
								this.uploadPatrolimgs = this.uploadPatrolimgs.concat(canAddPaths)
								this.isNewImage = true
							}

						}
					}
				})
			},
			previewPatrolImage(src) {
				const pictures = this.uploadPatrolimgs;
				uni.previewImage({
					current: src, // 当前显示图片的http链接
					urls: pictures, // 需要预览的图片http链接列表
				})
			},
			uploadImageAndData(i, length) {
				uni.showLoading({
					title: '加载中...',
				})
				uni.uploadFile({
					url: this.$websiteUrl + serviceCode["SAVE_CHECK_IMAGE"],
					filePath: this.uploadPatrolimgs.length == 0 ? '' : this.uploadPatrolimgs[i],
					name: 'attachment',
					formData: {
						'faultId': this.faultId,
						'imageNum': i,
						'imgFormat': this.uploadPatrolimgs.length == 0 ? '' : this.uploadPatrolimgs[i].substring(this.uploadPatrolimgs[
							i].lastIndexOf('.') + 1),
						'routerCompany': uni.getStorageSync("serial"),
						'sessionId': uni.getStorageSync("sessionId")
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
			applySubmit(e) {
				if (this.uploadPatrolimgs.length == 0) {
					this.$refs.uToast.show({
						title: '请加入巡检图片',
						type: 'error'
					})
					return;
				}
				this.uploadImageAndData(0, this.uploadPatrolimgs.length);
			},
			deleteImage: function(index) {
				const images = this.uploadPatrolimgs;
				this.removeImage(images[index], index);
			},
			removeImage(imagePath, index) {
				let param = {
					"faultReportId": ''
				};
				for (let i = 0; i < this.imageInfo.length; i++) {
					if (this.$websiteUrl + serviceCode["CHECK_IMAGE_URL"] + this.imageInfo[i].imagePath == imagePath) {
						param = {
							"faultReportId": this.imageInfo[i].seldId
						}
					}
				}
				if (param.faultReportId != '') {
					this.$request({
						url: serviceCode["DELETE_CHECK_PICTURE"],
						data: param,
						method: "PSOT",
						success: (res) => {
							const images = this.uploadPatrolimgs;
							images.splice(index, 1);
							this.uploadPatrolimgs = images
						}
					})
				} else {
					let images = this.uploadPatrolimgs;
					images.splice(index, 1);
					this.uploadPatrolimgs = images
				}
			}
		}
	}
</script>

<style lang="scss">
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
		/* margin-top: 10rpx; */
		/* margin-bottom: 5rpx; */
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
		/* flex: 1; */
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
		margin: 20rpx 0rpx;
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
