// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import VueRouter from 'vue-router'
import axios from "axios"
import {routes} from './router/routerConfig'
import './assets/css/common'
import './assets/css/style'
import './assets/css/animate'
import './config/rem'
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueRouter)
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

//router.beforeEach((to,from,next)=>{
//	if(from.meta.path == 'index'){
//		var scrollT=document.documentElement.scrollTop || document.body.scrollTop;
//		window.sessionStorage.setItem('we_scroll',scrollT);
//	}
//	
//	next();
//})
const app = new Vue({
	router,
	render:h => h(App)
}).$mount('#app')
