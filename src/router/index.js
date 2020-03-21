import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Notas from '../views/Notas.vue'
import EditNota from '../views/EditNota.vue'
import NewNota from '../views/NewNota.vue'
import Login from '../views/Login.vue'
import Registrar from '../views/Registrar.vue'
import Contactos from '../views/Contactos.vue'
import NewContacto from '../views/NewContacto.vue'
import EditContacto from '../views/EditContacto.vue'

import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {requiresAuth: true}
  },
  {
    path:'/registrar',
    name: 'Registrar',
    component: Registrar
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/notas',
    name: 'Notas',
    component: Notas,
    meta: {requiresAuth: true}
  },
  {
    path: '/EditNota/:_id?',
    name: 'EditNota',
    component: EditNota,
    meta: {requiresAuth: true}
  },
  {
    path: "/newNota",
    name: "NewNota",
    component: NewNota,
    meta: {requiresAuth: true}
  },
  {
    path: '/contactos',
    name: 'Contactos',
    component: Contactos,
    meta:{requiresAuth: true}
  },
  {
    path: '/newContacto',
    name: 'NewContacto',
    component: NewContacto,
    meta:{requiresAuth: true}
  },
  {
    //path: '/EditNota/:_id?',
    path: '/EditContacto/:_id?',
    name: 'EditContacto',
    component: EditContacto,
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve( async(to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
     //store.actions.auth

     const email = store.state.form.email
     //console.log(email)
     const response =  await store.dispatch("auth")
     //console.log("response: ",response)
    //  if(to.fullPath == '/login'){
    //     next({name: 'Notas'})
    //  }
      
     //debugger
    if(!response && to.fullPath != '/login') next({name:'Login'})
    else if(response && to.fullPath == '/login') next({name:'Notas'})
    else next()
    
    
  }else{
    next();
  }
})

export default router
