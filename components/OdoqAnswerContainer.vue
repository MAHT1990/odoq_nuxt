<template>
    <div class="answer_container">
        <div class="answer_header">
            Answer.
        </div>
        <div class="answer_input_button_box">
            <div class="answer_button_box">
                <button id="answer_button" @click="answerPost">
                    enter.
                </button>
            </div>
            <div class="answer_box">
                <input
                id="answer_input"
                v-model="inputAnswer"
                type="text"
                @keydown.enter="answerPost"
                @input="hideIcon">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            inputAnswer : null,
        }
    },
    props: {
      questionAnswer: Number,
    },
    methods: {
        answerPost: function() {
          if(Number(this.inputAnswer) === this.questionAnswer) {
            alert('정답!, Popup이 뜰 거임.');
          } else {
            alert('틀렸을 때, Popup이 뜰 거임.');
          }
        },
        hideIcon: function(event) {
            const thisDom = event.target;
            if (thisDom.value === ''){
                thisDom.style.backgroundImage = "url(https://cdn2.iconfinder.com/data/icons/dottie-design-part-2/24/design_081-pencil-pen-draw-write-256.png)";
            }
            else {
                thisDom.style.backgroundImage = 'none';
            }
        }
    }
}
</script>

<style>

</style>
