<template>
    <div>
        <el-container style="min-height:650px; width:100%">
            <el-main style="width:100%">

                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-button class="grid-content bg-purple now delete">团队详情</el-button>
                    </el-col>
                    <el-col :span="8">
                        <group-intro :groupID="groupid" :groupName="groupname" :groupIntroduction="groupIntroduction"
                            :groupMemberNumber="groupMemberNumber" class="intro"></group-intro>
                        <dismiss :groupID="groupid" :groupName="groupname" :power="localStorageID == leaderID"
                            class="dismiss"></dismiss>
                        <Gexit :groupID="groupid" class="exit" :power="localStorageID != leaderID"></Gexit>
                    </el-col>
                    <el-button style="margin-top: 14px;" @click="createTeamDoc">创建团队文件</el-button>
                    <el-button style="margin-top: 14px;margin-left: 50px;" @click="showImport">导入团队文档</el-button>
                </el-row>
                <div v-for="groupdoc in docList.groupdocs" :key="groupdoc.docname"
                    style="width: 180px;float: left; margin: 35px;">
                    <card :doc="groupdoc" :user=localStorageID></card>
                </div>
            </el-main>

            <el-dialog title="导入团队文档" :visible.sync="isShow" width="50%">
                <div style="width: 150px;display: inline-block; margin: 35px;" v-for="create in docList.creates"
                    :key="create.docnum">
                    <el-card>
                        <i style="font-size: 90px" class="el-icon-document"></i>
                        <el-button type="text" @click="importDoc(create.docnum)">{{create.docname}}</el-button>
                        <div style="font-size: 7px; color: gray">{{dateFormat(create.lasttime)}}</div>
                        <!-- <el-button type="text" @click="importDoc(create.docnum)">{{create.docname}}</el-button> -->
                    </el-card>

                </div>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
    import card from "./card_guo";
    import groupIntro from "./groupIntro";
    import dismiss from "./dismiss";
    import Gexit from "./Gexit";
    // import { ParticlesBg } from "particles-bg-vue";
    export default {
        name: 'team_inside',
        props: {
            group: Array
        },
        components: {
            card,
            groupIntro,
            dismiss,
            Gexit
        },
        data() {
            return {
                isShow: false,
                groupid: '',
                groupname: '',
                groupIntroduction: '',
                groupMemberNumber: '',
                isCollapse: false,
                localStorageID: '',
                leaderID: '',
                docList: {
                    groupdocs: [],
                    created: [],
                }
            };
        },
        methods: {
            dateFormat: function (time) {
                var date = new Date(time);
                var year = date.getFullYear();
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                // 拼接
                return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            },
            createTeamDoc() {
                localStorage.setItem('groupid', this.groupid);
                this.$router.push({
                    name: 'Models',
                })
            },
            showImport() {

                this.isShow = true;
            },
            importDoc(docnum) {
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/autho/change_owner_b/',
                    data: {
                        id: docnum,
                        groupnum: this.groupid
                    }
                }).then(res => {
                    if (res.data == 1) {
                        alert('组内文件导入成功');
                        this.isShow = false;
                    } else {
                        alert('组内文件导入失败');
                    }
                }).catch(() => {
                    alert('网络问题，组内文件导入失败');
                })
            }
        },
        created() {
            this.groupid = this.group[1];
            this.groupname = this.group[0];
            this.groupMemberNumber = this.group[2];
            this.groupIntroduction = this.group[3];
            console.log(this.group);
            this.$axios({
                method: 'post',
                url: 'http://39.97.122.202/doc/get_group_docs/',
                data: {
                    groupnum: this.groupid,
                    id: this.localStorageID
                }
            }).then(
                response => {
                    console.log("文档数据"+response.data);
                    this.docList.groupdocs = response.data;
                    console.log(this.docList.groupdocs);
                    if (this.docList.groupdocs == null)
                        console.log("no docs");

                },
                err => {
                    console.log(err);
                }).catch((error) => {
                console.log(error);
            });
            this.$axios({
                method: 'post',
                url: 'http://39.97.122.202/group/get_leader/',
                data: {
                    groupnum: this.groupid
                }
            }).then(
                response => {
                    this.leaderID = response.data;
                    console.log(this.leaderID);
                },
                err => {
                    console.log(err);
                }).catch((error) => {
                console.log(error);
            });
            this.localStorageID = localStorage.getItem('userID');
            var id = localStorage.getItem('userID');
            var createurl = 'http://39.97.122.202/Table/myfiles/' + id + '/';
            this.$axios({
                method: 'post',
                url: createurl, //此处不传data
            }).then(
                response => {
                    this.docList.creates = response.data;
                    if (response.data == null)
                        this.docList.creates = [];
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
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 600px;
    }

    .shit {
        font-size: 13px !important;
    }

    /*头像的css*/
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

    /*团队详情标题的css*/
    .delete {
        position: relative;
        text-align: center;
        color: #555555;
        font: bold 24px arial, sans-serif;
        line-height: 36px;
        margin: 0 25px 0 -110px;
        border-radius: 4px;
        min-height: 36px;
        border: none;
        width: 40px;
    }

    /* 新组件的加入:团队概况、解散团队和成员管理 */
    .intro {
        margin: 10px 10px -60px 20px;
        width: 100px;
    }

    .dismiss {
        margin: 21px 10px -40px 115px;
        width: 200px;
    }

    .exit {
        margin: 0 10px -20px 210px;
        width: 300px;
    }

    .cooperate {
        margin: 20px 10px 0 50px;
        width: 300px;
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
        background: transparent;
        text-align: center;
        margin-top: 10px;
        font-weight: 600;
        line-height: 18px;
        color: #bababa;
        width: 300px;
        margin-left: -65px;
    }

    .el-container .now {
        color: #575757;
    }

    /*底部的信息栏*/
    .el-footer {
        padding: 0 0;
    }

    .el-footer img {
        display: block;
        width: 100%;
    }

    /*版心*/
    .whole {
        height: 1500px;
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