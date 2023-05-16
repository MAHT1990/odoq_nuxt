import Vue from 'vue';

const atob = (str) => Buffer.from(str, 'base64').toString('binary');
const formDataToObj = (formData) => {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return obj;
}
const addCookie = (key, value, expires) => {
  if (typeof document === 'undefined') return;
  if (expires) {
    const data = new Date(Date.now() + expires);
    document.cookie = `${key}=${encodeURIComponent(value)}; expires=${data.toUTCString()}; path=/;`;
  } else {
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/;`;
  }
};

const getCookie = (cookie, key) => {
  if (!cookie) return null;
  const regExp = new RegExp(`(?:^|; )${encodeURIComponent(key).replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`);
  const matches = cookie.match(regExp);
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

/**
 * 쿠키 삭제 in Client
 * @param key
 * @param cookie
 */
const removeCookie = (key, cookie) => {
  // console.log(document.cookie);
  if (typeof document === 'undefined') return;
  document.cookie = `${key}=; expires=-1; path=/;`;
};

const getUserId = (cookie) => {
  let userId;
  const jwt = getCookie(cookie, 'jwt');
  if (jwt) {
    const info = JSON.parse(atob(jwt.split('.')[1]));
    const grade = parseInt(info.info.split('_')[1], 10);
    if (grade >= 0) userId = info.info.split('_')[0];
    // console.log('## plugins/utils.js getUserId > info', info);
    // console.log('## plugins/utils.js getUserId > grade', grade);
    // console.log('## plugins/utils.js getUserId > userId', userId);
  }
  return userId;
};

const getUserIdByJwt = (jwt) => {
  let userId;
  const info = JSON.parse(atob(jwt.split('.')[1]));
  const grade = parseInt(info.info.split('_')[1], 10);
  if (typeof grade === 'number' ) userId = info.info.split('_')[0];
  return userId;
}

const getUserName = (cookie) => {
  let userName;
  const jwt = getCookie(cookie, 'jwt');
  if (jwt) {
    const info = JSON.parse(atob(jwt.split('.')[1]));
    userName = info.info.split('_')[2];
  }
  return userName;
};

const getUserNameByJwt = (jwt) => {
  const info = JSON.parse(atob(jwt.split('.')[1]));
  const userName = info.info.split('_')[2];
  return userName;
}

const getUserGrade = (cookie) => {
  let userGrade;
  const jwt = getCookie(cookie, 'jwt');
  if (jwt) {
    const info = JSON.parse(atob(jwt.split('.')[1]));
    userGrade = info.info.split('_')[1];
  }
  return userGrade;
};

const getUserGradeByJwt = (jwt) => {
  const info = JSON.parse(atob(jwt.split('.')[1]));
  const userGrade = info.info.split('_')[1];
  return userGrade
}

const getImgUrl = (imgUrlWithoutDomain) => {
  return process.env.BASE_URL + imgUrlWithoutDomain
}

const setPageNumber = (pageNumber) => {
  sessionStorage.setItem('pageNumber', pageNumber);
}

const getPageNumber = () => {
  return parseInt(sessionStorage.getItem('pageNumber') || 1, 10) || 1;
}

const setReadPost = (postId) => {
  let readPost = localStorage.getItem('readPost')
  readPost = readPost.split(',').map((postId) => parseInt(postId, 10));
  // 중복원소 제거
  if (readPost) readPost.push(parseInt(postId, 10));
  else readPost = postId
  readPost = [...new Set(readPost)].join(',');
  localStorage.setItem('readPost', readPost);
}

const getReadPost = () => {
    return localStorage.getItem('readPost')
      ? localStorage.getItem('readPost').split(',').map((postId) => parseInt(postId, 10))
      : null;
}

const Utils = {
  atob,
  formDataToObj,
  addCookie,
  getCookie,
  removeCookie,
  getUserId,
  getUserIdByJwt,
  getUserName,
  getUserNameByJwt,
  getUserGrade,
  getUserGradeByJwt,
  getImgUrl,
  setPageNumber,
  getPageNumber,
  setReadPost,
  getReadPost,
};

export default Utils;
Vue.prototype.$utils = Utils;
