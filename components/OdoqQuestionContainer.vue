<template>
    <div class="question_container">
        <div class="question_container_header">
            <p class="season_box">Season {{season}} #{{code}}</p>
            <p class="countdown_box"></p>
        </div>
        <div class="question_box">
            <img  v-if="hasImg" src="@/assets/img/testQuestion.jpg" alt="load Error">
            <img v-else src="@/assets/img/testQuestion2.jpg" alt="load Error">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hasImg: true,
            season: 1,
            code: 222,
        }
    }
}
</script>