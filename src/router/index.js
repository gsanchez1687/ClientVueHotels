import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminHotel from '@/views/AdminHotel'
import CreateHotel from '@/views/CreateHotel'
import ShowHotel from '@/views/ShowHotel'
import CreateRoom from '@/views/CreateRoom'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/AdminHotel',
    name: 'AdminHotel',
    component: AdminHotel
  },
  {
    path: '/CreateHotel',
    name: 'CreateHotel',
    component: CreateHotel
  },
  {
    path: '/CreateRoom/:id',
    name: 'CreateRoom',
    component: CreateRoom
  },
  {
    path: '/UpdateRoom/:id',
    name: 'UpdateRoom',
    component: CreateRoom
  },
  {
    path: '/ShowHotel/:id',
    name: 'ShowHotel',
    component: ShowHotel
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
