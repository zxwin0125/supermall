<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recomments"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";
    import BackTop from "components/content/backTop/BackTop";

    import {getHomeMultidata,getHomeGoods} from "network/home";
    import {debounce} from "common/utils";
    import {itemListenerMixin,backTopMixin} from "common/mixin";
    // import {BACK_POSITION} from "common/const";

    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            // BackTop
        },
        mixins: [itemListenerMixin, backTopMixin],
        data() {
            return {
                // result: null,
                banners: [],
                recomments: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                currentType: 'pop',
                // isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }

        },
        destroyed() {
            console.log('destroy')
        },
        activated() {
            // console.log(activated)
            this.$refs.scroll.scrollTo(0, this.saveY, 0)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            // console.log(deactivated)
            // 1. 保存Y值
            this.saveY = this.$refs.scroll.getScrollY()

            // 2. 取消全局事件的监听
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        created() {
            // 1. 请求轮播图数据
            this.getHomeMultidata();

            // 2. 请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');

        },
        mounted() {
            // 防抖动事件
            // const refresh = debounce(this.$refs.scroll.refresh,500);

            // 对监听的事件进行保存
            // this.itemImgListener = () => {
            //     refresh()
            // }
            // 3. 监听item中图片加载完成
            // this.$bus.$on('itemImageLoad', this.itemImgListener)

            // 4. 赋值
            this.tabOffsetTop = this.$refs.tabControl
        },
        methods: {
            /**
             * 事件监听相关的方法
             */

            // Tab选项卡事件
            tabClick(index) {
                // console.log(index);
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },

            // 返回顶部事件
            backClick() {
              this.$refs.scroll.scrollTo(0,0)
            },

            // 判断滚动内容的高度事件
            contentScroll(position) {
                // console.log(position);
                // 1. 判断BackTop是否显示
                // this.isShowBackTop = (-position.y) > BACK_POSITION
                this.listenShowBackTop(position);

                // 2. 决定tabControl是否吸顶(position: fixed)
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },

            // 上拉加载事件
            loadMore() {
                // console.log('上拉加载更多');
                this.getHomeGoods(this.currentType);

                this.$refs.scroll.scroll.refresh()
            },

            swiperImageLoad() {
                // console.log(this.$refs.tabControl.$el.offsetTop);
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            },

            /**
             * 网络请求相关的方法
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    // console.log(res);
                    // this.result = res;
                    this.banners = res.data.banner.list;
                    this.recomments = res.data.recommend.list;
                })
            },

            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type,page).then(res => {
                    // console.log(res);
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1

                    // 完成上拉加载更多
                    this.$refs.scroll.finishPullUp()
                })
            },

        }
    }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /* vh -> viewport height 视口高度 */
    height: 100vh;
    position: relative;
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

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
