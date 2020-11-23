<template>
  <div id="app">
    <Header/>
    <!-- 该组件会根据不同的访问路径，渲染不同的组件 -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: 'App',
  provide() {//父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
    return {
        reload: this.reload                                              
    }
  },
  data() {
    return{
        isRouterAlive: true//控制视图是否显示的变量
    }
  },
  components: {
    Header
  },
  methods: {
    reload() {
      this.isRouterAlive = false;//先关闭
      this.$nextTick(function() {
        this.isRouterAlive = true;//再打开
      }) 
    }
  }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
</style>
