<template>
    <div id="List">
        <header>
           <i class="icon iconfont icon-search"></i>
           <span class="loaction">武汉市洪山区光谷软件园</span>
           <div class="login">
               <span>登录</span>
               <span>|</span>
               <span>注册</span>
           </div>
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
#List{
    width: 100%;
    padding-bottom: 90px;
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
        .icon-search{
            font-size: 36px;
            color: #fff;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        .loaction{
            font-size: 34px;
            color: #fff;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 50%;
            transform: translate(-50%,-50%);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            display: block;
            width: 340px;
        }
        .login{
            position: absolute;
            right: 20px;
            span{
                color: #fff;
                font-size: 30px;
            }
        }
    }
}
</style>
