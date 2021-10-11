<template>
	<view>
		<view class="box-top"  v-for="(item,index) in dataArray" :key="index">
			<view class="left-box-top">{{item.time}}</view> <!-- 左边 -->
			
			<view class="line" :class="{active:item.active,none:index==(dataArray.length-1)}"><!-- 中线 -->
				<view class="dot" :class="{active:item.active}"></view> <!-- 圆点 -->
			</view>
			
			<view class="right-box-top"> <!-- 右边 -->
				<view>{{item.title}}</view>
				<view>{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataArray:{
				type:Array
			}
		},
		data() {
			return {
			}
		},
		mounted(){
		},
		methods: {
		}
	}
</script>

<style scoped="scoped" lang="less">
.box-top{
	width: 100%;
	min-height: 120rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	.left-box-top{
		width: 180rpx;
		text-align: center;
		color: #222222;
		font-size: 20rpx;
	}
	.line{
		width: 4rpx;	
		background-color: #1E78FF;
		margin: 0 35rpx 0 20rpx;
		.dot{
			width: 20rpx;
			height: 20rpx;
			background-color: #1E78FF;
			border: 1px solid #1E78FF !important;
			border-radius: 50%;
			position: relative;
			left: -10rpx;
		}
	}
	.right-box-top{
		flex: 1;
		padding: 0 0 20rpx 0;
	}
}
//激活元素
.active{
}
// 隐藏元素
.none{
	background-color: rgba(0,0,0,0) !important;
}
</style>
 
