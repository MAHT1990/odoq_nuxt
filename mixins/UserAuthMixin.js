import Utils from '@/plugins/utils';

// const LOGIN_TARGET = 'lgn_tgt';

/**
 * 로그인 여부
 * 로그인 중인 유저의 정보
 */

export default {
  data: () => ({
    userId: null,
    userGrade: null,
    isNormalUser: null,
  }),
  /**
   * request에서 JWT를 확인하여 로그인 상태를 확인한다.
   * 회원가입후 자동로그인의 경우, req.headers를 얻을 수 없다.
   */
  asyncData({ store, req }){
    try {
      const cookie = req? req.headers.cookie : document.cookie;
      if (!Utils.getCookie(cookie, 'jwt')) return;
      store.commit('user/userAuthStore/checkLogin', { isLogin: true, cookie });
    } catch (TypeError) {
    }
  },
}
