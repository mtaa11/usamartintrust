<template> 
	<view class="walletLog">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b28">提币记录</view>
		<view class="dataList">
			<view class="List">
				<view class="listTop db-flex db-space-between font-13 color-8 padding-b12">
					<view>来源</view>
					<view>金额/时间</view>
				</view>
				<view class="ListItem" v-for="(item,i) of List">
					<view class="db-flex db-space-between margin-b3">
						<view class="font-14 font-B">{{item.address.slice(0,6)+'...'+item.address.slice(-6)}}</view>
						<view class="font-14 font-B color-11">{{item.num}}{{item.money_types==1?'USDT':'MTU'}}</view>
					</view>
					<view class="db-flex db-space-between time font-12 color-8">
						<view>手续费：{{item.ratio}}{{item.money_types==1?'USDT':'MTU'}}</view>
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
			changeActive(item){
				this.active=item
				this.showdata()
			},
			showdata() {
				this.$request("/index/mywallet/rechargeLog", "POST",{money_types:this.active}).then(res => {
					if (res.code == 200) {
						this.list=res.info
					}
				})
				console.log(this.list,'提币记录')
			},
		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.walletLog{
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
