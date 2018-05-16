<template>
	<div class="search-address">
		<position-search :isShowCell="true" :isShowBack="true"></position-search>
	</div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui';
import positionSearch from '../../../components/position-search/position-search';
export default {
	data () {
		return {
		}
	},
	components: {
		positionSearch
	}
}
</script>


<style lang="scss" scoped>
.search-address{
	width: 100%;
	height: 100%;
}

</style>