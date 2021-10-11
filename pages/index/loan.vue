<template>
	<view class="loan">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b20">借贷池</view>
		<view class="font-c font-B font-18 margin-b20">当前市场规模</view>
		<view class="header_title font-c margin-b32" v-if="info.current">
			<text>${{info.current}}</text>
		</view>
		<view class="center db-flex db-space-between">
			<view @click="$gonext('/pages/index/index?activePages=loanLog&type=1')">
				<view class="top margin-b12">
					<image src="/static/img/loanIcon1.png" mode=""></image>已借贷订单(MTU)
				</view>
				<view class="font-18 font-B color-7 margin-b14">{{info.totalmtu||0}}</view>
				<view class="font-13 color-7 margin-b14">查看明细</view>
			</view>
			<view @click="$gonext('/pages/index/index?activePages=loanLog&type=2')">
				<view class="top margin-b12">
					<image src="/static/img/loanIcon2.png" mode=""></image>已借贷订单(USDT)
				</view>
				<view class="font-18 font-B color-16 margin-b14 noticeList">{{info.totalusdt||0}}</view>
				<view class="font-13 color-16 margin-b14">查看明细</view>
			</view>
		</view>
		<view class="tab">
			<view :class="active==1?'active':''" @click="changeActive(1)">借贷(MTU)</view>
			<view :class="active==2?'active':''" @click="changeActive(2)">借贷(USDT)</view>
		</view>
		<view class="list">
			<view class="listTop">
				<view>资产</view>
				<view>时间</view>
			</view>
			<view class="listOpen one" v-for="(item,i) of list" @click="pay(item)">
				<view class="db-inline-item font-B color-4 font-16">
					<view v-if="active==1">
						<image src="../../static/img/loan1.png" mode=""></image>
					</view>
					<view v-if="active==2">
						<image src="../../static/img/loanIcon.png" mode=""></image>
					</view>
					<view class="notranslate">{{item.types==1?'MTU/USDT':'USDT/MTU'}}</view>
					<!-- ?:'USDT/MTU' -->
				</view>
				<view class="text-r">
					<view class="color-7 font-16">{{item.days}}天</view>
					<view class="fasten">固定APY {{item.apy}}%</view>
				</view>
			</view>
			<view v-if="active==1">
				<view class="listUnopen">
					<view class="db-inline-item font-B color-4 font-16">
						<view>
							<image src="../../static/img/loan1.png" mode=""></image>
						</view>
						<view class="notranslate">MTU/ETH</view>
					</view>
					<view class="text-r">
						<view class="color-8 font-16">待开放</view>
					</view>
				</view>
				<view class="listUnopen">
					<view class="db-inline-item font-B color-4 font-16">
						<view>
							<image src="../../static/img/loan1.png" mode=""></image>
						</view>
						<view class="notranslate">MTU/BTC</view>
					</view>
					<view class="text-r">
						<view class="color-8 font-16">待开放</view>
					</view>
				</view>
			</view>
			<view v-if="active==2">
				<view class="listUnopen">
					<view class="db-inline-item font-B color-4 font-16">
						<view>
							<image src="../../static/img/loanIcon.png" mode=""></image>
						</view>
						<view class="notranslate">USDT/ETH</view>
					</view>
					<view class="text-r">
						<view class="color-8 font-16">待开放</view>
					</view>
				</view>
				<view class="listUnopen">
					<view class="db-inline-item font-B color-4 font-16">
						<view>
							<image src="../../static/img/loanIcon.png" mode=""></image>
						</view>
						<view class="notranslate">USDT/BTC</view>
					</view>
					<view class="text-r">
						<view class="color-8 font-16">待开放</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="Show" mode="center" border-radius="16" width="90%">
			<view class="content">
				<view class="title db-flex db-space-between">
					<image src="/static/img/loan1.png" mode="" v-if="active==1"></image>
					<image src="/static/img/loanIcon.png" mode="" v-if="active==2"></image>
					<view>确认支付</view>
					<image src="/static/img/close2.png" mode="" @click="close"></image>
				</view>
				<view class="data">
					<view class="num db-flex db-space-between margin-b12">
						<view class="db-flex db-space-between number">
							<view><input type="text" v-model="form.number" placeholder="请输入贷款金额" /></view>
							<view class="notranslate">{{active==1?'MTU':'USDT'}}</view>
						</view>
						<view class="max" @click="form.number=mydata.mtu" v-if="active==1">最大值</view>
						<view class="max" @click="form.number=mydata.usdt" v-if="active==2">最大值</view>
					</view>
					<view class="db-flex db-space-between color-7 margin-b20 font-13" v-if="active==1">
						<view>余额可用</view>
						<view>{{mydata.mtu}}MTU</view>
					</view>
					<view class="db-flex db-space-between color-7 margin-b20 font-13" v-if="active==2">
						<view>余额可用</view>
						<view>{{mydata.usdt}}USDT</view>
					</view>
					<view class="color-8 font-13 margin-b12">借贷明细</view>
					<view class="dataList">
						<view class="db-flex db-space-between">
							<view class="font-13">借款利用率</view>
							<view>{{order.use_rate}}%</view>
						</view>
						<view class="db-flex db-space-between" :key="key">
							<view class="font-13">可得金额</view>
							<view>{{number}}{{active==1?'USDT':'MTU'}}</view>
						</view>
						<view class="db-flex db-space-between">
							<view class="font-13">固定借款APY</view>
							<view>{{order.apy}}%</view>
						</view>
						<view class="db-flex db-space-between">
							<view class="font-13">借贷周期</view>
							<view>{{order.days}}</view>
						</view>
					</view>
					<view class="color-7 font-12 margin-t10">注：如果质押的MTU市值低于借款时锚定市值的70%，即 该订单触发清算。</view>
					<view class="btn margin-t24" @click="sure">{{active==1?'借出USDT':'借出MTU'}}</view>
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
				list: [],
				active: 1,
				Show: false,
				order: {},
				form: {
					id: '',
					number: '0'
				},
				mydata: '',
				getconfig:'',
				number:0,
				key:'',
				modalShow:false,
				content: '支付提示'
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
			showdata() {
				this.$request("/index/bollow/plist", "GET").then(res => {
					if (res.code == 0) {
						this.info = res
						this.list = res.mtu
					}
				})
				console.log('借', this.info)
			},
			changeActive(item) {
				this.active = item
				if (item == 1) {
					this.list = this.info.mtu
				} else {
					this.list = this.info.usdt
				}
				console.log(this.list)
			},
			close() {
				this.Show = false
			},
			pay(item) {
				this.$request("/index/bollow/plistdetail", "POST", {
					id: item.id
				}).then(res => {
					if (res.code == 0) {
						this.Show = true
						this.order = res.info
						this.form.id = res.info.id
						console.log(res)
					}
				})
			},
			confirm(){
				this.$request("/index/bollow/loan", "POST", this.form).then(res => {
					uni.showToast({
						icon: 'none',
						title: res.msg
					})
					if (res.code == 0) {
						setTimeout(()=>{
							this.modalShow=false
							this.Show = false
							location.reload();
						},200)
					}
				})
			},
			sure() {
				this.modalShow=true
			}
		},
		computed: {},
		watch:{
			'form.number'(){
				this.$request("/index/bollow/cangetnum", "POST", {
					id: this.form.id,
					num:this.form.number
				}).then(res => {
					if (res.code == 0) {
						this.number=res.num
						this.key++
						console.log(this.number)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.loan {
		padding-bottom: 60rpx;

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

		.center {
			>view {
				width: 50%;
				padding: 56rpx 42rpx 112rpx 40rpx;

				.top {
					display: flex;
					font-size: 26rpx;

					image {
						width: 56rpx;
						height: 36rpx;
						margin-right: 8rpx;
					}
				}
			}

			>view:first-child {
				background-image: url(../../static/img/loanBg1.png);
				background-size: 100% 100%;
			}

			>view:last-child {
				background-image: url(../../static/img/loanBg2.png);
				background-size: 100% 100%;
			}
		}

		.tab {
			width: 85%;
			margin: 44rpx auto 38rpx;
			border: 2rpx solid #1E78FF;
			border-radius: 44rpx;
			display: flex;

			>view {
				width: 50%;
				padding: 22rpx 72rpx;
				text-align: center;
				color: #1E78FF;
			}

			.active {
				background-color: #1E78FF;
				color: #FFFFFF;
				border-radius: 44rpx;
			}
		}

		.list {
			width: 95%;
			font-size: 26rpx;
			margin: 0 auto;
			background-color: #FFFFFF;
			box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(29, 38, 54, 0.05);
			border-radius: 32rpx;

			image {
				width: 44rpx;
				height: 44rpx;
				margin-right: 20rpx;
			}

			&Top,
			&Open,
			&Unopen {
				display: flex;
				justify-content: space-between;
				color: #737B88;
				padding: 48rpx 32rpx;
			}

			&Open {
				background-color: #F5F9FF;
				position: relative;
			}

			.one::after {
				width: 85%;
				height: 2rpx;
				content: '';
				background: #DEEAFF;
				position: absolute;
				right: 32rpx;
				bottom: 0%;
			}

			&Unopen {
				padding: 30rpx;
			}
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

				.num {
					border: 1px solid #CCCCCC;
					border-radius: 16rpx;

					.number {
						padding: 46rpx 40rpx;
					}

					.max {
						width: 30%;
						text-align: center;
						box-sizing: border-box;
						border-left: 2rpx solid #CCCCCC;
						background-color: #F5F9FF;
						padding: 46rpx 26rpx;
					}
				}

				&List {
					background-color: #F5F9FF;
					padding: 0rpx 28rpx;

					>view {
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
