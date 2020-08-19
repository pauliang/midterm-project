<template>
    <div>
        <el-container class="container">
            <el-header class="head">

                <el-row>
                    <el-col :span="4">
                        <div style="margin-right:25px">
                            <img src="../assets/logo.png" alt="logo" @click="goPage()">
                        </div>

                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="6">
                        <div class="slogan">
                            <el-tag class="slogan2">“精诚所至，金石为开”</el-tag>
                        </div>
                    </el-col>

                    <el-col :span="13" style="text-align:right">
                        <el-col :span="6" class="welcome">
                            <el-link v-if="is_login===true" href="/profile" :underline="false" target="_blank"
                                     class="wel_text">{{ this.localStorageName }}，您好！
                            </el-link>
                        </el-col>
                        <el-col :span="6" class="avator">
                            <el-popover placement="top-start" width="240" trigger="hover" popper-class="av">
                                <div v-if="is_login===true">
                                    <div class="item cardtxt">{{ this.localStorageName }}</div>
                                    <div v-if="is_active===true">
                                        <el-badge value="new">
                                            <el-button index="0" class="item more_info1"
                                                       @click="longjmp('Notification_center')">
                                                查看系统通知
                                            </el-button>
                                        </el-badge>
                                    </div>

                                    <div v-else>
                                        <el-button index="0" class="item more_info1"
                                                   @click="longjmp('Notification_center')">
                                            查看系统通知
                                        </el-button>
                                    </div>

                                    <el-button class="item more_info2" @click="longjmp('Profile')">修改个人资料</el-button>
                                    <el-button class="item logout" @click="logout()">退出登录</el-button>
                                </div>
                                <div v-if="is_login===false">
                                    <div class="item cardtxt">你尚未登陆</div>
                                    <el-button class="item login" @click="longjmp('Login')">登录</el-button>
                                    <el-button class="item regi" @click="longjmp('Regi')">注册</el-button>
                                </div>

                                <el-avatar icon="el-icon-user-solid" slot="reference"></el-avatar>
                            </el-popover>
                        </el-col>
                    </el-col>
                </el-row>

            </el-header>

            <el-main>
                <h1 v-if="localStorageFileName != ''">{{localStorageFileName}}</h1>
                <div id="div1" class="toolbar" style="width: 900px;">
                    <el-tooltip effect="light" content="返回" placement="bottom">
                        <div style="font-size:25px;cursor:pointer;margin-left:35px;" class="el-icon-back"
                            @click="goBack"></div>
                    </el-tooltip>
                    <el-tooltip effect="light" content="保存" placement="bottom">
                        <div style="font-size:25px;cursor:pointer;margin-left:10px;" class="el-icon-upload"
                            @click="saveFile"></div>
                    </el-tooltip>
                    <el-tooltip effect="light" content="另存为" placement="bottom">
                        <div style="font-size:25px;cursor:pointer;margin-left:10px;" class="el-icon-document-add"
                            @click="isShow1 = true"></div>
                    </el-tooltip>
                </div>
                <div id="div2" class="text">
                    <!--可使用 min-height 实现编辑区域自动增加高度-->
                    <board :choice=choice></board>
                    <p>{{msg}}</p>
                </div>

                <div class="introduce">
                    <b class="intro1">编写于</b>
                    <b class="intro2">金石文档</b>
                </div>
                <el-dialog title="创建文档" :visible.sync="isShow1" width="30%" modal="true">
                    <el-form ref="doc" :model="doc" label-width="100px">
                        <el-form-item label="文件名" prop="docname"
                            :rules="[{required: true, message: '请输入文件名', trigger: 'blur'}]">
                            <el-input v-model="doc.docname" autocomplete="off">
                            </el-input>.doc
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="isShow1 = false">取 消</el-button>
                        <el-button @click="isShow1 = false;submitForm('doc')">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="提示" :visible.sync="isShow2" width="30%" :before-close="handleClose">
                    <span>这是一段信息</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="isShow2 = false">取 消</el-button>
                        <el-button type="primary" @click="goBack()">确 定</el-button>
                    </span>
                </el-dialog>
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
                isShow1: false,
                isShow2: false,
                isCollapse: false,
                inputbox: '',
                islogin: true,
                doc: {
                    docname: '',
                },
                localStorageID: -1,
                localStorageName: '',
                localStorageFileID: -1,
                localStorageFileName: '',
                inputBox: '',
                is_login: true,
                is_active: false,
                msgList: [],
            };
        },
        props: {
            choice: String,
            msg: String
        },
        mounted() {
            var editor2 = new E('#div1', '#div2');
            editor2.customConfig.onchange = (html) => {
                this.formArticle.content = html;
            };
            editor2.customConfig.uploadImgShowBase64 = true;
            editor2.create();
        },
        methods: {
            goPage() {
                if (localStorage.getItem('groupid') != null)
                    localStorage.removeItem('groupid');
                this.$router.push({
                    name: 'Page',
                })
            },
            saveFile() {
                if (localStorage.getItem('docid') == null) //该项记录说明是否该文件已经创建，如果已创建则保存，否则创建新文档
                    this.isShow1 = true;
                else {
                    var div2 = document.getElementById("div2").innerHTML;
                    this.$axios({
                        method: 'post',
                        url: 'http://39.97.122.202/doc/save_doc/',
                        data: {
                            id: this.$route.query.docid,
                            msg: div2,
                            userid: this.localStorageID,
                        }
                    }).then(res => {
                        if (res.data == 1)
                            alert('保存成功');
                        else alert('保存失败');
                    }).catch(err => {
                        console.log(err);
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            },
            createFile() {
                var div2 = document.getElementById("div2");
                console.log(this.doc.docname);
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/Table/new_file/',
                    data: {
                        id: this.localStorageID,
                        content: div2.innerHTML,
                        docname: this.doc.docname,
                    }
                }).then(
                    res => { //如果传过来的数据是{info:"success", docid: 文档id},就这么写，如果失败的话,也应该按照{info: "failed"}，这样的格式写
                        if (res.data.info === "success") {
                            alert("创建文档成功");
                            this.localStorageFileID = res.data.docid;
                            localStorage.setItem('docid', res.data.docid);
                            this.localStorageFileName = this.doc.docname;
                        } else {
                            alert("创建文档失败");
                        }
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
                if (localStorage.getItem('groupid') != null) {
                    this.$axios({
                        method: 'post',
                        url: 'http://39.97.122.202/autho/set_group_auth',
                        data: {
                            docnum: this.doc.docnum,
                            groupnum: this.groupid
                        }
                    }).then(res => {
                        if (res.data == 1) {
                            console.log('组内文件创建成功');
                        } else {
                            console.log('组内文件创建失败');
                        }
                    }).catch(() => {
                        console.log('网络问题，组内文件创建失败');
                    })
                }
            },
            goBack() {
                this.$router.push({
                    name: 'Models',
                })
            },
            longjmp(name) {
                if (localStorage.getItem('groupid') != null)
                    localStorage.removeItem('groupid');
                if (localStorage.getItem('docid') != null)
                    localStorage.removeItem('docid');
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
                this.longjmp("Login");
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("submitted");
                        this.createFile();
                    } else {
                        this.isShow1 = true;
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        created() {
            var userID = localStorage.getItem('userID');
            if (userID != null) {
                this.islogin = true;
                this.localStorageName = localStorage.getItem('username');
                this.localStorageID = userID;
            } else {
                //暂时修改
                // localStorage.getItem('aaa');
                this.longjmp("Login");
            }
            var msg_url = 'http://39.97.122.202/notice/get_notice';
            this.$axios({
                method: 'post',
                url: msg_url, //此处不传data
            }).then(
                response => {
                    var msgs = response.data;
                    var before = this.msgList.length;
                    var after = msgs.length;
                    if (before === after) {
                        this.is_active = false;
                    } else {
                        this.is_active = true;
                        this.msgList = msgs;
                    }
                },
                err => {
                    console.log(err);
                }).catch((error) => {
                console.log(error);
            });
        },
        components: {
            board
        },
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

    .head .el-col-6 .slogan {
        width: 100px;
        margin-top: 5px;
        margin-left: 300px;
    }

    .head .el-col-6 .slogan2 {
        font-size: 28px;
        font-weight: 400;
        font-family: "KaiTi", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        line-height: 40px;
        height: 40px;
        background-color: transparent;
        color: #ffffff;
        border: none;
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

    /*这部分是个人信息的小卡片*/
    .item {
        padding: 18px 0;
        font-size: 14px;
        color: #24292e;
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
        margin: 10px auto 20px;
        width: 180px;
    }

    .login {
        display: block;
        color: #409eff;
        margin: 0 auto 20px;
        width: 180px;
    }

    .regi {
        display: block;
        color: #409eff;
        margin: 0 auto 20px;
        width: 180px;
    }

    .cardtxt {
        text-align: center;
    }

    .el-popover {
        position: absolute;
    }

    /* .el-popover #test {
        position: absolute;
        top: 50px;
        left: 50px;
    } */
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
<style>
    /* .w-e-menu {
        z-index: 2 !important;
    } */

    /* .w-e-text-container {
        z-index: 1 !important;
    } */

    /* .el-input {
        width: 200px;
        padding: 2mm;
    } */

    .w-e-text-container {
        z-index: 0 !important;
    }

    .w-e-toolbar {
        flex-wrap: wrap;
        z-index: 1 !important;
    }

    .el-dialog {
        z-index: auto !important;
    }

    /* .w-e-menu {
        z-index: auto !important;

        .w-e-droplist {
            z-index: 2 !important;
        }
    } */
</style>