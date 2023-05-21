<template>
    <div
      class="notice_wrap"
      @click="moveNoticeDetail"
      :style="readPostStyle"
    >
        <ul>
          <li>[공지]&nbsp;<span
            @mouseover="underline"
            @mouseleave="removeUnderline"
            :style="titleStyle"
          >{{ notice.title }}</span><i v-if="notice.img_url" class="fa-solid fa-image"></i></li>
        </ul>
    </div>
</template>

<script>

import Utils from "@/plugins/utils";

export default {
  props: {
    notice: Object,
  },
  data() {
    return {
      titleStyle: {
        textDecoration: 'none',
      },
      readColor: 'darkgray',
      isRead: false,
      currentPost: false,
    };
  },
  computed: {
    readPostStyle() {
      return {
        backgroundColor: this.currentPost ? '#f5f5f5' : 'white',
        color: this.isRead || this.currentPost ? this.readColor : this.defaultColor,
      }
    },
  },
  methods: {
    moveNoticeDetail() {
      this.$router.push(`/notice/${this.notice.id}`);
    },
    underline() {
      this.titleStyle = {
        textDecoration: 'underline',
      };
    },
    removeUnderline() {
      this.titleStyle = {
        textDecoration: 'none',
      };
    },
  },
  beforeMount() {
    this.isRead = Utils.getRead('notice') ? Utils.getRead('notice').includes(this.notice.id) : false;
    this.currentPost = parseInt(this.$route.params.id, 10) === parseInt(this.notice.id, 10);
  }
}
</script>
