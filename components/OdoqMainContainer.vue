<template>
  <div class="main_container">
    <OdoqQuestionContainer></OdoqQuestionContainer>
    <OdoqWeekendTimerContainer></OdoqWeekendTimerContainer>
    <div class="verticalLine2"></div>
    <div>오오오 로그인했너</div>
    <OdoqAnswerContainer></OdoqAnswerContainer>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data () {
        return {
            weekday: 1,
            onOffSeason: true,
        }
    },
    computed: {
      ...mapGetters({
        isLogin: 'user/userAuthStore/isLogin'
      })
    }
}
</script>
