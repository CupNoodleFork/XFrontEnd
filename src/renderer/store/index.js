import Vue from 'vue'
import Vuex from 'vuex'
import account from './AccountStore';
import base from './BaseStore';
import project from './ProjectStore'

Vue.use(Vuex);

const state = {
  count: 0
};

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  }
};

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
};

const store = new Vuex.Store({
    modules: {
        account,
        base,
        project
    }
});

export default store
