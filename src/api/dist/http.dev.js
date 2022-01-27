"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.getImg = getImg;
exports.getFile = getFile;
exports.post = post;
exports.postFile = postFile;
exports.deletes = deletes;
exports.put = put;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
_axios["default"].defaults.timeout = 60000; //超时时间设置

_axios["default"].defaults.withCredentials = true; //true允许跨域
//Content-Type 响应头

_axios["default"].defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

if (process.env.NODE_ENV === "production") {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === "pro") {
    //production 生产环境
    _axios["default"].defaults.baseURL = "https://eta.844307947.xyz/api";
  } else {
    //test 测试环境
    _axios["default"].defaults.baseURL = "https://eta.844307947.xyz/api";
  }
} else {
  //dev 开发环境
  _axios["default"].defaults.baseURL = "http://localhost:8081";
} // 响应拦截器


_axios["default"].interceptors.response.use(function (response) {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    //closeDebug console.log("response.status !== 200");
    return Promise.reject(response);
  }
}, // 服务器状态码不是2开头的的情况
function (error) {
  //closeDebug console.log("请求error：",error)
  if (error.response.status) {
    switch (error.response.status) {
      // 401: 未登录
      case 401:
        router.replace({
          path: "/",
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
        break;

      case 403:
        // //closeDebug console.log('管理员权限已修改请重新登录')
        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
        setTimeout(function () {
          router.replace({
            path: "/",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
        }, 1000);
        break;
      // 404请求不存在

      case 404:
        // //closeDebug console.log('请求页面飞到火星去了')
        break;
      // 404请求不存在

      case 500:
        //closeDebug console.log("服务器处理出错");
        break;
    }

    return Promise.reject(error.response);
  } //closeDebug console.log("response error");

});
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */


function get(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _axios["default"].get(url, {
      params: params
    }).then(function (response) {
      resolve(response.data);
    })["catch"](function (err) {
      reject(err);
    });
  });
}
/**
 * 封装getImg方法
 * @param url
 * @param data
 * @returns {Promise}
 */


function getImg(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _axios["default"].get(url, {
      params: params,
      responseType: "blob" //接收的值类型

    }).then(function (response) {
      resolve(response.data);
    })["catch"](function (err) {
      reject(err);
    });
  });
}
/**
 * 封装getFile方法
 * @param url
 * @param data
 * @returns {Promise}
 */


function getFile(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _axios["default"].get(url, {
      params: params,
      responseType: "blob" //接收的值类型

    }).then(function (response) {
      resolve(response);
    })["catch"](function (err) {
      reject(err);
    });
  });
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */


function post(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _axios["default"].post(url, data).then(function (response) {
      resolve(response.data);
    }, function (err) {
      reject(err);
    });
  });
}
/**
 * 封装带文件上传的post请求
 * @param url
 * @param data
 * @returns {Promise}
 */


function postFile(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _axios["default"].post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(function (response) {
      resolve(response.data);
    }, function (err) {
      reject(err);
    });
  });
}
/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */


function deletes(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _axios["default"]["delete"](url, data).then(function (response) {
      resolve(response.data);
    }, function (err) {
      reject(err);
    });
  });
}
/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */


function put(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _axios["default"].put(url, data).then(function (response) {
      resolve(response.data);
    }, function (err) {
      reject(err);
    });
  });
}