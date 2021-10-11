<template>
	<view class="airdrop">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b30">空投奖励</view>
        <view class="data db-inline-item db-space-between">
        	<view class="db-inline-item">
        		<image src="../../static/img/airdropIcon1.png" mode=""></image>
        		<view>
        			<view class="font-15 font-B margin-b5">流动性信托奖励</view>
        			<view class="font-13 color-17 margin-b5">奖励总额：{{info.total}}USDT</view>
					<view class="font-13 color-7 margin-b5">待领取：{{info.daiget||0}}USDT</view>
        			<view class="font-13 color-7 margin-b5">已领取：{{info.getnum}}USDT</view>
        		</view>
        	</view>
        	<view class="btn" @click="sure">领取</view>
        </view>
		<view class="dataList">
			<view class="color-8 font-12 margin-b6">完成进度</view>
			<view class="font-15 color-7 margin-b12">USDT区</view>
			<view class="dataListItem db-inline-item db-space-between" v-for="(item,i) of info.usdt">
				<view>流动性信托{{item.num}}USDT</view>
				<view>({{item.havenum+'/'+info.times}})</view>
			</view>
			<view class="font-15 color-7 margin-b12">MTU区</view>
			<view class="dataListItem db-inline-item db-space-between" v-for="(item,i) of info.mtu">
				<view>流动性信托{{item.num}}USDT</view>
				<view>({{item.havenum+'/'+info.times}})</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
			}
		},
		created() {
			this.showdata()
		},
		methods: {
			showdata() {
				this.$request("/index/liu/airdrop", "GET").then(res => {
					if (res.code == 0) {
						this.info=res
					}
				})
				console.log('空投', this.info)
			},
			sure(){
				this.$request("/index/liu/getairdrop", "GET").then(res => {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
					if (res.code == 0) {
						this.showdata()
					}
				})
			}
		},
		computed: {}
	}
</script>

<style lang="less" scoped>
	.airdrop{
		padding:0rpx 36rpx 60rpx;
		.data{
			box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(29, 38, 54, 0.05);
			border-radius: 32rpx;
			padding: 30rpx 40rpx;
			image{
				width: 72rpx;
				height: 72rpx;
				margin-right: 28rpx;
			}
			.btn{
				background-image: linear-gradient(to right, #1E78FF, #31A5FE);
				font-size: 28rpx;
				color: #FFFFFF;
				border-radius: 28rpx;
				padding: 8rpx 36rpx;
			}
		}
		.dataList{
			margin: 0rpx 26rpx;
			padding:20rpx 32rpx;
			background-color: #EEF5FF;
			border-radius: 0rpx 0rpx 16rpx 16rpx;
			&Item{
				border-top: 2rpx solid #DEEAFF;
				padding: 32rpx 0rpx;
			}
		}
	}
</style>
