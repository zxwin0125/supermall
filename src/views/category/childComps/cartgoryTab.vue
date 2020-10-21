<template>
    <div>
        <van-nav-bar fixed title="商品分类" color="white" class="navTitle" />
    </div>
</template>
<script>
    export default {
        name: "categoryNav",
        data() {
            return {};
        }
    };
</script>

<style lang="less" scoped>
    .van-nav-bar {
        background-color: #FF8A9D;
        color: #fff;
    }

    .navTitle {
        color: #fff;
    }

    .van-nav-bar__title {
        max-width: 60%;
        margin: 0 auto;
        color: #fff;
        font-weight: 500;
        font-size: 4.26667vw;
    }

    .van-ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
    }
</style>