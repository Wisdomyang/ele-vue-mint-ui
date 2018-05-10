<template>
	<div class="user-address">
		<mt-header :title="title">
			<i class="iconfont" style="color: #fff" slot="left" @click="goback()">&#xe682;</i>
			<router-link tag="span" :to="{path: 'addAndEditAddress'}" style="color: #fff;font-size: 16px" slot="right">
				新增地址
			</router-link>
		</mt-header>

		<section class="content">
			<user-address :isShowEdit="true"></user-address>
		</section>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import userAddress from '../../../components/user-address/user-address';
import { appUtils } from '../../../common/appUtils/appUtils';
export default {
	data () {
		return {
			title: '收货地址'
		}
	},
	components: {
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
.user-address{
	width: 100%;
	height: 100%;
}

.content{
	background-color: #fff;
	padding: 0 .32rem;
}
</style>