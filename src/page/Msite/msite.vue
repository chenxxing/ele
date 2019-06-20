
<template>
    <div id="msite">
        <transition name="child-fade">
            <router-view></router-view>
        </transition>
       <footer class="footers">
           <dl v-for="(item,index) in footerList" :key="index" @click="$router.push(item.path)" :class="$route.path===item.path?'active':''">
               <dt :class="$route.path===item.path?item.icon:item.newicon"></dt>
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
	.child-fade-enter-active,.child-fade-leave-active {
	  	transition: opacity .7s;
    }
	.child-fade-enter ,.child-fade-leave-to{
        opacity: 0;
    }
    #msite{
        width: 100%;
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
