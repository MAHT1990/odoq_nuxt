<template>
  <div class="answer_container">
    <div class="answer_header">Answer.</div>
    <div class="answer_box">
      <input
        id="answer_input"
        v-model="inputAnswer"
        type="text"
        @keydown.enter="answerPost"
        @input="hideIcon">
    </div>
    <div class="answer_input_button_box">
      <div class="answer_button_box">
        <button
          v-if="canAnswersecondRemain > 0"
          id="answer_button"
          style="background-color: #b3b3b3; color: white;"
        >
          {{ calculatedRemainTime }}
        </button>
        <button
          v-else
          id="answer_button"
          @click="answerPost"
        >
          채점
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    userInfo: Object,
  },
  data() {
    return {
      inputAnswer: null,
      canAnswersecondRemain: null,
      canAnswerintervalId: null,
    }
  },
  computed: {
    calculatedRemainTime() {
      if (this.canAnswersecondRemain > 60) {
        const min = parseInt(this.canAnswersecondRemain / 60);
        return min + ' min.';
      }
      const sec = parseInt(this.canAnswersecondRemain % 60);
      return sec + ' sec.';
    }
  },
  watch: {
    canAnswersecondRemain(timeRemain) {
      if (timeRemain <= 0) {
        clearInterval(this.canAnswerintervalId)
      }
    },
    question: {
      handler: function (newQuestion) {
        // console.log('## OdoqAnswerContainer > watch reacted: ', newQuestion);
        this.timerStarter();
      },
      deep: true,
    },
    // 'question.can_answer_remain_time': {
    //   handler: function (timeRemain) {
    //     console.log('## OdoqAnswerContainer > watch reacted: ', timeRemain);
    //     if (timeRemain > 0) {
    //       this.timerStarter();
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  created() {
    this.timerStarter();
    // console.log('## OdoqAnswerContainer > created: ', this.question);
    // console.log(this.$store.getters['question/questionStore/question']);
  },
  methods: {
    answerPost: async function () {
      if (!this.userInfo.userId) {
        this.$popup.showAlertPopup('로그인이 필요합니다.');
        return;
      }
      if (!this.inputAnswer) {
        this.$popup.showAlertPopup('답을 입력해주세요.');
        return;
      }
      if (this.canAnswersecondRemain > 0) {
        this.$popup.showAlertPopup(`제출가능시간이 ${this.calculatedRemainTime} 남았습니다.`);
        return;
      }
      await this.$store.dispatch(
        'question/questionStore/postAnswer', {
          questionId: this.question.id,
          answer: this.inputAnswer,
          userId: this.userInfo.userId,
        }
      );
      await this.$store.dispatch(
        'question/questionStore/getAnswerHistory', {
          questionId: this.question.id,
          userId: this.userInfo.userId,
        }
      )
      new this.$popup.PopAnswerPost({
        propsData: {
          initValue: {
            question: this.question,
            answer: this.inputAnswer,
            userInfo: this.userInfo,
          },
          okCallback: (params) => {
            params.$destroy();
          }
        }
      }).$mount()
    },
    hideIcon: function (event) {
      const thisDom = event.target;
      if (thisDom.value === '') {
        thisDom.style.backgroundImage = "url(https://cdn2.iconfinder.com/data/icons/dottie-design-part-2/24/design_081-pencil-pen-draw-write-256.png)";
      } else {
        thisDom.style.backgroundImage = 'none';
      }
    },
    timerStarter() {
      if (this.question.can_answer_remain_time > 0) {
        // console.log('## OdoqAnswerContainer > timerStarter', this.question.can_answer_remain_time);
        this.canAnswersecondRemain = this.question.can_answer_remain_time;
        // Timer 시작.
        if (this.canAnswerintervalId) {
          clearInterval(this.canAnswerintervalId);
        }
        this.canAnswerintervalId = setInterval(() => {
            this.canAnswersecondRemain--
        }, 1000)
      } else {
        this.canAnswersecondRemain = 0;
      }
    },
  }
}
</script>

<style>

</style>
