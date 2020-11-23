<template>
    <LoginAndRegister>
        <div class="registerSuccess" v-if="this.$route.params.status==1">
            <div class="txt1">恭喜您！注册成功！记住账号去登录吧！</div>
            <div class="txt2">您的账号为：{{this.$route.params.account}}</div>
            <div class="txt3">注意：请务必记住您的账号，登录时需要用账号进行登录</div>
        </div>
        <div class="registerFail" v-if="this.$route.params.status==0">
            <img src="../assets/images/404.jpg" alt="">
        </div>
    </LoginAndRegister>
</template>

<script>
import LoginAndRegister from "../components/LoginAndRegister";
export default {
    components: {
        LoginAndRegister
    }
}
</script>

<style scoped>
.registerSuccess{
    position: relative;
    text-align: center;
}
.txt1, .txt2{
    font-size: 28px;
    font-family: "微软雅黑";
}
.txt3{
    font-size: 20px;
    color: #f40;
    font-weight: bolder;
}
.txt1{
    position: absolute;
    top: 100px;
    left: 80px;
}
.txt2{
    position: absolute;
    top: 150px;
    left: 80px;
}
.txt3{
    position: absolute;
    top: 200px;
    left: 80px;
}
.registerFail{
    position: relative;
}
.registerFail img{
    position: absolute;
    top: 100px;
    left: 110px;
    width: 500px;
}
</style>