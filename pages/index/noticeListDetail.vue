<template> 
	<view class="noticeList">
		<view class="font-24 font-B color-7 font-c margin-t22 margin-b28">公告详情</view>
		<view class="dataList">
			<view class="List">
				<view class="margin-b12">
					<view class="font-14 font-B">{{info.title}}</view>
				</view>
				<view v-html="info.content" class="content"></view>
				<view class="margin-t12 font-12 color-8">
					<view>{{info.create_time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			}
		},
		created() {
			this.$request("/index/index/getnoticedetails", "post",{id:this.$route.query.id}).then(res => {
				if (res.code == 200) {
					this.info=res.info
				}
			})
		},
		methods: {},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.noticeList{
		.dataList {
		   padding: 0rpx 30rpx;
		   /deep/ img{
		   	width: 100%;
		   }
		}
	}
</style>
