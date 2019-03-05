<template>
    <div id="portal">
        <topbar></topbar>
        <swipper></swipper>
        <div class="center-con">
            <leftbar></leftbar>
            <mobileLeftBar></mobileLeftBar>
            <articles></articles>
            <rightbar></rightbar>
        </div>
    </div>
</template>

<script>
// import logo from '../common/logo.vue';
import topbar from '../common/topbar/index.vue';
import swipper from './swipper/index.vue';
import leftbar from './leftbar/index.vue';
import mobileLeftBar from './mobileLeftBar/index.vue';
import rightbar from './rightbar/index.vue';
import articles from './articles/index.vue';
import homePage from '../../config/menu/portal/homePage.js';

export default {
    name: '',
    data: () => ({
        homeTopNavMenu: homePage.homeTopNavMenu
    }),
    components: {
        topbar,
        swipper,
        leftbar,
        rightbar,
        articles,
        mobileLeftBar
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../dep/portal/iconfont.css";
@media screen and (max-width: 970px) {
    #mobileLeftBar {
        display: block;
        font-size: 34px;
        position: absolute;
        margin-left: -34px;
    }
    #sidenav{
        display: none;
    }
}
@media screen and (min-width: 970px) {
    #mobileLeftBar {
        display: none;
        font-size: 34px;
    }
    #sidenav{
        display: block;
    }
}
#portal{
    background: #f7f7f7;
    margin: 0 auto;
    .center-con{
        width: 80%;
        max-width: 970px;
        margin: 0px auto;
        margin-top: 19px;
        display:flex;
        justify-content: space-between;
    }
}
</style>