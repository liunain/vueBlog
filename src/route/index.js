/**
 * @file 项目路由配置
 * Copyright 2018 Jike Inc. All rights Reserved.
 * -------------------------------------------------------------------
 * Modification history
 * -------------------------------------------------------------------
 * @author  Created on 2018/09/22, by Xu Fuping <18875142455@163.com>
 *
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import * as AsyncComponent from '../asyncComponent';
// import store from '../store/store';

Vue.use(VueRouter);

const routes = [{
    // 外网监控平台主页
    path: '/',
    redirect: 'index',
    component: AsyncComponent.homeContent,
    children: [{
        path: 'index',
        name: 'index',
        component: AsyncComponent.homeContent
    }]
}, {
    path: '/download',
    component: AsyncComponent.download,
    redirect: '/download/recentUpload', // 重定向到此页面，将download作为一个中间。
    children: [{
        path: 'recentUpload',
        name: 'recentUpload',
        component: AsyncComponent.recentUpload
    },
    {
        path: 'mostDownload',
        name: 'mostDownload',
        component: AsyncComponent.mostDownload
    }]
}, {
    path: '*',
    component: AsyncComponent.error
}, {
    path: '/download',
    component: AsyncComponent.downloadContent
}, {
    path: '/sign_in',
    component: AsyncComponent.signIn
}, {
    path: '/upload',
    component: AsyncComponent.upload
}, {
    path: '/sign_up',
    component: AsyncComponent.signUp
}, {
    path: '/reset',
    component: AsyncComponent.reset
}, {
    path: '/article',
    component: AsyncComponent.article
}, {
    path: '/write',
    component: AsyncComponent.write
}, {
    path: '/otherCenter',
    component: AsyncComponent.others
}, {
    path: '/personalCenter',
    redirect: 'personalCenter/person',
    component: AsyncComponent.personalCenter,
    children: [{
        path: 'person',
        name: 'person',
        component: AsyncComponent.person
    }, {
        path: 'myBlogs',
        name: 'myBlogs',
        component: AsyncComponent.myBlogs
    }, {
        path: 'apply',
        name: 'apply',
        component: AsyncComponent.apply
    }, {
        path: 'information',
        name: 'information',
        component: AsyncComponent.information
    }, {
        path: 'myDraft',
        name: 'myDraft',
        component: AsyncComponent.myDraft
    }, {
        path: 'myResource',
        name: 'myResource',
        component: AsyncComponent.myResource
    }, {
        path: 'changePassword',
        name: 'changePassword',
        component: AsyncComponent.changePassword
    }, {
        path: 'changeEmail',
        name: 'changeEmail',
        component: AsyncComponent.changeEmail
    }]
}];

export default new VueRouter({
    routes
});

// 路由权限url
// const NOC_AUTH_URL = API_URL.authUrl;
// console.log(NOC_AUTH_URL);
// let promise = new Promise((resolve, reject) => {
//     if (store.state.user.nocUser.username) {
//         resolve();
//     } else {
//         $.ajax({
//             type: 'GET',
//             url: NOC_AUTH_URL,
//             dataType: 'jsonp',
//             success(data) {
//                 if (data.status === 302) {
//                     location.href = data.location;
//                 } else if (data.status === 0) {
//                     let userInfo = data.data;
//                     if (userInfo == null) {
//                         reject(new Error('fetch auth error'));
//                         location.href = NOC_AUTH_URL;
//                     } else {
//                         store.commit('saveNocUser', userInfo);
//                         resolve();
//                     }
//                 } else {
//                     reject(new Error('fetch auth error'));
//                     location.href = NOC_AUTH_URL;
//                 }
//             }
//         });
//     }
// });

// console.log(promise);

// 前端路由控制权限认证方式
// router.beforeEach((to, from, next) => {
//     // 所有的路由跳转，无论从什么入口进入都需要优先检测 auth
//     promise.then(() => {
//         // 该路由需要开启认证模式
//         if (to.hasOwnProperty('meta') && to.meta.auth === 'open-permission') {
//             console.log('您需要获取页面权限', store.state);
//             // 认证模块
//             let routeName = to.name;
//             let routeAccess = `noc.router.${routeName}.access`;
//             // let pageReadonly = `noc.page.${routeName}.readonly`;
//             // let pageWriteable = `noc.page.${routeName}.writeable`;
//             let userPermission = store.state.user.nocUser.permissions;
//             // 判断 to.name 是否在资源列表里面
//             if (userPermission && userPermission[routeAccess] === 'enabled') {
//                 next();
//             } else {
//                 router.push({path: '/noPermission'});
//             }
//         } else {
//             next();
//         }
//     }, err => {
//         console.error(err);
//     });
// });
