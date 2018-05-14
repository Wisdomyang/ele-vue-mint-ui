<template>
	<div class="login">
		<section class="form">
			<mt-field class="input" :state="errors.has('phone') ? 'error' : 'success'" placeholder="手机号码" v-model="phone" name="phone" v-validate="{rules: { required: true, regex : /^[1][34578][0-9]{9}$/}}" :attr="{ maxlength: 11 }"></mt-field>
			<mt-field class="input" :state="errors.has('password') ? 'error' : 'success'" placeholder="密码" v-model="password" type="password" v-validate="{rules: { required: true, regex : /^[a-zA-Z0-9_~!]{6,20}$/}}" name="password" :attr="{ maxlength: 20 }"></mt-field>
		</section>
		
		<div class="save">
			<mt-button class="btn" @click="login()" :disabled="errors.has('phone') || errors.has('password')  || !phone || !password">确定</mt-button>
		</div>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import {mapActions,mapGetters} from 'vuex';
import { appUtils } from '../../common/utils/appUtils';
export default {
	data () {
		return {
			phone: '',
			password: ''
		}
	},
	
	methods: {
		...mapActions([
            'setUserName',
            'setUserPhone'
		]),
		login(){
			this.$store.dispatch('setUserName',appUtils.getUniqueId());
			this.$store.dispatch('setUserPhone',this.phone);
			appUtils.goBack();
		}

	},
	created () {
		
	} 
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import './login';

</style>