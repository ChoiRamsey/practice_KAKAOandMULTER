const fetch = require('node-fetch');
const { userDao } = require('../models');
const jwt = require('jsonwebtoken');

const signIn = async(kakaoToken) => {
  const userInfo = await (
    await fetch("https://kapi.kakao.com/v2/user/me", {
    headers : {
      "Authorization" : `Bearer ${kakaoToken}`      
      }
    })
  ).json();
  
  const kakaoId = userInfo["id"];
  const username = userInfo["kakao_account"]["profile"]["nickname"];
  const email = userInfo["kakao_account"]["email"];

  let member = await userDao.getUserByKakaoId(kakaoId);
  
  if (!member) {
    await userDao.createUser(kakaoId, username, email);
    member = await userDao.getUserByKakaoId(kakaoId);
  }

  const accessToken = jwt.sign({ id : member["platform_member_id"] }, process.env.JWT_SECRET,
    {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
  
  return accessToken;
}

const getUserByKakaoId = async (kakaoId) => {
  return await userDao.getUserByKakaoId(kakaoId);
};

module.exports = {
  signIn,
  getUserByKakaoId
}

// "Content-type" : "application/x-www-form-urlencoded;charset=utf-8"