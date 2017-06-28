/**
 * @file $INfO$
 * @author zhangchaowei
 * @copyright QiYu Times Technology Ltd.
 * 2017/6/20
 * $END$
 */

const state = {
    profile: {}
};

const mutations = {
    setProfile(state, payload) {
        Object.assign(state.profile, payload);
    }
};

const actions = {

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