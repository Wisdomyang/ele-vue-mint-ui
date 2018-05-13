<template>
	<div class="user-address-component">
		<ul class="login-in" v-if="userAddressList.length > 0">
			<li v-for="item in userAddressList" :key="item.id">
				<router-link tag="i" class="iconfont" :to="{path: 'addAndEditAddress',query: {userInfo: JSON.stringify(item)}}" v-if="isShowEdit">
					&#xe61c;
				</router-link>
				<div class="container">
					<div class="street">{{item.address.addressComponent.street}}</div>
					<div class="address">{{item.address.formattedAddress}}</div>
					<div class="user-info">
						<span>{{item.userName}}</span><i>{{item.phone}}</i>
					</div>
				</div>
			</li>
		</ul>
		<div class="text" v-if="userAddressList.length == 0">
			暂时没有收货地址，请添加。
		</div>
	</div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex';
export default{
	name:'user-address',
	data(){
		return {
			
		}
	},
	props:['isShowEdit'],
	 computed: {
        ...mapGetters({
			userAddressList: 'userAddressList'
		})  
    },
	methods:{
		
	},
	mounted () {
		console.log(this.userAddressList)
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
			.street{
				font-size: .32rem;
				font-weight: bold;
				margin-bottom: .04rem;
			}
			.address{
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

.text{
	margin-top: .08rem;
	font-size: .32rem;
}
</style>