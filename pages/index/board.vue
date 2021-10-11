<template>
	<view class="board">
		<image src="../../static/img/more.png" mode="" class="more" @click="$gonext('/pages/index/index?activePages=boardLog')"></image>
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b20">董事会信托</view>
		<view class="font-c font-B font-18 margin-b20">当前市场规模</view>
		<view class="header_title font-c" v-if="info.current">
			<text>${{info.current}}</text>
		</view>
		<view class="now">
			<view class="nowContent" :key="key">
				<view class="nowLev">当前等级：V{{leveled||0}}</view>
				<!-- <view class="nowLev" v-if="!leveled">当前等级：V0</view> -->
				<view class="db-flex">
					<view class="margin-r50">
						<view class="font-13 color-9">全网质押总量</view>
						<view class="font-18 color-10">{{info.all}}</view>
					</view>
					<view>
						<view class="font-13 color-9">我的质押</view>
						<view class="font-18 color-11">{{info.my}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="number padding-l15 padding-r15">
			<view class="numberItem margin-b14 db-flex db-space-between font-B" @click="showPop">
				<view class="color-8" :key="key">{{level?level:'选择需要升级的等级'}}</view>
				<view>
					<image src="../../static/img/sj.png" mode=""></image>
				</view>
			</view>
			<view class="numberItem db-flex db-space-between font-B margin-b14">
				<view>需消耗(USDT)</view>
				<view :key="key">{{money}}</view>
			</view>
			<view class="numberItem db-flex db-space-between font-B">
				<view>可用余额</view>
				<view>{{mydata.usdt}}</view>
			</view>
			<view class="numberBtn" @click="getBoard()">升级</view>
		</view>
		<u-picker mode="multiSelector" v-model="show" :default-selector="[index]" :range="multiSelector"
			range-key="level" confirm-text="确定" cancel-text="" @columnchange="columnchange" :mask-close-able="false">
		</u-picker>
<!-- 		<view v-if="closeShow" class="close">
			<view>选择需要升级的等级</view>
			<image src="/static/img/close1.png" mode="" @click="show=false,closeShow=false"></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				closeShow: false,
				info: {},
				leveled:'',
				multiSelector: [],
				index: '',
				money:0,
				id:'',
				level:'',
				key:1,
				mydata:''
			}
		},
		created() {
			this.$request('/index/member/index', 'GET').then(res => {
				if (res.code == 200) {
					this.mydata = res.info;
				}
			});
			this.showdata()
		},
		mounted() {},
		methods: {
			gonext(right_url) {
				uni.navigateTo({
					url: right_url
				})
			},
			showPop() {
				this.show = true
				setTimeout(() => {
					this.closeShow = true
				}, 270)
			},
			showdata() {
				this.$request("/index/dong/levellist", "GET").then(res => {
					if (res.code == 0) {
						this.leveled=res.level
						this.info = res
						this.key++
						// if(res.level){
						// 	this.index=res.level
						// }else{
						// 	this.index=0
						// }
						this.index=0
						var list=[]
						list.push('')
						for(var i=0;i<res.info.length;i++){
							if(i>res.level-1){
								list.push(res.info[i])
							}
						}
						// this.level=list[1].level
						this.multiSelector.push(list)
						console.log(this.multiSelector)
						// console.log('董', this.info.current)
					}
				})
			},
			columnchange(column) {
				var index=column.index
				var item=this.multiSelector[0][index]
				this.money=item.usdt
				this.id=item.id
				this.level=item.level
				this.key++
				console.log(this.level,this.money)
			},
			getBoard(){
				this.$request("/index/dong/uplevel", "POST",{id:this.id}).then(res => {
					uni.showToast({
						icon:'none',
						title:res.msg
					})
					if (res.code == 0) {
						setTimeout(()=>{
							location.reload();
						},200)	
					}
				})
			},
			changeActive(active){
				this.$emit('update:activePages',active)
			}
		},
		computed: {

		}
	}
</script>
<style>
	/deep/ .u-drawer__scroll-view {
		height: 290px !important
	}
</style>

<style lang="less" scoped>
	.board {
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

		.now {
			padding: 0rpx 12rpx;

			&Content {
				width: 100%;
				background-image: url(../../static/img/boardBg1.png);
				background-size: 100% 100%;
				padding: 64rpx;
				margin-top: 64rpx;
			}

			&Lev {
				color: #887502;
				font-size: 40rpx;
				font-weight: bold;
				margin-bottom: 40rpx;
			}
		}

		.number {
			&Item {
				background-color: #F5F9FF;
				padding: 34rpx 40rpx;
				border-radius: 16rpx;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}

			&Btn {
				width: 100%;
				padding: 22rpx 0rpx;
				text-align: center;
				border-radius: 16rpx;
				color: #FFFFFF;
				background-image: linear-gradient(90deg, #1E78FF, #31A5FE);
				margin-top: 90rpx;
			}
		}

		.close {
			position: absolute;
			bottom: 201px;
			right: 0rpx;
			z-index: 999999;
			width: 100%;
			height: 56rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: flex-end;
			font-weight: bolder;
			font-size: 30rpx;

			image {
				position: absolute;
				top: 0rpx;
				right: 30rpx;
				width: 56rpx;
				height: 56rpx;
			}
		}
	}
</style>
