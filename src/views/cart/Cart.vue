<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--商品列表-->
    <scroll class="content" ref="scroll">
      <!-- <cart-list class="cartL" :cart-list='cartList'></cart-list> -->
      <cart-list />
    </scroll>
    
    <!--    底部汇总-->
    <!-- <cart-bottom-bar /> -->
    <!-- 底部支付组件 -->
    <cart-pay></cart-pay>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from 'components/common/scroll/Scroll.vue'
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import cartPay from "./childComps/cartPay"; //底部支付组件

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      CartBottomBar,
      cartPay
    },
    computed: {
      // 两种语法
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>