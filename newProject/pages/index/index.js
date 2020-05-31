// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '启动页' 
    })
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({ pageHeight: res.windowHeight })
      },
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
      const that = this
      setTimeout(() => {
        let userInfo = wx.getStorageSync("userInfo");
        wx.getSetting({
          success: function (respon) {
            if (respon.authSetting['scope.userInfo'] && userInfo) {
              wx.navigateTo({
                url: "/pages/home/home"
              })
            }else{
              wx.navigateTo({
                url: "/pages/boots/boots"
              })
            }
          },
          fail: function () {
            wx.navigateTo({
              url: "/pages/boots/boots"
            })
          }
        })
      }, 3000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  onPageScroll:function(e){
    if(e.scrollTop<0){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
