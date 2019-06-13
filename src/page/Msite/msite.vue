
<template>
    <div id="msite">
       <XHeader class="head" title="我的" :right-options="{showMore:true}"></XHeader>
    </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
    components:{XHeader},
    data(){
        return {
            color:"red"
        }
    },
    computed:{

    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
    .head{
        height: 90px;
        color: #fff
    }
</style>
