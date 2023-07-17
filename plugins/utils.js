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

const getDownloadUrl = (downloadUrlWithoutDomain) => {
  return process.env.BASE_API_URL + '/download?path=' + downloadUrlWithoutDomain
}

const setPageNumber = (flag, pageNumber) => {
  sessionStorage.setItem(`${flag}PageNumber`, pageNumber);
}

const getPageNumber = (flag) => {
  return parseInt(sessionStorage.getItem(`${flag}PageNumber`) || 1, 10) || 1;
}

const setRead = (flag, id) => {
  let readPost = localStorage.getItem(`${flag}Read`);
  readPost = readPost
    ? readPost.split(',').map((id) => parseInt(id, 10))
    : []
  // 중복원소 제거
  if (readPost) readPost.push(parseInt(id, 10));
  else readPost = id
  readPost = [...new Set(readPost)].join(',');
  localStorage.setItem(`${flag}Read`, readPost);
}

const getRead = (flag) => {
    return localStorage.getItem(`${flag}Read`)
      ? localStorage.getItem(`${flag}Read`).split(',').map((id) => parseInt(id, 10))
      : null;
}

/**
 * 레벨 계산
 *
 * @param obj: { user_grade: number, user_level: number }
 * @returns obj: { userClass: string, content: string }
 */
const getUserLabel = (obj) => {
  if (isNaN(obj.user_grade) || isNaN(obj.user_level)) { return { userClass: 'black', content: '??' }; }
  if (obj.user_grade === null || obj.user_level === null) { return { userClass: 'black', content: '??' }; }
  let userClass, content;
  switch (obj.user_grade) {
    case 2:
      userClass = 'admin';
      content = 'M';
      break;
    case 1:
      userClass = 'writer';
      content = 'm';
      break;
    case 0:
      content = obj.user_level
      if (obj.user_level < 10) userClass = 'black';
      else if (obj.user_level < 20) userClass = 'blue';
      else if (obj.user_level < 40) userClass = 'green';
      else if (obj.user_level < 70) userClass = 'red';
      else if (obj.user_level < 100) userClass = 'pink';
      else userClass = 'king';
      break;
    default:
      userClass = 'black';
      content = '??';
      break;
  }
  return { userClass, content };
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
  getDownloadUrl,
  setPageNumber,
  getPageNumber,
  setRead,
  getRead,
  getUserLabel,
};

export default Utils;
Vue.prototype.$utils = Utils;
