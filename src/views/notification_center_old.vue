<template>
    <div>
        <el-container class="whole w">
            <my_header></my_header>
            <el-container>
                <el-aside class="slide_menu">
                    <el-menu
                            :default-active="emm"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            :collapse="isCollapse"
                    >
                        <el-menu-item index="1" @click="shortjmp('invi_note')">
                            <i class="el-icon-question"></i>
                            <span slot="title" class="aside first">团队邀请通知</span>
                        </el-menu-item>


                        <el-menu-item index="2" @click="shortjmp('msg_note')">
                            <i class="el-icon-menu"></i>
                            <span slot="title" class="aside">团队消息提醒</span>
                        </el-menu-item>

                        <el-menu-item index="3" @click="shortjmp('remark_note')">
                            <i class="el-icon-s-tools"></i>
                            <span slot="title" class="aside">文档评论通知</span>
                        </el-menu-item>

                        <el-menu-item index="4" @click="zipornot()">
                            <i class="el-icon-s-unfold" v-if="isCollapse"></i>
                            <span slot="title" v-if="isCollapse">光翼展开!</span>
                            <i class="el-icon-s-fold" v-if="!isCollapse"></i>
                            <span slot="title" v-if="!isCollapse">收起</span>
                        </el-menu-item>

                    </el-menu>

                </el-aside>
                <invi_note v-if="which==='invi_note'"></invi_note>
                <msg_note v-else-if="which==='msg_note'"></msg_note>
                <remark_note v-else-if="which==='remark_note'"></remark_note>
            </el-container>
            <el-footer>
                <img src="../assets/footer.png">
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import my_header from "../components/my_header";
    import invi_note from "../components/invi_note";
    import msg_note from "../components/msg_note";
    import remark_note from "../components/remark_note";

    export default {
        components: {
            invi_note,
            msg_note,
            remark_note,
            my_header
        },
        name: "notification_center",
        data() {
            return {
                isCollapse: false,
                emm: '1-1',
                inputbox: '',
                which: 'invi_note',
                islogin: true,
                localStorageName: '',
                localStorageID: '',
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            zipornot() {
                this.isCollapse = !this.isCollapse;
            },
            goBack() {
                this.$router.push({
                    name: 'Page',
                })
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
                this.islogin = false;
                localStorage.removeItem('userID');
                localStorage.removeItem('username');
                this.longjmp("Login");
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
                localStorage.getItem('aaa');
                // this.longjmp("Login");
            }
        }
    };
</script>

<style scoped>

    .whole {
        height: 1500px;
    }

    .w {
        height: 700px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
        min-height: 600px;
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
        margin-left: 30px;
        margin-top: 5px;
        line-height: 30px;
        text-decoration: none !important;
    }

    .el-menu-item {
        font-size: 18px;
        font-weight: 700;
        margin: 42px 20px 60px 0;
    }

    .el-menu-item * {
        color: #555555;
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
        text-decoration: none;
        border-color: transparent;
    }

    .el-link.el-link--default:after, .el-link.el-link--primary.is-underline:hover:after, .el-link.el-link--primary:after {
        border-color: transparent;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        margin-top: 5px;
        border-radius: 4px;
    }

    .delete {
        position: relative;
        text-align: center;
        color: #555555;
        font: bold 24px arial, sans-serif;
        line-height: 36px;
        margin: 0 auto;
        border-radius: 4px;
        min-height: 36px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .box {
        float: left;
        margin: 10px 100px 10px 0;
    }

    .box img {
        display: block;
    }

    .pic {
        padding: 0;
        position: relative;
        margin: 10px 10px;
    }

    .content {
        margin: 5px 50px 10px -10px;
        width: 200px;
        background-color: #ffffff;
    }

    .bg-purple {
        background: #ffffff;
        text-align: center;
        margin-top: 10px;
        font-weight: 600;
        line-height: 18px;
        color: #bababa;

    }

    .el-container .now {
        color: #575757;
    }

    .el-footer {
        padding: 0 0;
    }

    .el-footer img {
        display: block;
        width: 100%;
    }

    .text {
        font-size: 14px;
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

</style>