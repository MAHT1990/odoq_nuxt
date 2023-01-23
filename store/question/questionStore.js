const state = () => ({
  question: {},
});

const actions = {
  async getQuestion({ commit }) {
    const res = await this.$store.get('question')
    console.log('res is ', res);
    commit('setQuestion', res.data);
  },
}

const mutations = {
  setQuestion(state, resData) {
    state.question = resData;
  }
}

const getters = {
  question: (state) => (state.question),
}

export default {
  state,
  actions,
  mutations,
  getters,
}
