<template>
    <div>
        <el-container class="container">
            <el-header height='60px'>
                <img class="header-logo left" src="../assets/logo.png" alt="logo">
                <div class="header-info right">
                    <span>金石文档欢迎您！&nbsp;</span>
                    <el-link type="info" :underline="false">登录</el-link>&nbsp;
                    <el-link type="danger" :underline="false">注册</el-link>&nbsp;
                </div>
            </el-header>
            <el-container>
                <!-- <el-aside width="200px"> -->

                <!-- </el-aside> -->
                <el-main>
                    <div id="div1" class="toolbar"></div>
                    <div id="div2" class="text">
                        <!--可使用 min-height 实现编辑区域自动增加高度-->
                        <board :msg="msg" :choice="choice"></board>
                        <p>{{msg}}</p>
                    </div>
                    <div class="introduce">
                        <b class="intro1">编写于</b>
                        <b class="intro2">金石文档</b>
                    </div>
                </el-main>
                <el-popover placement="top" width="350" trigger="hover" id="test" diabled="true">
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="75px"
                        class="demo-dynamic">
                        <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'评论' + (index+1)"
                            :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{
                        required: true, message: '评论不能为空', trigger: 'blur'
                      }">
                            <el-input v-if="!domain.isSubmitted" v-model="domain.value"></el-input>
                            <div v-else>{{domain.value}}</div>
                            <el-button v-if="!domain.isSubmitted" type="primary" @click="domain.isSubmitted = true">提交
                            </el-button>
                            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                        </el-form-item>
                        <el-form-item>
                            <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
                            <el-button @click="addDomain">新增评论</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button slot="reference" id="test">查看评论</el-button>
                </el-popover>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import E from "wangeditor";
    import board from "@/components/board.vue"
    export default {
        name: 'edt',
        props: {
            msg: String,
            title: String,
            choice: String,
        },
        mounted() {
            var editor2 = new E('#div1', '#div2')
            editor2.customConfig.onchange = (html) => {
                this.formArticle.content = html
            }
            editor2.create()
        },
        components: {
            board
        },
        data() {
            return {
                dynamicValidateForm: {
                    domains: [{
                        value: '',
                        isSubmitted: false
                    }],
                }
            }
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

    .el-header {
        position: relative;
        width: 100%;
        background-color: #fff;
    }

    .el-header .header-logo {
        top: 5px;
        left: 20px;
    }

    .el-header .header-info {
        height: 60px;
        line-height: 60px;
        font-size: 12px;
        color: gray;
        vertical-align: top;
    }

    .el-header .header-info .el-link {
        margin: 5px 0;
        font-size: 12px;
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

    .el-popover {
        position: relative;
    }

    .el-popover #test {
        position: absolute;
        top: 50px;
        left: 50px;
    }
</style>