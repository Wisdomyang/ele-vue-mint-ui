<template>
	<div class="st-radio">
		<div class="radia-core" v-for="(item,index) in options" :key="index">
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
	watch: {
		init(newV){
			this.result = newV;
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