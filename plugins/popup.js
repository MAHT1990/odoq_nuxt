import Vue from 'vue';
import PopAlert from '@/components/popups/PopAlert'; // 안내 및 경고 팝업
import PopConfirm from '@/components/popups/PopConfirm'; // 확인 팝업
import PopUserRegistCompleted from '@/components/popups/PopUserRegistCompleted'; // 회원가입 완료 팝업
import PopTerms from '@/components/popups/PopTerms'; // 약관 안내 팝업
import PopLeaveReason from '@/components/popups/PopLeaveReason'; // 회원 탈퇴 사유입력
import PopToolBox from '@/components/popups/PopToolBox'; // 툴박스 팝업
import PopNotice from '@/components/popups/PopNotice.vue'; // 공지 팝업
import PopAnswerPost from '@/components/popups/PopAnswerPost.vue'; // 답안 확인 팝업
import PopCommentEdit from "@/components/popups/PopCommentEdit.vue"; // 댓글 수정 팝업
import PopMyPage from "@/components/popups/PopMyPage.vue"; // 마이페이지 팝업


const Popup = {
  showAlertPopup: (message, closeCallback = () => {}) => {
    new PopAlert({
      propsData: {
        title: message,
        okCallback: ({ $destroy }) => $destroy(),
        closeCallback,
      },
    }).$mount();
  },
  PopAlert,
  PopConfirm,
  PopUserRegistCompleted,
  PopTerms,
  PopLeaveReason,
  PopToolBox,
  PopNotice,
  PopAnswerPost,
  PopCommentEdit,
  PopMyPage,
};
export default Popup
Vue.prototype.$popup = Popup;
