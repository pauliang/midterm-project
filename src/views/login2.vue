<template>
    <div class="bg">
        <el-container>
            <img :src="def">

            <el-container class="mid">
                <el-main class="zhihu" v-loading="loading">
                    <el-form ref="form" :model="form">
                        <el-form-item label-width="0px">
                            <div class="mainhead">
                                <span
                                    style="font-weight:bold;margin-right:30px;padding-bottom:10px;border-bottom:#409EFF;border-width: 2px;border-bottom-style:solid;">
                                    密码登录</span> <span>免密码登录(In Future)</span>
                            </div>
                        </el-form-item>
                        <el-form-item label-width="0px">
                            <el-input v-model="form.name" placeholder="用户名"></el-input>
                        </el-form-item>

                        <el-form-item label-width="0px">
                            <el-input v-model="form.code" placeholder="密码" show-password></el-input>
                        </el-form-item>

                        <el-form-item label="记住我" label-width="60px">
                            <el-switch v-model="form.delivery" class="swi"></el-switch>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit(form.name,form.code)" style="width:380px;">登录
                            </el-button>
                        </el-form-item>

                    </el-form>

                    <el-divider></el-divider>

                    <div style="font-size:14px;">
                        <span>没有金石文档账户？点击此处进行<el-button type="text" @click="bump_regi">账户注册</el-button></span>
                        <div> <span>注册即代表同意《用户协议》《隐私保护指引》</span> </div>
                    </div>
                </el-main>

            </el-container>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>


<script>
    export default {
        name: 'login',
        data() {
            return {
                form: {
                    name: '',
                    delivery: true,
                    code: '',
                },
                loading: false,
                islogin: false,
                def: "",
            }
        },

        methods: {
            bump_regi() {
                this.$router.push({
                    path: "/regi"
                });
            },
            onSubmit(name, code) {
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/User/login/',
                    data: {
                        username: name,
                        password: code
                    }
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.info === "Login Success!") {
                        localStorage.setItem('username', this.form.name);
                        localStorage.setItem('userID', res.data.userID);
                        this.$router.push({
                            name: "Page",
                            // path: '/page',
                        })
                    } else {
                        alert("登录失败，请确认你的用户名和密码是否正确");
                    }

                });

            },
        },
    }
</script>



<style scoped>
    .bg {
        /*width: 100%;*/
        width: 100%;
        height: 100%;
        /**宽高100%是为了图片铺满屏幕 */
        z-index: -1;
        position: fixed;
        background-image: url("../assets/login.jpg");
        background-size: 100% 100%;
        overflow-y: auto;
        overflow-x: auto;
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