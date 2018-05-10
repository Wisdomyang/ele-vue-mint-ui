<template>
	<div class="confirm-address">
		<mt-header :title="title" fixed>
			<i class="iconfont" style="color: #fff" slot="left" @click="goback()">&#xe682;</i>
			<router-link tag="i" :to="{path: 'searchAddress'}" class="iconfont" style="color: #fff" slot="right">
				&#xe612;
			</router-link>
		</mt-header>
		<amap @getCurrentPosition="getCurrentPosition($event)" :again="positionAgian" :isShow="true" :amapId="'confirm-address'"></amap>
		<section class="footer" v-show="street">
			<ul class="movend-address">
				<li>
					<i class="iconfont">&#xe61e;</i>
					<div>
						<span>{{street}}</span>
						<i class="iconfont" style="color: #d7d7d7;">&#xe74e;</i>
					</div>
				</li>
				<li>
					<i></i>
					<span class="ellipsis">{{formattedAddress}}</span>
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
import {ajax} from "../../../common/ajaxUtils/ajax";
import amap from '../../../components/amap/amap';
import { appUtils } from '../../../common/appUtils/appUtils';
export default {
	data () {
		return {
			title: '确认收货地址',
			street: '',
			formattedAddress: '',
			positionAgian: false
		}
	},
	components: {
		amap
	},
	methods: {
		getCurrentPosition(e){
			if(e.regeocode){
				this.street = `${e.regeocode.addressComponent.street}${e.regeocode.addressComponent.streetNumber}`
				this.formattedAddress = e.regeocode.formattedAddress;
			}else{
				this.street = `${e.addressComponent.street}${e.addressComponent.streetNumber}`;
				this.formattedAddress = e.formattedAddress;
			}
			
		},
		positionAgianFun(){
			this.positionAgian = !this.positionAgian;
		},
		goback(){
			appUtils.goBack();
		}
	},
	mounted (){
		
	}
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/mixin';
@import './confirm-address';

</style>