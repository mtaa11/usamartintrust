<script>
	export default {
		onLoad() {
			 // uni.hideTabBar()
		},
		onLaunch: function() {
			if(this.$route.query.activePages){
				var activePages=this.$route.query.activePages
				uni.setStorageSync('activePages',activePages)
			}else{
				uni.setStorageSync('activePages','home')
			}
			console.log('App Launch')
			// uni.hideTabBar({})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	// @font-face{
	// 	font-family: "myFirstFont";
	// 	src: url('~@/static/fonts/PingFang_Medium.ttf');
	// 	font-weight: normal;
	//     font-style: normal;
	// }
	// .content{font-family:"myFirstFont"}
	page{color: #222222;font-size: 30rpx;}
</style>
