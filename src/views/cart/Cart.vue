<template>
  <div class="cart">
    <!-- 顶部标题栏 -->
    <!-- <van-nav-bar title="购物车" left-arrow  fixed /> -->
    <nav-bar class="home-nav" @click-left="aaa()">
      <div slot="center">购物车</div>
    </nav-bar>
    <!-- 当购物车不为空时  展示商品信息 -->
    <div v-if="$store.state.cartList.length>0">
      <div class="cart_list" v-for="(item,index) in cartList" :key="index">
        <van-checkbox v-model="item.isCheck">
        </van-checkbox>
        <van-card :num="item.count" :price="item.price" :desc="item.desc" :title="item.title" :thumb="item.image">
        </van-card>
      </div>
    </div>
    <!-- 当购物车为空时 -->
    <div v-if="$store.state.cartList.length==0" class="img">
      <img :src="img" />
      <div>空空如也～</div>
    </div>
    <!-- 底部支付组件 -->
    <cart-pay></cart-pay>
  </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar";
  import cartPay from "./childComps/cartPay.vue"; //底部支付组件
  export default {
    name: "cart",
    data() {
      return {
        //购物车中的商品数据
        cartList: this.$store.state.cartList,
        //当购物车为空时的图片展示
        img: require('../../assets/img/1212.png')
      };
    },
    methods: {
      aaa() {
        this.$router.go(-1);
      }
    },
    components: {
      NavBar,
      cartPay
    },
    created() {
      // console.log(this.cartList)
    },
    mounted() {
      console.log(this.cartList)
    }
  };
</script>
<style lang="less" scoped>
  .cart {
    height: calc(100vh - 100px);
    background-color: #f2f2f2;
  }

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

  .van-nav-bar {
    background-color: #ff8e97;
  }

  .van-nav-bar__title {
    color: white;
    font-size: 16px;
  }

  .van-icon-arrow-left::before {
    color: white;
    font-size: 20px;
  }

  .van-card__title {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
    margin: -8px 0 6px 0px;
  }

  .van-card__price {
    color: #f30600;
    font-weight: bold;
  }

  .cart_list {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    width: 100vw;
    background-color: #FAFAFA;
    margin-top: 0.8rem;
  }

  .cart_list .van-checkbox {
    margin-left: 0.6rem;
  }

  .cart_list .van-card {
    width: 90vw;
    right: 0;
    padding: 0.16rem 1rem 0.16rem 0.06rem;
    margin: 2.13333vw 0;
  }

  .img {
    height: calc(100% - 96px);
    background-color: #F2F2F2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .img div {
    width: 100%;
    height: 3rem;
    background-color: #f2f2f2;
    text-align: center;
    line-height: 3rem;
  }
</style>