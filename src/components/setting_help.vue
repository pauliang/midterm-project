<template>
    <el-container style="min-height:650px">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple delete">权限问题</div>
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
                            question: '如果我没有操作文档的权限,该如何做?',
                            solution: '您可向文档作者申请为您设置相应权限,但我们无法保证作者一定会这么做.'
                        },
                        {
                            question: '如果我拥有了操作某个文档的所有权限,是否可以为他人授权?',
                            solution: '即使您对文档进行过多次编辑也不可以,除非您是文档的初始作者.'
                        },
                        {
                            question: '我可以向没有查看文档权限的人分享文档吗?',
                            solution: '可以,分享与查看功能互不干涉,您可以向不具备权限的人分享文档,但该用户无法查看其内容.'
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