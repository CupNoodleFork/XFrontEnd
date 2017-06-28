/**
 * @file $INfO$
 * @author zhangchaowei
 * @copyright QiYu Times Technology Ltd.
 * 2017/6/20
 * $END$
 */




const state = {
    snackbar: {
        instance: null,
        message: ''
    }
};

const mutations = {
    setSnackBar(state, payload) {
        state.snackbar.instance = payload;
    },
    openSnackBar(state, payload) {
        if (state.snackbar.instance) {
            state.snackbar.message = payload.message;
            state.snackbar.instance.open();
        }
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