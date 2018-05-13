<template>
	<div class="add-and-edit-address">
		<section class="form">
			<div class="field">
				<label for="userName">联系人</label>
				<mt-field class="input" placeholder="姓名" v-model="userInfo.userName" id="userName" name="userName" v-validate="{rules: { required: true, regex : /^[\u4e00-\u9fa5\w+$]{1,10}/,max:10,min:1}}"></mt-field>
			</div>
			<div class="field">
				<label></label>
				<div class="input">
					<st-radio :options="genderOptions" :init="userInfo.gender" name="gender" v-model="userInfo.gender"></st-radio>
				</div>
			</div>
			<div class="field">
				<label for="phone">电话</label>
				<mt-field class="input" placeholder="手机号码" v-model="userInfo.phone" id="phone" name="phone" v-validate="{rules: { required: true, regex : /^[1][34578][0-9]{9}$/,max:11}}"></mt-field>
			</div>
			<div class="field">
				<label for="formattedAddress">地址</label>
				<mt-field class="input" placeholder="选择收货地址" v-model="formattedAddress" id="formattedAddress" name="formattedAddress" @click.native="goPage()" readonly>
					<i class="iconfont" style="color: #d7d7d7;">&#xe74e;</i>
				</mt-field>
			</div>
			<div class="field">
				<label>标签</label>
				<div class="input last_input">
					<st-radio :options="tagOptions" :init="userInfo.tag" name="tag" v-model="userInfo.tag"></st-radio>
				</div>
			</div>
		</section>
		<div class="save">
			<mt-button class="btn" :disabled="errors.has('phone') || errors.has('userName') || !userInfo.phone || !userInfo.userName || !userInfo.address || !userInfo.gender" @click="save()">保存</mt-button>
		</div>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import stRadio from '../../../components/radio/radio';
import { mapGetters,mapActions } from 'vuex';
import { appUtils } from '../../../common/utils/appUtils';
export default {
	data () {
		return {
			userName: '',
			phone: '',
			userInfo: {
				userName: '',
				phone: '',
				address: null,
				gender: 1,
				tag: 0,
			},
			formattedAddress: '',
			gender: 1,
			tag: 0,
			genderOptions: [{
				value: 1,
				label: '先生'
			},{
				value: 2,
				label: '女士'
			}],
			
			tagOptions: [{
				value: 1,
				label: '家'
			},{
				value: 2,
				label: '公司'
			},{
				value: 3,
				label: '学校'
			}],
		}
	},
	components: {
		stRadio
	},
	computed: {
		
	},
	methods: {
		...mapActions([
			'setUserAddressList',
		]),
		save(){
			if(!this.userInfo.id){
				this.userInfo.id = appUtils.getUniqueId();
			}
			this.$store.dispatch('setUserAddressList',this.userInfo);
			this.$router.push({name: 'chooseAddress'})
		},
		goPage(){
			this.$router.push({name: 'confirmAddress',query: {userInfo: JSON.stringify(this.userInfo)}})
		}
	},
	mounted (){
		if(this.$route.query.userInfo){
			this.userInfo =  JSON.parse(this.$route.query.userInfo);
			this.formattedAddress = this.userInfo.address.formattedAddress;
		}
	}
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/mixin';
@import './add-and-edit-address';

</style>