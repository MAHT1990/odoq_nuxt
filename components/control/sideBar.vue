<template>
  <div class="side_bar">
    <div class="side_bar_title">오늘의 질문</div>
    <div class="side_bar_question">
      <div class="side_bar_question_title">오늘의 질문</div>
      <div class="side_bar_question_content">오늘의 질문 내용</div>
    </div>
    <div class="side_bar_answer">
      <div class="side_bar_answer_title">오늘의 답변</div>
      <div class="side_bar_answer_content">오늘의 답변 내용</div>
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "sideBar"
}
</script>

<style scoped>
  .side_bar {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 10px;
  }

  .side_bar_title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .side_bar_question {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .side_bar_question_title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .side_bar_question_content {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .side_bar_answer {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
  }

  .side_bar_answer_title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .side_bar_answer_content {
    font-size: 15px;
    margin-bottom: 10px;
  }
</style>
