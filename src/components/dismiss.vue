<template>
    <div>
        <el-button type="text" @click="dialogVisible = true" :disabled="power">解散团队</el-button>
        <el-dialog :title="'团队解散'" class="dismiss title" :visible.sync="dialogVisible" width="20%">

            <div class="confirm">
                (ﾉ´∀｀*) 您确定要解散 {{groupName}} 吗?
            </div>

            <div>
                <span @mouseover="shut" v-if="ishover">
                <el-button type="danger" icon="el-icon-check" circle></el-button>
                </span>

                <span @mouseout="overShow" v-if="!ishover" @click="push">
                    <el-button type="danger" round>我意已决</el-button>
                </span>

                <span @mouseover="shut2" v-if="ishover2" style="margin-left:30px">
                     <el-button type="success" icon="el-icon-close" circle></el-button>
                </span>

                <span @mouseout="overShow2" v-if="!ishover2" style="margin-left:30px" @click="pop">
                    <el-button type="success" round>我再想想</el-button>
                </span>

            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'dismiss',
        data() {
            return {
                dialogVisible: false,
                input: '',
                myid: 1,
                ishover: true,
                ishover2: true,
            }
        },
        props: {
            groupName: {
                type: String,
                default: () => '月下男团'
                //群名字
            },
            groupID: {
                type: Number,
                default: () => 0
                //这个群组的id；
            },
            power: {
                type: Boolean,
                default: () => false
                //是否有操作的权力，false表示有权利
            }
        },
        methods: {
            overShow() {
                this.ishover = true;
            },
            shut() {
                this.ishover = false;
            },
            overShow2() {
                this.ishover2 = true;
            },
            shut2() {
                this.ishover2 = false;
            },
            push() {
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/group/dismiss_group/',
                    data: {
                        groupnum: this.groupID,
                    }
                }).then(res => {
                    if (res.data === 1) {
                        alert(this.groupName + '已解散，各位有缘再见！');
                        this.dialogVisible = false;
                    } else
                        alert('咦，似乎发生了一点小错误..');
                }).catch(err => {
                    console.log(err);
                    alert('当前网络状态不允许你们解散的样子..');
                })
            },
            pop() {
                alert('当前操作已取消');
                this.dialogVisible = false;
            }
        },
        mounted() {
            this.myid = localStorage.getItem('userID');
        }
    }
</script>

<style scoped>
    .title {
        text-align: center;
        font-weight: 400;
        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        margin-top: 30px;
        padding-left: 8px;

    }

    .confirm {
        margin-bottom: 40px;
        font-weight: bold;
        font-size: 16px;
    }
</style>