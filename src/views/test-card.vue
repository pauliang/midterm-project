<template>
    <div style="width:150px">
        <card :docname="x" :url="y">
        </card>
    </div>
</template>

<script>
    import card from '@/components/card.vue'
    export default {
        name:'test',
        data(){
            return{
                x:'hhh',
                y:'/login',
            }
        },
        components:{
            card
        }
    }
</script>

<style>
</style>