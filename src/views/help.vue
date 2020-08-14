<template>
    <div>
<!--        <particles-bg type="cobweb" :bg="true" />-->
        <el-container class="whole">

            <el-header class="head">

                <el-row>
                    <el-col :span="4" >
                        <div style="margin-right:25px">
                            <img src="../assets/logo.png" >
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
                            <el-link href="https://element.eleme.io" target="_blank" class="wel_text">欢迎您使用金石文档！</el-link>
                        </el-col>
                        <el-col :span="6" class="avator">
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </el-col>
                    </el-col>
                </el-row>

            </el-header>

            <el-divider/>


            <el-divider/>

            <el-container>
                <el-aside class="slide_menu">
                    <el-menu
                            :default-active="emm"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            :collapse="isCollapse"
                    >
                        <el-menu-item index="1" @click="shortjmp('common_help')">
                            <i class="el-icon-question"></i>
                            <span slot="title" class="aside first">常见问题</span>
                        </el-menu-item>


                        <el-menu-item index="2" @click="shortjmp('file_help')">
                            <i class="el-icon-menu"></i>
                            <span slot="title" class="aside">文档问题</span>
                        </el-menu-item>

                        <el-menu-item index="3" @click="shortjmp('setting_help')">
                            <i class="el-icon-s-tools"></i>
                            <span slot="title" class="aside">权限问题</span>
                        </el-menu-item>


                        <el-menu-item index="4" @click="shortjmp('team_help')">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title" class="aside">团队问题</span>
                        </el-menu-item>

                        <el-menu-item index="5" @click="zipornot()">
                            <i class="el-icon-s-unfold" v-if="isCollapse" ></i>
                            <span slot="title" v-if="isCollapse">光翼展开!</span>
                            <i class="el-icon-s-fold" v-if="!isCollapse" ></i>
                            <span slot="title" v-if="!isCollapse">收起</span>
                        </el-menu-item>

                    </el-menu>

                </el-aside>

                <common_help v-if="which==='common_help'"></common_help>
                <file_help v-else-if="which==='file_help'"></file_help>
                <setting_help v-else-if="which==='setting_help'"></setting_help>
                <team_help v-else-if="which==='team_help'"></team_help>
            </el-container>
            <el-footer>
                <img src="../assets/footer.png" >
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    // import { ParticlesBg } from "particles-bg-vue";
    import common_help from "@/components/common_help.vue";
    import file_help from "@/components/file_help.vue";
    import setting_help from "@/components/setting_help.vue";
    import team_help from "@/components/team_help.vue";

    export default {
        components: {
            // ParticlesBg
            common_help,
            file_help,
            setting_help,
            team_help,
        },
        name: "help",
        data() {
            return {
                isCollapse: false,
                emm:'1-1',
                inputbox:'',
                which:'help',

            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            zipornot()
            {
                this.isCollapse=!this.isCollapse;
            },
            shortjmp(which){
                this.which = which
            },
            longjmp(name){
                this.$router.push({
                    name:name,
                })
            },
        }
    };
</script>

<style scoped>

    .whole {
        position: relative;
        height: 1500px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 280px;
        min-height: 600px;
    }
    .shit{
        font-size:13px !important;
    }
    .head{
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
        font-family: "KaiTi","Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
        color:#fbfcfe;
        float: right;
        margin-right: 20px;
        margin-top: 5px;
        line-height: 30px;
        text-decoration: none!important;
    }
    .head .avator {
        position: relative;
        width: 150px;
        height: 40px;
        float: right;
        margin-right: 100px;
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
    .el-divider--horizontal{
        margin-bottom: 1px !important;
        margin-top: 0 !important;
    }
    .el-link--default{
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
        margin-top:5px;
        border-radius: 4px;
    }
    .delete {
        position: relative;
        text-align: center;
        color: #555555;
        font: bold 24px arial,sans-serif ;
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
        width: 240px;
        height: 280px;
        margin: -4px 80px 0 0;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
    }

    .more_info {
        display: block;
        color: #409eff;
        margin: 0 auto;
    }

    .logout {
        display: block;
        color: #c81623;
        margin: 45px auto 0;
    }

</style>