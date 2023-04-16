<template>
  <div class="main_container">
    <div class="tab_wrap">
      <span id="line"></span>
      <button @click="onTab(idx)"
              :id="item" v-for="(item, idx) in tabs"
              :key="item"
              :class="currentIdx === idx ? 'on' : ''"
      >{{item}}
      </button>
    </div>
    <div v-if="currentIdx === 0">
      <odoq-question-container
        v-show="isAvailable"
        :question="question"
        @nextQuestionLoadEvent="loadNext"
      />
      <odoq-weekend-timer-container
        v-show="!isAvailable"
        @nextQuestionLoadEvent="loadNext"
      />
      <div class="verticalLine2"></div>
      <div>{{ weekday }}</div>
      <odoq-answer-container
        v-show="isAvailable"
        :question="question"
        :user-info="userInfo"
      />
      <odoq-post-container/>
    </div>
    <odoq-footer/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      weekday: null,
      onOffSeason: true,
      content: 0,
      tabs: ['전체글', '공지', '인기글'],
      currentIdx: 0,
    }
  },
  computed: {
    ...mapGetters({
      availableDays: 'common/availableDays',
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
      question: 'question/questionStore/question',
    }),
    isAvailable() {
      return this.availableDays.includes(this.weekday);
    }
  },
  methods: {
    async loadNext() {
      this.weekday = new Date().getDay();
      await this.$store.dispatch('question/questionStore/getQuestion');
    },
    // onTab(e) {
    //   // this.tab = idx;
    //   const tab = e.target.id;
    //   console.log(tab);
    //   document.getElementById('line').style.width =
    //     e.target.offsetWidth + "px";
    //   document.getElementById('line').style.top =
    //     e.target.offsetTop + e.target.offsetHeight - 3 +"px";
    //   document.getElementById('line').style.left =
    //     e.target.offsetLeft + "px";
    //   if (tab === '전체글') {
    //     this.content = 0;
    //     console.log(this.content);
    //   } else if (tab === '공지') {
    //     this.content = 1;
    //     console.log(this.content);
    //   } else if (tab === '인기글') {
    //     this.content = 2;
    //     console.log(this.content);
    //   }
    // },
    onTab(idx) {
      this.currentIdx = idx;
    },
  },
  created() {
    this.weekday = new Date().getDay();
  }
}
</script>
