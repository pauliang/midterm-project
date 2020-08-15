<template>
    <el-container class="container">
        <el-main>
            <el-aside class="aside">
                <el-popover placement="top" width="280" trigger="hover click" id="test" diabled="true" class="remark">
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="75px"
                             class="demo-dynamic">
                        <el-form-item v-for="(domain, index) in dynamicValidateForm.domains"  :label="'评论' + (index+1)"
                                      class="remark_num" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{
                    required: true, message: '评论不能为空', trigger: 'blur'}" >
                            <el-input v-if="!domain.isSubmitted" v-model="domain.value"></el-input>
                            <div v-else class="content">{{domain.value}}</div>
                            <el-button v-if="!domain.isSubmitted" type="primary" @click="domain.isSubmitted = true" class="submit">{{submit}}
                            </el-button>
                            <el-button @click.prevent="removeDomain(domain)" type="danger" class="delete">{{del}}</el-button>
                        </el-form-item>
                        <el-form-item class="addition_w">
                            <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
                            <el-button @click="addDomain" type="success" class="addition">{{addition}}</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button slot="reference" id="test2" class="view_remark" type="info" plain icon="el-icon-edit">{{remark}}</el-button>
                </el-popover>
            </el-aside>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "comment",
        props: {
            submit: String,
            del: String,
            addition: String,
            remark: String,
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
                // console.log(length);
                if (length === 0 || this.dynamicValidateForm.domains[length - 1].isSubmitted === true) {
                    this.dynamicValidateForm.domains.push({
                        value: '',
                        isSubmitted: false,
                        key: Date.now(),
                    });
                }
            },
        }
    }
</script>

<style scoped>
    .container {
        background-color: #f2f2f2;
        position: relative;
    }
    .cardtxt {
        text-align: center;
    }

    .el-popover {
        position: absolute;
    }

    .aside {
        position: relative;
        float: right;
        display: list-item;
        margin-top: 0;
        margin-left: 200px;
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