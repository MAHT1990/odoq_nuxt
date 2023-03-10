import Utils from "@/plugins/utils";

const state = () => ({
  question: {},
});

const actions = {
  async getQuestion({ commit }) {
    const res = await this.$axios.get('question');
    commit('setQuestion', res.data);
  },
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
