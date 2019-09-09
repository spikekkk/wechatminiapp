// pages/index/reservation/reservation.js
var app = getApp()
const util = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsData: [],
    chosenDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.params = options;
    this.options = options;
    let chosenDate = new Date(parseInt(options.chosenDate));
    this.refundRule = options.refundRule.split('<br/>').join('\n');

    this.setData({
      chosenDate: util.timeFormat('yyyy-MM-dd', chosenDate),
      imgsData: util.handleStringToArr(options.imgs, ","),
      depositAmount: options.depositAmount,
      refundRule: this.refundRule,
      shopAddress: options.shopAddress,
      shopName: options.shopName,
      spuName: options.spuName
    })
  },
  backToChoseDate: function() {
    wx.navigateBack({
      delta: 1
    })
  },
  reservationPay: function() {
    let _this = this,
      text1 = '';
    wx.showModal({
      title: '提示',
      content: _this.refundRule,
      confirmText: '继续预约',
      cancelText: '我再想想',
      success(res) {
        if (res.confirm) {
          _this.beforeCreateOrder();
        }
      }
    })
  },
  beforeCreateOrder: function() {
    let _this = this;
    this.createOrder().then(res => {
      if (res.errorCode === 9000) {
        _this.params.orderId = res.appointId;
        let url = app.globalData.urlBase + '/spread/mp/appoint/pay';
        util.http(url, {
          appointId: res.appointId
        }).then(this.processPay)
      } else {
        wx.hideLoading({
          success() {
            wx.showModal({
              title: '提示',
              content: res.errorMessage
            })
          }
        });
      }
    })
  },
  createOrder: function() {
    wx.showLoading();
    let appointDay = this.options.chosenDate,
      skuId = this.options.skuId,
      url = app.globalData.urlBase + '/spread/mp/appoint/create';
    return util.http(url, {
      skuId: skuId,
      appointDay: appointDay,
      price: this.options.depositAmount,
      formInfoJson: this.options.formInfoJson
    })
  },
  processPay: function(data) {
    if (data.errorCode === 9000) {
      this.params.orderType = 2;
      this.params = Object.assign(this.params, data);

      let params = util.stringifyParams(this.params);

      // wx.navigateTo({
      //   url: "pay-success/pay-success" + params
      // });
      // return false;
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.packages,
        signType: data.signType,
        paySign: data.paySign,
        success: function(res) {
          wx.navigateTo({
            url: "/pages/index/ticket/ticket-detail/purchase/pay-success/pay-success" + params
          })
        },
        fail: function(res) {
          console.info("取消支付：", res)
          wx.switchTab({
            url: '/pages/order/order'
          })
        }
      })
    } else {
      wx.showToast({
        title: data.errorMessage,
        icon: "none",
        duration: 1000
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})