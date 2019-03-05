<template>
    <div class="bloggerMessage">
        <el-card class="clearfix" v-for="item in bloggerMessage.slice(0,1)" :key="bloggerMessage.id">
            <div class="message">
                <div>
                    <img class="portrait" src="~images/article/portrait.png" alt="加载失败"/>
                </div>
                <p class="userName">{{item.login}}</p>
                <span>&bull;{{item.designation}}</span>
            </div>
            <el-button class="attention" @click="followIt" v-text="followIcon" plain>关注</el-button>
            <div class="concern">
                <ul>
                    <li class="follwer"><i class="iconfont icon-friendaddfill-copy"></i>关注: 200{{item.watch}}</li>
                    <li class="fans"><i class="iconfont icon-peoplefill-copy"></i>粉丝: 100{{item.fansNumber}}</li>
                </ul>
            </div>
        </el-card>
    </div>
</template>
<style lang="scss" scoped>
@import "../../../../dep/articleicon/iconfont.css";
.bloggerMessage{
    background-color: #ffffff;
    text-align: center;
    .message{
        position: relative;
        margin: 0px auto;
        padding-top: 20px;
        img{
            width: 94px;
            height: 94px;;
            border-radius: 50%;
            border: 1px solid #dadde0;
        }
        .userName{
            padding-top: 8px;
            color: #194772;
            font-size: 16px;
            font-family: '微软雅黑';
            margin: 0 auto;
            width: 80%;
            text-align: center;
        }
        span{
            color: #194772;
            font-size: 12px;

        }
    }
    .attention{
        width: 94px;
        height: 36px;
        border: 2px solid #33b1dd;
        letter-spacing: 6px;
        color: #194772;
        font-size: 14px;
        line-height: 14px;
        vertical-align: middle;
        text-align: center;
        position: relative;
        margin-top: 12px;
    }
    .concern{
        position: relative;
        top: 10px;
        margin-bottom: -10px;
        ul{
            li{ 
                line-height: 50px;
                font-size: 12px;
                color: #61707e;
                display: inline-block;
            }
            .fans{
                padding-left: 10px;
            }
        }
    }
    
}
    
</style>
<script>
import {mapState, mapActions, mapMutations} from 'vuex';
export default {
    name: 'blogger',
    data() {
        return {
            bloggerMessage: [],
            followIcon: '关注'
        };
    },
    computed: {
        ...mapState('follow', {
            isFollow: state => state.isFollow,
            fansNumber: state => state.fansNumber
        })
    },
    mounted() {
        this.message();
    },
    methods: {
        ...mapMutations('follow', ['SET_FOLLOW', 'CANCEL-FOLLOW']),
        ...mapActions('follow', ['setFollow', 'cancelFollow']),
        followIt() {
            if (this.isFollow === 0) {
                this.setFollow();
                this.followIcon = '已关注';
                console.log('fansNumber' + this.fansNumber);
            } else {
                this.cancelFollow();
                this.followIcon = '关注';
                console.log('fansNumber' + this.fansNumber);
            }
        },
        message() {
            let message = this.message;
            console.log(message);
            fetch('https://api.github.com/users')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    this.bloggerMessage = data;
                    // this.$set(this.bloggerMessage, data);
                    // return this.bloggerMessage;
                    console.log(this.bloggerMessage.result);
                })
                .catch(error => console.log(error));
        }

    }
};
</script>
