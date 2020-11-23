<template>
    <LoginAndRegister>
        <div class="register_box_top">
            <div class="register">注册</div>
            <div class="login"><router-link :to="{name:'Login'}">登录</router-link></div>
        </div>
        <div class="register_box_content">
            <div class="content_left">
                <div class="username_div"><span>昵<label class="hiddenText">隐藏</label>称：</span><input type="text" id="username" v-model="userInfo.username" @input="checkUsername"></div>
                <div class="password_div"><span>密<label class="hiddenText">隐藏</label>码：</span><input type="password" id="password" v-model="userInfo.password" autocomplete="new-password" @input="checkPassword"></div>
                <div class="againPass_div"><span>确认密码：<input type="password" id="againPass" v-model="userInfo.againPass" @input="checkAgainPass"></span></div>
                <input type="submit" value="注 册" id="register_btn" @click="handleRegister">
            </div>
            <div class="content_right">
                <div class="username_prompt"><span>{{usernamePrompt}}</span><img :src="iconUrl1" class="icon"></div>
                <div class="password_prompt"><span>{{passwordPrompt}}</span><img :src="iconUrl2" class="icon"></div>
                <div class="againPass_prompt"><span>{{againPassPrompt}}</span><img :src="iconUrl3" class="icon"></div>
            </div>
        </div>
    </LoginAndRegister>
</template>

<script>
import LoginAndRegister from "../components/LoginAndRegister";
import {register} from "../services/userService";
export default {
    components: {
        LoginAndRegister
    },
    data(){
        return{
            userInfo:{
                username: "",
                password: "",
                againPass: ""
            },
            usernamePrompt: "昵称长度在1到6位之间",
            passwordPrompt: "密码长度在6到12位之间",
            againPassPrompt: "",
            iconUrl1: "",
            iconUrl2: "",
            iconUrl3: "",
            yesImgUrl: require("../assets/images/yes.png"),
            noImgUrl: require("../assets/images/no.png")
        }
    },
    methods:{
        checkUsername(){
            if(this.userInfo.username==""){
                this.usernamePrompt = "昵称不能为空";
                this.iconUrl1 = this.noImgUrl;
            }else if(this.userInfo.username.length > 6){
                this.usernamePrompt = "昵称长度不能超过6位";
                this.iconUrl1 = this.noImgUrl;
            }else{
                this.usernamePrompt = "昵称可以使用";
                this.iconUrl1 = this.yesImgUrl;
            }
        },
        checkPassword(){
            if(this.userInfo.password==""){
                this.passwordPrompt = "密码不能为空";
                this.iconUrl2 = this.noImgUrl;
            }else if(this.userInfo.password.length < 6){
                this.passwordPrompt = "密码长度不能少于6位";
                this.iconUrl2 = this.noImgUrl;
            }else{
                this.passwordPrompt = "密码格式正确";
                this.iconUrl2 = this.yesImgUrl;
            }
        },
        checkAgainPass(){
            if(this.userInfo.password != this.userInfo.againPass){
                this.againPassPrompt = "两次密码填写不一致";
                this.iconUrl3 = this.noImgUrl;
            }else{
                this.againPassPrompt = "填写正确";
                this.iconUrl3 = this.yesImgUrl;
            }
        },
        async handleRegister(){
            if(this.iconUrl1==this.yesImgUrl&&this.iconUrl2==this.yesImgUrl&&this.iconUrl3==this.yesImgUrl){
                var resp = await register(this.userInfo);
                //console.log(resp);
                if(resp.data.state != 0){
                    this.$router.push({name:"Feedback",params:{status:1,account:resp.data.state}});
                }else{
                    this.$router.push({name:"Feedback",params:{status:0}});
                }
            }else{
                if(this.iconUrl1==""){
                    this.usernamePrompt = "昵称不能为空";
                    this.iconUrl1 = this.noImgUrl;
                }
                if(this.iconUrl2==""){
                    this.passwordPrompt = "密码不能为空";
                    this.iconUrl2 = this.noImgUrl;
                }
                if(this.iconUrl3==""){
                    this.againPassPrompt = "确认密码不能为空";
                    this.iconUrl3 = this.noImgUrl;
                }
            }
        }
    }
}
</script>

<style scoped>
.register_box_top{
    width: 100%;
    height: 60px;
}
.register{
    width: 50%;
    height: 100%;
    float: left;
    font-size: 26px;
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
    background-color: #000;
    color: #fff;
    opacity: 80%;
    border-top-right-radius: 6px;
}
.register_box_content{
    width: 100%;
    height: 300px;
}
.content_left{
    margin-top: 10px;
    width: 65%;
    height: 90%;
    border: 1px solid #fff;
    float: left;
}
.username_div, .password_div, .againPass_div{
    width: 370px;
    height: 40px;
    margin-left: 27px;
}
.username_div{
    margin-top: 40px;
    border: 1px solid #999;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.password_div{
    border-left: 1px solid #999;
    border-right: 1px solid #999;
}
.againPass_div{
    border: 1px solid #999;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}
.username_div span, .password_div span, .againPass_div span{
    display: inline-block;
    width: 100px;
    height: 100%;
    font-size: 19px;
    text-align: center;
    line-height: 40px;
}
.hiddenText{
    visibility: hidden;
}
#username, #password, #againPass{
    position: fixed;
    margin-top: 3px;
    border: 1px solid #fff;
    width: 250px;
    height: 34px;
    outline: none;
}
#register_btn{
    margin-top: 20px;
    margin-left: 29px;
    width: 370px;
    height: 50px;
    border: 1px solid #ff6767;
    background-color: #ff6767;
    border-radius: 6px;
    font-size: 22px;
    color: #fff;
    outline: none;
    cursor: pointer;
}
.content_right{
    margin-left: 65%;
    width: 34%;
    height: 90%;
    border: 1px solid #fff;
}
.username_prompt{
    position: relative;
    height: 40px;
    margin-top: 50px;
}
.password_prompt, .againPass_prompt{
    position: relative;
    height: 40px;

}
.username_prompt span, .password_prompt span, .againPass_prompt span{
    position: absolute;
    display: inline-block;
    height: 40px;
    line-height: 40px;
}
.icon{
    position: absolute;
    right: 5px;
    width: 40px;
}
a{
    display: inline-block;
    text-decoration: none;
    color: #fff;
    width: 100%;
    height: 100%;
}
</style>