<template>
	<view class="content">
	  <!-- 头部 -->
      <Top :right_url="right_url" :maskShow.sync="maskShow" :trade_address.sync="address"></Top>
	  <!-- 遮罩层 -->
	  <WalletPop :Show.sync="maskShow"></WalletPop>
	  <!-- 首页 -->
	  <Home v-if="activePages=='home'" :activePages.sync="activePages" :address.sync="address"></Home>
	  <!-- 公告 -->
	  <NoticeList v-if="activePages=='noticeList'" :activePages.sync="activePages"></NoticeList>
	  <!-- 公告 -->
	  <NoticeListDetail v-if="activePages=='noticeListDetail'" :activePages.sync="activePages"></NoticeListDetail>
	  <!-- 董事 -->
	  <Board v-if="activePages=='board'" :activePages.sync="activePages"></Board>
	  <!-- 升级记录 -->
	  <BoardLog v-if="activePages=='boardLog'"></BoardLog>
	  <!-- 流动性 -->
	  <Flow v-if="activePages=='flow'" :activePages.sync="activePages"></Flow>
	  <!-- 流动性持仓明细 -->
	  <FlowLog v-if="activePages=='flowLog'" :activePages.sync="activePages"></FlowLog>
	  <!-- 流动性持仓明细详情 -->
	  <FlowLogDetail v-if="activePages=='flowLogDetail'" :activePages.sync="activePages"></FlowLogDetail>
	  <!-- 空头奖励 -->
	  <Airdrop v-if="activePages=='airdrop'"></Airdrop>
	  <!-- 借贷 -->
	  <Loan v-if="activePages=='loan'"></Loan>
	  <!-- 借贷记录 -->
	  <LoanLog v-if="activePages=='loanLog'"></LoanLog>
	  <!-- 我的持仓 -->
	  <My v-if="activePages=='my'"></My>
	  <!-- 我的资金明细 -->
	  <MyLog v-if="activePages=='myLog'"></MyLog>
	  <!-- 收益明细 -->
	  <MyLogDetail v-if="activePages=='myLogDetail'"></MyLogDetail>
	  <!-- 提币明细 -->
	  <WalletLog v-if="activePages=='walletLog'"></WalletLog>
	  <!-- 我的团队 -->
	  <Team v-if="activePages=='team'"></Team>
	</view>
</template>

<script>
	import Top from '@/components/top.vue'
	import WalletPop from '@/components/walletPop.vue'
	import Home from '@/pages/index/home.vue'
	import NoticeList from '@/pages/index/noticeList.vue'
	import NoticeListDetail from '@/pages/index/noticeListDetail.vue'
	import Board from '@/pages/index/board.vue'
	import BoardLog from '@/pages/index/boardLog.vue'
	import Flow from '@/pages/index/flow.vue'
	import FlowLog from '@/pages/index/flowLog.vue'
	import FlowLogDetail from '@/pages/index/flowLogDetail.vue'
	import Airdrop from '@/pages/index/airdrop.vue'	
	import Loan from '@/pages/index/loan.vue'
	import LoanLog from '@/pages/index/loanLog.vue'
	import My from '@/pages/index/my.vue'
	import MyLog from '@/pages/index/myLog.vue'
	import MyLogDetail from '@/pages/index/myLogDetail.vue'
	import WalletLog from '@/pages/index/walletLog.vue'
	import Team from '@/pages/index/team.vue'
	export default {
		components: {
			Top,
			WalletPop,
			Home,
			NoticeList,
			NoticeListDetail,
			Board,
			BoardLog,
			Flow,
			FlowLog,
			FlowLogDetail,
			Airdrop,
			Loan,
			LoanLog,
			My,
			MyLog,
			MyLogDetail,
			WalletLog,
			Team
		},
		data() {
			return {
               right_url:'/pages/more/index',
			   maskShow:false,
			   activePages:'',
			   address:''
			 }
		},
		onShow() {
			if(this.$route.query.activePages){
				this.activePages=this.$route.query.activePages
			}else if(uni.getStorageSync('activePages')){
				this.activePages=uni.getStorageSync('activePages')
			}
			if(this.$route.query.address){
				this.address=this.$route.query.address
			}
		},
		mounted() {
		},
		updated(){
			console.log(this.activePages)
		},
		methods: {

		},
		computed: {

		}
	}
</script>

<style lang="less" scoped>
	.content {
		height: 100vh;
		overflow-y: scroll;
	}
</style>
