import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import App from './App.vue'

// Pages
import Home from './pages/Home.vue'
import Subjects from './pages/Subjects.vue'
import SubjectDetail from './pages/SubjectDetail.vue'
import Careers from './pages/Careers.vue'
import CareerDetail from './pages/CareerDetail.vue'

// Configure axios defaults
axios.defaults.timeout = 10000

// Router configuration
const routes = [
  { path: '/', component: Home },
  { path: '/subjects', component: Subjects },
  { path: '/subject/:id', component: SubjectDetail },
  { path: '/careers', component: Careers },
  { path: '/career/:id', component: CareerDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Create and mount the app
const app = createApp(App)
app.use(router)
app.mount('#app')