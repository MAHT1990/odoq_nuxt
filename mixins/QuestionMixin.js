export default {
  async asyncData({ store }) {
    await store.dispatch('question/questionStore/getQuestion');
  },
}

