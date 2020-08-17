<template>
    <el-container>
        <el-main class="main">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="titles">
                <el-tab-pane label="团队邀请通知" name="first" class="grid-content bg-purple delete " >
                  <el-row  v-for="invite in teamInvite" :key="invite.name">
                    <el-col class="cardbox">
                      <new_message :name="invite.name" :url="invite.url" @event2="goIntro()" class="message"></new_message>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                  <el-tab-pane label="团队消息提醒" name="second" class="grid-content bg-purple delete">
                    <el-row v-for="info in teamInfo" :key="info.name">
                      <el-col class="cardbox">
                        <new_message :name="info.name" @event2="goIntro()" class="message"></new_message>
                      </el-col>
                    </el-row>

                  </el-tab-pane>
                  <el-tab-pane label="文档评论通知" name="third" class="grid-content bg-purple delete">
                    <el-row v-for="remark in remarkList" :key="remark.name">
                      <el-col class="cardbox">
                        <new_message :name="remark.name" :url="remark.url" @event2="goIntro()" class="message"></new_message>
                      </el-col>
                    </el-row>

                  </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
    import new_message from "./new_message";

    export default {
        name: 'view_remark',
        components: {
            new_message
        },
        data() {
            return {
                activeName: 'first',
                teamInvite: [{
                    name: '通知：团队A邀请消息',
                    url: '点击查看详情'
                }, {
                    name: '通知：团队B邀请消息',
                    url: '点击查看详情'
                }, {
                    name: '通知：团队C邀请消息',
                    url: '点击查看详情'
                }],
                teamInfo: [{
                    name: '通知：您已成功加入团队A',
                }, {
                    name: '通知：您已成功退出团队B',
                }, {
                    name: '通知：您已被团队C踢出去',
                }],
                remarkList: [{
                    name: '通知：您的好友A给您的文章Article留言',
                    url: '点击查看详情'
                }, {
                    name: '通知：您的好友B给您的文章Article留言',
                    url: '点击查看详情'
                }, {
                    name: '通知：您的好友C给您的文章Article留言',
                    url: '点击查看详情'
                }],
            };
        },
        methods: {
            goBoard(name) {
                this.$router.push({
                    name: 'Model1',
                    params: {
                        id: name
                    }
                })
            },
            goIntro() {
                this.$emit('event1', '2+')
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        props: {
            choice: Number,
            msg: String
        },
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 600px;
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

    li {
        list-style: none;
        display: inline-block;
    }

    .main .titles {
        margin-left: 0;
        margin-top: 10px;
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
        text-align: center;
        border: 1px solid #f6f6f6;
        width: 816px;
        height: 1172px;
        background-color: #fff;
    }

    .introduce .intro1 {
        font-size: 12px;
        color: #a5a5a5;
        -webkit-font-smoothing: antialiased;
    }

    .introduce .intro2 {
        fill: #4a5056 !important;
    }

    .main {
        position: relative;
        height: 800px;
    }

    .bg-purple {
        background: transparent;
        text-align: center;
        font-size: 20px;
        line-height: 10px;
        margin-right: 100px;
        margin-bottom: 30px;
        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: #4d4d4d;
        font-weight: 400;
        border: none;
    }

    .el-footer img {
        display: block;
        width: 100%;
    }

    .cardtxt {
        text-align: center;
    }
    .cardbox {
        width: 200px;
    }
</style>
<style>
    .new_message {
        margin-right: 50px;
    }
    .titles .el-tabs__item {
        padding: 0 20px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-size: 20px;
        font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-weight: 400;
        color: #303133;
        position: relative;
    }
</style>