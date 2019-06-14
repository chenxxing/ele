<template>
    <div id="Search">
        <header>
           <i class="icon iconfont icon-search"></i>
           <span class="loaction">搜索</span>
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
#Search{
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
            }
            .loaction{
                font-size: 34px;
                color: #fff;
                flex:1;
                text-align: center;
            }
            .login{
                float: right;
                span{
                    color: #fff;
                    font-size: 30px;
                }
            }
        }
}
</style>
