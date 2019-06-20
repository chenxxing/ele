<template>
    <div id="My">
        <header>
           <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
           <span class="loaction">我的</span>
       </header>
       <div class="content">
            
       </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#My{
    width: 100%;
        header{
            width: 100%;
            height: 90px;
            background: #3190e8;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #fff;
            padding: 0 20px;
            position: fixed;
            left: 0;
            top: 0;
            .icon-fanhui{
                font-size: 36px;
                color: #fff;
            }
            .loaction{
                font-size: 34px;
                color: #fff;
                flex:1;
                text-align: center;
            }
        }
}
</style>
