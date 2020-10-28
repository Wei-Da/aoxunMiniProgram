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
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ waitAllocationAccount }}</text>
				<text class='shortcut-item-text'>待分配</text>
			</navigator>
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ waitChangeAccount }}</text>
				<text class='shortcut-item-text'>待变更</text>
			</navigator>
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ waitEvaluateAccount }}</text>
				<text class='shortcut-item-text'>待评价</text>
			</navigator>
		</view>

		<view class="shortcut" v-if="appRole == 1 || appRole == 4">
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ todayAddAccount }}</text>
				<text class='shortcut-item-text'>今日新增</text>
			</navigator>
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ waitAllocationAccount }}</text>
				<text class='shortcut-item-text'>未分配</text>
			</navigator>
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ dealingAccount }}</text>
				<text class='shortcut-item-text'>进行中</text>
			</navigator>
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ myserviceAccount }}</text>
				<text class='shortcut-item-text'>我的服务</text>
			</navigator>
		</view>

		<view class="shortcut" v-if="appRole == 2 || appRole == 5">
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ todayAddAccount }}</text>
				<text class='shortcut-item-text'>今日新增</text>
			</navigator>
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ waitConfirmAccount }}</text>
				<text class='shortcut-item-text'>待确认</text>
			</navigator>
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ waitServiceAccount }}</text>
				<text class='shortcut-item-text'>待服务</text>
			</navigator>
			<navigator class='shortcut-item' url="">
				<text class='shortcut-item-text'>{{ myserviceAccount }}</text>
				<text class='shortcut-item-text'>我的服务</text>
			</navigator>
		</view>

		<view style='height: 40rpx; width: 100%; background: #D9D9DA'></view>

		<view class="index-menu">
			<navigator class="index-menu-item" v-for="item in indexmenu" :key="item" :url="getIndexMenUrl(item)">
				<image :src="item.icon" class="index-menu-item-img" mode="aspectFit"></image>
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
		onLoad() {
			this.appRole = wx.getStorageSync('appRole')
			this.getServiceAccount(this.appRole)
			this.getDynamicMenu()
		},
		methods: {
			getIndexMenUrl(item) {
				let itemPackage = item.package;
				let itemUrl = item.url;
				itemPackage ? `${itemPackage}/${itemUrl}/${itemUrl}` : `${itemUrl}/${itemUrl}`;
			},
			getDynamicMenu() {
				this.$request({
					url: serviceCode["GET_DYNAMIC_MENU"],
					method: "POST",
					data: {
						"rid": wx.getStorageSync('userInfo').appRole
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
		height: 454rpx;

		.swiper {
			width: 100%;
			height: 454rpx;

			.img {
				width: 100%;
				height: 454rpx;
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
	
	.index-menu {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		&-item {
			width: 25%;
			text-align: center;
			&-img {
				width: 110rpx;
				height: 110rpx;
			}
		}
	}
</style>
