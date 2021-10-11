<template>
	<view>
		<view class="top db-inline-item db-space-between" >
			<view @click="$gonext('/pages/index/index?activePages=home')"><image src="../static/img/topIcon1.png" mode="" class="icon1"></image></view>
			<view class="add notranslate" v-if="address" :key="key">{{address.slice(0,4)+'....'+address.slice(-4)}}</view>
			<view class="link" v-else @click="ShowPop(maskShow)">链接钱包</view>
			<view><image src="../static/img/topIcon2.png" mode="" class="icon2" @click="gonext(right_url)"></image></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			right_url: {
				type: String
			},
			maskShow:{
				type:Boolean
			},
			trade_address:{
				type:String
			}
		},
		data() {
			return {
				show:false,
				address:'',
				key:''
			}
		},
		onShow() {},
		onLoad(op) {},
		updated(){
			
		},
		created() {
		},
		mounted() {
		},
		methods: {
			gonext(right_url){
				uni.navigateTo({
					url:right_url
				})
			},
			ShowPop(maskShow){
				this.$emit('update:maskShow',!maskShow)
			}
		},
		watch: {
             trade_address(){
				 this.address=this.trade_address
				 this.key++
				 console.log(this.trade_address,'youshuju')
			 }
		}
	}
</script>

<style lang="less" scoped>
	.top {
		padding: 30rpx;
		box-shadow:2rpx -2rpx 12rpx 2rpx rgba(29,38,54,0.1);
		.link{
			height: 62rpx;
			box-sizing: border-box;
			background-image: linear-gradient(to right,#1E78FF,#31A5FE);
			padding: 0rpx 40rpx;
			border-radius: 32rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			font-weight: bold;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.add{
			font-size: 24rpx;
			border-radius: 60rpx;
			border: 2rpx solid #222222;
			padding:12rpx 24rpx;
		}
		image{
			height: 58rpx;
		}
		.icon1{
			width: 356rpx;
		}
		.icon2{
			width: 58rpx;
		}
	}
</style>
