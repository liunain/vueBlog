<template>
    <div class="comment-list">
        <ul>
            <li>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
                <div class="content" 
                v-for="(items,commentId) in comments" 
                :key="items.commentId" 
                @mouseover="hover(commentId)" 
                @mouseout="showUpdate = -1">
                    <div class="portrait">
                        <img src="items.userIconUrl" alt="用户头像"/>
                        <p class="name">{{items.userNickname}}</p>
                    </div>
                    <div class="commentWord">
                        <p>{{items.commentContent}}</p>
                        <p class="rescomment" v-for="replyContent in items.childComments" :key="replyContent.commentReplyCommentId">
                            <span>{{replyContent.replyUserNickname}} 回复 {{replyContent.userNickname}}：</span>
                            <span>{{replyContent.commentContent}}</span>
                        </p>
                        <div class="replyBox" v-show="cindex==commentId&&isShow">
                            <el-form>        
                                    <el-input class="replyInput"
                                    type="textarea" 
                                    v-model="inputreply" 
                                    :autosize="{minRows:1,maxRows:2}"
                                    placeholder="发表我的评论"></el-input>
                                <el-button class="submit" type="primary" size="mini">提交</el-button>
                            </el-form>
                        </div>
                    </div>
                    <div class="reply" v-show="showUpdate==commentId">
                        <el-button type="primary" size="mini" @click="replyIt(commentId)" v-text="btnText">&nbsp;回复</el-button>
                        <el-button type="primary" size="mini" @click="report">&nbsp;举报</el-button>
                    </div>
                </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.comment-list{
    width: 88%;
    position: relative;
    top:40px;
    margin: 0 auto;
    height: 100%;
    ul{
        position: relative;
        margin-bottom: 100px;
        li{
            position: relative;
            padding-top: 20px;
            .content{
                position: relative;
                display: flex;
                height: 100%;
                .portrait{
                    width: 115px;
                    height: 120px;
                    position: relative;
                    top: 5px;
                    img{
                        border-radius: 50%;
                        border: 1px solid #dadde0;
                        position: relative;
                        left: 28px;
                    }
                    p{
                        width: 58px;
                        text-align: center;
                        position: relative;
                        left: 25px;
                        color: #406c91;
                        font-size: 12px;
                    }
                }
                .commentWord{
                    flex: 1;
                    color: #b3b3b3;
                    position: relative;
                    padding-top: 16px;
                    border-top: 1px solid #dedede;
                    p{
                        margin-left: 30px;
                        span{
                            padding-left: 20px;
                        color: #406c91;
                        font-size: 12px;
                    }
                    }
                    .replyBox{
                        position: relative;
                        margin-top: 20px;
                        .el-form{
                            position: relative;
                            .el-textarea{
                                width: 300px;
                            }
                            .el-button{
                                width: 45px;
                                text-align: center;
                            }
                        }
                    }
                }
                .reply{
                    position: relative;
                    width: 160px;
                    padding-top: 8px;
                    border-top: 1px solid #dedede;
                    .el-button{
                        width: 64px;
                        text-align: center;
                        letter-spacing: 2px;
                        display: inline-block;
                    }
                }
            }
        }
    }
    
}

</style>
<script>
export default {
    name: 'commentList',
    data() {
        return {
            inputreply: '', // 回复评论
            showUpdate: -1, // 控制按钮显示隐藏
            isShow: false,
            cindex: -1,
            btnText: '回复', // 改变按钮的显示
            page: 0, // 最初加载的评论
            busy: false,
            comments: [] // 评论内容
        };
    },
    created() {
        // this.commentData = this.commentData.comment.data;
    },
    mounted() {
    },
    methods: {
        hover: function(index) {
            this.showUpdate = index;
        },
        replyIt: function(commentId) { // 点击回复弹出回复框，点击取消回复框消失
            this.isShow = !this.isShow;
            this.cindex = commentId;
            if (this.isShow) {
                this.btnText = '取消';
            } else {
                this.btnText = '回复';
                this.inputreply = '';
            }
        },
        commentlist(url, params) {
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
                    if (json.code === 100001) {
                        console.log('json' + JSON.stringify(json));
                        this.comments = this.comments.concat(json.data); // 连接
                        if (json.data.length === 0) { // 当但会数据小于10，最后一页，停止获取
                            this.busy = true;
                        } else {
                            this.busy = false;
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getData(flag) {
            let url = 'http://120.79.94.90:8080/page/comment/selectComment';
            this.commentlist(url, {page: this.page, commentType: 1, themeId: 1});
        },
        // 当属性滚动的时候
        loadMore() {
            console.log('loadmore');
            this.busy = true; // 将无限滚动给禁用
            setTimeout(() => { // 发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                this.page++;
                this.getData(true);
                console.log('hello');
            }, 500);
        },
        // replyIt() {
        //     console.log('回复');
        // },
        report() {
            console.log('举报');
        }
    }
};
</script>
