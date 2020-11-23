<template>
    <div class="personal_message">
        <div class="personal_message_top">
            <span class="personal_title">账号信息</span>
            <div class="line"></div>
            <div class="update_message" @click="UpdateMessage(3)" @mouseenter="handleEnter(3)" @mouseleave="handleLeave()" :style="{
                backgroundColor: isEnter==3 ? '#FFE4E4' : ''
            }">修改信息</div>
        </div>
        <div class="personal_message_center">
            <ul>
                <li><span>账号</span><div>{{loginUser.account}}</div></li>
                <li><span class="headerSpan">头像</span><div><img :src="photo" class="headerImg"/></div></li>
                <li><span>昵称</span><div>{{loginUser.nickname}}</div></li>
                <li><span>姓名</span><div>{{loginUser.username}}</div></li>
                <template v-if="loginUser.sex==1">
                    <li><span>性别</span><div>男</div></li>
                </template>
                <template v-else-if="loginUser.sex==2">
                    <li><span>性别</span><div>女</div></li>
                </template>
                <template v-else>
                    <li><span>性别</span><div></div></li>
                </template>
                <li><span>年龄</span><div v-if="loginUser.age > 0">{{loginUser.age}}</div></li>
                <li><span>电话</span><div>{{loginUser.telephone}}</div></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    data(){
        return{
            isEnter: 0
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
        UpdateMessage(index){
            this.$emit("update", index);
        },
        handleEnter(num){
            this.isEnter = num;
        },
        handleLeave(){
            this.isEnter = 0;
        }
    }
}
</script>

<style scoped>
.personal_message_center li{
    list-style: none;
    margin-left: 70px;
    font-size: 19px;
    color: #555666;
    margin-top: 25px;
}
.personal_message_center li div{
    display: inline-block;
    margin-left: 30px;
}
.headerImg{
    width: 80px;
    height: 80px;
    margin-left: 40px;
}
.headerSpan{
    position: absolute;
    display: inline-block;
    height: 80px;
    line-height: 80px;
}
</style>