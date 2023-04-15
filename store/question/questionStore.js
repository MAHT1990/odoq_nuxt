import Utils from "@/plugins/utils";

const state = () => ({
  question: {
    answer_count: 0,
    solve_count: 0,
    can_answer_remain_time: 0,
  },
  answerLive: {
    answers: [],
    answerCount: 0,
    solveCount: 0,
  }
});

const actions = {
  async getQuestion({ commit }) {
    const res = await this.$axios.get('question');
    console.log('questionStore > getQuestion > res.data is ', res.data);
    commit('setQuestion', res.data);
  },
  async getAnswerHistory({ commit }, query) {
    const res = await this.$axios.get('question/answer_history',
      {
        params: {
          ...query
        }
      });
    console.log('questionStore > getAnswerHistory > res.data is ', res.data);
    commit('setAnswerHistory', res.data);
  },
  async getAnswerLive({ commit }, query) {
    const res = await this.$axios.get('question/answer_live',
      {
        params: {
          ...query
        }
      });
    // console.log('questionStore > getAnswerLive > res.data is ', res.data);
    commit('setAnswerLive', res.data);
  },
  async postAnswer({ commit }, data) {
    const res = await this.$axios.post('question/', data);
    commit('updateQuestionAnswerStatus', res.data);
  }
}

const mutations = {
  /**
   * axiosResData의 data를 뿌려주고,
   * img_url은 BaseUrl을 붙여서 재정의해줌.
   *
   * @param state - 기본 param
   * @param axiosResData - axios의 Response의 data
   */
  setQuestion(state, axiosResData) {
    // console.log('axiosResData is ', axiosResData);
    let resData;
    if (Object.keys(axiosResData.data).length === 0) {
      resData = {};
    }
    else {
      resData = {
        ...axiosResData.data,
        img_url: Utils.getImgUrl(axiosResData.data.img_url)
      }
    }
    state.question = resData;
    console.log('questionStore > setQuestion > state.question is ', state.question);
  },
  setAnswerHistory(state, axiosResData) {
    state.question.can_answer_remain_time = axiosResData.data.can_answer_remain_time;
  },
  setAnswerLive(state, axiosResData) {
    state.answerLive.answers = axiosResData.data.answers;
    state.answerLive.answerCount = axiosResData.data.answers.length;
    let solveCount = 0;
    axiosResData.data.answers.forEach((answer) => {
      if (answer.is_solved) {
        solveCount++;
      }
    });
    state.answerLive.solveCount = solveCount;
  },
  /**
   * 답변을 등록하고, 답변수와 해결수를 업데이트
   * @param state
   * @param axiosResData
   */
  updateQuestionAnswerStatus(state, axiosResData) {
    console.log('questionStore > updateQuestionAnswerStatus > axiosResData is ', axiosResData);
    state.question.answer_count = axiosResData.data.answer_count;
    state.question.solve_count = axiosResData.data.solve_count;
    state.question.can_answer_remain_time = axiosResData.data.can_answer_remain_time;
  }
}

const getters = {
  question: (state) => (state.question),
  answerLive: (state) => (state.answerLive),
}

export default {
  state,
  actions,
  mutations,
  getters,
}
