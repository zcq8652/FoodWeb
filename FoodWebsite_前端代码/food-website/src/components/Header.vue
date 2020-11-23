<template>
    <div class="container">
        <ul class="content1">
            <li class="li1" @mouseenter="mouseenterChange(1)" @mouseleave="mouseleaveChange()" :class="{
                active: isEnter == 1
            }">
            <router-link :to="{name:'Home'}"><img src="../assets/images/logo3.png" id="logo">
            美食网<span class="hiddentxt">隐</span>首页<span class="hiddentxt">隐</span></router-link>
            </li>
            <li :class="{active: isEnter == item.id+1}" v-for="item in localDish" :key="item.id" @mouseenter="mouseenterChange(item.id+1)" @mouseleave="mouseleaveChange()"><router-link :to="{name:'Local', params:{code: item.provinceCode, name: item.provinceName}}">{{item.name}}</router-link></li>
            <!--情况一：正在远程加载中-->
            <template v-if="isLogining">
                <li class="islogining">
                    <div id="loading">loading...</div>
                </li>
            </template>
             <!--情况二：当前有登录用户-->
            <template v-else-if="loginUser">
                <li class="userPhoto">
                    <img :src="photo" alt="" id="photo" @click="handleToPersonal">
                    <div class="outlogin" :class="{active: isEnter==12}" @mouseenter="mouseenterChange(12)" @mouseleave="mouseleaveChange()" @click="handleExitLogin">退出登录</div>
                </li>
                <li class="release">
                    <div class="release_div" @mouseenter="releaseEnter" @mouseleave="releaseLeave">发布</div>
                    <div class="release_menu" v-show="isRelease!=0" @mouseenter="releaseMenuEnter" @mouseleave="releaseMenuLeave"><router-link :to="{name:'Release',params:{type: 0}}">发菜谱</router-link></div>
                </li>
            </template>
            <!--情况三：当前没有登录用户-->
            <li class="loginAngRegister" v-else>
                <span id="login" :class="{active: isEnter==10}" @mouseenter="mouseenterChange(10)" @mouseleave="mouseleaveChange()"><router-link :to="{name:'Login'}">登录</router-link></span>
                <span id="register" :class="{active: isEnter==11}" @mouseenter="mouseenterChange(11)" @mouseleave="mouseleaveChange()"><router-link :to="{name:'Register'}">注册</router-link></span>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex";
import {getEightProvince} from "../services/provinceService";
export default {
    data(){
        return{
            localDish:[],
            isEnter: 0,
            isRelease: 0
        }
    },
    async created(){
        var resp = await getEightProvince();
        if(resp.data.state == 1){
            this.localDish = resp.data.data;
        }
    },
    computed: {
        ...mapState("loginUser", {
            loginUser: "data",
            isLogining: "isLoading"
        }),
        photo(){
            if(this.loginUser.photo != "http://localhost:8081/images/null"){
                return this.loginUser.photo;
            }else{
                return require("../assets/images/logo.jpg");
            }
        }
    },
    methods: {
        mouseenterChange(num){
            this.isEnter = num;
        },
        mouseleaveChange(){
            this.isEnter = 0;
        },
        releaseEnter(){
            this.isRelease = 1;
        },
        releaseLeave(){
            if(this.isRelease!=2){
                this.isRelease = 0;
            }
        },
        releaseMenuEnter(){
            this.isRelease = 2;
        },
        releaseMenuLeave(){
            this.isRelease = 0;
        },
        handleToPersonal(){
            this.$router.push({name: "Personal", params: {checked: 0}});
        },
        async handleExitLogin(){
            await this.$store.dispatch("loginUser/exitlogin", {account: this.loginUser.account});
            this.$router.push({name: "Home"});
        }
    }
}
</script>

<style scoped>
.container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    border: 1px solid #333;
    background-color: #333;
    z-index: 100;
}
.content1{
    width: 100%;
    white-space: nowrap;
}
.content1 li{
    display: inline-block;
    width: 60px;
    height: 50px;
    color: #ccc;
    list-style: none;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}
#logo{
    width: 50px;
    float: left;
}
.hiddentxt{
    visibility: hidden;
}
.content1 .li1{
    margin-left: 10%;
    width: 180px;
    text-align: right;
}
.content1 .loginAngRegister, .content1 .islogining{
    margin-left: 550px;
    width: 120px;
}
.content1 .userPhoto{
    margin-left: 550px;
    width: 150px;
}
#login, #register{
    display: inline-block;
    width: 60px;
    height: 50px;
    text-decoration: none;
    color: #ccc;
}
#loading{
    display: inline-block;
    width: 120px;
    height: 50px;
    color: #ccc;
}
.active{
    color: #fff !important;
    background-color: #000;
}
a{
    display: inline-block;
    width: 100%;
    height: 6.5vh;
    text-decoration: none;
    color: #ccc;
}
a:hover{
    color: #fff;
}
.content1 .release{
    width: 70px; 
    height: 100px;
}
.release_div{
    margin-top: -1px;
    width: 100%;
    height: 50px;
    color: #fff;
    border: 1px solid #ff6767;
    background-color: #ff6767;
}
.release_menu{
    position: absolute;
    width: 70px;
    height: 50px;
    color: #fff;
    border: 1px solid #ee9696;
    background-color: #ee9696;
}
.release_menu a{
    color: #fff;
}
#photo{
    margin-top: 2px;
    width: 45px;
    height: 45px;
    border-radius: 50px;
    float: left;
}
.outlogin{
    display: inline-block;
    width: 105px;
    height: 50px;
}
</style>
