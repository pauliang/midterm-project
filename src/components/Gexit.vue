<template>
    <div>
        <span>
           <el-button v-if="power" type="text" @click="push" >退出团队</el-button>
           <el-button v-else type="text" disabled>退出团队</el-button>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'Gexit',
        props: {
            groupID: {
                type: Number,
                default: () => 0
                //这个群组的id；
            },
            power: {
                type: Boolean,
                default: () => true
            }
        },
        data() {
            return {
                myid: 1,
            }
        },
        methods: {
            push() {
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/group/quit_group/',
                    data: {
                        groupnum: this.groupID,
                        id: this.myid
                    }
                }).then(res => {
                    if (res.data == 1) {
                        alert('操作成功！');
                        this.$router.go(0);
                    } else if (res.data == 2) {
                        alert('错误，你不在这个团队里');
                    } else
                        alert('咦，似乎发生了一点小错误..');
                }).catch(err => {
                    console.log(err);
                    alert('当前网络状态不允许你退团的样子..');
                })
            },
        },
        mounted() {
            if (localStorage.getItem('userID') != null)
                this.myid = localStorage.getItem('userID');
            else {
                alert('抓取本地用户id失败');
            }
        }
    }
</script>
<style scoped>

</style>