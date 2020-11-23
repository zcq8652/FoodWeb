<template>
    <div class="container">
        <LoginAndRegister>
               <div class="login_box_top">
                   <div class="register"><router-link :to="{name:'Register'}">注册</router-link></div>
                   <div class="login">登录</div>
               </div>
               <div class="login_box_content">
                    <div class="content_left">
                        <div class="account_div"><span>账号：</span><input type="text" id="account" v-model="userInfo.account" @blur="handleShowPhoto"></div>
                        <div class="password_div"><span>密码：</span><input type="password" id="password" v-model="userInfo.password" autocomplete="new-password"></div>
                        <input type="checkbox" class="check" @click="handleChecked($event)"><span class="auto_login">自动登录</span>
                        <span class="forget_pass">忘记密码?</span>
                        <input type="submit" :value="$store.state.loginUser.isLoading ? '正在登录中' : '登 录'" id="login_btn" @click="handleLogin">
                        <div class="prompt">{{prompt}}</div>
                    </div>
                    <div class="content_right">
                        <img :src="photo" class="logo">
                        <span class="welcome">唯有爱与美食不可辜负</span>
                    </div>
               </div> 
        </LoginAndRegister>
    </div>
</template>

<script>
import LoginAndRegister from "../components/LoginAndRegister";
import {showPhoto} from "../services/userService";
export default {
    data(){
        return{
            userInfo: {
                account: "",
                password: "",
                checked: false
            },
            prompt: "",
            photoUrl: ""
        }
    },
    computed: {
        photo(){
            if(this.photoUrl != ""){
                return this.photoUrl;
            }else{
                return require("../assets/images/logo.jpg");
            }
        }
    },
    components: {
        LoginAndRegister
    },
    methods: {
        handleChecked(e){
            this.userInfo.checked = e.target.checked;
        },
        async handleLogin(){
            if(this.$store.state.loginUser.isLoading){
                //正在登录中,什么都不做
                return;
            }
            var result = await this.$store.dispatch("loginUser/login", this.userInfo);
            if(result.state == 1){
                //登录成功
                this.$router.push({name:"Home"});
            }else{
                //登录失败
                this.prompt = result.message;
            }
        },
        async handleShowPhoto(){
            var resp = await showPhoto(this.userInfo.account);
            //console.log(resp);
            if(resp.data.state == 1){
                this.photoUrl = resp.data.data;
            }else{
                this.photoUrl = "";
            }
        }
    }
}
</script>

<style scoped>
.login_box_top{
    width: 100%;
    height: 60px;
}
.register{
    width: 50%;
    height: 100%;
    border: 1px solid #000;
    background-color: #000;
    border-top-left-radius: 6px;
    opacity: 80%;
    float: left;
    font-size: 26px;
    color: #fff;
    text-align: center;
    line-height: 60px;
}
.login{
    margin-left:50%; 
    width: 50%;
    height: 100%;
    font-size: 26px;
    text-align: center;
    line-height: 60px;
}
.login_box_content{
    width: 100%;
    height: 300px;
}
.content_left{
    margin-top: 10px;
    width: 65%;
    height: 90%;
    border: 1px solid #fff;
    border-right: 1px solid #999;
    float: left;
}
.account_div, .password_div{
    width: 370px;
    height: 40px;
    margin-left: 27px;
}
.account_div{
    margin-top: 40px;
    border-top: 1px solid #999;
    border-left: 1px solid #999;
    border-right: 1px solid #999;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.password_div{
    border: 1px solid #999;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}
.account_div span, .password_div span{
    display: inline-block;
    width: 70px;
    height: 100%;
    font-size: 19px;
    text-align: center;
    line-height: 40px;
}
#account, #password{
    position: fixed;
    margin-top: 3px;
    border: 1px solid #fff;
    width: 250px;
    height: 34px;
    outline: none;
}
.check{
    width: 18px;
    height: 18px;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 5px;
    float: left;
}
.auto_login{
    display: block;
    margin-top: 17px;
    margin-right: 190px;
    font-size: 18px;
    float: left;
}
.forget_pass{
    display: block;
    margin-top: 17px;
    font-size: 18px;
}
#login_btn{
    margin-top: 20px;
    margin-left: 29px;
    width: 370px;
    height: 50px;
    border: 1px solid #ff6767;
    background-color: #ff6767;
    border-radius: 6px;
    font-size: 22px;
    color: #fff;
    cursor: pointer;
    outline: none;
}
.prompt{
    margin-top: 10px;
    margin-left: 29px;
    width: 370px;
    height: 20px;
    color: #f40;
    text-align: center;
    line-height: 20px;
}
.content_right{
    margin-left: 65%;
    width: 32%;
    height: 90%;
    border: 1px solid #fff;
}
.logo{
    margin-top: 15px;
    margin-left: 19%;
    width: 150px;
    height: 150px;
}
.welcome{
    display: block;
    margin-top: 20px;
    margin-left: 11%;
    font-family: "仿宋";
    font-size: 18px;
    font-weight: bolder;
    font-weight: bold;
}
a{
    display: inline-block;
    text-decoration: none;
    color: #fff;
    width: 100%;
    height: 100%;
}
</style>