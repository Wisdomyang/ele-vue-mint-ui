<template>
	<div class="user-address-component">
		<ul class="login-in">
			<li>
				<router-link tag="i" class="iconfont" :to="{path: 'addAndEditAddress'}" v-if="isShowEdit">
					&#xe61c;
				</router-link>
				<div class="container">
					<div class="address">地方</div>
					<div class="street">开始可就是快乐飞机</div>
					<div class="user-info">
						<span>看世界的恐惧</span><i>可敬可嘉看</i>
					</div>
				</div>
			</li>
			<li>
				<router-link tag="i" class="iconfont" :to="{path: 'addAndEditAddress'}" v-if="isShowEdit">
					&#xe61c;
				</router-link>
				<div class="container">
					<div class="address">地方</div>
					<div class="street">开始可就是快乐飞机</div>
					<div class="user-info">
						<span>看世界的恐惧</span><i>可敬可嘉看</i>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
export default{
	name:'user-address',
	data(){
		return {
			
		}
	},
	props:['isShowEdit'],
	methods:{
		
	}
	
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin';
.login-in{
	li{
		padding-top: .14rem;
		padding-bottom: .2rem;
		border-bottom: 1px solid $bc;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		>i{
			width: 1.22rem;
			text-align: center;
			font-size: .42rem;
		}
		.container{
			flex: auto;
			.address{
				font-size: .32rem;
				font-weight: bold;
				margin-bottom: .04rem;
			}
			.street{
				font-size: .32rem;
				color: $light-black;
				margin-bottom: .1rem;
			}
			.user-info{
				font-size: .28rem;
				span{
					color: #a2a2a2;
					margin-right: .1rem;
				}
				i{
					color: #a2a2a2;
				}
			}
		}
		
	}
}
</style>