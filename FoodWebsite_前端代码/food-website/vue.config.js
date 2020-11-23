module.exports = {
    //vue的配置
    devServer: {
        //针对开发服务器的配置
        proxy:{
            "/FoodWebsite":{
                //表示当请求路径以 /FoodWebsite 开头时，开发服务器需要代理到http://localhost:8081/FoodWebsite
                target: "http://localhost:8081"
            }
        }
    }
}