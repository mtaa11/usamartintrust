const _api_root ='https://www.filyun.com.cn:2443';
// const _api_root ='http://0402ipfs.qykj2020.cn';
// const _api_root = '/dpc'

const api = {
	index: _api_root + '/index/index' , //首页	
		
}
// 获取数据的封装函数
const auth = function(self, url, method, data, _success){
	var token = uni.getStorageSync('token');
	if (token == '') {
		uni.showToast({
			icon: 'none',
			title: '已退出，请重新登录'
		});
		
		uni.setStorageSync('token','');
		uni.reLaunch({
			url: '/pages/login/login',
		});
	}
	
	var urls = url+'?token='+uni.getStorageSync('token');
	uni.request({
		url: urls,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},		        
		method: method,
		data: data,
		success: res => {
			var res = res.data;
			console.log(res)
			if (res.code == 0) {
				_success(self, res);
			}else if(res.code == -2){
				uni.setStorageSync('token','');
				uni.showToast({
					icon: 'none',
					title: '已退出，请重新登录'
				});
				setTimeout(function(){
					uni.reLaunch({
						url: '/pages/login/login'
					});
				},1500);
			}else{
				_success(self, res);
			}
		},
		fail: res => {
			uni.showToast({
				icon: 'loading',
				title: '接口请求失败'
			});
			// setTimeout(function(){
			// 	uni.reLaunch({
			// 		url: '/pages/login/login'
			// 	});
			// },1500);
		},
	});
}

export default {
	_api_root,
	auth,
	api,
}
