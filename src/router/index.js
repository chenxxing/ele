import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/page/Home/home')),'home')
const City = r => require.ensure([], () => r(require('@/page/City/city')),'city')
const Msite = r => require.ensure([], () => r(require('@/page/Msite/msite')),'msite')
const List = r => require.ensure([], () => r(require('@/page/Msite/children/list')),'list')
const My = r => require.ensure([], () => r(require('@/page/Msite/children/my')),'my')
const Order = r => require.ensure([], () => r(require('@/page/Msite/children/order')),'order')
const Search = r => require.ensure([], () => r(require('@/page/Msite/children/search')),'search')
const Food = r => require.ensure([],() => r(require('@/page/Food/food')),'food')

//import Home from '@/page/Home/home'
//import City from '@/page/City/city'
//import Msite from '@/page/Msite/msite'
var id = "520";
Vue.use(Router)

export default new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path:'/',
      redirect:'/home',
      component: Home
    },//这个是设置默认路由
    {
      //redirect:'/home',
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path:'/city/:cityid/:cityname',
      //path:`/city/${id}/${parseFloat(id)+794}`,
      name:'City',
      component:City
    },
    {
      path:'/msite',
      name:'Msite',
      component:Msite,
      children:[
        {
          path:'list',
          name:'List',
          component:List
        },
        {
          path:'my',
          name:'My',
          component:My
        },
        {
          path:'order',
          name:'Order',
          component:Order
        },
        {
          path:'search',
          name:'Search',
          component:Search
        },
      ]
    },
    {
      path:'/food',
      name:'Food',
      component:Food
    }
  ]
})
