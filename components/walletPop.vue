<template>
	<view class="walletPop">
		<u-popup v-model="Show" mode="center" border-radius="16" width="80%">
			<view class="content">
				<view class="title">连接钱包</view>
				<view class="close" @click="ShowPop(Show)">
					<image src="/static/img/close1.png" mode=""></image>
				</view>
				<view class="contt">
					<view class="nav">
						<view class="item" :class="active==1?'active':''" @click="clickitem(1,1)">
							<image src="/static/img/6ac90eef4083cc94d8ca401770b02e9.png" mode=""></image>
							<view>Huobi Wallet</view>
						</view>
						<view class="item" :class="active==2?'active':''" @click="clickitem(1,2)">
							<image src="/static/img/022053eaba98e379f1d476d44989b8d.png" mode=""></image>
							<view>Imtoken</view>
						</view>
						<view class="item" :class="active==3?'active':''" @click="clickitem(1,3)">
							<image src="/static/img/3b74541cc765c7f176fb424137cc006.png" mode=""></image>
							<view>TP Wallet</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {ethers} from "@/js_sdk/ethers-v4.min.js"
	export default {
		components: {},
		props: {
			Show: {
				type: Boolean
			},
			homeData:{
				type:Object
			}
		},
		data() {
			return {
               active:1
			}
		},
		created() {
			this.mydata = uni.getStorageSync('mydata')
			console.log(this.mydata, '数据')
		},
		methods: {
			ShowPop(Show) {
				this.$emit('update:Show', !Show)
				console.log(Show)
			},
			clickitem(s,active){
				this.active=active
				switch(s){
					case 1:
						this.getMetamask('1');
					break;
					case 2:
						this.getBinance('2');
					break;
					case 3:
						this.WalletConnect();
					break;
				}
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
					// console.log(account, '地址');
					
					if (accounts.length > 0) {
						self.Login(account,s)
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
			async WalletConnect(){
				var self = this;
				// Create a connector
				const connector = new WalletConnect({
					bridge: "https://bridge.walletconnect.org", // Required
					qrcodeModal: QRCodeModal,
				});
				
				// Check if connection is already established
				// 检查是否已建立连接
				if (!connector.connected) {
					// create new session
					// 创建新会话
					connector.createSession();
					self.wallet = '3';
				}
				// 订阅连接事件		
				connector.on("connect", (error, payload) => {
					if (error) {
						throw error;
						console.log(error)
					}
					const { accounts, chainId } = payload.params[0];
					self.Login(accounts[0],self.wallet)
				});
			},
			async getBinance(s){
				var self = this;
				if("undefined" == typeof BinanceChain){
					uni.showToast({
						icon:'none',
						title:'please install BinanceChain!'
					})
				}else{
					var provider = new ethers.providers.Web3Provider(window.BinanceChain)
					var signer = provider.getSigner();
					
					const accounts = await BinanceChain.request({ method: 'eth_accounts' })
					const account = accounts[0];
					
					if (accounts.length > 0) {
						self.Login(account,s)
					}else{
						uni.showToast({
							icon:'none',
							title:'请下载IMTOKEN或者麦子钱包等去中心化的钱包或者在去中心化的浏览器环境中打开'
						})
					}
					BinanceChain.on('accountsChanged', function (accounts) {
						console.log('断开连接')
					});
				}
			},
			Login(account,s){
				var self = this;
				this.$request("/index/publics/login", "POST",{money_address:account,invite_code:''}).then(res => {
					if (res.code == 200) {
						uni.redirectTo({
						    url: '/pages/index/index?activePages=home'
						});
						this.$emit('update:homeData',res.info)
						this.$emit('update:Show', false)
						console.log(123)
					}
				})
			}
		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.walletPop {
		//    width: 100vw;
		// height: 100vh;
		// background-color: rgba(0,0,0,0.5);
		position: absolute;
		top: 0rpx;

		.content {
			position: relative;
			padding: 40rpx 0rpx 160rpx;

			.title {
				font-size: 40rpx;
				font-weight: bold;
				text-align: center;
			}

			.contt {
				.nav {
					margin: 0 68rpx;
					.item {
						margin-top: 60rpx;
						display: flex;
						flex-direction: row;
						align-items: center;
						padding: 12rpx;
						background-color: #F1F7FF;
						border-radius: 62rpx;

						image {
							width: 100rpx;
							height:100rpx;
							margin-right: 30rpx;
						}

						view {
							color: #737B88;
						}
					}
					.active{
						background-image: linear-gradient(to right,#1E78FF,#31A5FE);
						view{
							color: #FFFFFF;
						}
					}
				}
			}

			.close {
				image {
					width: 56rpx;
					height: 56rpx;
					position: absolute;
					top: 40rpx;
					right: 40rpx;
				}
			}
		}
	}
</style>
