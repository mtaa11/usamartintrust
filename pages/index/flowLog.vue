<template>
	<view class="flowLog">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b20">流动性信托明细</view>
		<view class="dataTotal" :key="key">
			<view class="db-inline-item db-space-between margin-b12">
				<view class="font-13 color-8">锁仓总收益</view>
				<view class="font-18 color-7">{{total||0}}MTU</view>
			</view>
			<view class="db-inline-item db-space-between">
				<view class="font-13 color-8">解锁总收益</view>
				<view class="font-18 color-7">{{getnum||0}}MTU</view>
			</view>
		</view>
		<view class="tab">
			<view :class="active==0?'active':''" @click="changeActive(0)">进行中订单</view>
			<view :class="active==1?'active':''" @click="changeActive(1)">已完成订单</view>
		</view>
		<view class="dataList" v-for="(item,i) of list" v-if="item.status==active">
			<view class="db-inline-item db-space-between margin-b14">
				<view class="color-8 font-14">名称</view>
				<view>流动性信托{{item.types==1?'USDT':'MTU'}}</view>
			</view>
			<view class="db-inline-item db-space-between margin-b14">
				<view class="color-8 font-14">周期</view>
				<view>{{item.days}}天</view>
			</view>
			<view class="db-inline-item db-space-between margin-b14">
				<view class="color-8 font-14">本金</view>
				<view>{{item.num}}{{item.types==1?'USDT':'MTU'}}</view>
			</view>
			<view class="db-inline-item db-space-between margin-b14">
				<view class="color-8 font-14">算力</view>
				<view>{{item.power}}</view>
			</view>
			<view class="db-inline-item db-space-between margin-b14">
				<view class="color-8 font-14">当前收益</view>
				<view>{{item.curprofit}}</view>
			</view>
			<view class="db-inline-item db-space-between margin-b20">
				<view class="color-8 font-14">到期时间</view>
				<view>{{item.end_time}}</view>
			</view>
			<view class="db-inline-item db-space-between">
				<view class="getMore db-inline-item db-space-between" v-if="active==0&&item.is_fu">
					<view>复投中</view>
					<image src="../../static/img/next.png" mode=""></image>
				</view>
				<view class="getMore db-inline-item db-space-between" @click="sure(item)" v-if="active==0&&!item.is_fu">
					<view>自动复投</view>
					<image src="../../static/img/next.png" mode=""></image>
				</view>
				<!-- <view class="color-7" @click="sure(item)">复投</view> -->
				<view class="getMore db-inline-item db-space-between" @click="$gonext('/pages/index/index?activePages=flowLogDetail&pid='+item.id)">
					<view>查看明细</view>
					<image src="../../static/img/next.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				list:[],
				getnum:'',
				total:'',
				types:'',
				key:0
			}
		},
		created() {
			this.showdata()
		},
		methods: {
			showdata() {
				this.types=this.$route.query.types
				console.log(this.types,'LEIXING')
				if(this.$route.query.types=='USDT'){
					var types=1
				}else if(this.$route.query.types=='MTU'){
					var types=2
				}else{
					var types=0
				}
				this.$request("/index/liu/packagelog", "GET",{types:types}).then(res => {
					if (res.code == 0) {
						this.list = res.list
						this.total=res.total
						this.getnum=res.getnum
						this.key++
					}
				})
				console.log('明细', this.info)
			},
			changeActive(item){
				this.active=item
				console.log(this.list)
			},
			sure(item){
				this.$request("/index/liu/futou", "POST",{id:item.id}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
						setTimeout(()=>{
							location.reload();
						},200)	
					}
				})
			}
		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.flowLog {
		padding: 0rpx 30rpx;
		.dataTotal{
			background-image: linear-gradient(to bottom, #FEFEFF, #EEF5FF);
			box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(29, 38, 54, 0.05);
			border-radius: 32rpx;
			padding: 40rpx;
		}
		.tab{
			width: 95%;
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
		.dataList{
			box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(29, 38, 54, 0.05);
			border-radius: 32rpx;
			padding: 40rpx;
			margin-bottom: 28rpx;
			.getMore{
				width: 40%;
				background-color: #EEF5FF;
				color: #1E78FF;
				// margin: 0 auto;
				padding: 14rpx 32rpx;
				font-size: 28rpx;
				border-radius: 34rpx;
				image{
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}
</style>
