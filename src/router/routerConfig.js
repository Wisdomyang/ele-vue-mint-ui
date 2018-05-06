// 异步路由    （结合高级路由的钩子函数  router.beforeEach  router.afterEach可以控制路由）
const home = resolve =>{
	require.ensure(['../pages/home/home'], () => {
    resolve(require('../pages/home/home'))
  })  
}

export const routes = [
	{
		path: '/', 
    	name: 'home',   // 用于router.push()
    	component: home,
    	//路由元信息  可以将自己定义的一些属性写入， 以便于在路由钩子中判断     
    	meta: {
     	 	path: 'home',
      	title:'elm',
				hasHeader: false,
				hasTabbar: true
    	}
	},
	{
      path: '*', 
      redirect: '/' 
    }
]
