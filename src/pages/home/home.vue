<template>
	<div class="home">
		<mt-header  :title="title">
			<div slot="left" class="header-search"></div>
			<ul slot="right" class="header-ul">
				<li>登录</li>
				<li>注册</li>
			</ul>
		</mt-header>
	</div>
</template>

<script>
import { Button,MessageBox,Toast,Indicator,Header } from 'mint-ui';
export default {
	data () {
		return {
			title: '深圳'
		}
	}
}
</script>

<style lang="scss" scoped>
.header-search{
	width: 0.36rem;
	height: 0.4rem;
	margin-left: 0.30666rem;
	background: url(./images/search.png) no-repeat;
	background-size: 100% 100%;
}
.header-ul{
	font-size: 0;
	margin-right: 0.17333rem;
	li{
		font-size: 14px;
		display: inline-block;
		padding: 0 0.13333rem;
		&:last-child{
			border-left: 1px solid #fff;
		}
		
	}
}
</style>