<template>
	<view>
		<view class='scanner_page_group' v-if="isScannerPage">
			<text class='scanner_page_text'>二维码扫描</text>
			<image class='scanner_page_image' src='../../static/images/scanner.png' @click='scannerPage'></image>
		</view>
		<view class="group" v-if="!isScannerPage">
			<view class="group_title">
				<view class='group_title_view'>
					<text class="group_title_text" :class="currentTab == 0 ? 'on' : ''" data-type='click' data-current='0' @click='chooseCatalog'>设备详情</text>
					<text class="group_title_text" :class="currentTab == 1 ? 'on' : ''" data-type='click' data-current='1' @click='chooseCatalog'>维修记录</text>
				</view>
				<image class='scanner_image' src='../../static/images/scanner.png' @click='scannerData'></image>
			</view>

			<view class="group-body" v-if="isDeviceInfoDetail">
				<view class="input-list">

					<view class="input-item">
						<text class="input-item-lable">公司名称</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='companyName' name="companyName"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">部门名称</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='deptName' name="deptName"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">机房名</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='machineRoom' name="machineRoom"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">机柜号</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='cabinet' name="cabinet"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">设备类型</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='deviceType' name="deviceType"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">设备名称</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='deviceName' name="deviceName"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">设备IP</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='deviceIP' name="deviceIP"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">设备品牌</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='deviceMark' name="deviceMark"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">设备型号</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='deviceModel' name="deviceModel"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">上架位置</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='lineLocation' name="lineLocation"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">设备SN</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='deviceSN' name="deviceSN"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">设备PN</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='devicePN' name="devicePN"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">操作系统</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='operateSystem' name="operateSystem"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">投运时间</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='useTime' name="useTime"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">负责人</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='inchargeName' name="inchargeName"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">联系电话</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='inchargePhone' name="inchargePhone"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">出厂编号</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='productNum' name="productNum"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">地址</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='address' name="address"></input>
						</view>
					</view>

					<view class="input-item">
						<text class="input-item-lable">备注</text>
						<view class="input-item-content">
							<input type='text' disabled='true' :value='note' name="note"></input>
						</view>
					</view>

				</view>
			</view>

		</view>
		<scroll-view class="container-body" scroll-y="true" v-if="!isDeviceInfoDetail && !isScannerPage" :scroll-top="scrolltop"
		 lower-threshold="50" @scrolltolower="scrollLoading" @scrolltoupper="onPullDownRefresh">
			<view class="input-list" style='padding-bottom:5rpx;margin-top: 0rpx;margin-bottom: 0rpx;border-bottom:0rpx solid #fff'
			 v-for="(item, index) in repairRecords" :key="index">
				<view class="input-item" style='padding:0rpx'>
					<text class="input-item-lable">维修主题</text>
					<view class="input-item-content">
						<input class='record_title' disabled='true' style='color:#000;font-size:35rpx' type="text" :value='item.title'
						 name="title"></input>
					</view>
				</view>
				<view class="input-item" style='padding:0rpx'>
					<text class="input-item-lable">维修人</text>
					<view class="input-item-content">
						<input class='record_title' disabled='true' type="text" :value='item.personName' name="title"></input>
					</view>
				</view>

				<view class="input-item" style='padding:0rpx;border-top:1rpx solid #FFFFFF'>
					<text class="input-item-lable">维修状态</text>
					<view class="input-item-content">
						<input class='record_title' style='color:#1AAC19' disabled='true' name="title" type="text" :value="item.faultStatus == 7 ? '已完成' : item.faultStatus==9 ? '已完成' : '处理中'"></input>
					</view>
				</view>

				<view class="input-item" style='padding:0rpx;border-top:1rpx solid #FFFFFF'>
					<text class="input-item-lable">维修日期</text>
					<view class="input-item-content">
						<input class='record_title' disabled='true' type="text" :value='item.faultDate' name="title"></input>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const app = getApp();
	import serviceCode from '@/apis/index.js';

	export default {
		data() {
			return {
				companyName: '--',
				deptName: '--',
				machineRoom: '--',
				cabinet: '--',
				deviceType: '--',
				deviceName: '--',
				deviceIP: '--',
				deviceMark: '--',
				deviceModel: '--',
				lineLocation: '--',
				deviceSN: '--',
				devicePN: '--',
				operateSystem: '--',
				useTime: '--',
				inchargeName: '--',
				inchargePhone: '--',
				productNum: '--',
				address: '--',
				note: '--',
				isDeviceInfoDetail: true,
				currentTab: 0,
				repairRecords: [],
				page: 0, //分页,
				equipmentId: '',
				isFirst: true, //用于判断页面切换时是否刷新数据
				isScannerPage: true,
				lastTime: 0,
				isNewScanner: true, //用于判断重新扫描时刷新设备记录
			}
		},

		onPullDownRefresh: function() {
			this.page = 0;
			this.repairRecords = [];
			this.getEquipmentRecord(this.equipmentId);
		},
		methods: {
			//滚动加载
			scrollLoading: function() {
				this.getEquipmentRecord(this.equipmentId);
			},

			scannerData: function() {
				uni.scanCode({
					scanType: 'qrCode',
					success: (res) => {
						this.equipmentId = JSON.parse(res.result).eId;
						if (res.result != null) {
							this.isNewScanner = true;
							this.isFirst = true;
							if (this.isDeviceInfoDetail) {
								this.getScannerContent(JSON.parse(res.result).eId);
							} else {
								this.getEquipmentRecord(JSON.parse(res.result).eId);
							}

						}
					},
					fail: (res) => {
						console.log("扫描失败")
					}
				})
			},

			getScannerContent: function(id) {
				let param = {
					"equipmentInfo.id": id,
					"personId": uni.getStorageSync('userInfo').id
				}
				this.$request({
					url: serviceCode["GET_SCANNER_CONTENT"],
					method: 'POST',
					data: param,
					success: (res) => {
						if (res.info != '') {
							this.companyName = res.info[0].companyName == '' ? '--' : res.info[0].companyName;
							this.deptName = res.info[0].deptName == '' ? '--' : res.info[0].deptName;
							this.machineRoom = res.info[0].machineRoom == '' ? '--' : res.info[0].machineRoom;
							this.cabinet = res.info[0].equipmentCabinet == '' ? '--' : res.info[0].equipmentCabinet;
							this.deviceType = res.info[0].deviceType == '' ? '--' : res.info[0].deviceType;
							this.deviceName = res.info[0].deviceName == '' ? '--' : res.info[0].deviceName;
							this.deviceIP = res.info[0].deviceIP == '' ? '--' : res.info[0].deviceIP;
							this.deviceMark = res.info[0].deviceBrand == '' ? '--' : res.info[0].deviceBrand;
							this.deviceModel = res.info[0].deviceModel == '' ? '--' : res.info[0].deviceModel;
							this.lineLocation = res.info[0].position == '' ? '--' : res.info[0].position;
							this.deviceSN = res.info[0].deviceSN == '' ? '--' : res.info[0].deviceSN;
							this.devicePN = res.info[0].devicePN == '' ? '--' : res.info[0].devicePN;
							this.operateSystem = res.info[0].operatingSystem == '' ? '--' : res.info[0].operatingSystem;
							this.useTime = res.info[0].inTime == '' ? '--' : res.info[0].inTime;
							this.inchargeName = res.info[0].personName == '' ? '--' : res.info[0].personName;
							this.inchargePhone = res.info[0].personPhone == '' ? '--' : res.info[0].personPhone;
							this.productNum = res.info[0].serialNumber == '' ? '--' : res.info[0].serialNumber;
							this.address = res.info[0].installationLocation == '' ? '--' : res.info[0].installationLocation;
							this.note = res.info[0].remarks == '' ? '--' : res.info[0].remarks;
						}
					}
				})
			},

			chooseCatalog: function(e) {
				let currentTab = e.currentTarget.dataset.current;
				if (currentTab == 0) {
					if (this.equipmentId != "") {
						if (this.isFirst) {
							this.getScannerContent(this.equipmentId);
							this.isFirst = false;
						}
					}
					this.isDeviceInfoDetail = true;
					this.currentTab = currentTab;
				} else {
					if (this.equipmentId != "") {
						if (this.isFirst) {
							this.getEquipmentRecord(this.equipmentId);
							this.isFirst = false;
						}
					}
					this.isDeviceInfoDetail = false;
					this.currentTab = currentTab;
				}

			},

			getEquipmentRecord: function(id) {
				if (this.isNewScanner) {
					this.page = 0;
					this.isNewScanner = false;
					this.repairRecords = [];
				}
				let nowTime = new Date().getTime();
				if ((nowTime - this.lastTime) < 500) {
					console.log("重复提交")
					return;
				}
				this.lastTime = nowTime;
				this.page = this.page + 1;
				let param = {
					"equipmentInfoId": id,
					"personId": uni.getStorageSync('userInfo').id,
					"page": this.page,
					"rows": 10
				}
				this.$request({
					url: serviceCode["GET_SCANNER_EQUIPMENT_RECORD"],
					method: 'POST',
					data: param,
					success: (res) => {
						if (res.info != '') {
							this.repairRecords = this.repairRecords.concat(res.info)
						}
					}
				})
			},

			scannerPage: function() {
				console.log('scannerPage')
				uni.scanCode({
					scanType: 'qrCode',
					success: (res) => {
						this.equipmentId = JSON.parse(res.result).eId;
						this.isScannerPage = false;
						if (res.result != null) {
							if (this.isDeviceInfoDetail) {
								this.getScannerContent(JSON.parse(res.result).eId);
							} else {
								this.getEquipmentRecord(JSON.parse(res.result).eId);
							}

						}
					},
					fail: (res) => {
						console.log("扫描失败")
					}
				})
			},
		}
	}
</script>

<style>
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

	.group_title {
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		flex-direction: row;
		/* padding-left: 20rpx; */
		background: #f9f9f9;
	}

	.scanner_image {
		height: 50rpx;
		width: 50rpx;
		margin: 10rpx 10rpx;
	}

	.group_title_text {
		height: 70rpx;
		width: 50%;
		text-align: center;
		line-height: 70rpx;

	}

	.group_title_view {
		display: flex;
		flex: 1;
		flex-direction: row;
	}

	.on {
		color: #49B2F2;
		/* background: #49B2F2;  */
	}

	.record_title {
		text-align: right;
		color: #666;
	}

	.input-item-content {
		color: #333;
		flex: 1;
	}

	.record_content {
		text-align: right;
		color: #666;
		display: -webkit-box;
		font-size: 28rpx;
		line-height: 40rpx;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		/* text-overflow:ellipsis; */
	}

	.scanner_page_group {
		width: 100%;
		height: 100%;
		display: relative;
		background: #F8F8F8
	}

	.scanner_page_image {
		height: 100rpx;
		width: 100rpx;
		margin: auto;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.scanner_page_text {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 40%;
		font-size: 30rpx;
	}

	.add_style {
		margin-top: 0;
		margin-bottom: 0
	}
</style>
