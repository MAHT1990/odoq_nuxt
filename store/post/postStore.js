import Utils from "@/plugins/utils";

const state = () => ({
  defaultPageSize: 15,
  arrayPosts: [],
  todayPosts: 0,
  totalPosts: 0,
  currentPage: 0,
  totalPages: 0,
  post: {
    id: 0,
    type: 'normal',
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
      // console.log('post is ', res.data.data.post);
      commit('setPost', res.data.data.post);
    }
    return res.data;
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
  async likePost({ commit }, postAndUserData) {
    // console.log('likePost path is here');
    postAndUserData.flag = 'like';
    const res = await this.$axios.patch('post/', postAndUserData);
    if (res.data.result === 'success') commit('modifyPostLike', res.data.data);
    return res.data;
  },
  async deletePost({ commit }, postData) {
    // console.log('deletePost path is here');
    const res = await this.$axios.delete(`post/${postData.postId}/`);
    if (res.data.result === 'success') commit('modifyPostLike', res.data.data);
    return res.data;
  },
  async getComments({ commit }, postId) {
    const res = await this.$axios.get(`post/${postId}/comment`);
    if (res.data.result === 'success') {
      // console.log('comments is ', res.data.data.comments);
      commit('setComments', res.data.data.comments);
    }
  },
  async createComment({ commit }, {postOrNoticeId, formData}) {
    const res = await this.$axios.post(`post/${postOrNoticeId}/comment/`, formData);
    if (res.data.result === 'success') commit('setComments', res.data.data.comments);
    return res.data
  },
  async editComment({ commit }, commentData) {
    // console.log('editComment path is here');
    commentData.flag = 'edit';
    const res = await this.$axios.patch(`post/${commentData.postOrNoticeId}/comment/`, commentData);
    if (res.data.result === 'success') commit('editComment', res.data.data);
    return res.data;
  },
  async blindComment({ commit }, commentData) {
    // console.log('blindPost path is here');
    commentData.flag = 'blind';
    const res = await this.$axios.patch(`post/${commentData.postOrNoticeId}/comment/`, commentData);
    // console.log('blindPost의 res.data는 ', res.data);
    if (res.data.result === 'success') commit('blindComment', res.data.data);
    return res.data;
  },
  async createCocomment({ commit }, {postOrNoticeId, formData}) {
    const res = await this.$axios.post(`post/${postOrNoticeId}/comment/`, formData);
    if (res.data.result === 'success') commit('setComments', res.data.data.comments);
    return res.data
  },
  async editCocomment({ commit }, cocommentData) {
    // console.log('editCocomment path is here');
    cocommentData.flag = 'edit';
    const res = await this.$axios.patch(`post/${cocommentData.postOrNoticeId}/comment/`, cocommentData);
    if (res.data.result === 'success') {
      // console.log(res.data.data);
      commit('editCocomment', res.data.data);
    }
    return res.data;
  },
  async blindCocomment({ commit }, cocommentData) {
    // console.log('blindPost path is here');
    cocommentData.flag = 'blind';
    const res = await this.$axios.patch(`post/${cocommentData.postOrNoticeId}/comment/`, cocommentData);
    // console.log('blindPost의 res.data는 ', res.data);
    if (res.data.result === 'success') commit('blindCocomment', res.data.data);
    return res.data;
  },
};

const mutations = {
  setArrayPosts(state, axiosPostData) {
    // console.log('axiosPostData is ', axiosPostData);
    if (Array.isArray(axiosPostData)) {
      state.arrayPosts = axiosPostData.map((post) => {
        post.img_url = post.img_url ? Utils.getImgUrl(post.img_url) : null;
        return post;
      });
    } else state.arrayPosts = [];
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
    state.post = { ...axiosPost, img_url: axiosPost.img_url? Utils.getImgUrl(axiosPost.img_url) : null};
  },
  setComments(state, axiosComments) {
    state.comments = axiosComments;
  },
  modifyPostLike(state, axiosLikePost) {
    // console.log('postStore > mutations > modifyPostLike axiosLikePost is ', axiosLikePost)
    const postInList = state.arrayPosts.find((post) => post.id === axiosLikePost.post_id);
    // 목록내 좋아요 개수 변경
    if (state.post.like_count < axiosLikePost.like_count) {
      state.post.liked_users.push(axiosLikePost.user_id);
      if (postInList) postInList.liked_users.push(axiosLikePost.user_id);
    } else {
      state.post.liked_users.pop(axiosLikePost.user_id);
      if (postInList) postInList.liked_users.pop(axiosLikePost.user_id);
    }
    state.post.like_count = axiosLikePost.like_count;
    if (postInList) postInList.like_count = axiosLikePost.like_count;
  },
  editComment(state, axiosEditComment) {
    // console.log('axiosEditComment is ', axiosEditComment);
    const comment = state.comments.find((cmt) => cmt.id === axiosEditComment.target_id);
    comment.content = axiosEditComment.content;
  },
  blindComment(state, axiosBlindComment) {
    // console.log('axiosBlindComment is ', axiosBlindComment);
    const commentIndex = state.comments.findIndex((cmt) => cmt.id === axiosBlindComment.target_id);
    state.comments[commentIndex].blind = axiosBlindComment.blind;
    state.comments[commentIndex].blind_text = axiosBlindComment.blind_text;
  },
  editCocomment(state, axiosEditCocomment) {
    // console.log('axiosEditCocomment is ', axiosEditCocomment);
    const cocomment = state.comments.reduce(
      (acc, cur) => {
        return acc.concat(cur.cocomments);
      }, [])
      .find((cmt) => cmt.id === axiosEditCocomment.target_id);
    cocomment.content = axiosEditCocomment.content;
  },
  blindCocomment(state, axiosBlindCocomment) {
    // console.log('axiosBlindCocomment is ', axiosBlindCocomment);
    const cocomments = state.comments.reduce(
      (acc, cur) => acc.concat(cur.cocomments), []);
    const cocommentIndex = cocomments.findIndex((cmt) => cmt.id === axiosBlindCocomment.target_id);
    cocomments[cocommentIndex].blind = axiosBlindCocomment.blind;
    cocomments[cocommentIndex].blind_text = axiosBlindCocomment.blind_text;
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
