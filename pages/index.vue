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
  mixins: [UserAuthMixin],
}
</script>
