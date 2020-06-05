// pages/boots/boots.js
var t = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onPageScroll:function(e){
    if(e.scrollTop<0){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      backgroundColor:"#041B1e",
      frontColor:'#ffffff'
    });
  },

  onGotUserInfo(e) {
   
    var that = this
    if (e.detail.errMsg ==='getUserInfo:ok'){
      wx.login({
        success: function (a) {
          wx.getUserInfo({
            success: function (e) { 
              wx.setStorageSync("userInfo", e.userInfo);    
              wx.navigateTo({
                url:"/pages/home/home",
              })
             
              // let params={};
              // params['signature'] = e.signature;
              // params['raw_data'] = e.rawData;
              // params['iv'] = e.iv;
              // params['encrypted_data'] = e.encryptedData;
              // params['code'] = a.code;
              // urlApi("/user/Login/wechatLogin","post",params).then((res)=>{
              //   if(res.data.code){
              //     console.log(res.data.data)
               
              //     wx.navigateTo({
              //       url:"/pages/home/home",
              //     })
              //   }else{
              //     wx.showToast({
              //       title: res.data.msg
              //     })
              //   }            
              // })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
})