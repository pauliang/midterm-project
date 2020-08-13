<template>
    <div class="w">
        <div v-if="choice=='会议纪要模板'" class="title">
            <h1 class="title1">会议纪要</h1>
            <h2 class="title2 cues">会议信息</h2>
            <pre><h3 style="font-size: 20px">  会议日期:</h3></pre>
            <pre><h3 style="font-size: 20px">  会议地点:</h3></pre>
            <pre><h3 style="font-size: 20px">  会议召集者:</h3></pre>
            <pre><h3 style="font-size: 20px">  会议主题:</h3></pre>
            <pre><h3 style="font-size: 20px">  与会人员:</h3></pre>
            <ul>
                <h1 class="title2">议程1——主要内容</h1>
                <ol>
                    <li><h3>内容1</h3></li>
                    <li><h3>内容2</h3></li>
                    <li><h3>内容3</h3></li>
                </ol>
                <h1 class="title2">议程2——主要内容</h1>
               <ol>
                   <li><h3>内容1</h3></li>
                   <li><h3>内容2</h3></li>
                   <li><h3>内容3</h3></li>
               </ol>

                <h1 class="title2">其他</h1>
                <h3 class="addition">补充内容</h3>
            </ul>
        </div>
        <div v-else-if="choice=='康奈尔笔记法'" class="title">
            <h1 class="title1">康奈尔笔记模板</h1>
            <h2 class="cues">线索Cues</h2>
            <pre><h3 style="font-size: 20px">  线索1:</h3></pre>
            <pre><h3 style="font-size: 20px">  线索2:</h3></pre>
            <pre><h3 style="font-size: 20px">  线索3:</h3></pre>
            <ul>
                <h1 class="title2">线索1——Notes</h1>
                <ul>
                    <li><h3>Note 1:</h3></li>
                    <li><h3>Note 2:</h3></li>
                    <li><h3>Note 3:</h3></li>
                </ul>
                <h1 class="title2">线索2——Notes</h1>
                <ul>
                    <li><h3>Note 1:</h3></li>
                    <li><h3>Note 2:</h3></li>
                    <li><h3>Note 3:</h3></li>
                </ul>
                <h1 class="title2">线索3——Notes</h1>
                <ul>
                    <li><h3>Note 1:</h3></li>
                    <li><h3>Note 2:</h3></li>
                    <li><h3>Note 3:</h3></li>
                </ul>

                <h1 class="title2">其他</h1>
                <h3 class="addition">补充内容</h3>
                <br>
                <br>
            </ul>
        </div>
        <div v-else-if="choice=='四象限法则'" class="title">
            <ul>
                <h1 class="title3">重要又紧急——立刻做</h1>
                <ol>
                    <li><h3>事件1</h3></li>
                    <li><h3>事件2</h3></li>
                    <li><h3>事件3</h3></li>
                    <li><h3>事件4</h3></li>
                </ol>
                <h1 class="title3">重要不紧急——计划做</h1>
                <ol>
                    <li><h3>事件1</h3></li>
                    <li><h3>事件2</h3></li>
                    <li><h3>事件3</h3></li>
                    <li><h3>事件4</h3></li>
                </ol>
                <h1 class="title3">紧急不重要——抽空做</h1>
                <ol>
                    <li><h3>事件1</h3></li>
                    <li><h3>事件2</h3></li>
                    <li><h3>事件3</h3></li>
                    <li><h3>事件4</h3></li>
                </ol>
                <h1 class="title3">不重要不紧急——请人做</h1>
                <ol>
                    <li><h3>事件1</h3></li>
                    <li><h3>事件2</h3></li>
                    <li><h3>事件3</h3></li>
                    <li><h3>事件4</h3></li>
                </ol>
                <br>
                <br>
            </ul>
        </div>
        <div v-else-if="choice=='阅读笔记模板'" class="title">
            <h1 class="title1">书籍背景</h1>
<!--            <h2 class="title2">线索Cues</h2>-->
            <pre><h3 style="font-size: 20px">  书名:</h3></pre>
            <pre><h3 style="font-size: 20px">  作者:</h3></pre>
            <pre><h3 style="font-size: 20px">  出版社:</h3></pre>
            <pre><h3 style="font-size: 20px">  阅读日期:</h3></pre>
            <ul>
                <h1 class="title3">好句摘抄</h1>
                <ol>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph last"><h3></h3></li>
                </ol>
                <h1 class="title3">批注感悟</h1>
                <ol>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph last"><h3></h3></li>
                </ol>
                <h1 class="title3">读书总结</h1>
                <ul>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph last"><h3></h3></li>
                </ul>

                <h1 class="title3">精彩书评</h1>
                <ul>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph"><h3></h3></li>
                    <li class="paragraph last"><h3></h3></li>
                </ul>
            </ul>
        </div>
        <div v-else-if="choice=='项目策划模板'" class="title">
            <h1 class="title1">项目概述</h1>
            <pre><h3 style="font-size: 20px">  项目名称:</h3></pre>
            <pre><h3 style="font-size: 20px">  项目经理:</h3></pre>
            <pre><h3 style="font-size: 20px">  主导人:</h3></pre>
            <pre><h3 style="font-size: 20px">  团队成员:</h3></pre>
            <pre><h3 style="font-size: 20px">  风险评估:</h3></pre>
            <pre><h3 style="font-size: 20px">  成本预算:</h3></pre>
            <pre><h3 style="font-size: 20px">  创建时间:</h3></pre>
            <pre><h3 style="font-size: 20px">  计划截止时间:</h3></pre>
            <h2 class="cues">项目描述</h2>
            <ul>
                <h1 class="title3">项目背景与目的</h1>
                <ul>
                    <li><h3></h3></li>
                    <li><h3></h3></li>
                    <li><h3></h3></li>
                </ul>
                <h1 class="title3">项目目标</h1>
                <ol>
                    <li><h3></h3></li>
                    <li><h3></h3></li>
                    <li><h3></h3></li>
                    <li><h3></h3></li>
                    <li><h3></h3></li>
                </ol>
                <h1 class="title3">项目里程碑</h1>
                <h2 class="title4">里程碑一</h2>
                <ul class="milestone">
                    <li><h3>日期时间:</h3></li>
                    <li><h3>负责人:</h3></li>
                    <li><h3>成果展示:</h3></li>
                    <li><h3>备注:</h3></li>
                </ul>
                <h2 class="title4">里程碑二</h2>
                <ul class="milestone">
                    <li><h3>日期时间:</h3></li>
                    <li><h3>负责人:</h3></li>
                    <li><h3>成果展示:</h3></li>
                    <li><h3>备注:</h3></li>
                </ul>
                <h2 class="title4">里程碑三</h2>
                <ul class="milestone">
                    <li><h3>日期时间:</h3></li>
                    <li><h3>负责人:</h3></li>
                    <li><h3>成果展示:</h3></li>
                    <li><h3>备注:</h3></li>
                </ul>

                <h1 class="title3">项目参与者</h1>
                <ul class="milestone">
                    <li><h3>姓名:</h3></li>
                    <li><h3>部门:</h3></li>
                    <li><h3>职务:</h3></li>
                    <li><h3>任务:</h3></li>
                    <li><h3 class="last">截止时间:</h3></li>
                </ul>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name:'board',
        props:{
            choice:String
        }
    }
</script>
<style>
    .w h2 h3 h4 h5 h6 {
        font-weight: 400 !important;

    }
    .title .title1 {
        text-align:center;
        height: 100px;
        line-height: 100px;
        background-color: #00bf66;
        padding: 0 0;
        color: #ffffff;
    }

    .title .title2 {
        text-align:center;
        height: 100px;
        line-height: 100px;
        background-color: #f0f0f5;
        padding: 0 0;
        margin-left: -20px;
    }
    .title .cues {
        text-align:center;
        height: 100px;
        line-height: 100px;
        background-color: #f0f0f5;
        padding: 0 0;
        margin-left: 0;
    }
    .title .title3 {
        text-align:center;
        height: 100px;
        line-height: 100px;
        background-color: #00bf66;
        padding: 0 0;
        color: #ffffff;
        margin-left: -20px;
    }
    .title .title4 {
        text-align:left;
        height: 50px;
        line-height: 50px;
        background-color: #f0f0f5;
        padding: 0 0;
        margin-left: -20px;
        width: 100px;
    }
    .title .milestone {
        list-style: none;
        background-color: #fafafa;
        margin-left: -20px;
    }
    .title .milestone .last {
        padding-bottom: 15px;
    }
    .content ol li{
        font-size: 16px;
    }
    ul ol li h3 {
        font-weight: 400;
        font-size: 18px;
    }
    .paragraph {
        border-bottom: 1px solid #929292;
        list-style: none;
        height: 28px;
        line-height: 28px;
        margin: 0 0 0 -20px;
    }
    .last {
        margin-bottom: 30px;
    }
    .addition {
        font-weight: 400;
        font-size: 18px;
    }

</style>