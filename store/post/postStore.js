import Utils from "@/plugins/utils";

const state = () => ({
  arrayPosts: [],
  todayPosts: 0,
  totalPosts: 0,
  currentPage: 0,
  totalPages: 0,
  post: {
    id: 0,
    user_id: 0,
    user_grade: 0,
    user_level: 0,
    user_name: '',
    title: '',
    content: '',
    img_urL: null,
    hit_count: 0,
    like_count: 0,
    liked_users: [],
    created_at: '',
    updated_at: '',
    blind: false,
    blind_text: '',
    comments_count: 0,
  },
  comments: [{
    id: 0,
    user_id: 0,
    user_grade: 0,
    user_level: 0,
    user_name: '',
    content: '',
    created_at: '',
    updated_at: '',
    blind: false,
    blind_text: '',
    cocomments: [
      {
        id: 0,
        user_id: 0,
        user_grade: 0,
        user_level: 0,
        user_name: '',
        content: '',
        created_at: '',
        updated_at: '',
        blind: false,
        blind_text: '',
      }
    ],
  }],
});

const actions = {
  async getPosts({ commit }, objAboutPage) {
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
  async getPost({ commit }, postId) {
    const res = await this.$axios.get(`post/${postId}`);
    if (res.data.result === 'success') {
      console.log('post is ', res.data.data.post);
      commit('setPost', res.data.data.post);
    }
    return res.data;
  },
  async getComments({ commit }, postId) {
    const res = await this.$axios.get(`post/${postId}/comment`);
    if (res.data.result === 'success') {
      console.log('comments is ', res.data.data.comments);
      commit('setComments', res.data.data.comments);
    }
  },
  async createPost({ commit }, postData) {
    // console.log('createPost path is here');
    const res = await this.$axios.post('post/', postData);
    if (res.data.result === 'success') {
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
    // console.log('likePost path is here');
    postAndUserData.flag = 'like';
    const res = await this.$axios.patch('post/', postAndUserData);
    if (res.data.result === 'success') {
      // console.log(res.data.data);
      commit('modifyPostLike', res.data.data);
    }
    return res.data;
  },
  async blindPost({ commit }, postData) {
    // console.log('blindPost path is here');
    postData.flag = 'blind';
    const res = await this.$axios.patch('post/', postData);
    // console.log('blindPost의 res.data는 ', res.data);
    if (res.data.result === 'success') {
      // console.log(res.data.data);
      commit('modifyPostBlind', res.data.data);
    }
    return res.data;
  },
  async createComment({ commit }, {postId, formData}) {
    const res = await this.$axios.post(`post/${postId}/comment/`, formData);
    if (res.data.result === 'success') {
      console.log('comments is ', res.data.data.comments);
      commit('setComments', res.data.data.comments);
    }
    return res.data
  },
  async createCocomment({ commit }, {postId, formData}) {
    const res = await this.$axios.post(`post/${postId}/comment/`, formData);
    if (res.data.result === 'success') {
      console.log('comments is ', res.data.data.comments);
      commit('setComments', res.data.data.comments);
    }
    return res.data
  }
};

const mutations = {
  setArrayPosts(state, axiosPostData) {
    state.arrayPosts = axiosPostData.map((post) => {
      post.img_url = post.img_url? Utils.getImgUrl(post.img_url) : null;
      return post;
    });
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
  setPost(state, axiosPost) {
    state.post = {
      ...axiosPost,
      img_url: axiosPost.img_url? Utils.getImgUrl(axiosPost.img_url) : null,
    };
  },
  modifyPostLike(state, axiosLikePost) {
    // console.log('postStore > mutations > modifyPostLike axiosLikePost is ', axiosLikePost)
    const postIndex = state.arrayPosts.findIndex((post) => post.id === axiosLikePost.post_id);
    if (state.arrayPosts[postIndex].like_count < axiosLikePost.like_count) {
      state.arrayPosts[postIndex].liked_users.push(axiosLikePost.user_id);
      state.post.liked_users.push(axiosLikePost.user_id);
    } else {
      state.arrayPosts[postIndex].liked_users.pop(axiosLikePost.user_id);
      state.post.liked_users.pop(axiosLikePost.user_id);
    };
    state.arrayPosts[postIndex].like_count = axiosLikePost.like_count;
    state.post.like_count = axiosLikePost.like_count;
  },
  modifyPostBlind(state, axiosBlindPost) {
    // console.log('axiosBlindPost is ', axiosBlindPost);
    const postIndex = state.arrayPosts.findIndex((post) => post.id === axiosBlindPost.post_id);
    if (state.arrayPosts[postIndex].blind === false) {
      state.arrayPosts[postIndex].blind = true;
      state.arrayPosts[postIndex].blind_text = axiosBlindPost.blind_text;
    } else {
      state.arrayPosts[postIndex].blind = false;
    };
  },
  setComments(state, axiosComments) {
    state.comments = axiosComments;
  }
};

const getters = {
  arrayPosts: (state) => (state.arrayPosts),
  totalPosts: (state) => (state.totalPosts),
  todayPosts: (state) => (state.todayPosts),
  currentPage: (state) => (state.currentPage),
  totalPages: (state) => (state.totalPages),
  post: (state) => (state.post),
  comments: (state) => (state.comments),
};

export default {
  state,
  actions,
  mutations,
  getters,
}
