// pages/home/home.js
import {
  urlApi,
  host
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
    componentId: "",
    componentIdY: '',
    componentListY: [],
    inspectStatue: '已完成',
    bridgeList: '',
    uploadimages: [],
    // 桥梁列表
    bridgeListData: []
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
    let arr = ['声屏障基础', '声屏障立柱', '屏障板', '连接螺栓', '栏杆基础'];
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
  // 完成状态
  inspectStatue: function () {
    let that = this;
    let arr = ['已完成', '未完成'];
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        arr.map((item, index) => {
          if (index === res.tapIndex) {
            that.setData({
              inspectStatue: item
            })
          }
        })
      }
    })
  },

  // 桥梁选择
  bridgeList: function () {
    let that = this;
     let {bridgeListData} =this.data;
     let arr=[];
     bridgeListData.map(item=>{
      //  item.info
     })



    // let arr = ['杨泗港大桥'];
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        arr.map((item, index) => {
          if (index === res.tapIndex) {
            that.setData({
              bridgeList: item
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
    let arr = ['待维修', '维修中', '已维修'];
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
    // 先请求出桥梁的列表，然后再得到其对应的构件列表
    let that = this;
    //  this.getData();

    this.getBridgeList();
  },
  // 得到桥梁id
  getBridgeList: function () {
    const that = this;
    urlApi('project/list', 'post', {
      systemType: 1
    }).then(res => {
      that.setData({
        bridgeListData: res.data.data
      })
    })
  },

  getData: function () {
    let that = this;
    // 杨四港大桥健康模型
    urlApi('component/list', 'post', {
      bridgeId: '2142055775742176'
    }).then(res => {
      that.setData({
        componentListY: res.data.data
      })

    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  formSubmit(e) {
    let that = this;
    that.setData({
      componentIdY: this.data.componentListY[0].id,
    })

    let params = {};
    for (var p in e.detail.value) { //遍历json对象的每个key/value对,p为key
      params[p] = e.detail.value[p];
    }
    delete params.bridgeList;
    params['inspectStaff'] = this.data.inspectStaff
    params['inspectTime'] = formatTime(new Date());
    params['bridgeId'] = '2142055775742176';
    params['picUrlList'] = this.data.uploadimages;
    params['componentId'] = this.data.componentIdY;
    params['inspectStatue'] = this.data.inspectStatue;

    if (!e.detail.value.pierNoRange) {
      wx.showToast({
        title: '请输入墩号范围',
        icon: 'none'
      })
      return;
    }
    if (!e.detail.value.component) {
      wx.showToast({
        title: '请选择构件',
        icon: 'none'
      })
      return;
    }

    if (!e.detail.value.inspectStatue) {
      wx.showToast({
        title: '请选择完成状态',
        icon: 'none'
      })
      return;
    }

    if (!e.detail.value.componentType) {
      wx.showToast({
        title: '请选择构件类型',
        icon: 'none'
      })
      return;
    }
    if (!e.detail.value.diseaseDesc) {
      wx.showToast({
        title: '请输入病害描述',
        icon: 'none'
      })
      return;
    }
    if (!e.detail.value.diseaseSeverity) {
      wx.showToast({
        title: '请选择严重程度',
        icon: 'none'
      })
      return;
    }
    if (!e.detail.value.dealStatue) {
      wx.showToast({
        title: '请选择处理状态',
        icon: 'none'
      })
      return;
    }
    if (!e.detail.value.urgentType) {
      wx.showToast({
        title: '请选择紧迫度',
        icon: 'none'
      })
      return;
    }
    if (!e.detail.value.diseaseCoordinate) {
      wx.showToast({
        title: '请输入坐标信息',
        icon: 'none'
      })
      return;
    }
    if (!params['picUrlList'].length) {
      wx.showToast({
        title: '请上传图片',
        icon: 'none'
      })
      return;
    }

    wx.showLoading({
      title: "正在提交..."
    })

    urlApi('inspect/add', 'post', params).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '录入成功',
        icon: 'none'
      });

      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/home/home',
        })
      }, 1000)

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
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        wx.showLoading({
          title: '上传中...'
        })

        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        if (images.length > 4) {
          wx.showToast({
            title: '最多只能上传4张图片',
            icon: 'none'
          })
          return;
        };
        var filep = res.tempFilePaths[0];
        wx.uploadFile({
          url: host + "manager/uploads",
          filePath: filep,
          name: 'files',
          header: {
            'token': 'MjAyMTEwMTAxMDEwMTA=',
            "Content-Type": "multipart/form-data"
          },
          formData: {
            'user': 'test'
          },
          success: (val) => {

            let data = JSON.parse(val.data);
            let {
              uploadimages
            } = that.data;
            uploadimages.push(data.data[0])
            that.setData({
              uploadimages: uploadimages
            })
            wx.hideLoading();
          },
          fail: function (err) {
            console.log(err)
          }
        });



        const images1 = images.length <= 4 ? images : images.slice(0, 4);
        this.setData({
          images: images1
        })
      }
    })
  },
  removeImage(e) {
    var that = this;
    var images = that.data.images;
    var uploadimages = that.data.uploadimages;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    images.splice(idx, 1);
    uploadimages.splice(idx, 1)
    this.setData({
      images: images,
      uploadimages: uploadimages
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