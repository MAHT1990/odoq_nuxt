import Vue from 'vue';
import PopAlert from '@/components/popups/PopAlert'; // 안내 및 경고 팝업
import PopConfirm from '@/components/popups/PopConfirm'; // 확인 팝업
import PopUserRegistCompleted from '@/components/popups/PopUserRegistCompleted'; // 회원가입 완료 팝업
import PopTerms from '@/components/popups/PopTerms'; // 약관 안내 팝업
import PopLeaveReason from '@/components/popups/PopLeaveReason'; // 회원 탈퇴 사유입력
import PopToolBox from '@/components/popups/PopToolBox'; // 툴박스 팝업
import PopNotice from '@/components/popups/PopNotice.vue';


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
};
export default Popup
Vue.prototype.$popup = Popup;
