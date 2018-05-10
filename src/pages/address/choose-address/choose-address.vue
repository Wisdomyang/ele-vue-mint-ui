<template>
	<div class="choose-address">
		<mt-header :title="title">
			<i class="iconfont" style="color: #fff" slot="left" @click="goback()">&#xe682;</i>
			<router-link tag="span" :to="{path: 'userAddress'}" style="color: #fff;font-size: 16px" slot="right">
				地址管理
			</router-link>
		</mt-header>
		<section class="search">
			<position-search :isShowCell="false" :isShowBack="false"></position-search>
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
			<user-address :isShowEdit="false"></user-address>
			<router-link tag="div" class="add-address" :to="{path: 'addAndEditAddress'}">
				<span>新增地址</span>
				<i class="iconfont">&#xe74e;</i>
			</router-link>
		</section>
		

		<section class="near-place">
			<div class="title">
				<div class="text">附近地点推荐</div>
				<router-link tag="div" class="more" :to="{path: 'searchAddress'}">
					<span>更多</span><i class="iconfont">&#xe74e;</i>
				</router-link>
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
import positionSearch from '../../../components/position-search/position-search';
import userAddress from '../../../components/user-address/user-address';
import { appUtils } from '../../../common/appUtils/appUtils';
export default {
	data () {
		return {
			title: '选择服务地址'
		}
	},
	components: {
		positionSearch,
		userAddress
	},
	methods: {
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
@import './choose-address';

</style>