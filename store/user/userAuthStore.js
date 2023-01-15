import Utils from '@/plugins/utils';

const state = function () {
    return {
        loginResult: {
          userId: '',
          userName: '',
          userGrade: '',
        },
        createResult: {},
        isLogin: false,
    }
};

const actions = {
    async createUser( { commit }, data) {
      const res = await this.$axios.post('user/signup/create/', data)
      commit('setCreateResult', res.data)
    },
    async sendSMSAuth(context, data) {
      const res = await this.$axios.post('user/signup/send_sms_auth/', data)
      return res.data
    },
    async verifySMSAuth(context, data) {
      const res = await this.$axios.post('user/signup/verify_sms_auth/', data)
      return res.data
    },
    async getUserInfo({ commit }, data) {
        const res = await this.$axios.post('user/login/', data);
        await commit('setUserInfo', res.data);
    },
};

const mutations = {
    setCreateResult(state, resData) {
      state.createResult = resData
      if(resData.result === 'success' && resData.data.token) {
        Utils.addCookie('jwt', resData.data.token, 999999999999)
        Utils.removeCookie('lgn_tgt')
        Utils.removeCookie('jwtNonMember')
        state.isLogin = true;
        state.loginResult.userId = Utils.getUserIdByJwt(resData.data.token);
        state.loginResult.userName = Utils.getUserNameByJwt(resData.data.token);
        state.loginResult.userGrade = Utils.getUserGradeByJwt(resData.data.token);
        console.log('afterCreation loginResult is ', state.loginResult);
      }
      if(resData.result === 'error') Utils.removeCookie('csrf')
    },
    setUserInfo(state, resData) {
        state.loginResult = resData;
        if (resData.result === 'success') {
            Utils.addCookie('jwt', resData.data.token, 999999999999);
            state.isLogin = true;
            state.loginResult.userId = Utils.getUserIdByJwt(resData.data.token);
            state.loginResult.userName = Utils.getUserNameByJwt(resData.data.token);
            state.loginResult.userGrade = Utils.getUserGradeByJwt(resData.data.token);
        }
        if (resData.result === 'error') Utils.removeCookie('csrf');
    },
    checkLogin(state, {isLogin, cookie}) {
        state.isLogin = isLogin;
        state.loginResult.userId = Utils.getUserId(cookie);
        state.loginResult.userName = Utils.getUserName(cookie);
        state.loginResult.userGrade = Utils.getUserGrade(cookie);
        console.log('cookie is ', cookie);
        console.log('loginResult is ', state.loginResult);
    },
};

const getters = {
    createResult: (state) => state.createResult,
    loginResult: (state) => state.loginResult,
    isLogin: (state) => state.isLogin,
};

export default {
    state,
    actions,
    mutations,
    getters,
}
