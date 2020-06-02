var app = getApp();
var host = 'https://mobile.yyf2gml.site/restapi/data/bridge/';

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
