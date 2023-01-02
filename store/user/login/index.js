import Utils from '@/plugins/utils';

const state = function () {
    return {
        result: {},
    }
};

const actions = {
    async getUserInfo({ commit }, data) {
        const res = await this.$axios.post('user/login', data);
        await commit('setUserInfo', res.data);
    },
    linkTestAction({ commit }) {
        alert('testtest')
    }
}

const mutations = {
    setUserInfo(state, res) {
        state.result = res;
        if (res.result === 'success') {
            Utils.addCookie('jwt', res.data.token, 999999999999);
        }
        if (res.result === 'error') Utils.removeCookie('csrf');
    }
}

const getters = {
    result: (state) => state.result,
}

export default {
    state,
    actions,
    mutations,
    getters,
}