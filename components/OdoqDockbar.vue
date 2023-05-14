<template>
  <div class="dockbar_wrap">
    <div class="dockbar_list">
<!--      <div class="dockbar_group">-->
        <div v-for="item in dockBar" :key="item.title">
          <a @click="moveToLink(item)">
<!--            <img :src="item.src" alt="">-->
            <div class="img"></div>
            <span>{{ item.title }}</span>
          </a>
        </div>
<!--      </div>-->
<!--      <div>-->
<!--        <nuxt-link to="/write">-->
<!--          <img src="data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.84 2.72998C16.45 2.72998 16.07 2.87998 15.77 3.16998L13.65 5.28998L18.95 10.6L21.07 8.49998C21.67 7.88998 21.67 6.93998 21.07 6.35998L17.9 3.16998C17.6 2.87998 17.22 2.72998 16.84 2.72998ZM12.94 5.99998L4.84 14.11L7.4 14.39L7.58 16.68L9.86 16.85L10.15 19.41L18.25 11.3M4.25 15.04L2.5 21.73L9.2 19.94L8.96 17.78L6.65 17.61L6.47 15.29' fill='%230051C8'/%3E%3C/svg%3E%0A" alt="">-->
<!--          <span>글쓰기</span>-->
<!--        </nuxt-link>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    dockBar: [
      {
        link: '/',
        title: '홈',
        // src: 'data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg clip-path=\'url(%23clip0_206_49)\'%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M10.7721 2.68799C11.1232 2.41488 11.5553 2.2666 12.0001 2.2666C12.4449 2.2666 12.877 2.41488 13.2281 2.68799L21.6121 9.20799C22.3651 9.79499 21.9491 11 20.9971 11H20.0001V19C20.0001 19.5304 19.7894 20.0391 19.4143 20.4142C19.0392 20.7893 18.5305 21 18.0001 21H6.0001C5.46967 21 4.96096 20.7893 4.58589 20.4142C4.21082 20.0391 4.0001 19.5304 4.0001 19V11H3.0031C2.0501 11 1.6361 9.79399 2.3881 9.20899L10.7721 2.68799Z\' fill=\'%230051C8\'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id=\'clip0_206_49\'%3E%3Crect width=\'24\' height=\'24\' fill=\'white\'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A'
      },
      {
        link: '',
        title: '검색',
        // src: 'data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M15.5 14H14.71L14.43 13.73C15.0549 13.0039 15.5117 12.1487 15.7675 11.2256C16.0234 10.3024 16.072 9.33413 15.91 8.38998C15.44 5.60998 13.12 3.38997 10.32 3.04997C9.33559 2.92544 8.33576 3.02775 7.397 3.34906C6.45824 3.67038 5.60542 4.20219 4.90381 4.90381C4.20219 5.60542 3.67038 6.45824 3.34906 7.397C3.02775 8.33576 2.92544 9.33559 3.04997 10.32C3.38997 13.12 5.60998 15.44 8.38998 15.91C9.33413 16.072 10.3024 16.0234 11.2256 15.7675C12.1487 15.5117 13.0039 15.0549 13.73 14.43L14 14.71V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.49997 14C7.00997 14 4.99997 11.99 4.99997 9.49997C4.99997 7.00997 7.00997 4.99997 9.49997 4.99997C11.99 4.99997 14 7.00997 14 9.49997C14 11.99 11.99 14 9.49997 14Z\' fill=\'%230051C8\'/%3E%3C/svg%3E%0A',
      },
      {
        link: '/write/solution',
        title: '풀이등록',
        // src: 'data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18ZM13 17.25H18V15.75H13V17.25ZM13 14.75H18V13.25H13V14.75ZM14.1 10.95L15.5 9.55L16.9 10.95L17.95 9.9L16.55 8.45L17.95 7.05L16.9 6L15.5 7.4L14.1 6L13.05 7.05L14.45 8.45L13.05 9.9L14.1 10.95ZM6.25 9.2H11.25V7.7H6.25V9.2ZM5 21C4.45 21 3.979 20.804 3.587 20.412C3.195 20.02 2.99934 19.5493 3 19V5C3 4.45 3.196 3.979 3.588 3.587C3.98 3.195 4.45067 2.99934 5 3H19C19.55 3 20.021 3.196 20.413 3.588C20.805 3.98 21.0007 4.45067 21 5V19C21 19.55 20.804 20.021 20.412 20.413C20.02 20.805 19.5493 21.0007 19 21H5Z\' fill=\'%230051C8\'/%3E%3C/svg%3E%0A',
      },
      {
        link: '/write',
        title: '글쓰기',
        // src: 'data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M16.84 2.72998C16.45 2.72998 16.07 2.87998 15.77 3.16998L13.65 5.28998L18.95 10.6L21.07 8.49998C21.67 7.88998 21.67 6.93998 21.07 6.35998L17.9 3.16998C17.6 2.87998 17.22 2.72998 16.84 2.72998ZM12.94 5.99998L4.84 14.11L7.4 14.39L7.58 16.68L9.86 16.85L10.15 19.41L18.25 11.3M4.25 15.04L2.5 21.73L9.2 19.94L8.96 17.78L6.65 17.61L6.47 15.29\' fill=\'%230051C8\'/%3E%3C/svg%3E%0A',
      },
    ],
  }),
  methods: {
    moveToLink(item) {
      const isLogin = this.$store.getters['user/userAuthStore/isLogin'];
      const userInfo = this.$store.getters['user/userAuthStore/userInfo'];
      const question = this.$store.getters['question/questionStore/question'];
      if (item) {
        if (item.title === '글쓰기') {
          if (!isLogin) this.$popup.showAlertPopup('로그인 후 이용해주세요.');
          else this.$router.push(item.link);
        } else if (item.title === '풀이등록') {
          if (!isLogin) return this.$popup.showAlertPopup('로그인 후 이용해주세요.');
          if (!question.solved_users.includes(userInfo.userId)) return this.$popup.showAlertPopup('정답 제출후 이용해주세요.');
          else this.$router.push(item.link);
        } else if (item.title === '검색') {
          return this.$popup.showAlertPopup('준비중입니다.');
        } else this.$router.push(item.link);
      }
    },
  },
}
</script>
