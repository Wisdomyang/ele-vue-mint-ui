import { storageUtils } from '../utils/storageUtils';
export class AMapService {
    map = null;
    geolocation = null;
    geocoder = null;
    placeSearch = null;
    marker = null;

    constructor(map,geolocation,geocoder,placeSearch,marker){
        this.map = map;
        this.geolocation = geolocation;
        this.geocoder = geocoder;
        this.placeSearch = placeSearch;
        this.marker = marker;

    }

    create(mapContainer){
        return new Promise((resolve,reject) => {
            this.map = new AMap.Map(mapContainer, {
                center: new AMap.LngLat(116.396749,39.918055),
                zoom: 18
            });
            window.app_map = this.map;
            // storageUtils.setSessionStorage('app_map',this.map)
            resolve(this.map);
        })
    }

    rePosition(){
        return new Promise((resolve,reject) => {
           this.map.plugin('AMap.Geolocation', () => {
               this.geolocation = new AMap.Geolocation({
                   enableHighAccuracy: true,//是否使用高精度定位，默认:true
                   timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                   maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                   convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                   showButton: true,        //显示定位按钮，默认：true
                   buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                   buttonOffset: new AMap.Pixel(8, 178),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                   showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
                   showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
                   panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                   zoomToAccuracy:true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                   noGeoLocation: 3, //是否禁止使用浏览器Geolocation定位，默认值为0，可选值0-3
                                       // 0: 可以使用浏览器定位
                                       //	1: 手机设备禁止使用浏览器定位
                                       //	2: PC上禁止使用浏览器定位
                                       //	3: 所有终端禁止使用浏览器定位
               });
               this.map.addControl(this.geolocation);
               window.app_geolocation = this.geolocation;
            //    storageUtils.setSessionStorage('app_geolocation',this.geolocation)
               resolve(this.geolocation);
           });
       })
    }

    getCurrentPosition(){
        return new Promise((resolve,reject) => {
            this.geolocation.getCurrentPosition((status,result) => {
                if(status == 'complete'){
                    resolve(result);
                }else{
                    reject('err');
                }
            });
        })
    }

    reGeocoder(){ 
        return new Promise((resolve,reject) => {
            this.map.plugin('AMap.Geocoder', () => {
                this.geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                window.app_geocoder = this.geocoder;
                // storageUtils.setSessionStorage('app_geocoder',this.geocoder)
                resolve(this.geocoder);
            });
            
        })  
        
    }

    getAddress(lnglatXY){
        return new Promise((resolve,reject) => {
            this.geocoder && this.geocoder.getAddress(lnglatXY, (status, result) => {
                
                if (status === 'complete' && result.info === 'OK') {

                    resolve(result);
                }else{
                    reject('err');
                }
            });   
            
        })     
    }

    rePlaceSearch(city){
        return new Promise((resolve,reject) => {
            this.map.plugin('AMap.PlaceSearch', () => {
                this.placeSearch = new AMap.PlaceSearch({
                    city: city,
                    citylimit: true
                });
                window.app_placeSearch = this.placeSearch;
                // storageUtils.setSessionStorage('app_placeSearch',this.placeSearch)
                resolve(this.placeSearch);
            });
            
        })
    }

    getSearchNearBy(key,r){
        return new Promise((resolve,reject) => {
            this.placeSearch && this.placeSearch.searchNearBy(key,r.position,1000,(status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    console.log(result)
                    resolve(result);
                }else{
                    reject('err');
                }
            });
            
        })
    }

    createMarker(){
        return new Promise((resolve,reject) => {
            this.marker = new AMap.Marker({
                map: this.map,
                position: this.map.getCenter(),
                content:'<i class="iconfont icon-dingwei" style="color:#26a2ff;font-size:26px;"></i>'     
            }); 
            window.app_marker = this.marker;
            // storageUtils.setSessionStorage('app_marker',this.marker)
            resolve(this.marker);
        })
    }
    
    bindEvent(eventName,cb){
        AMap.event.addListener(this.map,eventName,cb)
    }

}