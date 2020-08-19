<template>
    <div>
        <el-container style="min-height:650px">
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <div v-if="emm==='1-1'" class="grid-content bg-purple now delete">最近使用</div>
                        <div v-if="emm==='1-2'" class="grid-content bg-purple now delete">我创建的</div>
                        <div v-if="emm==='1-3'" class="grid-content bg-purple now delete">收藏文档</div>
                    </el-col>
                </el-row>
                <div v-if="emm==='1-1'">
                    <div v-for="recent in docList.recents" :key="recent.docnum"
                        style="position: relative; width: 150px;float: left; margin: 35px;">
                        <card :doc="recent" :user=localStorageID @collect-event="collectItem"
                            @cancel-event="cancelCollectItem" @remove-event="removeItem">
                        </card>
                    </div>
                </div>
                <div v-else-if="emm==='1-2'">
                    <div v-for="create in docList.creates" :key="create.docnum"
                        style="position: relative; width: 150px;float: left; margin: 35px;">
                        <card :doc="create" :user=localStorageID @collect-event="collectItem"
                            @cancel-event="cancelCollectItem" @remove-event="removeItem"></card>
                    </div>
                </div>
                <div v-else-if="emm==='1-3'">
                    <div v-for="collection in docList.collections" :key="collection.docnum"
                        style="position: relative; width: 150px;float: left; margin: 35px;">
                        <card :doc="collection" :user=localStorageID @collect-event="collectItem"
                            @cancel-event="cancelCollectItem" @remove-event="removeItem">
                        </card>
                    </div>
                </div>

            </el-main>
        </el-container>
    </div>
</template>

<script>
    import card from "@/components/card.vue";
    // import { ParticlesBg } from "particles-bg-vue";
    export default {
        name: 'worktable',
        props: {
            emm: String,
        },
        data() {
            return {
                isCollapse: false,
                localStorageID: 0,
                localStorageName: '',
                docList: {
                    allDocs: [{
                        author: 1,
                        docnum: 1,
                        docname: 'New Document 1',
                        url: '/doc',
                        lasttime: new Date('2020-8-1'),
                        isCollected: true,
                        stat: 0,
                    }, {
                        author: 1,
                        docnum: 2,
                        docname: 'New Document 2',
                        url: '/doc',
                        lasttime: new Date('2020-8-2'),
                        isCollected: false,
                        stat: 0,
                    }, {
                        author: 1,
                        docnum: 3,
                        docname: 'New Document 3',
                        url: '/doc',
                        lasttime: new Date('2020-8-3'),
                        isCollected: true,
                        stat: -1,
                    }, {
                        author: 1,
                        docnum: 4,
                        docname: 'New Document 4',
                        url: '/doc',
                        lasttime: new Date('2020-8-4'),
                        isCollected: true,
                        stat: -1,
                    }, {
                        author: 2,
                        docnum: 5,
                        docname: 'New Document 5',
                        url: '/doc',
                        lasttime: new Date('2020-8-15'),
                        isCollected: true,
                        stat: 0,
                    }, {
                        author: 2,
                        docnum: 6,
                        docname: 'New Document 6',
                        url: '/doc',
                        lasttime: new Date('2020-8-6'),
                        isCollected: false,
                        stat: 0,
                    }, {
                        author: 2,
                        docnum: 7,
                        docname: 'New Document 7',
                        url: '/doc',
                        lasttime: new Date('2020-8-7'),
                        isCollected: false,
                        stat: -1,
                    }, {
                        author: 2,
                        docnum: 8,
                        docname: 'New document8',
                        url: '/doc',
                        lasttime: new Date('2020-8-9'),
                        isCollected: true,
                        stat: -1,
                    }, ],
                    recents: [{
                        author: 1,
                        docnum: 1,
                        docname: 'New Document 1',
                        url: '/doc',
                        lasttime: new Date('2020-8-1'),
                        isCollected: true,
                        stat: 0,
                    }, {
                        author: 1,
                        docnum: 2,
                        docname: 'New Document 2',
                        url: '/doc',
                        lasttime: new Date('2020-8-2'),
                        isCollected: false,
                        stat: 0,
                    }, {
                        author: 1,
                        docnum: 3,
                        docname: 'New Document 3',
                        url: '/doc',
                        lasttime: new Date('2020-8-3'),
                        isCollected: true,
                        stat: -1,
                    }, {
                        author: 1,
                        docnum: 4,
                        docname: 'New Document 4',
                        url: '/doc',
                        lasttime: new Date('2020-8-4'),
                        isCollected: true,
                        stat: -1,
                    }, {
                        author: 2,
                        docnum: 5,
                        docname: 'New Document 5',
                        url: '/doc',
                        lasttime: new Date('2020-8-15'),
                        isCollected: true,
                        stat: 0,
                    }, {
                        author: 2,
                        docnum: 6,
                        docname: 'New Document 6',
                        url: '/doc',
                        lasttime: new Date('2020-8-6'),
                        isCollected: false,
                        stat: 0,
                    }, {
                        author: 2,
                        docnum: 7,
                        docname: 'New Document 7',
                        url: '/doc',
                        lasttime: new Date('2020-8-7'),
                        isCollected: false,
                        stat: -1,
                    }, {
                        author: 2,
                        docnum: 8,
                        docname: 'New document8',
                        url: '/doc',
                        lasttime: new Date('2020-8-9'),
                        isCollected: true,
                        stat: -1,
                    }, ],
                    collections: [{
                        author: 1,
                        docnum: 1,
                        docname: 'New Document 1',
                        url: '/doc',
                        lasttime: new Date('2020-8-1'),
                        isCollected: true,
                        stat: 0,
                    }, {
                        author: 1,
                        docnum: 3,
                        docname: 'New Document 3',
                        url: '/doc',
                        lasttime: new Date('2020-8-3'),
                        isCollected: true,
                        stat: -1,
                    }, {
                        author: 1,
                        docnum: 4,
                        docname: 'New Document 4',
                        url: '/doc',
                        lasttime: new Date('2020-8-4'),
                        isCollected: true,
                        stat: -1,
                    }, {
                        author: 2,
                        docnum: 5,
                        docname: 'New Document 5',
                        url: '/doc',
                        lasttime: new Date('2020-8-1'),
                        isCollected: true,
                        stat: 0,
                    }, {
                        author: 2,
                        docnum: 8,
                        docname: 'New Document 8',
                        url: '/doc',
                        lasttime: new Date('2020-8-4'),
                        isCollected: true,
                        stat: -1,
                    }, ],
                    creates: [{
                        author: 2,
                        docnum: 5,
                        docname: 'New Document 5',
                        url: '/doc',
                        lasttime: new Date('2020-8-1'),
                        isCollected: true,
                        stat: 0,
                    }, {
                        author: 2,
                        docnum: 6,
                        docname: 'New Document 6',
                        url: '/doc',
                        lasttime: new Date('2020-8-2'),
                        isCollected: false,
                        stat: 0,
                    }, {
                        author: 2,
                        docnum: 7,
                        docname: 'New Document 7',
                        url: '/doc',
                        lasttime: new Date('2020-8-3'),
                        isCollected: false,
                        stat: -1,
                    }, {
                        author: 2,
                        docnum: 8,
                        docname: 'New Document 8',
                        url: '/doc',
                        lasttime: new Date('2020-8-4'),
                        isCollected: true,
                        stat: -1,
                    }, ],
                }
            };
        },
        components: {
            card
        },
        methods: {
            removeItem(docnum) {
                var index1, index2, index3;
                var array = this.docList.recents;
                array.forEach(document => {
                    if (document.docnum === docnum) {
                        index1 = array.indexOf(document)
                    }
                });
                if (index1 > -1)
                    array.splice(index1, 1);
                var create = this.docList.creates;
                create.forEach(document => {
                    if (document.docnum === docnum) {
                        index2 = create.indexOf(document)
                    }
                });
                if (index2 > -1)
                    create.splice(index2, 1);
                var collection = this.docList.collections;
                collection.forEach(document => {
                    if (document.docnum === docnum) {
                        index3 = collection.indexOf(document)
                    }
                });
                if (index2 > -1)
                    collection.splice(index3, 1);
            },
            collectItem(docnum) {
                var array = this.docList.allDocs;
                var collections = this.docList.collections;
                array.forEach(document => {
                    if (document.docnum === docnum) {
                        document.isCollected = true;
                        collections.push(document);
                    }
                });
                // alert('收藏成功！');
            },
            cancelCollectItem(docnum) {
                var index = -1;
                var array = this.docList.collections;
                array.forEach(document => {
                    if (document.docnum === docnum) {
                        document.isCollected = false;
                        index = array.indexOf(document)
                    }
                });
                if (index > -1)
                    array.splice(index, 1);
                // alert('取消收藏成功！');
            },
        },
        created() {
            this.localStorageID = localStorage.getItem('userID');
            this.localStorageName = localStorage.getItem('username');
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