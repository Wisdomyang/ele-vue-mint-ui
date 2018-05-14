// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import VueRouter from 'vue-router'
import axios from "axios"
import Vuex from 'vuex'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import store from './vuex/index';
import {routes} from './router/routerConfig'
import { cookieUtils } from './common/utils/cookieUtils'
import './assets/css/common'
import './assets/css/style'
import './assets/css/animate'
import './assets/iconfont/iconfont.css'
import './config/rem'
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueRouter)
Validator.localize('zh_CN', zh_CN);
const veeValidateConfig = {
	errorBagName: 'errors', // change if property conflicts.
    delay: 0,
    locale: 'zh_CN',
    messages: null,
    strict: true
};
Vue.use(VeeValidate,veeValidateConfig);
/* eslint-disable no-new */
const router = new VueRouter({
    mode: 'history', // 去掉hash模式
    routes,
//	scrollBehavior (to,from,savedPosition){
//		if(to.meta.path == 'index'){
//			var ss = window.sessionStorage.getItem('we_scroll');
//			savedPosition.y = ss | 0;
//			return savedPosition
//		}else{
//			return {x:0,y:0}
//		}
//		
//		
//	}
})

router.beforeEach((to,from,next) => {
	if(to.meta.auth && !cookieUtils.getCookie('userName') && !cookieUtils.getCookie('userPhone')){
		next({path:'/login'});
		return;
	}
	next();
})
const app = new Vue({
    router,
    store,
	render:h => h(App)
}).$mount('#app')
