<template>
    <div class="personal">
        <div class="personal_top">
            <div class="personal_top_opa">
            </div>
            <img :src="photo" alt="" class="header">
            <span class="name">{{loginUser!=null ? loginUser.nickname : ""}}</span>
        </div>
        <div class="personal_center">
            <div class="center">
                <div class="center_left">
                    <ul>
                        <li v-for="(item, i) in list" :key="i" @click="handleClick(i)" :class="{
                            active: checked == i || (i == 0 && checked == 3)
                        }" @mouseenter="handleEnter(i)" :style="{
                            backgroundColor: isEnter==i&&checked!=i&&!(checked==3&&i==0) ? '#f4f5f6':''
                            }" @mouseleave="handleLeave()">{{item}}</li>
                    </ul>
                </div>
                <div class="center_right">
                    <label v-if="this.checked==0">
                        <PersonalMessage @update="handleUpdate"/>
                    </label>
                    <label v-if="this.checked==1">
                        <MyMenu/>
                    </label>
                    <label v-if="this.checked==2">
                        <UpdatePassword/>
                    </label>
                    <label v-if="this.checked==3">
                        <UpdateMessage @change="handleChange"/>
                    </label>
                </div>
            </div>
        </div>
        <div class="personal_bottom">
            <Bottom/>
        </div>
    </div>
</template>

<script>
import personal from "../assets/css/personal.css";
import PersonalMessage from "../components/PersonalMessage";
import MyMenu from "../components/MyMenu";
import UpdatePassword from "../components/UpdatePassword";
import Bottom from "../components/Bottom";
import UpdateMessage from "../components/UpdateMessage";
import {mapState} from "vuex";
export default {
    components: {
        Bottom,
        PersonalMessage,
        MyMenu,
        UpdatePassword,
        UpdateMessage
    },
    data(){
        return {
            list: ["个人资料", "我的菜谱", "修改密码"],
            checked: 0,
            isEnter: 6
        }
    },
    created(){
        //console.log(this.$route.params.checked);
        if(this.$route.params.checked == 1){
            this.checked = 1;
        }
    },
    computed: {
        ...mapState("loginUser", {
            loginUser: "data",
            isLogining: "isLoading"
        }),
        photo(){
            if(this.loginUser != null){
                if(this.loginUser.photo != "http://localhost:8081/images/null"){
                    return this.loginUser.photo;
                }else{
                    return require("../assets/images/logo.jpg");
                }
            }
        }
    },
    methods: {
        handleEnter(num){
            this.isEnter = num;
        },
        handleLeave(){
            this.isEnter = 6;
        },
        handleClick(index){
            this.checked = index;
        },
        handleUpdate(index){
            this.checked = index;
        },
        handleChange(checked){
            this.checked = checked;
        }
    }
}
</script>

<style scoped>
.personal{
    width: 100%;
}
.personal_top{
    width: 100%;
    height: 250px;
}
.personal_top_opa{
    width: 100%;
    height: 250px;
    background-image: url(../assets/images/personal.jpg);
    background-size: 100% 450px;
    filter: blur(5px);
}
.header{
    position: absolute;
    top: 95px;
    left: 140px;
    width: 110px;
    height: 110px;
    border-radius: 55px;
}
.name{
    position: absolute;
    top: 138px;
    left: 280px;
    font-size: 20px;
    font-weight: bold;
}
.personal_center{
    width: 100%;
    border: 1px solid #f4f5f6;
    background-color: #f4f5f6;
}
.center {
    width: 90%;
    margin: 10px auto;
}
.center_left{
    margin-left: 6px;
    width: 220px;
    height: 805px;
    background-color: #fff;
    float: left;
}
.center_right{
    width: 84%;
    background-color: #fff;
    margin-left: 240px;
}
.center_left li{
    width: 160px;
    height: 45px;
    border-radius: 8px;
    list-style: none;
    font-size: 19px;
    text-align: center;
    line-height: 45px;
    margin-left: 30px;
    margin-top: 20px;
    cursor: pointer;
    color: #555666;
}
.active{
    background-color: #FF4400;
    color: #fff !important;
}
</style>