const { userService } = require('../services');
const { catchAsync } = require('../utils/error');
const fetch = require('node-fetch');

const reqAuthCode = catchAsync(async(req, res) => {
  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id : process.env.KAKAO_CLIENT_ID,
    redirect_uri : "http://127.0.0.1:3000/auth/kakao/finish",
    response_type : "code"
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  
  return res.redirect(finalURL);
});

const getKakaoToken = catchAsync(async(req, res) => {
  const baseURL = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type : "authorization_code",
    client_id : process.env.KAKAO_CLIENT_ID,
    redirect_uri : "http://127.0.0.1:3000/auth/kakao/finish",
    code : req.query.code
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  
  const requestToken = await (
    await fetch(finalURL, {
    method : "POST",
    headers : {
      "Content-type" : "application/json"
      }
    })
  ).json();
  const kakaoToken = requestToken["access_token"];
  
  if (!kakaoToken) {
    const error = new Error('TOKEN_IS_NOT_FOUND')
    error.statusCode = 400;
    throw error;
  }
  
  const tokenInfo = await userService.signIn(kakaoToken);
  // res.send(JSON.stringify(tokenInfo));
  // res.status(201).json({ message : "LOGIN_SUCCESS!", tokenInfo })
  console.log(tokenInfo, "토큰정보")
  res.redirect('http://127.0.0.1:3000/home')
  // res.render('../views/home', tokenInfo);
});

const logoutKakao = catchAsync(async(req, res) => {
  const baseURL = "https://kauth.kakao.com/oauth/logout";
  const config = {
    client_id : process.env.KAKAO_CLIENT_ID,
    logout_redirect_uri : "http://127.0.0.1:3000/home"
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;

  return res.redirect(finalURL);
})

module.exports = {
  reqAuthCode,
  getKakaoToken,
  logoutKakao
};


// const getToken = catchAsync(async(req, res) => {
//   const baseURL = "https://kauth.kakao.com/oauth/token";
//   const config = {
//     grant_type : "authorization_code",
//     client_id : process.env.KAKAO_CLIENT_ID,
//     redirect_uri : "http://127.0.0.1:3000/auth/kakao/finish",
//     code : req.query.code
//   };
  
//   const params = new URLSearchParams(config).toString();
//   const finalURL = `${baseURL}?${params}`;
//   const requestToken = await fetch(finalURL, {
//     method : "POST",
//     headers : {
//       "Content-type" : "application/json"
//     }
//   });
  
//   const tokenInfo = await requestToken.json();
  
//   res.send(JSON.stringify(tokenInfo));
// });