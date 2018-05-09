<template>
	<div class="st-radio">
		<div class="radia-core" v-for="item in options">
			<span class="circle" :class="{'active':result == item.value}">
				{{item.label}}
			</span>
			<input type="radio" v-model="result" :value="item.value" :name="name" @click="emit(item.value)">
		</div>
	</div>
</template>
<script>
export default{
	name:'st-radio',
	data(){
		return {
			result: this.init
		}
	},
	props:['options','name','init'],
	methods:{
		emit(param){
			this.$emit('input', param)
		}
	}
	
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import './radio';
</style>