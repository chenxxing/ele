<template>
    <div id="Search">
        <header>
           <i class="icon iconfont icon-fanhui" @click="$router.go(-1)"></i>
           <span class="loaction">搜索</span>
       </header>
       <div class="content">
           <div class="search">
                <input type="search" class="key_word" placeholder="请输入商家或美食名称" v-model="searchValue" @input="checkInput" />
                <input type="submit" class="btn_submit" value="提交" @click.prevent="submitvalue('')" />
           </div>
           <div class="isshow" v-if="searchHistory.length&&showHistory">
               <div class="search_history">搜索历史</div>
               <div class="history_list">
                   <ul>
                       <li v-for="(item,idx) in searchHistory" :key="'his' + idx" @click="submitvalue(item)" >
                           {{item}} 
                           <i class="icon iconfont icon-qingchu" @click.stop="deletthis(idx)" ></i>
                       </li>
                   </ul>
               </div>
               <div class="clear_history" @click="clearall()">清除所有历史</div>
           </div>
           <div class="commodity" v-if="restaurantList.length">
               <div class="business">商家</div>
               <div class="commodity_list">
                   <ul>
                       <li v-for="(item,idx) in restaurantList" :key="'res' + idx">
                            <img :src="imgBaseUrls + item.image_path" alt="">
                            <div class="detail">
                                <p>
                                    <span>{{item.name}}</span>
                                    <span>支付</span>
                                </p>
                                <p>月售{{item.recent_order_num}}单</p>
                                <p>{{item.float_minimum_order_amount}}远起送/距离{{item.distance}}</p>
                            </div>
                       </li>
                   </ul>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
import {getstore,setstore,removestore} from '../../../config/mUtils'
import {taurants} from 'src/service/getData'
export default {
    data(){
        return {
            searchHistory:[],//搜索历史列表
            restaurantList:[],//搜索结果列表
            showHistory:true,//是否显示搜索历史，返回商家列表就隐藏
            searchValue:null,//搜索框值
            imgBaseUrls: '//elm.cangdu.org/img/',  //图片地址
        }
    },
    mounted(){
        if(getstore('searchHistory')){
            this.searchHistory = JSON.parse(getstore('searchHistory'))//获取本地搜索历史
        }
    },
    computed:{

    },
    methods:{
         submitvalue(historyvalue){
             //点击搜索历史列表时搜索对应的商家
            if(historyvalue){
                this.searchValue = historyvalue;
            }else if(!this.searchValue){
                return ;
            }
            this.showHistory = false;//隐藏搜索历史列表

            taurants().then((res) => {
                this.restaurantList = res.data;
            })//获取商家列表
            let history = getstore("searchHistory");
            if(history){
                let flag = true;
                this.searchHistory = JSON.parse(history);
                this.searchHistory.forEach(item => {
                    if(item === this.searchValue){
                        flag = false;
                    }
                });
                if(flag){
                    this.searchHistory.push(this.searchValue)
                }
            }else{
                this.searchHistory.push(this.searchValue)
            }
            setstore('searchHistory',this.searchHistory)
        },
        //清除文本框值时
        checkInput(){
            if(this.searchValue == ""){
                this.showHistory = true;
                this.restaurantList = [];
            }
        },
        //删除对应的历史记录
        deletthis(idx){
            this.searchHistory.splice(idx,1);
            setstore('searchHistory',this.searchHistory);
        },
        //清除所有历史记录
        clearall(){
            this.searchHistory = [];
            setstore('searchHistory',this.searchHistory);
        }
    }
}
</script>

<style lang="scss" scoped>
#Search{
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
        .content{
            padding-top: 90px;
            width: 100%;
            .search{
                width: 100%;
                display: flex;
                align-items: center;
                background: #fff;
                height: 120px;
                input{
                    outline: none;
                }
                .key_word{
                    flex: 1;
                    border: 1px solid #e4e4e4;
                    font-size: 30px;
                    color: #333;
                    border-radius: 10px;
                    background-color: #f2f2f2;
                    font-weight: bold;
                    padding-left: 20px;
                    height: 75px;
                    margin-left: 20px;
                }
                .btn_submit{
                    background: #3190e8;
                    border: none;
                    padding: 0 40px;
                    height: 70px;
                    color: #fff;
                    margin: 0 20px;
                    font-size: 32px;
                    font-weight: bold;
                    border-radius: 10px;
                }
            }
            .isshow{
                width: 100%;
                .search_history{
                    height: 90px;
                    line-height: 90px;
                    padding-left: 20px;
                    font-size: 28px;
                    font-weight: bold;
                    color: #555;
                }
                .history_list{
                    width: 100%;
                    ul{
                        width: 100%;
                        li{
                            height: 90px;
                            line-height: 90px;
                            padding-left: 20px;
                            font-size: 30px;
                            background: #fff;
                            border-bottom: 1px solid #e4e4e4;
                            letter-spacing: 1px;
                            color: #333;
                            i{
                                float: right;
                                color: rgb(153, 153, 153);
                                font-weight: bold;
                                padding-right: 20px;
                                font-size: 13px;
                            }
                        }
                    }
                }
                .clear_history{
                    height: 90px;
                    line-height: 90px;
                    padding-left: 20px;
                    font-size: 28px;
                    font-weight: bold;
                    color: #3190e8;
                    text-align: center;
                    background: #fff;
                }
            }
            .commodity{
                width: 100%;
                .business{
                    height: 90px;
                    line-height: 90px;
                    padding-left: 20px;
                    font-size: 28px;
                    font-weight: bold;
                    color: #555;
                }
                .commodity_list{
                    width: 100%;
                    ul{
                        width: 100%;
                        padding-bottom: 90px;
                        li{
                            width: 100%;
                            background: #fff;
                            padding: 30px 20px;
                            display: flex;
                            img{
                                width: 126px;
                                height: 126px;
                            }
                            .detail{
                                margin-left: 20px;
                                p:nth-child(1){
                                    span:nth-child(1){
                                        color: #333;
                                        font-size: 28px;
                                    }
                                    span:nth-child(2){
                                        display: inline-block;
                                        width: 60px;
                                        height: 35px;
                                        border: 1px solid rgb(255, 96, 0);;
                                        border-radius: 5px;
                                        color: rgb(255, 96, 0);
                                        font-size: 24px;
                                        text-align: center;
                                        line-height: 35px;
                                        font-weight: bold;
                                    }
                                }
                                p:nth-child(2),p:nth-child(3){
                                    font-size: 28px;
                                    color: #333;
                                    margin-top: 8px;
                                }
                            }
                        }
                    }
                }
            }
        }
}
</style>
