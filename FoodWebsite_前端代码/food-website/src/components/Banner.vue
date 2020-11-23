<template>
  <div class="banner-container" @mouseenter="autoStop()" @mouseleave="autoStart()">
    <ul class="images" :style="{
      width: (banners.length + 1) * 100 + '%',
      marginLeft: -index * 100 + '%'
    }" :class="{change: index != 0}">
      <li v-for="(item, i) in banners" :key="i" :style="{width: 100 / (banners.length + 1) + '%'}">
        <a :href="item.link"><img :src="item.url" alt="" class="image"/></a>
      </li>
      <!-- 把第一张图片复制一份到最后，实现循环滚动无回滚 -->
      <li :style="{width: 100 / (banners.length + 1) + '%'}">
        <a :href="banners[0].link"><img :src="banners[0].url" alt="" class="image"></a>
      </li>
    </ul>
    <div class="icon">
      <ul class="dots">
        <li v-for="(item, i) in banners" :key="i" :class="{
          active: i == index
        }" @click="index = i"></li>
    </ul>
    </div>
  </div>
</template>

<script>
/**
 * 有那些图片
 * 每张图片的超链接地址
 */
export default {
  props:{
    banners:{
      type: Array,
      required: true
    }
  },
  data(){
    return{
      index: 0,//当前显示的第几张图片
      timer: null
    }
  },
  created(){//组件创建
    this.autoStart();
  },
  destroyed(){//组件销毁
    this.autoStop();
  },
  methods:{
    //自动开始切换
    autoStart(){
      if(this.timer){
        return;
      }
      this.timer = setInterval(() => {
        this.index = (this.index + 1) % (this.banners.length + 1);
      }, 2200);
    },
    //停止自动切换
    autoStop(){
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
</script>

<style scoped>
.banner-container{
  position: relative;
  border: 1px solid #333;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.images{
  height: 100%;
}
.change{
  transition: 0.8s;
}
li{
  float: left;
  list-style: none;
}
.image{
  margin-top: 6.5vh;
  width: 100%;
  height: 93.5vh;
}
.icon{
  position: absolute;
  right: 30px;
  bottom: 0px;
}
.dots li{
  width: 5px;
  height: 5px;
  border: 5px solid #999;
  border-radius: 50%;
  margin-bottom: 30px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
.active{
  border: 5px solid #ff6767 !important;
}
</style>