<template>
    <div id="List">
        <header>
           <i class="icon iconfont icon-search" @click="$router.push({path:'/msite/search'})"></i>
           <span class="loaction">武汉市洪山区光谷软件园</span>
           <div class="login">
               <span>登录</span>
               <span>|</span>
               <span>注册</span>
           </div>
       </header>
       <div class="content">
            <nav class="list" >
                  <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in navlist" :key="'slide' + index">
                            <ul>
                                <router-link tag="li" :to="{path:'/food',query:{geohash,headtitle:items.title,restaurant_category_id:getCategoryId(items.link)}}" v-for="items in item" :key="'nav' + items.id">
                                    <img :src="imgBaseUrl + items.image_url" alt="">
                                    <span>{{items.title}}</span>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </nav>
            <div class="Nearbymerchants">
                <i class="icon iconfont icon-tubiaolunkuo-"></i>
                <span>附近商家</span>
            </div>
            <div class="business_list">
                <ul>
                    <li v-for="(item,idx) in shopListArr" :key="'info' + idx">
                        <img :src="imgBaseUrls + item.image_path" alt="">
                        <div class="title">
                            <div class="brand">
                                <span>品牌</span>
                                <span>{{item.name}}</span>
                            </div>
                            <div class="score">
                                <rating :rating="item.rating" @eventname='aaa'></rating>
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
       </div>
    </div>
</template>

<script>
import {msiteFoodTypes,restaurants} from '@/service/getData'
import rating from '@/components/rating/rating'
import '@/plugins/swiper.min.js'
import '@/styles/swiper.min.css'
import { constants } from 'fs';
export default {
    components:{rating},
    data(){
        return {
            geohash:'',//city传过来的地址，
            navlist:[],
            imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
            shopListArr:[],
            imgBaseUrls: '//elm.cangdu.org/img/',
        }
    },
    mounted(){
        // this.$axios.get('/movie/top250').then((res) => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err)
        // })
        this.geohash = this.$route.query.geohash
        msiteFoodTypes(this.geohash).then(res => {
            let reslength = res.data.length;
            let pagenum = Math.ceil(reslength/8)   // 总页数 一页8个
            let listarr = [];
            for(let i =0 , k = 0;i<pagenum;i++ , k+=8){
                listarr[i] = res.data.slice(k,k + 8);
            }
            this.navlist = listarr;
        }).then(() => {
        	new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
                loop: true,
                // autoplay: {
                //     delay: 3000,
                //     stopOnLastSlide: false,
                //     disableOnInteraction: true,
                // },
		    });
        })
        restaurants().then((res) => {
            this.shopListArr = res.data;
            console.log(this.shopListArr)
        })
    },
    computed:{

    },
    methods:{
        getCategoryId(url){
            let urldata = decodeURIComponent(url.split('=')[1].replace('&target_name',''))
            //"{"category_schema":{"category_name":"\u751c\u54c1\u996e\u54c1","complex_category_ids":[240,241,242],"is_show_all_category":true},"restaurant_category_id":{"id":239,"name":"\u751c\u54c1\u996e\u54c1","sub_categories":[],"image_url":""},"activities":[]}"
            if (/restaurant_category_id/gi.test(urldata)) {
    			return JSON.parse(urldata).restaurant_category_id.id
    		}else{
    			return ''
    		}
        },
        aaa(data){
            console.log('我接收到子组件的信息为=' + data)
        }
        
    }
}
</script>

<style lang="scss" scoped>
#List{
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
        z-index: 999;
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
    .content{
        width: 100%;
        padding-top: 90px;
        .list{
            width: 100%;
            height: 360px;
            background: #fff;
            border-bottom: 1px solid #e4e4e4;
            .swiper-container{
                width: 100%;
                height: 100%;
                .swiper-wrapper{
                    width: 100%;
                    .swiper-slide{
                        width: 100%;
                        ul{
                            display: flex;
                            align-items: flex-start;
                            justify-content: flex-start;
                            flex-wrap: wrap;
                            width: 100%;
                            height: 100%;
                            li{
                                width: 25%;
                                height: 50%;
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                img{
                                    width: 45%;
                                    height: 50%;
                                }
                                span{
                                    font-size: 28px;
                                }
                            }
                        }
                    }
                }
                .swiper-pagination{
                    width: 100%;
                    span{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
        .Nearbymerchants{
            width: 100%;
            height: 90px;
            padding-left: 20px;
            line-height: 90px;
            letter-spacing: 2px;
            background: #fff;
            margin-top: 20px;
            i{
                font-size: 32px;
                color: #222;
            }
            span{
                font-size: 28px;
                color: #333;
            }
        }
        .business_list{
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
    }
}
</style>
