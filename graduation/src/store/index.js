import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

var state = {
  // 登录时拿到返回的用户个人数据
  userObj: null,
  // 用于保存拿到返回的搜索车票信息
  ticketList: [],
  // 保存当前用户的订单页数据
  userTicketLists: {}
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
