<template>
    <div>
        <div v-if="choice==1">
            <br>
            <h1 style="text-align:center;">会议纪要</h1>
            <br>
            <hr align=center width=100% color=#00000 SIZE=4>
            <br>
            <h4 >时间丨111</h4>
            <h4>地点丨111</h4>
            <h4>参与人员丨abc</h4>
            <br>
            <hr align=center width=100% color=#00000 SIZE=1>
            <ul>
                <li>
                    <h3>会议议题</h3>
                    <ol>
                        <li>填写会议议题，例如产品策略讨论；</li>
                        <li>继续</li>
                        <li>继续</li>
                    </ol>
                </li>
                <li>
                    <h3>会议结论</h3>
                    <ul>
                        <li>随便</li>
                        <li>郭总666</li>
                    </ul>
                </li>
                <li>
                    <h3>会议想不出来了</h3>
                    
                </li>
            </ul>
        </div>
        <div v-if="choice==2">
            <br>
            <h1 style="text-align:center;">是啥都行，但这是另一个模板</h1>
            <br>
            <hr align=center width=100% color=#00000 SIZE=4>
            <br>
            <h4>时间丨111</h4>
            <h4>地点丨111</h4>
            <h4>参与人员丨abc</h4>
            <br>
            <hr align=center width=100% color=#00000 SIZE=1>
            <ul>
                <li>
                    <h3>会议议题</h3>
                    <ol>
                        <li>填写会议议题，例如产品策略讨论；</li>
                        <li>继续</li>
                        <li>继续</li>
                    </ol>
                </li>
                <li>
                    <h3>会议结论</h3>
                    <ul>
                        <li>随便</li>
                        <li>郭总666</li>
                    </ul>
                </li>
                <li>
                    <h3>会议想不出来了</h3>
                    
                </li>
            </ul>
        </div>
    </div>
    
</template>
<script>
export default {
    name:'board',
    props:{
        choice:Number
    }
}
</script>