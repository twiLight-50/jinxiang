<template>
    <RouterLink :to="path" class="Jx-more">
      <span>查看全部</span>
      <i class="iconfont icon-angle-right"></i>
    </RouterLink>
  </template>
  
  <script>
  export default {
    name: 'JxMore',
    props: {
      path: {
        type: String,
        default: '/'
      }
    }
  }
  </script>
  
  <style scoped lang='less'>
  .Jx-more {
    margin-bottom: 2px;
    span {
      font-size: 16px;
      vertical-align: middle;
      margin-right: 4px;
      color: #999;
    }
    i {
      font-size: 16px;
      vertical-align: middle;
      position: relative;
      top: 2px;
      color: #ccc;
    }
    &:hover {
      span,i {
        color: @JxColor;
      }
    }
  }
  </style>