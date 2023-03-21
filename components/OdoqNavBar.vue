<template>
  <nav class="navbar">
    <div class="plan_logo_menu_container">
      <div class="plan_box" @click="openPlanPopup">
        <img src="@/assets/img/info_asset.png" alt="Plan">
        <p>공지</p>
      </div>
      <div class="logo_box">
        <a href="http://odoq2.com" rel="noopener noreferrer"><img src="@/assets/img/ODOQ_NAV_LOGO.png" alt=""></a>
      </div>
    </div>
    <!--        <div class="plan_popup" @click="closePlanPopup">-->
    <!--            <div class="plan_popup_contents">-->
    <!--                <div class="plan_popup_contents_header_verticalline">-->
    <!--                    <div class="plan_popup_contents_header">Info.</div>-->
    <!--                    <div class="plan_popup_contents_verticalline"></div>-->
    <!--                </div>-->
    <!--                <div class="plan_popup_contents_img_box">-->
    <!--                    <img class="plan_popup_contents_img" src="">-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
  </nav>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      notice: 'notice/noticeStore/notice',
    }),
  },
  methods: {
    openPlanPopup: function () {
      new this.$popup.PopNotice({
        propsData: {
          initValue: this.notice,
          title: 'Info.',
          message: '테스트 메시지입니다.',
        }
      }).$mount();
    }
  }
}
</script>
