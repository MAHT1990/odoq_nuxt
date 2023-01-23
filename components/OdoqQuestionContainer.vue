<template>
  <div class="question_container">
    <div class="question_container_header">
      <p class="season_box">Season {{ question.season }} #{{ question.code }}</p>
      <p class="countdown_box"></p>
    </div>
    <div class="question_box">
      <img v-if="hasImg" :src="question.img_url" alt="load Error">
      <img v-else src="@/assets/img/testQuestion2.jpg" alt="load Error">
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      hasImg: true,
    }
  },
  computed: {
    ...mapGetters({
      question: 'question/questionStore/question',
    })
  },
}
</script>
