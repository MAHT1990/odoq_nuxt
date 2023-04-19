<template>
    <header>
<!--        <div class="header_pseudo_box">-->
<!--        </div>-->
        <div class="header_container">
          <div class="header_box">
            <Nuxt-Link to="">
              <h3>하루 한 문제!</h3>
              <h4>오돜!</h4>
            </Nuxt-Link>
<!--            <img src="@/assets/img/ODOQ_LOGO.png" alt="Odoq2.com">-->
            <div>
              <OdoqLoginBox></OdoqLoginBox>
            </div>
          </div>
<!--          <div class="sms_pseudo_container">-->
<!--            <div-->
<!--              class="sms_box"-->
<!--              @click="checkAcceptSms"-->
<!--              :style="isAcceptSms ? 'opacity: 1;' : 'opacity: 0.4'"-->
<!--            >-->
<!--              <img-->
<!--                src="@/assets/img/sms.png"-->
<!--                alt="sms알림"-->
<!--              >-->
<!--              <p>SMS</p>-->
<!--              <p>알 림</p>-->
<!--            </div>-->
<!--          </div>-->
        </div>
    </header>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed: {
    ...mapGetters({
      isAcceptSms: 'sms/smsStore/isAcceptSms',
    }),
  },
  methods: {
    async checkAcceptSms() {
      console.log('## checkAcceptSms button is pushed');
      console.log('## this.$store is ', this.$store);
      console.log('## this.$store.getters[\'user/userAuthStore/isLogin\']: ', this.$store.getters['user/userAuthStore/isLogin'])
      if (this.$store.getters['user/userAuthStore/isLogin']) {
        const res = await this.$store.dispatch('sms/smsStore/checkAcceptSms', {
          userId: this.$store.getters['user/userAuthStore/userInfo'].userId,
          acceptSms: !this.isAcceptSms,
        });

        if (res.result === 'success') {
          console.log('## this.isAcceptSms: ', this.isAcceptSms);
          this.$popup.showAlertPopup('SMS 알림이 ' + (this.isAcceptSms ? '설정' : '해제') + '되었습니다.');
        }
      }
    },
  }
}
</script>
