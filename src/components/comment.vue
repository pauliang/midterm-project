<template>
    <div style="width: 900px; height: 100px">
        <comment :user="user" :users="users" :comment-list="commentList"></comment>
        <!--    <div v-for="o in testList" :key="o.id" >-->
        <!--      <el-card style="height: 100px">{{ o[2] }}</el-card>-->
        <!--    </div>-->

        <div>
            <!--        <el-button @click="onSubmit(6,1,'sss')">测试提交</el-button>-->
            <!--        <el-button @click="onGet(1)">获取评论</el-button>-->
        </div>
    </div>
</template>


<script>
    import comment from '@/components/mycomment.vue'

    export default {
        name: "test-comment",
        data() {
            return {
                users: [],
                testList: [],
                commentList: []
            }
        },
        props: {
            user: Object,
            docnum: Number,
        },
        components: {
            comment
        },
    }
</script>

<style>
</style>