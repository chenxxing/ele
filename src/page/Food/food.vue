<template>
    <div id="food">
        <header>
           <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
           <span class="loaction">{{headtitle}}</span>
       </header>
       <div class="headtitle">
           <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
               <div class="sort_type" @click="chooseType('food')">分类<i class="icon iconfont icon-arrfill_d-copy"></i></div>
               <transition name="showlist" v-show="category">
                   <section v-show="sortBy == 'food'" class="category_container category_container_food">
                       <div class="category_left">
                           <ul>
                               <li v-for="(item,index) in category" :key="index" @click="showdetail(item.id,index)" :class="{category_active:item.id == sub_categoriesid}">
                                   <img :src="getImgPath(item.image_url)" alt="">
                                   <span class="types">{{item.name}}</span>
                                   <span class="counts">{{item.count}}</span>
                                   <i class="icon iconfont icon-jiantou"></i>
                               </li>
                           </ul>
                       </div>
                       <div class="category_right">
                           <ul>
                               <li v-for="item in categoryDetail" :key="item._id">
                                   <span>{{item.name}}</span>
                                   <span>{{item.count}}</span>
                               </li>
                           </ul>
                       </div>
                   </section>
               </transition>
           </div>
           <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
               <div class="sort_type two" @click="chooseType('sort')">排序<i class="icon iconfont icon-arrfill_d-copy"></i></div>
               <transition name="showlist" v-show="category">
                   <section v-show="sortBy == 'sort'" class="category_container category_container_sort">
                       <ul>
                           <li>
                               <i class="icon iconfont icon-paixu"></i>
                               <span>智能排序</span>
                           </li>
                           <li>
                               <i class="icon iconfont icon-position-o"></i>
                               <span>距离最近</span>
                           </li>
                           <li>
                               <i class="icon iconfont icon-xiaoliang"></i>
                               <span>销量最高</span>
                           </li>
                           <li>
                               <i class="icon iconfont icon-RectangleCopy"></i>
                               <span>起送价最低</span>
                           </li>
                           <li>
                               <i class="icon iconfont icon-pc-xuanzeyongshi"></i>
                               <span>配送速度最快</span>
                           </li>
                           <li>
                               <i class="icon iconfont icon-pingfen"></i>
                               <span>评分最高</span>
                           </li>
                       </ul>
                   </section>
               </transition>
           </div>
           <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
               <div class="sort_type" @click="chooseType('activity')">筛选<i class="icon iconfont icon-arrfill_d-copy"></i></div>
               <transition name="showlist" v-show="category">
                   <section v-show="sortBy == 'activity'" class="category_container category_container_activity">activity</section>
               </transition>
           </div>
       </div>
       
    </div>
</template>

<script>
import {category} from '@/service/getData'
export default {
    name:'food',
    components:{},
    data(){
        return {
            geohash:'',
            headtitle:'',
            restaurant_category_id:'',
            category:null,
            categoryDetail:null,
            sub_categoriesid:'',
            sortBy:'',
        }
    },
    created(){
        category().then((res) => {
            console.log(res)
            this.category = res.data;
            this.categoryDetail = this.category[0].sub_categories;
            // this.category.forEach(arr => {
            //     this.categoryDetail = arr;
            // });
            
        }).catch((err) => {
            console.log(err)
        })
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
            this.sortBy = type;
        },
        getImgPath(path) {
			let suffix;
			if (!path) {
				return '//elm.cangdu.org/img/default.jpg'
			}
			if (path.indexOf('jpeg') !== -1) {
				suffix = '.jpeg'
			} else {
				suffix = '.png'
			}
			let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
			return 'https://fuss10.elemecdn.com' + url
        },
        showdetail(id,index){
            if (index === 0) {
                this.sub_categoriesid = null;
                this.sortBy = "";
                //不是第一个选项时，右侧展示其子级sub_categories的列表
            } else{
                this.categoryDetail = this.category[index].sub_categories;
                this.sub_categoriesid = id;
            }
            
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
            z-index: 20;
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
            position: fixed;
            top: 90px;
            z-index: 12;
            .sort_item{
                width: 33.3%;
                height: 75px;
                background: #fff;
                overflow: hidden;
                border-bottom: 1px solid #ccc;
            }
            .choose_type{
                .sort_type{
                    color: #3190e8;
                    .icon{
                        transform: scale(0.8) rotate(-270deg);
                        color:  #3190e8;
                    }
                }
            }
            .sort_type{
                width: 100%;
                height: 55px;
                text-align: center;
                line-height: 55px;
                font-size: 30px;
                margin: 10px 0;
                color: #333;
                position: relative;
                z-index: 13;
                overflow: hidden;
                i{
                    font-size: 20px;
                    color: #777;
                    display: inline-block;
                    transform: scale(0.8) rotate(-90deg);
                    transition: all 0.3s;
                }
            }
            .two{
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
            }
            .showlist-enter-active,.showlist-leave-active{
                transition: all 1s;
                transform: translateY(0);
            }
            .showlist-enter,.showlist-leave-active{
                opacity: 0;
                transform: translateY(-100%);
            }
            .category_container,.category_container_food{
                width: 100%;
                position: absolute;
                top: 75px;
                left: 0;
                display: flex;
                .category_left{
                    flex:1;
                    width: 100%;
                    height: 760px;
                    overflow-y: auto;
                    ul{
                        width: 100%;
                        li{
                            width: 100%;
                            height: 84px;
                            display: flex;
                            align-items: center;
                            padding: 0 20px;
                            img{
                                width: 37.5px;
                                height: 37.5px;
                                margin-right: 15px;
                            }
                            i{
                                font-size: 24px;
                            }
                            span{
                                font-size: 28px;
                            }
                            .types{
                                margin-right: 40px;
                            }
                            .counts{
                                display: inline-block;
                                width: 90px;
                                height: 40px;
                                line-height: 40px;
                                background: #ccc;
                                border-radius: 15px;
                                text-align: center;
                                color: #fff;
                                font-size: 24px;
                                margin-right: 10px;
                            }
                        }
                        .category_active{
                            background: #fff;
                        }
                    }
                }
                .category_right{
                    flex:1;
                    height: 760px;
                    overflow-y: auto;
                    ul{
                        width: 100%;
                        padding-left: 20px;
                        background: #fff;
                        li{
                            height: 84px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            border-bottom: 0.025rem solid #e4e4e4;
                            padding-right: 20px;
                            font-size: 28px;
                            color: #333;
                        }
                    }
                }
            }
            .category_container_sort{
                width: 100%;
                ul{
                    width: 100%;
                    background: #fff;
                    li{
                        width: 100%;
                        height: 110px;
                        display: flex;
                        align-items: center;
                        i{
                            font-size: 32px;
                            color: #3190e8;
                            padding: 0 30px;
                        }
                        span{
                            display: inline-block;
                            height: 100%;
                            width: 100%;
                            line-height: 110px;
                            font-size: 30px;
                            border-bottom: 0.025rem solid #e4e4e4;
                        }
                    }
                }
            }
        }
}
</style>

