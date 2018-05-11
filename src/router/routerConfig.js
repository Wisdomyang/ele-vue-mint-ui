// 异步路由    （结合高级路由的钩子函数  router.beforeEach  router.afterEach可以控制路由）
const home = resolve =>{
	require.ensure(['../pages/home/home'], () => {
    resolve(require('../pages/home/home'))
  })  
}

const chooseAddress = resolve =>{
	require.ensure(['../pages/address/choose-address/choose-address'], () => {
    resolve(require('../pages/address/choose-address/choose-address'))
  })  
}

const addAndEditAddress = resolve =>{
	require.ensure(['../pages/address/add-and-edit-address/add-and-edit-address'], () => {
    resolve(require('../pages/address/add-and-edit-address/add-and-edit-address'))
  })  
}

const confirmAddress = resolve =>{
	require.ensure(['../pages/address/confirm-address/confirm-address'], () => {
    resolve(require('../pages/address/confirm-address/confirm-address'))
  })  
}

const searchAddress = resolve =>{
	require.ensure(['../pages/address/search-address/search-address'], () => {
    resolve(require('../pages/address/search-address/search-address'))
  })  
}

const userAddress = resolve =>{
	require.ensure(['../pages/address/user-address/user-address'], () => {
    resolve(require('../pages/address/user-address/user-address'))
  })  
}

const login = resolve =>{
	require.ensure(['../pages/login/login'], () => {
    resolve(require('../pages/login/login'))
  })  
}

export const routes = [
	{
		path: '/', 
    	name: 'home',   
    	component: home,
    	//路由元信息  可以将自己定义的一些属性写入， 以便于在路由钩子中判断     
    	meta: {
     	 	path: 'home',
      	title:'首页',
				hasHeader: false,
				hasTabbar: true
    	}
	},
	{
		path: '/chooseAddress', 
		name: 'chooseAddress',   
		component: chooseAddress,
		meta: {
			path: 'chooseAddress',
			title:'选择收获地址',
			hasHeader: false,
			hasTabbar: false
		}
	},
	{
		path: '/addAndEditAddress', 
		name: 'addAndEditAddress',   
		component: addAndEditAddress,
		meta: {
			path: 'addAndEditAddress',
			title:'新增地址',
			hasHeader: true,
			hasTabbar: false
		}
	},
	{
		path: '/confirmAddress', 
		name: 'confirmAddress',   
		component: confirmAddress,
		meta: {
			path: 'confirmAddress',
			title:'确认收货地址',
			hasHeader: false,
			hasTabbar: false
		}
	},
	{
		path: '/searchAddress', 
		name: 'searchAddress',   
		component: searchAddress,
		meta: {
			path: 'searchAddress',
			title:'搜索地址',
			hasHeader: false,
			hasTabbar: false
		}
	},
	{
		path: '/userAddress', 
		name: 'userAddress',   
		component: userAddress,
		meta: {
			path: 'userAddress',
			title:'收货地址',
			hasHeader: false,
			hasTabbar: false,
			auth: true
		}
	},
	{
		path: '/login', 
		name: 'login',   
		component: login,
		meta: {
			path: 'login',
			title:'登录',
			hasHeader: true,
			hasTabbar: false
		}
	},
	{
		path: '*', 
		redirect: '/' 
	}
]
