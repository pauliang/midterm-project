<template>
    <div class="profile">
        <el-container>
            <el-header height='60px'>
                <img class="header-logo left" src="../assets/logo.png" alt="logo">
                <div class="header-info right">
                    <span>金石文档欢迎您！&nbsp;</span>
                    <el-link type="info" :underline="false">登录</el-link>&nbsp;
                    <el-link type="danger" :underline="false">注册</el-link>&nbsp;
                </div>
            </el-header>
            <el-main class="w" v-loading="loading">
                <div class="form">
                    <el-form ref="profile" :model="profile" label-width="100px">
                        <el-form-item label="用户编号：">
                            {{profile.uid}}
                        </el-form-item>
                        <el-form-item label="用户昵称：">
                            <el-input v-model="profile.uname" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                        <!-- 待处理 -->
                        <el-form-item label="密码：" class="pwd">
                            ******
                            <el-button type="text" class="right" @click="dialogVisible = true">修改密码</el-button>
                        </el-form-item>
                        <el-form-item label="年龄：">
                            <el-input-number v-model.number="profile.age" placeholder="请输入年龄"></el-input-number>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <el-radio-group v-model="profile.gender">
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="个人简介：">
                            <el-input type="textarea" resize="none" :rows="4" v-model="profile.introduction"></el-input>
                        </el-form-item>
                        <el-form-item label="兴趣爱好：">
                            <el-input v-model="profile.hobby" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="submitForm('profile')">保存</el-button>
                        </el-form-item>
                    </el-form>
                    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px">
                        <el-form ref="password" :model="pwdtemp" :rules="rules">
                            <el-form-item label="原密码" prop="formerPwd">
                                <el-input type="password" v-model="pwdtemp.formerPwd" autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPwd">
                                <el-input type="password" v-model="pwdtemp.newPwd" autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="新密码确认" prop="newPwdCheck">
                                <el-input type="password" v-model="pwdtemp.newPwdCheck" autocomplete="off">
                                </el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="submitChange('password');dialogVisible = false">确 定
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </div>
            </el-main>
            <el-footer>
            </el-footer>
        </el-container>
    </div>
</template>


<script>
    function isvalidPass(str) {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,18}$/;
        return reg.test(str);
    }

    export default {
        name: 'profile',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入原密码"));
                } else {
                    if (this.pwdtemp.newPwd !== "") {
                        this.$refs.password.validateField("newPwd");
                    }
                    callback();
                }
            };
            var validatePass1 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入新密码"));
                } else if (!isvalidPass(value)) {
                    callback(
                        new Error("密码长度在6~18之间，只能包含字母、数字和下划线中的至少两种")
                    );
                } else if (value === this.pwdtemp.formerPwd) {
                    callback(new Error("新密码不能与原密码一致！"));
                } else {
                    if (this.pwdtemp.newPwdCheck !== "") {
                        this.$refs.password.validateField("newPwdCheck");
                    }
                    callback();
                }
            };

            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入新密码"));
                } else if (value !== this.pwdtemp.newPwd) {
                    callback(new Error("两次输入密码不一致！"));
                } else {
                    callback();
                }
            };
            return {
                profile: {
                    uid: '1837',
                    uname: 'prof',
                    pwd: 'testtest',
                    age: 20,
                    gender: 1,
                    introduction: '我太菜了',
                    hobby: '摸鱼',
                },
                pwdtemp: {
                    formerPwd: '',
                    newPwd: '',
                    newPwdCheck: '',
                },
                logourl: '../assets/logo.png',
                loading: false,
                dialogVisible: false,
                rules: {
                    formerPwd: [{
                        required: true,
                        validator: validatePass,
                        trigger: "blur"
                    }],
                    newPwd: [{
                        required: true,
                        validator: validatePass1,
                        trigger: "blur"
                    }],
                    newPwdCheck: [{
                        required: true,
                        validator: validatePass2,
                        trigger: "blur"
                    }],
                }
            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitChange(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('new password submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
        display: inline-block;
    }

    .left {
        position: absolute;
        top: 0;
        left: 0;
    }

    .right {
        position: absolute;
        top: 0;
        right: 0;
    }

    .profile {
        background-color: #eeeeee;
    }

    .profile .el-header {
        position: relative;
        width: 100%;
        background-color: #fff;
    }

    .profile .el-header .header-logo {
        top: 5px;
        left: 50px;
    }

    .profile .el-header .header-info {
        height: 60px;
        line-height: 60px;
        font-size: 12px;
        color: gray;
        vertical-align: top;
    }

    .profile .el-header .header-info .el-link {
        margin: 0 5px;
        margin-top: -3px;
        font-size: 12px;
    }

    .w {
        width: 950px;
        margin: 50px auto;
        background-color: #fff;
        font-size: 15px;
    }

    .w .form {
        width: 500px;
        margin-left: 50px;
    }

    .pwd {
        position: relative;
    }
</style>