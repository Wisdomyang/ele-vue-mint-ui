import { config } from '../../config/config';

export const cookieUtils = {
    transJson(str){
		try{
			JSON.parse(str)
			return JSON.parse(str);
		}catch(e){
			return str;
		}
	},
    getCookie(key){
		var arr,reg = new RegExp("(^| )"+ key +"=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg)){
			return this.transJson(unescape(arr[2]));
		}else{
			return null;		
		}
	},
	setCookie(key,value,seconds,domain){
		var exp = new Date() , str;
        exp.setTime(exp.getTime() + seconds * 1000);
        if(typeof value =='object'){
			value = JSON.stringify(value);
		}
		str = key + "="+ escape (value) + ";expires=" + exp.toGMTString() + ' ;path=/';
		if(domain)	{
			str += '; domain='+ domain;
        }
		document.cookie = str;
	},
	delCookie(key) {
		var exp = new Date(0);
		document.cookie = key + "="+";expires=" + exp.toGMTString() + ' ;path=/';		
		document.cookie = key + "="+";expires=" + exp.toGMTString() + ' ;path=/; domain='+ config.domain;			
	},
	clearCookie(){
		var cookies = document.cookie.split(';');
		for(var i = 0,len = cookies.length; i < len; i++){
			var index = cookies[i].indexOf('='),
				key = cookies[i].substr(0,index);
			this.delCookie(key);
		}
	}
}