<template>
	<div class="position-search">
		<i class="iconfont icon-fanhui" @click="goback()" v-if="isShowBack"></i>
		<mt-search :class="{search_height: !isShowCell}" v-model="value" placeholder="请输入地址" :cancel-text="canceText" :show="showCell">
			<mt-cell v-for="(item,index) in result" v-if="showCell">
				<div class="content">
					<i class="iconfont" :class="{'icon-dingwei': index == 0}"></i>
					<div>
						<p>固戍新屋园</p>
						<p class="ellipsis">可浪费时间发卡荆防颗粒发附   件安抚就房间爱上福建省发顺丰收款方看来是附近开了就</p>
					</div>
				</div>
			</mt-cell>
		</mt-search>
	</div>
	
</template>
<script>
import { appUtils } from '../../common/appUtils/appUtils';
export default{
	name:'position-search',
	data(){
		return {
			value: null,
			canceText: '取消',
			showCell: true,
			result: [{
				title: '深圳',
				value: 'shenzheng'
			},{
				title: '上海',
				value: 'shanghai'
			},{
				title: '广州',
				value: 'guangzhou'
			}]
		}
	},
	props:['isShowCell','isShowBack'],
	methods:{
		emit(param){
			this.$emit('input', param)
		},
		goback(){
			appUtils.goBack();
		}
	},
	mounted () {
		if(!this.isShowCell){
			this.canceText = '';
			this.showCell = false;
		}
	}
	
}
</script>

<style lang="scss">
.position-search .mint-searchbar{
	background-color: #fff;
	padding-left: .4rem;
	.mint-searchbar-inner{
		background-color: #f0f0f0;
		border-radius: .24rem;
		i{
			font-size: .28rem;
			padding-right: .12rem;
		}
		input{
			background-color: #f0f0f0;
		}
	}
}

.position-search .mint-cell-wrapper{
	border-bottom: 1px solid #e4e4e4;
}

.position-search .mint-cell-value{
	width: 100%;
}

</style>
<style lang="scss" scoped>
@import '../../assets/css/mixin';
.search_height{
	height: 100%;
}

.position-search{
	position: relative;
	>i{
		position: absolute;
		top: 14px;
		left: .08rem;
		z-index: 2;
		
	}
}

.content{
	display: flex;
	align-items: center;
	width: 100%;
	i{
		width: 12.8%;
		height: 100%;
		text-align: center;
		color: $blue;
	}
	div{
		width: 87.2%;
		p{
			margin: .18rem 0;
			&:first-of-type{
				color: $common-black;
				font-weight: bold;
			}
		}
	}
}
</style>