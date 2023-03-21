import Utils from '~/plugins/utils';

const state = () => ({
  notice: {},
});

const actions = {
  async getNotice({ commit }) {
    await console.log('action to getNotice is here');
    const res = await this.$axios.get('notice');
    if (res.data.result === 'success') {
      commit('setNotice', res.data);
    }
  },
}

const mutations = {
  /**
   * axiosResData의 data를 뿌려주고,
   * img_url은 BaseUrl을 붙여서 재정의해줌.
   */
  setNotice(state, axiosResData) {
    // console.log('noticeStore > axiosResData is ', axiosResData);
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
    state.notice = resData;
  },
};

const getters = {
  notice: (state) => (state.notice),
};


export default {
  state,
  actions,
  mutations,
  getters,
};
