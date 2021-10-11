<template> 
	<view class="noticeList">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b28">公告列表</view>
		<view class="dataList">
			<view class="List">
				<view class="ListItem" v-for="(item,i) of list" @click="$gonext('/pages/index/index?activePages=noticeListDetail&id='+item.article_id)">
					<view class="">
						<view class="font-14 font-B">{{item.title}}</view>
					</view>
					<view class="margin-t12 font-12 color-8">
						<view>{{item.create_time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:1,
				list:[]
			}
		},
		created() {
			this.showdata()
		},
		methods: {
			changeActive(item){
				this.active=item
				this.showdata()
			},
			showdata() {
				this.$request("/index/index/getnoticelist", "GET").then(res => {
					if (res.code == 200) {
						this.list=res.info
					}
				})
				console.log(this.list,'资产记录')
			},
		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.noticeList{
		.tab{
			width: 80%;
			margin: 44rpx auto 38rpx;
			border:2rpx solid #1E78FF;
			border-radius: 44rpx;
			display: flex;
			margin-bottom: 32rpx;
			>view{
				width: 50%;
				padding: 22rpx 72rpx;
				text-align: center;
				color: #1E78FF;
			}
			.active{
				background-color: #1E78FF;
				color: #FFFFFF;
				border-radius: 44rpx;
			}
		}
		.dataList {
           padding: 0rpx 30rpx;
		   .List{
			   &Item{
				   border-bottom: 2rpx solid #EEF5FF;
				   padding: 32rpx 0rpx;
			   }
		   }
		}
	}
</style>
