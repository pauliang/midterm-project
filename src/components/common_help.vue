<template>
    <el-container style="min-height:650px">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple delete">常见问题</div>
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
                            question: '请问我的隐私会得到保护吗?',
                            solution: '对此您可完全放心,我们会保证每一位用户的个人信息不被泄露,但我们没有任何隐私政策.'
                        },
                        {
                            question: '如果遇到问题,该怎样反馈?',
                            solution: '您可在网页中找到我们的联系方式并提交反馈,但我们并不保证每条消息都会得到处理并回复.'
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