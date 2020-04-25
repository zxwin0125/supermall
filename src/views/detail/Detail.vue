<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBottomBar from "./childComps/DetailBottomBar";



  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  // import BackTop from "components/content/backTop/BackTop";
  // import Toast from "components/common/toast/Toast";

  import {getDetail, Goods, GoodsParam, Shop, getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {itemListenerMixin, backTopMixin} from "common/mixin";
  // import {BACK_POSITION} from "common/const";

  import { mapActions } from 'vuex'


  export default {
      name: "Detail",
      components: {
        DetailBaseInfo,
        DetailCommentInfo,
        DetailGoodsInfo,
        DetailNavBar,
        DetailParamInfo,
        DetailShopInfo,
        DetailSwiper,
        GoodsList,
        DetailBottomBar,

        Scroll,
        // BackTop
        // Toast
      },
      mixins: [itemListenerMixin,backTopMixin],
      data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            // isShowBackTop: false
            // message: '',
            // show: false
        }
      },
      created() {
          // 1. 保存传入的iid
          this.iid = this.$route.params.iid;

          // 2. 根据iid请求详情数据
          getDetail(this.iid).then(res => {
              // console.log(res);
              // 1. 获取数据
              const data = res.result;

              // 2. 获取轮播图的数据
              this.topImages = data.itemInfo.topImages;

              // 3. 获取商品信息
              this.goods = new Goods(
                  data.itemInfo,
                  data.columns,
                  data.shopInfo.services
              );

              // 4. 创建店铺信息的对象
              this.shop = new Shop(data.shopInfo);

              // 5. 保存商品的详情数据
              this.detailInfo = data.detailInfo;

              // 6. 获取参数的信息
              this.paramInfo = new GoodsParam(
                  data.itemParams.info,
                  data.itemParams.rule
              );

              // 7. 取出评论的信息
              if (data.rate.cRate !== 0) {
                  this.commentInfo = data.rate.list[0]
              }

              // this.$nextTick(() => {
              //     // 根据最新的数据，对应的DOM是已经被渲染出来
              //     // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
              //     // offsetTop值不对的时候，都是因为图片的问题
              //     this.themeTopYs = [];
              //
              //     this.themeTopYs.push(0);
              //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
              //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
              //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
              // })

          });

          // 3. 请求商品推荐数据
          getRecommend().then(res => {
              // console.log(res);
              this.recommends = res.data.list
          });

          // 4. 给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖操作)
          this.getThemeTopY = debounce(() => {
              this.themeTopYs = [];

              this.themeTopYs.push(0);
              this.themeTopYs.push(this.$refs.params.$el.offsetTop);
              this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
              this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
              this.themeTopYs.push(Number.MAX_VALUE)
          },100)
      },
      methods: {
          ...mapActions(['addCart']),
          imageLoad() {
              this.$refs.scroll.refresh()

              this.getThemeTopY()

          },
          titleClick(index) {
              // console.log(index);
              this.$refs.scroll.scrollTo(0,-this.themeTopYs[index])
          },
          contentScroll(position) {
              // 1. 获取Y值
              const positionY = -position.y;

              // 2. positionY和主题中值进行对比
              let length = this.themeTopYs.length;
              for(let i = 0; i < length; i++) {
                // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
                //     console.log(i)
                // }

                //   if (this.currentIndex !== i && ((i < length - 1 &&
                //       positionY >= this.themeTopYs[i] &&
                //       positionY < this.themeTopYs[i+1]) ||
                //       (i === length - 1 && positionY >= this.themeTopYs[i]))) {
                //       this.currentIndex = i;
                //       this.$refs.nav.currentIndex = this.currentIndex
                //   }

                  if (this.currentIndex !== i &&
                      (positionY >= this.themeTopYs[i] &&
                          positionY < this.themeTopYs[i+1])) {
                      this.currentIndex = i;
                      this.$refs.nav.currentIndex = this.currentIndex
                  }
              }

              // 3. 是否显示回到顶部
              // this.isShowBackTop = (-position.y) > BACK_POSITION
              this.listenShowBackTop(position)

          },
          // 返回顶部事件
          // backClick() {
          //     this.$refs.scroll.scrollTo(0,0)
          // }

          addToCart() {
              // console.log(1234)
              // 1. 获取购物车需要展示的信息
              const product = {};
              product.image = this.topImages[0];
              product.title = this.goods.title;
              product.desc = this.goods.desc;
              product.price = this.goods.realPrice;
              product.iid = this.iid;

              // 2. 将商品添加到购物车(1. Promise  2. mapActions)
              // this.$store.cartList.push(product)
              // this.$store.commit('addCart',product)
              this.addCart(product).then(res => {
                  // console.log(res)
                  // this.show = true;
                  // this.message = res;
                  //
                  // setTimeout(() => {
                  //     this.show = false;
                  //     this.message = ''
                  // }, 1500)

                  this.$toast.show(res, 2000)
                  // console.log(this.$toast)
              })

              // this.$store.dispatch('addCart',product).then(res => {
              //     console.log(res)
              // })
          }

      },
      mounted() {
          // console.log(121212)

      },
      updated() {

      },

      destroyed() {
          this.$bus.$off('itemImgLoad', this.itemImgListener )
      }

  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
