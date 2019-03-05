<template>
    <div class="hisArticle">
        <div class="header">他的文章</div>
        <div class="title-box" v-for="item in list" :key="item.id">
            <div class="title">{{ item.title }}</div>
            <span class="el-icon-info">{{ item.readNum }}</span>
            <span class="el-icon-info">{{ item.collectNum }}</span>
        </div>
        <button>更多>>></button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [{
                id: '1',
                title: '前端工程师必读这个标题有点长',
                readNum: '10001',
                collectNum: '10086'
            }, {
                id: '2',
                title: '前端工程师必读',
                readNum: '18881',
                collectNum: '10086'
            }, {
                id: '3',
                title: '前端工程师必读这个标题有点长',
                readNum: '20001',
                collectNum: '10086'
            }]
        };
    }
};
</script>
<style lang="scss" scoped>
    .hisArticle {
        position: relative;
        width: 100%;
        height: 360px;
        -webkit-box-shadow:0 0 10px grey;
        -moz-box-shadow:0 0 10px grey;
        box-shadow:0 0 10px grey;
        margin-top: 10px;
    }
    .header {
        text-align: center;
        line-height: 50px;
        color: #fff;
        height: 50px;
        background-color: rgb(20, 192, 235);
    }
    .title-box {
        height: 75px;
        padding: 10px;
        width: 200px;
    }
    .title {
        margin-bottom: 7px;
        font-size: 15px;
        font-weight: bold;
    }
    button {
        padding: 3px;
        float: right;
        cursor: pointer;
        border: 1px solid rgb(20, 192, 235);
        border-radius: 5px;
        position: absolute;
        right: 10px;
        bottom: 15px;
    }
    span {
        font-size: 12px;
        margin-right: 20px;
    }
</style>
