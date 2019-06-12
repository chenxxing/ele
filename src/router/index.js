import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/page/Home/home')),'home')
const City = r => require.ensure([], () => r(require('@/page/City/city')),'city')
const Msite = r => require.ensure([], () => r(require('@/page/Msite/msite')),'msite')

//import Home from '@/page/Home/home'
//import City from '@/page/City/city'
//import Msite from '@/page/Msite/msite'

Vue.use(Router)

export default new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path:'/',
      redirect:'/home'
    },//这个是设置默认路由
    {
      //redirect:'/home',
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path:'/city/:cityid/:cityname',
      name:'City',
      component:City
    },
    {
      path:'/msite',
      name:'Msite',
      component:Msite
    }
  ]
})
