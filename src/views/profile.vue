<template>
    <div class="profile">
        <el-container>
            <el-header class="head">
                <el-row>
                    <el-col :span="4">
                        <div style="margin-right:25px">
                            <img class="header-logo left" src="../assets/logo.png" alt="logo" @click="goPage()">
                        </div>

                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="6">
                        <div style="margin-top:3px">
                            <el-input clearable placeholder="随便找点什么吧" prefix-icon="el-icon-search" v-model="inputbox">
                            </el-input>
                        </div>

                    </el-col>

                    <el-col :span="13" style="text-align:right">
                        <el-col :span="6" class="welcome">
                            <el-link href="https://element.eleme.io" target="_blank" class="wel_text">既然选择了远方，您好！</el-link>
                        </el-col>
                        <el-col :span="6" class="avator">
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </el-col>
                    </el-col>
                </el-row>

            </el-header>

            <el-main class="w" v-loading="loading">
                <div class="form">

                    <!-- 个人信息页面主表单 -->
                    <el-form ref="profile" :model="profile" label-width="100px">
                        <el-form-item label="用户编号：">
                            {{profile.uid}}
                        </el-form-item>
                        <el-form-item label="用户昵称：">
                            <el-input v-model="profile.uname" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" class="pwd">
                            ******
                            <el-button type="text" class="right" @click="dialogVisible = true">修改密码</el-button>
                        </el-form-item>
                        <el-form-item label="年龄：">
                            <el-input-number :min="1" v-model.number="profile.age" placeholder="请输入年龄">
                            </el-input-number>
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
                            <el-input v-model="profile.hobby" placeholder="请输入爱好"></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button type="primary" @click="onSubmit()">保存</el-button>
                        </el-form-item>
                    </el-form>

                    <!-- 修改密码弹出的对话框 -->
                    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px">
                        <el-form ref="password" :model="password" :rules="rules">
                            <el-form-item label="原密码" prop="formerPwd">
                                <el-input type="password" v-model="password.formerPwd" autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPwd">
                                <el-input type="password" v-model="password.newPwd" autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="新密码确认" prop="newPwdCheck">
                                <el-input type="password" v-model="password.newPwdCheck" autocomplete="off">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogVisible = false;submitPassword()">确 定
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>

                </div>
            </el-main>

            <el-footer>
                <img src="../assets/footer.png" alt="footer">
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
                } else if (value !== this.profile.pwd) {
                    callback(new Error("密码错误"));
                } else {
                    if (this.password.newPwd !== "") {
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
                } else if (value === this.password.formerPwd) {
                    callback(new Error("新密码不能与原密码一致！"));
                } else {
                    if (this.password.newPwdCheck !== "") {
                        this.$refs.password.validateField("newPwdCheck");
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入新密码"));
                } else if (value !== this.password.newPwd) {
                    callback(new Error("两次输入密码不一致！"));
                } else {
                    callback();
                }
            };
            return {
                profile: {
                    uid: '1',
                    uname: 'g',
                    pwd: '123abc',
                    age: '',
                    gender: '',
                    introduction: '',
                    hobby: '',
                },
                password: {
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
            submitPassword() {
                var uid = this.profile.uid;
                var newPwd = this.password.newPwd;
                var formerPwd = this.password.formerPwd;
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/User/edit/' + uid + '/',
                    data: {
                        formerPwd: formerPwd,
                        newPwd: newPwd,
                    }
                }).then(
                    response => {
                        var rmsg = response.data.formerPwd;
                        if (rmsg == formerPwd)
                            alert('密码修改成功！');
                        else {
                            alert('密码修改失败！');
                            this.dialogVisible = true;
                        }
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            },
            onSubmit() {
                var uid = this.profile.uid;
                var uname = this.profile.uname;
                var age = this.profile.age;
                var gender = this.profile.gender;
                var introduction = this.profile.introduction;
                var hobby = this.profile.hobby;
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/User/edit/' + uid,
                    data: {
                        name: uname,
                        age: age,
                        gender: gender,
                        introduction: introduction,
                        hobby: hobby,
                    }
                }).then(
                    response => {
                        console.log(this.profile.uid);
                        var fmsg = '保存失败，请重新提交！';
                        var rmsg = response.data;
                        if (rmsg == '成功') alert('保存成功！');
                        else alert(fmsg);
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            },
            goPage(){
                this.$router.push({
                    name:'Page',
                })
            },
        },
        created() {
            this.$axios().then(
                response => {
                    this.profile = response.data;
                },
                err => {
                    console.log(err);
                }).catch((error) => {
                console.log(error);
            });
        },
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 600px;
    }
    .profile {
        background-color: #f3f3f3;
    }
    
    .shit{
        font-size:13px !important;
    }
    .head{
        background: rgba(8, 1, 1, 0.342);
        padding: 0;
    }
    .head .welcome {
        position: absolute;
        float: right;
    }
    .head .wel_text {
        position: absolute;
        width: 400px;
        height: 30px;
        color:#fbfcfe;
        float: right;
        margin-right: 20px;
        margin-top: 5px;
        line-height: 30px;
    }
    .head .avator {
        position: relative;
        width: 150px;
        height: 40px;
        float: right;
        margin-right: 100px;
    }
    .el-container {
        position: relative;
    }
    .el-divider--horizontal{
        margin-bottom: 1px !important;
        margin-top: 0px !important;
    }
    .el-link--default{
        color: #303133;
        font-size: 17px;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        margin-top:5px;
        border-radius: 4px;
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

    .el-footer {
        padding: 0 0;
    }
    .el-footer img {
        display: block;
        width: 100%;
    }
</style>