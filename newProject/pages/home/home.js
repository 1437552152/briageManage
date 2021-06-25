// pages/home/home.js
import {
  urlApi
} from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: "",
    totalNum: 0,
    MonthNum: 0,
    objUserInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.setNavigationBarTitle({
      title: '首页'
    })
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        that.setData({
          location: "湖北省武汉市"
        })

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    this.setData({
      objUserInfo: wx.getStorageSync('userInfo')
    });
    urlApi('inspect/main', 'post', {}).then(res => {
      that.setData({
        totalNum: res.data.data.sum,
        MonthNum: res.data.data.countCurrentMonth
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 页面跳转(需带巡检记录参数)
  gotoScanentry: function () {
    let userInfo = wx.getStorageSync("userInfo");
    if (!userInfo) {
      wx.navigateTo({
        url: `/pages/boots/boots`
      })

    } else {
      wx.navigateTo({
        url: '../scanentry/scanentry'
      })
    }
  },
  gotoCheckRecord: function () {
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      wx.navigateTo({
        url: '../scansubmit/scansubmit'
      })
    } else {
      wx.navigateTo({
        url: `/pages/boots/boots`
      })
    }
  }
})