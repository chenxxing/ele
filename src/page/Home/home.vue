<template>
    <div id="home">
        <header>
            <span>ele.me</span>
            <span>登录|注册</span>
            <span></span>
        </header>
        <nav class="city_nav">
            <div class="city_remind">
                <span>当前定位城市:</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <div class="city_name" @click="GoCity()">
                <a class="">{{guessCity.name}}</a>
                <i class="icon iconfont icon-gengduo"></i>
            </div>
        </nav>
        <section class="hot_city ty_city">
            <h4>热门城市</h4>
            <ul>
                <!-- <router-link tag="li" v-for="(item ,idx) in hotcity" :key="idx" :to="{path:'/city',query:{cityid:item.id,cityname:item.name}}">{{item.name}}</router-link> -->
                <router-link tag="li" v-for="(item ,idx) in hotcity" :key="idx" :to="'/city/' + item.id + '/' + item.name">{{item.name}}</router-link>
            </ul>
        </section>
        <section class="zm_city ty_city" v-for="(value, key, index) in sortgroupcity" :key="key">
            <h4>{{key}}<span v-if="index == 0">(按字母排序)</span></h4>
            <ul>
                <!-- <router-link tag="li" v-for="item in value" :key="item.id" :to="{path:'/city',query:{cityid:item.id,cityname:item.name}}">{{item.name}}</router-link> -->
                <router-link tag="li" v-for="item in value" :key="item.id" :to="'/city/' + item.id+ '/' + item.name">{{item.name}}</router-link>
            </ul>
        </section>   
    </div>
</template>

<script>
import {GroupCity,Guess,HotCity} from "@/service/getData"
export default {
    compnents:{},
    data(){
        return {
            guessCity: '',   //当前城市
            guessCityid: '', //当前城市id
            guessCityname:'',//当前城市名称
            hotcity: [],     //热门城市列表
            groupcity: {},   //所有城市列表
        }
    },
    mounted(){
        //获取所有城市
        GroupCity().then((res,err) => {
            if(res){
                this.groupcity = res.data;
                console.log(this.groupcity)
            }else{
                console.log(err)
            }
        })
        //当前按城市
        Guess().then((res,err) => {
            if(res){
                this.guessCity = res.data;
                this.guessCityname = res.data.name;
                this.guessCityid = res.data.id;
                console.log(this.guessCity,'guessCity')
            }else{
                console.log(err)
            }
        })
        //获取热门城市
        HotCity().then((res,err) => {
            if(res){
                this.hotcity = res.data;
                console.log(this.hotcity)
            }else{
                console.log(err)
            }
        })
        console.log(this)
    },
    computed:{
        sortgroupcity(){
            let sortobj = {};
            for(let i = 65; i <= 90; i++){
                //console.log(String.fromCharCode(i)) //A.B.C......
                if(this.groupcity[String.fromCharCode(i)]){
                    sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)]
                }
            }
            return sortobj
        }
    },
    methods:{
        GoCity(){
            this.$router.push({ name:'City', params: { cityid: this.guessCityid,cityname:this.guessCityname }})
        }
    }
}
</script>

<style lang="scss" scoped>
#home{
    width: 100%;
    padding-top: 90px;
    header{
        width: 100%;
        height: 90px;
        background: #3190e8;
        line-height: 90px;
        position: fixed;
        left: 0;
        top: 0;
        span{
            color: #fff;
            font-size: 28px;
        }
        span:nth-child(1){
            padding: 0 20px;
        }
        span:nth-child(2){
            float: right;
            padding: 0 20px;
        }
        span:nth-child(3){
            clear: both;
        }
    }
    .city_nav{
        margin-bottom: 25px;
        background: #fff;
        .city_remind{
            height: 90px;
            line-height: 90px;
            span:nth-child(1){
                font-size: 30px;
                color: #666;
                padding-left: 20px;
            }
            span:nth-child(2){
                font-size: 12px;
                color: #9f9f9f;
                float: right;
                padding-right: 20px;
            }
        }
        .city_name{
            display:inline-block;
            width: 100%;
            height: 90px;
            line-height: 90px;
            border-top: 1px solid #e4e4e4;
            border-bottom: 2px solid #e4e4e4;
            a{
                color: #3190e8;
                padding-left: 20px;
                font-size: 38px;
            }
            i{
                float: right;
                font-size: 20px;
                color: #999;
                margin-right: 20px;
            }
        }
    }
    .ty_city{
            background: #fff;
        h4{
            width: 100%;
            height: 80px;
            line-height: 80px;
            border-top: 2px solid #e4e4e4;
            border-bottom: 1px solid #e4e4e4;
            font-size: 30px;
            color: #666;
            padding-left: 20px;          
            span{
                font-size: 12px;
                color: #999;
            }  
        }
        ul{
            width: 100%;
            height: auto;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 25px;
            li{
                width: 25%;
                height: 90px;
                text-align: center;
                line-height: 90px;
                border-bottom: 0.5px solid #e4e4e4;
                border-right: 0.5px solid #e4e4e4;
                color: #3190e8;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .zm_city ul li{
        color: #666;
    }
}
</style>


