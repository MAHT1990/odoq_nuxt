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
  /**
   * 회원가입 action
   * @param {Object} data - 회원가입정보
   */
  async createUser({commit}, data) {
    const res = await this.$axios.post('user/signup/create/', data)
    commit('setCreateResult', res.data)
  },

  /**
   * 휴대폰에 인증번호 보내기
   * @param {Object} data - 휴대폰 번호
   * @return {Object} res.data
   */
  async sendSMSAuth(context, data) {
    const res = await this.$axios.post('user/signup/send_sms_auth/', data)
    return res.data
  },

  /**
   * 입력한 인증번호 인증
   * @param {Object} data - 휴대폰 번호, 입력 인증번호
   * @return {Object} res.data
   */
  async verifySMSAuth(context, data) {
    const res = await this.$axios.post('user/signup/verify_sms_auth/', data)
    return res.data
  },
  /**
   * 로그인을 통해 회원정보에 해당하는 jwt를 가져와 commit
   * @param {Object} data - 회원 이메일, 비밀번호
   */
  async getUserInfo({commit}, data) {
    const res = await this.$axios.post('user/login/', data);
    await commit('setUserInfo', res.data);
  },
};

const mutations = {
  /**
   * 회원가입에 의한 JWT 정보를 가지고 cookie에 담아주고, state를 변화.
   * @param {Object} resData - action : createUser에 의한 mutation 정보
   */
  setCreateResult(state, resData) {
    state.createResult = resData
    if (resData.result === 'success' && resData.data.token) {
      Utils.addCookie('jwt', resData.data.token, 999999999999)
      Utils.removeCookie('lgn_tgt')
      Utils.removeCookie('jwtNonMember')
      state.loginResult.userId = Utils.getUserIdByJwt(resData.data.token);
      state.loginResult.userName = Utils.getUserNameByJwt(resData.data.token);
      state.loginResult.userGrade = Utils.getUserGradeByJwt(resData.data.token);
    }
    if (resData.result === 'error') Utils.removeCookie('csrf')
  },
  /**
   * 로그인 -> actions : getUserInfo 에 의한 token 정보를 가져와 세팅.
   * @param state - mutation 기본 인자
   * @param resData - getUserInfo 에 의한 응답 data
   */
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
  /**
   * 어플을 다시 켰을 때, 자동 로그인 : JWT 세팅 돼있는지 확인 후,
   * state.isLogin, 유저 정보 state에 반영.
   * @param state
   * @param isLogin - UserAuthMixin.js 에서 asyncData로 체크후, 넘겨줌.
   * @param cookie - UserAuthMixin.js 에서 asyncData로 체크후, 넘겨줌.
   */
  checkLogin(state, {isLogin, cookie}) {
    state.isLogin = isLogin;
    state.loginResult.userId = Utils.getUserId(cookie);
    state.loginResult.userName = Utils.getUserName(cookie);
    state.loginResult.userGrade = Utils.getUserGrade(cookie);
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
