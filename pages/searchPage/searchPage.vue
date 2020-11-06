<template>
	<view class="container">
		<view class="seach-view">
			<u-search placeholder="请输入搜索内容" v-model="keyword"></u-search>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				inputStyle: {
					width: '80%'
				}
			};
		}
	}
</script>

<style lang="scss">
	.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100rpx;
    background-color: #49b2f2;
		.seach-view {
			width: 95%;
		}
	}
</style>
