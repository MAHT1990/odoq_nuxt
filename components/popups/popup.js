import PopAlert from './PopAlert'; // 안내 및 경고 팝업
import PopConfirm from './PopConfirm'; // 확인 팝업
import PopUserRegistCompleted from './PopUserRegistCompleted'; // 회원가입 완료 팝업
import PopTerms from './PopTerms'; // 약관 안내 팝업
import PopLeaveReason from './PopLeaveReason'; // 회원 탈퇴 사유입력


export default {
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
};
