<template>
	<div class="confirm-address">
		<mt-header :title="title" fixed>
			<i class="iconfont" style="color: #fff" slot="left" @click="goback()">&#xe682;</i>
			<router-link tag="i" :to="{path: 'chooseAddress'}" class="iconfont" style="color: #fff" slot="right">
				<i class="iconfont">&#xe612;</i>
			</router-link>
		</mt-header>
		<amap @getCurrentPosition="getCurrentPosition($event)"></amap>
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
					<i class="formattedAddress"></i>
					<span class="ellipsis">{{formattedAddress}}</span>
				</li>
			</ul>
				
				
			
			<div class="save">
				<mt-button class="btn">确定</mt-button>
			</div>
		</section>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import {ajax} from "../../../common/ajaxUtils/ajax";
import amap from '../../../components/amap/amap';
export default {
	data () {
		return {
			title: '确认收货地址',
			street: '',
			formattedAddress: ''
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
				this.street = `${e.addressComponent.street}${e.addressComponent.streetNumber}`
				this.formattedAddress = e.formattedAddress;
			}
			
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