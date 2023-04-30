<template>
  <div class="login_box_container">
    <div v-if="isLogin" class="login_box is_login">
      <div>
        <p><span>{{ userInfo.userName }}님</span><br>반갑습니다.</p>
      </div>
      <div class="login_box_buttons">
        <button @click="logout">로그아웃</button>
        <button @click="linkToMyPage">마이페이지</button>
      </div>
    </div>
    <div v-else class="login_box">
      <form action="">
        <div class="input_wrap">
          <label for="">EMAIL</label>
          <input
            v-model.lazy="input.email"
            type="text"
            placeholder="ODOQ ID"
            required
            @keyup.enter="userLogin"
          >
        </div>
        <div class="input_wrap">
          <label for="">PW</label>
          <input
          v-model.lazy="input.password"
          type="password"
          placeholder="PASSWORD"
          required
          @keyup.enter="userLogin"
        >
        </div>
      </form>
      <div class="login_box_buttons">
        <button @click="userLogin">로그인</button>
        <button @click="linkToSignUp">가입</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      input: {
        email: '',
        password: '',
      },
      message: {
        login: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
    })
  },
  methods: {
    async userLogin() {
      const that = this;
      const jwt = this.$utils.getCookie(document.cookie, 'jwt');
      const jwtGrade = jwt ? JSON.parse(atob(jwt.split('.')[1])).info.split('_')[1] : '';
      // console.log('OdoqLoginBox.vue: jwt: ', jwt);
      // console.log('OdoqLoginBox.vue: jwtGrade: ', jwtGrade);
      if (jwtGrade === '0' || jwtGrade === '1' || jwtGrade === '2') {
        that.$router.go(0);
      } else {
        that.message.login = '';
        if (!that.input.email) that.message.login = '아이디';
        if (!that.input.password) {
          if (that.message.login) that.message.login += ' / ';
          that.message.login += '비밀번호';
        }
        if (that.message.login === '') {
          const res = await that.$store.dispatch('user/userAuthStore/getUserInfo', that.input);
          if (res.result !== 'success') {
            that.$utils.removeCookie('jwt');
            that.message.login = res.message;
            that.$popup.showAlertPopup(that.message.login);
          } else {
            that.$store.dispatch('sms/smsStore/getAcceptSms', {
              userId: that.$store.getters['user/userAuthStore/userInfo'].userId,
            });
          }
        } else {
          that.message.login += '를 입력해주세요.';
          that.$popup.showAlertPopup(that.message.login);
        }
      }
    },
    linkToSignUp() {
      this.$router.push('/user/signup/')
    },
    linkToMyPage() {
      this.$popup.showAlertPopup('준비중입니다.');
    },
    logout() {
      this.$utils.removeCookie('jwt');
      this.$utils.removeCookie('lgn_tgt');
      this.$store.commit('user/userAuthStore/logOut');
    }
  }
}
</script>
