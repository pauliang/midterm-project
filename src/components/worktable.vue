<template>
    <div>
        <el-container style="min-height:650px">
            <el-main>
                <el-row :gutter="20">
                    <el-col>
                        <div class="grid-content bg-purple now delete">最近使用</div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <div class="grid-content bg-purple delete">我创建的</div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <div class="grid-content bg-purple delete">收藏文档</div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    // import { ParticlesBg } from "particles-bg-vue";
    export default {
        name: 'worktable',
        data() {
            return {
                isCollapse: false,
                emm:'1-1',
            };
        },
    };
</script>

<style scoped>
    .shit{
        font-size:13px !important;
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