const state = () => ({
  post: {},
});

const actions = {
  getPost({ commit }) {
    console.log('getPost gogogo');
    // const res = await this.$axios.get('post');
    // commit('setPost', res.data);
  }
};

const mutations = {
  setPost(state, axiosResData) {
  }
};

const getters = {
  post: (state) => (state.comment),
};

export default {
  state,
  actions,
  mutations,
  getters,
}
