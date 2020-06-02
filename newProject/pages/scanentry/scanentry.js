// pages/home/home.js
import {
  urlApi
} from '../../utils/request';
import {
  formatTime
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    inspectStaff: wx.getStorageSync('userInfo').nickName,
    pierNoRange: '',
    componentType: '',
    component: '',
    diseaseDesc: '',
    diseaseCoordinate: '',
    diseaseSeverity: '',
    dealStatue: '',
    urgentType: '',
    componentId:"",
    componentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '扫描录入'
    })
  },
  onPageScroll: function (e) {
    if (e.scrollTop < 0) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  component: function () {
    let that = this;
    let arr = ['声屏障基础', '声屏障立柱', '屏障板','连接螺栓','栏杆基础'];
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        arr.map((item, index) => {
          if (index === res.tapIndex) {
            that.setData({
              component: item
            })
          }
        })
      }
    })
  },
  // 构件类型
  componentType: function () {
    let that = this;
    let arr = ['附属结构', '上部结构', '下部结构'];
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        arr.map((item, index) => {
          if (index === res.tapIndex) {
            that.setData({
              componentType: item
            })
          }
        })
      }
    })
  },
  urgentType: function () {
    let that = this;
    let arr = ['紧急', '不紧急'];
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        arr.map((item, index) => {
          if (index === res.tapIndex) {
            that.setData({
              urgentType: item
            })
          }
        })
      }
    })
  },
  diseaseSeverity: function () {
    let that = this;
    let arr = ['轻度', '重度'];
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        arr.map((item, index) => {
          if (index === res.tapIndex) {
            that.setData({
              diseaseSeverity: item
            })
          }
        })
      }
    })
  },
  dealStatue: function () {
    let that = this;
    let arr = ['待维修', '维修中','已维修'];
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        arr.map((item, index) => {
          if (index === res.tapIndex) {
            that.setData({
              dealStatue: item
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     this.getData();
  },
  getData:function(){
    let that=this;
    
    urlApi('component/list','post',{bridgeId:'62924801-9263-4a15-89a3-933563bcdf49'}).then(res=>{
      that.setData({
        componentList:res.data.data
      })
     
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  formSubmit(e) {
     let that=this;
     let index = Math.floor((Math.random()*this.data.componentList.length)); 
          that.setData({
            componentId:this.data.componentList[index].id
          })

   let params={};  
   for(var p in e.detail.value){//遍历json对象的每个key/value对,p为key
    params[p]=e.detail.value[p];
   }
   params['inspectStaff']=this.data.inspectStaff
   params['inspectTime']=formatTime(new Date())
   params['bridgeId']='62924801-9263-4a15-89a3-933563bcdf49';
   params['picUrl']='https://111.4.119.69:40605/total.png';
   params['componentId']=this.data.componentId;

if(!e.detail.value.pierNoRange){
wx.showToast({
  title: '请输入墩号范围',
  icon:'none'
})
return;
}
if(!e.detail.value.component){
  wx.showToast({
    title: '请选择构件',
    icon:'none'
  })
  return;
  }
  if(!e.detail.value.componentType){
    wx.showToast({
      title: '请选择构件类型',
      icon:'none'
    })
    return;
    }
    if(!e.detail.value.diseaseDesc){
      wx.showToast({
        title: '请输入病害描述',
        icon:'none'
      })
      return;
      }
      if(!e.detail.value.diseaseSeverity){
        wx.showToast({
          title: '请选择严重程度',
          icon:'none'
        })
        return;
        }
        if(!e.detail.value.dealStatue){
          wx.showToast({
            title: '请选择处理状态',
            icon:'none'
          })
          return;
          }
          if(!e.detail.value.urgentType){
            wx.showToast({
              title: '请选择紧迫度',
              icon:'none'
            })
            return;
            }
            if(!e.detail.value.diseaseCoordinate){
              wx.showToast({
                title: '请输入坐标信息',
                icon:'none'
              })
              return;
              }


   urlApi('inspect/add','post',params).then(res=>{
     
     wx.showToast({
       title: '录入成功',
     })
   })
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
  // 点击拍照
  clickPhoto: function () {

  },
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        const images1 = images.length <= 3 ? images : images.slice(0, 3)
        this.setData({
          images: images1
        })
      }
    })
  },
  removeImage(e) {
    var that = this;
    var images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    images.splice(idx, 1)
    this.setData({
      images: images
    })
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
})