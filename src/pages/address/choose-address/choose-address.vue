<template>
	<div class="choose-address">
		<section class="search">
			<mt-search style="height: 100%" v-model="value" placeholder="请输入地址" cancel-text=""></mt-search>
			<div class="current-address">
				<div class="title">当前地址</div>
				<div class="address">
					<span>新中泰商务大厦</span>
					<div>
						<i class="iconfont">&#xe786;</i>
						<span>重新定位</span>
					</div>
				</div>
			</div>
		</section>

		<section class="user-address">
			<div class="title">收货地址</div>
			<!-- 未登陆 -->
			<div class="login-out" v-if="false">
				<span>登陆后使用常用的收货地址</span>
				<i>登陆</i>
			</div>
			<!-- 已登陆 -->

			<ul class="login-in">
				<li>
					<div class="address">地方</div>
					<div class="street">开始可就是快乐飞机</div>
					<div class="user-info">
						<span>看世界的恐惧</span><i>可敬可嘉看</i>
					</div>
				</li>
				<li>
					<div class="address">地方</div>
					<div class="street">开始可就是快乐飞机</div>
					<div class="user-info">
						<span>看世界的恐惧</span><i>可敬可嘉看</i>
					</div>
				</li>
			</ul>

			<div class="add-address">
				<span>新增地址</span>
				<i class="iconfont">&#xe74e;</i>
			</div>
		</section>
		

		<section class="near-place">
			<div class="title">
				<div class="text">附近地点推荐</div>
				<div class="more">
					<span>更多</span><i class="iconfont">&#xe74e;</i>
				</div>
			</div>
			<ul class="content">
				<li>附近地点推荐</li>
				<li>推荐</li>
				<li>地点推荐</li>
				<li>附近地点推荐</li>
				<li>地点推荐</li>
				<li>附近地点推荐</li>

			</ul>
		</section>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import {ajax} from "../../../common/ajaxUtils/ajax";

export default {
	data () {
		return {
			value: ''
			
		}
	},
	methods: {
		
	},
	mounted (){
		
		

		
	}
}
</script>

<style lang="scss">
.mint-searchbar{
	background-color: #fff;
	.mint-searchbar-inner{
		background-color: #f0f0f0;
		border-radius: .24rem;
		i{
			font-size: 14px;
			padding-right: .12rem;
		}
		input{
			background-color: #f0f0f0;
		}
	}
}
</style>



<style lang="scss" scoped>
@import '../../../assets/css/mixin';
@import './choose-address';

</style>