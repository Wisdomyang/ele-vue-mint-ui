<template>
	<div class="confirm-address">
		<mt-header :title="title" fixed>
			<i class="iconfont" style="color: #fff" slot="left" @click="goback()">&#xe682;</i>
			<router-link tag="i" :to="{path: 'searchAddress',query: {userInfo: JSON.stringify(this.userInfo)}}" class="iconfont" style="color: #fff" slot="right">
				&#xe612;
			</router-link>
		</mt-header>
		<section class="footer" v-show="userInfo">
			<ul class="movend-address">
				<li>
					<i class="iconfont">&#xe61e;</i>
					<div>
						<span>{{street}}</span>
						<router-link tag="i" :to="{path: 'searchAddress',query: {userInfo: JSON.stringify(this.userInfo)}}" class="iconfont" style="color: #d7d7d7;">
							&#xe74e;
						</router-link>
					</div>
				</li>
				<li>
					<i></i>
					<span class="ellipsis">{{formattedAddress}}</span>
				</li>
			</ul>
			<div class="save">
				<mt-button class="btn" @click="confirm()">确定</mt-button>
			</div>
		</section>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import { appUtils } from '../../../common/utils/appUtils';
import {mapActions,mapGetters} from 'vuex';
import { AMapService } from '../../../common/class/amap';
export default {
	data () {
		return {
			title: '确认收货地址',
			aMapService: new AMapService(window.app_map,window.app_geolocation,window.app_geocoder,window.app_placeSearch,window.app_marker),
			userInfo: {},
			street: '',
			formattedAddress: ''
		}
	},
	computed: {
		...mapGetters({
			positionResult: 'positionResult'
		})  
	},
	methods: {
		...mapActions([
            'setPositionResult'
		]),
		confirm(){
			this.$router.push({name: 'addAndEditAddress',query: {userInfo: JSON.stringify(this.userInfo)}})
		},
		goback(){
			appUtils.goBack();
		}
	},
	mounted (){
		this.userInfo = JSON.parse(this.$route.query.userInfo);
		if(this.userInfo){
			console.log(this.userInfo)
			this.street = `${this.userInfo.address.addressComponent.street}${this.userInfo.address.addressComponent.streetNumber}`;
			this.formattedAddress = this.userInfo.address.formattedAddress;
			this.aMapService.map.setCenter(this.userInfo.address.position);
		}else{
			this.positionResult && this.aMapService.map.setCenter(this.positionResult.position);
			this.userInfo.address = this.positionResult ? this.positionResult: null;
			this.street = `${this.userInfo.address.addressComponent.street}${this.userInfo.address.addressComponent.streetNumber}`;
			this.formattedAddress = this.userInfo.address.formattedAddress;
		}
		Promise.all([this.aMapService.createMarker(),this.aMapService.reGeocoder()]).then(() => {
			this.aMapService.bindEvent('moveend',() => {
				let pos = this.aMapService.map.getCenter();
				this.aMapService.marker.setPosition([pos.lng,pos.lat])
				this.aMapService.getAddress([pos.lng,pos.lat]).then(res => {
					this.userInfo.address = {
						position: pos,
						addressComponent: res.regeocode.addressComponent,
						formattedAddress: res.regeocode.formattedAddress
					} 
					this.street = `${this.userInfo.address.addressComponent.street}${this.userInfo.address.addressComponent.streetNumber}`;
					this.formattedAddress = this.userInfo.address.formattedAddress;
				})
			})
		}).catch(err => {
			console.log(err)
		})
	}
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/mixin';
@import './confirm-address';

</style>