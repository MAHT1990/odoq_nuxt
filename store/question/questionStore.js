import Utils from "@/plugins/utils";

const state = () => ({
  availableDays: [1, 2, 3, 4, 5], // 화요일부터 토요일까지
  uploadTime: '08:30:00',
  question: {
    id: 0,
    code: '',
    season: '',
    img_url: '',
    answer: 0,
    answer_count: 0,
    solve_count: 0,
    solved_users: [],
    cheated_users: [],
    can_answer_remain_time: 0, // getAnswerHistory에서 계산
    has_solved_in_limit: false, // getAnswerHistory에서 계산
    wrong_answer_count: 0, // getAnswerHistory에서 계산
    answer_history: [], // getAnswerHistory에서 계산
  },
  // answerLive
  answerLive: {
    answers: [
      {
        user_name: '',
        user_grade: 0,
        user_level: 0,
        answer: 0,
        is_solved: false,
        created_at: '',
        over_limit: false,
        rank: 1, // FE에서 계산
      }
    ]
  },
});

const actions = {
  async getQuestion({ commit }) {
    const res = await this.$axios.get('question/');
    // console.log('questionStore > getQuestion > res.data is ', res.data);
    commit('setQuestion', res.data);
  },
  async getAnswerHistory({ commit }, query) {
    const res = await this.$axios.get('question/answer/history/',
      {
        params: {
          ...query
        }
      });
    // console.log('questionStore > getAnswerHistory > res.data is ', res.data);
    commit('setAnswerHistory', res.data);
    return res.data;
  },
  // getAnswerLive
  async getAnswerLive({ commit }, query) {
    const res = await this.$axios.get('question/answer/live/', {
      params: {
        ...query
      },
    });
    // console.log('questionStore > getAnswerLive > res.data is ', res.data);
    commit('setAnswerLive', res.data);
  },

  async cheatAnswer({ commit }, data) {
    const res = await this.$axios.patch('question/answer/', data);
    if (res.data.result === 'success') commit('updateQuestionCheatedUsers', res.data);
    // console.log('cheated_users: ', res.data.data.cheated_users);
    return res.data;
  },
  async postAnswer({ commit }, data) {
    const res = await this.$axios.post('question/answer/', data);
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
    // console.log('questionStore > setQuestion > state.question is ', state.question);
  },
  setAnswerHistory(state, axiosResData) {
    state.question.can_answer_remain_time = axiosResData.data.can_answer_remain_time;
    state.question.has_solved_in_limit = axiosResData.data.has_solved_in_limit;
    state.question.wrong_answer_count = axiosResData.data.wrong_answer_count;
    state.question.answer_history = axiosResData.data.answer_history;
  },
  // setAnswerLive
  setAnswerLive(state, res) {
    state.answerLive = res.data;
    // console.log('questionStore > setAnswerLive > state.answerLive is ', state.answerLive);
  },
  updateQuestionCheatedUsers(state, axiosResData) {
    state.question.cheated_users = axiosResData.data.cheated_users;
  },
  /**
   * 답변을 등록하고, 답변수와 해결수를 업데이트
   * @param state
   * @param axiosResData
   */
  updateQuestionAnswerStatus(state, axiosResData) {
    // console.log('questionStore > updateQuestionAnswerStatus > axiosResData is ', axiosResData);
    state.question.answer_count = axiosResData.data.answer_count;
    state.question.solve_count = axiosResData.data.solve_count;
    state.question.can_answer_remain_time = axiosResData.data.can_answer_remain_time;
    state.question.solved_users = axiosResData.data.solved_users;
  }
}

const getters = {
  availableDays: (state) => (state.availableDays),
  uploadTime: (state) => (state.uploadTime),
  question: (state) => (state.question),
  answerLive: (state) => (state.answerLive),
}

export default {
  state,
  actions,
  mutations,
  getters,
}
