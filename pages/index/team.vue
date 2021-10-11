<template>
	<view class="team">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b20">我的团队</view>
		<view class="content">
			<view class="data" :key="key">
				<view class="db-flex db-space-between db-inline-item margin-b16">
					<view class="title">我的钱包地址</view>
					<view class="db-inline-item" v-if="info.money_address">
						<view>{{info.money_address.slice(0,6)+'...'+info.money_address.slice(-6)||0}}</view>
						<image src="/static/img/copy.png" mode="" @click="copy(info.money_address)"></image>
					</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">推荐人地址</view>
					<view class="db-inline-item" v-if="info.p_money_address">
						<view>{{info.p_money_address.slice(0,6)+'...'+info.p_money_address.slice(-6)||'无'}}</view>
						<!-- <image src="/static/img/copy.png" mode="" @click="copy(info.p_money_address)"></image> -->
					</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">我的邀请链接</view>
					<view class="db-inline-item" v-if="info.invite_link">
						<view>{{info.invite_link.slice(0,9)+'...'+info.invite_link.slice(-6)||0}}</view>
						<image src="/static/img/copy.png" mode="" @click="copy(info.invite_link)"></image>
					</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">我的级别</view>
					<view class="notranslate font-B">V{{info.level}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">个人董事会收益（MTU）</view>
					<view>{{info.gd_pro}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">分享董事会收益（USDT）</view>
					<view>{{info.fd_pro}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">个人流动性收益（MTU）</view>
					<view>{{info.gl_pro}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">分享流动性收益（MTU）</view>
					<view>{{info.fl_pro}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">合伙人奖励（USDT）</view>
					<view>{{info.partner_usdt}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">合伙人奖励（MTU）</view>
					<view>{{info.partnet_mtu}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">董事会奖励（MTU）</view>
					<view>{{info.dong_mtu}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">团队人数</view>
					<view>{{info.team_num}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">直推人数</view>
					<view>{{info.zhi_num}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">董事会直推业绩(USDT)</view>
					<view>{{info.dong_zhitui}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">流动性直推业绩(USDT)</view>
					<view>{{info.liu_zhitui}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">每日MTU产出/枚</view>
					<view>{{info.every_mtu}}</view>
				</view>
				<view class="db-flex db-space-between margin-b16">
					<view class="title">董事会业绩总额（USDT）</view>
					<view>{{info.dong_usdt}}</view>
				</view>
				<view class="db-flex db-space-between">
					<view class="title">流动性业绩总额（USDT）</view>
					<view>{{info.liu_usdt}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
               info:{},
			   mydata:{},
			   key:1
			}
		},
		created() {
			this.myteam()
		},
		methods: {
			gonext(right_url) {
				uni.navigateTo({
					url: right_url
				})
			},
			myteam() {
				this.$request("/index/member/myteam", "GET").then(res => {
					if (res.code == 200) {
						this.info=res.info
						this.key++
					}
				})
				console.log('我的团队', this.info)
			},
			copy(e) {
				var _input = document.createElement("input"); // 直接构建input
				_input.value = e; // 设置内容
				document.body.appendChild(_input); // 添加临时实例
				_input.select(); // 选择实例内容
				document.execCommand("Copy"); // 执行复制
				uni.showToast({
					icon: 'none',
					title: '复制成功'
				});
				document.body.removeChild(_input); // 删除临时实例
			}
		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.team {
		padding: 0rpx 12rpx;
		.content{
			background-image: url(../../static/img/teamBg1.png);
			padding:122rpx 30rpx 0rpx;
			background-size: 100%;
			background-repeat: no-repeat;
			.data{
				background-color: #FFFFFF;
				padding: 48rpx 32rpx;
				border-radius: 32rpx;
				box-shadow: 0rpx 0rpx 6rpx 2rpx rgba(29,38,54,0.05);
				font-size: 34rpx;
				.title{
					color: #737B88;
				}
				image{
					width: 40rpx;
					height: 40rpx;
					margin-left: 12rpx;
				}
			}
		}
	}
</style>
