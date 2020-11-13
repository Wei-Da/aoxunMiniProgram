<template>
	<view class="container">
		<!-- uView的toast -->
		<u-toast ref="uToast" />

		<view class="title">
			<view class="left">
				<text>负责人员：{{servicer}}</text>
				<text>公司名称：{{companyName}}</text>
				<text>联系电话：{{phoneNo}}</text>
			</view>
			<view class="right">
				<image class="right-img" src="../../static/images/event_center_icon.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="content">
			<view class="tab-bar">
				<text class="tab-bar-item" :class="{ on : currentIndex === 0 }" @click="switchTabBar(0)">服务内容</text>
				<text class="tab-bar-item" :class="{ on : currentIndex === 1 }" @click="switchTabBar(1)">服务进度</text>
				<text class="tab-bar-item" :class="{ on : currentIndex === 2 }" @click="switchTabBar(2)">关联资产</text>
				<text class="tab-bar-item" :class="{ on : currentIndex === 3 }" @click="switchTabBar(3)">处理记录</text>
				<text class="tab-bar-item" :class="{ on : currentIndex === 4 }" @click="switchTabBar(4)">知识库</text>
				<form report-submit="true" @submit="moreOperation" v-if="isCheckDevice">
					<button form-type="submit" style="height: 60rpx;" class="tab-bar-btn" @click="showActionSheet">操作</button>
				</form>
				<u-action-sheet :list="actionSheetItems" v-model="actionSheetHidden" @click="clickActionSheet"></u-action-sheet>
			</view>
			<view class="divider"></view>
			<!--内容主体-->
			<view class="service-content" v-if="currentIndex === 0">

				<view class="assert-title">
					<image class='assert-title-image' src='../../static/images/service_detail.png'></image>
					<text class='assert-title-text'>内容详情</text>
				</view>
				<view class="assert-content-group">
					<view class="assert-content-item">
						<view class="key">
							标题
						</view>
						<view class="value">
							: {{ faultInfo.title || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							报修人
						</view>
						<view class="value">
							: {{ faultInfo.repairmanName || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							公司名称
						</view>
						<view class="value">
							: {{ faultInfo.companyName || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							联系电话
						</view>
						<view class="value">
							: {{ faultInfo.repairmanPhone || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							故障等级
						</view>
						<view class="value">
							: {{ faultInfo.faultLevel || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							来源
						</view>
						<view class="value">
							: {{ faultInfo.faultFrom || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							故障时间
						</view>
						<view class="value">
							: {{ faultInfo.faultDate || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							影响度
						</view>
						<view class="value">
							: {{ faultInfo.effect || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							服务目录
						</view>
						<view class="value">
							: {{ faultInfo.serviceListName || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							权重
						</view>
						<view class="value">
							: {{ faultInfo.weight || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							最近更新
						</view>
						<view class="value">
							: {{ faultInfo.dualDate || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							服务态度
						</view>
						<view class="value">
							: {{ listCheckInfo.serviceAttitude || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							工作质量
						</view>
						<view class="value">
							: {{ listCheckInfo.serviceQuality || "" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							客评详情
						</view>
						<view class="value">
							: {{ listCheckInfo.serviceContent || "" }}
						</view>
					</view>
					<!-- 分割线 -->
					<view class="divider"></view>
					<view class="service_fault_group">
						<view class="service_fault_content">
							故障内容:
						</view>
						<view class="service_fault_content">
							{{ faultInfo.faultContent || "" }}
						</view>
					</view>
					<!-- 分割线 -->
					<view class="divider"></view>
					<view class="assert-content-item">
						<view class="key">
							语音描述
						</view>
						<view v-if="audioPath == ''" class="value">
							: 暂无
						</view>
						<view v-else class="value" @click="bindtapPlayAudio">
							<image class="audio_image" src='../../static/images/audio_icon.png'></image>
							<text>: 语音</text>
							<image class="record_image" :src="getAudioImg"></image>
						</view>
					</view>
					<!-- 分割线 -->
					<view class="divider"></view>
					<view class='service_image_content'>
						<text class='service_image_content_title'>服务图片:</text>
						<view class="img-upload" v-if='pictures.length!=0'>
							<view class="img-item" v-for="(item, index) in pictures" @click="previewImage(item)" :key="index">
								<image :src="item" mode="aspectFill"></image>
							</view>
						</view>

						<view class="img-upload" v-if='pictures.length == 0'>
							<view class="img-item">
								<image src="../../static/images/no_image.png"></image>
							</view>
						</view>
					</view>
					<!-- 分割线 -->
					<view class="divider"></view>
					<view class='service_image_content'>
						<text class='service_image_content_title'>验收图片:</text>
						<view class="img-upload" v-if='checkPicture.length!=0'>
							<view class="img-item" v-for="(item, index) in checkPicture" @click="previewImage(item)" :key="index">
								<image src="item" mode="aspectFill"></image>
							</view>
						</view>

						<view class="img-upload" v-if='checkPicture.length==0'>
							<view class="img-item">
								<image src="../../static/images/no_image.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="service-content" v-if="currentIndex === 1">
				<view class="assert-title">
					<image class='assert-title-image' src='../../static/images/process_steps.png'></image>
					<text class='assert-title-text'>服务进度 </text>
					<text> ({{ personName || '工程师未确认' }})</text>
				</view>
				<swiper class="step-group" duration="300" :style="{height: mHeight + 'rpx'}" @change="bindchangeSwiper">
					<block v-for="(steps, index) in serviceSteps" :key="index">
						<swiper-item>
							<scroll-view scroll-y="true" class="scoll-h">
								<!-- <block wx:for="{{steps}}" wx:key="*this"> -->

								<view class="step-item" v-for="(item, index) in steps" :key="index">
									<view class='step-line-view'>
										<image class='line-image' src='../../static/images/pass_step.png' v-if='item.isPass'></image>
										<image class='line-image' src='../../static/images/unpass_step.png' v-else></image>
										<view class="step-half-line" v-if='index == 0'></view>
										<view v-else-if='index==steps.length-1'>
											<view v-if='item.isPass' class="step-half-bottom-line"></view>
											<view v-if='!item.isPass' class="step-half-bottom-line-gray"></view>
										</view>
										<view v-else>
											<view v-if='item.isPass' class="step-line"></view>
											<view v-if='!item.isPass' class="step-line-gray"></view>
										</view>
									</view>

									<view class='setp-content'>
										<view class='setp-content-detail'>
											<text class='info-text-step'>{{item.processName}}</text>
											<text class='info-text-step' v-if='item.isPass && item.stage == 6'>{{item.serviceContent}}</text>
											<text class='info-text-step' v-if='item.isPass && item.stage == 6'>{{item.addr}}</text>
											<text class='info-text-step'>{{item.dualdate}}</text>
										</view>
										<view class='setp-content-image-view'>
											<image class='setp-content-image' v-if='item.isPass && item.stage == 6' @click="previewSignIMage" :src='requestAddress+item.imageUrl'></image>
										</view>

									</view>
								</view>

							</scroll-view>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<view class="service-content" v-if="currentIndex === 2">
				<view class="assert-title">
					<image class='assert-title-image' src='../../static/images/service_detail.png'></image>
					<text class='assert-title-text'>资产信息</text>
				</view>
				<view class="assert-content-group">
					<view class="assert-content-item">
						<view class="key">
							负责人
						</view>
						<view class="value">
							: {{ equmentInfo.personName || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							公司名称
						</view>
						<view class="value">
							: {{ equmentInfo.companyName || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							部门
						</view>
						<view class="value">
							: {{ equmentInfo.deptName || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							联系电话
						</view>
						<view class="value">
							: {{ equmentInfo.personPhone || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							设备类型
						</view>
						<view class="value">
							: {{ equmentInfo.deviceType || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							设备名称
						</view>
						<view class="value">
							: {{ equmentInfo.deviceName || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							设备IP
						</view>
						<view class="value">
							: {{ equmentInfo.deviceIP || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							设备品牌
						</view>
						<view class="value">
							: {{ equmentInfo.deviceBrand || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							机柜
						</view>
						<view class="value">
							: {{ equmentInfo.equipmentCabinet || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							设备型号
						</view>
						<view class="value">
							: {{ equmentInfo.deviceModel || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							设备SN
						</view>
						<view class="value">
							: {{ equmentInfo.deviceSN || "暂无数据" }}
						</view>
					</view>
					<view class="assert-content-item">
						<view class="key">
							设备PN
						</view>
						<view class="value">
							: {{ equmentInfo.devicePN || "暂无数据" }}
						</view>
					</view>
				</view>
			</view>

			<view class="service-content" v-if="currentIndex === 3">
				<view class="assert-title">
					<image class='assert-title-image' src='../../static/images/deal_record.png'></image>
					<text class='assert-title-text'>处理记录</text>
				</view>
				<view class='record_group'>
					<view class='record_content_item' style="{border-bottom: 1rpx solid #C0C0C0}" v-for='(item, index) in forwardRecords'
					 :key="index">
						<view class='record_content_item_text'>
							<view class='record_content_item_group'>
								<text class='record_content_item_text_line'>{{item.title}}</text>
								<text class='record_content_item_content'>{{item.context}}</text>
								<text class='record_content_item_time'>{{item.time}}</text>
							</view>
						</view>
						<image v-if="item.imageUrl == ''" class='record_content_item_image' src='../../static/images/no_image.png'></image>
						<image v-else class='record_content_item_image' :src='requestAddress+item.imageUrl' @click='previewSignImage'></image>
					</view>
				</view>
			</view>

			<view class="service-content" v-if="currentIndex === 4">
				<view class="assert-title">
					<image class='assert-title-image' src='../../static/images/known_lib.png'></image>
					<text class='assert-title-text'>知识库</text>
				</view>
				<view class='know_lib_group' v-for='(item, index) in knowledges' :key="index">
					<text v-if='currentItem == index' class="know_lib_item" :class="{'know_lib_item_expand': clickItem !== -1}" @click='clickLib(index)'>{{index+1+'. '+item.title}}</text>
					<text v-else class="know_lib_item" @click='clickLib(index)'>{{index+1+'. '+item.title}}</text>
					<text class='know_lib_answer_item' v-if='currentItem == index&&clickItem!=-1'>{{item.contentss}}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import serviceCode from '@/apis/index.js';
	const app = getApp();

	export default {
		data() {
			return {
				servicer: '',
				companyName: '',
				phoneNo: '',
				faultId: '',
				serviceId: '',
				faultIp: '',
				faultInfo: '',
				equmentInfo: '',
				knowledges: '',
				forwardRecords: '',
				pictures: [],
				checkPicture: [],

				defaultSteps: [{
						addr: '',
						dualdate: '待定',
						imageUrl: '',
						serviceContent: '',
						processName: '服务创建',
						stage: '1',
						isPass: false
					},
					{
						addr: '',
						dualdate: '待定',
						imageUrl: '',
						serviceContent: '',
						processName: '服务分配',
						stage: '3',
						isPass: false
					},
					{
						addr: '',
						dualdate: '待定',
						imageUrl: '',
						serviceContent: '',
						processName: '工程师确认',
						stage: '5',
						isPass: false
					},
					{
						addr: '',
						dualdate: '待定',
						imageUrl: '',
						serviceContent: '',
						processName: '工程师签到',
						stage: '6',
						isPass: false
					},
					{
						addr: '',
						dualdate: '待定',
						imageUrl: '',
						serviceContent: '',
						processName: '服务关闭',
						stage: '7',
						isPass: false
					},
					{
						addr: '',
						dualdate: '待定',
						imageUrl: '',
						serviceContent: '',
						processName: '服务客评',
						stage: '9',
						isPass: false
					},
				],
				serviceSteps: [],
				account: 0,
				currentTab: 0,
				currentItem: 0,
				clickItem: 0,

				actionSheetHidden: false,
				actionSheetItems: [{
					bindtap: 'DeviceCheckHistory',
					text: '设备检测历史'
				}, ],

				modalHidden: true,
				modalTitle: '',
				closeModalHidden: true,
				weight: '',
				popErrorMsg: '',
				requestAddress: '',
				isPlayAudio: false,
				audioPath: '',
				listCheckInfo: [],
				mHeight: '',

				processId: '',
				perId: '',
				yiTodayAdd: false,
				isCheckDevice: false,

				personName: '',
				listTimeRecord: '',
				currentIndex: 0,

			};
		},
		onLoad(option) {
			console.log('文件名', 'serviceHistoryRecordDetail')
			const item = JSON.parse(decodeURIComponent(option.item));
			console.log('传入数据', item)
			this.servicer = item.personName;
			this.companyName = item.companyNameRepair;
			this.phoneNo = item.personMobile;
			this.faultId = item.faultId;
			this.serviceId = item.serviceId;
			this.faultIp = item.equipmentId;
			this.processId = item.processId;
			this.perId = item.perId;
			this.yiTodayAdd = item.yiTodayAdd;
			this.requestAddress = this.$websiteUrl + serviceCode['IMAGE_URL'];

			this.getImageUrl();

			//  高度自适应
			uni.getSystemInfo({
				success: (res) => {
					let clientHeight = res.windowHeight;
					let clientWidth = res.windowWidth;
					let rpxR = 750 / clientWidth;
					let calc = clientHeight * rpxR - 180;
					this.mHeight = calc;
				}
			});
		},
		onShow() {
			this.getServiceDetail();
		},
		methods: {
			getServiceLevel(index) {
				if(index == 5) {
					return '非常好'
				} else if(index == 4) {
					return '较满意'
				} else if(index == 2) {
					return '一般'
				} else {
					return '有待提高'
				}
			},
			
			clickActionSheet(index) {
				const eventName = this.actionSheetItems[index].bindtap
				this[eventName]()
			},

			switchTabBar(index) {
				this.currentIndex = index;
			},

			// 点击操作按钮
			showActionSheet() {
				this.actionSheetHidden = true;
			},

			getServiceDetail() {
				let map = {
					'1': "服务创建",
					'3': "服务分配",
					'5': "工程师确认",
					'6': "工程师签到",
					'7': "服务关闭",
					'9': "服务客评"
				};
				let param = {
					"faultInfo.faultId": this.faultId,
					"faultInfo.serviceid": this.serviceId,
					"faultInfo.equipmentId": this.faultIp,
					"userId": uni.getStorageSync('userInfo').id,
					"mouleId": uni.getStorageSync("appRole"),
					"processId": this.processId,
					"processPerId": this.perId
				};

				this.$request({
					url: serviceCode[this.yiTodayAdd ? "GET_SERVICE_DETAIL_YI" : "GET_SERVICE_DETAIL_JIA"],
					method: 'POST',
					data: param,
					success: (res) => {
						let totalTempSteps = [];
						for (let j = 0; j < res.listTimeRecord.length; j++) {
							let tempSteps = [];
							let num = 0;
							let requestSteps = res.listTimeRecord[j];
							for (let i = 0; i < requestSteps.length; i++) {
								tempSteps[i] = {
									addr: requestSteps[i].addr,
									dualdate: requestSteps[i].dualdate,
									imageUrl: requestSteps[i].imageUrl,
									serviceContent: requestSteps[i].explain,
									processName: map[requestSteps[i].stage],
									stage: requestSteps[i].stage,
									isPass: true
								};
								if (requestSteps[i].stage == 6) {
									num++;
								}
							}

							if (tempSteps.length == 2 && tempSteps[0].stage == '1' && tempSteps[1].stage == '7') {
								for (let i = 0; i < this.defaultSteps.length; i++) {
									if (i == 0) {
										tempSteps[i] = {
											addr: requestSteps[0].addr,
											dualdate: requestSteps[0].dualdate,
											imageUrl: requestSteps[0].imageUrl,
											serviceContent: requestSteps[0].explain,
											processName: map[requestSteps[0].stage],
											stage: requestSteps[0].stage,
											isPass: true
										};
									} else if (i == 4) {
										tempSteps[i] = {
											addr: requestSteps[1].addr,
											dualdate: requestSteps[1].dualdate,
											imageUrl: requestSteps[1].imageUrl,
											serviceContent: requestSteps[1].explain,
											processName: map[requestSteps[1].stage],
											stage: requestSteps[1].stage,
											isPass: true
										};
									} else {
										tempSteps[i] = {
											addr: this.defaultSteps[i].addr,
											dualdate: '无',
											imageUrl: this.defaultSteps[i].imageUrl,
											serviceContent: this.defaultSteps[i].serviceContent,
											processName: this.defaultSteps[i].processName,
											stage: this.defaultSteps[i].stage,
											isPass: true
										};
									}
								}
							} else if (tempSteps.length == 3 && tempSteps[0].stage == '1' && tempSteps[1].stage == '7' && tempSteps[2].stage ==
								'9') {
								for (let i = 0; i < this.defaultSteps.length; i++) {
									if (i == 0) {
										tempSteps[i] = {
											addr: requestSteps[0].addr,
											dualdate: requestSteps[0].dualdate,
											imageUrl: requestSteps[0].imageUrl,
											serviceContent: requestSteps[0].explain,
											processName: map[requestSteps[0].stage],
											stage: requestSteps[0].stage,
											isPass: true
										};
									} else if (i == 4) {
										tempSteps[i] = {
											addr: requestSteps[1].addr,
											dualdate: requestSteps[1].dualdate,
											imageUrl: requestSteps[1].imageUrl,
											serviceContent: requestSteps[1].explain,
											processName: map[requestSteps[1].stage],
											stage: requestSteps[1].stage,
											isPass: true
										};
									} else if (i == 5) {
										tempSteps[i] = {
											addr: requestSteps[2].addr,
											dualdate: requestSteps[2].dualdate,
											imageUrl: requestSteps[2].imageUrl,
											serviceContent: requestSteps[2].explain,
											processName: map[requestSteps[2].stage],
											stage: requestSteps[2].stage,
											isPass: true
										};
									} else {
										tempSteps[i] = {
											addr: this.defaultSteps[i].addr,
											dualdate: '无',
											imageUrl: this.defaultSteps[i].imageUrl,
											serviceContent: this.defaultSteps[i].serviceContent,
											processName: this.defaultSteps[i].processName,
											stage: this.defaultSteps[i].stage,
											isPass: true
										};
									}
								}

							} else {
								if (tempSteps.length == 0) {
									console.log('默认步骤');
									tempSteps = this.defaultSteps;
									tempSteps[0] = {
										addr: '',
										dualdate: res.listFaultInfo[0].faultDate,
										imageUrl: '',
										serviceContent: '',
										processName: '服务创建',
										stage: '1',
										isPass: true
									};
								} else {
									if (num > 1) {
										for (let i = tempSteps.length - num + 1; i < this.defaultSteps.length; i++) {
											tempSteps[i + num - 1] = {
												addr: this.defaultSteps[i].addr,
												dualdate: this.defaultSteps[i].dualdate,
												imageUrl: this.defaultSteps[i].imageUrl,
												serviceContent: this.defaultSteps[i].serviceContent,
												processName: this.defaultSteps[i].processName,
												stage: this.defaultSteps[i].stage,
												isPass: this.defaultSteps[i].isPass
											};
										}
									} else {
										for (let i = tempSteps.length; i < this.defaultSteps.length; i++) {
											tempSteps[i] = {
												addr: this.defaultSteps[i].addr,
												dualdate: this.defaultSteps[i].dualdate,
												imageUrl: this.defaultSteps[i].imageUrl,
												serviceContent: this.defaultSteps[i].serviceContent,
												processName: this.defaultSteps[i].processName,
												stage: this.defaultSteps[i].stage,
												isPass: this.defaultSteps[i].isPass
											};
										}
									}
								}
							}
							totalTempSteps[j] = tempSteps;
						}
						let temImage = [];
						for (let i = 0; i < res.listFaultImage.length; i++) {
							temImage[i] = this.$websiteUrl + serviceCode['CHECK_IMAGE_URL'] + res.listFaultImage[i].imagePath;
						}

						this.faultInfo = res.listFaultInfo[0];
						this.equmentInfo = res.listEqumentInfo[0];
						this.knowledges = res.listKnowledge;
						this.forwardRecords = res.listForwardRecord;
						this.serviceSteps = totalTempSteps;
						this.weight = res.listFaultInfo[0].weight;
						this.listCheckInfo = res.istCheckInfo[0];
						this.isCheckDevice = res.listFaultInfo[0].faultFrom == 7 ? true : res.listFaultInfo[0].faultFrom == 8 ? true :
							false;
						this.checkPicture = temImage;
						this.listTimeRecord = res.listTimeRecord;
						this.personName = res.listTimeRecord != '' && res.listTimeRecord.length > 0 ? res.listTimeRecord[this.currentIndex] !=
							'' && res.listTimeRecord[this.currentIndex].length > 2 ? res.listTimeRecord[this.currentIndex][
								2
							]
							.processingPerson : '工程师未确认' : '工程师未确认';

						this.listCheckInfo.serviceAttitude = this.getServiceLevel(this.listCheckInfo.serviceAttitude);
						this.listCheckInfo.serviceQuality = this.getServiceLevel(this.listCheckInfo.serviceQuality);

						// 故障等级
						if (this.faultInfo.faultLevel) {
							if (this.faultInfo.faultLevel == 10) {
								this.faultInfo.faultLevel = '一般'
							} else if (this.faultInfo.faultLevel == 15) {
								this.faultInfo.faultLevel = '严重'
							} else {
								this.faultInfo.faultLevel = '紧急'
							}
						}
						// 来源
						if (this.faultInfo.faultFrom) {
							if (this.faultInfo.faultFrom == '1') {
								this.faultInfo.faultFrom = '一体机'
							} else if (this.faultInfo.faultFrom == '2') {
								this.faultInfo.faultFrom = '服务台'
							} else if (this.faultInfo.faultFrom == '3') {
								this.faultInfo.faultFrom = 'APP'
							} else if (this.faultInfo.faultFrom == '4') {
								this.faultInfo.faultFrom = '工作流'
							} else if (this.faultInfo.faultFrom == '7') {
								this.faultInfo.faultFrom = '点检'
							} else {
								this.faultInfo.faultFrom = '保养'
							}
						}
						// 影响度
						if (this.faultInfo.effect) {
							let effect
							if (this.faultInfo.effect == '1') {
								effect = "一般"
							} else if (this.faultInfo.effect == '2') {
								effect = "严重"
							} else {
								effect = "紧急"
							}
							this.faultInfo.effect = effect
						}
					}
				})
			},

			getImageUrl() {
				const param = {
					"fid": this.faultId
				};
				let loadPictures = [];

				this.$request({
					url: serviceCode["QUERY_IMAGE_URL"],
					method: 'POST',
					data: param,
					success: (res) => {
						if (res.info.length == 1) {
							if ((res.info[0].url).indexOf("mp3") != -1) {
								this.audioPath = this.$websiteUrl + serviceCode['IMAGE_URL'] + res.info[0].url;
							} else {
								loadPictures[0] = this.$websiteUrl + serviceCode['IMAGE_URL'] + res.info[0].url
							}
						} else {
							if (res.info.length != 0) {
								if ((res.info[res.info.length - 1].url).indexOf("mp3") != -1) {
									for (let i = 0; i < res.info.length - 1; i++) {
										loadPictures[i] = this.$websiteUrl + serviceCode['IMAGE_URL'] + res.info[i].url
									}
									this.audioPath = this.$websiteUrl + serviceCode['IMAGE_URL'] + res.info[res.info.length - 1].url;
								} else {
									for (let i = 0; i < res.info.length; i++) {
										loadPictures[i] = this.$websiteUrl + serviceCode['IMAGE_URL'] + res.info[i].url
									}
								}
							}
						}
						this.pictures = loadPictures;
					}
				})
			},

			previewImage(path) {
				uni.getImageInfo({
					src: path,
					success: function(res) {
						uni.previewImage({
							current: res.path,
							urls: [res.path],
						})
					}
				})
			},

			previewSignImage(e) {
				const path = e.target.dataset.src;
				uni.getImageInfo({
					src: path,
					success: (res) => {
						uni.previewImage({
							current: res.path,
							urls: [res.path],
						})
					}
				})
			},

			clickLib(index) {
				if (this.clickItem == index) {
					this.currentItem = index;
					this.clickItem = -1;
				} else {
					this.currentItem = index;
					this.clickItem = index;
				}
			},

			// 底部弹窗
			moreOperation(e) {
				this.dealFormIds(e.detail.formId);
				this.actionSheetHidden = true;
			},

			modalChange() {
				this.modalHidden = true;

				const param = {
					'faultInfo.faultId': this.faultId,
					'userId': uni.getStorageSync('userInfo').id,
				}
				this.$request({
					url: serviceCode["SERVICE_CONFIRM"],
					method: 'POST',
					data: param,
					success: (res) => {
						uni.navigateBack({
							url: '../waitConfirm/waitConfirm',
						})
					}
				})
			},

			cancleChange() {
				this.modalHidden = false;
			},

			getNowFormatDate() {
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

			bindtapPlayAudio(e) {

				this.isPlayAudio = !this.isPlayAudio;
				uni.downloadFile({
					url: this.audioPath,
					success: (res) => {
						const innerAudioContext = uni.createInnerAudioContext();
						// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
						if (res.statusCode === 200) {
							innerAudioContext.autoplay = true;
							innerAudioContext.src = res.tempFilePath
							innerAudioContext.onPlay(() => {
								console.log('开始播放')
							})
							innerAudioContext.onError((res) => {
								console.log("回调失败");
								console.log(res);
								console.log(res.errMsg)
								console.log(res.errCode)
							})
						}
					}
				})
			},

			DeviceCheckHistory() {
				this.actionSheetHidden = false;
				uni.navigateTo({
					url: '../patrolContentHistory/patrolContentHistory?faultId=' + this.faultId + "&companyId=" + this
						.faultInfo.companyId,
				})
			},

			bindchangeSwiper(e) {
				let steps = this.listTimeRecord;
				if (steps != '' && steps.length > 0) {
					this.personName = steps[e.detail.current] != '' && steps[e.detail.current].length > 2 ? steps[e.detail.current][2]
						.processingPerson : '';
					this.currentIndex = e.detail.current;
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 15rpx;
		box-sizing: border-box;

		.title {
			display: flex;
			width: 100%;
			height: 180rpx;

			.left {
				height: 160rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			.right {
				height: 160rpx;

				.right-img {
					width: 227rpx;
					height: 100%;
				}
			}
		}

		.content {
			flex: 1;

			.divider {
				width: 100%;
				height: 10rpx;
				background-color: #49B2F2;
			}

			.tab-bar {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.tab-bar-item {
					flex: 1;
					text-align: center;
					padding: 10rpx 0;
					font-size: 25rpx;
				}

				.tab-bar-btn {
					display: flex;
					align-items: center;
					color: #49B2F2;
					font-size: 25rpx;
				}

				.on {
					background-color: #49B2F2;
					color: #FFF;
				}
			}

			.service-content {

				.assert-title {
					height: 64rpx;
					display: flex;
					align-items: center;
					margin: 10rpx 0;
					border-bottom: 2rpx solid black;

					&-image {
						width: 40rpx;
						height: 40rpx;
					}

					&-text {
						font-size: 35rpx;
						margin: 0 10rpx;
					}
				}

				.assert-content-group {
					.service_image_content {
						display: flex;
						flex-direction: column;
						margin: 15rpx 0rpx;

						.service_image_content_title {
							font-size: 25rpx;
						}

						.img-upload {
							font-size: 0;
							overflow: hidden;
							margin: 5rpx 5rpx;

							.img-item {
								position: relative;

								image {
									width: 100rpx;
									height: 100rpx;
								}
							}
						}
					}

					.assert-content-item {
						display: flex;
						align-items: center;
						height: 88rpx;
						font-size: 25rpx;
						border-bottom: 0.5rpx solid #F0F1EC;

						.key {
							width: 100rpx;
							height: 88rpx;
							line-height: 88rpx;
							text-align: justify;
							font-size: 25rpx;

							&::after {
								content: " ";
								display: inline-block;
								width: 100%;
							}
						}

						.value {
							font-size: 25rpx;
						}
					}
				}

				.service_fault_group {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					height: 176rpx;

					.service_fault_content {
						width: 100%;
						font-size: 25rpx;

					}
				}

				.step-item {
					width: 100%;
					display: flex;
					flex-direction: row;
				}

				.step-half-line {
					width: 1rpx;
					height: 96rpx;
					display: flex;
					background: #55D209;
					/* margin:25rpx 0;  */
					position: absolute;
					margin-left: 15rpx;
					margin-right: 15rpx;
					margin-top: 96rpx;
				}

				.step-half-bottom-line {
					width: 1rpx;
					height: 96rpx;
					display: flex;
					background: #55D209;
					/* margin:25rpx 0;  */
					position: absolute;
					margin-left: 15rpx;
					margin-right: 15rpx;
					/* margin-bottom: 80rpx; */
				}

				.step-half-bottom-line-gray {
					width: 1rpx;
					height: 96rpx;
					display: flex;
					background: #C0C0C0;
					/* margin:25rpx 0;  */
					position: absolute;
					margin-left: 15rpx;
					margin-right: 15rpx;
					/* margin-bottom: 80rpx; */
				}

				.step-line-view {
					/* width: 50rpx; */
					display: flex;
					vertical-align: middle;
					position: relative;
					margin-right: 50rpx;
				}

				.step-line-gray {
					width: 1rpx;
					height: 192rpx;
					display: flex;
					background: #C0C0C0;
					/* margin:25rpx 0;  */
					position: absolute;
					margin-left: 15rpx;
					margin-right: 15rpx;
				}

				.setp-content {
					display: flex;
					flex-direction: row;
					width: 100%;
					border: 1rpx solid #DCDDE2;
					border-radius: 10rpx;
					background: #FFFFFF;
					margin-bottom: 15rpx;
					margin-top: 15rpx;
					/* padding: 5rpx 0rpx; */
				}

				.setp-content-detail {
					display: flex;
					flex-direction: column;
					flex: 1;
					align-items: center;
					justify-content: center;
					margin-left: 20rpx;
				}

				.info-text-step {
					width: 100%;
					height: 30rpx;
					font-size: 25rpx;
					/* color: #676767; */
				}

				.setp-content-image-view {
					display: flex;
					flex-direction: column;
					vertical-align: middle;
					text-align: center;
					height: 160rpx;
				}

				.setp-content-image {
					width: 100rpx;
					height: 100rpx;
					/* margin-right: 50rpx; */
					vertical-align: middle;
					/* position: absolute; */
					margin: 30rpx 0;
				}

				.line-image {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					margin-top: 81rpx;
				}

				.step-line {
					width: 1rpx;
					height: 192rpx;
					display: flex;
					background: #55D209;
					position: absolute;
					margin-left: 15rpx;
					margin-right: 15rpx;
				}

				.record_group {
					display: flex;
					flex-direction: column;
					margin: 0rpx 25rpx;

				}

				.record_content_item {
					display: flex;
					flex-direction: row;
				}

				.record_content_item_text {
					display: flex;
					flex-direction: column;
					flex: 1;
					justify-content: center;
					align-items: center;
				}

				.record_content_item_group {
					width: 100%;
					display: flex;
					flex-direction: column;
				}

				.record_content_item_text_line {
					font-size: 25rpx;
					text-align: center;
				}

				.record_content_item_content {
					margin: 5rpx 0rpx;
					font-size: 25rpx;
				}

				.record_content_item_time {
					font-size: 20rpx;
					text-align: right;
					padding-right: 15rpx;
				}

				.record_content_item_image {
					width: 100rpx;
					height: 100rpx;
					padding: 30rpx 5rpx;
				}

			}
		}
	}
</style>
