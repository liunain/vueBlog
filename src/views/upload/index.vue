<template>
    <div id="upload">
        <p id="title">&nbsp;&nbsp;资源上传</p>
        <a href="">返&nbsp;&nbsp;回</a>
        <div id="uploadTable">    
            <div id="upfile" @click="up" >
                <img src="~images/upload/zip.png">
                <span id="fileName">点击上传</span>
            </div>
            <p>注意：限100MB以内资源</p>
            <label>资源标题：<input type="text" name="title" v-model="reTitle"/></label>
            <label>资源分类：
                <el-select v-model="parentLable"  class="selecttype">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="childLable"   class="selecttype" style="margin-left: 10px;">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </label>
            <label id="secret"><input type="radio" name="" value="0" v-model="reStatus">私密资源（选择此项后仅内部人员可以查看）</label>
            <label>资源描述：</label><textarea rows="5" cols="10" placeholder="描述不支持HTML标签等代码形式的文字，详细描述可获得我们推荐，限50字" v-model="reIntro"></textarea>
            <div id="choose">
                <button id="submit" @click="resourseSub">上&nbsp;&nbsp;传</button>
                <button id="cancel" @click="resourseCancel">取&nbsp;&nbsp;消</button>
            </div>
        </div>
        <input type="file" id="upzip">
    </div>
   
</template>
<script>
export default {
    data() {
        return {
            reTitle: '',
            parentLable: '',
            childLable: '',
            reStatus: 1,
            reIntro: '',
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }]
        };
    },
    methods: {
        up: function() {
            var upzip = document.querySelector('#upzip');
            upzip.click();
            var cf = setInterval(function() {
                console.log(upzip.value.substring(12));
                if (upzip.value !== '') {
                    document.querySelector('#fileName').innerText = upzip.value.substring(12);
                    clearInterval(cf);
                }
            }, 1500);
        },
        resourseSub() {
            console.log(this.reTitle, this.parentLable, this.childLable, this.reStatus, this.reIntro);
            var url = 'http://120.79.94.90:8080/resource/uploadResource';
            let filedata = new FormData();
            var fileName = document.querySelector('input[type="file"]');
            filedata.append('flie', fileName);
            var data = {
                file: filedata,
                resourceTitle: this.reTitle,
                resourceStatus: this.reStatus,
                resourceIntro: this.reIntro,
                resourceParentLable: this.parentLable,
                resourceChildrenLable: this.childLable
            };
            let request = new Request(url, {
                method: 'POST',
                credentials: 'include',
                body: data
            });
            fetch(request)
                .then(response => response.json())
                .then(result => console.log('Success', JSON.stringify(result)))
                .catch(error => console.error('Error:', error));
        },
        resourseCancel() {
            location.reload();
        }
    }
};
</script>
<style lang="scss" scoped>
 input[type='file']{
    visibility: hidden;
 }  
@mixin mbutton{
    width: 80px;
    height:30px;
    border:2px solid #99DDFC;
    background-color: white;
    text-align: center;
    line-height: 30px;
}
#upload{
    position: relative;
    width: 865px;
    height: 680px;
    border: 0px;
    margin: 0 auto;
    margin-top: 20px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    label{
        font-size: 16px;
        color:#929EAA;
    }
    #title{
        font-size: 22px;
        color: white;
        display: block;
        width: 100%;
        height: 50px;
        background: -webkit-linear-gradient(left, #3DA9DB , #99CFFF);
        line-height: 50px;
    }
    a{
        position: absolute;
        color: #4C6A8A;
        @include mbutton;
        margin-top: 20px;
        margin-left: 16px;
    }
    #uploadTable{
        display: flex;
        flex-direction: column;
        height: 630px;
        width: 365px;
        margin: 0 auto;
        justify-content: space-around;
        margin-top: 15px;
        p{
            color: red;
            font-size: 14px;
            margin-left: 106px;
        }
        #upfile{
            width: 133px;
            height: 133px;
            border:2px solid #99DDFC;
            margin: 0 auto;
            &:hover{
                cursor: pointer;
            }
            img{
                margin-left: 21px;
                margin-top: 20px;
                height: 70px;
            }
            span{
                display: block;
                width: 125px;
                text-align: center;
                margin-top: 12px;
                font-size: 14px;
                color: grey;
                // 单行文本溢出
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        input[name='title']{
            width: 245px;
            height: 32px;
        }
        #secret{
            margin-left: 22px;
            font-size: 14px;
        }
        input{
            border: 1px solid #929EAA;
            border-radius: 5px;
        }
        textarea{
            height: 170px;
            width: 245px;
            border: 1px solid #929EAA;
            border-radius: 5px;
            margin-top: -49px;
            margin-left: 78px;
            font-size: 14px;
            &::-webkit-input-placeholder{
                font-size: 16px;
                color:#929EAA;
            }
        }
        .selecttype {
            width: 115px;
        }
        #choose{
            margin-bottom: 50px;
            margin-left: 82px;
        }
        button{
            margin-right: 58px;
            @include mbutton;
        }
    }
}


</style>
