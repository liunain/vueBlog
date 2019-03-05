<template>
<div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
    <div class="blogBox" v-for = 'item of list' :key="item.list">
        <h2>{{ item.blogTitle }}</h2>
        <div class="blogContent">
            <span>{{ item.blogContent }}</span>
        </div>
        <div class="details">
            <div class="left">
                <span class="el-icon-info">{{ item.author }}</span>
                <span>{{ item.time }}</span>
            </div>
            <div class="right">
                <span class="el-icon-info">{{ item.scanNum }}</span>
                <span class="el-icon-info">{{ item.commentNum }}</span>
                <span class="el-icon-info">{{ item.collectNum }}</span>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
var count = 0;
export default {
    data() {
        return {
            list: [{
                id: '1',
                blogTitle: '这是一个资源',
                blogContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容..........',
                author: '我是作者',
                time: '2018/01/01',
                scanNum: '10001',
                commentNum: '2100',
                collectNum: '10086'
            }, {
                id: '2',
                blogTitle: '这是一个资源',
                blogContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容........',
                author: '我是作者',
                time: '2018/01/01',
                scanNum: '10001',
                commentNum: '2100',
                collectNum: '10086'
            }, {
                id: '3',
                blogTitle: '这是一个资源',
                blogContent: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容........',
                author: '我是作者',
                time: '2018/01/01',
                scanNum: '10001',
                commentNum: '2100',
                collectNum: '10086'
            }],
            busy: false
        };
    },
    methods: {
        loadMore() {
            this.busy = true;
            setTimeout(() => {
                for (var i = 0, j = 3; i < j; i++) {
                    this.list.push({name: count++});
                }
                this.busy = false;
            }, 1000);
        }
    }
};
</script>
<style lang="scss" scoped>
    .blogBox {
        padding: 10px 25px;
        margin-bottom: 25px;
        -webkit-box-shadow:0 0 10px grey;
        -moz-box-shadow:0 0 10px grey;
        box-shadow:0 0 10px grey;
    }
    .details {
        display: flex;
        justify-content: space-between;
    }
    span {
        margin-right: 30px;
    }
    .blogContent {
        margin-bottom: 20px;
    }
</style>
