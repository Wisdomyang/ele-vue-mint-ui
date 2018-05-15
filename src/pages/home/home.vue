<template>
	<div class="home">
		<section class="header">
			<router-link tag="div" :to="{path: 'chooseAddress'}">
				<i class="iconfont">&#xe61e;</i>
				<span>{{`${this.userSelectAddress? this.userSelectAddress.addressComponent.street: ''}${this.userSelectAddress? this.userSelectAddress.addressComponent.streetNumber: ''}`}}</span>
			</router-link>
		</section>
		<mt-swipe class="home_swiper" :auto="0">
			<mt-swipe-item v-for="item in foodTypes">
				<div class="category_container" v-for="foodType in item" :key="foodType.id">
					<div class="img_box">
						<img :src="`${config.service.imgBaseUrl}${foodType.image_url}`" :alt="foodType.title">
					</div>
					<div class="text">
						{{foodType.title}}
					</div>
				</div>
			</mt-swipe-item>
		</mt-swipe>
		<section class="nearly_seller">
			<div class="section_title">
				<i class="iconfont">&#xe647;</i>
				<span>附近商家</span>
			</div>
			<ul class="section_content">
				<li>
					<div class="li_img_box"></div>
					<div class="li_content">
						<div class="top">
							<div class="badge">品牌</div>
							<div class="title ellipsis">韩国炸鸡的刷卡缴费开始的咖啡机水电费看见是看得见反倒是科技</div>
							<ul>
								<li>准</li>
								<li>保</li>
							</ul>
						</div>
						<div class="center">
							<div class="score">123</div>
							<div class="score_num">4.2</div>
							<div class="monthly_sales">月售669单</div>
							<ul>
								<li>蜂鸟转送</li>
								<li>必答</li>
							</ul>
						</div>
						<div class="bottom">
							<div class="deliveryfee">￥20元起售<span>/</span>配送费￥3</div>
							<div class="distance">1.87.km<span>/</span>59分钟</div>
						</div>
					</div>
				</li>
			</ul>
		</section>

		<mt-popup v-model="popupVisible" :closeOnClickModal="false" v-if="!userSelectAddress && userAddressList.length > 0">
			<div class="user_address">
				<div class="content">
					<div class="title">
						<span>请选择收货地址</span>
						<i class="iconfont icon-guanbi" @click="closeModal()"></i>
					</div>
					<ul class="address_list">
						<li v-for="item in userAddressList" :key="item.id" @click="selectAddress(item)">
							{{item.address.addressComponent.street}}
						</li>
					</ul>
				</div>
				<div class="other_address">
					<span>其他地址</span>
					<i class="iconfont icon-qianjin" @click="goPage()"></i>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import { homeService } from './home.service';
import {mapActions,mapGetters} from 'vuex';
import { appUtils } from '../../common/utils/appUtils';
import { config } from '../../config/config';
export default {
	data () {
		return {
			title: '',
			foodTypes: [],
			popupVisible: true,
			config: config
		}
	},
	computed: {
		...mapGetters({
			userSelectAddress: 'userSelectAddress',
			userAddressList: 'userAddressList',
			positionResult: 'positionResult'
		})  
	},
	methods: {
		...mapActions([
            'setUserSelectAddress'
		]),
		getFoodTypeList(){
			Indicator.open('加载中...');
			homeService.getFoodTypeList().then(res => {
				Indicator.close();
				let resLength = res.length;
				let resArr = [...res]; // 返回一个新的数组
				let foodArr = [];
				for (let i = 0, j = 0; i < resLength; i += 8, j++) {
					foodArr[j] = resArr.splice(0, 8);
				}
				this.foodTypes = foodArr;
			}).catch(err => {
				Indicator.close();
				Toast('网络连接失败');
			})
		},
		selectAddress(item){
			this.$store.dispatch('setUserSelectAddress',item.address);
			this.popupVisible = false;
		},
		closeModal(){
			if(this.positionResult){
				this.$store.dispatch('setUserSelectAddress',this.positionResult);
			}else{
				if(this.userAddressList.length > 0){
					this.$store.dispatch('setUserSelectAddress',this.userAddressList[0].address);
				}
			}
			this.popupVisible = false;
		},
		goPage(){
			this.$router.push('chooseAddress');
		}
	},
	created () {
		this.getFoodTypeList();
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import './home';

</style>