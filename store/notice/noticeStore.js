import Utils from '~/plugins/utils';

const state = () => ({
  defaultPageSize: 15,
  notices: [],
  currentPage: 0,
  totalPages: 0,
  notice: {
    id: 0,
    user_id: 0,
    user_grade: 0,
    user_level: 0,
    user_name: '',
    title: '',
    content: '',
    img_url: '',
    file_name: '',
    hit_count: 0,
    like_count: 0,
    liked_users: [],
    created_at: '',
    updated_at: '',
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
  async getNotices({ commit }) {
    // console.log('action to getNotice is here');
    const res = await this.$axios.get('notice/');
    if (res.data.result === 'success') {
      commit('setNotices', res.data.data);
      // console.log('noticeStore > getNotices > res.data is ', res.data);
    }
  },
  async getNotice({ commit }, noticeId) {
    const res = await this.$axios.get(`notice/${noticeId}`);
    if (res.data.result === 'success') {
      // console.log('notice is ', res.data.data.notice);
      commit('setNotice', res.data.data.notice);
    }
    return res.data;
  },
  async getComments({ commit }, noticeId) {
    const res = await this.$axios.get(`notice/${noticeId}/comment`);
    if (res.data.result === 'success') {
      commit('setComments', res.data.data.comments);
    }
  },
  async createComment({ commit }, {postOrNoticeId, formData}) {
    const res = await this.$axios.post(`notice/${postOrNoticeId}/comment/`, formData);
    if (res.data.result === 'success') commit('setComments', res.data.data.comments);
    return res.data
  },
  async editComment({ commit }, commentData) {
    // console.log('editComment path is here');
    commentData.flag = 'edit';
    const res = await this.$axios.patch(`notice/${commentData.postOrNoticeId}/comment/`, commentData);
    if (res.data.result === 'success') commit('editComment', res.data.data);
    return res.data;
  },
  async blindComment({ commit }, commentData) {
    // console.log('blindPost path is here');
    commentData.flag = 'blind';
    const res = await this.$axios.patch(`notice/${commentData.postOrNoticeId}/comment/`, commentData);
    // console.log('blindPost의 res.data는 ', res.data);
    if (res.data.result === 'success') commit('blindComment', res.data.data);
    return res.data;
  },
  async createCocomment({ commit }, {postOrNoticeId, formData}) {
    const res = await this.$axios.post(`notice/${postOrNoticeId}/comment/`, formData);
    if (res.data.result === 'success') commit('setComments', res.data.data.comments);
    return res.data
  },
  async editCocomment({ commit }, cocommentData) {
    // console.log('editCocomment path is here');
    cocommentData.flag = 'edit';
    const res = await this.$axios.patch(`notice/${cocommentData.postOrNoticeId}/comment/`, cocommentData);
    if (res.data.result === 'success') {
      // console.log(res.data.data);
      commit('editCocomment', res.data.data);
    }
    return res.data;
  },
  async blindCocomment({ commit }, cocommentData) {
    // console.log('blindPost path is here');
    cocommentData.flag = 'blind';
    const res = await this.$axios.patch(`notice/${cocommentData.postOrNoticeId}/comment/`, cocommentData);
    // console.log('blindPost의 res.data는 ', res.data);
    if (res.data.result === 'success') commit('blindCocomment', res.data.data);
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
    state.currentPage = axiosResData.current_page;
    state.totalPages = axiosResData.total_pages;
  },
  setNotice(state, axiosNotice) {
    state.notice = { ...axiosNotice, img_url: axiosNotice.img_url? Utils.getImgUrl(axiosNotice.img_url) : null};
  },
  setComments(state, axiosComments) {
    state.comments = axiosComments;
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
  notices: (state) => (state.notices),
  currentPage: (state) => (state.currentPage),
  totalPages: (state) => (state.totalPages),
  comments: (state) => (state.comments),
  notice: (state) => (state.notice),
};


export default {
  state,
  actions,
  mutations,
  getters,
};
