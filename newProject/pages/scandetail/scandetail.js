// pages/home/home.js
import {
  urlApi
} from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'已完成',
    number:"111",
    component:"武汉长江大桥",
    objDta:null,
    componentChild:85,
    pier:11,
    id:0,
    coordinate:11,
    description:"因为某种原因受损因为某种原因受损因为某种原因受损因为某种原因受损因为某种原因受损因为某种原因受损因为某种原因受损因为某种原因受损因为某种原因受损因为某种原因受损因为某种原因受损",
    imgData:[{url:'/static/image/demoimg.png'},{url:'/static/image/demoimg.png'},{url:'/static/image/demoimg.png'},{url:'/static/image/demoimg.png'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({status:options.qq,id:options.id})
    wx.setNavigationBarTitle({
      title: '上报记录详情'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPageScroll:function(e){
    if(e.scrollTop<0){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that=this;
    urlApi('inspect/detail','post',{id:this.data.id}).then(res=>{
       that.setData({objDta:res.data})
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
})