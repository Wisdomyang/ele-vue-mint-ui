<template>
	<div class="home">
		<mt-swipe :auto="4000" class="home-swiper">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
		<mt-swipe :auto="4000" class="home-swiper">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
		<mt-swipe :auto="4000" class="home-swiper">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
		<mt-swipe :auto="4000" class="home-swiper">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
		<mt-swipe :auto="4000" class="home-swiper">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
		<mt-swipe :auto="4000" class="home-swiper">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
		<mt-swipe :auto="4000" class="home-swiper">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
		<mt-swipe :auto="4000" class="home-swiper">
			<mt-swipe-item>1</mt-swipe-item>
			<mt-swipe-item>2</mt-swipe-item>
			<mt-swipe-item>3</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import {ajax} from "../../common/ajaxUtils/ajax";
import {data} from "../../mock";
export default {
	data () {
		return {
			title: '深圳',
			swiperList: []
			
		}
	},
	methods: {
		test(){
			for(let i = 0; i < 8 ; i ++){
				console.log('456')
			}
		}
	},
	mounted (){
		

		

		
		 
		
		
		// console.log('123')
		// var _self = this;
		// for(let i of iii){
			// }
		// let _self = this;
			
		// ajax.get('swiperList').then(res => {
		// 	// _self.swiperList = res.data.swiperItem;
		// 	console.log(_self.swiperList)
		// })
	}
}
</script>

<style type="text/css">


</style>

<style lang="scss" scoped>
.home-swiper{
	width: 100%;
	height: 3.16rem;
	border-bottom: 1px solid #e4e4e4;
	margin-bottom: 0.17rem;
	background-color: #fff;
}


</style>