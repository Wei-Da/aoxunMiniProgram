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
		<view class="shortcut-group">
			<navigator url=""></navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper: [{
					imageUrl: 'https://www.njbhhelp.com/biHuiImage/njbh_image_01.png'
				}, {
					imageUrl: 'https://www.njbhhelp.com/biHuiImage/njbh_image_02.png'
				}, {
					imageUrl: 'https://www.njbhhelp.com/biHuiImage/njbh_image_03.png'
				}]
			}
		},
		onLoad() {

		},
		methods: {

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
</style>
