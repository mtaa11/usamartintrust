<template>
	<view class="wallet">
		<u-popup v-model="walletShow" mode="center" :mask-close-able="false">
			<view class="walletbox">
				<view class="close">
					<image @click="close" src="../static/img/0ea47b49e3505f19ed3b744cc368f91.png" mode=""></image>
				</view>
				<view class="contt">
					<view class="text">{{i18n.text51}}</view>
					<view class="nav">
						<view class="item" @click="clickitem(1)">
							<image src="../static/img/6ac90eef4083cc94d8ca401770b02e9.png" mode=""></image>
							<view>MetaMask</view>
						</view>
						<view class="item" @click="clickitem(1)">
							<image src="../static/img/3b74541cc765c7f176fb424137cc006.png" mode=""></image>
							<view>TP</view>
						</view>
						<view class="item" @click="clickitem(1)">
							<image src="../static/img/191392f07242f48f1bd9598d389abae.jpg" mode=""></image>
							<view>Trust wallet</view>
						</view>
						<view class="item" @click="clickitem(1)">
							<image src="../static/img/022053eaba98e379f1d476d44989b8d.png" mode=""></image>
							<view>Imtoken</view>
						</view>
						<view class="item" @click="clickitem(2)">
							<image src="../static/img/85f8c0f962bab2af35f079f54b8118b.png" mode=""></image>
							<view>Binance</view>
						</view>
						<view class="item" @click="clickitem(3)">
							<image src="../static/img/a858a005a27cf8d099cba60f7677cdf.png" mode=""></image>
							<view>Wallet Connect</view>
						</view>
					</view>
				</view>
			</view>			
		</u-popup>
	</view>
</template>

<script>
	import WalletConnect from "@walletconnect/client";
	import QRCodeModal from "@walletconnect/qrcode-modal";
	import {ethers} from "@/js_sdk/ethers-v4.min.js";
	import {BscConnector} from '@binance-chain/bsc-connector';
	export default {
		name:'wallets',
		props: {
			walletShow:{
				type:Boolean,
				require: false,
				default: false
			},
			code:{
				type:String
			}
		},
		data() {
			return {
				token:'',
				lang:'',
				wallet:''
			}
		},
		created() {
			if(uni.getStorageSync('lang')){
				this.lang = uni.getStorageSync('lang')				
			}else{
				this.lang = '2';
				uni.setStorageSync('lang',this.lang)
			}
			console.log(this._i18n.locale)
		},
		methods:{
			close(){
				this.$emit('update:walletShow', false)
			},
			clickitem(s){
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
				// console.log(connector)
				
				// Subscribe to connection events
				// 订阅连接事件		
				connector.on("connect", (error, payload) => {
					if (error) {
						throw error;
						console.log(error)
					}
					// Get provided accounts and chainId
					// 获取提供的帐户和链ID
					const { accounts, chainId } = payload.params[0];
					// console.log(accounts,chainId)
					self.Login(accounts[0],self.wallet)
				});
				
				// connector.on("session_update", (error, payload) => {
				// 	if (error) {
				// 		throw error;
				// 	}
				
				// 	// Get updated accounts and chainId
				// 	// 获取更新的帐户和链ID
				// 	const { accounts, chainId } = payload.params[0];
				// 	self.Login(accounts[0],self.wallet)
				// });
				
				// connector.on("disconnect", (error, payload) => {
				// 	if (error) {
				// 		throw error;
				// 	}		
				// 	// Delete connector
				// 	// 删除连接器
				// });
			},
			async getMetamask(s){
				var self = this;
				// if(uni.getStorageSync('token')){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'已连接，请勿重复点击'
				// 	})
				// 	return;
				// }
				// console.log(ethereum)
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
			async getBinance(s){
				var self = this;
				// if(uni.getStorageSync('token')){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'已连接，请勿重复点击'
				// 	})
				// 	return;
				// }
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
					// console.log(account, '地址');
					
					if (accounts.length > 0) {
						self.Login(account,s)
					}else{
						uni.showToast({
							icon:'none',
							title:'请下载IMTOKEN或者麦子钱包等去中心化的钱包或者在去中心化的浏览器环境中打开'
						})
					}
					BinanceChain.on('accountsChanged', function (accounts) {
						// Time to reload your interface with accounts[0]!
						console.log('断开连接')
					});
				}
			},
			Login(account,s){
				var self = this;
				// var code = '';
				// if(uni.getStorageSync('invite_code')){
				// 	code = uni.getStorageSync('invite_code')
				// }
				uni.request({
					url: this.$service.api.doLogin,
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data:{
						address: account,
						invite_code: self.code,
						lang: self.lang
					},
					method:'POST',
					success(res) {
						var res = res.data;
						console.log(res)
						if(res.code==0){
							self.close();
							// uni.showToast({
							// 	icon: 'success',
							// 	title: res.msg
							// });
							var token = res.info.token;
							self.token = token;
							console.log(account,s)
							uni.setStorageSync('token',token);
							uni.setStorageSync('account',account)
							uni.setStorageSync('wallet',s);
							setTimeout(()=>{
								window.location.reload();
							},500)
						}else{
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
						}					
					}
				})
			}
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		}
	}
</script>

<style lang="less" scoped>
/deep/.u-mode-center-box{
	background: transparent;
	background-color: transparent!important;
	border: none!important;
	color: #000000!important;
}
.walletbox{
	.close{
		display: flex;
		justify-content: flex-end;
		margin-bottom: 40rpx;
		image{
			width: 62rpx;
			height: 62rpx;
		}
	}
	.contt{
		width: 546rpx;
		height: 790rpx;
		background: #FFFFFF;
		border-radius: 46rpx;
		.text{
			font-size: 28rpx;
			text-align: center;
			color: #AFB0B6;
			padding-top: 50rpx;
		}
		.nav{
			margin: 0 40rpx;
			display: flex;
			flex-wrap: wrap;
			.item{
				width: 50%;
				text-align: center;
				margin-top: 60rpx;
				image{
					width: 68rpx;
					height: 68rpx;
				}
				view{
					font-weight: bold;
					padding-top: 10rpx;
				}
			}
		}
	}	
}
</style>
