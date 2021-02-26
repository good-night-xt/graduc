import Vue from 'vue'
import Router from 'vue-router'

// 处理路径冗余问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
 return originalPush.call(this, location).catch(err => err)
}

const Home = () => import('../components/views/home/Home')
const Order = () => import('../components/views/order/Order')
const Travel = () => import('../components/views/travel/Travel')
const Profile = () => import('../components/views/profile/Profile')
const Login = () => import('../components/login/Login')
const Register = () => import('../components/login/Register')
const SubwaySearch = () => import('../components/views/home/homeChild/SubwaySearch')
const BusSearch = () => import('../components/views/home/homeChild/BusSearch')
const TicketSearch = () => import('../components/views/ticketSearch/TicketSearch')
const Info = () => import('../components/views/info/Info')
const Member = () => import('../components/views/member/Member')
const PayCode = () => import('../components/views/payCode/PayCode')
const PersonInfo = () => import('../components/views/personInfo/PersonInfo')
const TicketBuy = () => import('../components/views/ticketSearch/TicketBuy')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register,
    name: 'Register'
  },
  {
    path: '/home',
    component: Home,
    name: 'Home',
    redirect: '/home/subway',
    children: [
      {
        path: 'subway',
        component: SubwaySearch,
        name: 'SubwaySearch'
      },
      {
        path: 'bus',
        component: BusSearch,
        name: 'BusSearch'
      }
    ]
  },
  {
    path: '/order',
    component: Order,
    name: 'Order'
  },
  {
    path: '/travel',
    component: Travel,
    name: 'Travel'
  },
  {
    path: '/profile',
    component: Profile,
    name: 'Profile'
  },
  {
    path: '/ticketSearch',
    component: TicketSearch,
    name: 'TicketSearch'
  },
  {
    path: '/info',
    component: Info,
    name: 'Info'
  },
  {
    path: '/member',
    component: Member,
    name: 'Member'
  },
  {
    path: '/payCode',
    component: PayCode,
    name: 'PayCode'
  },
  {
    path: '/personInfo',
    component: PersonInfo,
    name: 'PersonInfo'
  },
  {
    path: '/ticketBuy',
    component: TicketBuy,
    name: 'TicketBuy'
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

// 路由守卫
router.beforeEach((to, from, next)=>{ 
  // 当前是否是跳转到登录页
  if(to.path === '/' || to.path === '/login' || to.path === '/register') {
    next()
  }else {
    // 判断是否有token值
    if(window.sessionStorage.getItem('localToken')) {  //有token值
      next()
    }else { //无token值
      next({path: '/'})
    }
  }
})

export default router