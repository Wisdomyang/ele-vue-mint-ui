<template>
	<div class="confirm-address">
		<mt-header :title="title" fixed>
			<i class="iconfont" style="color: #fff" slot="left" @click="goback()">&#xe682;</i>
			<router-link tag="i" :to="{path: 'searchAddress'}" class="iconfont" style="color: #fff" slot="right">
				&#xe612;
			</router-link>
		</mt-header>
		<section class="footer" v-show="address">
			<ul class="movend-address">
				<li>
					<i class="iconfont">&#xe61e;</i>
					<div>
						<span>{{`${address ? address.addressComponent.street: null}${address ?address.addressComponent.streetNumber: null}`}}</span>
						<i class="iconfont" style="color: #d7d7d7;">&#xe74e;</i>
					</div>
				</li>
				<li>
					<i></i>
					<span class="ellipsis">{{address ? address.formattedAddress : null}}</span>
				</li>
			</ul>
			<div class="save">
				<mt-button class="btn" @click="positionAgianFun()">确定</mt-button>
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
			address: null
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
		positionAgianFun(){
			
		},
		goback(){
			appUtils.goBack();
		}
	},
	mounted (){
		if(this.address){  // 父组件传入的经纬度， 没有则用展示定位的地址
		}else{
			this.positionResult && this.aMapService.map.setCenter(this.positionResult.position);
			this.address = this.positionResult ? this.positionResult: null
		}
		Promise.all([this.aMapService.createMarker(),this.aMapService.reGeocoder()]).then(() => {
			this.aMapService.bindEvent('moveend',() => {
				let pos = this.aMapService.map.getCenter();
				this.aMapService.marker.setPosition([pos.lng,pos.lat])
				this.aMapService.getAddress([pos.lng,pos.lat]).then(res => {
					this.address = res.regeocode;
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