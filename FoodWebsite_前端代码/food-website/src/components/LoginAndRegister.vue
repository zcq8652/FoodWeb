<template>
    <div class="container">
       <div class="image_box">
           <label v-for="(item, i) in imageUrls" :key="i">
               <img :src="item" :class="`image${i}`">
           </label>
       </div>
       <Center>
           <div class="loginOrRegister_box">
               <slot></slot>
           </div>
       </Center>
    </div>
</template>

<script>
import Center from "../components/Center";
export default {
    components: {
        Center
    },
    data(){
        return{
            imageUrls: [
                require("../assets/images/login1.jpg"),
                require("../assets/images/login2.jpg"),
                require("../assets/images/login3.jpg"),
                require("../assets/images/login4.jpg"),
                require("../assets/images/login5.jpg")
            ]
        }
    }
}
</script>

<style scoped>
.container{
    position: relative;
    width: 100%;
    height: 100vh;
}
.image_box label{
    position: absolute;
    width: 100%;
    height: 100vh;
}
.image_box img{
    width: 100%;
    height: 100vh;
}
.image0{
    opacity: 1;
    z-index: 5;
    animation: turn 30s linear infinite;
    -webkit-animation: turn 30s linear infinite;
    -o-animation: turn 30s linear infinite;
    -moz-animation: turn 30s linear infinite;
}
.image1{
    opacity: 0;
    z-index: 4;
    animation: turn 30s linear 6s infinite;
    -webkit-animation: turn 30s linear 6s infinite;
    -o-animation: turn 30s linear 6s infinite;
    -moz-animation: turn 30s linear 6s infinite;
}
.image2{
    opacity: 0;
    z-index: 3;
    animation: turn 30s linear 12s infinite;
    -webkit-animation: turn 30s linear 12s infinite;
    -o-animation: turn 30s linear 12s infinite;
    -moz-animation: turn 30s linear 12s infinite;
}
.image3{
    opacity: 0;
    z-index: 2;
    animation: turn 30s linear 18s infinite;
    -webkit-animation: turn 30s linear 18s infinite;
    -o-animation: turn 30s linear 18s infinite;
    -moz-animation: turn 30s linear 18s infinite;
}
.image4{
    opacity: 0;
    z-index: 1;
    animation: turn 30s linear 24s infinite;
    -webkit-animation: turn 30s linear 24s infinite;
    -o-animation: turn 30s linear 24s infinite;
    -moz-animation: turn 30s linear 24s infinite;
}
/*淡入淡出动画*/
@keyframes turn{
    10%{opacity: 1;}
    20%{opacity: 1;}
    35%{opacity: 0;}
    100%{opacity: 0;}
}
@-o-keyframes turn{
    10%{opacity: 1;}
    20%{opacity: 1;}
    35%{opacity: 0;}
    100%{opacity: 0;}
}
@-moz-keyframes turn{
    10%{opacity: 1;}
    20%{opacity: 1;}
    35%{opacity: 0;}
    100%{opacity: 0;}
}
@-webkit-keyframes turn{
    10%{opacity: 1;}
    20%{opacity: 1;}
    35%{opacity: 0;}
    100%{opacity: 0;}
}
.loginOrRegister_box{
    width: 660px;
    height: 360px;
    background-color: #fff;
    border-radius: 6px;
    opacity: 80%;
}
</style>