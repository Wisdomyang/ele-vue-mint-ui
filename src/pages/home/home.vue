<template>
	<div class="home">
		
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
	mounted (){
		

		// let _self = this;
		// ajax.get('swiperList').then(res => {
		// 	// _self.swiperList = res.data.swiperItem;
		// 	console.log(_self.swiperList)
		// })
	}
}
</script>

<style type="text/css">
.mint-header-title{
	font-size: .3rem;
}

</style>

<style lang="scss" scoped>
.home{
	.header-search{
		width: 0.27rem;
		height: 0.3rem;
		margin-left: 0.23rem;
		background: url(../../assets/images/search.png) no-repeat;
		background-size: 100% 100%;
	}
	.header-ul{
		font-size: 0;
		margin-right: 0.13rem;
		li{
			font-size: 0.24rem;
			display: inline-block;
			padding: 0 0.1rem;
			&:last-child{
				border-left: 1px solid #fff;
			}
			
		}
	}
	.home-swiper{
		width: 100%;
		height: 3.16rem;
		border-bottom: 1px solid #e4e4e4;
		margin-bottom: 0.17rem;
	}
	.swiper-item{
		font-size: 0;
		.slide-div{
			display: inline-block;
			font-size: 0.22rem;
			width: 25%;
			height: 1.38rem;
			.slide-img{
				width: 100%;
				height: 1.14rem;
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