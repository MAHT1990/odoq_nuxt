<template>
  <div class="main_container">
    <div class="tab_wrap">
      <button @click="onTab(idx)" class="tab_btn"
              :id="item" v-for="(item, idx) in tabs"
              :key="item"
              :class="currentIdx === idx ? 'on' : ''"
      >{{item}}
      </button>
    </div>
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
      </div>
      <odoq-answer-live
        v-if="currentIdx === 0 || currentIdx === 2"
        :question="question"
      />
      <odoq-post-container
        v-if="currentIdx === 0"
      />
      <odoq-notice-list-container
        v-if="currentIdx === 1"
      />
      <odoq-post-list-container
        v-if="currentIdx === 2"
        :filtering-flag="'solution'"
      />
    </div>
    <odoq-footer/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      onOffSeason: true,
      content: 0,
      tabs: ['전체글', '공지', '풀이', '인기글'],
      currentIdx: 0,
    }
  },
  computed: {
    ...mapGetters({
      availableDays: 'question/questionStore/availableDays',
      uploadTime: 'question/questionStore/uploadTime',
      userInfo: 'user/userAuthStore/userInfo',
      isLogin: 'user/userAuthStore/isLogin',
      question: 'question/questionStore/question',
    }),
    isAvailable() {
      // 이번주 월요일 8:00 부터 금요일 24:00 까지
      const start = moment().startOf('isoWeek')
        .add(this.uploadTime.split(':')[0], 'hours')
        .add(this.uploadTime.split(':')[1], 'minutes');
      const end = moment().startOf('isoWeek')
        .add(4, 'days')
        .add(24, 'hours');
      const now = moment();
      return now.isBetween(start, end);
    },
    isWriter() {
      return [1, 2].includes(parseInt(this.userInfo.userGrade), 10);
    }
  },
  methods: {
    async loadNext() {
      this.now = moment();
      await this.$store.dispatch('question/questionStore/getQuestion');
    },
    /**
     * 탭 클릭시
     * 탭 풀이 및 전체글로 이동시 store를 업데이트 해준 뒤에 이동 되도록
     * @param idx
     * @return {Promise<void>}
     */
    async onTab(idx) {
      const queries = {
        pageNumber: this.$utils.getPageNumber('post') || 1,
        pageSize: this.$store.state.post.postStore.pageSize,
      };
      if (idx === 0) { /* 전체글  */
        await this.$store.dispatch('post/postStore/getPosts', {
          ...queries,
          filteringFlag: 'all',
          userId: this.userInfo.userId,
        });
      }
      if (idx === 1)  { /* 공지  */
        await this.$store.dispatch('notice/noticeStore/getNotices', {
          pageNumber: 1,
          pageSize: this.$store.state.notice.noticeStore.defaultPageSize,
        });
      }
      if (idx === 2)  { /* 풀이  */
        await this.$store.dispatch('post/postStore/getPosts', {
          ...queries,
          filteringFlag: 'solution',
          userId: this.userInfo.userId,
        });
      }
      this.currentIdx = idx;
    },
    openTest() {
      this.open = !this.open;
      const question = document.getElementById('questionContainer');
      const openBtn = document.getElementById('openLabel');
      if (this.open === true) {
        question.style.height = '0';
        question.style.overflow = 'hidden';
        openBtn.firstChild.src = 'data:image/svg+xml,%3Csvg width=\'45\' height=\'68\' viewBox=\'0 0 45 68\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M0 0H44.9084V38.1722L45 67.3642L22.454 49.3994L22.4542 49.3993H22.4236L22.4475 49.4125L0 67.3626L0.0172968 49.3993H0V0Z\' fill=\'%239D9D9D\'/%3E%3C/svg%3E%0A';
        openBtn.lastChild.innerHTML = '문제<br>펼치기';
        openBtn.lastChild.color = '#0051c8';
        // document.getElementById('questionContainer').style.padding = '0 20px';
      } else {
        question.style.height = 'unset';
        openBtn.firstChild.src = 'data:image/svg+xml,%3Csvg width=\'45\' height=\'68\' viewBox=\'0 0 45 68\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M0.000419178 0H44.9085V38.1914L45 67.3638L22.4542 49.3991L22.4546 49.3989H22.4235L22.4474 49.412L0 67.362L0.0172961 49.3989H0.000419178V0Z\' fill=\'%230051C8\'/%3E%3C/svg%3E%0A';
        openBtn.lastChild.innerHTML = '문제<br>접기';
        openBtn.lastChild.color = '#fff';
        // document.getElementById('questionContainer').style.padding = '0 20px 20px';
      }
    },
  },
}
</script>
