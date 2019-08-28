<template>
    <div id="food">
        <header>
           <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
           <span class="loaction">{{headtitle}}</span>
       </header>
       <div class="headtitle">
           <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
               <div class="sort_type" @click="chooseType('food')">
                   分类
                   <i class="icon iconfont icon-arrfill_d-copy"></i>
                </div>
           </div>
           <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
               <div class="sort_type two" @click="chooseType('sort')">
                   排序
                   <i class="icon iconfont icon-arrfill_d-copy"></i>
                </div>
           </div>
           <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
               <div class="sort_type" @click="chooseType('activity')">
                   筛选
                   <i class="icon iconfont icon-arrfill_d-copy"></i>
                </div>
           </div>
       </div>
       <div class="transitions">
           <div>
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
            <div>
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
            <div>
               <transition name="showlist" v-show="category">
                   <section v-show="sortBy == 'activity'" class="category_container category_container_activity">
                       <p>配送方式</p>
                       <p>
                           <span><i class="icon iconfont icon-huo"></i>蜂鸟专送</span>
                       </p>
                       <p>商家属性(可以多选)</p>
                       <div>
                           <ul>
                               <li>
                                   <i class="icon iconfont icon-pin2"></i>品牌商家
                               </li>
                               <li>
                                   <i class="icon iconfont icon-pin2"></i>外卖保
                               </li>
                               <li>
                                   <i class="icon iconfont icon-pin2"></i>准时达
                               </li>
                               <li>
                                   <i class="icon iconfont icon-pin2"></i>新店
                               </li>
                               <li>
                                   <i class="icon iconfont icon-pin2"></i>在线支付
                               </li>
                               <li>
                                   <i class="icon iconfont icon-pin2"></i>开发票
                               </li>
                           </ul>
                       </div>
                   </section>
               </transition>
            </div>
       </div>
       <div class="shoplist">
            <ul>
                <li v-for="(item,idx) in shopListArr" :key="'info' + idx">
                    <img :src="imgBaseUrls + item.image_path" alt="">
                    <div class="title">
                        <div class="brand">
                            <span>品牌</span>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="score">
                            <rating :rating="item.rating"></rating>
                            <div>{{item.rating}}</div>
                            <div>
                                月售<span>{{item.recent_order_num}}</span>单
                            </div>
                        </div>
                        <div class="money">
                            <span>￥{{item.float_minimum_order_amount}}起送</span>/
                            <span>配送费￥{{item.float_delivery_fee}}</span>
                        </div>
                    </div>
                    <div class="times">
                        <div>保准点</div>
                        <div>
                            <span>
                                <a href="">蜂鸟专送</a>
                            </span>
                            <span><a href="">准时达</a></span>
                        </div>
                        <div>
                            <span>{{item.distance}}</span>
                            <span>{{item.order_lead_time}}</span>
                        </div>
                    </div>
                </li>
            </ul>
       </div>
       <transition name="showcover">
            <div class="models" v-show="sortBy" @click="showlist()"></div>
       </transition>
    </div>
</template>

<script>
import {category,restaurants} from '@/service/getData';
import rating from '@/components/rating/rating';
export default {
    name:'foods',
    components:{rating},
    data(){
        return {
            geohash:'',
            headtitle:'',
            restaurant_category_id:'',
            category:null,
            categoryDetail:null,
            sub_categoriesid:'',
            sortBy:'',
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
            shopListArr:[],
            imgBaseUrls: '//elm.cangdu.org/img/',
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
        //列表
        restaurants().then((res) => {
            this.shopListArr = res.data;
            console.log(this.shopListArr)
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
            
        },
        showlist(){
            this.sortBy = '';
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
                transform:translateZ(100);
                transform-style:preserve-3d;
                position: relative;
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
        }
        .transitions{
            width: 100%;
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
                position: fixed;
                top: 165px;
                left: 0;
                display: flex;
                z-index: 3;
                .category_left{
                    flex:1;
                    width: 100%;
                    height: 760px;
                    overflow-y: auto;
                    ul{
                        width: 100%;
                        background: whitesmoke;
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
            .category_container_activity{
                background: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                p:nth-child(1),p:nth-child(3){
                    width: 100%;
                    height: 70px;
                    line-height: 70px;
                    padding-left: 20px;
                    color: #333;
                }
                p:nth-child(2){
                    width: 100%;
                    height: 70px;
                    line-height: 70px;
                    padding-left: 20px;
                    display: flex;
                    align-items: center;
                    box-sizing: content-box;
                    span{
                        display: inline-block;
                        width: 200px;
                        height: 60px;
                        border: 1px solid #eee;
                        i{
                            font-size: 32px;
                            color: #3190e8;
                        }
                    }
                }
                div{
                    width: 100%;
                    ul{
                        width: 100%;
                        padding-left: 20px;
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        li{
                            width: 200px;
                            height: 65px;
                            border: 1px solid #eee;
                            margin-bottom: 20px;
                            display: flex;
                            align-items: center;
                            i{
                                font-size: 32px;
                                color: #3190e8;
                                padding: 10px;
                            }
                        }
                    }
                }
            }
        }
        .shoplist{
            padding-top: 75px;
            width: 100%;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    display: flex;
                    border-bottom: 1px solid #f1f1f1;
                    padding: 30px 20px;
                    background: #fff;
                    img{
                        width: 126px;
                        height: 126px;
                    }
                    .title{
                        padding-left: 15px;
                        flex: 0.5;
                        .brand{
                            span:nth-child(1){
                                display: inline-block;
                                background: #ffd930;
                                border-radius: 10px;
                                width: 60px;
                                height: 36px;
                                text-align: center;
                                line-height: 36px;
                                font-weight: 900;
                            }
                            span:nth-child(2){
                                font-size: 30px;
                                font-weight: 600;
                            }
                        }
                        .score{
                            display: flex;
                            align-items: center;
                            margin-top: 14px;
                            div:nth-child(1){
                                span{
                                    display: inline-block;
                                    width: 18px;
                                    height: 18px;
                                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAfhJREFUOBGlVD1LHFEUPXfWrzGJO2uhaIQ0iljESgKSpAjBwpXVKikEl6TzD6TwJ4gWaQMBS8WQgCRZ61QpglUgRbQUbMR1XfwodvbmvE1mdt/ssDPBC493733nnrkf7w2QQrSU29D9wY8poJAkkG6hD8O5E+IGgJsHkr8+7hTjdDpsnA0PLkHE4yK2r5iETyYUfdUkkRa96W3VOhLqXv8oFHNhgGCC/Xwc2jFKR0J0966w1IwVp/LasiNGOBTdxV24bhbqenCQRUY9qLzl2CasGEUVdbyA1M5R1wrq/gUqVxUp4tLghCX85D7VlonFksJQ9Un3w5S8c2sy8z3TGtGDRsla8op0vKe3O0UuMRBVDm9N8uX1Zg/3s8+hmU/sGS/wf8kN0UWZP/tgokJCY+jX3ENmWqJ3zNiJonoKXxalcPY9wFqExqmf3fvIuL+SM2WZNX9SCheHAZnZ2++h9FyxufdaQfG6CBznTvQshtDhSyA4jQieRmExhO2gaFBoi5OK8EkYECiqX9jdd1wauP7tbVgrw8a/TzETBpkp1nWZ96sg8+VV8j0j6VF4Dozo3sB4ix0ZypD3iO3r+QvQbfi1KVkobwcBkj//hmp5msSbXHxqlC67bCtDDr2fN/43wYvMaFkK1dOALNjlJa6Z8RuIP0vfAZfVhj/iqoy46fpKwgAAAABJRU5ErkJggg==);
                                    background-size: 100% 100%;
                                }
                            }
                            div:nth-child(2){
                                font-size: 23px;
                                color: #ff6000;
                            }
                            div:nth-child(3){
                                color: #666;
                                transform: scale(0.8);
                            }
                        }
                        .money{
                            margin-top: 14px;
                            transform: scale(0.95);
                            span{
                                font-size: 12px;
                                color: #555
                            }
                        }
                    }
                    .times{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                        flex: 0.5;
                        div:nth-child(1){
                            font-size: 23px;
                            color: #999;
                            border: 1px solid #f1f1f1;
                            padding: 0 5px;
                            border-radius: 8px;
                            letter-spacing: 5px;
                            transform: scale(0.8);
                        }
                        div:nth-child(2){
                            margin-top: 16px;
                            width: 100%;
                            text-align: right;
                            span:nth-child(1){
                                display: inline-block;
                                width: 120px;
                                height: 30px;
                                border-radius: 5px;
                                background: #3190e8;
                                a{
                                    color: #fff;
                                    display: inline-block;
                                    transform: scale(0.8);
                                    width: 100%;
                                    text-align: center;
                                }
                            }
                            span:nth-child(2){
                                display: inline-block;
                                width: 100px;
                                height: 30px;
                                border: 1px solid #3190e8;
                                border-radius: 5px;
                                a{
                                    color: #3190e8;
                                    display: inline-block;
                                    transform: scale(0.8);
                                    width: 100%;
                                    text-align: center;
                                }
                            }
                        }
                        div:nth-child(3){
                            margin-top: 16px;
                            width: 100%;
                            text-align: right;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            span:nth-child(1){
                                color: #555;
                                display: inline-block;
                                transform: scale(0.95);
                            }
                            span:nth-child(2){
                                color: #3190e8;
                                display: inline-block;
                                transform: scale(0.95);
                            }
                        }
                    }
                }
            }
        }
        .showcover-enter-active,.showcover-leave-active{
            transition: all 1s;
        }
        .showcover-enter,.showcover-leave-active{
            opacity: 0;
        }
        .models{
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            background: rgba($color: #000000, $alpha: .3);
            transition: all 1s;
        }
        
}
</style>

