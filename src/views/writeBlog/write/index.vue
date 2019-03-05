<template>
    <div class="write">
        <div class="title">
            <p>写博客</p>
        </div>
        <div class="content">
                <div class="blogTitle">
                        
                            <div class="left"><span>文章标题:</span></div>
                            <div class="center"><el-input size="medium" v-model="blogTitle"></el-input></div>
                            <div class="right"><el-button size="medium" @click="dialogVisible = true">发布</el-button></div>
                        
                        <!--弹出层-->
                            <el-dialog
                                :visible.sync="dialogVisible"
                                width="46%"
                                :before-close="handleClose"
                                center>
                                <el-form size="mini">
                                    <el-form-item label="文章标题">
                                        <el-input v-model="blogTitle" autocomplete="off">{{blogTitle}}</el-input>
                                    </el-form-item>
                                    <el-form-item label="文章分类">
                                        <el-select v-model="cate" placeholder="请选择">
                                            <el-option
                                            v-for="item in category"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="lang" placeholder="请选择">
                                            <el-option
                                            v-for="item in language"
                                            :key="item.id"
                                            :label="item.label"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-radio v-model="radio" label="1">私密资源(选择此项后仅内部人员可以查看)</el-radio><br/>
                                        <el-radio v-model="radio" label="2">存为草稿</el-radio>
                                    </el-form-item>
                                    <el-form-item>
                                        <span>文章描述</span>
                                        <el-input type="textarea" 
                                        placeholder="描述不支持HTML标签等代码形式的文字，详细描述可获得我们推荐，限50字内" 
                                        rows="8" 
                                        maxlength="50" 
                                        size="mini"                    
                                        :model="description">
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">发布</el-button>
                                    <el-button @click="dialogVisible = false">取 消</el-button>    
                                </span>
                            </el-dialog>
                </div>
                <div class="edit">
                     <mavon-editor 
                     v-model="context" 
                     :ishljs="false" 
                     :toolbars="toolbars" 
                     class="a" 
                     ref=md 
                     @imgAdd="$imgAdd"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.write{
    width: 63%;
    margin: 0 auto;
    position: relative;
    padding-bottom: 10px;
    top: 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .title{
        background: -webkit-linear-gradient(left, #3da9db, #99cfff); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #3da9db, #99cfff); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #3da9db, #99cfff); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #1184b9 , #99cfff); /* 标准的语法 */
        height: 50px;
        color: #fefefe;
        font-size: 22px;
        line-height: 50px;
        font-weight: bold;
        font-family: '微软雅黑';
        padding-left: 15px;
    }
    .content{

        width: 100%;
        position: relative;
        padding-bottom: 40px;
        .blogTitle{
            width: 97%;
            margin: 0 auto;
            position: relative;
            top: 10px;
            display: flex;
            .left{
                width: 100px;
                span{
                    font-size: 18px;
                    color: #194772;
                    vertical-align: center;
                    line-height: 36px;
                }
            }
            .center {
                flex: 1;
                .el-input{
                    // border-color:  #929eaa;
                    margin-left: 15px;
                    height: 36px;
                    border: none;
                    // background-color: #edecec;
                }
            }
            .right{
                margin-left: 56px;
                width: 120px;
                .el-button {
                    width: 94px;
                    letter-spacing: 4px;
                }
            }
            .el-dialog{
                .el-form {
                    width: 56%;
                    margin: 0 auto;
                    .el-form-item__label{
                        color: #929eaa;
                    }
                    .el-select{
                    width: 90px;
                    // border-color: red;
                    }
                    .el-input {
                        width: 194px;
                        // border: 1px solid #acb5be;
                        border-radius: 4px;
                    }
                    .el-textarea {
                        width: 240px;
                        // border:1px solid #acb5be;
                        border-radius: 4px;
                    }
                    span{
                        vertical-align: top;
                    }

                }
                .el-button{
                    border: 2px solid #99ddfc;
                    color: #194772;
                    font-size: 14px;
                    width: 90px;
                }
            }
        }
        .a{
            width: 97%;
            margin:0 auto;
            height: 600px;
        }
        .edit {
            position: relative;
            top: 30px;
        }
    }
}
</style>
<script>
import * as qiniu from 'qiniu-js';
export default {
    name: 'write',
    props: {
        value: String,
        model: {
            type: [String, Object]
        }
    },
    data() {
        return {
            blogTitle: '', // 文章标题
            dialogVisible: false, // 设置弹出层不可见
            dialogFormVisible: false,
            radioVisible: false,
            context: '', // 输入的内容
            lang: '', // 编程语言类型
            cate: '', // 种类
            radio: '', // 选项的值
            category: [
                {
                    value: '选项1',
                    label: '前端'
                }, {
                    value: '选项2',
                    label: '后台'
                }, {
                    value: '选项3',
                    label: 'Python'
                }, {
                    value: '选项4',
                    label: 'Android'
                }, {
                    value: '选项5',
                    label: '技术新风向'
                }, {
                    value: '选项6',
                    label: '其它'
                }
            ],
            language: [
                {
                    id: 1,
                    label: 'HTML'
                }, {
                    id: 2,
                    label: 'javascript'
                }, {
                    id: 3,
                    label: 'JAVA'
                }, {
                    id: 4,
                    label: 'python'
                }, {
                    id: 5,
                    label: 'CSS'
                }, {
                    id: 6,
                    label: 'php'
                }, {
                    id: 7,
                    label: '其它'
                }
            ],
            form: {
                blogTitle: '', // 博客名称
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            description: '', // 博客描述内容
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true // 预览
            },
            imgFile: {
                token: '', // 图片上传到七牛的token值
                filename: '',
                file: '',
                domain: '',
                imgUrl: ''
            } // 图片上传
        };
    },
    computed: {
    },
    mouted() {
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        // 书写博客内容的上传
        write() {
            var url = 'http://120.79.94.90:8080/page/test/testAdd';
            // let formData = new FormData();
            // // 请求参数 ('key', value)
            // formData.append('content', this.context);
            // console.log(formData);
            var data = {content: this.context};
            console.log(data);
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.code === 100001) {
                        console.log('submit success');
                    }
                })
                .catch((error) => {
                    console.error('error', error);
                    console.log(error);
                });
        },
        $imgAdd(pos, $file) {
            let url = 'http://120.79.94.90:8080/page/QiniuUpToken';
            this.imgFile.file = $file;
            let fileName = $file.name; // 获取图片名称
            this.imgFile.filename = fileName;
            // 上传的本地文件绝对路径
            // var suffix = file.name; // 后缀名
            let data = { // 传参
                suffix: fileName
            };
            if (data) {
                let imgArray = []; // 正则连接
                Object.keys(data).forEach(key => imgArray.push(key + '=' + data[key]));
                if (url.search(/\?/) === -1) {
                    url += '?' + imgArray.join('&');
                } else {
                    url += '&' + imgArray.join('&');
                }
            }
            // 先从自己的服务端拿到token
            fetch(url, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((json) => {
                    this.imgFile.token = json.data.token;
                    this.imgFile.domain = json.data.domain;
                    console.log(this.imgFile.token);
                    let config = {
                        useCdnDomain: true,
                        region: qiniu.region.z0
                    };
                    let param = new FormData(); // 创建form对象
                    param.append('file', this.imgFile.file);
                    param.append('token', this.imgFile.token);
                    param.append('config', config);
                    console.log(param);
                    fetch('http://up-z0.qiniu.com/', {
                        method: 'POST',
                        cache: 'default',
                        mode: 'cors',
                        header: {
                            'Content-Type': 'multipart/form-data'
                        },
                        body: param
                    })
                        .then((response) => response.json())
                        .then((response) => {
                            this.imgFile.imgUrl = this.imgFile.domain + '/' + response.key;
                            console.log(this.imgFile.imgUrl); // 输出图片的七牛最终地址
                            console.log(response);
                            this.$refs.md.$img2Url(pos, 'http://' + this.imgFile.imgUrl);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        // uploadimg() {
        //     let param = new FormData(); // 创建form对象
        //     param.append('file', this.imgFile.file);
        //     param.append('token', this.imgFile.token);
        //     console.log(param);
        //     fetch('http://up-z0.qiniu.com/', {
        //         method: 'POST',
        //         cache: 'default',
        //         mode: 'cors',
        //         header: {
        //             'Content-Type': 'multipart/form-data'
        //         },
        //         body: param
        //     })
        //         .then((response) => response.json())
        //         .then((response) => {
        //             this.imgFile.imgUrl = this.imgFile.domain + '/' + response.key;
        //             console.log(this.imgFile.imgUrl); // 输出图片的七牛最终地址
        //             console.log(response);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }
    }
};
</script>
