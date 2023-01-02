<template>
  <div class="main_container">
    <OdoqQuestionContainer></OdoqQuestionContainer>
    <OdoqWeekendTimerContainer></OdoqWeekendTimerContainer>
    <div class="verticalLine2"></div>
    <OdoqAnswerContainer></OdoqAnswerContainer>
  </div>
</template>

<script>
export default {
    data () {
        return {
            weekday: 1,
            onOffSeason: true,
        }
    }
}
</script>