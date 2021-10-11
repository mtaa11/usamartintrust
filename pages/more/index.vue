<template>
	<view class="more">
		<view class="top db-inline-item db-space-between">
			<view>
				<image src="/static/img/topIcon1.png" mode="" class="icon1"></image>
			</view>
			<view @click="$gonext('/pages/index/index')">
				<image src="/static/img/close1.png" mode="" class="icon2"></image>
			</view>
		</view>
		<view class="center">
			<view class="db-inline-item color-7" @click="$gonext('/pages/index/index?activePages=home')">
				<view>
					<image src="/static/img/moreIcon1.png" mode=""></image>
				</view>
				<view>首页</view>
			</view>
			<view class="db-inline-item" @click="$gonext('/pages/index/index?activePages=board')">
				<image src="/static/img/moreIcon2.png" mode=""></image>
				<view>董事会信托</view>
				<view class="icon icon1">2 <text class="notranslate">X</text></view>
			</view>
			<view class="db-inline-item" @click="$gonext('/pages/index/index?activePages=flow')">
				<view>
					<image src="/static/img/moreIcon3.png" mode=""></image>
				</view>
				<view>流动性信托</view>
				<view class="icon icon2">1-1.5X</view>
			</view>
			<view class="db-inline-item" @click="$gonext('/pages/index/index?activePages=loan')">
				<image src="/static/img/moreIcon4.png" mode=""></image>借贷池
			</view>
			<!--  -->
			<view class="db-inline-item" @click="$gonext('/pages/index/index?activePages=my')">
				<view>
					<image src="/static/img/moreIcon5.png" mode=""></image>
				</view>
				<view>我的持仓</view>
				<view class="icon icon3">我的资产</view>
			</view>
			<view class="db-inline-item" @click="$gonext('/pages/index/index?activePages=team')">
				<image src="/static/img/moreIcon6.png" mode=""></image>我的团队
			</view>
			<view class="db-inline-item">
				<image src="/static/img/moreIcon7.png" mode=""></image>MTU生态
			</view>
			<view class="db-inline-item db-space-between lange" @click="show=true">
				<view class="country db-inline-item" v-if="state==1||!state">
					<view><image src="/static/img/china.png" mode=""></image></view>
					<view>中文</view>
				</view>
				<view class="country db-inline-item" v-if="state==2">
					<view><image src="/static/img/English.png" mode=""></image></view>
					<view>英语</view>
				</view>
				<view class="country db-inline-item" v-if="state==3">
					<view><image src="/static/img/Japan.png" mode=""></image></view>
					<view>日语</view>
				</view>
				<view class="country db-inline-item" v-if="state==4">
					<view><image src="/static/img/한국인.png" mode=""></image></view>
					<view>韩语</view>
				</view>
				<view class="country db-inline-item" v-if="state==5">
					<view><image src="/static/img/русский.png" mode=""></image></view>
					<view>俄语</view>
				</view>
				<view class="country"><image src="/static/img/sj.png" mode=""></image></view>
			</view>
			<view class="langeList" v-if="show">
				<view class="country db-inline-item" v-for="(item,i) of langeList" @click="selectOne(item)">
					<view><image :src="item.image" mode=""></image></view>
					<view>{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:false,
				langeList:[
					{
						name:'中文',
						image:'/static/img/china.png',
						state:'1'
					},
					{
						name:'English',
						image:'/static/img/English.png',
						state:'2'
					},
					{
						name:'日语',
						image:'/static/img/Japan.png',
						state:'3'
					},
					{
						name:'韩语',
						image:'/static/img/한국인.png',
						state:'4'
					},
					{
						name:'俄语',
						image:'/static/img/русский.png',
						state:'5'
					}
				],
				state:''
			}
		},
		onShow() {
			var self = this;
			
			var goo = self.getCookie("googtrans")
			console.log(goo)
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
		methods:{
			selectOne(item) {
				var self = this;
				// self.noopsycheid = options.value;
				// self.nav = options.label;
				self.state = item.state;
				// console.log(self.state)
				switch(self.state){
					case '1':
					  this.setCookie('googtrans','/auto/zh-CN')
						// document.cookie="=''"
					break;
					case '2':
					  this.setCookie('googtrans','/auto/en')
						// document.cookie="googtrans=/auto/en"
					break;
					case '3':
					  this.setCookie('googtrans','/auto/ja')
						// document.cookie="googtrans=/auto/en"
					break;
					case '4':
					  this.setCookie('googtrans','/auto/ko')
						// document.cookie="googtrans=/auto/en"
					break;
					case '5':
					  this.setCookie('googtrans','/auto/ru')
						// document.cookie="googtrans=/auto/en"
					break;
				}
				setTimeout(()=>{
					location.reload();
				},200)		
			},
			setCookie(name, value) {
				var exp = new Date();
				exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000);
				document.cookie =
				name + "=" + escape(value) + ";expires=" + exp.toGMTString();
			},
			getCookie(name) {
				var arr,
				reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
				else return null;
			}
		},
		computed: {
			
		}
	}
</script>

<style lang="less" scoped>
	.more {
		.top {
			padding: 30rpx 30rpx 0rpx;

			.link {
				height: 62rpx;
				box-sizing: border-box;
				background-image: linear-gradient(to right, #1E78FF, #31A5FE);
				padding: 0rpx 40rpx;
				border-radius: 32rpx;
				color: #FFFFFF;
				font-size: 28rpx;
				font-weight: bold;
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			image {
				height: 58rpx;
			}
			.icon1 {
				width: 356rpx;
			}

			.icon2 {
				width: 58rpx;
			}
		}

		.center {
			padding: 80rpx;
			font-weight: bolder;
			font-size: 32rpx;
			color: #737B88;

			>view {
				margin-bottom: 60rpx;
				position: relative;

				image {
					width: 56rpx;
					height: 56rpx;
					margin-right: 32rpx;
				}

				.icon {
					position: absolute;
					top: -10rpx;
					padding: 4rpx 20rpx;
					background-image: linear-gradient(to right, #FF8868, #FF3493);
					border-radius: 22rpx;
					font-size: 30rpx;
					color: #FFFFFF;
				}

				.icon1 {
					position: absolute;
					left: 260rpx;
				}

				.icon2 {
					position: absolute;
					top: -10rpx;
					left: 264rpx;
				}

				.icon3 {
					position: absolute;
					top: -10rpx;
					left: 220rpx;
				}
				.country{
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
			.lange{
				margin-bottom: 24rpx;
			}
			.langeList{
				background-color: #F5F9FF;
				padding: 28rpx 40rpx;
				color: #737B88;
				.country{
					margin-bottom: 28rpx;
				}
			}
		}
	}
</style>
