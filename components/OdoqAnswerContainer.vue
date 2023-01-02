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
                v-model="answerValue"
                type="search" 
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
            answerValue : '',
        }
    },
    methods: {
        answerPost: function() {
            alert('answer function would be added')
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