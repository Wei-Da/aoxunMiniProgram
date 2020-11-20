<template>
	<view>
		<view class="ad_popError" v-if="errorMsg">{{errorMsg}}</view>
		<!-- 页面弹窗 -->
		<u-modal title="请确定服务人" v-model="modalHidden" mask-close-able @confirm="modalChange" @cancel="cancleChange">
			<view class="input-list">
				<view class="input-item">
					<text class="input-item-lable">公司类型</text>
					<picker class="input-item-content" @change="bindPickerChange" data-pickername="companyType" :value="companyTypeIndex"
					 :range="companyTypes" mode="selector">
						<view class="input-item-content">
							{{companyTypes[companyTypeIndex]}}
						</view>
					</picker>
				</view>
				<view class="input-item" v-if="isRepairCompany">
					<text class="input-item-lable">维修公司</text>
					<picker class="input-item-content" @change="bindPickerChange" data-pickername="repairCompany" :value="repairCompanyIndex"
					 :range="repairCompanys" mode="selector">
						<view class="input-item-content">
							{{repairCompanys[repairCompanyIndex]}}
						</view>
					</picker>
				</view>

				<view class="input-item" v-if="isRepairCompany">
					<text class="input-item-lable">维修部门</text>
					<picker class="input-item-content" @change="bindPickerChange" data-pickername="repairDepartment" :value="repairDepartmentIndex"
					 :range="repairDepartments" mode="selector">
						<view class="input-item-content">
							{{repairDepartments[repairDepartmentIndex]}}
						</view>
					</picker>
				</view>

				<view class="input-item" v-if="isRepairCompany">
					<text class="input-item-lable">维修人员</text>
					<picker class="input-item-content" @change="bindPickerChange" :value="repairMemberIndex" :range="repairMembers"
					 mode="selector" data-pickername="repairMember">
						<view class="input-item-content">
							{{repairMembers[repairMemberIndex]}}
						</view>
					</picker>
				</view>

				<view class="input-item" v-if="!isRepairCompany">
					<text class="input-item-lable">服务公司</text>
					<picker class="input-item-content" @change="bindPickerChange" data-pickername="serviceCompany" :value="serviceCompanyIndex"
					 :range="companyNames" mode="selector">
						<view class="input-item-content">
							{{companyNames[serviceCompanyIndex]}}
						</view>
					</picker>
				</view>

				<view class="input-item" v-if="!isRepairCompany">
					<text class="input-item-lable">服务人员</text>
					<picker class="input-item-content" @change="bindPickerChange" :value="companyManIndex" :range="companyMans" mode="selector"
					 data-pickername="companyMan">
						<view class="input-item-content">
							{{companyMans[companyManIndex]}}
						</view>
					</picker>
				</view>

				<view class="input-item">
					<text class="input-item-lable">工单数</text>
					<text class="input-item-content">{{gds==''?'--':gds}}</text>
				</view>

				<view class="input-item">
					<text class="input-item-lable">及时率</text>
					<text class="input-item-content">{{jsl==''?'--':jsl}}</text>
				</view>

				<view class="input-item">
					<text class="input-item-lable">好评率</text>
					<text class="input-item-content">{{hpl==''?'--':hpl}}</text>
				</view>

			</view>
		</u-modal>
		<view class="container container-gray">
			<form class='container-body' :report-submit='true' @submit='applySubmit'>
				<view class="group">
					<view class="group_title">
						<text class='group_title_text'>创建服务</text>
						<image class='scanner_image' src='../../static/images/scanner.png' @click='scannerData'></image>
					</view>
					<view class="group-body">
						<view class="input-list">
							<view class="input-item">
								<text class="input-item-lable">标题</text>
								<view class="input-item-content">
									<input type="text" placeholder="请输入标题" :value='title' name="title"></input>
								</view>
							</view>

							<view class="input-item">
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
								<text class="input-item-lable">部门</text>
								<picker class="input-item-content" @change="bindPickerChange" data-pickername="departmentName" :value="departmentNameIndex"
								 :range="departmentNames" mode="selector">
									<view class="input-item-content">
										{{departmentNames[departmentNameIndex]}}
									</view>
								</picker>
							</view>

							<view class="input-item">
								<text class="input-item-lable">报修人员</text>
								<picker class="input-item-content" @change="bindPickerChange" data-pickername="repairName" :value="repairNameIndex"
								 :range="repairNames" mode="selector" v-if='!isOther'>
									<view class="input-item-content">
										{{repairNames[repairNameIndex]}}
									</view>
								</picker>
								<input type='text' style='flex:1' placeholder='请输入报修人员' v-if='isOther' :value='repairMan' name="repairMan"></input>
								<text class="input-item-change" @click='changeRepair'>{{changeType}}</text>
							</view>

							<view class="input-item">
								<text class="input-item-lable">电话</text>
								<view class="input-item-content">
									<input type='text' v-if='!isOther' disabled='true' :value='telephone' name="telephone"></input>
									<input type='text' v-else placeholder='请输入电话' :value='repairManPhone' name="repairManPhone"></input>
								</view>
							</view>

							<view class="input-item">
								<text class="input-item-lable">服务级别</text>
								<picker class="input-item-content" @change="bindPickerChange" data-pickername="serviceLevel" :value="serviceLevelIndex"
								 :range="influenceLevels" mode="selector">
									<view class="input-item-content">
										{{influenceLevels[serviceLevelIndex]}}
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
								<picker class="input-item-content" @change="bindPickerChange" :value="deviceNameIndex" :range="deviceNames"
								 mode="selector" data-pickername="deviceName" v-if='!isOtherDevice'>
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

							<view class="input-item">
								<text class="input-item-lable">服务目录</text>
								<picker class="input-item-content" @change="bindPickerChange" :value="serviceCatalogIndex" :range="serviceCatalogs"
								 mode="selector" data-pickername="serviceCatalog">
									<view class="input-item-content">
										{{serviceCatalogs[serviceCatalogIndex]}}
									</view>
								</picker>
							</view>

							<view class="input-item">
								<text class="input-item-lable">具体服务</text>
								<picker class="input-item-content" @change="bindPickerChange" :value="serviceDetailIndex" :range="serviceDetails"
								 mode="selector" data-pickername="serviceDetail">
									<view class="input-item-content">
										{{serviceDetails[serviceDetailIndex]}}
									</view>
								</picker>
							</view>

							<view class="input-item">
								<text class="input-item-lable">权重</text>
								<view class="input-item-content">
									<text>{{weight}}</text>
								</view>
							</view>

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
									<image class="record_image" :src='getAudioImgUrl'></image>
								</view>
								<text type='text' style='flex:1;text-align: right'></text>
								<view :class="isReady ? 'record_group' : 'start_record'" @touchstart='bindtouchstart' @touchend='bindtouchend'>
									<text :class="isReady ? 'record_text' : 'record_start_text'">{{isReady?'长按录音':'松开结束'}}</text>
									<image class="record_image" :src='getRecordImgUrl'></image>
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
	</view>
</template>

<script>
	const app = getApp();
	import serviceCode from '@/apis/index.js';
	const recorderManager = uni.getRecorderManager();
	const options = {
		duration: 60000,
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
				departmentNames: ["请选择"],
				departmentNameIndex: 0,
				departmentInfos: [],
				repairNames: ["请选择"],
				repairNameIndex: 0,
				repairNameInfo: [],
				influenceLevels: [],
				influenceLevelIndex: 0,
				repairCompanys: [],
				repairCompanyIndex: 0,
				repairCompanyInfo: [],
				repairDepartments: ['请选择'],
				repairDepartmentIndex: 0,
				repairDepartmentInfo: [],
				repairMembers: ['请选择'],
				repairMemberIndex: 0,
				repairMemberInfo: [],
				deviceDepartments: ['请选择'],
				deviceDepartmentIndex: 0,
				deviceDepartmentInfo: [],
				deviceNames: ['请选择'],
				deviceNameIndex: 0,
				deviceNameInfo: [],
				serviceCatalogs: [],
				serviceCatalogInfo: [],
				serviceCatalogIndex: 0,
				serviceDetails: ['请选择'],
				serviceDetailInfo: [],
				serviceDetailIndex: 0,
				serviceLevelIndex: 0,
				pictures: [],
				index: 0,
				createTime: "yy-mm-dd",
				endTime: "yy-mm-dd",
				uploadimgs: [],
				editable: false, //是否可编辑
				title: '',
				changeType: '其它',
				isOther: false,
				telephone: '',
				weight: '',
				popErrorMsg: '',
				errorMsg: '',
				serviceContent: '',
				repairMan: '',
				repairManPhone: '',
				serviceDescribe: '请输入描述',
				devicePerson: '',
				personDepartment: '',
				personPhone: '',
				isOtherDevice: false,
				deviceType: '其它',
				otherDeviceName: '',
				scannerInfo: '',
				modalHidden: false,
				companyTypes: ['运维公司', '服务公司'],
				companyTypeIndex: 0,
				serviceCompanyIndex: 0,
				companyMans: ['请选择'],
				companyManIndex: 0,
				companyManInfo: [],
				isRepairCompany: true,
				imageWidth: '',
				audioPath: [],
				isReady: true,
				isPlayAudio: false,
				totalFilePath: [],
				isSearchDevice: false,
				isSearchCompany: false,
				gds: '',
				jsl: '',
				hpl: ''
			}
		},
		onLoad(options) {
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
			this.fetchData();
			this.requestComapny(false);
			this.requestServiceCatalog();
			this.ohShitfadeOut();
		},
		onShow() {
			let timeType = uni.getStorageSync("timeType");
			let serviceDescribe = uni.getStorageSync('serviceDescribe');
			if (timeType == "Y") {
				let createTime = uni.getStorageSync("createTime");
				uni.setStorageSync("timeType", "");
				uni.setStorageSync("createTime", "");
				this.createTime = createTime == '' ? 'yy-mm-dd' : createTime
			} else if (timeType == "N") {
				let endTime = uni.getStorageSync("endTime");
				uni.setStorageSync("timeType", "");
				uni.setStorageSync("endTime", "");
				this.endTime = endTime == '' ? 'yy-mm-dd' : endTime;
			}

			this.serviceDescribe = serviceDescribe == '' ? '请输入描述' : serviceDescribe.length < 10 ? serviceDescribe :
				serviceDescribe
				.substring(0, 10) + '...';

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
				if (companyNameIndex != '') {

					this.departmentNames = ['请选择'];
					this.departmentNameIndex = [0];
					this.repairNames = ['请选择'];
					this.repairNameIndex = [0];
					this.deviceDepartments = ['请选择'];
					this.deviceDepartmentIndex = 0;
					this.deviceNames = ['请选择'];
					this.deviceNameIndex = 0;
					this.companyNameIndex = companyNameIndex;
					this.devicePerson = '';
					this.personDepartment = '';
					this.personPhone = '';
					this.deviceNameIndex = 0;
					this.isSearchCompany = false;
					if (companyNameIndex > 0) {
						this.requestDepartment(this.companyInfos[companyNameIndex - 1].companyid, false, false);
					}
				}
			}
		},
		onUnload() {
			uni.setStorageSync('serviceDescribe', '')
		},
		methods: {
			getAudioImgUrl() {
				const imgUrl = !this.isPlayAudio ? "ready_record.png" : "do_record.png";
				return '../../static/images/' + imgUrl;
			},
			getRecordImgUrl() {
				const imgUrl = this.isReady ? "ready_record.png" : "do_record.png";
				return '../../static/images/' + imgUrl;
			},
			fetchData() {
				this.influenceLevels = ["请选择", "一般", "严重", "紧急"];
			},
			bindPickerChange(e) {
				const eindex = e.detail.value;
				const name = e.currentTarget.dataset.pickername;
				switch (name) {
					case 'companyName':
						this.departmentNames = ['请选择'];
						this.departmentNameIndex = [0];
						this.repairNames = ['请选择'];
						this.repairNameIndex = [0];
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
							this.requestDepartment(this.companyInfos[eindex - 1].companyid, false, false);
						}
						break;
					case 'departmentName':
						this.departmentNameIndex = eindex;
						if (eindex > 0) {
							this.requestCompanyMember(this.departmentInfos[eindex - 1].id, false);
						}

						this.repairNames = ['请选择'];
						this.repairNameIndex = [0];
						break;
					case 'repairName':
						let phone = this.repairNameInfo[eindex - 1].mobile;
						this.repairNameIndex = eindex;
						this.telephone = phone;
						break;
					case 'serviceLevel':
						this.serviceLevelIndex = eindex;
						break;
					case 'influenceLevel':
						this.influenceLevelIndex = eindex;
						break;
					case 'repairCompany':
						this.repairCompanyIndex = eindex;
						if (eindex > 0) {
							this.requestDepartment(this.repairCompanyInfo[eindex - 1].companyid, true, false);
						}
						this.repairDepartments = ['请选择'];
						this.repairDepartmentIndex = [0];
						this.repairMembers = ['请选择'];
						this.repairMemberIndex = [0];
						this.gds = '';
						this.jsl = '';
						this.hpl = ''

						break;
					case 'repairDepartment':

						this.repairDepartmentIndex = eindex;
						if (eindex > 0) {
							this.requestCompanyMember(this.repairDepartmentInfo[eindex - 1].id, true);
						}

						this.repairMembers = ['请选择'];
						this.repairMemberIndex = [0];
						this.gds = '';
						this.jsl = '';
						this.hpl = ''

						break;
					case 'repairMember':

						this.repairMemberIndex = eindex;

						if (eindex > 0) {
							this.requestPersonAccount(this.repairMemberInfo[eindex - 1].id);
						}
						break;
					case 'serviceCatalog':
						this.serviceCatalogIndex = eindex;
						this.weight = this.serviceCatalogInfo[eindex - 1].weight;
						this.requestServiceCatalogDetail(this.serviceCatalogInfo[eindex - 1].id);
						break;
					case 'serviceDetail':
						this.serviceDetailIndex = eindex;
						this.weight = this.serviceDetailInfo[eindex - 1].weight;
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
					case 'companyType':
						if (eindex == 0) {
							this.isRepairCompany = true;
							this.companyTypeIndex = eindex;
							this.gds = '';
							this.jsl = '';
							this.hpl = '';
						} else {
							this.isRepairCompany = false;
							this.companyTypeIndex = eindex;
							this.gds = '';
							this.jsl = '';
							this.hpl = ''
						}
						break;
					case 'serviceCompany':

						this.serviceCompanyIndex = eindex;
						this.gds = '';
						this.jsl = '';
						this.hpl = ''

						if (eindex > 0) {
							this.requestServiceCompanyMember(this.companyInfos[eindex - 1].companyid);
						}
						break;
					case 'companyMan':
						this.companyManIndex = eindex;
						if (eindex > 0) {
							this.requestPersonAccount(this.companyManInfo[eindex - 1].id);
						}
						break;
					default:
						return
				}
			},

			toTimeChoose(e) {
				uni.setStorageSync("timeType", "Y");
				uni.navigateTo({
					url: '../study/study'
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

			modalChange() {
				this.modalHidden = false;
				if (this.companyTypeIndex == 0) {
					if (this.repairCompanyIndex == 0) {
						this.popErrorMsg = '请选择服务公司';
						this.tipfadeOut();
						return;
					}
					if (this.repairMemberIndex == 0) {
						this.popErrorMsg = '请选择服务人员';
						this.tipfadeOut();
						return;
					}
				} else {
					if (this.serviceCompanyIndex == 0) {
						this.popErrorMsg = '请选择服务公司';
						this.tipfadeOut();
						return;
					}
					if (this.companyManIndex == 0) {
						this.popErrorMsg = '请选择服务人员';
						this.tipfadeOut();
						return;
					}
				}
				this.totalFilePath = this.uploadimgs.concat(this.audioPath);
				if (this.totalFilePath.length == 0) {
					this.uploadNoImageAndData();
				} else {
					uni.showLoading({
						title: '加载中',
					});
					this.uploadImageAndData(0, this.totalFilePath.length, '');
				}
			},

			requestServiceCompanyMember(companyId) {
				let temMembers = ['请选择'];
				let param = {
					"userInfo.companyId": companyId
				}

				this.$request({
					url: serviceCode["GET_MEMBER_BY_COMPANY"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < res.info.length; i++) {
							temMembers[i + 1] = res.info[i].userName;
						}
						this.companyMans = temMembers;
						this.companyManInfo = res.info;
					}
				})
			},

			requestComapny(isRepair) {
				let temCompanys = ['请选择'];
				let param = {
					"type": '1'
				}
				if (isRepair) {
					param.type = '2';
				}
				this.$request({
					url: serviceCode["QUERY_COMPANY_NAME"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < res.detail.length; i++) {
							temCompanys[i + 1] = res.detail[i].name;
						}
						if (!isRepair) {
							this.companyNames = temCompanys;
							this.companyInfos = res.detail;
						} else {
							this.repairCompanys = temCompanys;
							this.repairCompanyInfo = res.detail;
						}
					}
				})
			},

			/**
			 * 获取部门信息
			 * isRepair是否维修
			 * isScanner扫描数据
			 */
			requestDepartment(compnayId, isRepair, isScanner) {
				let temDepartments = ['请选择'];
				let temDeviceDepartments = ['请选择'];
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
							temDeviceDepartments[i + 1] = res.detail[i].name;
						}
						temDeviceDepartments[res.detail.length + 1] = "公司资产";
						if (!isRepair) {
							this.departmentNames = temDepartments;
							this.departmentInfos = res.detail;
							this.deviceDepartments = temDeviceDepartments;
							this.deviceDepartmentInfo = res.detail;
							if (isScanner) {
								if (this.scannerInfo.deptId != '') {
									for (let i = 0; i < this.deviceDepartmentInfo.length; i++) {
										if (this.scannerInfo.deptId == this.deviceDepartmentInfo[i].id) {
											this.departmentNameIndex = i + 1;
											this.repairNames = ['请选择'];
											this.repairNameIndex = [0];
											this.deviceDepartmentIndex = i + 1;
											this.deviceNames = ['请选择'];
											this.deviceNameIndex = 0;
											this.devicePerson = '';
											this.personDepartment = '';
											this.personPhone = '';
											this.requestCompanyMember(this.deviceDepartmentInfo[i].id, false);
											this.requestDeviceName(this.deviceDepartmentInfo[i].id, true);
										}
									}
								} else {
									this.deviceDepartmentIndex = this.deviceDepartmentInfo.length + 1,
										this.repairNames = ['请选择'],
										this.repairNameIndex = [0],
										this.requestCompanyDeviceName(this.scannerInfo.companyId, true);
								}

							}
						} else {
							this.repairDepartments = temDepartments;
							this.repairDepartmentInfo = res.detail;
						}
					}
				})

			},

			requestCompanyMember(deptId, isRepair) {
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
							temMembers[i + 1] = res.detail[i].userName;
						}
						if (!isRepair) {
							this.repairNames = temMembers;
							this.repairNameInfo = res.detail;
						} else {
							this.repairMembers = temMembers;
							this.repairMemberInfo = res.detail;
						}
					}
				})
			},

			requestPersonAccount(userId) {
				const param = {
					"faultReportDTO.sysUserId": userId
				}

				this.$request({
					url: serviceCode["GET_PERSON_ORDER_COUNT"],
					method: 'POST',
					data: param,
					success: (res) => {
						if (res.info.length > 0) {
							this.gds = res.info[0].ungdscount;
							this.jsl = res.info[0].jslff;
							this.hpl = res.info[0].hplff;
						}
					}
				})
			},

			requestServiceCatalog() {
				let temMembers = ['请选择'];

				this.$request({
					url: serviceCode["GET_SERVICE_CATALOG"],
					method: 'POST',
					success: (res) => {
						for (let i = 0; i < res.info.length; i++) {
							temMembers[i + 1] = res.info[i].name;
						}
						this.serviceCatalogs = temMembers;
						this.serviceCatalogInfo = res.info;
					}
				})
			},

			requestServiceCatalogDetail(perId) {
				let temMembers = ['请选择'];
				let param = {
					"serviceList.perId": perId
				}
				this.$request({
					url: serviceCode["GET_SERVICE_CATALOG_DETAIL"],
					method: 'POST',
					data: param,
					success: (res) => {
						for (let i = 0; i < res.info.length; i++) {
							temMembers[i + 1] = res.info[i].name;
						}
						this.serviceDetails = temMembers;
						this.serviceDetailInfo = res.info;
					}
				})
			},

			requestDeviceName(perId, isScanner) {
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

			requestCompanyDeviceName(companyId, isScanner) {
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

			//定时器提示框3秒消失  
			ohShitfadeOut() {
				let fadeOutTimeout = setTimeout(() => {
					this.requestComapny(true);
				}, 600);
			},

			tipfadeOut() {
				let fadeOutTimeout = setTimeout(() => {
					this.popErrorMsg = '';
				}, 3000);
			},

			tipfadeOutByNoCompany() {
				let fadeOutTimeout = setTimeout(() => {
					this.errorMsg = '';
				}, 3000);
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

			applySubmit(e) {
				this.dealFormIds(e.detail.formId);
				let otherDeviceName = e.detail.value.otherDeviceName;
				let title = e.detail.value.title;
				let serviceContent = uni.getStorageSync('serviceDescribe');
				let repairMan = e.detail.value.repairMan;
				let repairManPhone = e.detail.value.repairManPhone;
				if (uni.getStorageSync('userInfo').isRepair == '1' && this.isOtherDevice) {
					this.popErrorMsg = '请选择二维码扫描的方式报修';
					this.ohShitfadeOut();
					return
				}
				if (title == '') {
					this.popErrorMsg = '请输入标题';
					this.tipfadeOut();
					return;
				}
				this.title = title;
				if (this.companyNameIndex == 0) {
					this.popErrorMsg = '请选择服务公司';
					this.tipfadeOut();
					return;
				}
				if (!this.isOther) {
					if (this.repairNameIndex == 0) {
						this.popErrorMsg = '请选择报修人';
						this.tipfadeOut();
						return;
					}
				} else {
					if (repairMan == '') {
						this.popErrorMsg = '请输入报修人';
						this.tipfadeOut();
						return;
					}
					if (repairManPhone == '') {
						this.popErrorMsg = '请输入报修人电话';
						this.tipfadeOut();
						return;
					}

				}
				if (this.serviceLevelIndex == 0) {
					this.popErrorMsg = '请服务级别';
					this.tipfadeOut();
					return;
				}
				if (this.createTime == 'yy-mm-dd' || this.createTime == '') {
					this.popErrorMsg = '请选择创建时间';
					this.tipfadeOut();
					return
				}
				if (this.endTime == 'yy-mm-dd' || this.endTime == '') {
					this.popErrorMsg = '请选择超时时间';
					this.tipfadeOut();
					return
				}

				if (this.influenceLevelIndex == 0) {
					this.popErrorMsg = '请选择影响度';
					this.tipfadeOut();
					return;
				}

				if (!this.isOtherDevice) {
					if (this.deviceNameIndex == 0) {
						this.popErrorMsg = '请选择设备名称';
						this.tipfadeOut();
						return;
					}
				} else {
					if (otherDeviceName == '') {
						this.popErrorMsg = '请输入设备名称';
						this.tipfadeOut();
						return
					}
					this.otherDeviceName = otherDeviceName;
				}
				if (this.serviceCatalogIndex == 0) {
					this.popErrorMsg = '请选择服务目录';
					this.tipfadeOut();
					return;
				}
				if (serviceContent == '' && this.audioPath.length == 0) {
					this.popErrorMsg = '请填输入服务描述或语音描述';
					this.tipfadeOut();
					return
				}
				this.serviceContent = serviceContent;
				this.modalHidden = true;

			},

			uploadImageAndData(i, length, faultId) {
				let map = {
					'1': '10',
					'2': '15',
					'3': '20'
				};
				let effects = ['1', '2', '3'];
				uni.uploadFile({
					url: this.$websiteUrl + serviceCode["CREATE_SERVICE"],
					filePath: this.totalFilePath.length == 0 ? '' : this.totalFilePath[i],
					name: 'attachment',
					formData: {
						'state': '1',
						'faultId': faultId,
						'userId': uni.getStorageSync('userInfo').id,
						'faultInfo.title': this.title,
						'faultInfo.faultLevel': map[this.serviceLevelIndex + ''],
						'faultInfo.faultDate': this.createTime,
						'faultInfo.faultEndDate': this.endTime,
						'faultInfo.serviceid': this.serviceCatalogInfo[parseInt(this.serviceCatalogIndex) - 1].id,
						'faultInfo.effect': effects[this.influenceLevelIndex],
						'faultInfo.faultFrom': '3',
						'faultInfo.faultStatus': '3',
						'faultInfo.faultContent': this.serviceContent,
						'faultInfo.personid': this.companyTypeIndex == 0 ? this.repairMemberInfo[this.repairMemberIndex -
							1].id : this.companyManInfo[this.companyManIndex - 1].id,
						'faultInfo.equipmentName': this.isOtherDevice ? this.otherDeviceName : this.deviceNames[this
							.deviceNameIndex],
						'faultInfo.equipmentId': this.isOtherDevice ? '' : this.deviceNameInfo[this.deviceNameIndex - 1]
							.id,
						'faultInfo.weight': this.weight,
						'faultInfo.companyid': this.companyInfos[parseInt(this.companyNameIndex) - 1].companyid,
						'faultInfo.repairmanName': this.isOther ? this.repairMan : this.repairNameInfo[parseInt(this
							.repairNameIndex) - 1].userName,
						'faultInfo.repairmanPhone': this.isOther ? this.repairManPhone : this.repairNameInfo[parseInt(this.repairNameIndex) -
							1].mobile,
						'faultInfo.sysuserid': this.isOther ? "" : this.repairNameInfo[parseInt(this.repairNameIndex) - 1].id,
						'routerCompany': uni.getStorageSync("serial"),
						'sessionId': uni.getStorageSync("sessionId"),
					},
					success: (res) => {
						if (i == 0) {
							faultId = JSON.parse(res.data).faultId;
						}
					},
					fail: (res) => {
						console.log('失败');
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
										})
									}
								}
							})
						} else {
							this.uploadImageAndData(i, length, faultId);
						}
					},
				})
			},

			uploadNoImageAndData() {
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
					'faultInfo.serviceid': this.serviceCatalogInfo[parseInt(this.serviceCatalogIndex) - 1].id,
					'faultInfo.effect': effects[this.influenceLevelIndex],
					'faultInfo.faultFrom': '3',
					'faultInfo.faultStatus': '3',
					'faultInfo.faultContent': this.serviceContent,
					'faultInfo.equipmentName': this.isOtherDevice ? this.otherDeviceName : this.deviceNames[this
						.deviceNameIndex],
					'faultInfo.equipmentId': this.isOtherDevice ? '' : this.deviceNameInfo[this.deviceNameIndex - 1].id,
					'faultInfo.weight': this.weight,
					'faultInfo.companyid': this.companyInfos[parseInt(this.companyNameIndex) - 1].companyid,

					'faultInfo.repairmanName': this.isOther ? this.repairMan : this.repairNameInfo[parseInt(this
						.repairNameIndex) - 1].userName,
					'faultInfo.repairmanPhone': this.isOther ? this.repairManPhone : this.repairNameInfo[parseInt(
						this.repairNameIndex) - 1].mobile,
					'faultInfo.sysuserid': this.isOther ? "" : this.repairNameInfo[parseInt(this.repairNameIndex) - 1]
						.id,
					'attachment': ''
				};
				if (this.companyTypeIndex == 0) {
					param['faultInfo.personid'] = this.repairMemberInfo[this.repairMemberIndex - 1].id;
				} else {
					param['faultInfo.personid'] = this.companyManInfo[this.companyManIndex - 1].id;
				};
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

			transferDescribe() {
				uni.navigateTo({
					url: '../serviceDescribe/serviceDescribe',
				})
			},

			dealFormIds(formId) {
				let formIds = app.globalData.gloabalFomIds; //获取全局数据中的推送码gloabalFomIds数组
				if (!formIds) formIds = [];
				let data = {
					formId: formId,
					expire: parseInt(new Date().getTime()) + 604800000 //计算7天后的过期时间时间戳
				}
				formIds.push(data); //将data添加到数组的末尾
				app.globalData.gloabalFomIds = formIds; //保存推送码并赋值给全局变量
			},

			scannerData() {
				uni.scanCode({
					scanType: 'qrCode',
					success: (res) => {
						console.log("扫描成功：")
						if (res.result != null) {
							this.getScannerContent(JSON.parse(res.result).eId)
						}
					},
					fail: (res) => {
						console.log("扫描失败")
					}
				})
			},

			getScannerContent(id) {
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
								this.departmentNames = ['请选择'];
								this.departmentNameIndex = [0];
								this.repairNames = ['请选择'];
								this.repairNameIndex = [0];
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
								this.requestDepartment(this.companyInfos[i].companyid, false, true);
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
					},
					onError: () => {
						uni.showModal({
							title: '温馨提示',
							content: '服务请求失败',
							showCancel: false,
							success: (res) => {
								if (res.confirm) {}
							}
						});
					}
				})
			},

			getNowFormatDate(isNowDay) {
				let date = new Date();
				if (!isNowDay) {
					date.setDate(date.getDate() + 1);
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
				const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + seperator3 + hour + seperator2 +
					minutes + seperator2 + second;
				return currentdate;
			},

			bindtapPlayAudio() {
				this.isPlayAudio = !this.isPlayAudio;
				innerAudioContext.play();
			},

			bindtouchstart(e) {
				this.isReady = false;
				recorderManager.start(options);
			},

			bindtouchend(e) {
				recorderManager.stop();
				this.isReady = true;
			},

			deviceSearch(e) {
				if (this.deviceNames.length != 1) {
					this.isSearchDevice = true;
					uni.navigateTo({
						url: '../searchPage/searchPage?deviceNames=' + this.deviceNames.join('_'),
					})
				}
			},

			companySearch(e) {
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
		flex: 1;
		line-height: 70rpx;
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
