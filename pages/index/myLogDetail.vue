<template> 
	<view class="boardLog">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b28">董事会信托持仓明细</view>
		<view class="dataList">
			<view class="List">
				<view class="listTop db-flex db-space-between font-13 color-8 padding-b12">
					<view>名称</view>
					<view>收益/时间</view>
				</view>
				<view class="ListItem" v-for="(item,i) of list">
					<view class="db-flex db-space-between margin-b3">
						<view class="font-14 font-B">{{item.remark}}</view>
						<view class="font-14 font-B color-11">{{item.number}}MTU</view>
					</view>
					<view class="time font-12 color-8">
						<view>{{item.create_time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:1,
				list:[]
			}
		},
		created() {
			this.showdata()
		},
		methods: {
			showdata() {
				this.$request("/index/dong/dongdetail", "GET").then(res => {
					if (res.code == 0) {
						this.list=res.list
					}
				})
				console.log(this.list,'明细详情')
			},
		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.boardLog{
		.tab{
			width: 80%;
			margin: 44rpx auto 38rpx;
			border:2rpx solid #1E78FF;
			border-radius: 44rpx;
			display: flex;
			margin-bottom: 32rpx;
			>view{
				width: 50%;
				padding: 22rpx 72rpx;
				text-align: center;
				color: #1E78FF;
			}
			.active{
				background-color: #1E78FF;
				color: #FFFFFF;
				border-radius: 44rpx;
			}
		}
		.dataList {
           padding: 0rpx 30rpx;
		   .List{
			   border-radius: 32rpx;
			   box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(29,38,54,0.05);
			   padding: 40rpx 32rpx 0rpx;
			   &Item{
				   border-top: 2rpx solid #EEF5FF;
				   padding: 32rpx 0rpx;
				   .time{
					   width: 100%;
					   text-align: right;
				   }
			   }
		   }
		}
	}
</style>
