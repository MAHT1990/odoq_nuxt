import Utils from '~/plugins/utils';

const state = () => ({
  notices: [],
  notice: {},
});

const actions = {
  async getNotices({ commit }) {
    // console.log('action to getNotice is here');
    const res = await this.$axios.get('notice/');
    if (res.data.result === 'success') {
      commit('setNotices', res.data.data);
      console.log('noticeStore > getNotices > res.data is ', res.data);
    }
  },
  async getNotice({ commit }, noticeId) {
    const res = await this.$axios.get(`post/${noticeId}`);
    if (res.data.result === 'success') {
      console.log('notice is ', res.data.data.post);
      commit('setNotice', res.data.data.post);
    }
    return res.data;
  },
}

const mutations = {
  /**
   * axiosResData의 data를 뿌려주고,
   * img_url은 BaseUrl을 붙여서 재정의해줌.
   */
  setNotices(state, axiosResData) {
    // console.log('noticeStore > axiosResData is ', axiosResData)
    if (Object.keys(axiosResData).length === 0) {
      return;
    }
    else {
      axiosResData.notices.forEach((notice) => {
        notice.img_url = Utils.getImgUrl(notice.img_url);
      });
    }
    state.notices = axiosResData.notices;
  },
  setNotice(state, axiosNotice) {
    state.post = { ...axiosNotice, img_url: axiosNotice.img_url? Utils.getImgUrl(axiosNotice.img_url) : null};
  },
};

const getters = {
  notices: (state) => (state.notices),
};


export default {
  state,
  actions,
  mutations,
  getters,
};
