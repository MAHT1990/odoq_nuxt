const state = () => ({

});

const actions = {
  sendAuthorSms(context, query) {
    console.log('Way to sendAuthorSms is here');
    console.log('query in sendAuthorSms is ', query);
    this.$axios.post('sms/', query);
  },
  sendStudentSms() {
    console.log('Way to sendStudentSms is here');
    console.log('query in sendStudentSms is ');
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
