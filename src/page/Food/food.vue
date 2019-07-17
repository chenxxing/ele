<template>
    <div id="food">
        <header>
           <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
           <span class="loaction">{{headtitle}}</span>
       </header>
       <div class="headtitle">
           <div class="sort_item">
               <div class="sort_type" @click="chooseType('food')">分类<i class="icon iconfont icon-arrfill_d-copy"></i></div>
               <transition name="showlist" v-show="category">
                   <section v-show="sortBy == 'food'"></section>
               </transition>
           </div>
           <div class="sort_item">
               <div class="sort_type two" @click="chooseType('sort')">排序<i class="icon iconfont icon-arrfill_d-copy"></i></div>
               <transition name="showlist" v-show="category">
                   <section v-show="sortBy == 'sort'"></section>
               </transition>
           </div>
           <div class="sort_item">
               <div class="sort_type" @click="chooseType('activity')">筛选<i class="icon iconfont icon-arrfill_d-copy"></i></div>
               <transition name="showlist" v-show="category">
                   <section v-show="sortBy == 'activity'"></section>
               </transition>
           </div>
       </div>
    </div>
</template>

<script>
export default {
    name:'food',
    components:{},
    data(){
        return {
            geohash:'',
            headtitle:'',
            restaurant_category_id:'',
            category:null,
            sortBy:'',
        }
    },
    mounted(){
        console.log(this.$route.query)
        this.geohash = this.$route.query.geohash;
        this.headtitle = this.$route.query.headtitle;
        this.restaurant_category_id = this.$route.query.restaurant_category_id;
    },
    computed:{

    },
    methods:{
        async chooseType(type){
            alert(type)
        }
    }
}
</script>

<style lang='scss' scoped>
#food{
    width: 100%;
    padding-top: 90px;
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
        .headtitle{
            width: 100%;
            display: flex;
            .sort_item{
                width: 33.3%;
                height: 75px;
                background: #fff;
            }
            .sort_type{
                width: 100%;
                height: 55px;
                text-align: center;
                line-height: 55px;
                font-size: 30px;
                margin: 10px 0;
                color: #333;
                i{
                    font-size: 20px;
                    color: #777;
                    display: inline-block;
                    transform: scale(0.8)
                }
            }
            .two{
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
            }
            .showlist-enter-active,.showlist-leave-active{
                transition: all .3s;
                transform: translateY(0);
            }
            .showlist-enter,.showlist-leave-active{
                transform: translateY(-100%);
                opacity: 0;
            }
        }
}
</style>

