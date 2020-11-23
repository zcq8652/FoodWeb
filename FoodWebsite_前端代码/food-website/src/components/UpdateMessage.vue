<template>
    <div class="updateMessage">
        <div class="update_message_top">
            <span class="update_title">账号信息</span>
            <div class="line"></div>
            <div class="save_message" @mouseenter="handleEnter(1)" @mouseleave="handleLeave()" :style="{
                opacity: isEnter==1 ? 0.6 : 1
            }" @click="handleSaveClick">保存</div>
        </div>
        <div class="update_message_center">
            <ul>
                <li>
                    <span class="headerSpan">头像</span>
                    <div class="headImgbox">
                        <label for="head_pic" @click="handleClick()">
                            <img :src="photo" class="headerImg"/>
                        </label>
                    </div>
                    <div class="headerDiv">
                        <input type="file" id="head_pic" @click.prevent="" accept=".jpg, .jpeg, .png" ref="file" v-show="false" @change="handleAddUserPhoto($event)"/>
                    </div>
                </li>
                <li><span>昵称</span><input type="text" class="input_type1" v-model="nickname" @input="checkNickName"><div class="prompt_div"><span class="prompt">{{nicknamePrompt}}</span><img :src="iconUrl1" class="icon"></div></li>
                <li><span>姓名</span><input type="text" class="input_type1" v-model="username"></li>
                <li><span>性别</span><input type="radio" name="sex" class="input_type2" value="1" v-model="sex">男
                                     <input type="radio" name="sex" class="input_type2" value="2" v-model="sex">女
                </li>
                <li><span>年龄</span><input type="number" class="input_type1" v-model="age" @input="checkAge"><div class="prompt_div"><span class="prompt">{{agePrompt}}</span><img :src="iconUrl2" class="icon"></div></li>
                <li><span>电话</span><input type="text" class="input_type1" v-model="telephone" @input="checkTelephone"><div class="prompt_div"><span class="prompt">{{telephonePrompt}}</span><img :src="iconUrl3" class="icon"></div></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    data(){
        return {
            isEnter: 0,
            nicknamePrompt: "昵称长度在1到6位之间",
            agePrompt: "",
            telephonePrompt: "",
            iconUrl1: "",
            iconUrl2: "",
            iconUrl3: "",
            yesImgUrl: require("../assets/images/yes.png"),
            noImgUrl: require("../assets/images/no.png"),
            photo: "",
            realPhoto: null,
            nickname: "",
            username: "",
            sex: 0,
            age: 0,
            telephone: ""
        }
    },
    computed: {
        ...mapState("loginUser", {
            loginUser: "data",
            isLogining: "isLoading"
        })
    },
    created(){
            this.nickname = this.loginUser.nickname;
            this.username = this.loginUser.username;
            this.sex = this.loginUser.sex;
            this.age = this.loginUser.age;
            this.telephone = this.loginUser.telephone;
            if(this.loginUser.photo != "http://localhost:8081/images/null"){
                this.photo = this.loginUser.photo;
            }else{
                this.photo = require("../assets/images/logo.jpg");
            }
    },
    methods: {
        handleEnter(num){
            this.isEnter = num;
        },
        handleLeave(){
            this.isEnter = 0;
        },
        handleClick(){
             this.$refs.file.dispatchEvent(new MouseEvent('click'));
        },
        checkNickName(){
            if(this.nickname==""){
                this.nicknamePrompt = "昵称不能为空";
                this.iconUrl1 = this.noImgUrl;
            }else if(this.nickname.length > 6){
                this.nicknamePrompt = "昵称长度不能超过6位";
                this.iconUrl1 = this.noImgUrl;
            }else{
                this.nicknamePrompt = "昵称可以使用";
                this.iconUrl1 = this.yesImgUrl;
            }
        },
        checkAge(){
            var pattern = /^(?:[1-9][0-9]?|1[0-7][0-9]|180)$/;
            if(pattern.test(this.age)){
                this.agePrompt = "年龄格式正确";
                this.iconUrl2 = this.yesImgUrl;
            }else{
                if(this.age == ""){
                    this.agePrompt = "";
                    this.iconUrl2 = "";
                }else{
                    this.agePrompt = "年龄必须是1到180之间的十进制数值";
                    this.iconUrl2 = this.noImgUrl;
                }
            }
        },
        checkTelephone(){
            var pattern =  /^1[3|4|5|7|8][0-9]{9}$/;
            if(pattern.test(this.telephone)){
                this.telephonePrompt = "手机号码格式正确";
                this.iconUrl3 = this.yesImgUrl;
            }else{
                if(this.telephone == ""){
                    this.telephonePrompt = "";
                    this.iconUrl3 = "";
                }else{
                    this.telephonePrompt = "手机号码格式错误";
                    this.iconUrl3 = this.noImgUrl;
                }
            }
        },
        handleAddUserPhoto(e){
            var that = this;
            var file = e.target.files[0];
            var pstr = "(.jpg|.png|.jpeg)$";
            var pattern = new RegExp(pstr);
            if(pattern.test((file.name+"").substring((file.name+"").lastIndexOf(".")).toLowerCase())){
                that.realPhoto = file;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e){
                    that.photo = this.result;
                }
            }
        },
        async handleSaveClick(){
            if(this.iconUrl1 != this.noImgUrl && this.iconUrl2 != this.noImgUrl && this.iconUrl3 != this.noImgUrl){
                if(this.age == ""){
                    this.age = 0;
                }
                var formData = new FormData();
                if(this.realPhoto != null){
                    formData.append('pic', this.realPhoto);
                    formData.append('nickname', this.nickname);
                    formData.append('username', this.username);
                    formData.append('sex', this.sex);
                    formData.append('age', this.age);
                    formData.append('telephone', this.telephone);
                    formData.append('account', this.$store.state.loginUser.data.account);
                    var result = await this.$store.dispatch("loginUser/updateUserInfo", formData);
                    if(result == 1){
                        //触发一个事件，但该组件处理不了，传递给父组件处理
                        this.$emit("change", 0);
                    }    
                }else{
                    formData.append('nickname', this.nickname);
                    formData.append('username', this.username);
                    formData.append('sex', this.sex);
                    formData.append('age', this.age);
                    formData.append('telephone', this.telephone);
                    formData.append('account', this.$store.state.loginUser.data.account);
                    var result = await this.$store.dispatch("loginUser/updateUserInfo2", formData);
                    if(result == 1){
                        //触发一个事件，但该组件处理不了，传递给父组件处理
                        this.$emit("change", 0);
                    }  
                }
            }
        }
    }
}
</script>

<style scoped>
.update_message_center li{
    list-style: none;
    margin-left: 70px;
    font-size: 19px;
    color: #555666;
    margin-top: 25px;
}
.update_message_center li .input_type1{
    margin-left: 30px;
    width: 300px;
    height: 45px;
    border-radius: 6px;
    border: 1px solid #ccc;
    outline: none;
}
.update_message_center li .input_type2{
    margin-left: 30px;
}
.update_message_center li .input_type3{
    width: 300px;
    outline: none;
    border: 1px solid #000;
    margin-top: 25px;
}
.update_message_center li .headImgbox{
    display: inline-block;
    margin-left: 30px;
}
.headerImg{
    width: 80px;
    height: 80px;
    margin-left: 40px;
    cursor: pointer;
}
.headerSpan{
    position: absolute;
    display: inline-block;
    height: 80px;
    line-height: 80px;
}
.headerDiv{
    position: absolute;
    display: inline-block;
    width: 300px;
    height: 80px;
    margin-left: 30px;
}
.prompt_div{
    display: inline-block;
    margin-left: 15px;
    width: 350px;
    height: 50px;
}
.prompt{
    display: inline-block;
}
.icon{
    position: absolute;
    margin-top: -8px;
    width: 40px;
}
</style>