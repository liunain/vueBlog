<template>
    <div>
        <topbar></topbar>
        <div class="mid">
            <div class="left_geek_studio">
                <img src="~images/geek_studio.png" alt="">
            </div>
            <div class="login_box" v-loading="loading">
                <div class="login">登 录</div>
                <div class="form-container">
                    <el-radio-group v-model="labelPosition" size="small">
                    </el-radio-group>
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="64px" class="demo-ruleForm" :label-position="labelPosition" size="mini">
                    <el-form-item label="用户名" prop="name">
                        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" size="medium">提 交</el-button>
                        <el-button size="medium" class="find-password"><router-link to='/reset'>找回密码</router-link></el-button>
                    </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import topbar from '../common/topbar/index';
export default {
    data() {
        var validateUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
            callback();
        };
        return {
            labelPosition: 'left',
            ruleForm: {
                name: '',
                pass: ''
            },
            loading: '',
            rules: {
                name: [
                    { validator: validateUser, trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
                    // 中文、英文、数字包括下划线
                    { pattern: /^[\u4E00-\u9FA5A-Za-z0-9_@.]+$/, message: '用户名为系统禁止的标识!', trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    components: {
        topbar
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 提交成功
                    this.login();
                } else {
                    this.$alert('请检查输入的信息是否正确！', '错误', {
                        confirmButttonText: '确定'
                    });
                    return false;
                }
            });
        },
        login() {
            let url = 'http://x96vvc9tgt.51http.tech/user/findUser?account=' + this.ruleForm.name + '&password=' + this.ruleForm.pass;
            console.log(url);
            axios({
                methods: 'post',
                url: url,
                withCredentials: true
            }).then(res => {
                console.log(res.data);
                console.log(res.data.data);
                if (res.data.code === 400004 || res.data.code === 200002 || res.data.code === 500002 || res.data.code === 300001) {
                    this.$alert(res.data.msg, '错误', {
                        confirmButttonText: '确定'
                    });
                } else if (res.data.code === 100001) {
                    alert('success');
                    axios({
                        methods: 'post',
                        url: 'http://x96vvc9tgt.51http.tech/user/getUser'
                    }).then((res) => {
                        console.log(res);
                        console.log(document.cookie);
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.$alert('其他未知错误,请联系管理员,错误代码:' + res.data.code, '错误', {
                        confirmButttonText: '确定'
                    });
                }
            }).catch(error => {
                console.log(error);
                this.$alert('请检查网络后再试!', '网络错误', {
                    confirmButttonText: '确定'
                });
            });
        }
    }
};
</script>

<style <style lang="scss" scoped>
    $color: #2567a3;
    .mid {
        position: relative;
        margin: 165px auto auto auto;
        width: 466 + 371px;
        height: 318px;
        box-shadow: 0px 0px 8px 6px rgba(227, 227, 227, 1);
        .left_geek_studio {
        position: relative;
        float: left;
        width: 371px;
        height: 318px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .login_box {
            position: relative;
            float: left;
            width: 466px;
            height: 318px;
            overflow: hidden;
            .login {
                position: relative;
                margin: 40px auto 0 auto;
                padding: 0 0 0 55px;
                width: 200px;
                font-size: 24px;
                text-align: center;
                color: $color;
            }
            .form-container {
                position: relative;
                margin: 0 auto;
                width: 276px;
            }
            .no-account {
                position: relative;
                margin: 15px 0 auto 140px;
                font-size: 12px;
                color: #2567a3;
                font-family: Microsoft YaHei;
            }
        }
    }
    .find-password {
        margin-left: 35px;
        a{
            color: $color;
        }
    }
</style>
