<template>
    <div id="CiTy"> 
        <header>
            <span class="icon iconfont icon-fanhui" @click="$router.go(-1)"></span>
            <span>{{cityname}}</span>
            <span><router-link to="/home" slot="changecity" class="change_city">切换城市</router-link></span>
        </header>
        <div class="seach_content">
            <div class="Serch_input">
                <input type="text" class="Key_Word" placeholder="请输入学校、商务楼地址" v-model="inputvalue">
            </div>
            <div class="btn_serch">
                <input type="submit"  class="city_submit" value="提交" @click="postpois">
            </div>
            <div class="serch_history" v-if="historytitle">
                <p>搜索历史</p>
            </div>
            <div class="seach_list">
                <ul>
                    <li v-for="(item,idx) in placelist" :key="idx" @click="nextpage(idx,item.geohash)">
                        <h3>{{item.name}}</h3>
                        <p>{{item.address}}</p>
                    </li>
                </ul>
            </div>
            <footer v-if="historytitle&&placelist.length" @click="clearall">清空所有</footer>
        </div>
    </div>
</template>

<script>
import {SeachList} from '../../service/getData'
import {getstore,setstore,removestore} from '../../config/mUtils'
import { constants } from 'fs';
export default {
    component:[],
    data(){
        return {
            cityid:'',
            cityname:'',
            historytitle:true,//默认显示搜索历史
            inputvalue:'',//搜索框列表
            placelist:[],//搜索城市地点列表
            placeHistory:[]//搜索历史列表

        }
    },
    mounted(){
        this.cityid = this.$route.params.cityid;
        this.cityname = this.$route.params.cityname;
        this.initData();
    },
    computed:{

    },
    methods:{
        initData(){
            if(getstore('placeHistory')){
                this.placelist = JSON.parse(getstore('placeHistory'))
            }else{
                this.placelist = [];
            }
        },
        postpois(){
            if(this.inputvalue){
                SeachList(this.cityid,this.inputvalue).then((res,err) => {
                    if(res){
                        this.historytitle = false;
                        this.placelist = res.data;
                    }
                })
            }
        },
        nextpage(idx,geohash){
            let history = getstore('placeHistory'); //取已存入的历史地点搜索信息
            let choosePlace = this.placelist[idx];// 取当前点击的地点信息
            console.log(history,choosePlace);
            if(history){ //如果有历史搜索信息
                let flag = false;
                this.placeHistory = JSON.parse(history); //让placeHistory等于历史搜索信息
                this.placeHistory.forEach(element => { //循环与当前点击的geohash 比较
                    if(element.geohash == geohash){   //相等不做存储
                        flag = true;
                    }
                });
                if(!flag){   //不相等时
                    this.placeHistory.push(choosePlace);
                }
            }else{
                this.placeHistory.push(choosePlace)
            }
            setstore('placeHistory',this.placeHistory)
            this.$router.push({path:'/msite/list',query:{geohash}})
        },
        clearall(){
            removestore('placeHistory');
            this.initData();
        }
    }
}
</script>

<style lang='scss' scoped>
#CiTy{
    padding-top: 90px;
    header{
        width: 100%;
        height: 90px;
        background: #3190e8;
        line-height: 90px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        left: 0;
        top: 0;
        span{
            color: #fff;
            font-size: 28px;
        }
        span:nth-child(1){
            padding-left: 20px;
        }
        span:nth-child(2){
            font-size: 36px;
        }
        span:nth-child(3) a{
            padding-right: 20px;
            color: #fff;
            font-size: 28px;
        }
    }
    .seach_content{
        height: calc(100% - 90px);
        overflow: auto;
        .Serch_input{
            text-align: center;
            background: #fff;
            margin-top: 20px;
            border-top: 1px solid #e4e4e4;
            line-height: 110px;
            .Key_Word{
                width: 90%;
                height: 80px;
                border: 1px solid #6d6363;
                border-radius: 5px;
                font-size: 26px;
                padding-left: 10px;
            }
        }
        .btn_serch{
            background: #fff;
            border-bottom: 1px solid #e4e4e4;
            text-align: center;
            line-height: 110px;
            .city_submit{
                width: 90%;
                height: 80px;
                background: #3190e8;
                border-radius: 5px;
                color: #fff;
                font-size: 28px;
                letter-spacing: 5px;
                outline: none;
            }
        }
        .serch_history p{
            width: 90%;
            margin: 0 auto;
        }
        .seach_list{
            background: #fff;
            overflow: auto;
            ul{
                width: 90%;
                margin: 0 auto;
                li{
                    margin-top: 32px;
                    border-bottom: 1px solid #e4e4e4;
                    h3{
                        font-size: 32px;
                        color: #333;
                        margin: 20px 0;
                    }
                    p{
                        font-size: 14px;
                        color: #999;
                        margin: 25px 0;
                    }
                }
            }
        }
        footer{
            line-height: 80px;
            text-align: center;
            font-size: 28px;
            background: #fff;
            letter-spacing: 3px;
        }
    }
}
</style>


