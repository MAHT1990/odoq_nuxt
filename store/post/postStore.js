const state = () => ({
  arrayPost: [],
});

const actions = {
  async getPost({ commit }) {
    console.log('getPost gogogo');
    const res = await this.$axios.get('post/');
    if (res.data.result === 'success') {
      commit('setArrayPost', res.data.data.posts);
      // console.dir(res.data.data.posts, {
      //   showHidden: true,
      //   colors: true,
      //   depth: 4
      // });
    }
  },
  async createPost({ commit }, postData) {
    console.log('createPost path is here');
    await this.$axios.post('post/', postData)
  }
};

const mutations = {
  setArrayPost(state, axiosPostData) {
    state.arrayPost = axiosPostData;
  }
};

const getters = {
  arrayPost: (state) => (state.arrayPost),
};

export default {
  state,
  actions,
  mutations,
  getters,
}
