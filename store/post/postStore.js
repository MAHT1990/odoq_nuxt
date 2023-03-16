const state = () => ({
  arrayPosts: [],
  todayPosts: 0,
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
      commit('setArrayPosts', res.data.data.posts);
      commit('setTotalPosts', res.data.data.total_posts);
      commit('setTodayPosts', res.data.data.today_posts);
      commit('setCurrentPage', res.data.data.current_page);
      commit('setTotalPages', res.data.data.total_pages);
      // console.log('postStore의 getPost의 결과: ', res.data.data);
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
      commit('setArrayPosts', res.data.data.posts);
      commit('setTotalPosts', res.data.data.total_posts);
      commit('setTodayPosts', res.data.data.today_posts);
      commit('setCurrentPage', res.data.data.current_page);
      commit('setTotalPages', res.data.data.total_pages);
    }
    return res;
  },
  /**
   * post의 like를 누르는 함수
   * flag를 설정 : 'like' or 'update'
   * @param commit
   * @param postAndUserData
   * @return {Promise<AxiosResponse<any>>}
   */
  async likePost({ commit }, postAndUserData) {
    console.log('likePost path is here');
    postAndUserData.flag = 'like';
    const res = await this.$axios.patch('post/', postAndUserData);
    if (res.data.result === 'success') {
      console.log(res.data.data);
      commit('modifyPostLike', res.data.data);
    }
    return res.data;
  }
};

const mutations = {
  setArrayPosts(state, axiosPostData) {
    state.arrayPosts = axiosPostData;
  },
  setTotalPosts(state, axiosTotalPosts) {
    state.totalPosts = axiosTotalPosts;
  },
  setTodayPosts(state, axiosTodayPosts) {
    state.todayPosts = axiosTodayPosts;
  },
  setCurrentPage(state, axiosCurrentPage) {
    state.currentPage = axiosCurrentPage;
  },
  setTotalPages(state, axiosTotalPages) {
    state.totalPages = axiosTotalPages;
  },
  modifyPostLike(state, axiosLikePost) {
    const postIndex = state.arrayPosts.findIndex((post) => post.id === axiosLikePost.post_id);
    if (state.arrayPosts[postIndex].like_count < axiosLikePost.like_count) {
      state.arrayPosts[postIndex].liked_users.push(axiosLikePost.user_id)
    } else {
      state.arrayPosts[postIndex].liked_users.pop(axiosLikePost.user_id)
    };
    state.arrayPosts[postIndex].like_count = axiosLikePost.like_count;
  },
  // make modifyPostLike simple
  // modifyPostLike(state, axiosLikePost) {
  //   const postIndex = state.arrayPosts.findIndex((post) => post.id === axiosLikePost.post_id);
  //   state.arrayPosts[postIndex].like_count = axiosLikePost.like_count;
  //   state.arrayPosts[postIndex].liked_users = axiosLikePost.liked_users;

};

const getters = {
  arrayPosts: (state) => (state.arrayPosts),
  totalPosts: (state) => (state.totalPosts),
  todayPosts: (state) => (state.todayPosts),
  currentPage: (state) => (state.currentPage),
  totalPages: (state) => (state.totalPages),
};

export default {
  state,
  actions,
  mutations,
  getters,
}
