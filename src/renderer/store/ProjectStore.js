/**
 * @file $INfO$
 * @author zhangchaowei
 * @copyright QiYu Times Technology Ltd.
 * 2017/6/21
 * $END$
 */
import {remote} from 'electron';
const {getUserProjectList} = remote.getGlobal('cacheModule');

const state = {
    projectList: [],
    currentProject: {}
};

const mutations = {
    setProjectList(state, payload) {
        state.projectList = payload;
    }
};

const actions = {
    setProjectListFromCache({commit}, payload) {
        return new Promise((resolve, reject) => {
            getUserProjectList().then((result) => {
                commit('setProjectList', result);
                resolve();
            });
        });
    }
};

const getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}