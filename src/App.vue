<template>
  <div id="app">
    
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
  </div>
</template>

<script>
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
  methods: {
    tabSelected(item){
      item.path && this.$router.push(item.path)
    },
    goback(){
      window.history.go(-1);
    }
  },

  watch: {
    $route(to,from){
      this.title = to.meta.title;
      document.title = to.meta.title;
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
  .tab_active{
    color: $blue;
  }
  .no_header{
    padding-top: 0;
  }
  .no_tabbar{
    padding-bottom: 0;
  }
}

.mint-header-title{
  font-size: 16px;
  color: #fff;
}

.mint-cell-wrapper{
  background: none;
}

.mint-cell:last-child{
  background: none;
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
