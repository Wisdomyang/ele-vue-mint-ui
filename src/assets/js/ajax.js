import Vue from 'vue'
import axios from "axios"
//import {utils} from './utils'
//import {auth} from './auth'
//import {config,service} from './config';
let _options=(options)=>{
	return options || ''
}
let _request=(method,url,data,options)=>{
//	if(config.mode=="localhost"){
//		url=url.replace(service.common,'');
//	}
	let _reqOptions={
		url:url,
		method:method,
		headers:{},
		params:{},
		data:data,
		withCredentials: true,
		timeout:15000
	}
	if (options.headers) {
	    _reqOptions.headers = options.headers;
	}

	if (options.params) {
	    _reqOptions.params = options.params;
	}
	return new Promise((resolve,reject)=>{
//		if(utils.getCookie('Authorization')){
			_reqOptions.headers.Accept='application/json';
//			_reqOptions.headers.Authorization=utils.getCookie('Authorization');			
			axios(_reqOptions)
			.then(res=>{
				resolve(res.data)
			})
			.catch(err=>{
				console.log('ajax error :',err)
				reject(err)
			})
//		}else{
//			auth.init().then(res=>{
//				_reqOptions.headers.Accept='application/json';
//				_reqOptions.headers.Authorization=utils.getCookie('Authorization');
//				axios(_reqOptions)
//				.then(res=>{
//					resolve(res.data)
//				})
//				.catch(err=>{
//					console.log('ajax error :',err)
//					reject(err)
//				})
//			})
//		}

	})		

}
export const ajax ={
	get(url,options){
		return _request('GET',url,null,_options(options))
	},
	post(url,data,options){
		return _request('POST',url,data,_options(options))
	},
	patch(url,data,options){
		return _request('PATCH',url,data,_options(options))
	},
	put(url,data,options){
		return _request('PUT',url,data,_options(options))
	}
}