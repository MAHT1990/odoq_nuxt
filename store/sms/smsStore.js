const state = () => ({
  isAcceptSms: false,
});

const actions = {
  /**
   * SMS 수신 동의 여부 가져오기
   * @param commit - setAcceptSms
   * @param data - userId
   * @return {Promise<void>} - axios.get
   */
  async getAcceptSms({commit}, data) {
    const res = await this.$axios.get('user/accept_sms/', {
      params: {
        userId: data.userId
      }
    });
    console.log('## smsStore > getAcceptSms > res.data is ', res.data)
    if (res.data.result === 'success') {
      commit('setAcceptSms', res.data);
    }
  },
  /**
   * SMS 수신 동의 변경
   */
  async checkAcceptSms({commit}, data) {
    const res = await this.$axios.patch('user/accept_sms/', data);
    console.log('## smsStore > checkAcceptSms > res.data is ', res.data)
    if (res.data.result === 'success') {
      commit('setAcceptSms', res.data);
    }
    return res.data;
  },
  sendAuthorSms(context, query) {
    // console.log('Way to sendAuthorSms is here');
    // console.log('query in sendAuthorSms is ', query);
    this.$axios.post('sms/', query);
  },
  sendStudentSms(context, query) {
    // console.log('Way to sendStudentSms is here');
    // console.log('query in sendStudentSms is ', query);
    this.$axios.post('sms/', query);
  }
}

const mutations = {
  setAcceptSms(state, axiosResData) {
    // console.log('## smsStore > setAcceptSms > axiosResData is ', axiosResData);
    // console.log('## smsStore > setAcceptSms > axiosResData.data.accept_sms is ', axiosResData.data.accept_sms);
    state.isAcceptSms = axiosResData.data.accept_sms;
  }
}

const getters = {
  isAcceptSms: (state) => state.isAcceptSms,
}

export default {
  state,
  actions,
  mutations,
  getters,
}
