var app = getApp();
var host = 'https://111.4.119.69:40605/restapi/data/bridge/';

var urlApi = (url, method, data={}) => {
  return new Promise((res, rej) => {
    wx.request({
      url: host + url,
      header: {},
      data: data,
      method: method,
      success: ret => {
        res(ret);
      },
      fail: rej
    })
  })
}

module.exports = {
  urlApi:urlApi,
  host
}
