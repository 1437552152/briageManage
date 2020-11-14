import axios from "axios";
import { Message } from 'iview';
import router from "../router";
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

// 请求超时时间
axios.defaults.timeout = 10000;
// 请求拦截器
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params = {}) {
let that=this;
  if(url!=='manager/login'){
    axios.defaults.headers.common["token"] = localStorage.getItem("token")||'';
  }
  return new Promise((resolve, reject) => {
   axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        if(err.response.data.responseMessage.errorCode=="G01S0011"){
          Message.error("登陆已失效，请重新登陆");
          router.push({
            path:'/login',
          });
        }
        reject(err.data);
      });
  });
}
