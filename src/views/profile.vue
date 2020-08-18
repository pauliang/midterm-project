<template>
    <div class="profile">
        <el-container class="w2 whole">
            <my_header></my_header>
            <el-main class="w" v-loading="loading">
                <div class="form">

                    <!-- 个人信息页面主表单 -->
                    <el-form ref="profile" :model="profile" label-width="100px" :rules="rule">
                        <el-form-item label="用户编号：">
                            {{profile.id}}
                        </el-form-item>
                        <el-form-item label="用户昵称：">
                            <span>{{ profile.username }}</span>
                        </el-form-item>
                        <el-form-item label="密码：" class="pwd">
                            ******
                            <el-button v-if="this.isEditable == true" type="text" class="right"
                                @click="dialogVisible = true">修改密码</el-button>
                        </el-form-item>
                        <el-form-item label="年龄：">
                            <el-input-number v-if="this.isEditable == true" :min="1" v-model.number="profile.age"
                                placeholder="请输入年龄">
                            </el-input-number>
                            <span v-else>{{ profile.age }}</span>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <el-radio-group v-if="this.isEditable == true" v-model="profile.gender">
                                <el-radio v-model.number="profile.gender" :label="1">男</el-radio>
                                <el-radio v-model.number="profile.gender" :label="0">女</el-radio>
                            </el-radio-group>
                            <span v-else-if="profile.gender==1">男</span>
                            <span v-else>女</span>

                        </el-form-item>
                        <el-form-item label="个人简介：">
                            <el-input v-if="this.isEditable == true" type="textarea" resize="none" :rows="4"
                                v-model="profile.introduction"></el-input>
                            <span v-else> {{ profile.introduction }} </span>
                        </el-form-item>
                        <el-form-item label="兴趣爱好：">
                            <el-input v-if="this.isEditable == true" v-model="profile.hobby" placeholder="请输入爱好">
                            </el-input>
                            <span v-else> {{ profile.hobby }} </span>
                        </el-form-item>
                        <el-form-item label="邮箱：" prop="email">
                            <el-input v-if="this.isEditable == true" v-model="profile.email" placeholder="请输入邮箱地址">
                            </el-input>
                            <span v-else> {{ profile.email }} </span>
                        </el-form-item>
                        <el-form-item label="手机号：" prop="phone">
                            <el-input v-if="this.isEditable == true" v-model="profile.phone" placeholder="请输入手机号">
                            </el-input>
                            <span v-else> {{ profile.phone }} </span>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-button v-if="this.isEditable == true" type="primary" @click="submitForm('profile')">保存
                            </el-button>
                            <el-button style="margin-left: 100px;" v-if="this.islogin == true" type="primary"
                                @click="longjmp('Page')">返回个人工作台
                            </el-button>
                        </el-form-item>
                    </el-form>

                    <!-- 修改密码弹出的对话框 -->
                    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px">
                        <el-form ref="password" :model="password" :rules="rules">
                            <el-form-item label="原密码">
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
                                <el-button type="primary" @click="submitForm('password')">确 定
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
    import my_header from "../components/my_header";
    function isvalidPass(str) {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,18}$/;
        return reg.test(str);
    }
    export default {
        name: 'profile',
        components: {
            my_header
        },
        data() {
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
            // var validatePass3 = (rule, value, callback) => {
            //     if (value === "") {
            //         callback(new Error("请输入用户名"));
            //     } else {
            //         this.usernameList.forEach(username => {
            //             console.log(username);
            //             if (username != localStorage.getItem('username') && this.profile.username ==
            //                 username) {
            //                 callback(new Error("该用户名已存在"));
            //             }
            //         });
            //         callback();
            //     }
            // };
            var checkPhone = (rule, value, callback) => {
                const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
                if (value === "") {
                    callback(new Error('电话号码不能为空'));
                }
                // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
                // 所以我就在前面加了一个+实现隐式转换
                if (!Number.isInteger(+value)) {
                    callback(new Error('请输入数字值'))
                } else if (!phoneReg.test(value)) {
                    callback(new Error('电话号码格式不正确'));
                } else {
                    callback();
                }
            };
            var checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
            }
            return {
                inputbox: '',
                profile: {
                    id: '',
                    username: '',
                    age: '',
                    gender: '',
                    introduction: '',
                    hobby: '',
                    email: '',
                    phone: '',
                },
                password: {
                    formerPwd: '',
                    newPwd: '',
                    newPwdCheck: '',
                },
                logourl: '../assets/logo.png',
                loading: false,
                dialogVisible: false,
                isEditable: true,
                islogin: false,
                localStorageName: '',
                localStorageID: '',
                usernameList: ['g'],
                rule: {
                    // uname: [{
                    //     required: true,
                    //     validator: validatePass3,
                    //     trigger: "blur"
                    // }],
                    phone: [{
                        required: true,
                        validator: checkPhone,
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        validator: checkEmail,
                        trigger: 'blur'
                    }],
                },
                rules: {
                    // formerPwd: [{
                    //     required: true,
                    //     validator: validatePass,
                    //     trigger: "blur"
                    // }],
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
                var uid = this.profile.id;
                var formerPwd = this.password.formerPwd;
                var newPwd = this.password.newPwd;
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/User/change_password/' + uid + '/',
                    data: {
                        formerPwd: formerPwd,
                        newPwd: newPwd,
                    }
                }).then(
                    response => {
                        var info = response.data.info;
                        if (info === "成功")
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
                var uid = this.profile.id;
                var uname = this.profile.username;
                var age = this.profile.age;
                var gender = this.profile.gender;
                var introduction = this.profile.introduction;
                var hobby = this.profile.hobby;
                var email = this.profile.email;
                var phone = this.profile.phone;
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/User/edit/' + uid + '/',
                    data: {
                        username: uname,
                        age: age,
                        gender: gender,
                        introduction: introduction,
                        hobby: hobby,
                        email: email,
                        phone: phone,
                    }
                }).then(
                    response => {
                        console.log(this.profile.id);
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
            goMyProfile() {
                if (!this.isEditable) { //不可编辑说明查看的不是自己的个人信息页面
                    var id = this.localStorageID;
                    console.log(id); //data()中定义了一个属性，获取localStorage的值
                    this.$router.push({
                            name: 'Profile',
                            query: {
                                id: id
                            }
                        }),
                        this.$router.go(0);
                }
            },
            goPage() {
                this.$router.push({
                    name: 'Page',
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (formName == "password")
                            this.submitPassword();
                        else if (formName == "profile")
                            this.onSubmit();
                        localStorage.setItem('username', this.profile.username);
                        console.log("submitted");
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            longjmp(name) {
                if (name === "Profile") {
                    this.$router.push({
                        path: '/profile',
                        query: {
                            id: this.localStorageID,
                        }
                    });
                } else {
                    this.$router.push({
                        name: name,
                    });
                }
            },
            logout() {
                this.islogin = false;
                localStorage.removeItem('userID');
                localStorage.removeItem('username');
                this.longjmp('Login');
            }
        },
        created() {
            var id = this.$route.query.id;
            this.$axios({
                method: 'post',
                url: 'http://39.97.122.202/User/profile/' + id + '/', //此处不传data
            }).then(
                response => {
                    this.profile = response.data[0];
                    this.usernameList = response.data[0].usernameList;
                    var userID = localStorage.getItem('userID');
                    if (userID != null) {
                        if (userID == this.profile.id) {
                            this.isEditable = true;
                        } else
                            this.isEditable = false;
                        this.islogin = true;
                        this.localStorageName = localStorage.getItem('username');
                        this.localStorageID = userID;
                    } else this.logout();
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

    /*版心的设计*/
    .whole {
        height: 1500px;
    }
    .w2 {
        height: 1000px;
    }

    .profile {
        background-color: #f3f3f3;
    }

    .shit {
        font-size: 13px !important;
    }

    .head {
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
        color: #fbfcfe;
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

    .el-divider--horizontal {
        margin-bottom: 1px !important;
        margin-top: 0px !important;
    }

    .el-link--default {
        color: #303133;
        font-size: 17px;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        margin-top: 5px;
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

    /*这部分是个人信息的小卡片*/
    .item {
        padding: 18px 0;
        font-size: 14px;
        color: #24292e;
    }

    .box-card {
        /*width: 240px;*/
        /*height: 280px;*/
        margin: 0 0;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
    }

    .more_info1 {
        display: block;
        color: #409eff;
        margin: 0 auto 10px 30px;
        width: 180px;
    }

    .more_info2 {
        display: block;
        color: #409eff;
        margin: 0 auto;
        width: 180px;
    }

    .logout {
        display: block;
        color: #c81623;
        margin: 10px auto 0;
        width: 180px;
        margin-bottom: 20px;
    }

    .login {
        display: block;
        color: #409eff;
        margin: 0 auto;
        width: 180px;
        margin-bottom: 20px;
    }

    .regi {
        display: block;
        color: #409eff;
        margin: 0 auto;
        width: 180px;
        margin-bottom: 20px;
    }

    .cardtxt {
        text-align: center;
    }
</style>
<style>
    .el-popover.av3 {
        position: absolute;
        background: #FFF;
        min-width: 100px;
        height: 200px;
        min-height: 200px;
        border: 1px solid #EBEEF5;
        padding: 10px 0;
        z-index: 2000;
        color: #606266;
        line-height: 1.4;
        text-align: justify;
        font-size: 14px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        word-break: break-all;
    }
</style>