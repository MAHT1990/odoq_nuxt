const atob = (str) => Buffer.from(str, 'base64').toString('binary');

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

const removeCookie = (key) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${key}=; expires=-1; path=/;`;
};

const getUserId = (cookie) => {
  let userId;
  const jwt = getCookie(cookie, 'jwt');
  if (jwt) {
    const info = JSON.parse(atob(jwt.split('.')[1]));
    const grade = parseInt(info.info.split('_')[1], 10);
    if (grade === 0) userId = info.info.split('_')[0];
  }
  return userId;
};

const getUserIdByJwt = (jwt) => {
  let userId;
  const info = JSON.parse(atob(jwt.split('.')[1]));
  const grade = parseInt(info.info.split('_')[1], 10);
  if (grade === 0) userId = info.info.split('_')[0];
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



export default {
  atob,
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
};
