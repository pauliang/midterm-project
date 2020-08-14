<template>
    <div>
        <el-container style="min-height:650px">
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="4">
                        <el-button class="grid-content bg-purple now delete">最近使用</el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button class="grid-content bg-purple delete">我创建的</el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button class="grid-content bg-purple delete">收藏文档</el-button>
                    </el-col>
                </el-row>
                <div v-for="domain in docList.domains" :key="domain.docname"
                    style="width: 150px;float: left; margin: 35px;">
                    <card :docname="domain.docname" :url="domain.url">
                    </card>
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
        data() {
            return {
                isCollapse: false,
                emm: '1-1',
                docList: {
                    domains: [{
                        docname: 'New Document 1',
                        url: '/doc'
                    }, {
                        docname: 'New Document 2',
                        url: '/doc'
                    }, {
                        docname: 'New Document 3',
                        url: '/doc'
                    }, {
                        docname: 'New Document 4',
                        url: '/doc'
                    }, {
                        docname: 'New Document 5',
                        url: '/doc'
                    }, {
                        docname: 'New Document 6',
                        url: '/doc'
                    }, {
                        docname: 'New Document 7',
                        url: '/doc'
                    }, {
                        docname: 'New document8',
                        url: '/doc'
                    }, ],
                }
            };
        },
        components: {
            card
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