// pages/index/calendar/calendar.js
var app = getApp()
const util = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '',
    endTime: '',
    systemInfo: {},
    daysTime: '',
    isLoading: true,
    appointPlans: [],
    appointMonthGroupPlans: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let _this = this;
    this.options = options;
    wx.getSystemInfo({
      success: function(res) {
        let screenWidth = res.windowWidth,
          dayContainerWidth = Math.floor((screenWidth / 7) * 100) / 100;
        _this.setData({
          systemInfo: res,
          dayContainerWidth: dayContainerWidth
        });
      }
    })

    let url = app.globalData.urlBase + "/spread/mp/goods/findAppointPlan";
    util.http(url, {
      skuId: options.skuId
    }).then(res => {
      if (res.errorCode === 9000) {
        if (res.appointMonthGroupPlans.length === 0) {
          _this.alertBack('没有库存');
        }
        _this.obj = {
          depositAmount: res.depositAmount,
          imgs: res.imgs,
          refundRule: res.refundRule,
          shopAddress: res.shopAddress,
          shopName: res.shopName,
          spuName: options.spuName,
          skuId: options.skuId
        }
        _this.appointAttachRule = res.appointAttachRule;
        _this.appointTips = res.appointTips;
        _this.setData({
          startTime: res.useStartTime,
          endTime: res.useEndTime,
          appointPlans: res.appointPlans,
          appointMonthGroupPlans: res.appointMonthGroupPlans,
          isLoading: false
        })
      } else {
        _this.alertBack(res.errorMessage);
      }
    })
  },
  alertBack: function(mess) {
    wx.showModal({
      title: '错误',
      content: mess,
      showCancel: false,
      success(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  choseDate: function(e) {
    let bool = e.currentTarget.dataset.available,
      daysTime = e.currentTarget.dataset.daystime;
    if (!bool) {
      return false;
    }
    this.setData({
      daysTime: daysTime
    })
  },
  confimDate: function() {
    let chosenDate = this.data.daysTime,
      _this = this;
    if (!chosenDate) {
      wx.showModal({
        content: '请选择日期',
        showCancel: false
      })
      return false;
    }
    if (this.options.accessAppointFlag === '0') {
      wx.showModal({
        title: "温馨提示",
        content: "购买会员卡，才能预约权益商品",
        confirmText: '去购买',
        success(res) {
          if (res.confirm) {
            let params = util.stringifyParams({
              skuId: _this.options.skuId,
              spuId: _this.options.spuId
            })
            wx.navigateTo({
              url: '/pages/index/playcard/playcard' + params,
            })
          }
        }
      })
      return false;
    }
    let url =
      app.globalData.urlBase +
      "/spread/mp/mine/hasAppointOfVipCard";
    wx.showLoading();
    util.http(url, {
      skuId: this.options.skuId
    }).then(res => {
      if (res.errorCode === 9000) {
        if (res.hasAppointOfVipCard) {
          wx.showModal({
            title: "温馨提醒",
            content: "您已经预定过相关的订单，未使用前，不可以继续预约",
            confirmText: "查看订单",
            confirmColor: "#02BB00",
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: "/pages/order/order"
                })
              }
            }
          })
        } else if (JSON.parse(_this.appointAttachRule).length) {
          let params = util.stringifyParams({
            ..._this.obj,
            chosenDate: chosenDate,
            appointAttachRule: _this.appointAttachRule,
            appointTips: _this.appointTips
          })
          wx.navigateTo({
            url: '/pages/index/customerForm/customerForm' + params
          })

        } else {
          let params = util.stringifyParams({
            ..._this.obj,
            chosenDate: chosenDate
          })
          wx.navigateTo({
            url: '/pages/index/reservation/reservation' + params
          })
        }
      }
      wx.hideLoading();
    })

  },
  scrollFuc: function() {
    //[7,8,9,10,11,12,13]    4/3 = 1
    // [o,o,o,o,o,o,o,o,o,o,o,o,o,o,]

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