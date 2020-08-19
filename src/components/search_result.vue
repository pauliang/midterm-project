<template>
    <el-container style="min-height:650px">
        <el-main style="position: relative;">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="grid-content bg-purple now delete">搜索结果</div>
                    <div>{{ search }}</div>
                </el-col>
            </el-row>
            <el-row>
                <el-rol v-if="isEmpty" class="empty">暂无数据哦~</el-rol>
                <el-col v-else-if="!isEmpty" class="cardbox" v-for="result in searchResult" :key="result.docnum"
                        style="position: relative; width: 150px;float: left; margin: 35px;">
                    <card :doc=result :url="'http://39.97.122.202/doc?docid=' + result.docnum" @event2="goIntro()"></card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import card from "./card_guo";

    export default {
        name: 'search_result',
        components: {
            card
        },
        props: {
            search: String,
            // isEmpty: Boolean,
        },
        data() {
            return {
                searchResult: ["暂无数据哦~"], //搜索返回数据,
                content: '',
                isEmpty: false,
                // search: '',
            }
        },
        methods: {
            searchAllFiles(content) {
                var search_url = 'http://39.97.122.202/doc/search_docs/';
                this.$axios({
                    method: 'post',
                    url: search_url, //此处不传data
                    data: {
                        key: content,
                    }
                }).then(
                    response => {
                        console.log(response.data);
                        this.searchResult = response.data;
                        if (response.data === null){
                            this.searchResult = [];
                        }
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            },
        },
        created() {
            var id = localStorage.getItem('userID');
            if (id == null)
                this.longjmp('Login');
            this.localStorageID = localStorage.getItem('userID');
            this.localStorageName = localStorage.getItem('username');
            var search_url = 'http://39.97.122.202/doc/search_docs/';
            // while(this.search!==''){
                this.$axios({
                    method: 'post',
                    url: search_url, //此处不传data
                    data: {
                        key: this.search,
                    }
                }).then(
                    response => {
                        console.log(response.data);
                        var origin = this.searchResult;
                        this.searchResult = response.data;
                        if (response.data === null){
                            this.searchResult = [];
                        }
                        if(response.data.length===0)
                            this.isEmpty = true;
                        else if(response.data!==origin)

                        console.log(this.searchResult);
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            }
        // }
    }
</script>

<style scoped>
    .delete {
        position: relative;
        text-align: center;
        color: #555555;
        font: bold 24px arial, sans-serif;
        line-height: 36px;
        margin: 15px 25px 10px -110px;
        border-radius: 4px;
        min-height: 36px;
        border: none;
        width: 40px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .content {
        margin: 5px 50px 10px -45px;
        width: 200px;
        height: 20px;
        background-color: #ffffff;
    }

    .bg-purple {
        background: transparent;
        text-align: center;
        margin-top: 15px;
        margin-right: 250px;
        font-weight: 600;
        line-height: 18px;
        color: #bababa;
        width: 400px;
    }

    .empty {
       font-size: 20px; margin-left:-980px;
    }
    .el-container .now {
        color: #575757;
    }

    .el-footer {
        padding: 0 0;
    }

    .el-footer img {
        display: block;
        width: 100%;
    }

    .whole {
        height: 1500px;
    }

    .debox {
        float: left;
        margin: 20px 20px 20px 50px;
        width: 200px;
        height: 200px;
    }

    .deicon {
        font-size: 60px;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .decard {
        width: 300px;
        height: 200px;
    }

    .debutton {
        margin: 10px;
    }

    .defont {
        color: #555555;
        font: normal 16px arial, sans-serif;
        height: 40px;
        line-height: 40px;
    }

    .posi {
        position: absolute;
        right: 180px;
        top: 10px;
        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-weight: 700;
        border: 1px solid #cccccc;
        margin-top: 10px;
        margin-right: -40px;
        background-color: #fefefe;
        color: #676b6f;
    }
</style>