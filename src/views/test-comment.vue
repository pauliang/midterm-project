<template>
    <div style="width: 900px; height: 100px">
        <com :user="user" :docnum="docnum"></com>
    </div>
</template>


<script>
    import com from '@/components/comment.vue'

    export default {
        name: "test-comment",
        data() {
            return {
                user: {id: 5, nickName: 'rbl', avatar: ''},
                docnum: 1,
            }
        },
        components: {
            com
        },
    }
</script>

<style>
</style>