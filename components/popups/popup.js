import Alert from './PopAlert';
import Confirm from './PopConfirm';
import UserRegistCompleted from './PopUserRegistCompleted'; // 회원가입 완료 팝업
import Terms from './PopTerms'; // 약관 안내 팝업
import LeaveReason from './PopLeaveReason'; // 회원 탈퇴 사유입력


export default {
  showAlertPopup: (message, closeCallback = () => {}) => {
    new Alert({
      propsData: {
        title: message,
        okCallback: ({ $destroy }) => $destroy(),
        closeCallback,
      },
    }).$mount();
  },
  Alert,
  Confirm,
  UserRegistCompleted,
  Terms,
  LeaveReason,
};
