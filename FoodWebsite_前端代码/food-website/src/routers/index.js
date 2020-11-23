import Vue from "vue";
import VueRouter from "vue-router";
import config from "./config";
import store from "../store";

//1.安装
Vue.use(VueRouter);
//2.创建路由对象
var router = new VueRouter(config);

//导航守卫
//to---跳转到哪儿
//from---从哪儿跳的
//next---函数，通过该函数跳转到指定的路由
router.beforeEach(function(to, from, next){
    if(to.meta.auth){
        //需要登录才能访问
        if(store.state.loginUser.isLoading){
            //正在远程加载中
            next({name: "Auth", query: {returnurl: to.fullPath}});
        }else if(store.state.loginUser.data){
            //登录成功
            next();
        }else{
            //没有登录
            next({name: "Login"});
        }
    }else{
        //都可以访问
        next();
    }
})

export default router;