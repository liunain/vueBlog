<template>
    <div>
        <div class="hisResource">
        <div class="header">他的资源</div>
        <div class="title-box" v-for="item in list" :key="item.id">
            <div class="resLeft">
                <div class="title">{{ item.title }}</div>
                <span class="el-icon-info">{{ item.downloadNum }}</span>
            </div>
            <div class="resRight">
                <img src="~images/othersCenter/zip.png" alt="未找到资源">
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [{
                id: '1',
                title: '这是一个资源',
                downloadNum: '1001'
            }, {
                id: '2',
                title: '这是一个资源',
                downloadNum: '1001'
            }, {
                id: '3',
                title: '这是一个资源',
                downloadNum: '1001'
            }]
        };
    }
};
</script>
<style lang="scss" scoped>
    .hisResource {
        position: relative;
        width: 100%;
        height: 340px;
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
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 7px;
    }
    span {
        font-size: 12px;
        margin-right: 20px;
    }
    .resLeft {
        float: left;
    }
    .resLeft::after {
        clear: both;
    }
    .resRight {
        float: right;
    }
    .resRight::after {
        clear: both;
    }
    img {
        width: 47px;
        height: 47px;
    }
</style>
