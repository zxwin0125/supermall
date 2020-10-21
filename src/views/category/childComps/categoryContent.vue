<template>
    <div class="category_content">
        <div class="title">
            <div :class="{active: countIndex==index}" v-for="(item,index) in categoryList" :key="index"
                @click="indexChange(index,item)">{{ item.title }}</div>
        </div>
        <div class="content">
            <div v-for="(item,index) in cateContentList" :key="index">
                <!-- <a :href="item.link"> -->
                <img :src="item.image">
                <p>{{ item.title }}</p>
                <!-- </a> -->
            </div>
        </div>
    </div>
</template>
<script>
    import { getSubCategory } from '../../../network/category.js'
    export default {
        props: {
            categoryList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                countIndex: 0,
                maitkey: 3627,
                cateContentList: []
            };
        },
        created() {
            getSubCategory(this.maitkey).then((res) => {
                console.log(res)
                this.cateContentList = res.data.list;
            });
        },
        methods: {
            indexChange(index, item) {
                this.countIndex = index;
                this.maitKey = item.maitKey
                console.log(this.maitKey);
                getSubCategory(this.maitKey).then((res) => {
                    console.log(res);
                    this.cateContentList = res.data.list;
                });
            }
        }
    };
</script>

<style lang="less" scoped>
    .category_content {
        margin-top: 46px;
        overflow: hidden;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .title {
        background-color: #F7F7F7;
        text-align: center;
        float: left;
        overflow: auto;
        width: 30%;
        height: 100%;
    }

    .title div {
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
    }

    .title div:hover {
        cursor: pointer;
    }

    .title .active {
        font-weight: 700;
        background-color: #ffffff;
        border-left: 3px solid #FF5777;
        color: #FF5777;
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        float: left;
        overflow: auto;
        width: 70%;
        height: 100%;
    }

    .content div {
        margin-top: 10px;
    }

    .content img {
        width: 25vw;
        height: 25vw;
    }

    .content p {
        font-size: 0.36rem;
        text-align: center;
    }
</style>