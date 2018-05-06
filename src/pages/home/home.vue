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
							<div class="badge"></div>
							<div class="title"></div>
							<div class="mark"></div>
						</div>
						<div class="center">
							<div class="score"></div>
							<div class="monthly-sales"></div>
							<div>
								<span>蜂鸟转送</span>
								<span>必答</span>
							</div>
						</div>
						<div class="bottom">
							<div class="deliveryfee"></div>
							<div class="distance"></div>
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
@import '../../assets/css/mixin.scss';
.header{
	-webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: $blue;
    box-sizing: border-box;
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 40px;
    line-height: 1;
    padding: 0 10px;
    position: relative;
    text-align: center;
    white-space: nowrap;
	justify-content: center;
	font-size: 16px;
	.iconfont,span{
		color: $fc;
	}
}
.home_swiper{
	width: 100%;
	height: 3.43rem;
	border-bottom: 1px solid $bc;
	margin-bottom: 0.18rem;
	background-color: $fc;
	.category_container{
		padding: .14rem 0;
		width: 25%;
		height: 1.46rem;
		float: left;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
		.img_box{
			width: .68rem;
			height: .68rem;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.text{
			width: 100%;
			text-align: center;
			@include sc(.24rem,'#787878')
		}
		
	}
	
}

.nearly_seller{
	width: 100%;
	border-top: 1px solid $bc;
	background-color: $fc;
	.section_title{
		@include wh(100%,.72rem);
		display: flex;
		align-items: center;
		@include sc(.24rem,'#787878');
		i{
			margin: 0 0.13rem 0 0.27rem;
		}
	}
}




</style>