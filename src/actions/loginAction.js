'use strict';

import * as types from '../constants/loginTypes';// 导入事件类型,用来做分配给各个事件
import { PublicParam } from '../utils/config.js'
import CryptoJS from 'crypto-js'
const { PostLoginUrl } = PublicParam


// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理

export function login(userName, passWord) {
  console.log('登录方法', userName, passWord, CryptoJS.MD5(passWord).toString());
  // if (userName.length > 0 && passWord.length > 0) {

  const MD5Password = CryptoJS.MD5(passWord).toString()
  return dispatch => {
    dispatch(isLogining()); // 正在执行登录请求
    // 模拟用户登录
    let result = fetch(PostLoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Account: userName,
        Pwd: MD5Password
      })
    }).then((res) => {
      return res.json()
      // dispatch(loginSuccess(true, user)); // 登录请求完成
    }).then((resJson) => {
      if (resJson.Data == null) {
        console.log('resJson.Data==null', resJson);
        dispatch(loginError(false)); // 登录请求出错
      } else if (resJson.Data != null) {
        const user = {
          name: resJson.Data.Account,
          userId: resJson.Data.Id
        }
        console.log('login(userName, passWord) {', user, resJson);
        dispatch(loginSuccess(true, user)); // 登录请求完成
      }
    }).catch((e) => {
      console.log('catch((e)', e);
      dispatch(loginError(false)); // 登录请求出错
    })
  }
  // } else {
  //   return dispatch => {
  //     dispatch(loginError(false)); // 登录请求失败
  //   }
  // }
}

function isLogining() {
  return {
    type: types.LOGIN_IN_DOING
  }
}

function loginSuccess(isSuccess, user) {
  console.log('success');
  return {
    type: types.LOGIN_IN_DONE,
    user: user,
  }
}

function loginError(isSuccess) {
  console.log('error');
  return {
    type: types.LOGIN_IN_ERROR,
    message: '账号密码错误',
  }
}


    // let result = fetch('https://www.baidu.com/')
    // .then((res) => {
    //   const user = userName
    //   dispatch(loginSuccess(true, user)); // 登录请求完成
    // }).catch((e) => {
    //   console.log('catch((e)', e);
    //   dispatch(loginError(false)); // 登录请求出错
    // })