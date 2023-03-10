const state = () => ({

});

const actions = {
  sendAuthorSms(context, query) {
    console.log('Way to sendAuthorSms is here');
    console.log('query in sendAuthorSms is ', query);
    this.$axios.post('sms/', query);
  },
  sendStudentSms(context, query) {
    console.log('Way to sendStudentSms is here');
    console.log('query in sendStudentSms is ', query);
    this.$axios.post('sms/', query);
  },
}

const mutations = {

}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters,
}
