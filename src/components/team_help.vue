<template>
    <el-container style="min-height:650px">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple delete">团队问题</div>
                </el-col>

                <el-col v-for="info in docList.infos" :key="info">
                    <notification class="card" shadow="hover" :question="info.question" :solution="info.solution"></notification>
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
                    infos: [
                        {question: 'aaa',solution: '多喝开水'},
                        {question: 'bbb',solution: '少喝开水'},
                        {question: 'ccc',solution: '多喝自来水'},
                        {question: 'ddd',solution: '少喝自来水'},
                        {question: 'eee',solution: '穿秋裤'},
                        {question: 'fff',solution: '穿得太多了'},
                        {question: 'ggg',solution: '少吃零食'},
                        {question: 'hhh',solution: '多吃零食'},
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
        font: bold 24px arial,sans-serif ;
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
        width:200px;
        border: none;
    }

</style>