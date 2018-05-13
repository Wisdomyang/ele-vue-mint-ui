<template>
	<div class="choose-address">
		<mt-header :title="title">
			<i class="iconfont" style="color: #fff" slot="left" @click="goback()">&#xe682;</i>
			<router-link tag="span" :to="{path: 'userAddress'}" style="color: #fff;font-size: 16px" slot="right">
				地址管理
			</router-link>
		</mt-header>
		<section class="search">
			<position-search :isShowCell="false" :isShowBack="false" @click.native="goPage()"></position-search>
			<div class="current-address">
				<div class="title">当前地址</div>
				<div class="address">
					<span>{{`${this.positionResult? this.positionResult.addressComponent.street: ''}`}}</span>
					<div @click="position()">
						<i class="iconfont">&#xe786;</i>
						<span v-show="positionStatus !== 'positioning'">重新定位</span>
						<span v-show="positionStatus === 'positioning'">定位中...</span>
					</div>
				</div>
			</div>
		</section>

		<section class="user-address">
			<div class="title">收货地址</div>
			<!-- 未登陆 -->
			<div class="login-out" v-if="!userName">
				<span>登陆后使用常用的收货地址</span>
				<router-link tag="i" :to="{path: 'login'}">
					登录
				</router-link>
			</div>
			<!-- 已登陆 -->
			<user-address :isShowEdit="false" v-if="userName"></user-address>
			<router-link tag="div" class="add-address" :to="{path: 'addAndEditAddress'}" v-if="userName">
				<span>新增地址</span>
				<i class="iconfont">&#xe74e;</i>
			</router-link>
		</section>
		
		<section class="near-place" v-show="positionStatus !== 'positioning'">
			<div class="title">
				<div class="text">附近地点推荐</div>
				<router-link tag="div" class="more" :to="{path: 'searchAddress'}">
					<span>更多</span><i class="iconfont">&#xe74e;</i>
				</router-link>
			</div>
			<ul class="content">
				<li  v-for="item in positionSearchNearBy" :key="item.id" @click="goHome(item)">{{item.name}}</li>
			</ul>
		</section>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import positionSearch from '../../../components/position-search/position-search';
import userAddress from '../../../components/user-address/user-address';
import { appUtils } from '../../../common/utils/appUtils';
import { mapGetters,mapActions } from 'vuex';
import { AMapService } from '../../../common/class/amap'
export default {
	data () {
		return {
			title: '选择服务地址',
			aMapService: new AMapService(window.app_map,window.app_geolocation,window.app_geocoder,window.app_placeSearch,window.app_marker,window.app_autocomplete)
		}
	},
	components: {
		positionSearch,
		userAddress
	},
	computed: {
		...mapGetters({
			positionResult: 'positionResult',
			positionStatus: 'positionStatus',
			userName: 'userName',
			positionSearchNearBy: 'positionSearchNearBy'
		})  
	},
	methods: {
		...mapActions([
			'setPositionResult',
			'setPositionStatus',
			'setPositionSearchNearBy'
		]),
		// 重新定位
		position(){
			this.$store.dispatch('setPositionStatus','positioning');
			this.aMapService.getCurrentPosition().then(res => {
				this.$store.dispatch('setPositionStatus','success');
				this.$store.dispatch('setPositionResult',res);
				this.aMapService.placeSearch && this.aMapService.placeSearch.setCity(res.addressComponent.citycode);
				this.aMapService.getSearchNearBy('',res.position).then(resp => {
					this.$store.dispatch('setPositionSearchNearBy',resp.poiList.pois);
				}).catch(err => {
					console.log(err);
					Toast('获取附近地址失败');
				})
			}).catch(err => {
				console.log(err);
				this.$store.dispatch('setPositionStatus','fail');
				Toast('定位失败');
			})
		},
		goPage(){
			this.$router.push('searchAddress');
		},
		goHome(item){
			this.aMapService.getAddress(item.location).then(res => {
				let obj = {
					position: item.location,
					addressComponent: res.regeocode.addressComponent,
					formattedAddress: res.regeocode.formattedAddress
				} 
				this.$store.dispatch('setUserSelectAddress',obj)
				this.$router.push({name: 'home'});
			})
		},
		goback(){
			appUtils.goBack();
		}
	},
	mounted (){
		this.positionResult && this.aMapService.getSearchNearBy('',this.positionResult.position).then(res => {
			this.$store.dispatch('setPositionSearchNearBy',res.poiList.pois);
		}).catch(err => {
			console.log(err);
			Toast('获取附近地址失败');
		})
	}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin';
@import './choose-address';

</style>