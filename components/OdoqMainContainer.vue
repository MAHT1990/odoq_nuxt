<template>
  <div class="main_container">
    <div class="tab_wrap">
<!--      <span id="line"></span>-->
      <button @click="onTab(idx)" class="tab_btn"
              :id="item" v-for="(item, idx) in tabs"
              :key="item"
              :class="currentIdx === idx ? 'on' : ''"
      >{{item}}
      </button>
    </div>
<!--    <odoq-tabs @onTab="currentIdx = $event" />-->
    <div class="open_label" id="openLabel" @click="openTest" v-if="currentIdx === 0">
      <img src="data:image/svg+xml,%3Csvg width='45' height='68' viewBox='0 0 45 68' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.000419178 0H44.9085V38.1914L45 67.3638L22.4542 49.3991L22.4546 49.3989H22.4235L22.4474 49.412L0 67.362L0.0172961 49.3989H0.000419178V0Z' fill='%230051C8'/%3E%3C/svg%3E%0A" alt="문제접기">
      <div id="labelText">문제<br>접기</div>
    </div>
    <div>
      <div v-if="currentIdx === 0">
        <div class="hidden">
          <div id="questionContainer">
            <odoq-question-container
              v-show="isAvailable"
              :question="question"
              @nextQuestionLoadEvent="loadNext"
            />
            <odoq-answer-container
              v-show="isAvailable"
              :question="question"
              :user-info="userInfo"
            />
          </div>
        </div>
        <odoq-weekend-timer-container
          v-show="!isAvailable"
          @nextQuestionLoadEvent="loadNext"
        />
        <div class="verticalLine2"></div>
        <div>{{ weekday }}</div>
      </div>
      <div v-if="currentIdx === 0 || currentIdx === 1">
        <odoq-notice-list
          v-for="item in noticeList"
          :item="item"
          :key="item.title"
        />
      </div>
      <odoq-post-container v-if="currentIdx === 0"/>
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
      noticeList: [
        {
          title: '오독 4월 이벤트 담청자',
          content: '',
          updated_at: '2023-04-20',
          id: 5,
          img_url: null,
          user_id: 1,
          user_name: '운영자',
        },
        {
          title: '오독 출제진 모집!',
          content: '',
          updated_at: '2023-04-20',
          id: 5,
          img_url: null,
          user_id: 1,
          user_name: '운영자',
        },
      ],
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
    },
    isWriter() {
      return [1, 2].includes(this.userInfo.userGrade);
    }
  },
  methods: {
    async loadNext() {
      this.weekday = new Date().getDay();
      await this.$store.dispatch('question/questionStore/getQuestion');
    },
    onTab(idx) {
      this.currentIdx = idx;
    },
    openTest() {
      this.open = !this.open;
      const question = document.getElementById('questionContainer');
      const openBtn = document.getElementById('openLabel');
      if (this.open === true) {
        question.style.marginTop = '-100%';
        question.style.overflow = 'hidden';
        openBtn.firstChild.src = 'data:image/svg+xml,%3Csvg width=\'45\' height=\'68\' viewBox=\'0 0 45 68\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M0 0H44.9084V38.1722L45 67.3642L22.454 49.3994L22.4542 49.3993H22.4236L22.4475 49.4125L0 67.3626L0.0172968 49.3993H0V0Z\' fill=\'%239D9D9D\'/%3E%3C/svg%3E%0A';
        openBtn.lastChild.innerHTML = '문제<br>펼치기';
        openBtn.lastChild.color = '#0051c8';
        // document.getElementById('questionContainer').style.padding = '0 20px';
      } else {
        question.style.marginTop = '0';
        openBtn.firstChild.src = 'data:image/svg+xml,%3Csvg width=\'45\' height=\'68\' viewBox=\'0 0 45 68\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M0.000419178 0H44.9085V38.1914L45 67.3638L22.4542 49.3991L22.4546 49.3989H22.4235L22.4474 49.412L0 67.362L0.0172961 49.3989H0.000419178V0Z\' fill=\'%230051C8\'/%3E%3C/svg%3E%0A';
        openBtn.lastChild.innerHTML = '문제<br>접기';
        openBtn.lastChild.color = '#fff';
        // document.getElementById('questionContainer').style.padding = '0 20px 20px';
      }
    },
  },
  created() {
    this.weekday = new Date().getDay();
  }
}
</script>
