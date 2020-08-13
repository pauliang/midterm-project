<template>
    <div>
        <el-container class="container">
            <el-header class="head">

                <el-row>
                    <el-col :span="4">
                        <div style="margin-right:25px">
                            <img src="../assets/logo.png" @click="goBack2()">
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
                            <el-link href="https://element.eleme.io" target="_blank" class="wel_text">既然选择了远方，您好！
                            </el-link>
                        </el-col>
                        <el-col :span="6" class="avator">
                            <el-popover placement="top-start" width="240" trigger="hover">
                                <div v-if="islogin==true">
                                    <div class="item cardtxt">既然选择了远方</div>
                                    <div class="item cardtxt">1002609249@qq.com</div>
                                    <el-button class="item more_info" @click="longjmp('Profile')">修改个人资料</el-button>
                                    <el-button class="item logout" @click="logout()">退出登录</el-button>
                                </div>
                                <div v-if="islogin==false">
                                    <div class="item cardtxt">游客</div>
                                    <div class="item cardtxt">您尚未登陆</div>
                                    <el-button class="item login" @click="longjmp('Login')">登录</el-button>
                                    <el-button class="item regi" @click="longjmp('Regi')">注册</el-button>
                                </div>

                                <el-avatar icon="el-icon-user-solid" slot="reference"></el-avatar>
                            </el-popover>
                        </el-col>
                    </el-col>
                </el-row>

            </el-header>
            <el-aside class="aside">
                <el-popover placement="top" width="280" trigger="hover" id="test" diabled="true" class="remark">
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="75px"
                             class="demo-dynamic">
                        <el-form-item v-for="(domain, index) in dynamicValidateForm.domains"  :label="'评论' + (index+1)"
                                      class="remark_num" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{
                    required: true, message: '评论不能为空', trigger: 'blur'}" >
                            <el-input v-if="!domain.isSubmitted" v-model="domain.value"></el-input>
                            <div v-else class="content">{{domain.value}}</div>
                            <el-button v-if="!domain.isSubmitted" type="primary" @click="domain.isSubmitted = true" class="submit">提交
                            </el-button>
                            <el-button @click.prevent="removeDomain(domain)" type="danger" class="delete">删除</el-button>
                        </el-form-item>
                        <el-form-item class="addition_w">
                            <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
                            <el-button @click="addDomain" type="success" class="addition">新增评论</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button slot="reference" id="test" class="view_remark" type="info" plain icon="el-icon-edit">评论</el-button>
                </el-popover>
            </el-aside>
            <el-main>

                <div id="div1" class="toolbar"></div>
                <div id="div2" class="text">
                    <!--可使用 min-height 实现编辑区域自动增加高度-->
                    <board :choice=choice></board>
                    <p>{{msg}}</p>
                </div>

                <div class="introduce">
                    <b class="intro1">编写于</b>
                    <b class="intro2">金石文档</b>
                </div>

            </el-main>


        </el-container>
    </div>
</template>

<script>
    import E from "wangeditor";
    import board from '@/components/board.vue'
    export default {
        name: 'edt',
        data() {
            return {
                isCollapse: false,
                emm: '1-1',
                inputbox: '',
                which: 'worktable',
                islogin: true,
                dynamicValidateForm: {
                    domains: [{
                        value: '',
                        isSubmitted: false
                    }],
                }
            };
        },
        props: {
            choice: Number,
            msg: String
        },
        mounted() {
            var editor2 = new E('#div1', '#div2')
            editor2.customConfig.onchange = (html) => {
                this.formArticle.content = html
            }
            editor2.create()
        },
        methods: {
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                var length = this.dynamicValidateForm.domains.length;
                console.log(length);
                if (length == 0 || this.dynamicValidateForm.domains[length - 1].isSubmitted == true) {
                    this.dynamicValidateForm.domains.push({
                        value: '',
                        isSubmitted: false,
                        key: Date.now(),
                    });
                }
            },
            // submitDomain(item) {
            //     item.isSubmitted = true;
            // },
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
            goPage() {
                this.$router.push({
                    name: 'Models',
                })
            },
            goBack() {
                this.$router.push({
                    name: 'Models',
                })
            },
            goBack2() {
                this.$router.push({
                    name: 'Page',
                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            zipornot() {
                this.isCollapse = !this.isCollapse;
            },
            shortjmp(which) {
                this.which = which
            },
            longjmp(name) {
                this.$router.push({
                    name: name,
                })
            },
            logout() {
                this.islogin = false
            }
        },
        components: {
            board
        }
    }
</script>

<style scoped>
    .container {
        background-color: #f2f2f2;
    }

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
        right: 20px;
    }

    .el-container {
        position: relative;
    }

    .el-divider--horizontal {
        margin-bottom: 1px !important;
        margin-top: 0 !important;
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

    .el-header .header-logo {
        top: 5px;
        left: 20px;
    }

    .shit {
        font-size: 13px !important;
    }

    .head {
        position: relative;
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

    .container .el-main {
        position: relative;
    }

    .container .toolbar {
        margin: 10px auto;
        height: 40px;
        width: 750px;
        border: 1px solid #f6f6f6;
    }

    .container .text {
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        border: 1px solid #f6f6f6;
        width: 816px;
        height: 1172px;
        background-color: #fff;
    }

    .container .text p {
        text-align: left;
    }

    .container .text .title {
        display: inline-block;
        margin: 20px 350px;
        text-align: center;
        font-size: 36px;
        font-weight: 700;
    }

    .introduce {
        padding: 10px 0 0;
        color: #616161;
        text-align: center;
    }

    .introduce .intro1 {
        font-size: 12px;
        color: #a5a5a5;
        -webkit-font-smoothing: antialiased;
    }

    .introduce .intro2 {
        fill: #4a5056 !important;
    }

    .item {
        padding: 18px 0;
        font-size: 14px;
        color: #24292e;
    }

    .box-card {
        /* width: 240px;
        height: 280px; */
        margin: 0, 0;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
    }

    .more_info {
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

    .el-popover {
        position: absolute;
    }

    .el-popover #test {
        /*position: absolute;*/
        /*top: 50px;*/
        /*left: 50px;*/
    }
    .aside {
        position: relative;
        float: right;
        display: list-item;
        margin-top: 50px;
        margin-left: 1400px;
    }
    .submit {
        margin: 30px 20px 10px -50px;
        height: 40px;
        line-height: 10px;
        font-size: 18px;
    }
    .delete {
        margin: 30px 20px 10px 50px;
        height: 40px;
        line-height: 10px;
        font-size: 18px;
    }

    .view_remark {
        background-color: #fff;
    }

    .remark_num {
        font-weight: 700;
        color: #333333;
    }
    .content {
        font-size: 20px;
        font-weight: 400;
        color: #333333;
    }
    .addition_w {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .addition {
        height: 40px;
        line-height: 10px;
        margin-left: 10px;
    }
</style>