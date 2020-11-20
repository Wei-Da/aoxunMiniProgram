<template>
	<view class="container">
		<view class="container-body">
			<view class="date-view-dis">{{year}}-{{month}}-{{day}} {{hour}}:{{minute}}:{{second}}</view>
			<view class="date-view">
				<picker-view indicator-style="height: 80rpx;" style="width: 100%; height: 200rpx;" :value="value" @change="bindChange">
					<picker-view-column>
						<view v-for="(item, index) in dateTimeArray[0]" style="line-height: 80rpx" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view v-for="(item, index) in dateTimeArray[1]" style="line-height: 80rpx" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view v-for="(item, index) in monthDay" style="line-height: 80rpx" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>

			</view>

			<view class="date-view">
				<picker-view indicator-style="height: 80rpx;" style="width: 100%; height: 200rpx;" :value="valueHour" @change="bindChangeHour">
					<picker-view-column>
						<view v-for="(item, index) in dateTimeArray[3]" style="line-height: 80rpx" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view v-for="(item, index) in dateTimeArray[4]" style="line-height: 80rpx" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view v-for="(item, index) in dateTimeArray[5]" style="line-height: 80rpx" :key="index">{{item}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
		<view class="btn-confirm">
			<button class="btn-block btn-orange" @click="confirm">确定</button>
		</view>
	</view>
</template>

<script>
	const dateTimePicker = require('../../utils/dateTimePicker.js');
	const date = new Date()
	const mData = dateTimePicker.dateTimePicker(date.getFullYear() - 10, date.getFullYear() + 5, null)


	export default {
		data() {
			return {
				year: mData['dateTimeArray'][0][mData['dateTime'][0]],
				month: mData['dateTimeArray'][1][mData['dateTime'][1]],
				day: mData['dateTimeArray'][2][mData['dateTime'][2]],
				value: [mData['dateTime'][0], mData['dateTime'][1], mData['dateTime'][2]],
				valueHour: [mData['dateTime'][3], mData['dateTime'][4], mData['dateTime'][5]],
				hour: mData['dateTimeArray'][3][mData['dateTime'][3]],
				minute: mData['dateTimeArray'][4][mData['dateTime'][4]],
				second: mData['dateTimeArray'][5][mData['dateTime'][5]],
				dateTimeArray: mData['dateTimeArray'],
				dateTime: mData['dateTime'],
				monthDay: mData['dateTimeArray'][2]
			}
		},
		methods: {
			changeName() {
				this.name = 'mine';
			},

			bindChange(e) {
				const val = e.detail.value;
				this.year = this.dateTimeArray[0][val[0]];
				this.month = this.dateTimeArray[1][val[1]];
				this.day = this.dateTimeArray[2][val[2]];
				this.monthDay = dateTimePicker.getMonthDay(this.dateTimeArray[0][val[0]], this.dateTimeArray[1][val[1]]);
			},

			bindChangeHour(e) {
				const val = e.detail.value;
				this.hour = this.dateTimeArray[3][val[0]];
				this.minute = this.dateTimeArray[4][val[1]];
				this.second = this.dateTimeArray[5][val[2]];
			},

			confirm() {
				const month = this.month;
				const day = this.day;
				const hour = this.hour;
				const minute = this.minute;
				const second = this.second;
				const time = this.year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
				const timeType = uni.getStorageSync("timeType");
				if ("Y" == timeType) {
					uni.setStorageSync("createTime", time);
				} else {
					uni.setStorageSync("endTime", time);
				}
				uni.navigateBack({
					url: '../createService/createService?chooseTime=' + time
				})
			}
		}
	}
</script>

<style>

</style>
