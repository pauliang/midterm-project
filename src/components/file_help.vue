<template>
    <el-container style="min-height:650px">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple delete">文档问题</div>
                </el-col>

                <el-col v-for="info in docList.infos" :key="info">
                    <notification class="card" shadow="hover" :question="info.question" :solution="info.solution">
                    </notification>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import notification from "@/components/notification.vue";
    export default {
        name: "common_help",
        data() {
            return {
                docList: {
                    infos: [{
                            question: '在金石文档中,哪些内容是禁止发布的?',
                            solution: '请严格遵守国家法律法规及当地规定,但即便如此做,我们也无法保证您的文档不被清理.'
                        },
                        {
                            question: '可以多人同时在线编辑同一个文档吗?',
                            solution: '不可以,为了保证文档的修改不导致冲突,我们不允许多人同时编辑同一个文档.'
                        },
                    ],
                }
            };
        },
        components: {
            notification,
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
        margin: 0 auto;
        border-radius: 4px;
        min-height: 36px;
    }

    .bg-purple {
        background: #ffffff;
        text-align: center;
        line-height: 18px;
        font-weight: 600;
        width: 200px;
        margin-top: 40px;
    }

    .el-footer {
        padding: 0 0;
    }

    .el-footer img {
        display: block;
        width: 100%;
    }

    .card {
        float: left;
        margin: 20px 20px 20px 0;
        width: 200px;
        border: none;
    }
</style>