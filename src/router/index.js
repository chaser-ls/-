import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld' //@相当于 import HelloWorld from '../components/HelloWorld' @代表src下的内容
import hotshow from '@/views/hotshow'
import Top250 from '@/views/top250'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect:'/hotshow',
      children:[
        {
          path:"hotshow",
          name:'hotshow',
          component:hotshow
        },
        {
          path:"Top250",
          name:'Top250',
          component:Top250
        }
      ]
    },
  ]
})
