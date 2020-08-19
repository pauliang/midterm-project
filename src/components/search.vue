<template>
    <div style="padding-bottom: 20px;padding-left: 30%">
        <el-row>
            <el-col :span="20" class="center">
                <el-input v-model="search" @focus="focus" @blur="blur" @click="isSearch=true" @keyup.enter.native="searchHandler"
                          placeholder="请输入您要搜索的文档标题" :input="searchHandler">
                    <el-button slot="append" icon="el-icon-search" id="search" @click="searchHandler"></el-button>
                </el-input>
                <!---设置z-index优先级,防止被走马灯效果遮挡-->
                <el-card @mouseenter="enterSearchBoxHanlder" v-if="isSearch" class="box-card" id="search-box"
                         style="position:absolute;z-index:15;width:400px">
                    <dl v-if="isHistorySearch" style="text-align: left">
                        <dt class="search-title" v-show="history">历史搜索</dt>
                        <dt class="remove-history" v-show="history" @click="removeAllHistory">
                            <i class="el-icon-delete delete"></i>清空历史记录
                        </dt>
                        <el-tag
                                v-for="search in historySearchList"
                                :key="search.id"
                                closable
                                :type="search.type"
                                @close="closeHandler(search)"
                                class="history"
                        >{{search.name}}
                        </el-tag>
                        <dt class="search-title">热门搜索</dt>
                        <dd v-for="search in hotSearchList" :key="search.id" class="hot">{{search}}</dd>
                    </dl>
                </el-card>
            </el-col>
        </el-row>
        <search_result v-if="which==='search_result'"></search_result>
    </div>
</template>


<script>
    // import card from "./card_guo";
    import search_result from "./search_result";
    import RandomUtil from "@/utils/randomUtil";
    import Store from "@/utils/store";

    export default {
        name: 'search',
        components: {
            // card,
            search_result
        },
        data() {
            return {
                localStorageID: 0,
                which: '',
                search: "", //当前输入框的值
                isFocus: false, //是否聚焦
                isLogin: true,
                hotSearchList: ["暂无热门搜索"], //热门搜索数据
                historySearchList: [], //历史搜索数据
                searchResult: ["暂无数据"], //搜索返回数据,
                history: false,
                types: ["", "success", "info", "warning", "danger"], //搜索历史tag式样
            };
        },
        methods: {
            jmp(which) {
                this.which = which;
            },
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
                        this.searchResult = response.data;
                        if (response.data === null)
                            this.searchResult = [];
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            focus() {
                this.isFocus = true;
                this.historySearchList =
                    Store.loadHistory() == null ? [] : Store.loadHistory();
                this.history = this.historySearchList.length !== 0;
            },
            blur() {
                var self = this;
                this.searchBoxTimeout = setTimeout(function () {
                    self.isFocus = false;
                }, 300);
            },
            enterSearchBoxHanlder() {
                clearTimeout(this.searchBoxTimeout);
            },
            searchHandler() {
                this.$emit('event1',this.search);
                //随机生成搜索历史tag式样
                let n = RandomUtil.getRandomNumber(0, 5);
                let exist =
                    this.historySearchList.filter(value => {
                        return value.name === this.search;
                    }).length !== 0;
                if (!exist) {
                    this.historySearchList.push({name: this.search, type: this.types[n]});
                    Store.saveHistory(this.historySearchList);
                }
                this.history = this.historySearchList.length !== 0;
            },
            closeHandler(search) {
                this.historySearchList.splice(this.historySearchList.indexOf(search), 1);
                Store.saveHistory(this.historySearchList);
                clearTimeout(this.searchBoxTimeout);
                if (this.historySearchList.length === 0) {
                    this.history = false;
                }
            },
            removeAllHistory() {
                Store.removeAllHistory();
            }
        },
        computed: {
            isHistorySearch() {
                return this.isFocus && !this.search;
            },
            // isSearchList() {
            //     return this.isFocus && this.search;
            // },
            isSearch() {
                return this.isFocus;
            }
        },
        created() {
            var id = localStorage.getItem('userID');
            if (id == null)
                this.longjmp('Login');
            this.localStorageID = localStorage.getItem('userID');
            this.localStorageName = localStorage.getItem('username');
        }
    }
</script>
<style scoped>
    .history {
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 30px;
        text-align: left;
    }
    .center {
        margin-top: 15px;
        margin-left: 200px;
    }

    #search {
        background-color: transparent;
        border-radius: 0;
    }

    .search-title {
        color: #262626;
        font-size: 20px;
        text-align: left;
        margin-bottom: 15px;
        margin-top: 10px;
    }

    .center .delete {
        margin-top: -10px;
    }

    .remove-history {
        color: #bdbaba;
        font-size: 15px;
        float: right;
        margin-top: -32px;
    }

    .center #search-box {
        /*height: 200px;*/
        margin-top: 0;
        padding-bottom: 20px;
    }
    .center .hot {
        display: inline-block;
        text-align: left;
        margin-left: 0px;
    }
</style>
