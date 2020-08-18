<template>
    <el-container>
        <el-header class="head">
            <el-row>
                <el-col :span="4">
                    <div style="margin-right:25px">
                        <img src="../assets/logo.png" alt="logo" @click="goBack()">
                    </div>

                </el-col>
                <el-col :span="1">
                    <div class="grid-content"></div>
                </el-col>
                <el-col :span="6">
                    <div style="margin-top:3px">
                        <el-input clearable placeholder="随便找点什么吧" prefix-icon="el-icon-search" v-model="inputBox">
                        </el-input>
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
                                                   @click="longjmp('Notification_center_old')">
                                            查看系统通知
                                        </el-button>
                                    </el-badge>
                                </div>

                                <div v-else>
                                    <el-button index="0" class="item more_info1"
                                               @click="longjmp('Notification_center_old')">
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
    </el-container>
</template>

<script>
    export default {
        name: 'Page',
        data() {
            return {
                inputBox: '',
                is_login: true,
                is_active: false,
                localStorageName: '',
                localStorageID: '',
                msgList: [],
            };
        },
        methods: {
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
                this.is_login = false;
                localStorage.removeItem('userID');
                localStorage.removeItem('username');
                this.longjmp("Login");
            },
            goBack() {
                this.$router.push({
                    name: 'Page',
                })
            },
        },
        created() {
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

    .whole {
        height: 1500px;
        background-color: #f2f2f2;
    }
    .el-container {
        position: relative;
    }
    .el-divider--horizontal {
        margin-bottom: 1px !important;
        margin-top: 0 !important;
    }

    .el-link--default {
        color: transparent;
        font-size: 17px;
        border-color: transparent;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        margin-top: 5px;
        border-radius: 4px;
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
</style>
