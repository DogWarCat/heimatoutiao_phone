import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/Layout')
const Article = () => import('@/views/article/Article')
const Home = () => import('@/views/home/Home')
const Login = () => import('@/views/login/Login')
const Question = () => import('@/views/question/Question')
const Search = () => import('@/views/search/Search')
const result = () => import('@/views/search/result')
const User = () => import('@/views/user/User')
const chat = () => import('@/views/user/chat')
const profile = () => import('@/views/user/profile')
const Video = () => import('@/views/video/Video')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [{
      name: 'home-index',
      path: '',
      component: Home
    },
    {
      name: 'question-index',
      path: '/question',
      component: Question
    },
    {
      name: 'video-index',
      path: '/video',
      component: Video
    },
    {
      name: 'user-index',
      path: '/user',
      component: User
    }]
  },
  {
    name: 'user-profile',
    path: '/user/profile',
    component: profile
  },
  {
    name: 'user-chat',
    path: '/user/chat',
    component: chat
  },
  {
    name: 'login-index',
    path: '/login',
    component: Login
  },
  {
    name: 'search-index',
    path: '/search',
    component: Search
  },
  {
    name: 'search-result',
    path: '/search/result',
    component: result
  },
  {
    name: 'search-article',
    path: '/search/article',
    component: Article
  }
]

const router = new VueRouter({
  routes
})

export default router
