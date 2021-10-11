<template>
	<view class="flow">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b20">已借贷订单({{type==1?'MTU':'USDT'}})</view>
		<view class="center padding-r6 padding-l6">
			<view class="package margin-b14" :class="type==2?'package2':''">
				<view class="packageTitle font-18 font-B margin-b14 db-flex">
					<view class="state state1">进行中</view>
					<view>借贷记录</view>
				</view>
				<view class="packageCenter">
					<view v-if="!going">暂无数据</view>
					<view class="dataList" v-else :key="key">
						<view class="dataListItem db-flex db-space-between" v-for="(item,i) of going">
							<view class="db-flex">
								<view>
									<image src="../../static/img/loanIcon.png" mode="" v-if="item.types==1"></image>
									<image src="../../static/img/loan1.png" mode="" v-else></image>
								</view>
								<view class="font-B">{{item.types==1?'MTU/USDT':'USDT/MTU'}}</view>
							</view>
							<view class="db-flex" @click="showPop(item)">
								<view class="color-7">{{item.number}}</view>
								<view><image src="../../static/img/next.png" mode=""></image></view>
							</view>
						</view>
						<view class="font-c color-7" v-if="goingList.length>5" @click="getMore(1)">加载更多&nbsp;&nbsp;&nbsp;>></view>
					</view>
				</view>
			</view>
			<view class="package" :class="type==2?'package2':''">
				<view class="packageTitle font-18 font-B margin-b14 db-flex">
					<view class="state state2">已完结</view>
					<view>借贷记录</view>
				</view>
				<view class="packageCenter">
					<view v-if="!end">暂无数据</view>
					<view class="dataList" v-else :key="key">
						<view class="dataListItem db-flex db-space-between" v-for="(item,i) of end">
							<view class="db-flex">
								<view>
									<image src="../../static/img/loanIcon.png" mode="" v-if="item.types==1"></image>
									<image src="../../static/img/loan1.png" mode="" v-else></image>
								</view>
								<view class="font-B">{{item.types==1?'MTU/USDT':'USDT/MTU'}}</view>
							</view>
							<view class="db-flex">
								<view class="color-7">{{item.number}}</view>
								<view><image src="../../static/img/next.png" mode=""></image></view>
							</view>
						</view>
						<view class="font-c color-7" v-if="endList.length>5" @click="getMore(2)">加载更多&nbsp;&nbsp;&nbsp;>></view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="Show" mode="center" border-radius="16" width="90%">
			<view class="content">
		        <view class="title db-flex db-space-between">
					<image src="/static/img/loan1.png" mode=""></image>
					<view>确认支付</view>
					<image src="/static/img/close2.png" mode="" @click="close"></image>
				</view>
				<view class="data">
					<view class="color-8 font-13 margin-b12">借贷明细</view>
					<view class="dataList">
						<view class="db-flex db-space-between">
							<view class="font-13">借款利用率</view>
							<view>{{order.use_rate}}%</view>
						</view>
						<view class="db-flex db-space-between">
							<view class="font-13">借款金额</view>
							<view>{{order.getnum}}{{order.types==1?'USDT':'MTU'}}</view>
						</view>
						<view class="db-flex db-space-between">
							<view class="font-13">固定借款APY</view>
							<view>{{order.apy}}%</view>
						</view>
						<view class="db-flex db-space-between">
							<view class="font-13">还款本金</view>
							<view>{{order.getnum}}{{order.types==1?'USDT':'MTU'}}</view>
						</view>
						<view class="db-flex db-space-between">
							<view class="font-13">利息费</view>
							<view>{{order.rates}}USDT</view>
						</view>
						<view class="db-flex db-space-between">
							<view class="font-13">借贷周期</view>
							<view>{{order.days}}</view>
						</view>
						<view class="db-flex db-space-between">
							<view class="font-13">还款时间</view>
							<view>{{order.end_time}}</view>
						</view>
					</view>
					<view class="btn margin-t24" @click="sure">还清款项</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{},
				type:'',
				Show:false,
				order:{},
				id:'',
				going:[],
				goingList:[],
				end:[],
				endList:[],
				key:0
			}
		},
		created() {
			this.showdata()
		},
		methods: {
			showdata() {
				this.type=this.$route.query.type
				this.$request("/index/bollow/loadlist", "POST",{types:this.type}).then(res => {
					if (res.code == 0) {
						this.info=res
						this.goingList=res.going
						this.endList=res.end
						if(res.going.length>5){
							for(var i=0;i<5;i++){
								this.going.push(res.going[i])
							}
						}else{
							this.going=res.going
						}
						if(res.end.length>5){
							for(var i=0;i<5;i++){
								this.end.push(res.end[i])
							}
						}else{
							this.end=res.end
						}
						
					}
				})
				console.log('借记录', this.info)
			},
			getMore(type){
				if(type==1){
					this.going=this.goingList
					this.goingList=[]
				}else{
					this.end=this.endList
					this.endList=[]
				}
				this.key++
			},
			showPop(item){
				this.id=item.id
				this.$request("/index/bollow/loaddetail", "POST",{id:this.id}).then(res => {
					if (res.code == 0) {
						this.order=res.list
						this.Show=true
						console.log(res)
					}
				})
			},
			close(){
				this.Show=false
			},
			sure(){
				this.$request("/index/bollow/backnum", "POST",{id:this.id}).then(res => {
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if (res.code == 0) {
						this.Show=false
						this.showdata()
					}
				})
			}
		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.flow {
        padding-bottom: 40rpx;
		.package {
			background-image: url(../../static/img/teamBg2.png);
			background-repeat: no-repeat;
			background-size: 100%;
			padding: 44rpx 26rpx 0rpx;
            .state{
            	font-size: 24rpx;
            	color: #FFFFFF;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 6rpx 22rpx 6rpx 16rpx;
				margin-right: 20rpx;
				border-radius: 0rpx 24rpx 24rpx 0rpx;
            }
			.state1{
				background-image: linear-gradient(to right, #1E78FF, #31A5FE);
			}
			.state2{
				background-image: linear-gradient(to right, #FCA15A, #FF5E5E);
			}
			.packageCenter {
				background-color: #FFFFFF;
				box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(29, 38, 54, 0.05);
				border-radius: 12rpx;
				padding: 48rpx 32rpx;
               .dataListItem{
				   padding: 40rpx 0rpx;
				   border-bottom: 2rpx solid #EEF5FF;
				   image{
					   width: 44rpx;
					   height: 44rpx;
					   margin-right: 20rpx;
				   }
			   }
			}
		}
		.package2{
			background-image: url(../../static/img/teamBg3.png);
		}
		.content {
		
			.title {
				background-image: linear-gradient(to right, #1E78FF, #31A5FE);
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
				color: #FFFFFF;
				padding: 32rpx 40rpx;
		
				image {
					width: 56rpx;
					height: 56rpx;
				}
			}
		
			.data {
				padding: 40rpx;
				.num{
					border: 1px solid #CCCCCC;
					border-radius: 16rpx;
					.number{
						padding: 46rpx 40rpx;
					}
					.max{
						width: 30%;
						text-align: center;
						box-sizing: border-box;
						border-left: 2rpx solid #CCCCCC;
						background-color: #F5F9FF;
						padding: 46rpx 26rpx;
					}
				}
				&List{
					background-color: #F5F9FF;
					padding: 0rpx 28rpx;
					>view{
						padding: 24rpx 0rpx;
						border-bottom: 1px solid #EEF5FF;
						font-size: 30rpx;
					}
				}
				.btn {
					width: 100%;
					text-align: center;
					border-radius: 16rpx;
					font-size: 36rpx;
					font-weight: bolder;
					padding: 24rpx 0rpx;
					background-image: linear-gradient(to right, #1E78FF, #31A5FE);
					color: #FFFFFF;
				}
			}
		
		}
	}
</style>
