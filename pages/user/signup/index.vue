<template>
  <div class="user_creation_form_container">
    <div class="user_creation_form_header">
      <div class="user_creation_form_header_signin">
        SignIn
      </div>
    </div>
    <!--    헤더 끝-->
    <div>
      <p>{{ userInfo.email.text }}</p>
      <input
        id="email"
        v-model="userInfo.email.value"
        class="user_creation_form_container_input"
        type="text"
        placeholder="이메일를 입력해주세요."
        name="email"
        @input="validationCheck"
      >
      <ul v-if="userInfo.email.message">{{ userInfo.email.message }}</ul>
    </div>
    <div>
      <p>{{ userInfo.password.text }}</p>
      <input
        id="password"
        v-model="userInfo.password.value"
        class="user_creation_form_container_input"
        type="password"
        placeholder="비밀번호 (8자 이상의 영문, 숫자, 특수문자 조합)"
        name="password"
        :minlength="8"
        @input="validationCheck"
        @blur="validationCheck"
      >
      <ul v-if="userInfo.password.message">{{ userInfo.password.message }}</ul>
    </div>
    <div>
      <p></p>
      <input
        id="passwordConfirm"
        v-model="passwordConfirm"
        class="user_creation_form_container_input"
        type="password"
        placeholder="비밀번호 확인"
        :minlength="8"
        @input="validationCheck"
      >
      <ul v-if="userInfo.password.message2">{{ userInfo.password.message2 }}</ul>
    </div>
    <div>
      <p class="title">{{ userInfo.nickName.text }}</p>
      <input
        id="nickName"
        v-model="userInfo.nickName.value"
        class="user_creation_form_container_input"
        type="text"
        placeholder="닉네임"
        name="nickName"
        @input="validationCheck"
      >
      <ul v-if="userInfo.nickName.message">{{ userInfo.nickName.message }}</ul>
    </div>
    <div>
      <p class="title">{{ userInfo.phone.text }}</p>
      <div>
        <input
          id="phone"
          v-model="userInfo.phone.value"
          class="user_creation_form_container_input"
          type="text"
          placeholder="'-'없이 숫자만 입력"
          name="phone"
          @input="validationCheck"
        >
        <a @click="sendSMSAuth">인증번호 받기</a>
      </div>
      <ul v-if="userInfo.phone.message">{{ userInfo.phone.message }}</ul>
    </div>
    <div>
      <p></p>
      <div>
        <input
          id="authNumber"
          v-model="userInfo.authNumber.value"
          class="user_creation_form_container_input"
          type="text"
          placeholder="인증번호"
          name="authNumber"
          @input="validationCheck"
        >
        <a @click="verifySMSAuth">인증하기</a>
      </div>
      <ul v-if="userInfo.authNumber.message">{{ userInfo.authNumber.message }}</ul>
    </div>
    <div v-for="(agreement, i) in agreements" :key="i">
      <div>
        <input
          :id="agreement.value"
          v-model="checked"
          class="user_creation_form_checkbox"
          type="checkbox"
          :value="agreement.value"
        >
        <label :for="agreement.value"/>
      </div>
      <div>
        {{ agreement.text }}
      </div>
      <div>
        <nuxt-link
          class="gray_but_light"
          :to="agreement.path"
          target="_blank"
        >자세히 보기
        </nuxt-link>
        <!--                <a class="gray_but_light" :id="i" v-on:click="popTerms(agreement.text, agreement.value)">자세히 보기</a>-->
      </div>
    </div>
    <div>
      <div>
        <input
          id="agreementAll"
          v-model="allCheck"
          class="user_creation_form_checkbox"
          type="checkbox"
        >
        <label for="agreementAll"/>
        <div>약관 전체 동의</div>
      </div>
    </div>
    <div v-if="agreementMessage">{{ agreementMessage }}</div>

    <div>
      <a
        @click.prevent="createUserInfo"
      >가입하기</a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Popup from '@/components/popups/popup';

const prefix = 'user/signup';

export default {
  data: () => ({
    userInfo: {
      email: {text: '이메일', value: '', message: ''},
      password: {text: '비밀번호', value: '', message: ''},
      nickName: {text: '닉네임', value: '', message: ''},
      phone: {text: '전화 번호', value: '', message: ''},
      authNumber: {text: '인증번호', value: '', message: ''},
    },
    passwordConfirm: '',
    isPhoneNumbAuth: false,
    agreements: [
      {text: '이용약관(필수)', value: 'terms', path: '/agreement/terms'},
      {text: '개인정보수집이용동의(필수)', value: 'privacy', path: '/agreement/privacy'},
    ],
    arrayAgreementsChecked: [],
    agreementMessage: '',
    registAllow: true,
  }),
//   async fetch({ store }) {
//     await store.dispatch('common/getAgreements', ['terms', 'privacy', 'third']);
//   },
  computed: {
    allCheck: {
      get() {
        return this.agreements ? this.arrayAgreementsChecked.length === this.agreements.length : false;
      },
      set(value) {
        const arrayAgreementsChecked = [];
        if (value) {
          this.agreements.forEach((agreement) => {
            arrayAgreementsChecked.push(agreement.value);
          });
        }
        this.arrayAgreementsChecked = arrayAgreementsChecked;
      },
    },
    ...mapGetters({
      agreementObject: 'common/agreementObject',
      result: `${prefix}/result`,
    }),
  },
  watch: {
    /**
     * 전화번호 변경 시 인증 초기화
     */
    'userInfo.phone.value': {
      handler() {
        this.isPhoneNumbAuth = false;
      },
    },
  },
  methods: {
    validationPhone(phone) {
      const re = /^(?:01[016789]|02|0[3-9][0-9])[0-9]{3,4}[0-9]{4}$/;
      return re.test(phone);
    },
    validationEmail(email) {
      const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
      return re.test(email);
    },
    validationCheck(e) {
      const id = e.target.id;
      const that = this;
      if (id === 'email') {
        const emailValid = that.validationEmail(that.userInfo[id].value);
        if (emailValid === false) that.userInfo[id].message = '이메일이 올바르지 않습니다.';
        else that.userInfo[id].message = '';
      }
      if (id === 'passwordConfirm' || id === 'password') {
        if (id === 'password') {
          that[id] = that.userInfo.password.value;
        }
        const isNum = that[id] ? that[id].search(/[0-9]/) > -1 : false;
        const isEng = that[id] ? that[id].search(/[a-zA-Z]/) > -1 : false;
        const isSpe = that[id] ? that[id].search(/[`~!@#$%^&*|₩₩₩'₩";:₩/?]/i) > -1 : false;
        const isWhi = that[id] ? that[id].search(/\s/) > -1 : false;
        if (id === 'password' && (!isNum || !isEng || !isSpe || !isWhi)) {
          that.userInfo.password.message = '공백을 제외한 비밀번호를 영문, 숫자, 특수문자를 조합하여 8자 이상으로 입력해주세요.';
        } else if (that.userInfo.password.value !== that[id] && id === 'passwordConfirm') {
          that.userInfo.password.message2 = '비밀번호가 일치하지 않습니다.';
        } else {
          that.userInfo.password.message = '';
          that.userInfo.password.message2 = '';
        }
      }
      if (id === 'nickName') {
        if (!that.userInfo[id].value) that.userInfo[id].message = '닉네임을 입력해주세요.';
        else that.userInfo[id].message = '';
      }
      if (id === 'phone') {
        const phoneValid = that.validationPhone(that.userInfo[id].value);
        if (phoneValid === false) that.userInfo[id].message = '전화번호가 올바르지 않습니다.';
        else that.userInfo[id].message = '';
      }
      if (id === 'authNumber') {
        if (!that.userInfo[id].value) that.userInfo[id].message = '인증번호를 입력해주세요.';
        else that.userInfo[id].message = '';
      }
    },
    popTerms(agreementTypeStr, agreementType) {
      new Popup.Terms({
        propsData: {
          title: agreementTypeStr,
          message: this.agreementObject(agreementType).content,
          okCallback: (params) => params.$destroy(),
        },
      }).$mount();
    },
    async createUserInfo() {
      const that = this;
      const keys = Object.keys(that.userInfo);
      that.registAllow = true;
      keys.forEach((key) => {
        if (!that.userInfo[key].value) {
          that.userInfo[key].message = `${that.userInfo[key].text}(을)를 입력해주세요.`;
        }
        if (that.userInfo[key].message) {
          that.registAllow = false;
        }
      });
      if (!that.isPhoneNumbAuth) {
        this.popupAlert('전화번호 인증을 해주세요.');
        that.registAllow = false;
      }
      if (that.registAllow === true) {
        if (that.arrayAgreementsChecked.includes('terms') && that.arrayAgreementsChecked.includes('privacy')) {
          that.agreementMessage = '';
          const userInfo = {};
          Object.keys(that.userInfo).forEach((key) => {
            userInfo[key] = that.userInfo[key].value;
          });
          await this.$store.dispatch(`${prefix}/createUser`, userInfo);
          if (that.result.result === 'success') {
            new that.$popup.UserRegistCompleted({
              propsData: {
                signUpPoint: that.result.data.sign_up_point ? that.result.data.sign_up_point : 0,
                okCallback(params) {
                  params.$destroy();
                },
              },
            }).$mount();
            that.$router.replace({name: 'main'});
          } else {
            that.popupAlert(that.result.message);
          }
        } else {
          that.agreementMessage = '필수 약관에 동의해주세요.';
        }
      }
    },
    /**
     * SMS 인증번호 받기
     */
    async sendSMSAuth() {
      // check phone
      if (this.userInfo.phone.message) {
        return;
      }
      // send
      const data = {phone: this.userInfo.phone.value};
      const result = await this.$store.dispatch(`${prefix}/sendSMSAuth`, data);
      if (result.result === 'success') {
        this.popupAlert('인증번호가 발송되었습니다. 입력창에 3분이내로 입력해주세요.');
      } else {
        this.popupAlert(result.message);
      }
    },
    /**
     * SMS 인증 하기
     */
    async verifySMSAuth() {
      // check phone, auth number
      const phoneValid = this.validationPhone(this.userInfo.phone.value);
      if (phoneValid === false) {
        this.userInfo.phone.message = '전화번호가 올바르지 않습니다.';
        return;
      }
      this.userInfo.phone.message = '';

      if (!this.userInfo.authNumber.value) {
        this.userInfo.authNumber.message = '인증번호를 입력해주세요.';
        return;
      }
      this.userInfo.authNumber.message = '';

      // send
      const data = {phone: this.userInfo.phone.value, code: this.userInfo.authNumber.value};
      const result = await this.$store.dispatch(`${prefix}/verifySMSAuth`, data);
      // TODO : 스토어 심사를 위한 임시 인증 코드. 심사 후 삭제
      if (this.userInfo.authNumber.value === 'ODOQ73') {
        this.popupAlert('인증 되었습니다');
        this.isPhoneNumbAuth = true;
      } else if (result.result === 'success') {
        this.popupAlert('인증 되었습니다');
        this.isPhoneNumbAuth = true;
      } else {
        this.popupAlert(result.message);
        this.isPhoneNumbAuth = false;
      }
    },
    popupAlert(message) {
      new Popup.Alert({
        propsData: {
          title: message,
          okCallback: (params) => params.$destroy(),
        },
      }).$mount();
    },
  },
};
</script>
