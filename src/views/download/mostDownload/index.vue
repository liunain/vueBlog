<template>
    <div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="800">
            <div class="downloadContent" v-for = 'item of mostDownloadData' :key="item.list">
                <img class="zip" src="~images/download/zip.png" alt="加载出错">
                <div class="information">
                    <div class="information-1">
                        <h2>{{item.description}}</h2>
                        <p>{{item.content}}</p>
                        <button class="downLoad" @click='down'>下载</button> 
                        <button class="downLoad" @click='report'>举报</button>
                    </div>
                    <div class="information-2">
                        <img src="~images/download/author.png" alt="加载出错">
                        <p>&nbsp;&nbsp;{{item.author}}</p>     
                        <span class="sp1">{{item.date}}</span>
                        <span class="sp2">大小: {{item.size}}</span>
                        <span>下载量: {{item.downloadCount}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 从后台获得最多下载的数据
            mostDownloadData: [{
                description: '前端模板',
                content: '此模板是一个很好用的前端模板，一键生成网页内容',
                author: '马某某',
                date: '2017/10/11',
                size: '23.56kB',
                downloadCount: 10001
            },
            {
                description: '前端模板',
                content: '此模板是一个很好用的前端模板，一键生成网页',
                author: '马某某',
                date: '2017/10/11',
                size: '23.56kB',
                downloadCount: 10001
            },
            {
                description: '前端模板',
                content: '此模板是一个很好用的前端模板，一键生成网页',
                author: '马某某',
                date: '2017/10/11',
                size: '23.56kB',
                downloadCount: 10001
            }]
        };
    },
    mounted() {
        this.getResourseList(); // 调用获取资源函数；
    },
    methods: {
        // 获取资源列表
        getResourseList: function(flag) {
            // let paramn = {
            //     page: this.page,
            //     pageSize: this.pageSize,
            //     sort: this.sortFlag ? 1 : -1
            // };
            var resourseUrl = 'http://120.79.94.90:8080/resource/getAllResource';
            // fetch请求
            fetch(resourseUrl, {
                method: 'GET'
            })
                .then((response) => {
                    let res = response.data;
                    if (res.status === '0') {
                        // flag === true，证明是第二次或第二次以上加载数据了
                        if (flag) {
                            this.goodsList = this.goodsList.concat(res.result.list); // 数据追加
                            this.busy = false; // 无线滚动禁止 取消，意思就是开启无限滚动监听
                            if (res.result.list.length === 0) {
                                this.busy = true; // 关闭无限滚动监听
                            } else {
                                this.busy = false; // 开启无限滚动监听
                            }
                        } else { // 第一次加载数据
                            this.goodsList = res.result.list;
                            this.busy = false;// 无线滚动禁止 取消
                        }
                    } else { // 接口调用异常
                        this.goodsList = [];
                    }
                })
                .catch((error) => {
                    throw error;
                });
        },
        // 加载更多
        loadMore: function() {
            this.busy = true;
            // 官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
            setTimeout(() => {
            // 这里请求接口去拿数据，实际应该是调用一个请求数据的方法
                this.page++;
                this.getResourseList(true);
            }, 1000);
        },
        report() {
            var url = 'https://example.com/profile';
            var data = {username: 'example'};
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));
            // 传给后台被举报的资源信息；
            console.log('举报');
        },
        down() {
            console.log('下载');
        }
    }
};
</script>

<style lang="scss" scoped> 
* {
    padding: 0;
    margin: 0;
}
.downloadContent {
   width: 867px;
   height: 130px;
   border: 1px solid #ebeef5;
   box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
   // 列表显示间隔22px;
   margin-top:22px;
    .zip {
        width: 187px;
    }
   .information {
       width: 676px;
    //    width: 676px;
      margin-left: 190px;
      margin-top: -123px;
      .information-1{
          p{
              margin-left: 28px;
              display: inline-block;
              color: #A0ADB9;
           }  
        }
      
    }
}

.information-2 {
    width: 676px;
    margin-top: 34px;
    p{
        color: #61717D;
        display: inline;
        margin-right: 36px;
        width: 74px;
    }
    span {
        color: #A0ADB9;
    }
    .sp1{
        margin-right: 230px;
    }
    .sp2{
        margin-right: 35px;
    }
}
h2{
   color: #929EAA;
   margin-bottom: 19px;
}
.downLoad {
    width: 80px;
    height:30px;
    border:2px solid #99DDFC;
    background-color: white;
    margin-right: 22px;
    float: right;
    &:hover {
        cursor: pointer;
    }
}

</style>
