<template>
	<view class="flow">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b20">流动性信托</view>
		<view class="font-c font-B font-18 margin-b20">当前市场规模</view>
		<view class="header_title font-c margin-b30">
			<text v-if="info.current">${{info.current}}</text>
		</view>
		<view class="center padding-r6 padding-l6">
			<view class="receive">
				<view>
					<view class="color-13 font-18 margin-b3">注册赠送10000USDT</view>
					<view class="color-14 font-13">待领取{{info.daiget||0}}USDT</view>
				</view>
				<view class="btn" @click="$gonext('/pages/index/index?activePages=airdrop')">进入</view>
			</view>
			<view class="package margin-b14" v-for="(item,i) of info.info">
				<view class="packageTitle font-18 padding-l20 font-B margin-b14">流动性信托(质押{{item.type}})</view>
				<view class="packageCenter">
					<view class="db-flex db-space-between margin-b20">
						<view class="icon">{{item.power}}X算力</view>
						<view class="icon2" @click="$gonext('/pages/index/index?activePages=flowLog&types='+item.type)">持仓明细</view>
					</view>
					<view class="db-flex db-space-between margin-b5 font-13 color-8">
						<view>质押</view>
						<view>合约周期</view>
					</view>
					<view class="db-flex db-space-between margin-b5 font-13 margin-b40">
						<view class="font-B">
							<text class="font-22">{{item.minnum}}</text>
							<text class="font-14">USDT</text>
							<text class="font-22">~{{item.maxnum}}</text>
							<text class="font-14">USDT</text>
						</view>
						<view class="color-15 font-B font-22">{{item.days}}天</view>
					</view>
					<view class="btn" @click="buy(item)">购买</view>
				</view>
			</view>
		</view>
		<u-popup v-model="Show" mode="center" border-radius="16" width="90%">
			<view class="content">
				<view class="title">
					<view>确认支付</view>
					<view class="close" @click="close">
						<image src="/static/img/close2.png" mode=""></image>
					</view>
				</view>
				<view class="data">
					<view class="dataTypeTitle color-8 margin-b14">选择信托套餐</view>
					<view class="dataTypeList">
						<view class="dataTypeListItem" :class="item.id==form.pid?'active':''" v-for="(item,i) of money"
							@click="change(item)">{{item.num}}</view>
					</view>
					<view class="font-12 color-18 margin-b24">注：解锁需要等待7日，7日内每天有收益MTU，7日后结算可提现。</view>
					<view class="db-flex db-space-between color-7 margin-b20" v-if="form.payway==1">
						<view>余额可用</view>
						<view v-if="type=='USDT'">{{mydata.usdt}}USDT</view>
						<view v-else>{{mydata.mtu}}MTU</view>
					</view>
					<view class="db-flex db-space-between color-7 margin-b20" v-if="type=='MTU'" :key="key">
						<view>需支付</view>
						<view>{{need}}MTU</view>
					</view>
					<view class="dataTypeTitle color-8 margin-b14">选择支付方式</view>
					<view class="dataTypeList2 margin-b28">
						<view class="dataTypeListItem margin-r10" :class="item.id==form.payway?'active':''"
							v-for="(item,i) of way" @click="form.payway=item.id">{{item.name}}</view>
					</view>
					<view class="btn btn1 margin-b12" @click="sure">确认</view>
					<view class="btn btn2">{{power}}X算力</view>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="modalShow" :content="content" @confirm="confirm" :show-cancel-button="true" @cancel="modalShow=false"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				Show: false,
				form: {
					payway: 1,
					pid: ''
				},
				money: [],
				way: [{
					id: '1',
					name: '余额'
				}, {
					id: '2',
					name: '钱包'
				}],
				power: '',
				mydata: '',
				type:'',
				getconfig:{},
				modalShow:false,
				content: '支付提示',
				number:'',
				need:'',
				key:0
			}
		},
		created() {
			this.showdata()
			this.$request('/index/member/index', 'GET').then(res => {
				if (res.code == 200) {
					this.mydata = res.info;
				}
			});
			this.$request('/index/publics/getconfig', 'GET').then(res => {
				if (res.code == 200) {
					this.getconfig = res.info;
				}
			});
		},
		methods: {
			changeActive(active) {
				this.$emit('update:activePages', active)
			},
			showdata() {
				this.$request("/index/liu/packagelist", "GET").then(res => {
					if (res.code == 0) {
						this.info = res
					}
				})
				console.log('流', this.info)
			},
			close(){
				this.Show=false
				this.power='',
				this.form.payway=1
				this.form.pid=''
				this.way=[{
					id: '1',
					name: '余额'
				}, {
					id: '2',
					name: '钱包'
				}]
			},
			buy(item) {
				this.Show = true
				this.money = item.child
				this.form.pid = item.child[0].id
				this.number=item.child[0].num
				this.power = item.power
				this.type=item.type
				if(item.type=='MTU'){
					this.way=[{
						id: '1',
						name: '余额'
					}]
				}else{
					this.way=[{
						id: '1',
						name: '余额'
					}, {
						id: '2',
						name: '钱包'
					}]
				}
				console.log(item, this.pid)
			},
			change(item){
				this.form.pid=item.id
				this.power=item.power
				this.number=item.num
				console.log(item)
			},
			sure() {
				this.modalShow=true
			},
			confirm(){
				this.$request("/index/liu/buypackage", "POST", this.form).then(res => {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
					if (res.code == 0) {
						this.Show=false
						console.log(res)
					}
				})
			}
		},
		computed: {

		},
		watch:{
			number(){
				this.need=(this.number/this.getconfig.usdt_to_mtu).toFixed(4)
				this.key++
				console.log(this.need)
			}
		}
	}
</script>

<style lang="less" scoped>
	.flow {
		position: relative;

		.more {
			position: absolute;
			top: -20rpx;
			right: 28rpx;
			width: 56rpx;
			height: 56rpx;
		}

		.header_title {
			text {
				background-image: linear-gradient(135deg, #1E78FF, #AB19FF);
				font-size: 64rpx;
				font-weight: bold;
				-webkit-background-clip: text;
				-moz-background-clip: text;
				background-clip: text;
				box-decoration-break: clone;
				-webkit-box-decoration-break: clone;
				-moz-box-decoration-break: clone;
				color: transparent;
			}
		}

		.receive {
			background-image: url(../../static/img/flowBg1.png);
			background-size: 100% 100%;
			padding: 40rpx 50rpx;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			align-items: center;

			.btn {
				background-color: #FFFFFF;
				color: #1E78FF;
				padding: 8rpx 42rpx;
				border-radius: 28rpx;
				font-size: 28rpx;
			}
		}

		.package {
			background-image: url(../../static/img/flowBg2.png);
			background-size: 100%;
			background-repeat: no-repeat;
			padding: 44rpx 26rpx 0rpx;

			&Center {
				background-color: #FFFFFF;
				box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(29, 38, 54, 0.05);
				border-radius: 12rpx;
				padding: 48rpx 32rpx;

				.icon {
					padding: 4rpx 20rpx;
					background-image: linear-gradient(to right, #FF8868, #FF3493);
					border-radius: 22rpx;
					font-size: 28rpx;
					color: #FFFFFF;
				}

				.icon2 {
					padding: 8rpx 20rpx;
					background-color: #C1D9FC;
					border-radius: 22rpx;
					font-size: 28rpx;
					color: #1E78FF;
				}

				.btn {
					width: 100%;
					padding: 22rpx 0rpx;
					text-align: center;
					border-radius: 16rpx;
					color: #FFFFFF;
					background-image: linear-gradient(90deg, #1E78FF, #31A5FE);
					margin-top: 90rpx;
				}
			}
		}

		.content {

			.title {
				background-image: linear-gradient(to right, #1E78FF, #31A5FE);
				font-size: 32rpx;
				font-weight: bold;
				text-align: center;
				position: relative;
				color: #FFFFFF;
				padding: 32rpx 0rpx;

				.close {
					image {
						width: 56rpx;
						height: 56rpx;
						position: absolute;
						top: 26rpx;
						right: 32rpx;
					}
				}
			}

			.data {
				padding: 40rpx;

				.dataTypeList {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					&Item {
						width: 32%;
						text-align: center;
						background-color: #EEF5FF;
						color: #1E78FF;
						border-radius: 16rpx;
						padding: 22rpx 0rpx;
						margin-bottom: 16rpx;
					}

					.active {
						background-image: linear-gradient(to right, #1E78FF, #31A5FE);
						color: #FFFFFF;
					}
				}

				.dataTypeList2 {
					display: flex;
					flex-wrap: wrap;

					&Item {
						width: 32%;
						text-align: center;
						background-color: #EEF5FF;
						color: #1E78FF;
						border-radius: 16rpx;
						padding: 22rpx 0rpx;
						margin-bottom: 16rpx;
					}

					.active {
						background-image: linear-gradient(to right, #1E78FF, #31A5FE);
						color: #FFFFFF;
					}
				}

				.btn {
					width: 100%;
					text-align: center;
					border-radius: 16rpx;
					font-size: 36rpx;
					font-weight: bolder;
					padding: 24rpx 0rpx;
				}

				.btn1 {
					background-image: linear-gradient(to right, #1E78FF, #31A5FE);
					color: #FFFFFF;
				}

				.btn2 {
					background: #EEF5FF;
					color: #BAD3F8;
				}
			}

		}
	}
</style>
