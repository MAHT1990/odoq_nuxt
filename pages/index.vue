<template>
  <div id="index">
    <OdoqHeader></OdoqHeader>
    <div class="verticalLine1"></div>
    <OdoqMainContainer></OdoqMainContainer>
  </div>
</template>

<script>

import Utils from "@/plugins/utils";

export default {
  async asyncData({ store, req }) {
    // 문제 받아오기
    await store.dispatch('question/questionStore/getQuestion');

    // 로그인 CHECK.
    try {
      const cookie = req? req.headers.cookie : document.cookie;
      if (!Utils.getCookie(cookie, 'jwt')) return;
      store.commit('user/userAuthStore/checkLogin', { isLogin: true, cookie });
    } catch (TypeError) {
    }
  },
}
</script>
