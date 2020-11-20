<template>
	<view>
		<u-toast ref="uToast" />
		
		<map class='map_attr' :latitude='latitude' :longitude='longitude' :markers='markers' />
		<view class='sign_group'>
			<input class='sign_item_text' placeholder='请输入签到说明' :value='signExplain' @input='getInputValue' />
			<button class='sign_item_button' @click='uploadSignData'>一键签到</button>
		</view>
	</view>
</template>

<script>
	const amapFile = require('../../libs/amap-wx.js')
	import serviceCode from '@/apis/index.js';
	export default {
		data() {
			return {
				latitude: '',
				longitude: '',
				markers: [{
					id: 0,
					latitude: 23.099994,
					longitude: 113.324520,
					width: 20,
					height: 27,
				}],

				signExplain: '',
				faultId: '',
				address: '',
				processId: '',
				processPerId: '',
			};
		},
		onLoad(option) {
			this.faultId = option.faultId;
			this.processId = option.processId;
			this.processPerId = option.processPerId;
			const myAmapFun = new amapFile.AMapWX({
				key: '376e754a845d53e4b90f005382a984c8'
			});
			myAmapFun.getRegeo({
				success: (data) => {
					//成功回调
					console.log('成功回调');
					console.log(data);
					this.getMyLocation(data[0].name);

					this.address = data[0].name;

				},
				fail: (info) => {
					//失败回调
					console.log('失败回调');
					console.log(info)
				}
			});


		},
		methods: {
			getMyLocation(address) {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log(res);
						this.latitude = res.latitude,
							this.longitude = res.longitude,
							this.markers = [{
								latitude: res.latitude,
								longitude: res.longitude,
								callout: {
									content: address,
									bgColor: '#49B2F2',
									textAlign: 'center',
									borderRadius: '6',
									padding: '3',
									color: '#FFFFFF',
									display: 'ALWAYS'
								}
							}]
					},
				});
			},
			getInputValue(e) {
				this.signExplain = e.detail.value
			},
			uploadSignData() {
				if (this.signExplain == '') {
					this.$refs.uToast.show({
						title: '请输入签到说明',
						type: 'error'
					})
					return;
				}

				let param = {
					'signRecord.addr': this.address,
					'signRecord.userId': uni.getStorageSync('userInfo').id,
					'signRecord.time': this.getNowFormatDate(),
					'signRecord.explain': this.signExplain,
					'signRecord.faultId': this.faultId,
					"stamp": '5',
					'state': '2',
					'attachment': '',
					'userId': uni.getStorageSync('userInfo').id,
					'processId': this.processId,
					'processPerId': this.processPerId,
				}
				this.$request({
					url: serviceCode['ADD_SERVICE_RECORD'],
					data: param,
					method: 'POST',
					success: (res) => {
						console.log('成功')
						uni.navigateBack()
					}
				})
			},
			getNowFormatDate() {
				var date = new Date();
				var seperator1 = "-";
				var seperator2 = ":";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				var hour = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
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
				var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
					" " + hour + seperator2 + minutes +
					seperator2 + seconds;
				return currentdate;
			}
		}
	}
</script>

<style lang="scss">
	.map_attr {
		display: block;
		width: 750rpx;
		height: 1254rpx;
		// flex: 1;
	}

	.sign_group {
		position: fixed;
		bottom: 0;
		width: 750rpx;
		height: 80rpx;
		/* height: 580rpx;  */
		display: flex;
		flex-direction: row;
	}

	.sign_item_text {
		height: 60rpx;
		line-height: 60rpx;
		border: 1rpx solid #C0C0C0;
		margin: 8rpx 5rpx;
		flex: 1;
	}

	.sign_item_button {
		width: 150rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin: 10rpx 5rpx;
		background: #FFC773;
		font-size: 22rpx;
	}
</style>
