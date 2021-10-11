<template> 
	<view class="boardLog">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b28">资产明细</view>
		<view class="tab">
			<view :class="active==1?'active':''" @click="changeActive(1)">USDT资产</view>
			<view :class="active==2?'active':''" @click="changeActive(2)">MTU资产</view>
		</view>
		<view class="dataList">
			<view class="List">
				<view class="listTop db-flex db-space-between font-13 color-8 padding-b12">
					<view>地址/手续费</view>
					<view>数量/时间</view>
				</view>
				<view class="ListItem" v-for="(item,i) of list">
					<view class="db-flex db-space-between margin-b3">
						<view class="font-14 font-B">{{item.remark}}</view>
						<view class="font-14 font-B" :class="item.status==1?'color-12':'color-7'">{{item.status==1?'+':'-'}}{{item.number}}{{active==1?'USDT':'MTU'}}</view>
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
			changeActive(item){
				this.active=item
				this.list=[]
				this.showdata()
			},
			showdata() {
				this.$request("/index/mywallet/walletlog", "POST",{money_types:this.active}).then(res => {
					if (res.code == 200) {
						this.list=res.info
					}
				})
				console.log(this.list,'资产记录')
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
