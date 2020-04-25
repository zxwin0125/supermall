import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";
import {BACK_POSITION} from "./const";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },

  mounted() {
    // 防抖动事件
    const refresh = debounce(this.$refs.scroll.refresh,500);

    this.itemImgListener = () => {
      refresh()
    }

    this.$bus.$on('itemImgLoad', this.itemImgListener )
    // console.log('1212')
  }

};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
    }
  }
}
