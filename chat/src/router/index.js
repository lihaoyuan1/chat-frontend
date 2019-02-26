import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/login/login/login'
import Register from '../pages/login/register/register'
import Main from '../pages/main/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      children: [
        {
          path: 'register',
          name: 'register',
          component: Register
        }
      ]
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    }
  ]
})
