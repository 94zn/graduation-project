import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import login from '@/components/login'
import register from '@/components/register'
import admin from '@/components/admin/admin'
import adminLogin from '@/components/admin/adminLogin'
import adminorder from '@/components/admin/adminorder'
import users from '@/components/admin/userList'
import products from '@/components/admin/products'
import add from '@/components/admin/addproduct'
import html from '@/components/class/html'
import css from '@/components/class/css'
import culture from '@/components/class/culture'
import js from '@/components/class/javascript'
import nosql from '@/components/class/nosql'
import mysql from '@/components/class/mysql'
import science from '@/components/class/science'
import all from '@/components/class/all'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        { path:'/all',component:all},
        { path: '/html', component: html},
        { path: '/css', component: css},
        { path:'/js',component: js},
        { path: '/nosql', component: nosql},
        { path: '/mysql', component: mysql},
        { path:'/science',component: science},
        { path:'/culture',component: culture},
      ]
    },
    {
      path:'/login',
      name: 'login',
      component: login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/admin',
      name:'admin',
      component:admin,
      children:[
        { path: '/admin/order', component: adminorder},
        { path: '/admin/users', component: users},
        { path:'/admin/products',component: products},
        { path:'/admin/add',component:add}
      ]
    },
    {
      path:'/adminLogin',
      name:'adminLogin',
      component:adminLogin,

    }
  ]
})
