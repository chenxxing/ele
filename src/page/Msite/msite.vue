
<template>
    <div id="msite">
        <router-view/>
       <footer class="footers">
           <dl v-for="(item,index) in footerList" :key="index" @click="$router.push(item.path)" :class="$route.path===item.path?'active':''">
               <dt :class="item.icon"></dt>
               <dd>{{item.name}}</dd>
           </dl>
       </footer>
    </div>
</template>

<script>
export default {
    components:{},
    data(){
        return {
                footerList: [
                    {
						path: "/msite/list",
						name: "外卖",
						icon: "icon iconfont icon-kefu",
						newicon: "icon iconfont icon-kefu",
					},
					{
						path: "/msite/search",
						name: "搜索",
						icon: "icon iconfont icon-diqiu",
						newicon: "icon iconfont icon-diqiu",
					},
					{
						path: "/msite/order",
						name: "订单",
						icon: "icon iconfont icon-toutiao",
						newicon: "icon iconfont icon-toutiao",
					},
					{
						path: "/msite/my",
						name: "我的",
						icon: "icon iconfont icon-denglu",
						newicon: "icon iconfont icon-denglu",
					}
				]
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
    #msite{
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
        .footers{
            position: fixed;
            left: 0;
            bottom: 0;
            background: #fff;
            width: 100%;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            dl{
                width: 25%;
                height: 100%;
                text-align: center;
                font-size: 28px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                dd{
                    color: #333;
                    font-size: 30px;
                }
                dt{
                    color: #333;
                    font-size: 36px;
                }
            }
            .active{
                dt,dd{
                    color: #3190e8;
                }
            }
        }
    }
</style>
