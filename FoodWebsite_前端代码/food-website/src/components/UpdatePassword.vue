<template>
    <div class="updatePassword">
        <div class="update_password_top">
            <span class="update_title">密码设置</span>
            <div class="line"></div>
            <div class="save_message" @mouseenter="handleEnter(1)" @mouseleave="handleLeave()" :style="{
                opacity: isEnter==1 ? 0.6 : 1
            }" @click="handleUpdatePass">修改</div>
        </div>
        <div class="update_password_center">
            <ul>
                <li><span>当前密码</span><input type="password" v-model="password" @blur="handleCheckPass"/><div><span class="password_prompt">{{passwordPrompt}}</span><img :src="iconUrl1" class="icon"></div></li>
                <li><span><span style="visibility: hidden;">隐</span>新密码</span><input type="password" v-model="newpass" @input="checkNewPass"><div><span class="newpass_prompt">{{newpassPrompt}}</span><img :src="iconUrl2" class="icon"></div></li>
                <li><span>确认密码</span><input type="password" v-model="againpass" @input="checkAgainPass"><div><span class="againpass_prompt">{{againpassPrompt}}</span><img :src="iconUrl3" class="icon"></div></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {checkPassword, updatePassword} from "../services/userService";
export default {
    data(){
        return {
            isEnter: 0,
            password: "",
            newpass: "",
            againpass: "",
            passwordPrompt: "",
            newpassPrompt: "密码长度在6到12位之间",
            againpassPrompt: "",
            iconUrl1: "",
            iconUrl2: "",
            iconUrl3: "",
            yesImgUrl: require("../assets/images/yes.png"),
            noImgUrl: require("../assets/images/no.png")
        }
    },
    methods: {
        handleEnter(num){
            this.isEnter = num;
        },
        handleLeave(){
            this.isEnter = 0;
        },
        checkNewPass(){
            if(this.newpass==""){
                this.newpassPrompt = "密码不能为空";
                this.iconUrl2 = this.noImgUrl;
            }else if(this.newpass.length < 6){
                this.newpassPrompt = "密码长度不能少于6位";
                this.iconUrl2 = this.noImgUrl;
            }else{
                this.newpassPrompt = "密码格式正确";
                this.iconUrl2 = this.yesImgUrl;
            }
        },
        checkAgainPass(){
            if(this.againpass != this.newpass){
                this.againpassPrompt = "两次密码填写不一致";
                this.iconUrl3 = this.noImgUrl;
            }else{
                this.againpassPrompt = "填写正确";
                this.iconUrl3 = this.yesImgUrl;
            }
        },
        async handleCheckPass(){
            if(this.$store.state.loginUser.data!=null){
                var resp = await checkPassword(this.$store.state.loginUser.data.account, this.password);
                if(resp.data.state==1){
                    this.passwordPrompt = "密码填写正确";
                    this.iconUrl1 = this.yesImgUrl;
                }else if(resp.data.state==0){
                    this.passwordPrompt = "密码填写错误";
                    this.iconUrl1 = this.noImgUrl;
                }
            }
        },
        async handleUpdatePass(){
            if(this.iconUrl1==this.yesImgUrl && this.iconUrl2 == this.yesImgUrl && this.iconUrl3 == this.yesImgUrl){
                var resp = await updatePassword(this.$store.state.loginUser.data.account, this.newpass);
                if(resp.data.state==1){
                    this.$store.commit("loginUser/setData", null);
                    this.$router.push({name: "Login"});
                }
            }
        }
    }
}
</script>

<style scoped>
.update_password_center li{
    list-style: none;
    margin-left: 30px;
    font-size: 19px;
    color: #555666;
    margin-top: 25px;
}
.update_password_center li input{
    margin-left: 30px;
    width: 300px;
    height: 45px;
    border-radius: 6px;
    border: 1px solid #ccc;
    outline: none;
}
.update_password_center div{
    display: inline-block;
    margin-left: 15px;
    width: 350px;
    height: 50px;
}
.password_prompt, .newpass_prompt, .againpass_prompt{
    display: inline-block;
}
.icon{
    position: absolute;

    margin-top: -8px;
    width: 40px;
}
</style>