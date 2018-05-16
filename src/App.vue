<template>
  <div id="app">
    <div id="appAmap" v-show="isAppAmapShow" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 1"></div>
    <!-- 定位中的动画 -->
    <section class="positioning" v-if="isPositionAnimationShow">
      <i class="iconfont icon-dingwei position_animation"></i>
    </section>

		<!-- 定位成功 -->
    <section class="success_position">
      <transition :name="routerTrans">
        <router-view class="child-view" :class="routerClass"></router-view>
      </transition>
      <mt-header :title="title" fixed v-show="$route.meta.hasHeader">
        <i class="iconfont" style="color: #fff" slot="left" @click="goBack()">&#xe682;</i>
      </mt-header>
      <mt-tabbar v-model="tabbarSelected" fixed v-show="$route.meta.hasTabbar">
        <mt-tab-item :id="item.id" v-for="item in tabs" :key="item.id">
          <i class="iconfont" slot="icon" style="font-size: 20px" v-html="item.icon" :class="{tab_active: tabbarSelected == item.id}" @click="tabSelected(item)"></i><span @click="tabSelected(item)" :class="{tab_active: tabbarSelected == item.id}">{{item.name}}</span>
        </mt-tab-item>
      </mt-tabbar>
    </section>
    
   
  </div>
</template>

<script>
import { Toast,Indicator,MessageBox } from 'mint-ui';
import { appUtils } from './common/utils/appUtils';
import {mapActions,mapGetters} from 'vuex';
import { AMapService } from './common/class/amap';
export default {
  name: 'app',
  data (){
    return {
      title: '',
      routerTrans: 'slide-left',
      tabbarSelected: 0,
      tabs: [{
        name: '外卖',
        id: 0,
        icon: '&#xe722;',
        path: 'home'
      },{
        name: '搜索',
        id: 1,
        icon: '&#xe612;'
      },{
        name: '订单',
        id: 2,
        icon: '&#xe60a;'
      },{
        name: '我的',
        id: 3,
        icon: '&#xe60e;'
      }],
      aMapService: new AMapService(window.app_map,window.app_geolocation,window.app_geocoder,window.app_placeSearch,window.app_marker,window.app_autocomplete)
    }
  },
  computed: {
    ...mapGetters({
      positionResult: 'positionResult',
      positionStatus: 'positionStatus',
      userSelectAddress: 'userSelectAddress',
      userAddressList: 'userAddressList'
    }),
    isAppAmapShow(){
      return this.$route.meta.path === 'confirmAddress'? true : false
    },
    isPositionAnimationShow(){
      if(this.positionStatus === 'positioning' && this.$route.meta.path === 'home'){
        return true;
      }else{
        return false;
      }
    },
    routerClass(){
      return {
        no_header: !this.$route.meta.hasHeader,
        no_tabbar: !this.$route.meta.hasTabbar
      }
    }

  },
  methods: {
    ...mapActions([
      'setPositionResult',
      'setPositionStatus',
      'setUserSelectAddress'
    ]),
    // 重新定位
		position(){
			this.$store.dispatch('setPositionStatus','positioning');
			this.aMapService.getCurrentPosition().then(res => {
        this.$store.dispatch('setPositionStatus','success');
        this.$store.dispatch('setPositionResult',res);
        this.aMapService.placeSearch && this.aMapService.placeSearch.setCity(res.addressComponent.citycode);
        if(!this.userSelectAddress && this.userAddressList.length == 0){
          this.$store.dispatch('setUserSelectAddress',res);
        }
			}).catch(err => {
				console.log(err);
				this.$store.dispatch('setPositionStatus','positioning');
			})
		},
    tabSelected(item){
      item.path && this.$router.push(item.path)
    },
    goBack(){
      appUtils.goBack();
    }
  },
  watch: {
    positionStatus(newV){
      if(newV === 'fail'){
        let msg = MessageBox({
          title: '提示',
          message: '定位请求失败，请您开启定位服务以允许外卖获取您的定位信息?',
          showCancelButton: true,
          cancelButtonText: '手动选择',
          confirmButtonText: '重新定位'
        });

        msg.then(res => {
          if(res === 'confirm'){
            this.position();
          }
        })
      }
    },
    $route(to,from){
      this.title = to.meta.title;
      document.title = to.meta.title;
      if(window.isBack){
        this.routerTrans='slide-right';
        window.isBack = false;
			}else{
				this.routerTrans='slide-left';
      }

      // 由于该项目只能从首页进入，所以没必要。
      // if(to.meta.path != 'confirmAddress'){
      //   this.positionAgian = !this.positionAgian;
      // }
      
    }
  },
  mounted () {
    // 高德地图插件必须全部引入成功才行。保证后续逻辑的进行;
    this.aMapService.create('appAmap').then(map => {
      Promise.all([this.aMapService.rePosition(),this.aMapService.reGeocoder(),this.aMapService.rePlaceSearch(null),this.aMapService.reAutocomplete()]).then(res => {
        this.position();
      }).catch(err => {
        console.log(err);
        Toast('高德地图插件引入失败，会影响后续功能，请刷新重试');
      })
    }).catch(err => {
      console.log(err);
      Toast('高德地图引入失败，请刷新重试');
    });
  }
}
</script>

<style lang="scss">
@import './assets/css/mixin.scss';

#app{
  width: 100%;
  height: 100%;
  position: relative;
  .tab_active{
    color: $blue;
  }
  .no_header{
    padding-top: 0;
  }
  .no_tabbar{
    padding-bottom: 0;
  }

  .mint-swipe-indicator.is-active{
    background: #26a2ff;
    opacity: 1;
  }

  .mint-header-title{
    font-size: 16px;
    color: #fff;
  }

  .mint-cell-wrapper{
    background: none;
    
  }

  .mint-cell:last-child{
    background-image: none;
  }


  .mint-button--default{
    box-shadow: none;
  }

  .success_position{
    height: 100%;
  }

  .positioning{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    i{
      color: red; 
      font-size: 0.7rem;
    }
    
  }
  .amap-logo,.amap-copyright{
    display: none !important;
  }
}

.position_animation{
  animation: bound 1s infinite;
}

@keyframes bound {
  0%{
    transform: translate3d(0,0,0);
  }
  50%{
    transform: translate3d(0,-0.2rem,0);
  }
  
  100%{
    transform: translate3d(0,0,0);
  }
}

.child-view {
  width:100%;
  padding: 40px 0 55px 0;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}

.slide-left-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translate3d(50px, 0, 0);
}
.slide-left-leave-to, .slide-right-enter {
  opacity: 0;
  transform: translate3d(50px, 0, 0);
}
.slide-right-leave-active,.slide-left-enter-active{
  transition: all .2s cubic-bezier(.55,0,.1,1)
}
</style>
