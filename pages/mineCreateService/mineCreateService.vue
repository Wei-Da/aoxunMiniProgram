<template>
	<view class="container container-gray">
		<form class='container-body' report-submit='true' @submit='applySubmit'>
			<view class="group">
				<view class="group_title">
					<text class='group_title_text'>创建服务</text>
					<view class='switch_detail' @click='detailSwitchTap'>
						<image class='switch_detail_image' :src='getImgSrc'></image>
						<text class='switch_detail_text'>{{isOpenDetail ? '隐藏详情' : '展开详情' }}</text>
					</view>
					<view class='fun_space'></view>
					<image class='scanner_image' src='../../static/images/scanner.png' @click='scannerData'></image>
				</view>
				<view class="group-body" v-show='isOpenDetail'>
					<view class="input-list">
						<view class="input-item">
							<text class="input-item-lable">标题</text>
							<view class="input-item-content">
								<input type="text" placeholder="请输入标题" :value='title' name="title"></input>
							</view>
						</view>

						<view class="input-item" v-if="!isOtherDevice">
							<text class="input-item-lable">公司名称</text>
							<picker class="input-item-content" @change="bindPickerChange" data-pickername="companyName" :value="companyNameIndex"
							 :range="companyNames" mode="selector">
								<view class="input-item-content">
									{{companyNames[companyNameIndex]}}
								</view>
							</picker>
							<text @click='companySearch'>公司搜索</text>
						</view>

						<view class="input-item">
							<text class="input-item-lable">服务级别</text>
							<picker class="input-item-content" @change="bindPickerChange" data-pickername="serviceLevel" :value="serviceLevelIndex"
							 :range="serviceLevels" mode="selector">
								<view class="input-item-content">
									{{serviceLevels[serviceLevelIndex]}}
								</view>
							</picker>
						</view>


						<view class="input-item">
							<text class="input-item-lable">创建时间</text>
							<view class="input-item-content" @click="toTimeChoose">
								<text>{{createTime}}</text>
							</view>
						</view>

						<view class="input-item">
							<text class="input-item-lable">超时时间</text>
							<view class="input-item-content" @click='toEndTimeChoose'>
								<text>{{endTime}}</text>
							</view>
						</view>

						<view class="input-item">
							<text class="input-item-lable">影响度</text>
							<picker class="input-item-content" @change="bindPickerChange" data-pickername="influenceLevel" :value="influenceLevelIndex"
							 :range="influenceLevels" mode="selector">
								<view class="input-item-content">
									{{influenceLevels[influenceLevelIndex]}}
								</view>
							</picker>
						</view>

						<view class="input-item">
							<text class="input-item-lable">设备所属</text>
							<picker class="input-item-content" @change="bindPickerChange" :value="deviceDepartmentIndex" :range="deviceDepartments"
							 mode="selector" data-pickername="deviceDepartment" v-if='!isOtherDevice'>
								<view class="input-item-content">
									{{deviceDepartments[deviceDepartmentIndex]}}
								</view>
							</picker>
							<text type='text' style='flex:1' v-if='isOtherDevice'>其它</text>
							<text class="input-item-change" @click='changeDeviceFrom'>{{deviceType}}</text>
						</view>

						<view class="input-item">
							<text class="input-item-lable">设备名称</text>
							<picker class="input-item-content" @change="bindPickerChange" :value="deviceNameIndex" :range="deviceNames" mode="selector"
							 data-pickername="deviceName" v-if='!isOtherDevice'>
								<view class="input-item-content">
									{{deviceNames[deviceNameIndex]}}
								</view>
							</picker>
							<text v-if='!isOtherDevice' @click='deviceSearch'>设备搜索</text>
							<input type='text' style='flex:1' placeholder='请输入设备名称' v-if='isOtherDevice' :value='otherDeviceName' name="otherDeviceName"></input>
						</view>

						<view class="input-item" v-if='!isOtherDevice'>
							<text class="input-item-lable">负责人</text>
							<view class="input-item-content">
								<input type='text' placeholder='请输入负责人' :value='devicePerson' name="serviceIp"></input>
							</view>
						</view>

						<view class="input-item" v-if='!isOtherDevice'>
							<text class="input-item-lable">部门</text>
							<view class="input-item-content">
								<input type='text' placeholder='请输入部门' :value='personDepartment' name="serviceIp"></input>
							</view>
						</view>

						<view class="input-item" v-if='!isOtherDevice'>
							<text class="input-item-lable">联系电话</text>
							<view class="input-item-content">
								<input type='text' placeholder='请输入联系电话' :value='personPhone' name="serviceIp"></input>
							</view>
						</view>

					</view>
				</view>

				<view :class="isOpenDetail ? 'create_des' : 'group-body'">
					<view class="input-list">

						<view class="input-item">
							<text class="input-item-lable">服务描述</text>
							<text type='text' style='flex:1;text-align: right' @click='transferDescribe'>{{serviceDescribe}}</text>
							<image class="transfer_image" src='../../static/images/transfer.png'></image>
						</view>

						<view class="input-item">
							<text class="input-item-lable">语音描述</text>
							<view class='audio_record_group' @click='bindtapPlayAudio' v-if="audioPath != ''">
								<image class="audio_image" src='../../static/images/audio_icon.png'></image>
								<text>语音</text>
								<image class="record_image" :src='getRecordImg'></image>
							</view>
							<text type='text' style='flex:1;text-align: right'></text>
							<view :class="isReady ? 'record_group' : 'start_record'" @touchstart='bindtouchstart' @touchend='bindtouchend'>
								<text :class="isReady ? 'record_text' : 'record_start_text'">{{isReady?'长按录音':'松开结束'}}</text>
								<image class="record_image" :src='getRecordImg'></image>
							</view>
						</view>

					</view>
				</view>

				<view class="group-header">上传图片</view>
				<view class="group-body">
					<view class="img-upload">
						<view class="gallery">
							<view class="item" v-for="(item, index) in uploadimgs" :key="index">
								<image :style="{width: imageWidth + 'px', height: imageWidth + 'px'}" :src="item" @click="previewImage" mode="aspectFill" />
								<!-- 删除按钮 -->
								<view class="delete" @click="deleteImage" :data-index="index">
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

			<view class="ad_popError" v-if="popErrorMsg">{{popErrorMsg}}</view>

			<view class="btn-submit">
				<button class="btn-block btn-orange" form-type='submit'>提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	const app = getApp();
	import serviceCode from '@/apis/index.js';
	// const recorderManager = uni.getRecorderManager();
	const options = {
		duration: 10000,
		sampleRate: 44100,
		numberOfChannels: 1,
		encodeBitRate: 192000,
		format: 'mp3',
		frameSize: 50
	};
	// const innerAudioContext = uni.createInnerAudioContext();

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
				serviceContent: '',
				serviceDescribe: '请输入描述',
				deviceDepartments: ['请选择'],
				deviceDepartmentIndex: 0,
				deviceDepartmentInfo: [],
				deviceNames: ['请选择'],
				deviceNameIndex: 0,
				deviceNameInfo: [],
				devicePerson: '',
				personDepartment: '',
				personPhone: '',
				isOtherDevice: true,
				deviceType: '其它',
				otherDeviceName: '',
				isOpenDetail: false,
				isReady: true,
				isPlayAudio: false,
				audioPath: [],
				totalFilePath: [],
				imageWidth: '',
				isSearchDevice: false,
				isSearchCompany: false
			}
		},
		onLoad() {
			this.fetchData();
			this.requestComapny();
			//录音通知回调
			// recorderManager.onStop((res) => {
			// 	innerAudioContext.src = res.tempFilePath;
			// 	this.isReady = true;
			// 	this.audioPath = res.tempFilePath;
			// });
			//录音播放完成回调
			// innerAudioContext.onEnded(() => {
			// 	this.isPlayAudio = !this.isPlayAudio;
			// })

			uni.getSystemInfo({
				success: (res) => {
					this.imageWidth = res.windowWidth / 6 - 10;
				}
			});
		},
		onReady() {
			this.title = "其它设备故障 " + this.getNowFormatDate(true);
			this.createTime = this.getNowFormatDate(true);
			this.endTime = this.getNowFormatDate(false);
			this.serviceLevelIndex = 1;
			this.influenceLevelIndex = 1;
			this.otherDeviceName = "其它设备 " + this.getNowFormatDate(true);
		},
		onShow() {
			let timeType = uni.getStorageSync("timeType");
			let serviceDescribe = uni.getStorageSync('serviceDescribe');
			if (timeType == "Y") {
				let createTime = uni.getStorageSync("createTime");
				uni.setStorageSync("timeType", "");
				uni.setStorageSync("createTime", "");
				this.createTime = createTime == '' ? 'yy-mm-dd' : createTime;
			} else if (timeType == "N") {
				let endTime = uni.getStorageSync("endTime");
				uni.setStorageSync("timeType", "");
				uni.setStorageSync("endTime", "");
				this.endTime = endTime == '' ? 'yy-mm-dd' : endTime;
			}

			this.serviceDescribe = serviceDescribe == '' ? '请输入描述' : serviceDescribe.length < 10 ? serviceDescribe :
				serviceDescribe.substring(0, 10) + '...';

			if (this.isSearchDevice) {
				let deviceIndex = parseInt(uni.getStorageSync("deviceIndex")) + 1;
				if (deviceIndex != '') {
					this.deviceNameIndex = deviceIndex;
					this.devicePerson = this.deviceNameInfo[deviceIndex - 1].personName;
					this.personDepartment = this.deviceDepartmentIndex == this.deviceDepartmentInfo.length + 1 ? "公司资产" : this.deviceDepartmentInfo[
						this.deviceDepartmentIndex - 1].name;
					this.personPhone = this.deviceNameInfo[deviceIndex - 1].personPhone;
					this.isSearchDevice = false;
				}
			}

			if (this.isSearchCompany) {
				let companyNameIndex = parseInt(uni.getStorageSync("companyNameIndex")) + 1;

				this.deviceDepartments = ['请选择'];
				this.deviceDepartmentIndex = 0;
				this.deviceNames = ['请选择'];
				this.deviceNameIndex = 0;
				this.companyNameIndex = companyNameIndex;
				this.devicePerson = '';
				this.personDepartment = '';
				this.personPhone = '';
				this.deviceNameIndex = 0;
				this.isSearchCompany = false

				if (companyNameIndex > 0) {
					this.requestDepartment(this.companyInfos[companyNameIndex - 1].companyid, false);
				}
			}
		},
		onUnload() {
			uni.setStorageSync('serviceDescribe', '')
		},
		methods: {
			getImgSrc() {
				const imgSrc = isOpenDetail ? "open_detail.png" : "close_detail.png";
				return '../../static/images/' + imgSrc
			},

			getRecordImg() {
				const imgSrc = this.isReady ? "ready_record.png" : "do_record.png"
				return '../../static/images/' + imgSrc
			},

			fetchData() {
				this.serviceLevels = ["请选择", "一般", "严重", "紧急"];
				this.influenceLevels = ["请选择", "一般", "严重", "紧急"];
			},

			bindPickerChange(e) {
				const eindex = e.detail.value;
				const name = e.currentTarget.dataset.pickername;
				switch (name) {
					case 'companyName':
						this.deviceDepartments = ['请选择'];
						this.deviceDepartmentIndex = 0;
						this.deviceNames = ['请选择'];
						this.deviceNameIndex = 0;
						this.companyNameIndex = eindex;
						this.devicePerson = '';
						this.personDepartment = '';
						this.personPhone = '';
						this.deviceNameIndex = 0;
						if (eindex > 0) {
							this.requestDepartment(this.companyInfos[eindex - 1].companyid, false);
						}
						break;
					case 'serviceLevel':
						this.serviceLevelIndex = eindex;
						break;
					case 'repairName':
						this.repairNameIndex = eindex;
						break;
					case 'influenceLevel':
						this.influenceLevelIndex = eindex;
						break;
					case 'repairCompany':
						this.repairCompanyIndex = eindex;
						break;
					case 'repairDepartment':
						this.repairDepartmentIndex = eindex;
						break;
					case 'repairMember':
						this.repairMemberIndex = eindex;
						break;
					case 'serviceCatalog':
						this.serviceCatalogIndex = eindex;
						break;
					case 'serviceDetail':
						this.serviceDetailIndex = eindex;
						break;
					case 'deviceDepartment':
						let deviceDepartmentInfo = this.deviceDepartmentInfo;

						this.deviceDepartmentIndex = eindex;
						this.deviceNames = ['请选择'];
						this.deviceNameIndex = 0;
						this.devicePerson = '';
						this.personDepartment = '';
						this.personPhone = '';

						if (deviceDepartmentInfo != '' && eindex > 0) {
							if (eindex == deviceDepartmentInfo.length + 1) {
								this.requestCompanyDeviceName(this.companyInfos[this.companyNameIndex - 1].companyid, false);
							} else {
								this.requestDeviceName(deviceDepartmentInfo[eindex - 1].id, false);
							}
						}
						break;
					case 'deviceName':
						if (eindex > 0) {
							this.deviceNameIndex = eindex;
							this.devicePerson = this.deviceNameInfo[eindex - 1].personName;
							this.personDepartment = this.deviceDepartmentIndex == this.deviceDepartmentInfo.length + 1 ? "公司资产" : this.deviceDepartmentInfo[
								this.deviceDepartmentIndex - 1].name;
							this.personPhone = this.deviceNameInfo[eindex - 1].personPhone;
						} else {
							this.deviceNameIndex = eindex;
							this.devicePerson = '';
							this.personDepartment = '';
							this.personPhone = '';
						}

						break;
					default:
						return
				}
			},

			toTimeChoose(e) {
				uni.setStorageSync("timeType", "Y");
				uni.navigateTo({
					url: '../dateChoose/dateChoose'
				})
			},

			toEndTimeChoose(e) {
				uni.setStorageSync("timeType", "N");
				uni.navigateTo({
					url: '../dateChoose/dateChoose'
				})
			},

			chooseImage() {
				uni.chooseImage({
					count: 9, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						let tempFilePaths = res.tempFilePaths;
						let canAddPaths = [];
						let addPicSize = 9 - this.uploadimgs.length;
						if (addPicSize > 0) {
							if (tempFilePaths.length < addPicSize + 1) {
								this.uploadimgs = this.uploadimgs.concat(tempFilePaths);
							} else {
								for (let i = 0; i < addPicSize; i++) {
									canAddPaths[i] = tempFilePaths[i]
								}
								this.uploadimgs = this.uploadimgs.concat(canAddPaths);
							}

						}
					}
				})
			},

			deleteImage(e) {
				let index = e.currentTarget.dataset.index;
				let images = this.uploadimgs;
				images.splice(index, 1);
				this.uploadimgs = images;
			},

			editImage() {
				this.editable = !this.editable;
			},

			deleteImg(e) {
				const imgs = this.uploadimgs;
				this.uploadimgs = imgs.remove(e.currentTarget.dataset.index)
			},

			previewImage(e) {
				const pictures = this.uploadimgs;
				uni.previewImage({
					current: e.target.dataset.src, // 当前显示图片的http链接
					urls: pictures, // 需要预览的图片http链接列表
				})
			},

			changeRepair() {
				if (this.isOther) {
					this.isOther = false;
					this.changeType = '其它';
				} else {
					this.isOther = true;
					this.changeType = '返回';
				}
			},

			changeDeviceFrom() {
				if (this.isOtherDevice) {
					this.isOtherDevice = false;
					this.deviceType = '其它';
				} else {
					this.isOtherDevice = true;
					this.deviceType = '返回';
				}
			},

			requestComapny() {
				let temCompanys = ['请选择'];
				let param = {
					"type": '1'
				}
				this.$request({
					url: serviceCode["QUERY_COMPANY_NAME"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < res.detail.length; i++) {
							temCompanys[i + 1] = res.detail[i].name;
						}
						this.companyNames = temCompanys;
						this.companyInfos = res.detail;
					}
				})
			},

			requestDepartment(compnayId, isScanner) {
				let temDepartments = ['请选择'];
				let param = {
					"companyId": compnayId
				}

				this.$request({
					url: serviceCode["QUERY_COMPANY_DEPARTMENT"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < res.detail.length; i++) {
							temDepartments[i + 1] = res.detail[i].name;
						}
						temDepartments[res.detail.length + 1] = "公司资产";
						this.deviceDepartments = temDepartments;
						this.deviceDepartmentInfo = res.detail;
						if (isScanner) {
							if (this.scannerInfo.deptId != '') {
								for (let i = 0; i < this.deviceDepartmentInfo.length; i++) {
									if (this.scannerInfo.deptId == this.deviceDepartmentInfo[i].id) {
										this.deviceDepartmentIndex = i + 1;
										this.deviceNames = ['请选择'];
										this.deviceNameIndex = 0;
										this.devicePerson = '';
										this.personDepartment = '';
										this.personPhone = ''
										this.requestDeviceName(this.deviceDepartmentInfo[i].id, true);
									}
								}
							} else {
								this.deviceDepartmentIndex = this.deviceDepartmentInfo.length + 1;
								this.requestCompanyDeviceName(this.scannerInfo.companyId, true);
							}

						}
					}
				})
			},

			requestCompanyMember(deptId) {
				let temMembers = ['请选择'];
				let param = {
					"deptId": deptId
				}

				this.$request({
					url: serviceCode["QUERY_COMPANY_MEMBER"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < res.detail.length; i++) {
							temMembers[i + 1] = res.detail[i].name;
						}
						this.departmentNames = temMembers;
						this.departmentInfos = res.detail;
					}
				})
			},

			applySubmit(e) {
				this.dealFormIds(e.detail.formId);
				let otherDeviceName = e.detail.value.otherDeviceName;
				let title = e.detail.value.title;
				let serviceContent = uni.getStorageSync('serviceDescribe');
				if (uni.getStorageSync('userInfo').isRepair == '1' && this.isOtherDevice) {
					this.popErrorMsg = '请选择二维码扫描的方式报修';
					this.ohShitfadeOut();
					return
				}
				if (title == '') {
					this.popErrorMsg = '请输入标题';
					this.ohShitfadeOut();
					return;
				}
				this.title = title;
				if (!this.isOtherDevice) {
					if (this.companyNameIndex == 0) {
						this.popErrorMsg = '请选择公司';
						this.ohShitfadeOut();
						return;
					}
				}
				if (this.serviceLevelIndex == 0) {
					this.popErrorMsg = '请服务级别';
					this.ohShitfadeOut();
					return;
				}
				if (this.createTime == 'yy-mm-dd' || this.createTime == '') {
					this.popErrorMsg = '请选择创建时间';
					this.ohShitfadeOut();
					return
				}
				if (this.endTime == 'yy-mm-dd' || this.endTime == '') {
					this.popErrorMsg = '请选择超时时间';
					this.ohShitfadeOut();
					return
				}

				if (this.influenceLevelIndex == 0) {
					this.popErrorMsg = '请选择影响度';
					this.ohShitfadeOut();
					return;
				}
				if (!this.isOtherDevice) {
					if (this.deviceNameIndex == 0) {
						this.popErrorMsg = '请选择设备名称';
						this.ohShitfadeOut();
						return;
					}
				} else {
					if (otherDeviceName == '') {
						this.popErrorMsg = '请输入设备名称';
						this.ohShitfadeOut();
						return
					}
					this.otherDeviceName = otherDeviceName;
				}
				if (serviceContent == '' && this.audioPath.length == 0) {
					this.popErrorMsg = '请填输入服务描述或语音描述';
					this.ohShitfadeOut();
					return
				}
				this.serviceContent = serviceContent;
				this.totalFilePath = this.uploadimgs.concat(this.audioPath)
				if (this.totalFilePath.length == 0) {
					this.uploadNoImageAndData();
				} else {
					uni.showLoading({
						title: '加载中',
					});
					this.uploadImageAndData(0, this.totalFilePath.length, '');
				}
			},

			uploadImageAndData(i, length, faultId) {
				let map = {
					'1': '10',
					'2': '15',
					'3': '20'
				};
				uni.uploadFile({
					url: this.$websiteUrl + serviceCode["CREATE_SERVICE"],
					filePath: this.totalFilePath[i],
					name: 'attachment',

					formData: {
						'state': '1',
						'faultId': faultId,
						'userId': uni.getStorageSync('userInfo').id,
						'faultInfo.title': this.title,
						'faultInfo.faultLevel': map[this.serviceLevelIndex + ''],
						'faultInfo.faultDate': this.createTime,
						'faultInfo.faultEndDate': this.endTime,
						'faultInfo.effect': map[this.influenceLevelIndex + ''],
						'faultInfo.faultFrom': '3',
						'faultInfo.faultStatus': '1',
						'faultInfo.faultContent': this.serviceContent,
						'faultInfo.sysuserid': uni.getStorageSync('userInfo').id,
						'faultInfo.companyid': this.isOtherDevice ? '' : this.companyInfos[this.companyNameIndex - 1].companyid,
						'faultInfo.repairmanName': uni.getStorageSync('userInfo').userName,
						'faultInfo.repairmanPhone': uni.getStorageSync('userInfo').mobile,
						'faultInfo.equipmentName': this.isOtherDevice ? this.otherDeviceName : this.deviceNames[this.deviceNameIndex],
						'faultInfo.equipmentId': this.isOtherDevice ? '' : this.deviceNameInfo[this.deviceNameIndex - 1].id,
						'routerCompany': uni.getStorageSync("serial"),
						'sessionId': uni.getStorageSync("sessionId"),
						'faultStatusOne': 1,
					},

					success: (res) => {
						console.log(res);
						if (i == 0) {
							faultId = JSON.parse(res.data).faultId;
							console.log(JSON.parse(res.data).faultId);
						}

					},
					fail: (res) => {
						console.log(res);
					},

					complete: () => {
						i++;
						if (i == length) {
							uni.hideLoading();
							uni.showModal({
								title: '温馨提示',
								content: '服务创建成功',
								showCancel: false,
								success: (res) => {
									if (res.confirm) {
										uni.switchTab({
											url: '../customerPage/customerPage',
										});
									}
								}
							});
						} else {
							this.uploadImageAndData(i, length, faultId);
						}
					}
				})
			},

			uploadNoImageAndData: function() {
				let map = {
					'1': '10',
					'2': '15',
					'3': '20'
				};
				let effects = ['1', '2', '3'];
				let param = {
					'state': '',
					'faultId': '',
					'userId': uni.getStorageSync('userInfo').id,
					'faultInfo.title': this.title,
					'faultInfo.faultLevel': map[this.serviceLevelIndex + ''],
					'faultInfo.faultDate': this.createTime,
					'faultInfo.faultEndDate': this.endTime,
					'faultInfo.effect': effects[this.influenceLevelIndex],
					'faultInfo.faultFrom': '3',
					'faultInfo.faultStatus': '1',
					'faultInfo.faultContent': this.serviceContent,
					'faultInfo.equipmentName': this.isOtherDevice ? this.otherDeviceName : this.deviceNames[this.deviceNameIndex],
					'faultInfo.equipmentId': this.isOtherDevice ? '' : this.deviceNameInfo[this.deviceNameIndex - 1].id,
					'faultInfo.sysuserid': uni.getStorageSync('userInfo').id,
					'faultInfo.companyid': this.isOtherDevice ? '' : this.companyInfos[this.companyNameIndex - 1].companyid,
					'faultInfo.repairmanName': uni.getStorageSync('userInfo').userName,
					'faultInfo.repairmanPhone': uni.getStorageSync('userInfo').mobile,
					'attachment': '',
					'faultStatusOne': 1,
				}
				this.$request({
					url: serviceCode["CREATE_SERVICE"],
					method: 'POST',
					data: param,
					success: (res) => {
						uni.showModal({
							title: '温馨提示',
							content: '服务创建成功',
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.switchTab({
										url: '../customerPage/customerPage',
									});
								}
							}
						});
					}
				})
			},

			requestDeviceName: function(perId, isScanner) {
				let temMembers = ['请选择'];
				let param = {
					"deptId": perId
				}
				this.$request({
					url: serviceCode["GET_DEVICE_NAME"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < res.info.length; i++) {
							temMembers[i + 1] = res.info[i].deviceName;
						}
						this.deviceNames = temMembers;
						this.deviceNameInfo = res.info;
						if (isScanner) {
							for (let i = 0; i < this.deviceNameInfo.length; i++) {
								if (this.deviceNameInfo[i].id == this.scannerInfo.id) {
									this.devicePerson = this.scannerInfo.personName;
									this.personDepartment = this.deviceDepartments[this.deviceDepartmentIndex];
									this.personPhone = this.scannerInfo.personPhone;
									this.deviceNameIndex = i + 1;
								}
							}
						}
					}
				})
			},

			requestCompanyDeviceName: function(companyId, isScanner) {
				let temMembers = ['请选择'];
				let param = {
					"companyId": companyId
				}
				this.$request({
					url: serviceCode["COMPANY_GET_DEVICE_NAME"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < res.info.length; i++) {
							temMembers[i + 1] = res.info[i].deviceName;
						}

						this.deviceNames = temMembers;
						this.deviceNameInfo = res.info;
						if (isScanner) {
							for (let i = 0; i < this.deviceNameInfo.length; i++) {
								if (this.deviceNameInfo[i].id == this.scannerInfo.id) {
									this.devicePerson = this.scannerInfo.personName;
									this.personDepartment = this.deviceDepartments[this.deviceDepartmentIndex];
									this.personPhone = this.scannerInfo.personPhone;
									this.deviceNameIndex = i + 1;
								}
							}
						}
					}
				})
			},

			scannerData: function() {
				uni.scanCode({
					scanType: 'qrCode',
					success: (res) => {
						console.log("扫描成功：");
						if (res.result != null) {
							this.isOtherDevice = false;
							this.getScannerContent(JSON.parse(res.result).eId);
						}
					},
					fail: (res) => {
						console.log("扫描失败")
					}
				})
			},

			getScannerContent: function(id) {
				let hasCompany = false;
				let temMembers = ['请选择'];
				let param = {
					"equipmentInfo.id": id,
					"type": 1
				}
				this.$request({
					url: serviceCode["GET_SCANNER_CONTENT"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < this.companyInfos.length; i++) {
							if (this.companyInfos[i].companyid == res.info[0].companyId) {
								hasCompany = true;

								this.companyNameIndex = i + 1;
								this.deviceDepartments = ['请选择'];
								this.deviceDepartmentIndex = 0;
								this.deviceNames = ['请选择'];
								this.deviceNameIndex = 0;
								this.devicePerson = '';
								this.personDepartment = '';
								this.personPhone = '';
								this.deviceNameIndex = 0;
								this.scannerInfo = res.info[0];
								this.title = res.info[0].deviceName + "故障";
								this.createTime = this.getNowFormatDate(true);
								this.endTime = this.getNowFormatDate(false);
								this.serviceLevelIndex = 1;
								this.influenceLevelIndex = 1;
								this.requestDepartment(this.companyInfos[i].companyid, true);
								break;
							}

						}

						if (!hasCompany) {
							uni.showModal({
								title: '温馨提示',
								content: '服务公司不存在此设备',
								showCancel: false,
								success: (res) => {
									if (res.confirm) {}
								}
							});
							return;
						}
					}
				})
			},

			getNowFormatDate: function(isNowDay) {
				let date = new Date();
				if (!isNowDay) {
					date.setDate(date.getDate() + 3);
				}
				let seperator1 = "-";
				let seperator2 = ":";
				let seperator3 = " ";
				let month = date.getMonth() + 1;
				let strDate = date.getDate();
				let hour = date.getHours();
				let minutes = date.getMinutes()
				let second = date.getSeconds();
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
				if (second >= 0 && second <= 9) {
					second = "0" + second;
				}
				const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + seperator3 + hour +
					seperator2 +
					minutes + seperator2 + second;
				return currentdate;
			},

			//定时器提示框3秒消失  
			ohShitfadeOut: function() {
				let fadeOutTimeout = setTimeout(() => {
					this.popErrorMsg = '';
				}, 3000);
			},

			transferDescribe: function() {
				uni.navigateTo({
					url: '../serviceDescribe/serviceDescribe',
				})
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
			},

			detailSwitchTap: function() {
				this.isOpenDetail = !this.isOpenDetail;
			},

			bindtapPlayAudio: function() {
				this.isPlayAudio = !this.isPlayAudio;
				innerAudioContext.play();
			},

			bindtouchstart: function(e) {
				this.isReady = false;
				recorderManager.start(options);
			},

			bindtouchend: function(e) {
				recorderManager.stop();
				this.isReady = true;
			},

			deviceSearch: function(e) {
				if (this.deviceNames.length != 1) {
					this.isSearchDevice = true;
					uni.navigateTo({
						url: '../searchPage/searchPage?deviceNames=' + this.deviceNames.join('_'),
					})
				}
			},

			companySearch: function(e) {
				if (this.companyNames.length != 1) {
					this.isSearchCompany = true;
					uni.navigateTo({
						url: '../searchCompanyName/searchCompanyName?deviceNames=' + this.companyNames.join('_'),
					})
				}
			}
		}
	}
</script>

<style>
	.input-item-content{
		color: #333;
		flex: 1;
	}
	
	.image-dis {
		margin: 5rpx;
		width: 80rpx;
		height: 80rpx;
	}

	.input-item-change {
		display: block;
		width: 2.5em;
		color: #49B2F2;

	}

	.group_title {
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		flex-direction: row;
		padding-left: 20rpx;
		background: #f9f9f9;
	}

	.scanner_image {
		height: 50rpx;
		width: 50rpx;
		margin: 10rpx 10rpx;

	}

	.group_title_text {
		height: 70rpx;
		line-height: 70rpx;
	}

	.switch_detail {
		height: 70rpx;
		display: flex;
		flex-direction: row
	}

	.fun_space {
		height: 70rpx;
		flex: 1
	}

	.switch_detail_image {
		height: 23rpx;
		width: 23rpx;
		margin: 23.5rpx 20rpx;
	}

	.switch_detail_text {
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 23rpx;
		margin-left: -15rpx;
		color: #A6A6A6;
	}

	.create_des {
		background: #fff;
		border-bottom: 1rpx solid #ddd;
	}

	.create_des .input-list {
		margin: 0;
		border: none;
	}

	.record_group {
		display: flex;
		flex-direction: row;
		border: 1rpx solid #E8E8E8;
		border-radius: 8rpx;
		padding: 0rpx 10rpx;

	}

	.start_record {
		display: flex;
		flex-direction: row;
		border: 1rpx solid #E8E8E8;
		border-radius: 8rpx;
		padding: 0rpx 10rpx;
		background: #5AB9F4;
	}

	.record_image {
		width: 20rpx;
		height: 20rpx;
		margin: 24rpx 5rpx;

	}

	.record_text {
		color: #5AB9F4
	}

	.record_start_text {
		color: #FFFFFF
	}

	.audio_image {
		width: 20rpx;
		height: 20rpx;
		margin: 24rpx 15rpx;

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
