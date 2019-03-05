<template>
    <div>
        <div class="personMessage">
        <img src="~images/othersCenter/headPic.png" alt="" class="headPic">
        <span class="username">{{ username }}</span>
        <span class="level">{{ level }}</span>
        <button class="attention">关 注</button>
        <div class="reciprocal">    
            <span class="el-icon-info">关注：{{ attenNum }}</span>
            <span class="el-icon-info">粉丝：{{ fansNum }}</span>
        </div>
        </div>
        <div>
            <hisArticle></hisArticle>
            <hisResource />
        </div>
    </div>
</template>
<script>
import hisArticle from '../hisArticle/index.vue';
import hisResource from '../hisResource/index.vue';
export default {
    data: () => ({
        username: '一个长长的用户名',
        level: '博客专家',
        attenNum: '200',
        fansNum: '500'
    }),
    components: {
        hisArticle,
        hisResource
    }
};
</script>
<style lang="scss" scoped>
    .personMessage {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 235px;
        padding: 20px 0;
        -webkit-box-shadow:0 0 10px grey;
        -moz-box-shadow:0 0 10px grey;
        box-shadow:0 0 10px grey;
    }
    .headPic {
        width: 95px;
        height: 95px;
    }
    .attention {
        cursor: pointer;
        height: 35px;
        width: 90px;
        border: 1px solid rgb(20, 192, 235);
        border-radius: 5px;
    }
</style>

