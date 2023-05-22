const state = () => ({
  availableDays: [1, 2, 3, 4, 5], // 화요일부터 토요일까지
  uploadTime: '08:30:00',
});

const actions = {

};

const mutations = {

};

const getters = {
  availableDays: (state) => state.availableDays,
  uploadTime: (state) => state.uploadTime,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
