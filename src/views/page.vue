<template>
    <div>
        <el-container class="whole w">
            <my_header_search index="0" @keyup.enter="shortjmp('0')" @event3="goresult($event)"></my_header_search>
            <el-container>
                <el-aside>
                    <el-menu :default-active="emm" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                        :collapse="isCollapse">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">工作台</span>
                            </template>

                            <el-menu-item-group>
                                <el-menu-item index="1-1" class="shit" @click="shortjmp('1-1')">最近浏览
                                </el-menu-item>
                                <el-menu-item index="1-2" class="shit" @click="shortjmp('1-2')">我的文档
                                </el-menu-item>
                                <el-menu-item index="1-3" class="shit" @click="shortjmp('1-3')">我的收藏
                                </el-menu-item>
                                <el-menu-item index="1-4" class="shit" @click="longjmp('Models')">创建文档</el-menu-item>
                            </el-menu-item-group>

                        </el-submenu>


                        <el-menu-item index="2" @click="shortjmp('2')">
                            <i class="el-icon-menu"></i>
                            <span slot="title">团队空间</span>
                        </el-menu-item>

                        <el-menu-item index="3" @click="shortjmp('3')">
                            <i class="el-icon-delete-solid"></i>
                            <span slot="title">回收站</span>
                        </el-menu-item>


                        <el-menu-item index="4" @click="longjmp('Help')">
                            <i class="el-icon-s-tools"></i>
                            <span slot="title">帮助中心</span>
                        </el-menu-item>

                        <el-menu-item index="5" @click="zipornot()">
                            <i class="el-icon-s-unfold" v-if="isCollapse"></i>
                            <span slot="title" v-if="isCollapse">光翼展开!</span>
                            <i class="el-icon-s-fold" v-if="!isCollapse"></i>
                            <span slot="title" v-if="!isCollapse">收起</span>
                        </el-menu-item>
                    </el-menu>


                </el-aside>

                <!-- 组件部分 -->
                <recentFiles v-if="which==='recentFiles'"></recentFiles>
                <search_result v-else-if="which==='search_result'" :search="search"></search_result>
                <createdFiles v-else-if="which==='createdFiles'"></createdFiles>
                <collectedFiles v-else-if="which==='collectedFiles'"></collectedFiles>
                <dele v-else-if="which==='dele'"></dele>
                <Gtable v-else-if="which==='Gtable'" @event1="tinside(arguments)"></Gtable>
                <Tinside :group="group" v-else-if="which==='Tinside'"></Tinside>

            </el-container>
            <el-footer>
                <img src="../assets/footer.png">
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    // import { ParticlesBg } from "particles-bg-vue";
    import my_header_search from "../components/my_header_search";
    import search_result from "../components/search_result";
    import recentFiles from "@/components/recentFiles.vue";
    import collectedFiles from "@/components/collectedFiles.vue";
    import createdFiles from "@/components/createdFiles.vue";
    import dele from "@/components/dele.vue";
    import Gtable from "@/components/Gtable.vue";
    import Tinside from "@/components/team_inside.vue";
    // import view_remark from "../components/view_remark";

    export default {
        name: 'Page',
        data() {
            return {
                isCollapse: false,
                emm: '1-1',
                inputbox: '',
                which: 'recentFiles',
                islogin: true,
                is_active: false,
                localStorageName: '',
                localStorageID: '',
                msgList: [],
                group: [],
                search: '',
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
            shortjmp(index) {
                if (index === '0') {
                    this.which = 'search_result';
                } else if (index === '1-1') {
                    this.which = 'recentFiles';
                } else if (index === '1-2') {
                    this.which = 'createdFiles';
                } else if (index === '1-3') {
                    this.which = 'collectedFiles';
                } else if (index === '2') {
                    this.which = 'Gtable';
                } else if (index === '3') {
                    this.which = 'dele';
                }
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
                this.longjmp("Login");
            },
            goresult(search) {
                this.search = search;
                this.shortjmp('0');
            },
            tinside(array) {
                this.group[0] = array[0];
                this.group[1] = array[1];
                this.group[2] = array[2];
                this.group[3] = array[3];
                this.which = 'Tinside';
            }
        },
        components: {
            my_header_search,
            search_result,
            recentFiles,
            collectedFiles,
            createdFiles,
            dele,
            Gtable,
            Tinside
        },
        created() {
            if (localStorage.getItem('groupid') != null)
                localStorage.removeItem('groupid');
            var id = localStorage.getItem('userID');
            if (id == null)
                this.longjmp('Login');
            this.localStorageID = localStorage.getItem('userID');
            this.localStorageName = localStorage.getItem('username');
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
        }
    };
</script>

<style scoped>
    /*版心的设计*/
    .whole {
        height: 1500px;
    }

    .w {
        height: 900px;
    }

    .container {
        background-color: #f2f2f2;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
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
    .el-popover.av {
        position: absolute;
        background: #FFF;
        min-width: 100px;
        height: 250px;
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

    .el-badge__content.is-fixed {
        position: absolute;
        top: 3px;
        right: 18px;

        transform: translateY(-50%) translateX(100%);
    }
</style>