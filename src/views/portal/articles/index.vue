<template>
    <div id="articles">
        <div class="search">
            <input type="text" name="" class="iconfont icon-sousuo" v-model='searchText' :placeholder="icon">
            <input type="submit" name="" value="搜索">
        </div>

        <div class="search-result">
            <p style="text-align: left;" v-if="searchText">the result of <span style="color:red" id="searchText" >{{searchText}}</span> is:({{result.length}})</p>
            <ol>
                <li v-for="item in result" @click='showDetails($event)' :id= "item.Id">
                    <span v-html='item.title' class="search_title"></span>
                    <span v-html='item.con' class="search_con"></span>
                </li>
            </ol>
        </div>
 <!--        <select class="search-result">
            <p style="text-align: left;" v-if="searchText">the result of <span style="color:red" id="searchText" >{{searchText}}</span> is:({{result.length}})</p>
            <option style="text-align: left;" v-for="item in result">
                {{item.b}}({{item.a}})
            </option>
        </select> -->

        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
             <div class="article" v-for='item in articleLists' :key='articleLists.blogs_id' @click='toArticle'>
                    <div class="title">{{item.blogs_title}}</div>
                    <div class="con">{{item.blogs_content}}</div>
                    <div class="notes">
                        <div class="left">
                            <span class="author" @click.stop='toUserInfo'>
                                <img :src="item.user_icon_url" class="authorlogo">
                                <span class="username">{{item.user_name}}</span>
                            </span>
                            <span class="createTime">{{item.blogs_create_time}}</span>
                        </div>
                        <div class="right">
                            <div class="pageviews">
                                <span>{{item.blogs_read_num}}</span>
                                <span class="views"></span>
                            </div>
                            <div class="comments">
                                <span>{{item.blogs_comment_num}}</span>
                                <span class="commentsLogo"></span>
                            </div>
                            <div class="stars">
                                <span>{{item.blogs_islike_num}}</span>
                                <span class="starts"></span>
                            </div>
                        </div>
                    </div>
            </div>           
        </div>

    </div>
</template>

<script>
// import $ from 'jquery';
// import GET from '../../../util/get';
var count = 0;
export default {
    name: 'articles',
    data: () => ({
        icon: '搜索本站\ue62c',
        data: [],
        busy: false,
        articleLists: [],
        lists: [
            {
                id: '1',
                title: '测试内容',
                con: '内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容',
                username: '我是作者',
                userlogo: 'https://coding.net/static/project_icon/scenery-5.png',
                createTime: '2018-10-01',
                pageviews: 10001,
                comments: 2100,
                stars: 10086
            },
            {
                id: '2',
                title: '文章内容',
                con: '内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容',
                username: '我是作者',
                userlogo: 'https://coding.net/static/project_icon/scenery-5.png',
                createTime: '2018-10-01',
                pageviews: 10001,
                comments: 2100,
                stars: 10086
            },
            {
                id: '3',
                title: '文章内容',
                con: '内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容',
                username: '我是作者',
                userlogo: 'https://coding.net/static/project_icon/scenery-5.png',
                createTime: '2018-10-01',
                pageviews: 10001,
                comments: 2100,
                stars: 10086
            },
            {
                id: '5',
                title: '文章内容文章标题',
                con: '内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容',
                username: '我是作者',
                userlogo: 'https://coding.net/static/project_icon/scenery-5.png',
                createTime: '2018-10-01',
                pageviews: 10001,
                comments: 2100,
                stars: 10086
            },
            {
                id: '6',
                title: '测试内容',
                con: '内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容',
                username: '我是作者',
                userlogo: 'https://coding.net/static/project_icon/scenery-5.png',
                createTime: '2018-10-01',
                pageviews: 10001,
                comments: 2100,
                stars: 10086
            },
            {
                id: '7',
                title: '测试内容',
                con: '内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容',
                username: '我是作者',
                userlogo: 'https://coding.net/static/project_icon/scenery-5.png',
                createTime: '2018-10-01',
                pageviews: 10001,
                comments: 2100,
                stars: 10086
            }
        ],
        searchText: '',
        timer: null,
        result: []
    }),
    mounted() {
        this.getNormal();
        // var url = 'https://www.baidu.com';
        // var data = {username: 'example'};

        // fetch(url, {
        //     method: 'POST', // or 'PUT'
        //     mode: 'no-cors',
        //     body: JSON.stringify(data), // data can be `string` or {object}!
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // })
        //     .then(res => console.log(res.json()))
        //     .catch(error => console.error('Error:', error))
        //     .then(res => console.log('Success:', res));
    },
    methods: {
        handleParams: function(params, url) {
            let paramsArray = [];
            // 拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&');
            } else {
                url += '&' + paramsArray.join('&');
            }
            return url;
        },
        toArticle: function() {
            this.$router.push('./article');
        },
        loadMore: function() {
            this.busy = true;

            setTimeout(() => {
                for (var i = 0, j = 10; i < j; i++) {
                    this.data.push({ name: count++ });
                }
                this.busy = false;
            }, 1000);
        },
        toUserInfo: function(e) {
            e.preventDefault();
            this.$router.push('./otherCenter');
        },
        showDetails: function(e) {
            console.log(e);
        },
        getNormal: function() {
            var params = {
                userId: 1,
                page: 1,
                sortType: 1
            };
            var url = 'http://120.79.94.90:8080/page/blogs/getBlogs';
            var paramsUrl = this.handleParams(params, url);
            var that = this;
            // fetch请求
            fetch(paramsUrl, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    // data就是我们请求的repos
                    that.articleLists = data.data.result;
                })
                .catch((error) => {
                    throw error;
                });
        },
        generReg(val) {
            return new RegExp(`(.*)(${val.split('').join(')(.*)(')})(.*)`, 'i');
        }
        // addRed(str, value) {
        //     // var positions = [];
        //     var final = [];
        //     var temp = '';
        //     // function searchSubStr(str,subStr){
        //     //     var pos = str.indexOf(subStr);
        //     //     while(pos>-1){
        //     //         positions.push(pos);
        //     //         pos = str.indexOf(subStr,pos+1);
        //     //     }
        //     // }
        //     // return positions;
        //     final = str.split(value);
        //     final.forEach(function(i, val, arr) {
        //         if (val === 0 && arr[0] && arr.length > 1) {
        //             temp += `<label id='red'>${value}</label>` + arr[val];
        //         }
        //         if (val > 0) {
        //             temp += `<label id='red'>${value}</label>` + arr[val];
        //         }
        //     });
        //     return temp;
        // }
    },
    watch: {
        searchText(val) {
            var searchbox = document.querySelector('.search-result');
            searchbox.style.display = 'block';
            if (val) {
                clearTimeout(this.timer);
                this.result = [];
                this.timer = setTimeout(() => {
                    Object.keys(this.lists).filter(x => {
                        let bool = this.generReg(val).test(this.lists[x].con);
                        let boolch = this.generReg(val).test(this.lists[x].title);
                        if (bool || boolch) {
                            this.result.push({con: this.lists[x].con, id: this.lists[x].id, title: this.lists[x].title});
                            // this.result.push({con: this.lists[x].con, title: this.addRed(this.lists[x].title, val)});
                        }
                        return bool || boolch;
                    });
                }, 200);
            }
        }
    }
};
</script>


<style lang="scss" scoped>
@import "../../../dep/download/iconfont.css";
i{
    display: inline-block;
    color: red;
    padding: 0 4px;
}
.search_title>>> label{
    color: red;
}
.search-result span >>> label{
    display: inline-block;
    color: red;
    padding: 0 4px;
}
#articles{
    position:relative;
    input[type='button']:hover{
        cursor: pointer;
    }
    input[type='submit']:hover{
        cursor: pointer;
    }
    color:#929eaa;
    .search{
        position: relative;
        display:flex;
        margin: 0 16px;
        font-size:16px;
        color: #c0c1c1;
        box-shadow: 0 0 6px #ccc;
        input[type='text']{
            width: 100%;    
            padding: 0 10px;
            border: none;   
            color: #c0c1c1; 
            outline: none;
            border: none;
        }
        // 给placeholder设置样式
        input[type='text']::-webkit-input-placeholder{
            text-align: center; 
            color:#c0c1c1;
        }
        input[type='submit']{
            height: 50px;
            line-height:50px;
            color:#fff;
            font-size: 16px;
            padding: 0 25px;
            background: -webkit-gradient(linear, 0 0,0 100%,from(#16aeec),to(#6ec2f1));
            background: -moz-linear-gradient(top, #16aeec,#6ec2f1);
            border: none;
            outline:none;
        }
    }
    .search-result{
        width: 95%;
        display:none;
        margin:0px 16px;;
        text-align: center;
        background: #fff;
        border: 1px solid #eee;
        box-shadow: 0 0 17px #ccc;
        p{
            line-height: 32px;
            padding: 5px 20px;
        }
        ol{
            margin: 0;
            padding: 0;
            text-align: left;
            list-style: none;
            li{
                display: flex;
                line-height: 28px;
                padding:8px 40px;
                box-sizing: border-box;
                span{
                    display: block;
                    padding: 0 10px;
                }
                &:hover{
                    cursor: pointer;
                    background: #f7f7f7;
                }
                .search_title{
                    font-size: 13px;
                }
                .search_con{
                    font-size: 11px;
                    width: 300px;
                    text-overflow: ellipsis;
                   -o-text-overflow: ellipsis;
                   -webkit-text-overflow: ellipsis;
                   -moz-text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
        }
    }
    .article{
        margin: 20px 16px;
        padding: 10px 61px 12px 38px;
        box-shadow: 0 0 6px #ccc;
        .title{
            font-size:20px;
        }
        .con{
            font-size:14px;
            line-height: 18px;
            padding: 18px 0;
        }
        .notes{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            line-height: 24px;
            .left{
                display: flex;
                align-items: cneter;
            }
            .right{
                display: flex;
                align-items: center;
                div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-left: 8px;
                    span{
                        display: block;
                        margin-left: 8px;
                    }
                    span:nth-child(2){
                        width: 20px;
                        height: 20px;
                    }
                }
            }
            .author{
                display: flex;
                justify-content: space-between;
                align-items: center;
                color:#194772;
                .authorlogo{
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    border-radius: 11px;
                }
                .username{
                    margin: 0 5px;
                }
            }
            .views{
                background: url('../../../resources/images/common/view.png') no-repeat;
            }
            .commentsLogo{
                background: url('../../../resources/images/common/comment.png') no-repeat;
            }
            .starts{
                background: url('../../../resources/images/common/like.png') no-repeat;
            }
        }
    }
    .article:hover{
        cursor: pointer;
    }
}
#red{
    color: red;
}

</style>