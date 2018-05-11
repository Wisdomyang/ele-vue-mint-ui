<template>
  <div id="app">
    
    <amap :again="positionAgain" :positionPlaceSearch="positionPlaceSearch" :isShow="$route.meta.path === 'confirmAddress'? true : false" :amapId="'appAmap'"></amap>
    <!-- 定位中的动画 -->
    <section class="positioning" v-if="positionStatus === 'positioning' && $route.meta.path === 'home'">
      定位中。。
    </section>

    <!-- 定位失败 会出现手动定位和重新定位 positionAgian-->
		<section class="fail_position" v-if="positionStatus === 'fail'">
			定位失败。。 请手动定位。 
		</section>
		<!-- 定位成功 -->
    <section class="success_position">
      <transition :name="routerTrans">
        <router-view class="child-view" :class="{no_header: !$route.meta.hasHeader,no_tabbar: !$route.meta.hasTabbar}"></router-view>
      </transition>
      <mt-header :title="title" fixed v-show="$route.meta.hasHeader">
        <i class="iconfont" style="color: #fff" slot="left" @click="goback()">&#xe682;</i>
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
import { appUtils } from './common/appUtils';
import amap from './components/amap/amap';
import {mapActions,mapGetters} from 'vuex';
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
      }]
    }
  },
  components: {
      amap
  },
  computed: {
    ...mapGetters({
      positionResult: 'positionResult',
      positionStatus: 'positionStatus',
      positionAgain: 'positionAgain',
      positionPlaceSearch: 'positionPlaceSearch'
		})  
  },
  methods: {
   
    tabSelected(item){
      item.path && this.$router.push(item.path)
    },
    goback(){
      appUtils.goBack();
    }
  },

  watch: {
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

  .fail_position,.success_position,.positioning{
    height: 100%;
  }
  .amap-logo,.amap-copyright{
    display: none !important;
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
