// 定义分类相关的API接口函数
import request from "@/utils/request";

/**
 * 获取所有分类（顶级，二级，对应的商品推荐数据）
 * @returns Promise
 */
export const findAllCategory = () => {
  return request("/home/category/head", "get");
};

/**
 *获取顶级类目信息（children属性就是个各子分类
 * @param {string} id - 顶级类目ID
 * @returns
 */
export const findTopCategory = (id) => {
  return request("/category", "get", { id });
};

/**
 *
 * 获取筛选类目信息
 * @param {string} id - 筛选类目
 * @returns
 */
export const findSubCategoryFilter = (id) => {
  return request("/category/sub/filter", "get", { id });
};

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params 
 */
export const findSubCategoryGoods=(params)=>{
  return request('/category/goods/temporary','post',params)
}