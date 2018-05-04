import axios from "axios"

let _request = (method,url,data,options = {}) => {
	
	let initOptions={
		url:url,
		method:method,
		headers:{},
		params:{},
		data:data,
		withCredentials: false,
		timeout: 10000
	}
	
	let _reqOptions = Object.assign({},initOptions,options)
	return new Promise((resolve,reject) => {
		axios(_reqOptions)
		.then(res => {
			resolve(res.data)
		})
		.catch(err => {
			console.log('ajax error :',err)
			reject(err)
		})
	})		

}
export const ajax ={
	get(url,options){
		return _request('GET',url,null,options)
	},
	post(url,data,options){
		return _request('POST',url,data,options)
	},
	patch(url,data,options){
		return _request('PATCH',url,data,options)
	},
	put(url,data,options){
		return _request('PUT',url,data,options)
	}
}