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
  beforeMount() {
    if (!Utils.getCookie(document.cookie, 'jwt')) return;
    console.log('UserAuthMixin beforeMount called ', document.cookie);

    this.$store.commit('user/userAuthStore/checkLogin', {isLogin: true, cookie: document.cookie});
  }
}
