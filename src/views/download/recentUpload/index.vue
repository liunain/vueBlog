<template>
    <div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="800">
            <div class="uploadContent" v-for = 'item of recentUploadData' :key="item.list">
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
            // 从后台获得最近上传的数据
            recentUploadData: [{
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
    methods: {
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
.uploadContent {
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
