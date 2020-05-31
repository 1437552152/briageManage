// pages/home/home.js
import {
  urlApi
} from '../../utils/request';
import {
  formatTimeCopy
} from '../../utils/util';



Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    desc: "所有",
    noCompet: [],
    Compet: [],
    startTime: '',
    endTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.setNavigationBarTitle({
      title: '上报记录'
    })

    this.getData();

  },
  getData: function () {
    var that = this;
    urlApi('inspect/list', 'post', {
      "inspectStatue": "未完成",
      startTime: that.data.startTime,
      endTime: that.data.endTime
    }).then(res => {
      that.setData({
        noCompet: res.data.data
      })
    })
    urlApi('inspect/list', 'post', {
      "inspectStatue": "已完成",
      startTime: that.data.startTime,
      endTime: that.data.endTime
    }).then(res => {
      that.setData({
        Compet: res.data.data
      })
    })
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  gotoDetail: function (e) {
    const {
      status
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../../pages/scandetail/scandetail?qq=' + status,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  listqy: function () {
    const that = this;
    let arr = ['所有', '本月']
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        that.setData({
          desc: arr[res.tapIndex]
        });

        if (!res.tapIndex) {
          that.setData({
            startTime: '',
            endTime: ''
          });
         
          that.getData();
        } else {
          that.setData({
            startTime: `${formatTimeCopy(new Date())}000000`,
            endTime: `${formatTimeCopy(new Date())}315959`
          })
          that.getData();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
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
  // 点击拍照
  clickPhoto: function () {

  }
})