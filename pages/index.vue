<template>
	<view class="content">
		<headers></headers>
		<view class="bg"></view>
		<view class="header-right" @click="toselect()">
			<image src="../static/img/1ae6e9099c389a3df32b85b57efafe7.png" mode=""></image>
			<text>{{i18n.text1}}</text>
		</view>
		<view class="flex">
			<view class="qianbao" @click="walletorshow">{{account?account:i18n.text2}}</view>
			<view class="lan" @click="langShow=true">
				<!-- <image v-if="_i18n.locale=='zh_CN'" src="../static/img/lang1.png" mode=""></image>
				<image v-else-if="_i18n.locale=='en'" src="../static/img/lang2.png" mode=""></image>
				<image v-else-if="_i18n.locale=='ko'" src="../static/img/lang3.png" mode=""></image>
				<image v-else-if="_i18n.locale=='ja'" src="../static/img/lang4.png" mode=""></image>
				<image v-else-if="_i18n.locale=='in'" src="../static/img/lang5.png" mode=""></image>
				<image v-else-if="_i18n.locale=='vi'" src="../static/img/lang6.png" mode=""></image>
				<image v-else-if="_i18n.locale=='es'" src="../static/img/lang7.png" mode=""></image>
				<image v-else-if="_i18n.locale=='ru'" src="../static/img/lang8.png" mode=""></image>
				<text v-if="_i18n.locale=='zh_CN'">中文</text>
				<text v-else-if="_i18n.locale=='en'">English</text>
				<text v-else-if="_i18n.locale=='ko'">한국인</text>
				<text v-else-if="_i18n.locale=='ja'">日本</text>
				<text v-else-if="_i18n.locale=='in'">Indonesia</text>
				<text v-else-if="_i18n.locale=='vi'">TiếngViệt</text>						
				<text v-else-if="_i18n.locale=='es'">España</text>						
				<text v-else-if="_i18n.locale=='ru'">Россия</text> -->
				<langp></langp>
			</view>
		</view>
		<langs :lang-show.sync="langShow"></langs>
		<diaos v-if="wallet" :diao-show.sync="diaoShow"></diaos>
		<wallets :wallet-show.sync="walletShow" :code="code" v-else></wallets>	
		<view class="main">
			<view class="mat" @click="out">
				<image src="../static/img/mat1.png"></image>
				<text>Bingo Bsc</text>
				<image src="../static/img/mat2.png"></image>
			</view>
			<view class="maw">
				<view>{{i18n.text3}}</view>
				<view v-if="lang!='1'">{{i18n.text3_1}}</view>				
			</view>
			<view class="mad">DeFi + Metaverse + NFT</view>
			<view class="mac">
				<view class="mac1">{{i18n.text4}}</view>
				<view class="mac2">${{parseFloat(sc_base_num).toLocaleString()}}</view>
				<view class="mac1">{{i18n.text5}}</view>
				<view class="mac2">{{parseFloat(xz_base_num).toLocaleString()}}</view>
			</view>
			<view class="mat">
				<image src="../static/img/mat1.png"></image>
				<text>{{i18n.text6}}</text>
				<image src="../static/img/mat2.png"></image>
			</view>
			<view class="banner banner1">
				<swiper
					autoplay="true"
					circular="true"
					interval="3000"
					duration="800"
					:indicator-dots="true"
					indicator-color="#9F9AA1"
					indicator-active-color="#ffffff">
					<swiper-item v-for="(item,index) in banner1">
						<text class="text1">{{item.title}}</text>
						<text class="text2">{{item.text2}}</text>
						<text class="text3">{{item.text3}}</text>
						<image :src="host+item.pic"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="banner banner2">
				<swiper
					autoplay="true"
					circular="true"
					interval="3000"
					duration="800"
					:indicator-dots="true"
					indicator-color="#9F9AA1"
					indicator-active-color="#ffffff">
					<swiper-item v-for="(item,index) in banner2">
						<text class="text1">{{item.title}}</text>
						<text class="text2">{{item.text2}}</text>
						<text class="text3">{{item.text3}}</text>
						<image :src="host+item.pic"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="mat" style="margin-bottom: 72rpx;">
				<image src="../static/img/mat1.png"></image>
				<text>{{i18n.text7}}</text>
				<image src="../static/img/mat2.png"></image>
			</view>
			<view class="asset" 
			v-for="(item,index) in order" 
			:style="{backgroundImage: 'url(' + './static/img/ass'+(index-1)+'.png' + ')', backgroundSize:'100% 100%'}" @click="tople(index)">
				<view class="ass1" v-if="index==1">BTC</view>
				<view class="ass1" v-else-if="index==2">ETH</view>
				<view class="ass1" v-else-if="index==3">BNB</view>
				<view class="ass1" v-else-if="index==4">USDT</view>
				<view class="ass1" v-else-if="index==5">DOGE</view>
				<view class="ass1" v-else-if="index==6">ADA</view>
				<view class="ass2">
					<text>{{i18n.text8}}</text>
					<text>{{item.repay?item.repay+'%':'--'}}</text>
				</view>
				<view class="ass2">
					<text>{{i18n.text9}}</text>
					<text>{{item.day_rate?item.day_rate+'%':'--'}}</text>
				</view>
				<view class="ass2">
					<text>{{i18n.text10}}</text>
					<text>{{item.num?item.num:'--'}}</text>
				</view>
			</view>
			<view class="nav1">
				<view>
					<image src="../static/img/79c166ed9320476110ff83324739630.png" mode=""></image>
					<text>{{i18n.text11}}</text>
				</view>
				<view>
					<image src="../static/img/df8c4bd17568e756366cc556d8ce159.png" mode=""></image>
					<text>{{i18n.text12}}</text>
				</view>
			</view>
			<view class="nav2" @click="copyLink">
				<image src="../static/img/6648475c9ce2a0de740764dd14a8059.png" mode=""></image>
				<text>{{i18n.text13}}</text>
			</view>
			<view class="nav3"></view>
			<view class="mat">
				<image src="../static/img/mat1.png"></image>
				<text>{{i18n.text14}}</text>
				<image src="../static/img/mat2.png"></image>
			</view>
			<view class="banner3">
				<imgsBanner :imgList='imgList' :currentImg='currentImg'></imgsBanner>
			</view>			
			<view class="ecd">{{i18n.text15}}</view>
			<view class="img">
				<image v-for="item in data1" @click="openLink(item.link)" :src="host+item.img" mode="aspectFit"></image>
				<!-- <image style="width: 146rpx;" src="../static/img/tc38@2x.png" mode="widthFix"></image>
				<image style="width: 104rpx;" src="../static/img/tc40@2x.png" mode="widthFix"></image>
				<image style="width: 172rpx;" src="../static/img/HAZECRYPTO@2x.png" mode="widthFix"></image> -->
			</view>
			<view class="ecd">{{i18n.text16}}</view>
			<view class="img">
				<image v-for="item in data2" @click="openLink(item.link)" :src="host+item.img" mode="aspectFit"></image>
				<!-- <image style="width: 144rpx;" src="../static/img/tc24@2x.png" mode="widthFix"></image>
				<image style="width: 100rpx;" src="../static/img/tc25@2x.png" mode="widthFix"></image>
				<image style="width: 154rpx;" src="../static/img/tc26@2x.png" mode="widthFix"></image>
				<image style="width: 161rpx;" src="../static/img/tc32@2x.png" mode="widthFix"></image> -->
			</view>
			<view class="ecd">{{i18n.text17}}</view>
			<view class="img">
				<image v-for="item in data3.slice(0,4)" @click="openLink(item.link)" :src="host+item.img" mode="aspectFit"></image>
				<!-- <image style="width: 119rpx;" src="../static/img/tc42@2x.png" mode="widthFix"></image>
				<image style="width: 120rpx;" src="../static/img/tc43@2x.png" mode="widthFix"></image>
				<image style="width: 116rpx;" src="../static/img/tc30@2x.png" mode="widthFix"></image> -->
			</view>
			<view class="img">
				<image v-for="item in data3.slice(4)" @click="openLink(item.link)" :src="host+item.img" mode="aspectFit"></image>
				<!-- <image style="width: 110rpx;" src="../static/img/tc27@2x.png" mode="widthFix"></image>
				<image style="width: 147rpx;" src="../static/img/1e32479263f2a1f201714032e0c186b.png" mode="widthFix"></image>
				<image style="width: 158rpx;" src="../static/img/83d6026cb7f60af8e1d3a0904064de5.png" mode="widthFix"></image>
				<image style="width: 103rpx;" src="../static/img/tc45@2x.png" mode="widthFix"></image> -->
			</view>
			<!-- <view class="img">
				<image style="width: 111rpx;" src="../static/img/74876b5725519546522de6c25e865da.png" mode="widthFix"></image>
				<image style="width: 94rpx;" src="../static/img/2d19dc634e69edd9bc4e426d16df24b.png" mode="widthFix"></image>
			</view>	 -->
			<view class="ecd">{{i18n.text18}}</view>
			<view class="img">
				<image v-for="item in data4" @click="openLink(item.link)" :src="host+item.img" mode="aspectFit"></image>
				<!-- <image style="width: 172rpx;" src="../static/img/MD@2x.png" mode="widthFix"></image>
				<image style="width: 146rpx;" src="../static/img/tc31@2x.png" mode="widthFix"></image> -->
			</view>	
		</view>
		<bottoms></bottoms>
		<accounts></accounts>
		<!-- <u-popup v-model="show" mode="center" border-radius="40">
			<view class="popup">
				<view class="li" v-for="(item,index) in langlist" @click="langSelect(index)">
					<view>
						<image :src="'../static/img/lang'+(index+1)+'.png'" mode=""></image>
						<text>{{item}}</text>
					</view>
				</view>
			</view>			
		</u-popup> -->
	</view>
</template>

<script>
	import headers from '@/components/header_top.vue';
	import bottoms from '@/components/bottom.vue';
	import wallets from '@/components/walletconnect.vue';
	import langs from '@/components/langSelect.vue';
	import langp from '@/components/langp.vue';
	import imgsBanner from '@/components/imgsBanner-tag.vue';
	import js_sdk from '../js_sdk/ican-H5Api/ican-H5Api.js';
	import accounts from '@/components/accountChange.vue';
	import diaos from '@/components/diaoconnect.vue';
	
	// import WalletConnect from "@walletconnect/client";
	// import QRCodeModal from "@walletconnect/qrcode-modal";
	// import {ethers} from "@/js_sdk/ethers-v4.min.js";
	// import {BscConnector} from '@binance-chain/bsc-connector';
	export default {
		components: {
			headers,
			bottoms,
			imgsBanner,
			wallets,
			langs,
			langp,
			accounts,
			diaos,			
		},
		data() {
			return {
				diaoShow:false,
				walletShow:false,
				wallet:'',
				langShow:false,
				invite_code:'',
				symbol:['BTC','ETH','BNB','USDT','DOGE','ADA'],
				host:'',
				banner1:[],
				banner2:[],
				// imgList:[
				// 	'../static/img/7b8f94b3dcd2156bf68e3a578f001ed.png',
				// 	'../static/img/0d8b38539921e8d406d2fa2265268bc.png',
				// 	'../static/img/8420d4ad6e82e7129be37610d702e79.png',
				// 	'../static/img/33914bb1ef2947984392a88bf90a2b3.png'
				// ],
				imgList:[],
				currentImg:0,  //当前默认选中
				sc_base_num:'',
				sc_increase:'',
				sc_step:'',
				xz_base_num:'',
				xz_increase:'',
				xz_step:'',
				order:[],
				code:'',
				account:'',
				lang:'',
				data1:[],
				data2:[],
				data3:[],
				data4:[],
			}
		},
		onLoad(ops) {
			this.host = this.$service._api_root;
			this.indexdata();
			this.getimg();
			this.getAsset();
			this.getCode();
			this.getOtherLinks();
			
			// const system_info = uni.getStorageSync('system_info')
			// // console.log(system_info)
			// this.system_lenguage = system_info.language;
			
			if(ops.code){
				this.code = ops.code;
				uni.setStorageSync('code',this.code)
			}
			
			if(uni.getStorageSync('account')){
				this.account = uni.getStorageSync('account')
			}
			
			if(uni.getStorageSync('lang')){
				this.lang = uni.getStorageSync('lang')
			}
			
			if(uni.getStorageSync('wallet')){
				this.wallet = uni.getStorageSync('wallet')
			}
		},
		methods: {
			walletorshow(){
				if(!uni.getStorageSync('account')){
					this.walletShow=true
				}else{
					this.diaoShow=true
				}
			},
			out(){
				this.$service.auth(this.$service.api.logout, "POST", {
				}, function(res) {
					if(res.code==0){
						uni.showToast({
							icon:'success',
							title:res.msg
						})
						uni.clearStorageSync();
						setTimeout(()=>{
							window.location.reload();
						},1500)					
					}else{
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				})	
			},
			getOtherLinks(){
				var self = this;
				this.$service.auth(this.$service.api.getOtherLinks, "GET", {
				}, function(res) {
					if(res.code==0){
						self.data1 = res.data1;			
						self.data2 = res.data2;			
						self.data3 = res.data3;
						self.data4 = res.data4;			
					}
				})	
			},
			openLink(url){
				window.open(url)
			},
			getCode(){
				var self = this;
				this.$service.auth(this.$service.api.getInviteCode, "GET", {
				}, function(res) {
					if(res.code==0){
						self.invite_code = res.info.invite_code;			
					}
				})				
			},
			copyLink(){
				var self = this;
				// uni.setStorageSync('invite_code',self.invite_code);
				// console.log(self.invite_code)
				var url = self.host+'/dist/#/pages/index?code='+self.invite_code;
				uni.setClipboardData({
					data: url,
					success: function () {
						// console.log('success');
						uni.showToast({
							icon: 'success',
							title: self.$t('index').text73,
						})
					}
				});			
			},
			toselect(){
				if(this.code){
					uni.navigateTo({
						url:'/pages/select?code='+this.code
					})
				}else{
					uni.navigateTo({
						url:'/pages/select'
					})
				}				
			},
			tople(s){
				uni.navigateTo({
					url:'/pages/pledgetoken?selectid='+s
				})
			},
			getimg(){
				var self = this;
				this.$service.auth(this.$service.api.image, "POST", {
				}, function(res) {
					if(res.code==0){
						self.banner1 = res.info1.data;
						self.banner2 = res.info2.data;
						for(var i in res.info3.data){
							res.info3.data[i].pic = self.host+res.info3.data[i].pic;
							self.imgList.push(res.info3.data[i]);
						}					
					}
				})
			},
			indexdata(){
				var self = this;
				this.$service.auth(this.$service.api.indexDatas, "POST", {
				}, function(res) {
					if(res.code==0){
						self.sc_base_num = Number(res.data[0].base_num);
						self.sc_increase = Number(res.data[0].increase);
						self.sc_step = Number(res.data[0].step);
						self.xz_base_num = Number(res.data[1].base_num);
						self.xz_increase = Number(res.data[1].increase);
						self.xz_step = Number(res.data[1].step);
						setInterval(()=>{
							self.time();
						}, self.sc_step*1000)
						setInterval(()=>{
							self.time2();
						}, self.xz_step*1000)
					}
				})
				
			},
			time(){
				var self = this;
				self.sc_base_num += Number(self.sc_increase)*1;
			},
			time2(){
				var self = this;
				self.xz_base_num += Number(self.xz_increase)*1;
			},
			getAsset(){
				var self = this;
				this.$service.auth(this.$service.api.onGoingOrder, "POST", {
				}, function(res) {
					if(res.code==0){
						self.order = res.data;
					}
				})
			},
			
		},
		computed: {
			i18n() {
				return this.$t('index')
			}
		}
	}
</script>

<style lang="less">
page{background: #130C17;}
.content{
	.bg{
		width: 750rpx;
		height: 925rpx;
		background: url(../static/img/0d8b38539921e8d406d2fa2265268bc.png)no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 0;
	}
	.header-right{
		display: flex;
		align-items: center;
		border-bottom: 4rpx solid #ECD167;
		position: absolute;
		right: 30rpx;
		top: 86rpx;
		padding-bottom: 8rpx;
		z-index: 222;
		image{
			width: 30rpx;
			height: 24rpx;
			margin-right: 10rpx;
		}
		text{
			color: #ECD167;
		}
	}
	.flex{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 70rpx 30rpx 0;
		.qianbao{
			max-width: 252rpx;
			height: 52rpx;
			line-height: 52rpx;
			border: 2rpx solid #ecd167;
			border-radius: 28rpx;
			text-align: center;
			font-size: 24rpx;
			color: #ECD167;
			padding: 0 30rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		// .lan{
		// 	width: 172rpx;
		// 	height: 52rpx;
		// 	line-height: 52rpx;
		// 	border: 2rpx solid #ecd167;
		// 	border-radius: 28rpx;
		// 	font-size: 24rpx;
		// 	color: #ECD167;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	image{
		// 		width: 38rpx;
		// 		height: 38rpx;
		// 		margin-right: 10rpx;
		// 	}
		// }
	}
	.out{
		width: 172rpx;
		height: 52rpx;
		line-height: 52rpx;
		border: 2rpx solid #ecd167;
		border-radius: 28rpx;
		font-size: 24rpx;
		color: #ECD167;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.main{
		width: 100%;
		position: relative;
		z-index: 222;
		margin: 80rpx auto 0;
		.mat{
			margin: 90rpx auto 0;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 46rpx;
				height: 7rpx;
			}
			text{
				max-width: 80%;
				color: #ECD167;
				font-size: 36rpx;
				font-weight: bold;
				text-align: center;
				padding: 0 30rpx;
			}
		}
		.maw{
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: bold;
			text-align: center;		
			margin: 0 20rpx;
			view{
				padding-top: 32rpx;
			}
		}
		.mad{
			color: #fbca1c;
			font-size: 36rpx;
			font-weight: bold;
			text-align: center;
			padding-top: 20rpx;
		}
		.mac{
			width: 540rpx;
			height: 320rpx;
			background: url(../static/img/320f14404c02061df9c6ba2019fef6c.png)no-repeat;
			background-size: 100% 100%;
			text-align: center;
			margin: 75rpx auto 0;
			border-radius: 40rpx;
			box-shadow: 0 0 30rpx #ECD167;		
			.mac1{color: #FFFFFF;padding-top: 16rpx;}
			.mac2{color: #ECD167;font-size: 40rpx;font-weight: bold;padding-top: 15rpx;overflow: hidden;}
		}
		.banner{
			width: 690rpx;
			border-radius: 40rpx;
			border: 2rpx solid #ECD167;
			margin: 0 auto;
			overflow: hidden;
			/deep/ uni-swiper{
				overflow: hidden;
				.uni-swiper-dot{
					width: 26rpx;
					height: 8rpx;
					border-radius: 20rpx;					
				}
				.uni-swiper-dots-horizontal{
					left: 84%;
				}
				text{
					position: absolute;
					color: #FFFFFF;
					z-index: 222;
					left: 40rpx;
					font-size: 26rpx;
				}
				.text1{padding-top: 30rpx;font-size: 36rpx;}
				.text2{padding-top: 80rpx;}
				.text3{padding-top: 120rpx;}
				image{
					width: 100%;
					height: 100%;
					border-radius: 40rpx;
				}
			}	
		}
		.banner1{		
			height: 206rpx;
			margin-top: 50rpx;
			/deep/ uni-swiper{
				height: 206rpx;
			}		
		}
		.banner2{
			height: 272rpx;
			margin-top: 27rpx;
			/deep/ uni-swiper{
				height: 272rpx;
			}
		}
		.asset{
			width: 690rpx;
			height: 284rpx;
			margin: 0 auto 30rpx;
			border-radius: 38rpx;
			box-shadow: 0 0 30rpx #ECD167;
			color: #FFFFFF;
			.ass1{				
				font-size: 36rpx;
				font-weight: bold;
				padding: 35rpx 64rpx 0;
			}
			.ass2{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 24rpx;
				padding: 20rpx 78rpx 0 64rpx;
				text:nth-child(1){opacity: 0.7;}
			}
		}
		.nav1{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin:  50rpx 30rpx 0;
			view{
				width: 330rpx;
				height: 64rpx;
				border: 2rpx solid #ffffff;
				border-radius: 34rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 36rpx;
					height: 36rpx;
					margin-right: 20rpx;
				}
				text{
					color: #ECD167;
					font-weight: bold;
				}
			}
		}
		.nav2{
			margin: 30rpx 30rpx 0;
			height: 64rpx;
			border: 2rpx solid #ffffff;
			border-radius: 34rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 36rpx;
				height: 36rpx;
				margin-right: 20rpx;
			}
			text{
				color: #ECD167;
				font-weight: bold;
			}
		}
		.nav3{
			width: 100%;
			height: 69rpx;
			background: url(../static/img/b2b19c58b5cecd2e7cb9d55dff688ad.png)no-repeat;
			background-size: 100% 100%;
			margin: 69rpx auto 0;
		}
		.banner3{
			width: 100%;
		}
		
		.ecd{
			color: #ECD167;
			font-size: 36rpx;
			font-weight: bold;
			text-align: center;
			margin: 70rpx auto 0;
		}
		.img{
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin: 33rpx 30rpx 0;
			image{
				// width: 140rpx;
				height: 30rpx!important;
			}
		}
	}
	.popup{
		width: 360rpx;
		padding: 30rpx 0;
		.li{
			display: flex;
			align-items: center;
			margin-left: 50%;
			transform: translate(-40%);
			padding: 30rpx 0;
			view{
				display: flex;
				align-items: center;
				image{
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}
			}		
		}
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
				.item{
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
}
</style>
