<template>
    <div class="hbl-fa">

        <div class="hbl-comm">
            <div class="comment-avatar" v-if="showAvatar">
                <avatar :avatar="avatar"></avatar>
            </div>
            <div class="comment" :style="{width:commentWidth}">
                <el-input
                        @focus="showButton(0)"
                        type="textarea"
                        :autosize="{ minRows: minRows, maxRows: maxRows}"
                        :placeholder=placeholder
                        v-model="textareaMap[0]">
                </el-input>

                <div v-if="buttonMap[0]" class="hbl-owo">
                    <div :class="pBodyMap[0]?'OwO':'OwO OwO-open'" class="emoj publish" :style="{width:emojiWidth}">
                        <div class="OwO-logo" @click="pBodyStatus(0)">
                            <span>Emoji表情</span>
                        </div>
                        <div class="OwO-body">
                            <ul class="OwO-items OwO-items-show">
                                <li class="OwO-item" v-for="(oitem,index) in OwOlist" :key="'oitem'+index" @click="choseEmoji(0,oitem.title)">
                                    <img :src="require('./img/face/'+oitem.url)" alt="">
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div class="publish publish-btn">
                        <button class="btn" @click="doSend()">发送</button>
                        <button @click="cancel(0)" class="btn btn-cancel">取消</button>
                    </div>
                </div>

            </div>
        </div>




        <div class="comm">
            <div class="su com-rep"></div>
            <div class="com-rep com-title">评论<span class="com-span">({{commentNum}})</span></div>
        </div>



        <div v-for="(item,index) in commentList" class="hbl-child">
            <div class="reply">
            </div>
            <div class="content">
                <div class="comment-f">
                    <avatar :avatar="item.commentUser.avatar?item.commentUser.avatar:avatar"></avatar>
                </div>

                <div  class="comment-f">
                    <div>
                        <div class="nickname author">
                            {{item.commentUser.nickName}}
                        </div>
                        <div v-if="item.commentUser.id===authorId" class="icon author">{{label}}</div>
                        <div class="date">
                            {{item.createDate}}
                        </div>


                    </div>
                </div>

                <div class="reply-content" v-html="analyzeEmoji(item.content)">{{analyzeEmoji(item.content)}}</div>
                <div class="reply-content reply-fa">
                    <div class="reply-font" @click="doReply(item.id)">
                        <div>
                            <img src="./img/icon/reply.png" class="icon-reply"><font class="icon-reply icon-hf">回复</font>
                        </div>

                    </div>

                    <div class="comment" :style="{width:commentWidth}" v-if="replyMap[item.id]" :showAvatar="showAvatar"  >
                        <el-input
                                @focus="showButton(item.id)"
                                type="textarea"
                                :autosize="{ minRows: minRows, maxRows: maxRows}"
                                :placeholder=placeholder
                                v-model="textareaMap[item.id]">
                        </el-input>

                        <div v-if="buttonMap[item.id]" class="hbl-owo">
                            <div :class="pBodyMap[item.id]?'OwO':'OwO OwO-open'" class="emoj publish" :style="{width:emojiWidth}">
                                <div class="OwO-logo" @click="pBodyStatus(item.id)">
                                    <span>Emoji表情</span>
                                </div>
                                <div class="OwO-body">
                                    <ul class="OwO-items OwO-items-show">
                                        <li class="OwO-item" v-for="(oitem,index) in OwOlist" :key="'oitem'+index" @click="choseEmoji(item.id,oitem.title)">
                                            <img :src="require('./img/face/'+oitem.url)" alt="">
                                        </li>
                                    </ul>

                                </div>
                            </div>

                            <div class="publish publish-btn">
                                <button class="btn" @click="doChidSend(item.id,item.commentUser.id,item.id)">发送</button>
                                <button @click="cancel(item.id)" class="btn btn-cancel">取消</button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div class="children" v-for="(ritem,jndex) in item.childrenList">
                <div class="reply">
                </div>
                <div class="content">

                    <div class="comment-f">
                        <avatar :avatar="ritem.commentUser.avatar?ritem.commentUser.avatar:avatar"></avatar>
                    </div>

                    <div class="comment-f">
                        <div>
                            <div class="nickname author">
                                {{ritem.commentUser.nickName}}
                            </div>
                            <div v-if="ritem.commentUser.id===authorId" class="icon author">{{label}}</div>
                            <div class="date">
                                {{ritem.createDate}}
                            </div>
                        </div>
                    </div>

                    <div class="reply-content">
                        <div class="cc cc-to">
                            <a href="#">@{{ritem.targetUser.nickName}}</a>
                        </div>

                        <div class="cc" v-html="analyzeEmoji(ritem.content)">{{analyzeEmoji(ritem.content)}}</div>
                    </div>

                    <div class="reply-content reply-fa">

                        <div class="reply-font" @click="doReply(ritem.id)">
                            <div>
                                <img src="./img/icon/reply.png" class="icon-reply"><font class="icon-reply icon-hf">回复</font>
                            </div>

                        </div>

                        <div class="comment" :style="{width:commentWidth}" v-if="replyMap[ritem.id]" :showAvatar="showAvatar">
                            <el-input
                                    @focus="showButton(ritem.id)"
                                    type="textarea"
                                    :autosize="{ minRows: minRows, maxRows: maxRows}"
                                    :placeholder=placeholder
                                    v-model="textareaMap[ritem.id]">
                            </el-input>

                            <div v-if="buttonMap[ritem.id]" class="hbl-owo">

                                <div :class="pBodyMap[ritem.id]?'OwO':'OwO OwO-open'" class="emoj publish" :style="{width:emojiWidth}">
                                    <div class="OwO-logo" @click="pBodyStatus(ritem.id)">
                                        <span>Emoji表情</span>
                                    </div>
                                    <div class="OwO-body">
                                        <ul class="OwO-items OwO-items-show">
                                            <li class="OwO-item" v-for="(oitem,index) in OwOlist" :key="'oitem'+index" @click="choseEmoji(ritem.id,oitem.title)">
                                                <img :src="require('./img/face/'+oitem.url)" alt="">
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                                <div class="publish publish-btn">
                                    <button class="btn" @click="doChidSend(ritem.id,ritem.commentUser.id,item.id)">发送</button>
                                    <button @click="cancel(ritem.id)" class="btn btn-cancel">取消</button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import comment from 'hbl-comment'
    export default {
        name: "remark2",
        props: {
            avatar: String,
            placeholder: String,
            minRows: Number,
            maxRows: Number,
            commentNum: Number,
            authorId: Number,
            label: String,
            commentWidth: String,
            commentList: Array
        },
        components: {
            comment
        },
        methods: {
            doSend(value) {
                let params = {
                    "content": value,
                }
            }
        }
    }

</script>

<style scoped>

</style>