<template> 
	<view class="boardLog">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b28">升级记录</view>
		<view class="dataList">
			<view class="List">
				<view class="listTop db-flex db-space-between font-13 color-8 padding-b12">
					<view>当前等级/升级前等级</view>
					<view>金额/时间</view>
				</view>
				<view class="ListItem" v-for="(item,i) of list">
					<view class="db-flex db-space-between margin-b3">
						<view class="font-14 font-B">LV{{item.lid}}</view>
						<view class="font-14 font-B color-12">{{item.usdt}}USDT</view>
					</view>
					<view class="db-flex db-space-between font-12 color-8">
						<view>升级前:LV{{item.frontid}}</view>
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
				list:{}
			}
		},
		created() {
			this.showdata()
		},
		methods: {
			showdata() {
				this.$request("/index/dong/uplevellog", "GET").then(res => {
					if (res.code == 0) {
						this.list=res.list
					}
				})
				console.log('董记录')
			},
		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.boardLog{
		.dataList {
           padding: 0rpx 30rpx;
		   .List{
			   border-radius: 32rpx;
			   box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(29,38,54,0.05);
			   padding: 40rpx 32rpx 0rpx;
			   &Item{
				   border-top: 2rpx solid #EEF5FF;
				   padding: 32rpx 0rpx;
			   }
		   }
		}
	}
</style>
