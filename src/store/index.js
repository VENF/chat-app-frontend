import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatState: true,
    accountState: false,
  },
  mutations: {
    chatM(state){
      state.chatState = !state.chatState;
      state.accountState = false;
    },
    accountM(state){
      state.accountState = !state.accountState;
      state.chatState = false;
    },
    User(state, data){
      state.user.name = data.name;
      state.user.userName = data.userName;
      state.user.email = data.email;
      state.user.lastName = data.lastName
    }
  },
  actions: {
  },
  modules: {
  }
})
