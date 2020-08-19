<template>
    <el-container style="min-height:650px">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple delete">团队问题</div>
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
                            question: '我该如何加入团队?',
                            solution: '目前本网站只允许邀请制,即团队内管理员向您发出邀请,且您同意后方可加入.您也可以选择自行创建团队.'
                        },
                        {
                            question: '我加入/创建团队之后,发表的文档会被直接归入其中吗?',
                            solution: '不会,您可以选择文档所属,同时您可以随时随地进行完全自由地对文档所属进行修改.'
                        },
                        {
                            question: '群内有的文档我无法编辑,为什么?',
                            solution: '这是因为管理员将其设置为了仅管理员可以修改的状态,普通用户只能进行查看与评论.'
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