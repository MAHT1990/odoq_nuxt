const state = () => ({
  arrayPost: [],
});

const actions = {
  async getPost({ commit }, objAboutPage) {
    console.log('getPost gogogo');
    const res = await this.$axios.get('post/', objAboutPage);
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
    const res = await this.$axios.post('post/', postData);
    if (res.data.result === 'success') {
      console.log(res.data.data.posts);
      commit('setArrayPost', res.data.data.posts);
    }
    return 1;
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
