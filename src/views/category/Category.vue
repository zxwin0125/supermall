<template>
  <div class="category">
    <nav-bar class="home-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <category-content :categoryList="categoryList"></category-content>
  </div>
</template>
<script>

  //网络请求js模块
  import { getCategory } from '@/network/category.js'

  //组件
  // import categoryTab from './childComps/cartgoryTab.vue' //顶部标题栏
  import NavBar from "components/common/navbar/NavBar";
  import categoryContent from './childComps/categoryContent.vue' //分类页主要区域
  export default {
    name: 'Category',
    data() {
      return {
        categoryList: [],
      }
    },
    created() {
      getCategory().then((res) => {
        const { list } = res.data.category;
        // console.log(data)
        // console.log(list)
        this.categoryList = list;
      });
    },
    components: {
      // categoryTab,
      NavBar,
      categoryContent
    }
  }
</script>
<style lang="less" scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/

  }
  
  .category-content {
    margin-bottom: 1rem;
  }
</style>