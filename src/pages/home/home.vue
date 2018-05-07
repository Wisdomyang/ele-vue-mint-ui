<template>
	<div class="home">
		<section class="header">
			<div>
				<i class="iconfont">&#xe61e;</i>
				<span>深圳</span>
			</div>
		</section>
		<mt-swipe class="home_swiper">
			<mt-swipe-item v-for="category in categoryList">
				<div class="category_container" v-for="item in category.goodList" :key="item.id">
					<div class="img_box">
						<img :src="item.images" :alt="item.name">
					</div>
					<div class="text">
						{{item.name}}
					</div>
				</div>
			</mt-swipe-item>
		</mt-swipe>
		<section class="nearly_seller">
			<div class="section_title">
				<i class="iconfont">&#xe647;</i>
				<span>附近商家</span>
			</div>
			<ul>
				<li>
					<div class="img_box"></div>
					<div class="content">
						<div class="top">
							<div class="badge">品牌</div>
							<div class="title ellipsis">韩国炸鸡的刷卡缴费开始的咖啡机水电费看见是看得见反倒是科技</div>
							<ul class="mark">
								<li>准</li>
								<li>保</li>
							</ul>
						</div>
						<div class="center">
							<div class="score">123</div>
							<div class="score_num">4.2</div>
							<div class="monthly_sales">月售669单</div>
							<ul class="center_mark">
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
			categoryList: []
			
		}
	},
	methods: {
		
	},
	mounted (){
		
		ajax.get('swiperList').then(res => {
			
			this.categoryList = res.data.swiperItem;
		})
		

		
	}
}
</script>

<style type="text/css">

.mint-swipe-indicator.is-active{
	background: #26a2ff;
	opacity: 1;
}
</style>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import './home';




</style>