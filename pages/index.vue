<template>
  <div id="index">
    <OdoqHeader></OdoqHeader>
    <div class="verticalLine1"></div>
    <OdoqMainContainer></OdoqMainContainer>
  </div>
</template>

<script>
import UserAuthMixin from '@/mixins/UserAuthMixin';

export default {
  name: 'IndexPage',
  mixins: [UserAuthMixin],
  methods: {
    login() {
      this.isLogin = true;
    }
  },
}
</script>
