// pages/boots/boots.js
var t = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: '',
    type: 1
  },
  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      path: options.path,
      type: options.type || 1
    })


    wx.setNavigationBarColor({
      backgroundColor: "#041B1e",
      frontColor: '#ffffff'
    });
  },

  onGotUserInfo(e) {
    var that = this
    if (e.detail.errMsg === 'getUserInfo:ok') {
      wx.login({
        success: function (a) {
          wx.getUserInfo({
            success: function (e) {
              wx.setStorageSync("userInfo", e.userInfo);
              if (that.data.type == 1 || !that.data.type) {
                wx.navigateTo({
                  url: "/pages/home/home",
                })
              }
            }
          })
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  refuse: function () {
    wx.navigateBack({})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})