<template>
    <el-container style="min-height:650px">

        <el-main style="position: relative;">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="grid-content bg-purple now delete">回收站</div>
                </el-col>
            </el-row>
            <el-button class="posi"  @click="isShow3 = true">清空回收站</el-button>
            <div class="debox" v-for="deleteFile in docList.deleteFiles" :key="deleteFile.docnum">
                <el-card :body-style="{ padding: '0px', height:'180px'}" shadow="hover"
                    style="position: relative;border-radius:10px;border:1px rgb(199, 199, 204) solid;height: 200px">
                    <i class="el-icon-document-delete deicon"></i>
<!--                    <div class="defont">{{ deleteFile.docname }}</div>-->
                    <div class="defont">{{ deleteFile.docname }}{{ deleteFile.docintro }}</div>
                    <el-row>
                        <el-button class="debutton el-icon-document-add"
                            @click="operateDocnum=deleteFile.docnum;isShow1 = true" size="small">&nbsp;还原</el-button>

                        <el-button type="danger" class="debutton el-icon-delete-solid"
                            @click="operateDocnum=deleteFile.docnum;isShow2 = true" size="small">&nbsp;删除</el-button>
                    </el-row>

                </el-card>

            </div>
            <el-dialog title="提示" :visible.sync="isShow1" width="30%">
                <span>你确认还原此文件吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isShow1 = false">取 消</el-button>
                    <el-button type="primary" @click="recoverItem(operateDocnum)">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="isShow2" width="30%">
                <span>你确认彻底删除此文件吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isShow2 = false">取 消</el-button>
                    <el-button type="primary" @click="deleteItem(operateDocnum)">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="isShow3" width="30%">
                <span>你确认彻底清空回收站吗</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isShow3 = false">取 消</el-button>
                    <el-button type="primary" @click="deleteAllItems">确 定</el-button>
                </span>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'dele',
        data() {
            return {
                isShow1: false,
                isShow2: false,
                isShow3: false,
                operateDocnum: 0,
                docList: {
                    deleteFiles: [
                    //     author: 1,
                    //     docnum: 1,
                    //     docname: 'New Document 1',
                    //     docintro: 'Donald Trump Secret 1',
                    //     lasttime: new Date('2020-8-1'),
                    //     deletetime: new Date('2020-8-6'),
                    //     isCollected: false,
                    // }, {
                    //     author: 1,
                    //     docnum: 2,
                    //     docname: 'New Document 2',
                    //     docintro: 'Donald Trump Secret 2',
                    //     lasttime: new Date('2020-8-2'),
                    //     deletetime: new Date('2020-8-6'),
                    //     isCollected: false,
                    // }, {
                    //     author: 1,
                    //     docnum: 3,
                    //     docname: 'New Document 3',
                    //     docintro: 'Donald Trump Secret 3',
                    //     lasttime: new Date('2020-8-3'),
                    //     deletetime: new Date('2020-8-6'),
                    //     isCollected: false,
                    // }, {
                    //     author: 1,
                    //     docnum: 4,
                    //     docname: 'New Document 4',
                    //     docintro: 'Donald Trump Secret 4',
                    //     lasttime: new Date('2020-8-4'),
                    //     deletetime: new Date('2020-8-6'),
                    //     isCollected: false,
                    // }, {
                    //     author: 9,
                    //     docnum: 5,
                    //     docname: 'New Document 5',
                    //     docintro: 'Donald Trump Secret 5',
                    //     lasttime: new Date('2020-8-15'),
                    //     deletetime: new Date('2020-8-6'),
                    //     isCollected: false,
                    // }, {
                    //     author: 9,
                    //     docnum: 6,
                    //     docname: 'New Document 6',
                    //     docintro: 'Donald Trump Secret 6',
                    //     lasttime: new Date('2020-8-6'),
                    //     deletetime: new Date('2020-8-6'),
                    //     isCollected: false,
                    // }, {
                    //     author: 9,
                    //     docnum: 7,
                    //     docname: 'New Document 7',
                    //     docintro: 'Donald Trump Secret 7',
                    //     lasttime: new Date('2020-8-7'),
                    //     deletetime: new Date('2020-8-6'),
                    //     isCollected: false,
                    // }, {
                    //     author: 9,
                    //     docnum: 8,
                    //     docname: 'New document8',
                    //     docintro: 'Donald Trump Secret 8',
                    //     lasttime: new Date('2020-8-9'),
                    //     deletetime: new Date('2020-8-6'),
                    //     isCollected: false,
                     ],
                }
            }
        },
        methods: {
            recoverItem(docnum) {
                var index;
                var deleteFile = this.docList.deleteFiles;
                deleteFile.forEach(document => {
                    if (document.docnum === docnum) {
                        index = deleteFile.indexOf(document)
                    }
                });
                if (index > -1)
                    deleteFile.splice(index, 1);
                var deleteurl = 'http://39.97.122.202/Table/recover_file/';
                this.$axios({
                    method: 'post',
                    url: deleteurl,
                    data: {
                        file_id: docnum,
                    }
                }).then(
                    res => {
                        if (res.data === "success") {
                            console.log("还原成功");
                        } else {
                            console.log("还原失败");
                        }
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
                this.isShow1 = false;
            },
            deleteItem(docnum) {
                var index;
                var deleteFile = this.docList.deleteFiles;
                deleteFile.forEach(document => {
                    if (document.docnum === docnum) {
                        index = deleteFile.indexOf(document)
                    }
                });
                if (index > -1)
                    deleteFile.splice(index, 1);
                var deleteurl = 'http://39.97.122.202/Table/delete_bin_file/';
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
                this.isShow2 = false;
            },
            deleteAllItems() {
                var deleteFile = this.docList.deleteFiles;
                var array = [];
                deleteFile.forEach(document => {
                    array.push(document.docnum);
                });
                while (deleteFile.length > 0)
                    deleteFile.pop();
                var deleteAllUrl = 'http://39.97.122.202/Table/delete_bin_all/';
                this.$axios({
                    method: 'post',
                    url: deleteAllUrl,
                    data: {
                        array: array,
                    }
                }).then(
                    res => {
                        if (res.data === "success") {
                            console.log("清空成功");
                        } else {
                            console.log("清空失败");
                        }
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
                this.isShow3 = false;
            },
        },
        created() {
            var id = localStorage.getItem('userID');
            if (id == null)
                this.longjmp('Login');
            this.localStorageID = localStorage.getItem('userID');
            this.localStorageName = localStorage.getItem('username');
            var deleteurl = 'http://39.97.122.202/Table/bin/' + id + '/';
            this.$axios({
                method: 'post',
                url: deleteurl, //此处不传data
            }).then(
                response => {
                    this.docList.deleteFiles = response.data;
                    if (response.data == null)
                        this.docList.deleteFiles = [];
                },
                err => {
                    console.log(err);
                }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>

<style scoped>
    .delete {
        position: relative;
        text-align: center;
        color: #555555;
        font: bold 24px arial, sans-serif;
        line-height: 36px;
        margin: 15px 25px 10px -110px;
        border-radius: 4px;
        min-height: 36px;
        border: none;
        width: 40px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .content {
        margin: 5px 50px 10px -45px;
        width: 200px;
        height: 20px;
        background-color: #ffffff;
    }

    .bg-purple {
        background: transparent;
        text-align: center;
        margin-top: 15px;
        margin-right: 250px;
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

    .debox {
        float: left;
        margin: 20px 20px 20px 50px;
        width: 200px;
        height: 200px;
    }

    .deicon {
        font-size: 60px;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .decard {
        width: 300px;
        height: 200px;
    }

    .debutton {
        margin: 10px;
    }

    .defont {
        color: #555555;
        font: normal 16px arial, sans-serif;
        height: 40px;
        line-height: 40px;
    }

    .posi {
        position: absolute;
        right: 180px;
        top: 10px;
        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-weight: 700;
        border: 1px solid #cccccc;
        margin-top: 10px;
        margin-right: -40px;
        background-color: #fefefe;
        color: #676b6f;
    }
</style>
