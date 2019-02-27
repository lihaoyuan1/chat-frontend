import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/login/login/login'
import Register from '../pages/login/register/register'
import Main from '../pages/main/main'
import Message from '../pages/message/message'
import Friend from '../pages/friend/friend'
import Group from '../pages/group/group'
import Search from '../pages/search/search'
import Chat from '../pages/chat/chat'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
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
      component: Main,
      redirect: '/main/friend',
      children: [
        {
          path: 'message',
          name: 'message',
          component: Message
        },
        {
          path: 'friend',
          name: 'friend',
          component: Friend
        },
        {
          path: 'group',
          name: 'group',
          component: Group
        },
        {
          path: 'search',
          name: 'search',
          component: Search
        },
        {
          path: 'chat',
          name: 'chat',
          component: Chat
        }
      ]
    }
  ]
})
