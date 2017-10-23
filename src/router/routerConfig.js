// 异步路由    （结合高级路由的钩子函数  router.beforeEach  router.afterEach可以控制路由）
const home = resolve =>{
	require.ensure(['../pages/home/home'], () => {
    resolve(require('../pages/home/home'))
  })  
}
//const pinglun = resolve =>{
//	require.ensure(['../views/pinglun'], () => {
//  resolve(require('../views/pinglun'))
//})  
//}
//const scroll = resolve =>{
//	require.ensure(['../views/scroll'], () => {
//  resolve(require('../views/scroll'))
//})  
//}
//const swiper = resolve =>{
//	require.ensure(['../views/swiper'], () => {
//  resolve(require('../views/swiper'))
//})  
//}
//const parallax = resolve =>{
//	require.ensure(['../views/parallax'], () => {
//  resolve(require('../views/parallax'))
//})  
//}
export const routes = [
	{
		path: '/', 
    	name: 'home',   // 用于router.push()
    	component: home,
    	//路由元信息  可以将自己定义的一些属性写入， 以便于在路由钩子中判断     
    	meta: {
     	 	path: 'home',
      		title:'elm',
      		
    	}
	},
//	{
//		path: '/pinglun', 
//	    name: 'pinglun',
//	    component: pinglun
//	},
//	{
//		path: '/swiper', 
//	    name: 'swiper',
//	    component: swiper
//	},
//	{
//		path: '/parallax', 
//	    name: 'parallax',
//	    component: parallax
//	},
//	{
//		path: '/scroll', 
//  	name: 'scroll',   // 用于router.push()
//  	component: scroll,
//  	//路由元信息  可以将自己定义的一些属性写入， 以便于在路由钩子中判断     
//  	meta: {
//   	 	path: 'scroll',
//    		title:'旺管家商城',
//    		
//  	}
//	}
	{
      path: '*', 
      redirect: '/' 
    }
]
