import Vue from 'vue'
import App from './App'
// import service from 'service.js';
// Vue.prototype.$service = service

import '@/static/js/google_translate.js'
import '@/static/js/href.js'

import uView from "uview-ui";
Vue.use(uView);

Vue.prototype.$gonext=function(e){
	uni.redirectTo({
	    url: e
	});
}

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.host = 'http://916md.qykj2020.cn'
// Vue.prototype.host = 'https://dapp.ii550.com'

Vue.prototype.$request=function(url, method, params){
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data:{...params},
			method: method||'POST',
			success(res) {
				// console.log(res,'main.js')
				// 302重定向的时候跳转登录页(指定哪个接口302的时候跳转登录页)
				if(res.data.code==-2){
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/log_in"
						})
					},1000)			
					return
				}else{
					resolve(res.data)
				}
			},
			fail(err){
				reject(err)
			}
		})
	})
}

const app = new Vue({
    ...App
})
app.$mount()
