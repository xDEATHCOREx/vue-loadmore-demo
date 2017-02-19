import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import List from 'components/List'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'lists',
      component: List,
      redirect: '/list/1'
    },
    {
      path: '/list/:pageNum',
      name: 'list',
      component: List
    },
    {
    	 path: '/hello',
      name: 'Hello',
      component: Hello,
    }
  ]
})
