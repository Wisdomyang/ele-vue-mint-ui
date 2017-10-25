<template>
	<div class="home">
		<mt-header  :title="title">
			<div slot="left" class="header-search"></div>
			<ul slot="right" class="header-ul">
				<li>登录</li>
				<li>注册</li>
			</ul>
		</mt-header>
		<swiper :options="swiperOption" ref="mySwiper" class="home-swiper">
		 <!-- slides -->
			<swiper-slide class="swiper-item" v-for="item in swiperList">
				<div class="slide-div" v-for="slideItem in item.goodList">
					<div class="slide-img">
						<div>
							<img :src="slideItem.images" alt="" />
						</div>
						
					</div>
					<p class="slide-p">{{slideItem.name}}</p>
				</div>
			</swiper-slide>
			
			
			<!-- Optional controls -->
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
		<div class="content-container">
			<div class="nearSell">
				<div>
					
				</div>
				<p>附近商家</p>
			</div>
		</div>
	
	</div>
</template>

<script>
import { Button,MessageBox,Toast,Indicator,Header } from 'mint-ui';
import {swiper , swiperSlide} from 'vue-awesome-swiper';
import {ajax} from "../../assets/js/ajax";
import {data} from "../../mock";
export default {
	data () {
		return {
			title: '深圳',
			swiperList: [],
			swiperOption: {
		       // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
		       // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
		       notNextTick: true,
		       // swiper configs 所有的配置同swiper官方api配置
//		       autoplay: 3000,
		       // direction : 'vertical',
//		       effect:"coverflow",
		       grabCursor : true,
		       setWrapperSize :true,
		       // autoHeight: true,
		       // paginationType:"bullets",
		       pagination : '.swiper-pagination',
		       paginationClickable :true,
//		       prevButton:'.swiper-button-prev',
//		       nextButton:'.swiper-button-next',
		       // scrollbar:'.swiper-scrollbar',
//		       mousewheelControl : true,
//		       observeParents:true,
		       // if you need use plugins in the swiper, you can config in here like this
		       // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
		       // debugger: true,
		       // swiper callbacks
		       // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
		       // onTransitionStart(swiper){
		       //   console.log(swiper)
		       // },
		       // more Swiper configs and callbacks...
		       // ...
		    }
		}
	},
	mounted (){
		let _self = this;
		ajax.get('swiperList').then(res => {
			_self.swiperList = res.data.swiperItem;
			console.log(_self.swiperList)
		})
	}
}
</script>

<style type="text/css">
.mint-header-title{
	font-size: 0.4rem;
}
.swiper-container-horizontal > .swiper-pagination-bullets{
	bottom: 0.12rem;
}
</style>

<style lang="scss" scoped>
.home{
	.header-search{
		width: 0.36rem;
		height: 0.4rem;
		margin-left: 0.30666rem;
		background: url(../../assets/images/search.png) no-repeat;
		background-size: 100% 100%;
	}
	.header-ul{
		font-size: 0;
		margin-right: 0.17333rem;
		li{
			font-size: 0.32rem;
			display: inline-block;
			padding: 0 0.13333rem;
			&:last-child{
				border-left: 1px solid #fff;
			}
			
		}
	}
	.home-swiper{
		width: 100%;
		height: 4.21333rem;
		border-bottom: 1px solid #e4e4e4;
		margin-bottom: 0.22666rem;
	}
	.swiper-item{
		font-size: 0;
		.slide-div{
			display: inline-block;
			font-size: 0.29333rem;
			width: 25%;
			height: 1.84rem;
			.slide-img{
				width: 100%;
				height: 1.52rem;
				display: flex;
				justify-content: center;
				align-items: center;
				div{
					width: 0.98666rem;
					height: 0.74666rem;
					img{
						width: 100%;
						height: 0.74666rem;
					}
				}
			}
			.slide-p{
				width: 100%;
				height: 0.32rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.content-container{
		width: 100%;
		height: auto;
		padding-top: 0.22666rem;
		border-top: 1px solid #e4e4e4;
		.nearSell{
			width: 100%;
			margin-bottom: 0.32rem;
			padding-left: 3.46667%;
			font-size: 0;
			>div{
				display: inline-block;
				width: 0.32rem;
				height: 0.33333rem;
				background: url(../../assets/images/celllogo_03.png) no-repeat;
				background-size: 100% 100%;
			}
			>p{
				display: inline-block;
				font-size: 0.28rem;
				color: #999999;
				margin-left: 1.73333%;
			}
		}
	}
	
}

</style>