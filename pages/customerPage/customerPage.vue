<template>
	<view class="content">
		<view class="banner">
			<swiper class="swiper" :autoplay="true" :indicator-dots="true" indicator-active-color="#FFFFFF" indicator-color="rgba(255,255,255, .5)"
			 duration="400" :circular="true">
				<swiper-item class="swiper-item" v-for="(item, index) in swiper" :key="index">
					<view class="item">
						<image :src="item.imageUrl" class="img"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="shortcut" v-if="appRole == 3">
			<navigator class='shortcut-item' url="../../components/serviceList/serviceList?url=TABLE_QUERY_SERVICE&title=服务分配">
				<text class='shortcut-item-text'>{{ waitAllocationAccount }}</text>
				<text class='shortcut-item-text'>待分配</text>
			</navigator>
			<navigator class='shortcut-item' url="../../components/serviceList/serviceList?url=WAIT_SERVICE_CHANGE&title=变更审核&changeInfo=true">
				<text class='shortcut-item-text'>{{ waitChangeAccount }}</text>
				<text class='shortcut-item-text'>待变更</text>
			</navigator>
			<navigator class='shortcut-item' url="../../components/serviceList/serviceList?url=SERVICE_CLOSE_QUERY&title=服务评价">
				<text class='shortcut-item-text'>{{ waitEvaluateAccount }}</text>
				<text class='shortcut-item-text'>待评价</text>
			</navigator>
		</view>

		<view class="shortcut" v-if="appRole == 1 || appRole == 4">
			<navigator class='shortcut-item' url="../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&title=今日新增&faultInfo=sysuserid&type=4&isNeedSearch=false">
				<text class='shortcut-item-text'>{{ todayAddAccount }}</text>
				<text class='shortcut-item-text'>今日新增</text>
			</navigator>
			<navigator class='shortcut-item' url="../../components/serviceList/serviceList?url=TABLE_QUERY_SERVICE&title=未分配&faultInfo=sysuserid">
				<text class='shortcut-item-text'>{{ waitAllocationAccount }}</text>
				<text class='shortcut-item-text'>未分配</text>
			</navigator>
			<navigator class='shortcut-item' url="../../components/serviceList/serviceList?url=SERVICE_DEALING&title=进行中&faultInfo=sysuserid&type=1">
				<text class='shortcut-item-text'>{{ dealingAccount }}</text>
				<text class='shortcut-item-text'>进行中</text>
			</navigator>
			<navigator class='shortcut-item' url="../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&title=我的服务&faultInfo=sysuserid&type=7">
				<text class='shortcut-item-text'>{{ myserviceAccount }}</text>
				<text class='shortcut-item-text'>我的服务</text>
			</navigator>
		</view>

		<view class="shortcut" v-if="appRole == 2 || appRole == 5">
			<navigator class='shortcut-item' url='../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&title=今日新增&faultInfo=personid&type=1&isNeedSearch=false'>
				<text class='shortcut-item-text'>{{ todayAddAccount }}</text>
				<text class='shortcut-item-text'>今日新增</text>
			</navigator>
			<navigator class='shortcut-item' url="../../components/serviceList/serviceList?url=WAIT_CONFIRM&title=待确认&faultInfo=personid">
				<text class='shortcut-item-text'>{{ waitConfirmAccount }}</text>
				<text class='shortcut-item-text'>待确认</text>
			</navigator>
			<navigator class='shortcut-item' url="../../components/serviceList/serviceList?url=GET_WAIT_SERVICE&title=待服务&faultInfo=personid">
				<text class='shortcut-item-text'>{{ waitServiceAccount }}</text>
				<text class='shortcut-item-text'>待服务</text>
			</navigator>
			<navigator class='shortcut-item' url='../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&title=我的服务&faultInfo=personid&type=10'>
				<text class='shortcut-item-text'>{{ myserviceAccount }}</text>
				<text class='shortcut-item-text'>我的服务</text>
			</navigator>
		</view>

		<view class="middleView"></view>

		<view class="index-menu">
			<navigator class="index-menu-item" v-for="item in indexmenu" :key="item" :url="getIndexMenUrl(item)">
				<image :src="getMenuImg(item.icon)" class="index-menu-item-img" mode="aspectFit"></image>
				<text class="index-menu-item-text">{{ item.text }}</text>
			</navigator>
			<navigator class="index-menu-item">
				<image src="../../static/images/menu18.png" class="index-menu-item-img" mode="aspectFit"></image>
				<text class="index-menu-item-text">在线咨询</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import serviceCode from '@/apis/index.js';
	export default {
		data() {
			return {
				swiper: [{
					imageUrl: 'https://www.njbhhelp.com/biHuiImage/njbh_image_01.png'
				}, {
					imageUrl: 'https://www.njbhhelp.com/biHuiImage/njbh_image_02.png'
				}, {
					imageUrl: 'https://www.njbhhelp.com/biHuiImage/njbh_image_03.png'
				}],
				appRole: '',
				waitAllocationAccount: '',
				waitChangeAccount: '',
				waitEvaluateAccount: '',
				todayAddAccount: '',
				dealingAccount: '',
				myserviceAccount: '',
				waitConfirmAccount: '',
				waitServiceAccount: '',
				indexmenu: []
			}
		},
		onShow() {
			this.appRole = uni.getStorageSync('appRole')
			this.getServiceAccount(this.appRole)
			this.getDynamicMenu()
		},
		methods: {
			getMenuImg(imgUrl) {
				const url = imgUrl.split('./../..')
				return '../../static' + url[1]
			},
			getIndexMenUrl(item) {
				let itemPackage = item.package;
				let itemUrl = item.url;
				switch(itemUrl) {
					// serviceCompany 目录下
					// 我要保修
					case 'mineCreateService':
						return ''
					break;
					// 我的服务
					case 'myService':
						return `../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&faultInfo=personid&type=10&title=${item.text}`;
					break;
					// 历史记录
					case 'serviceHistoryRecord':
						return `../../components/serviceList/serviceList?url=HISTORY_RECORD&faultInfo=personid&title=${item.text}`;
					break;
					// 知识帮助
					case 'libSearch':
						return '../searchPage/searchPage'
					break;
					case 'companyRecord':
						return `../../components/serviceList/serviceList?url=HISTORY_RECORD&faultInfo=original&title=${item.text}`;
					break;
					case 'serviceTodayAdd':
						return `../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&faultInfo=personid&type=1&title=${item.text}`;
					break;
					// customerService 目录下
					case 'customerCompanyRecord':
						return `../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&faultInfo=companyid&type=5&title=${item.text}`;
					break;
					case 'customerDealingService':
						return `../../components/serviceList/serviceList?url=SERVICE_DEALING&faultInfo=sysuserid&type=1&title=${item.text}`;
					break;
					case 'customerServiceClose':
						return `../../components/serviceList/serviceList?url=SERVICE_CLOSE_QUERY&faultInfo=sysuserid&title=${item.text}`;
					break;
					case 'customerTodayAdd':
						return `../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&faultInfo=sysuserid&title=${item.text}`;
					break;
					case 'customerWaitAllocation':
						return `../../components/serviceList/serviceList?url=TABLE_QUERY_SERVICE&faultInfo=sysuserid&title=${item.text}`;
					break;
					case 'faultRecord':
						return `../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&faultInfo=sysuserid&title=${item.text}`;
					break;
					case 'repairRecord':
						return `../../components/serviceList/serviceList?url=HISTORY_RECORD&faultInfo=personid&title=${item.text}`;
					break;
					// 待确认
					case 'waitConfirm':
						return `../../components/serviceList/serviceList?url=WAIT_CONFIRM&faultInfo=personid&title=${item.text}`;
					break;
					// 待服务
					case 'waitService':
						return `../../components/serviceList/serviceList?url=GET_WAIT_SERVICE&faultInfo=personid&title=${item.text}`;
					break;
					// serviceTable 目录下
					case 'serviceChange':
						return `../../components/serviceList/serviceList?url=WAIT_SERVICE_CHANGE&changeInfo=true&title=${item.text}`;
					break;
					case 'serviceFile':
						return `../../components/serviceList/serviceList?url=GET_SERVICE_FILE&title=${item.text}`;
					break;
					case 'serviceQuery':
						return `../../components/serviceList/serviceList?url=ENGINEER_HISTORY_RECORD&title=${item.text}`;
					break;
					case 'serviceRecord':
						return `../../components/serviceList/serviceList?url=TABLE_QUERY_SERVICE&title=${item.text}`;
					break;
					case 'serviceSelfHelp':
						return `../../components/serviceList/serviceList?url=TABLE_QUERY_SERVICE&title=${item.text}`;
					break;
					case 'serviceTableClose':
						return `../../components/serviceList/serviceList?url=SERVICE_CLOSE_QUERY&title=${item.text}`;
					break;
					case 'serviceTableDeal':
						return `../../components/serviceList/serviceList?url=DEAL_SERVICE&title=${item.text}`;
					break;
				}
			},
			getDynamicMenu() {
				this.$request({
					url: serviceCode["GET_DYNAMIC_MENU"],
					method: "POST",
					data: {
						"rid": uni.getStorageSync('userInfo').appRole
					},
					success: (res) => {
						let temMenu = [];
						for (let i = 0; i < res.info.length; i++) {
							temMenu[i] = {
								icon: res.info[i].icon,
								text: res.info[i].name,
								package: res.info[i].pkg,
								url: res.info[i].path
							};
						}
						this.indexmenu = temMenu;
					}
				})
			},
			getServiceAccount(appRole) {
				if (appRole == '3') {
					this.$request({
						url: serviceCode['SERVICE_TABLE_ACCOUNT'],
						method: "POST",
						success: (res) => {
							this.waitAllocationAccount = res.info[0].receptionWaitDistribution;
							this.waitChangeAccount = res.info[0].receptionWaitChange;
							this.waitEvaluateAccount = res.info[0].receptionWaitCheck;
						},
						onError: () => {
							this.waitAllocationAccount = '--';
							this.waitChangeAccount = '--';
							this.waitEvaluateAccount = '--';
						}
					})
				}

				if (appRole == '1' || appRole == '4') {
					let params = {}
					params['faultInfo.sysuserid'] = uni.getStorageSync('userInfo').id;
					params['faultInfo.companyid'] = uni.getStorageSync('userInfo').companyId;
					this.$request({
						url: serviceCode['SERVICE_ACCOUNT_CUSTOMER'],
						method: "POST",
						data: params,
						success: (res) => {
							this.waitAllocationAccount = res.info[0].waitDistribution;
							this.todayAddAccount = res.info[0].todayAdd;
							this.dealingAccount = res.info[0].doing;
							this.myserviceAccount = res.info[0].repair;
						},
						onError: () => {
							this.waitAllocationAccount = '--';
							this.todayAddAccount = '--';
							this.dealingAccount = '--';
							this.myserviceAccount = '--';
						}
					})
				}

				if (appRole == '2' || appRole == '5') {
					let params = {}
					params['faultInfo.sysuserid'] = uni.getStorageSync('userInfo').id;
					params['faultInfo.personid'] = uni.getStorageSync('userInfo').id
					this.$request({
						url: serviceCode['SERVICE_ACCOUNT'],
						method: "POST",
						data: params,
						success: (res) => {
							this.waitConfirmAccount = res.info[0].waitHandle;
							this.waitServiceAccount = res.info[0].waitService;
							this.myserviceAccount = res.info[0].myRepair;
							this.todayAddAccount = res.info[0].todayAdd;
						},
						onError: () => {
							this.waitConfirmAccount = '--';
							this.waitServiceAccount = '--';
							this.myserviceAccount = '--';
							this.todayAddAccount = '--';
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;
		height: 460rpx;

		.swiper {
			width: 100%;
			height: 460rpx;

			.img {
				width: 100%;
				height: 460rpx;
			}
		}
	}

	.shortcut {
		display: flex;
		width: 100%;
		height: 120rpx;
		margin: 10rpx 0;

		&-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex: 1;
			text-align: center;
			border-right: 2rpx solid #d9d9da;

			&:last-child {
				border-right: none;
			}

			&-text {
				display: block;

				&:first-child {
					padding-bottom: 10rpx;
				}
			}
		}
	}
	
	.middleView {
		height: 40rpx; 
		width: 100%; 
		background: #D9D9DA
	}
	
	.index-menu {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 452rpx;
		&-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 25%;
			height: 50%;
			text-align: center;
			box-sizing: border-box;
			&-img {
				display: block;
				width: 110rpx;
				height: 110rpx;
				padding-bottom: 20rpx;
			}
			&-text {
				display: block;
				font-size: 30rpx;
				line-height: 1.4;
				white-space: nowrap;
			}
		}
	}
</style>
