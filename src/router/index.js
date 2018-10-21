import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ShowPlayers from '@/components/ShowPlayers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ShowPlayers',
      name: 'ShowPlayers',
      component: ShowPlayers
    }
  ]
})
