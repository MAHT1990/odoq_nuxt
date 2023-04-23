<template>
  <!--      <span id="line"></span>-->
  <div class="tab_wrap">
    <!--      <span id="line"></span>-->
<!--    <button @click="$emit('onTab', idx)" class="tab_btn"-->
<!--            :id="item" v-for="(item, idx) in tabs"-->
<!--            :key="item"-->
<!--    >{{item}}-->
    <button>{{item}}
    </button>
  </div>
</template>

<script>
export default {
  name: "OdoqTabs",
  data: () => ({
    tabs: ['전체글', '공지', '인기글'],
  }),
  methods: {
  },
}
</script>
