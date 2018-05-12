<template>
	<div class="add-and-edit-address">
		<section class="form">
			<div class="field">
				<label for="username">联系人</label>
				<mt-field class="input" placeholder="姓名" v-model="username" id="username" name="username" v-validate="{rules: { required: true, regex : /^[\u4e00-\u9fa5w+$]{1,10}/,max:10,min:1}}"></mt-field>
			</div>
			<div class="field">
				<label></label>
				<div class="input">
					<st-radio :options="genderOptions" :init="1" name="gender" v-model="gender"></st-radio>
				</div>
			</div>
			<div class="field">
				<label for="phone">电话</label>
				<mt-field class="input" placeholder="手机号码" v-model="phone" id="phone" name="phone" v-validate="{rules: { required: true, regex : /^[1][34578][0-9]{9}$/,max:11}}"></mt-field>
			</div>
			<div class="field">
				<label for="address">地址</label>
				<mt-field class="input" placeholder="选择收货地址" v-model="address" id="address" name="address" @click.native="goPage()" readonly>
					<i class="iconfont" style="color: #d7d7d7;">&#xe74e;</i>
				</mt-field>
			</div>
			<div class="field">
				<label for="house">门牌号</label>
				<mt-field class="input" placeholder="例: 5号楼302室" v-model="house" id="house" name="house" v-validate="{rules: { required: true, regex : /^[\u4e00-\u9fa5w+$]{1,30}/,max:10,min:1}}"></mt-field>
			</div>
			<div class="field">
				<label>标签</label>
				<div class="input last_input">
					<st-radio :options="tagOptions" :init="0" name="tag" v-model="tag"></st-radio>
				</div>
			</div>
		</section>
		<div class="save">
			<mt-button class="btn" :disabled="errors.has('phone') || errors.has('username') || errors.has('house') || !phone || !username || !address || !gender || !house" >保存</mt-button>
		</div>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import stRadio from '../../../components/radio/radio';
export default {
	data () {
		return {
			username: '',
			phone: '',
			address: '11',
			house: '',
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
	methods: {
		goPage(){
			this.$router.push('confirmAddress')
		}
	},
	mounted (){
		
		
		
	}
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/mixin';
@import './add-and-edit-address';

</style>