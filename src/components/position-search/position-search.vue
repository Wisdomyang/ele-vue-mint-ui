<template>
	<div class="position-search">
		<i class="iconfont icon-fanhui" @click="goback()" v-if="isShowBack"></i>
		<mt-search :class="{search_height: !isShowCell}" v-model="value" placeholder="请输入地址" :cancel-text="canceText" :show="showCell">
			<mt-cell v-if="showCell && address" @click.native="goPage()">
				<div class="content">
					<i class="iconfont icon-dingwei"></i>
					<div>
						<p>{{address.addressComponent.building}}</p>
						<p class="ellipsis">{{`${address.addressComponent.street}${address.addressComponent.township}${address.addressComponent.neighborhood}${address.addressComponent.streetNumber}`}}</p>
					</div>
				</div>
			</mt-cell>
			<mt-cell v-for="(item,index) in searchResult" v-if="showCell && searchResult.length > 0" @click.native="goPage(item)">
				<div class="content">
					<i></i>
					<div>
						<p>{{item.name}}</p>
						<p class="ellipsis">{{item.address}}</p>
					</div>
				</div>
			</mt-cell>
			<mt-cell v-if="showCell && searchResult.length == 0">
				<div class="content">
					<i></i>
					<div>
						搜索无结果
					</div>
				</div>
			</mt-cell>
		</mt-search>
	</div>
	
</template>
<script>
import { appUtils } from '../../common/utils/appUtils';
import { AMapService } from '../../common/class/amap';
import { mapGetters,mapActions } from 'vuex';
import { Toast,Indicator } from 'mint-ui';
export default{
	name:'position-search',
	data(){
		return {
			value: '',
			canceText: '取消',
			showCell: true,
			aMapService: new AMapService(window.app_map,window.app_geolocation,window.app_geocoder,window.app_placeSearch,window.app_marker,window.app_autocomplete),
			userInfo: {},
			address: null,
			searchResult: []
		}
	},
	props:['isShowCell','isShowBack'],
	watch: {
		value(newV){
			if(newV === ''){
				this.address && this.aMapService.getSearchNearBy(newV,this.address.position,50000).then(res => {
					this.$store.dispatch('setPositionSearchNearBy',res.poiList.pois);
					this.searchResult = res.poiList.pois;
				}).catch(err => {
					console.log(err);
					Toast('获取附近地址失败');
				})
			}else{
				this.aMapService.getAutocompleteSearch(newV).then(res => {
					this.searchResult = [];
					for(let item of res.tips){
						if(item.location){
							if(item.address instanceof Array){
								if(item.address.length > 0){
									this.searchResult.push({
										name: item.name,
										address: `${item.district}${item.address[0]}`,
										location: item.location
									})
								}else{
									this.searchResult.push({
										name: item.name,
										address: `${item.district}`,
										location: item.location
									})
								}
							}
							if(typeof (item.address) == 'string'){
								this.searchResult.push({
									name: item.name,
									address: `${item.district}${item.address}`,
									location: item.location
								})
							}
						}
						
					}
				}).catch(err => {
					console.log(err);
					Toast('搜索无结果');
					this.searchResult = [];
				})
			}
		}
	},
	computed: {
		...mapGetters({
			positionResult: 'positionResult',
			positionSearchNearBy: 'positionSearchNearBy'
		})  
	},
	methods:{
		...mapActions([
			'setPositionSearchNearBy',
			'setUserSelectAddress'
		]),
		goPage(item){
			if(this.$route.query.userInfo){
				if(!item){
					this.$router.push({name: 'confirmAddress',query: {userInfo: JSON.stringify(this.userInfo)}})
				}else{
					this.aMapService.getAddress(item.location).then(res => {
						this.userInfo.address = {
							position: item.location,
							addressComponent: res.regeocode.addressComponent,
							formattedAddress: item.address
						} 
						this.userInfo.address.addressComponent.street = item.address;
						this.$router.push({name: 'confirmAddress',query: {userInfo: JSON.stringify(this.userInfo)}})
					})
					
				}
			}else{
				if(!item){
					this.$store.dispatch('setUserSelectAddress',this.positionResult)
					this.$router.push({name: 'home'});
				}else{
					this.aMapService.getAddress(item.location).then(res => {
						let obj = {
							position: item.location,
							addressComponent: res.regeocode.addressComponent,
							formattedAddress: res.regeocode.formattedAddress
						}
						this.$store.dispatch('setUserSelectAddress',obj)
						this.$router.push({name: 'home'});
					})
				}
			}
		},
		goback(){
			appUtils.goBack();
		}
	},
	mounted () {
		if(!this.isShowCell){
			this.canceText = '';
			this.showCell = false;
		}else{
			if(this.$route.query.userInfo){
				this.userInfo = JSON.parse(this.$route.query.userInfo);
				this.address = this.userInfo.address;
				this.address.position = [this.address.position.lng,this.address.position.lat];
				this.aMapService.getSearchNearBy('',this.address.position).then(res => {
					this.$store.dispatch('setPositionSearchNearBy',res.poiList.pois);
					this.searchResult = res.poiList.pois;
				}).catch(err => {
					console.log(err);
					Toast('获取附近地址失败');
				})
			}else{
				if(this.positionResult){
					this.address = this.positionResult;
					this.aMapService.getSearchNearBy('',this.address.position).then(res => {
						this.$store.dispatch('setPositionSearchNearBy',res.poiList.pois);
						this.searchResult = res.poiList.pois;
					}).catch(err => {
						console.log(err);
						Toast('获取附近地址失败');
					})
				}
				
			}
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