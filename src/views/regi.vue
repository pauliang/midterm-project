<template>
    <div class="bg2">
        <el-container>


            <el-container class="mid">

                <el-main class="zhihu" v-loading="loading">
                    <el-form ref="form" :model="form" :rules="rules">
                        <el-form-item label-width="0px">
                            <div class="mainhead">
                                <span style="font-weight:bold;margin-right:30px;padding-bottom:10px;border-bottom:#409EFF;
    border-width: 2px;
    border-bottom-style:solid;">账户注册</span>
                            </div>
                        </el-form-item>
                        <el-form-item label-width="0px" prop="name">
                            <el-input v-model="form.name" placeholder="用户名"></el-input>
                        </el-form-item>

                        <el-form-item label-width="0px" prop="code">
                            <el-input v-model="form.code" placeholder="密码" show-password></el-input>
                        </el-form-item>
                        <el-form-item label-width="0px" prop="code2">
                            <el-input v-model="form.code2" placeholder="再次确认密码" show-password></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('form')" style="width:380px;">注册</el-button>
                        </el-form-item>

                    </el-form>
                    <el-divider></el-divider>
                    <div style="font-size:14px;">

                        <div> <span>注册即代表同意《用户协议》《隐私保护指引》</span> </div>
                        <span>已有金石文档账户？点击此处进行<el-button type="text" @click="bump_login">账户登录</el-button></span>
                    </div>
                </el-main>

            </el-container>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>


<script>
    function isvalidPass(str) {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,18}$/;
        return reg.test(str);
    }
    export default {
        name: 'regi',
        data() {
            var validatePass = (rule, value, callback) => {
                console.log(this.usernameList);
                if (value === "") {
                    callback(new Error("请输入用户名"));
                } else {
                    this.usernameList.forEach(username => {
                        if (this.form.name === username) {
                            callback(new Error("该用户名已存在"));
                        }
                    });
                    callback();
                }
            };
            var validatePass1 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else if (!isvalidPass(value)) {
                    callback(
                        new Error("密码长度在6~18之间，只能包含字母、数字和下划线中的至少两种")
                    );
                } else {
                    if (this.form.code2 !== "") {
                        this.$refs.form.validateField("code2");
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.form.code) {
                    callback(new Error("两次输入密码不一致！"));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    name: '',
                    delivery: false,
                    code: '',
                    code2: '',
                },
                loading: false,
                usernameList: ['123'],
                rules: {
                    name: [{
                        required: true,
                        validator: validatePass,
                        trigger: "blur"
                    }],
                    code: [{
                        required: true,
                        validator: validatePass1,
                        trigger: "blur"
                    }],
                    code2: [{
                        required: true,
                        validator: validatePass2,
                        trigger: "blur"
                    }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("submitted");
                        this.onSubmit(this.form.name, this.form.code, this.form.code2);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onSubmit(username, pwda, pwdb) {
                // console.log('submit!' + username + pwda + pwdb);
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/User/register/',
                    data: {
                        username: username,
                        password: pwda,
                        password2: pwdb
                    }
                }).then(
                    response => {
                        var fmsg = '请重新注册！'
                        var info = response.data.info;
                        if (info === '成功') {
                            alert('注册成功！');
                            this.$router.push({
                                name: "Login",
                            });
                        } else
                            alert(info + fmsg);
                    },
                    err => {
                        console.log(err)
                    }).catch((error) => {
                    console.log(error)
                })
            },
            bump_login() {
                this.$router.push({
                    // 存疑，此处用name怎么没法跳转，麻烦高人指点
                    // name: "Login",       
                    path: "/login",
                });
            }
        },
        created() {
            this.$axios({
                method: 'post',
                url: 'http://39.97.122.202/User/register/usernameList/',
            }).then(
                response => {
                    this.usernameList = response.data.usernameList;
                },
                err => {
                    console.log(err);
                }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>



<style scoped>
    .bg2 {
        /*width: 100%;*/
        width: 100%;
        height: 100%;
        /**宽高100%是为了图片铺满屏幕 */
        z-index: -1;
        position: fixed;
        background-image: url("../assets/regi.jpg");
        position: fixed;
        background-size: 100% 100%;
        overflow-y: auto;
    }

    body {
        margin: 0;
        padding: 0;
    }

    .mid {
        margin-top: 8%;
        height: 100%;
        width: 450px;

        margin-left: auto;
        margin-right: auto;
        overflow-x: auto;

    }

    .zhihu {
        background-color: white;
    }

    .swi {
        float: left;
        top: 9.5px;
        bottom: 0px;
        margin: auto;
    }


    .mainhead {
        font-size: 16px;
        float: left;

    }
</style>