<template>
	<view class="home">
		<view class="top">
			<image src="/static/img/homeTop.png" mode="" v-if="state==1||!state"></image>
			<image src="/static/img/homeTopEng.png" mode="" v-if="state==2"></image>
			<image src="/static/img/homeTopJ.png" mode="" v-if="state==3"></image>
			<image src="/static/img/homeTopH.png" mode="" v-if="state==4"></image>
			<image src="/static/img/homeTopE.png" mode="" v-if="state==5"></image>
			<!--  @click="changeActive('board')" -->
			<view class="btn" @click="$gonext('/pages/index/index?activePages=board')">进入董事会</view>
		</view>
		<view class="notice" @click="$gonext('/pages/index/index?activePages=noticeList')">
			<image src="/static/img/notice.png" mode=""></image>
			<uni-notice-bar :scrollable="false" :single="true" background-color="#F5F9FF" color="#222222" :text="text"
				:speed='0' />
		</view>
		<view class="data">
			<view class="dataItem">
				<view class="title">MTU当前价格</view>
				<view class="num notranslate" v-if="info.cur_mtu">${{info.cur_mtu}}</view>
				<view class="num notranslate" v-else>$0</view>
			</view>
			<view class="dataItem">
				<view class="title">全网当天奖励MTU</view>
				<view class="num notranslate" v-if="info.all_cur_mtu">{{info.all_cur_mtu}}</view>
				<view class="num notranslate" v-else>0</view>
			</view>
			<view class="dataItem">
				<view class="title">MTU总供应量</view>
				<view class="num notranslate" v-if="info.total_mtu">{{info.total_mtu}}</view>
				<view class="num notranslate" v-else>0</view>
			</view>
			<view class="dataItem">
				<view class="title">已销毁MTU数量</view>
				<view class="num notranslate" v-if="info.destroy_mtu">{{info.destroy_mtu}}</view>
				<view class="num notranslate" v-else>0</view>
			</view>
			<view class="dataItem">
				<view class="title">
					<view>董事会信托</view>
					<view>总质押USDT</view>
				</view>
				<view class="num notranslate" v-if="info.dong_ya_usdt">{{info.dong_ya_usdt}}</view>
				<view class="num notranslate" v-else>0</view>
			</view>
			<view class="dataItem">
				<view class="title">
					<view>流动性信托</view>
					<view>总质押USDT</view>
				</view>
				<view class="num notranslate" v-if="info.liu_ya_usdt">{{info.liu_ya_usdt}}</view>
				<view class="num notranslate" v-else>0</view>
			</view>
			<view class="dataItem">
				<view class="title">
					<view>注册赠送</view>
				</view>
				<view class="num notranslate">{{info.reg_num||0}}U</view>
			</view>
			<view class="dataItem">
				<view class="title">
					<view>贷款总额</view>
				</view>
				<view class="num notranslate">{{info.bollow_total||0}}</view>
			</view>
		</view>
<!-- 		<view class="total">
			<view class="totalItem margin-b14">
				<view class="title">董事会信托总质押USDT</view>
				<view class="num">${{info.dong_ya_usdt}}</view>
			</view>
			<view class="totalItem margin-b14">
				<view class="title">流动性信托总质押USDT</view>
				<view class="num">${{info.liu_ya_usdt}}</view>
			</view>
			<view class="totalItem margin-b14">
				<view class="title">董事会奖励（MTU）</view>
				<view class="num">2500枚</view>
			</view>
			<view class="totalItem">
				<view class="title">注册赠送</view>
				<view class="num">10000U</view>
			</view>
		</view> -->
		<view class="content">
			<view class="headline margin-b24">MT信托项目优势</view>
			<view class="advantage">
				<view>
					<image src="/static/img/homeIcon1.png" mode=""></image>
				</view>
				<view>
					<view class="color-7 font-B">跨链市场</view>
					<view>支持HECO链和波场链</view>
				</view>
			</view>
			<view class="advantage">
				<view>
					<image src="/static/img/homeIcon2.png" mode=""></image>
				</view>
				<view>
					<view class="color-7 font-B">MTU通缩销毁</view>
					<view>三个快速销毁机制让MTU持续不断 升值</view>
				</view>
			</view>
			<view class="advantage">
				<view>
					<image src="/static/img/homeIcon3.png" mode=""></image>
				</view>
				<view>
					<view class="color-7 font-B">借贷池</view>
					<view>创新的借贷分池完善了平台控盘机 制，增加了无限的借贷市场应用价值</view>
				</view>
			</view>
			<view class="advantage">
				<view>
					<image src="/static/img/homeIcon4.png" mode=""></image>
				</view>
				<view>
					<view class="color-7 font-B">协议风控</view>
					<view>定义系统风控规则集，规避合约风 险，市场风险和预言机风险等</view>
				</view>
			</view>
		</view>
		<view class="headline margin-b14">Martin Trust 加密信托理财</view>
		<view class="content color-8">全球⾸个基于Heco链和波场链智能合约 共识的数字资产信托DeFi平台， 它以创 新经济模型和超前区块链技术， 以分散式 金融（DeFi）形式为投资者提供的智能AI
			信托服务，其模式基于灰度投资基础上， 增加创新分享模式，并进行双重造血功能， 平台更加长久稳定</view>
		<image src="/static/img/homePic1.png" mode="" class="bigImage"></image>
		<view class="headline margin-b14">Martin Trust 聚合收益</view>
		<view class="content color-8">马丁信托智能合约协议类似YFI聚合收益器议，使用Zap精简协议，可在不同的DeFi资产之间进行转换</view>
		<image src="/static/img/homePic2.png" mode="" class="bigImage"></image>
		<view class="milepost">
			<view class="headline margin-b24">里程碑</view>
            <timeAxis :dataArray="dataArray"></timeAxis>
		</view>
		<view class="headline">合作伙伴</view>
		<view class="partner">
			<image v-for="i of 24" :src="'/static/img/partner'+i+'.png'" mode=""></image>
		</view>
		<image src="/static/img/homePic3.png" mode="" class="bigImage2"></image>
		<view class="others">
			<view class="color-7">首页</view>
			<!-- @click="changeActive('board')" -->
			<view @click="$gonext('/pages/index/index?activePages=board')">董事会信托</view>
			<!--  @click="changeActive('flow')" -->
			<view @click="$gonext('/pages/index/index?activePages=flow')">流动性信托</view>
			<!-- @click="changeActive('loan')" -->
			<view @click="$gonext('/pages/index/index?activePages=loan')">借贷池</view>
			<!--  @click="changeActive('my')" -->
			<view @click="$gonext('/pages/index/index?activePages=my')">我的持仓</view>
			<view @click="changeActive('team')" >我的团队</view>
		</view>
		<view class="email db-flex db-space-between db-inline-item">
			<view class="emailTitle">
				<view class="font-B margin-b4">联系我们</view>
				<view class="db-inline-item">
					<image src="../../static/img/email.png" mode=""></image>{{configInfo.email}}
					
				</view>
			</view>
			<view class="emailDapp notranslate">DAPP</view>
		</view>
		<u-modal v-model="show" :content="content" :show-cancel-button="true" cancel-text="拒绝" cancel-color="#E1251A" @cancel="cancel" @confirm="confirm"></u-modal>
	    <u-mask :show="maskShow"></u-mask>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import timeAxis from '@/components/time_axis/time_axis.vue'
	import {ethers} from "@/js_sdk/ethers-v4.min.js"
	export default {
		components: {
			uniNoticeBar,
			timeAxis
		},
		props: {
			active: {
				type: String
			}
		},
		data() {
			return {
				info:{},
				text: '',
				show:false,
				content:'上级地址',
				invite_code:'',
				account:'',
				state:'',
				maskShow:false,
				configInfo:{},
				dataArray:[
						{
							time:'2018年09月',
							title:'',
							content:'马丁信托正式通过美国证监会 SEC发行TOKEN备案',
							active:true
						},{
							time:'2019年06月',
							title:'',
							content:'马丁信托进入加密数字货币框 架搭建，开发智能合约信托安 全可行方案调研和测试',
							active:true
						},{
							time:'2021年02月',
							title:'',
							content:'马丁信托全球发布信托事业宣传',
							active:true
						},{
							time:'2021年06月',
							title:'',
							content:'马丁信托正式招募合伙人',
							active:true
						},{
							time:'2021年08月',
							title:'',
							content:'2021年8月正式发布马丁币MTU 的DeFi借贷生态',
							active:true
						},{
							time:'2021年09月',
							title:'',
							content:'马丁信托预计9月底上线信托V1 测试',
							active:true
						},
					]
			}
		},
		onShow() {
			
		},
		created() {
			this.$request("/index/publics/getconfig", "GET").then(res => {
				if (res.code == 200) {
					this.configInfo = res.info
				}
			})
			var self = this;
			
			var goo = self.getCookie("googtrans")
			switch(goo){
				case "''":
					self.state = 1;
				break;
				case '/auto/zh-CN':
					self.state = 1;
				break;
				case '/auto/en':
					self.state = 2;
				break;
				case '/auto/ja':
					self.state = 3;
				break;
				case '/auto/ko':
					self.state = 4;
				break;
				case '/auto/ru':
					self.state = 5;
				break;
			}
		},
		mounted() {
			if(this.$route.query.invite_code){
				this.invite_code=this.$route.query.invite_code
				this.content=this.content+this.invite_code
			}
			this.getMetamask('1');
		},
		methods: {
			changeActive(active){
				this.$emit('update:activePages',active)
			},
			getCookie(name) {
				var arr,
				reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
				else return null;
			},
			cancel(){
				this.maskShow=true
				this.show=false
				console.log('拒绝')
			},
			confirm(){
				this.Login(this.account)
				console.log('确定')
			},
			async getMetamask(s){
				var self = this;
				if("undefined" == typeof ethereum){
					uni.showToast({
						icon:'none',
						title:'please install MetaMask!'
					})
				}else{
					var provider = new ethers.providers.Web3Provider(window.ethereum)
					var signer = provider.getSigner();
					
					const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
					const account = accounts[0];
					this.account=account
					// console.log(account, '地址');
					
					if (accounts.length > 0) {
						this.$emit('update:address',account)
						if(this.invite_code){
							self.isbind(account)
							console.log('绑定')
						}else{
							console.log('登录')
							self.Login(account,s)
						}
						console.log(account)
					}else{
						uni.showToast({
							icon:'none',
							title:'请下载IMTOKEN或者麦子钱包等去中心化的钱包或者在去中心化的浏览器环境中打开'
						})
					}
					ethereum.on('accountsChanged', function (accounts) {
						// Time to reload your interface with accounts[0]!
						console.log('断开连接')
					});
				}
			},
			isbind(account){
				this.$request("/index/publics/checkregister", "POST",{money_address:account}).then(res => {
					if (res.code == 1) {
						this.show=true
						console.log('未绑定')
					}else if(res.code == 0){
						this.Login(account)
					}
				})
			},
			Login(account,s){
				this.$request("/index/publics/login", "POST",{money_address:account,invite_code:this.invite_code}).then(res => {
					if (res.code == 200) {
						uni.setStorageSync('mydata',res.info)
						this.$emit('update:address',res.info.money_address)
						this.showdata()
						this.maskShow=false
					}
				})
			},
			showdata(){
				this.$request("/index/index/showdata", "GET").then(res => {
					if (res.code == 200) {
						this.info = res.info
					}
				})
				this.$request("/index/index/getIndexNoticeList", "GET").then(res => {
					if (res.code == 200) {
						this.text=res.info[0].title
					}
				})
			}
		},
		computed: {

		}
	}
</script>
<style>
	.uni-noticebar {
		margin-bottom: 0rpx;
	}
	/deep/ .u-model__content__message{
		word-wrap: break-word;
		word-break: normal;
		text-align: center;
	}
</style>

<style lang="less" scoped>
	.home {
		margin-top: 4px;

		.top {
			position: relative;

			image {
				width: 100%;
				height: 1000rpx;
			}

			.btn {
				position: absolute;
				bottom: 80rpx;
				left: 10%;
				width: 80%;
				border-radius: 44rpx;
				background-image: linear-gradient(to right, #1E78FF, #31A5FE);
				color: #FFFFFF;
				text-align: center;
				padding: 20rpx 0rpx;
				font-size: 36rpx;
				font-weight: bolder;
			}
		}

		.notice {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 30rpx 30rpx;
			background-color: #F5F9FF;
			margin-bottom: 60rpx;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			>view {
				width: 90%;
			}
		}

		.data {
			padding: 0rpx 12rpx;
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;

			&Item {
				width: 50%;
				background-image: url('/static/img/homeBg1.png');
				background-size: 100% 100%;
				padding: 44rpx 0rpx 48rpx 52rpx;
				box-sizing: border-box;

				.title {
					color: #737B88;
					font-size: 30rpx;
				}

				.num {
					color: #1E78FF;
					font-size: 44rpx;
					font-weight: bolder;
				}
			}
		}

		.total {
			background-image: url('/static/img/homeBg2.png');
			background-size: 100% 100%;
			padding: 44rpx 0rpx 48rpx 52rpx;
			box-sizing: border-box;

			&Item {
				.title {
					color: #737B88;
					font-size: 30rpx;
				}

				.num {
					color: #1E78FF;
					font-size: 44rpx;
					font-weight: bolder;
				}
			}
		}

		.headline {
			font-size: 50rpx;
			font-weight: bolder;
			text-align: center;
			margin-top: 60rpx;
		}

		.content {
			padding: 0rpx 30rpx;
			letter-spacing: 2rpx;

			.advantage {
				border-radius: 32rpx;
				padding: 40rpx 36rpx 16px 36rpx;
				box-shadow: 1px 0px 7px 1px rgba(29, 38, 54, 0.05);
				margin-top: 28rpx;
				display: flex;
				flex-direction: row;

				image {
					width: 128rpx;
					height: 128rpx;
					margin-right: 20rpx;
				}
			}
		}

		.bigImage {
			width: 100%;
			height: 400rpx;
			margin-top: 64rpx;
		}

		.milepost {
			background-image: url('/static/img/homeBg3.png');
			background-size: 100% 100%;
			padding: 48rpx 44rpx;
			.tops{
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				color: #222222;
				view:first-child{
					width: 28%;
				}
				view:nth-child(2){
					width: 22rpx;
					height: 22rpx;
					border-radius: 50%;
					border: 1px solid #1E78FF;
				}
				view:last-child{
					width: 57%;
				}
			}
		}

		.partner {
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			justify-content: space-between;
			padding: 40rpx 30rpx;

			image {
				width: 47%;
				height: 92rpx;
				margin-bottom: 28rpx;
			}
		}

		.bigImage2 {
			width: 100%;
			height: 272rpx;
		}

		.others {
			background-color: #FCFDFF;
			padding: 56rpx 0rpx 32rpx;
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			justify-content: space-between;
			color: #737B88;
			font-weight: bolder;

			view {
				width: 33.3%;
				text-align: center;
				margin-bottom: 48rpx;
			}
		}
		.email{
			padding: 40rpx 30px;
			box-shadow: 1px 0px 7px 1px rgba(29, 38, 54, 0.05);
			image{
				width: 50rpx;
				height: 50rpx;
			}
			&Dapp{
				border: 1px solid #1E78FF;
				color: #1E78FF;
				border-radius: 28rpx;
				padding: 6rpx 32rpx;
			}
		}
	}
</style>
