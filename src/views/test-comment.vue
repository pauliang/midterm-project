<template>
        <div style="width: 300px; height: 100px" >
                <comment :submit="sub" :del="del" :addition="add" :remark="rem"></comment>
        </div>
</template>

<script>
    import comment from '@/components/comment.vue'
    export default {
        name: "test-comment",
        data(){
            return{
                sub: '提交',
                del: '删除',
                add: '新增评论',
                rem: '评论'
            }
        },
        components:{
            comment
        }
    }
</script>

<style>
</style>