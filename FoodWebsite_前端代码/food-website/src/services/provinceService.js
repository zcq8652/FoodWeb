//关于Province的相关请求
import axios from "axios";

//获取全部省份信息
export async function getAllProvince(){
    var resp = await axios.get("/FoodWebsite/province/getAllProvince");
    return resp;
}
//获取八个省份的信息
export async function getEightProvince(){
    var resp = await axios.get("/FoodWebsite/eightProvince/getEightProvince");
    return resp;
}