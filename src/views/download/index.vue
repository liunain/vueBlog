<template>
    <div id="navigation">
        <navmenu></navmenu>
        <search></search>
        <router-link to="/download/recentUpload">最近上传</router-link>
        <router-link to="/download/mostDownload"> 最多下载</router-link>
        <div id="hr"></div>
        <!-- <recent-upload></recent-upload>
        <most-download></most-download> -->
        <transition name="fade" mode="out-in">
        <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import recentUpload from './recentUpload/index';
import mostDownload from './mostDownload/index';
import search from './search/index';
import navmenu from './menu/index';// 引入
export default {
    components: {// 注册
        recentUpload,
        mostDownload,
        search,
        navmenu
    },
    data() {
        return {
        };
    }
};
</script>

<style lang="scss" scoped> 
// 不加scoped，写于此的样式通用于子组件。
#navigation{
    width: 80%;
    max-width: 970px;
    margin:0 auto;
}
a {
    display:inline-block;
    margin-right: 30px;
    color:#32577C;
}
#hr {
    width: 867px;
    margin-bottom: 28px;
    height: 1px;
    background-color: #B1C3D3;
    margin-top: 10px;
}
.router-link-active{
    color: #3257D7;
}
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .3s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .3s;
}
// 列表显示间隔22px;
</style>
