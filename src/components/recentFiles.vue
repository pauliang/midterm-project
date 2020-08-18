<template>
    <div>
        <el-container style="min-height:650px">
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div class="grid-content bg-purple now delete">最近使用</div>
                    </el-col>
                </el-row>
                <div v-for="recent in docList.recents" :key="recent.docnum"
                    style="position: relative; width: 150px;float: left; margin: 35px;">
                    <card :doc="recent" :user="localStorageID" @collect-event="collectItem"
                        @cancel-event="cancelCollectItem" @remove-event="removeItem">
                    </card>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import card from "@/components/card_guo.vue";
    // import { ParticlesBg } from "particles-bg-vue";
    export default {
        name: 'recentFiles',
        // props: {
        //     emm: String,
        // },
        data() {
            return {
                isCollapse: false,
                localStorageID: 0,
                localStorageName: '',
                docList: {
                    recents: [
                        //     author: 1,
                        //     docnum: 1,
                        //     docname: 'New Document 1',
                        //     lasttime: new Date('2020-8-1'),
                        //     isCollected: true,
                        //     stat: 0,
                        // }, {
                        //     author: 1,
                        //     docnum: 2,
                        //     docname: 'New Document 2',
                        //     lasttime: new Date('2020-8-2'),
                        //     isCollected: false,
                        //     stat: 0,
                        // }, {
                        //     author: 1,
                        //     docnum: 3,
                        //     docname: 'New Document 3',
                        //     lasttime: new Date('2020-8-3'),
                        //     isCollected: true,
                        //     stat: -1,
                        // }, {
                        //     author: 1,
                        //     docnum: 4,
                        //     docname: 'New Document 4',
                        //     lasttime: new Date('2020-8-4'),
                        //     isCollected: true,
                        //     stat: -1,
                        // }, {
                        //     author: 9,
                        //     docnum: 5,
                        //     docname: 'New Document 5',
                        //     lasttime: new Date('2020-8-15'),
                        //     isCollected: true,
                        //     stat: 0,
                        // }, {
                        //     author: 9,
                        //     docnum: 6,
                        //     docname: 'New Document 6',
                        //     lasttime: new Date('2020-8-6'),
                        //     isCollected: false,
                        //     stat: 0,
                        // }, {
                        //     author: 9,
                        //     docnum: 7,
                        //     docname: 'New Document 7',
                        //     lasttime: new Date('2020-8-7'),
                        //     isCollected: false,
                        //     stat: -1,
                        // }, {
                        //     author: 9,
                        //     docnum: 8,
                        //     docname: 'New document8',
                        //     lasttime: new Date('2020-8-9'),
                        //     isCollected: true,
                        //     stat: -1,
                    ],

                }
            };
        },
        components: {
            card
        },
        methods: {
            removeItem(docnum) {
                var index;
                var array = this.docList.recents;
                array.forEach(document => {
                    if (document.docnum === docnum) {
                        index = array.indexOf(document);
                    }
                });
                if (index > -1)
                    array.splice(index, 1);
                var deleteurl = 'http://39.97.122.202/Table/delete_file/';
                this.$axios({
                    method: 'post',
                    url: deleteurl,
                    data: {
                        file_id: docnum,
                    }
                }).then(
                    res => {
                        if (res.data === "success") {
                            console.log("删除成功");
                        } else {
                            console.log("删除失败");
                        }
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            },
            collectItem(docnum) {
                var array = this.docList.recents;
                array.forEach(document => {
                    if (document.docnum === docnum) {
                        document.isCollected = true;
                    }
                });
                var collecturl = 'http://39.97.122.202/Table/collect_file/';
                this.$axios({
                    method: 'post',
                    url: collecturl,
                    data: {
                        id: this.localStorageID,
                        file_id: docnum,
                    }
                }).then(
                    res => {
                        if (res.data === "success") {
                            console.log("收藏成功");
                        } else {
                            console.log("收藏失败");
                        }
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            },
            cancelCollectItem(docnum) {
                var array = this.docList.recents;
                array.forEach(document => {
                    if (document.docnum === docnum) {
                        document.isCollected = false;
                    }
                });
                var cancelCollectUrl = 'http://39.97.122.202/Table/not_collect_file/';
                this.$axios({
                    method: 'post',
                    url: cancelCollectUrl,
                    data: {
                        id: this.localStorageID,
                        file_id: docnum,
                    }
                }).then(
                    res => {
                        if (res.data === "success") {
                            console.log("取消收藏成功");
                        } else {
                            console.log("取消收藏失败");
                        }
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            },
        },
        created() {
            var id = localStorage.getItem('userID');
            if (id == null)
                this.longjmp('Login');
            this.localStorageID = localStorage.getItem('userID');
            this.localStorageName = localStorage.getItem('username');
            var recenturl = 'http://39.97.122.202/Table/recent/' + id + '/';
            this.$axios({
                method: 'post',
                url: recenturl, //此处不传data
            }).then(
                response => {
                    this.docList.recents = response.data;
                    if (this.docList.recents == null)
                        this.docList.recents = [];
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
        margin: 0 25px 0 -110px;
        border-radius: 4px;
        min-height: 36px;
        border: none;
        width: 40px;
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
        background: transparent;
        text-align: center;
        margin-top: 10px;
        font-weight: 600;
        line-height: 18px;
        color: #bababa;
        width: 400px;
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