// 提供相关品牌api
import request from "@/utils/request";
/**
 * 相关品牌api
 * @param {Integer} limit 品牌个数
 * @return Promise
 */

export const findBrand = (limit = 6) => {
  return request("/home/brand", "get", { limit });
};
// 轮播图
export const findBanner = () => {
  return request("/home/banner", "get");
};
// 推荐好物
export const findNew = () => {
  return request("/home/new", "get");
};
// 人气推荐
export const findHot = () => {
  return request("/home/hot", "get");
};

// 产品区块
export const findGoods=()=>{
  return request("/home/goods",'get')
}
// 最新专题
export const findSpecial=()=>{
  return request('/home/special','get')
}
