<template>
  <div class="notice_wrap">
    <nuxt-link to="">
      <ul>
        <li>[공지] {{ item.title }}</li>
      </ul>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
  }
}
</script>
