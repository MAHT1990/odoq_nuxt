const state = () => ({
  arrayPost: [],
  totalPosts: 0,
  currentPage: 0,
  totalPages: 0,
});

const actions = {
  async getPost({ commit }, objAboutPage) {
    console.log('getPost gogogo');
    const res = await this.$axios.get('post/', {
      params: objAboutPage,
    });
    if (res.data.result === 'success') {
      commit('setArrayPost', res.data.data.posts);
      commit('setTotalPosts', res.data.data.total_posts);
      commit('setCurrentPage', res.data.data.current_page);
      commit('setTotalPages', res.data.data.total_pages);
      console.log('postStore의 getPost의 결과: ', res.data.data);
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
      console.log(res.data.data);
      commit('setArrayPost', res.data.data.posts);
      commit('setTotalPosts', res.data.data.total_posts);
      commit('setCurrentPage', res.data.data.current_page);
      commit('setTotalPages', res.data.data.total_pages);
    }
    return 1;
  }
};

const mutations = {
  setArrayPost(state, axiosPostData) {
    state.arrayPost = axiosPostData;
  },
  setTotalPosts(state, axiosTotalPosts) {
    state.totalPosts = axiosTotalPosts;
  },
  setCurrentPage(state, axiosCurrentPage) {
    state.currentPage = axiosCurrentPage;
  },
  setTotalPages(state, axiosTotalPages) {
    state.totalPages = axiosTotalPages;
  }
};

const getters = {
  arrayPost: (state) => (state.arrayPost),
  totalPosts: (state) => (state.totalPosts),
  currentPage: (state) => (state.currentPage),
  totalPages: (state) => (state.totalPages),
};

export default {
  state,
  actions,
  mutations,
  getters,
}
