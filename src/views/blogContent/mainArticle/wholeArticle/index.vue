<template>
    <div class="blog-content">
            <div class="title">
                <h1>{{blogMessage.blogsTitle}}</h1>
            </div>
            <div class="someMessage">
                    <div class="puhslishtime">{{blogMessage.blogsCreateTime}}</div>
                    <div class="hot">
                        <span>{{blogMessage.blogsReadNum}}<i class="iconfont icon-browse_fill-copy"></i></span>
                        <span>{{blogMessage.blogsIslikeNum}} <i class="iconfont icon-shoucangxuanzhong-copy"></i></span>
                    </div>
                    <div class="like">
                        <el-button size="mini" @click="like"  v-text="likestate" :disabled="isDisable">点赞</el-button>
                        <el-button size="mini" @click="report" v-text="changeTitle">举报</el-button>
                    </div>
            </div>
            <div class="main-article" v-html="compiledMarkdown">
                {{blogMessage.blogsContent}}
            </div>
    </div>
</template>
<style lang="scss" scoped>
@import "../../../../dep/articleicon/iconfont.css";
.blog-content{
        .title{
            text-align: center;
        }
        .someMessage{
            width: 85%;
            margin: 0 auto;
            display: flex;
                .publishtime{
                    width: 280px;
                    padding-left: 40px;
                }
                .hot{
                    margin-left: 120px;
                    flex: 1;
                }
                .like{
                    width: 180px;
                    padding-left: 80px;
                    .el-button{
                        border: 1px solid #99ddfc;
                        color: #889eb4;
                        font-size: 14px;
                    }
                }
        }
        .main-article{
            width: 88%;
            margin: 0 auto;
            color: #000000;
            font-size: 14px;
            position: relative;
            margin-top: 18px;
        }
    }

</style>
<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import 'highlight.js/styles/default.css';
import hljs from 'highlight.js';
import marked from 'marked';
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code, true).value;
        } else {
            return hljs.highlightAuto(code).value;
        }
    }
});
export default {
    name: 'wholeArticle',
    props: {
        value: String,
        model: {
            type: [String, Object]
        }
    },
    data() {
        return {
            blogMessage: [],
            reportUserId: 2,
            reportType: 0,
            reportTheme: 1,
            changeTitle: '举报',
            isDisable: false,
            likestate: '点赞'
        };
    },
    // created() {
    //     this.showData();
    // },
    mounted() {
        this.getBlog();
    },
    computed: {
        // 点赞状态
        ...mapState('giveLike', {
            likeNumber: state => state.likeNumber,
            islike: state => state.islike
        }),
        // mark将将md格式的数据转换为文本
        compiledMarkdown() {
            let content = this.blogMessage.blogsContent;
            return marked(content || '', {
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            });
        }
    },
    methods: {
        ...mapMutations('giveLike', ['SET_LIKE', 'CANCEL_LIKE']),
        ...mapActions('giveLike', ['likeIt', 'cancel']),
        hello() {
            console.log('hello');
        },
        like() {
            if (this.islike === 0) {
                this.likeIt();
                this.likestate = '已点赞';
                console.log(this.islike + 'islike');
            } else {
                this.cancel();
                this.likestate = '点赞';
                console.log(this.islike + '取消赞');
            }
        },
        report() {
            this.changeTitle = '已举报';
            var url = 'http://47.107.80.17:8080/report/addReport';
            var data = {
                reportUserId: 1,
                reportType: 0,
                reportTheme: 1
            };
            // let reportParam = new FormData();
            // reportParam.append('reportUserId', 10);
            // reportParam.append('reportType', 0);
            // reportParam.append('reportTheme', 5);
            if (data) {
                let reportArray = [];
                Object.keys(data).forEach(key => reportArray.push(key + '=' + data[key]));
                if (url.search(/\?/) === -1) {
                    url += '?' + reportArray.join('&');
                } else {
                    url += '&' + reportArray.join('&');
                }
            }
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(data)
            })
                .then((response) => response.text())
                .then((response) => {
                    console.log('responseData', response);
                    console.log('hahah');
                })
                .catch((error) => {
                    console.error('error', error);
                    console.log(error);
                });
        },
        blogContent(url, params) {
            if (params) {
                let paramsArray = [];
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&');
                } else {
                    url += '&' + paramsArray.join('&');
                }
            }
            fetch(url, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log('json+bike' + JSON.stringify(json));
                    this.blogMessage = json.data;
                    console.log(2 + JSON.stringify(json));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getBlog(flag) {
            let url = 'http://120.79.94.90:8080/page/blogs/getOneBlogsDetil';
            this.blogContent(url, {userId: 1, blogsId: 2});
        }
    }
};
</script>

