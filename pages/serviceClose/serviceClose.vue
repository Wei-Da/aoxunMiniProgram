<template>
	<view class="container container-gray">
		<u-toast ref="uToast" />
		<form class='container-body' report-submit='true' @submit='applySubmit'>
			<view class="group">
				<view class="group-body">
					<view class="input-list">
						<view class="input-item">
							<button class="input-item-lable" style='flex:1' @click="insertCost">增加额外费用</button>
						</view>
						<view class="input-item" style="border-top:0rpx;padding-top:0rpx">
							<button class="input-item-lable" style='flex:1' @click="deleteCost">删除额外费用</button>
						</view>
						<view class='cost_group' v-for="(item, index) in extraCosts" :key="index">
							<view class="input-item">
								<text class="input-item-lable">额外花费</text>
								<picker class="input-item-content" @change="bindPickerChange" :data-pickername="'costType' + index" :value="costTypeIndexs[index].mIndex"
								 :range="costTypes" mode="selector">
									<view>
										{{costTypes[costTypeIndexs[index].mIndex]}}
									</view>
								</picker>
							</view>
							<view class="input-item">
								<text class="input-item-lable">费用</text>
								<view class="input-item-content">
									<input type='number' placeholder='请输入费用' value=""></input>
								</view>
							</view>
						</view>
						<view class="input-item">
							<text class="input-item-lable">所属项目</text>
							<picker class="input-item-content" @change="bindPickerProject" :value="projectIndex" :range="listProject" mode="selector">
								<view>
									{{listProject[projectIndex]}}
								</view>
							</picker>
						</view>
						<view class="input-item">
							<text class="input-item-lable">权重</text>
							<view class="input-item-content">
								<input type="number" placeholder="请输入权重值" :value='weight' name="weight" disabled='true'></input>
							</view>
						</view>
						<view class="input-item">
							<text class="input-item-lable">服务描述</text>
							<text type='text' style='flex:1;text-align: right' bindtap='transferDescribe'>{{serviceDescribe}}</text>
							<image class="transfer_image" src='../../static/images/transfer.png'></image>
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
	const app = getApp()
	import serviceCode from '@/apis/index.js';
	export default {
		data() {
			return {
				extraCosts: [0],
				costTypes: ["请选择", "差旅费", "招待费", "快递费", "配件费", "其它"],
				costNames: [],
				costTypeIndexs: [{
					mIndex: 0
				}],
				weight: '',
				costData: "",
				serviceDescribe: "",
				faultId: "",
				projectIndex: 0,
				listProject: ['请选择'],
				projectInfo: "",
				processId: '',
				processPerId: '',
				serviceCompanyId: ''
			};
		},
		onLoad(options) {
			this.faultId = options.faultId;
			this.weight = options.weight;
			this.processId = options.processId;
			this.processPerId = options.processPerId;
			this.serviceCompanyId = options.serviceCompanyId;
			this.requestFeeAndProject();
		},
		onShow() {
			const serviceDescribe = uni.getStorageSync('serviceDescribe');
			this.serviceDescribe = serviceDescribe == '' ? '请输入描述' : serviceDescribe.length < 10 ? serviceDescribe :
				serviceDescribe.substring(0, 10) + '...';
		},
		onUnload() {
			uni.setStorageSync('serviceDescribe', '')
		},
		methods: {
			// 增加额外费用
			insertCost() {
				let costs = this.extraCosts;
				let tempCostTypeIndexs = this.costTypeIndexs;
				tempCostTypeIndexs[this.extraCosts.length] = {
					mIndex: 0
				};
				costs.push(this.extraCosts.length);
				this.extraCosts = costs;
				this.costTypeIndexs = tempCostTypeIndexs;
			},
			// 删除额外费用
			deleteCost() {
				let costs = this.extraCosts;
				let tempCostTypeIndexs = this.costTypeIndexs;
				if (costs.length > 1) {
					tempCostTypeIndexs.pop(this.extraCosts.length);
					costs.pop(this.extraCosts.length);
					this.extraCosts = costs;
					this.costTypeIndexs = tempCostTypeIndexs;
				}
			},
			// 额外花费
			bindPickerChange(e) {
				const eindex = e.detail.value;
				const name = e.currentTarget.dataset.pickername;
				let tempCostTypeIndexs = this.costTypeIndexs;
				for (let i = 0; i < tempCostTypeIndexs.length; i++) {
					if (name == 'costType' + i) {
						tempCostTypeIndexs[i].mIndex = eindex;
						this.costTypeIndexs = tempCostTypeIndexs
					}
				}
			},
			// 所属项目
			bindPickerProject(e) {
				const eindex = e.detail.value;
				this.projectIndex = eindex;
			},
			applySubmit(e) {
				this.dealFormIds(e.detail.formId);
				let weight = e.detail.value.weight;
				let tempCostTypeIndexs = this.costTypeIndexs;
				let temCostData = [];
				for (let i = 0; i < tempCostTypeIndexs.length; i++) {
					let cost = "cost" + i;
					if (tempCostTypeIndexs.length > 1) {
						if (tempCostTypeIndexs[i].mIndex == 0) {
							this.$refs.uToast.show({
								title: '请选择费用类型',
								type: 'error'
							})
							return;
						}
						if (e.detail.value[cost] == "") {
							this.$refs.uToast.show({
								title: '请选输入费用数额',
								type: 'error'
							})
							return;
						}
					}

					temCostData[i] = {
						"name": tempCostTypeIndexs[i].mIndex,
						"cost": e.detail.value[cost]
					};
				}
				if (this.projectIndex == 0) {
					this.$refs.uToast.show({
						title: '请选择项目所属',
						type: 'error'
					})
					return;
				}
				if (weight == '') {
					this.$refs.uToast.show({
						title: '请输入权重',
						type: 'error'
					})
					return;
				}

				this.weight = weight;

				const param = {
					'forwardRecord.faultId': this.faultId,
					'forwardRecord.userId': uni.getStorageSync('userInfo').id,
					"forwardRecord.time": this.getNowFormatDate(),
					'forwardRecord.context': '',
					'extraCostArray': JSON.stringify(temCostData),
					'explain': this.serviceDescribe = "请输入描述" ? "" : this.serviceDescribe,
					'weight': this.weight,
					'inProject': this.projectInfo[this.projectIndex - 1].projectInfoId,
					'processId': this.processId,
					'processPerId': this.processPerId,
				}

				this.$request({
					url: serviceCode["CLOSE_SERVICE"],
					method: 'POST',
					data: param,
					success: (res) => {
						if (res.resultcode == "3") {
							this.$refs.uToast.show({
								title: '子流程未结束，不能关闭工单',
								type: 'error'
							})
						} else if (res.resultcode == "2") {
							uni.navigateBack({})
						}
					}
				})
			},
			transferDescribe() {
				uni.navigateTo({
					url: '../../serviceDescribe/serviceDescribe',
				})
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
				let formIds = app.globalData.gloabalFomIds;// 获取全局数据中的推送码gloabalFomIds数组
				if (!formIds) formIds = [];
				let data = {
					formId: formId,
					expire: parseInt(new Date().getTime()) + 604800000 // 计算7天后的过期时间时间戳
				}
				formIds.push(data);// 将data添加到数组的末尾
				app.globalData.gloabalFomIds = formIds; // 保存推送码并赋值给全局变量
			},
			requestFeeAndProject() {
				const param = {
					'faultInfo.faultId': this.faultId,
					'faultInfo.companyid': this.serviceCompanyId
				}
				this.$request({
					url: serviceCode["GET_PROJECT_AND_FEE_DETAIL"],
					method: "POST",
					data: param,
					success: (res) => {
						let temListProject = ['请选择'];

						for (let i = 0; i < res.listProjectInfo.length; i++) {
							temListProject[i + 1] = res.listProjectInfo[i].name;
						}

						this.projectInfo = res.listProjectInfo;
						this.listProject = temListProject;

					}
				})
			}
		}
	}
</script>

<style lang="scss">
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
		padding-left: 20rpx;
		background: #f9f9f9;
	}

	.scanner_image {
		height: 50rpx;
		width: 50rpx;
		margin: 10rpx 10rpx;
		background: #49B2F2;
	}

	.group_title_text {
		height: 70rpx;
		flex: 1;
		line-height: 70rpx;
	}

	.cost_group {
		border-top: 1rpx solid #e8e8e8;
	}
</style>
