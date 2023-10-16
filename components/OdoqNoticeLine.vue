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
          >{{ notice.title }}</span>
            <i v-if="notice.img_url" class="fa-solid fa-image"></i>
            <i v-if="hasDisplayIcon" class="fa-solid fa-eye"></i>
          </li>
        </ul>
    </div>
</template>

<script>

import Utils from "@/plugins/utils";

export default {
  props: {
    notice: Object,
    headOnly: {
      type: Boolean,
      default: false,
    },
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
    hasDisplayIcon() {
      /*
      * 전체글의 Header가 아닌, 공지사항 목록일 때,
      * is_display가 true인 공지사항에만 눈 아이콘이 표시되도록 한다.
      * */
      return !this.headOnly && this.notice.is_display;
    }
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
