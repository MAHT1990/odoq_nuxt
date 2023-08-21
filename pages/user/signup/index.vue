<template>
  <div class="user_creation_form_container">
    <header>
      <!-- <img src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.875 19.3001L4.27502 12.7001C4.17502 12.6001 4.10402 12.4917 4.06202 12.3751C4.02002 12.2584 3.99935 12.1334 4.00002 12.0001C4.00002 11.8667 4.02102 11.7417 4.06302 11.6251C4.10502 11.5084 4.17568 11.4001 4.27502 11.3001L10.875 4.70006C11.0583 4.51673 11.2877 4.42106 11.563 4.41306C11.8383 4.40506 12.0757 4.50073 12.275 4.70006C12.475 4.88339 12.5793 5.11273 12.588 5.38806C12.5967 5.66339 12.5007 5.90073 12.3 6.10006L7.40002 11.0001H18.575C18.8583 11.0001 19.096 11.0961 19.288 11.2881C19.48 11.4801 19.5757 11.7174 19.575 12.0001C19.575 12.2834 19.4793 12.5211 19.288 12.7131C19.0967 12.9051 18.859 13.0007 18.575 13.0001H7.40002L12.3 17.9001C12.4833 18.0834 12.5793 18.3167 12.588 18.6001C12.5967 18.8834 12.5007 19.1167 12.3 19.3001C12.1167 19.5001 11.8833 19.6001 11.6 19.6001C11.3167 19.6001 11.075 19.5001 10.875 19.3001Z' fill='black'/%3E%3C/svg%3E%0A" alt="back"> -->
      <h1>SignIn</h1>
    </header>
    <!--    헤더 끝-->
    <!-- EMAIL -->
    <div class="input_wrap">
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
    </div>
    <span v-if="userInfo.email.message">{{ userInfo.email.message }}</span>
    <!-- PASSWORD -->
    <div class="input_wrap">
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
    </div>
    <span v-if="userInfo.password.message">{{ userInfo.password.message }}</span>
    <!-- PASSWORD RE -->
    <div class="input_wrap">
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
    </div>
    <span v-if="userInfo.password.message2">{{ userInfo.password.message2 }}</span>
    <!-- NICKNAME  -->
    <div class="input_wrap">
      <p class="title">{{ userInfo.name.text }}</p>
      <input
        id="name"
        v-model="userInfo.name.value"
        class="user_creation_form_container_input"
        type="text"
        placeholder="닉네임"
        name="name"
        @input="validationCheck"
      >
    </div>
    <span v-if="userInfo.name.message">{{ userInfo.name.message }}</span>
    <!-- PHONE NUMBER -->
    <div class="input_wrap">
      <p class="title">{{ userInfo.phone.text }}</p>
      <div class="flex space_between w_100">
        <input
          id="phone"
          v-model="userInfo.phone.value"
          class="user_creation_form_container_input"
          type="text"
          placeholder="'-'없이 숫자만 입력"
          name="phone"
          @input="validationCheck"
        >
        <a @click="sendSMSAuth" class="code_btn">인증번호받기</a>
      </div>
    </div>
    <span v-if="userInfo.phone.message">{{ userInfo.phone.message }}</span>
    <!-- CODE -->
    <div class="input_wrap">
      <p></p>
      <div class="flex space_between w_100">
        <input
          id="authNumber"
          v-model="userInfo.authNumber.value"
          class="user_creation_form_container_input"
          type="text"
          placeholder="인증번호"
          name="authNumber"
          @input="validationCheck"
        >
        <a @click="verifySMSAuth" class="code_btn">인증하기</a>
      </div>
    </div>
    <span v-if="userInfo.authNumber.message">{{ userInfo.authNumber.message }}</span>
    <!-- AGREEMENT -->
    <div class="agreement_wrap">
      <div v-for="(agreement, i) in agreements.arrayAgreements" :key="i" class="flex space_between">
        <div class="flex">
          <div>
            <input
              :id="agreement.value"
              v-model="agreements.arrayAgreementsChecked"
              class="user_creation_form_checkbox"
              type="checkbox"
              :value="agreement.value"
            >
            <label :for="agreement.value"/>
          </div>
          <div class="agreement_text">
            {{ agreement.text }}
          </div>
        </div>
        <div class="agree_detail">
          <a @click="popTerms(agreement.title)">자세히 보기</a>
          <!--                <a class="gray_but_light" :id="i" v-on:click="popTerms(agreement.text, agreement.value)">자세히 보기</a>-->
        </div>
      </div>
    </div>
    <div>
      <div class="flex">
        <input
          id="agreementAll"
          v-model="allCheck"
          class="user_creation_form_checkbox"
          type="checkbox"
        >
        <label for="agreementAll"/>
        <div class="agreement_text">약관 전체 동의</div>
      </div>
    </div>
    <span v-if="agreements.agreementMessage">{{ agreements.agreementMessage }}</span>

    <button class="join_btn">
      <a
        @click.prevent="createUserInfo"
      >가입하기</a>
    </button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data: () => ({
    userInfo: {
      email: {text: '이메일', value: '', message: ''},
      password: {text: '비밀번호', value: '', message: ''},
      name: {text: '닉네임', value: '', message: ''},
      phone: {text: '전화 번호', value: '', message: ''},
      authNumber: {text: '인증번호', value: '', message: ''},
    },
    passwordConfirm: '',
    isPhoneNumbAuth: false,
    agreements: {
      arrayAgreements: [
        {
          text: '이용약관(필수)',
          value: 'terms',
          title: '이용약관',
        },
        {
          text: '개인정보수집이용동의(필수)',
          value: 'privacy',
          title: '개인정보 취급방침',
        },
      ],
      arrayAgreementsChecked: [],
      agreementMessage: '',
    },
    registAllow: true,
  }),
//   async fetch({ store }) {
//     await store.dispatch('common/getAgreements', ['terms', 'privacy', 'third']);
//   },
  computed: {
    allCheck: {
      get() {
        return this.agreements.arrayAgreements ?
          this.agreements.arrayAgreementsChecked.length === this.agreements.arrayAgreements.length : false;
      },
      set(v) {
        const arrayAgreementsChecked = [];
        if (v) {
          this.agreements.arrayAgreements.forEach((agreement) => {
            arrayAgreementsChecked.push(agreement.value);
          });
        }
        this.agreements.arrayAgreementsChecked = arrayAgreementsChecked;
      },
    },
    ...mapGetters({
      createResult: `user/userAuthStore/createResult`,
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
        const isNum = that[id] ? that[id].search(/[0-9]/g) > -1 : false;
        const isEng = that[id] ? that[id].search(/[a-zA-Z]/g) > -1 : false;
        const isSpe = that[id] ? that[id].search(/[`~!@#$%^&*|₩₩₩'₩";:₩/?]/gi) > -1 : false;
        const isWhi = that[id] ? that[id].search(/\s/g) > -1 : false;
        if (id === 'password' && (!isNum || !isEng || !isSpe || isWhi)) {
          that.userInfo.password.message = '공백을 제외한 비밀번호를 영문, 숫자, 특수문자를 조합하여 8자 이상으로 입력해주세요.';
        } else if (that.userInfo.password.value !== that[id] && id === 'passwordConfirm') {
          that.userInfo.password.message2 = '비밀번호가 일치하지 않습니다.';
        } else {
          that.userInfo.password.message = '';
          that.userInfo.password.message2 = '';
        }
      }
      if (id === 'name') {
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
    popTerms(agreementTitle) {
      new this.$popup.PopTerms({
        propsData: {
          title: agreementTitle,
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
        that.$popup.showAlertPopup('전화번호 인증을 해주세요.');
        that.registAllow = false;
      }
      if (that.registAllow === true) {
        if (that.agreements.arrayAgreementsChecked.includes('terms') &&
            that.agreements.arrayAgreementsChecked.includes('privacy')) {
          that.agreements.agreementMessage = '';
          const userInfo = {};
          Object.keys(that.userInfo).forEach((key) => {
            userInfo[key] = that.userInfo[key].value;
          });
          await that.$store.dispatch('user/userAuthStore/createUser', userInfo);
          if (that.createResult.result === 'success') {
            new that.$popup.PopUserRegistCompleted({
              propsData: {
                name: that.userInfo.name.value,
                okCallback(params) {
                  params.$destroy();
                  that.$router.replace({path: '/'});
                },
              },
            }).$mount();
          } else {
            that.$popup.showAlertPopup(that.createResult.message);
          }
        } else {
          that.agreements.agreementMessage = '필수 약관에 동의해주세요.';
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
      const result = await this.$store.dispatch('user/userAuthStore/sendSMSAuth', data);
      if (result.result === 'success') {
        this.$popup.showAlertPopup('인증번호가 발송되었습니다. 입력창에 3분이내로 입력해주세요.');
      } else {
        this.$popup.showAlertPopup(result.message);
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
      const result = await this.$store.dispatch('user/userAuthStore/verifySMSAuth', data);
      // TODO : 스토어 심사를 위한 임시 인증 코드. 심사 후 삭제
      if (this.userInfo.authNumber.value === 'ODOQ73') {
        this.$popup.showAlertPopup('인증 되었습니다.');
        this.isPhoneNumbAuth = true;
      } else if (result.result === 'success') {
        this.$popup.showAlertPopup('인증 되었습니다.');
        this.isPhoneNumbAuth = true;
      } else {
        this.$popup.showAlertPopup(result.message);
        this.isPhoneNumbAuth = false;
      }
    },
  },
};
</script>
