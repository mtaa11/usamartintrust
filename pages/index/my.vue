<template>
	<view class="my">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b28">我的持仓</view>
		<view class="title">董事会信托持仓</view>
		<view class="total">
			<view class="db-inline-item db-space-between margin-b2">
				<view class="font-12 color-8">当前持仓总量</view>
				<view class="db-inline-item" @click="$gonext('/pages/index/index?activePages=myLogDetail')">
					<view class="font-12 color-7 margin-r4">查看明细</view>
					<image src="/static/img/next.png" mode=""></image>
				</view>
			</view>
			<view class="font-B font-22 color-7">{{ mydata.dong_total }}</view>
		</view>
		<view class="title">流动性信托持仓</view>
		<view class="total">
			<view class="db-inline-item db-space-between margin-b2">
				<view class="font-12 color-8">当前持仓总量</view>
				<view class="db-inline-item" @click="$gonext('/pages/index/index?activePages=flowLog&types=0')">
					<view class="font-12 color-7 margin-r4">查看明细</view>
					<image src="/static/img/next.png" mode=""></image>
				</view>
			</view>
			<view class="font-B font-22 color-7">{{ mydata.liu_total }}</view>
		</view>
		<view class="title db-inline-item db-space-between">
			<view>我的资产</view>
			<image src="/static/img/more.png" mode="" @click="$gonext('/pages/index/index?activePages=myLog')"></image>
		</view>
		<view class="balance balance1 db-inline-item db-space-between">
			<view>
				<view class="title">USDT资产</view>
				<view class="font-B font-22 number">{{ mydata.usdt }}</view>
			</view>
			<view class="btn"><view class="font-12 margin-r4" @click="showPop(1)">提币</view></view>
		</view>
		<view class="balance balance2 db-inline-item db-space-between">
			<view>
				<view class="title">MTU资产</view>
				<view class="font-B font-22 number">{{ mydata.mtu }}</view>
			</view>
			<view class="btn"><view class="font-12 margin-r4" @click="showPop(2)">提币</view></view>
		</view>
		<view class="balance balance2 db-inline-item db-space-between">
			<view>
				<view class="title">BTC资产</view>
				<view class="font-B font-22 number">0.000000</view>
			</view>
			<view class="btn"><view class="font-12 margin-r4">待开放</view></view>
		</view>
		<view class="balance balance2 db-inline-item db-space-between">
			<view>
				<view class="title">ETH资产</view>
				<view class="font-B font-22 number">0.000000</view>
			</view>
			<view class="btn"><view class="font-12 margin-r4">待开放</view></view>
		</view>
		<u-popup v-model="Show" mode="center" border-radius="16" width="90%">
			<view class="content">
				<view class="title">
					<view>提币</view>
					<view class="close" @click="Show = false"><image src="/static/img/close2.png" mode=""></image></view>
				</view>
				<view class="data">
					<view class="dataItem">
						<view class="color-8 font-14">余额</view>
						<view class="db-flex db-space-between margin-t8  font-B">
							<text class="font-16">{{ form.money_types == 1 ? mydata.usdt + 'USDT' : mydata.mtu + 'MTU' }}</text>
						</view>
					</view>
					<view class="dataItem">
						<view class="color-8 font-14">输入数量</view>
						<view class="db-flex db-space-between margin-t8  font-B">
							<input
								type="text"
								value=""
								placeholder="请输入数量"
								v-model="form.num"
								class="font-18"
								placeholder-style="font-size:14px;color:#222222;font-weight:normal"
							/>
							<text class="font-16">{{ form.money_types == 1 ? 'USDT' : 'MTU' }}</text>
						</view>
					</view>
					<view class="dataItem">
						<view class="color-8 font-14">输入地址</view>
						<view class="margin-t8 address">
							{{ mydata.money_address }}
							<!-- <input type="text" value="" placeholder="请输入地址" v-model="form.address" class="font-18" placeholder-style="font-size:14px;color:#222222;font-weight:normal" /> -->
						</view>
					</view>
					<view class="dataItem">
						<view class="color-8 font-14">手续费</view>
						<view class="margin-t8">{{ fee }}%</view>
					</view>
					<view class="btn margin-b12" @click="sure">确认</view>
					<view class="btn2" @click="$gonext('/pages/index/index?activePages=walletLog')">提币记录</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
			mydata: {},
			Show: false,
			form: {
				num: '',
				address: '',
				money_types: ''
			},
			fee: ''
		};
	},
	created() {
		// this.mydata = uni.getStorageSync('mydata');
		// this.form.address = this.mydata.money_address;
		// console.log(this.mydata, 'wode');
		this.showdata();
	},
	methods: {
		gonext(right_url) {
			uni.navigateTo({
				url: right_url
			});
		},
		showPop(type) {
			if (type == 1) {
				this.fee = this.info.outcoin_usdt_fee;
			} else {
				this.fee = this.info.outcoin_mtu_fee;
			}
			this.Show = true;
			this.form.money_types = type;
			console.log(this.form);
		},
		showdata() {
			this.$request('/index/publics/getconfig', 'GET').then(res => {
				if (res.code == 200) {
					this.info = res.info;
				}
			});
			this.$request('/index/member/index', 'GET').then(res => {
				if (res.code == 200) {
					this.mydata = res.info;
					this.form.address = this.mydata.money_address;
				}
			});
			console.log('配置', this.info);
		},
		sure() {
			this.$request('/index/mywallet/addWithdrawList', 'POST', this.form).then(res => {
				if (res.code == 200) {
					console.log('tibi');
				}
			});
		}
	},
	computed: {}
};
</script>

<style lang="less" scoped>
.my {
	padding: 0rpx 30rpx;

	.title {
		width: 100%;
		font-size: 32rpx;
		font-weight: bolder;
		margin-bottom: 24rpx;

		image {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.total {
		background-image: linear-gradient(to bottom, #ffffff, #eef5ff);
		padding: 24rpx 40rpx;
		border-radius: 32rpx;
		margin-bottom: 60rpx;

		image {
			width: 32rpx;
			height: 32rpx;
		}
	}

	.balance {
		padding: 44rpx 52rpx;

		.title {
			font-size: 24rpx;
			color: rgba(255, 255, 255, 0.7);
			margin-bottom: 4rpx;
		}

		.number {
			color: #ffffff;
		}

		.btn {
			color: #ffffff;
			font-size: 24rpx;
			background-color: rgba(255, 255, 255, 0.34);
			padding: 10rpx 44rpx;
			border-radius: 28rpx;
		}
	}

	.balance1 {
		background-image: url('../../static/img/flowBg1.png');
		background-size: 100% 100%;
	}

	.balance2 {
		background-image: url('../../static/img/myBg.png');
		background-size: 100% 100%;
	}

	.content {
		.title {
			background-image: linear-gradient(to right, #1e78ff, #31a5fe);
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			position: relative;
			color: #ffffff;
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
		.address {
			word-wrap: break-word;
			word-break: normal;
			// text-align: center;
			font-weight: bolder;
		}

		.data {
			padding: 40rpx;

			&Item {
				border: 1px solid #cccccc;
				border-radius: 16rpx;
				margin-bottom: 28rpx;
				padding: 24rpx 40rpx;
			}

			.btn {
				width: 100%;
				text-align: center;
				border-radius: 16rpx;
				font-size: 36rpx;
				font-weight: bolder;
				padding: 24rpx 0rpx;
				background-image: linear-gradient(to right, #1e78ff, #31a5fe);
				color: #ffffff;
			}

			.btn2 {
				text-align: center;
				color: #1e78ff;
			}
		}
	}
}
</style>
