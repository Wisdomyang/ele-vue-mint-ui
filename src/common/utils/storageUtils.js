
export const storageUtils = {

    /*
	**	将字符串转成json对象
	*/	
	transJson(str){
		try{
			JSON.parse(str)
			return JSON.parse(str);
		}catch(e){
			return str;
		}
	},
	
	getSessionStorage(key){
		return this.transJson(window.sessionStorage.getItem(key))
	},
	removceSessionStorage(key){
		window.sessionStorage.removeItem(key)
	},
	setSessionStorage(key,value){
		if(typeof value =='object'){
			value=JSON.stringify(value);
		}
		window.sessionStorage.setItem(key,value)
	},
	getLocalStorage(key){	
		if(window.localStorage){
			return this.transJson(window.localStorage.getItem(key))
		}
		return this.transJson(window.sessionStorage.getItem(key))
	},
 	setLocalStorage (key,value) {
		if(typeof value =='object'){
			value=JSON.stringify(value);
		}
		if(window.localStorage){
    		window.localStorage.setItem(key, value)
		}else{
			window.sessionStorage.setItem(key, value)
		}
  	},
  	removeLocalStorage(key){
 		if(window.localStorage){
    		window.localStorage.removeItem(key)
		}else{
			window.sessionStorage.removeItem(key)
		} 		
  	},
  	clearLocalStorage(){
  		window.localStorage.clear();
  	},
  	clearSessionStorage(){
  		window.sessionStorage.clear();
  	},
  	clearAllStoarge(){
  		this.clearSessionStorage();
  		this.clearLocalStorage();
  	}

    

}