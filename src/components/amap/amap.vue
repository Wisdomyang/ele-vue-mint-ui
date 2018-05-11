<template>
	<div :id="amapId" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 1" v-show="isShow"></div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
export default{
	name:'amap',
	data(){
		return {
            map: null,
            geolocation: null,
            geocoder: null,
            placeSearch: null,
            address: null
		}
    },
    props:{
        again: {
            type: Boolean,
            default: false
        },
        positionPlaceSearch: {
            type: Boolean,
            default: false
        },
        isShow: {
            type: Boolean,
            default: false
        },
        amapId: String
    },
    computed: {
        ...mapGetters({
			positionResult: 'positionResult'
		})  
    },
	methods:{
        ...mapActions([
            'setPositionResult',
            'setPositionStatus',
            'setPositionSearchNearBy'
		]),
		create(){
            return new Promise((resolve,reject) => {
                this.map = new AMap.Map(this.amapId, {
                    center: new AMap.LngLat(116.396749,39.918055),
                    zoom: 18
                });
                resolve(this.map);
            })
        },
        position(){
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
                    this.$store.dispatch('setPositionStatus','positioning');
                    this.geolocation.getCurrentPosition((status,result) => {
                        if(status == 'complete'){
                            this.$store.dispatch('setPositionStatus','success');
                            this.$store.dispatch('setPositionResult',result);
                            resolve(result);
                        }else{
                            // UserService.showTips('定位失败');
                            this.$store.dispatch('setPositionStatus','fail');
                            this.map.setZoomAndCenter(18,[116.396749,39.918055]);
                            reject('err');
                        }
                    });
                    
                });
            })
            
        },
        regeocoder(){ 
            return new Promise((resolve,reject) => {
                this.map.plugin('AMap.Geocoder', () => {
                    this.geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    resolve(this.geocoder);
                });
                
            })  
            
        },
        getAddress(lnglatXY){
            this.geocoder && this.geocoder.getAddress(lnglatXY, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    this.$store.dispatch('setPositionResult',result.regeocode)  // 还是要向外传递地址
                }
            });      
        },

        rePlaceSearch(city){
            return new Promise((resolve,reject) => {
                this.map.plugin('AMap.PlaceSearch', () => {
                    this.placeSearch = new AMap.PlaceSearch({
                        city: city,
                        citylimit: true
                    });
                    resolve(this.placeSearch);
                });
                
            })
        },

        getSearchNearBy(param){
            this.placeSearch && this.placeSearch.searchNearBy('',param.position,1000,(status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    this.$store.dispatch('setPositionSearchNearBy',result.poiList.pois);
                }
            });
        }

    },
    watch: {
        again(newV){
            this.position().then(res => {
                if(this.placeSearch){
                    this.placeSearch.setCity(res.addressComponent.citycode)
                    this.getSearchNearBy(res);
                }else{
                    this.rePlaceSearch(res.addressComponent.citycode).then(resp => {
                        this.getSearchNearBy(res);
                    });
                }
                
            }).catch(err => {
                console.log(err);
            });
        },
        positionPlaceSearch(newV){
            this.positionResult && this.getSearchNearBy(this.positionResult);
        },
        $route(to){
            if(to.meta.path === 'confirmAddress'){
                if(this.address){  // 父组件传入的经纬度， 没有则用展示定位的地址
                }else{
                    this.map.setCenter(this.positionResult.position);
                }
                
                let centerMarker = new AMap.Marker({
                    map: this.map,
                    position: this.map.getCenter(),
                    content:'<i class="iconfont icon-dingwei" style="color:#26a2ff;font-size:26px;"></i>'     
                });   
                this.regeocoder().then(res => {
                    AMap.event.addListener(this.map,'moveend',() => {
                        let pos = this.map.getCenter();
                        centerMarker.setPosition([pos.lng,pos.lat])
                        this.getAddress([pos.lng,pos.lat])
                    })   
                });
                
            }
        }
    },
    mounted () {
        this.create().then(map => {
            this.position().then(res => {
                this.rePlaceSearch(res.addressComponent.citycode);
            });
            
        });
    }
	
}
</script>
<style lang="scss" scoped>

</style>