var app = getApp()
var util = require("../../../utils/util")
var QR = require("../../../utils/qrCodeGenerate");
// pages/order/order-detail/order-detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    OrderDetailData: {},
    isLoading: true,
    orderType: 0,
    showCodeBox: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("order--detail----id", options)
    this.options = options;
    this.setData({
      orderType: options.orderType
    })
    this.loadData();
  },
  loadData: function() {
    let url = app.globalData.urlBase + "/spread/mp/order/findOne"
    let param = {
      orderId: this.options.orderId,
      orderType: this.options.orderType
    }
    util.http(url, param).then(this.processOrderDetailData)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  processOrderDetailData: function(data) {
    data.refundRule = util.handleStringToArr(data.refundRule, "<br/>");
    data.attachInfo = JSON.parse(data.attachInfo);
    this.setData({
      OrderDetailData: data,
      isLoading: false
    })
  },

  onViewQrCode: function() {
    wx.navigateTo({
      url: "../qr-code/qr-code?purchaseId=" + this.purId
    })
  },

  cancelOrder: function() {
    let _this = this
    let url = app.globalData.urlBase + "saas-ssp/app/purchase/update"
    let param = {
      purchaseId: this.data.OrderDetailData.id,
      status: 3
    }
    util.http(url, param).then(data => {
      console.info("取消支付：", data)
      if (data.errorCode === 9000) {
        _this.getOrderDetailToPaySuccess(
          "/pages/index/ticket/ticket-detail/purchase/unpaid/cancelOrder/cancelOrder"
        )
      } else {
        wx.showToast({
          title: errorMessage,
          icon: "none",
          duration: 1000
        })
      }
    })
  },

  continueToPay: function() {
    // 调统一支付接口
    let url = app.globalData.urlBase + "saas-ssp/app/wx/wapTrade"
    let param = {
      channel: "wx",
      payOrderId: this.data.OrderDetailData.id,
      amount: this.data.OrderDetailData.realPrice,
      custId: app.globalData.g_loginState.userId
    }
    util.http(url, param).then(this.processRepay)
    // 调微信支付
  },

  // 处理支付结果
  processRepay: function(data) {
    console.info("统一支付的返回值data：", data)
    let _this = this
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.packages,
      signType: "MD5",
      paySign: data.paySign,
      success: function(res) {
        console.info("支付成功:", res)
        // 支付成功后修改订单状态
        _this.getOrderDetailToPaySuccess(
          "/pages/index/ticket/ticket-detail/purchase/pay-success/pay-success"
        )
      },
      fail: function(res) {
        console.info("取消支付：", res)
        wx.showToast({
          title: "支付未成功，请重试",
          icon: "none",
          duration: 1000
        })
      }
    })
  },

  // 支付成功后调订单详情，传给支付成功页面
  getOrderDetailToPaySuccess: function(subpageUrl) {
    // 查询商品详情并传递到支付成功页面
    let url2 = app.globalData.urlBase + "saas-ssp/app/purchase/queryDetail"
    let param2 = {
      purId: this.data.OrderDetailData.id,
      shopId: app.globalData.g_shopId,
      custId: app.globalData.g_loginState.userId
    }
    util.http(url2, param2).then(data => {
      let tmp = {}
      tmp.title = data.title
      tmp.oriPrice = data.price
      tmp.goodsNum = data.num
      tmp.discount = data.couponMoney
      tmp.realMoney = data.realPrice
      tmp.purId = this.data.OrderDetailData.id
      tmp.orderDate = data.createTime
      let params = util.stringifyParams(tmp)
      // 跳转到支付成功页面
      wx.redirectTo({
        url: subpageUrl + params
      })
    })
  },
  cancelReservation: function(e) {
    let _this = this,
      orderStatus = e.currentTarget.dataset.status;
    let url = app.globalData.urlBase + '/spread/mp/appoint/inTimecancelTips';

    util.http(url, {
      orderId: this.options.orderId,
      orderType: this.options.orderType
    }).then((res) => {
      if (res.errorCode == '9000') {
        wx.showModal({
          content: res.refundRule,
          cancelText: '我再想想',
          success(res) {
            if (res.confirm) {
              _this.httpCancelReservation();
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.errorMessage,
          showCancel: false
        })
      }
    })
  },
  httpCancelReservation: function() {
    let url = app.globalData.urlBase + '/spread/mp/appoint/cancel';
    util.http(url, {
      appointId: this.options.orderId
    }).then(res => {
      if (res.errorCode === 9000) {
        this.loadData()
        wx.showModal({
          title: '预约已为您取消',
          content: `押金会在${res.refundWaitDay}个工作日内返还于你的微信钱包,根据您的取消预约时间，退还您${res.refundAmount}元的押金`,
          showCancel: false
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.errorMessage,
          showCancel: false
        })
      }
    })
  },
  openSocket: function() {
    let _this = this;
    util.socketConnect().then(() => {
      wx.onSocketMessage(res => {
        console.log('收到服务器内容：' + res.data);
        if (res.data === '核销成功！') {
          wx.showModal({
            title: '提示',
            content: '核销成功',
            showCancel: false,
            success(res) {
              _this.loadData();
              _this.setData({
                showCodeBox: false
              })
            }
          })
        }
      });
    });
  },
  closeSocket: function() {
    util.closeSocketFn();
  },
  viewVerifyCode: function(e) {
    // verifyId



    let verifyId = e.currentTarget.dataset.id,
      orderType = e.currentTarget.dataset.type,
      url = app.globalData.urlBase + '/spread/mp/verify/generateVerifyCode';
    this.currentItemIndex = e.currentTarget.dataset.index;

    util.http(url, {
      verifyId: verifyId,
      verifyType: 1,
      orderType: orderType
    }).then(this.onViewQrCode);


    this.setData({
      showCodeBox: true
    })
  },
  onViewQrCode: function(res) {

    let qrCodeData = {};
    qrCodeData.verificationCode = res.verifyCode;
    this.setData({
      isShowQrCode: true,
      qrCodeData
    });
    if (qrCodeData.verificationCode != null) {
      this.generateCanvas(qrCodeData.verificationCode);
    } else {
      wx.showToast({
        title: '核销码获取失败，请刷新后重试。如仍无法获取，请联系游乐园解决！',
        icon: 'none',
        duration: 1500
      });
    }
  },
  // canvas二维码实现
  generateCanvas: function(initUrl) {
    let size = this.setCanvasSize(); //动态设置画布大小
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);

  },

  setCanvasSize: function() {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 400; //不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      console.info('res.windowWidth/scale', width);
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  createQrCode: function(url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    this.openSocket();
    setTimeout(() => {
      this.canvasToTempImage();
    }, 1000);
  },

  canvasToTempImage: function() {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        console.log('tempFilePath:', tempFilePath);
      },
      fail: function(res) {
        console.log('canvas绘制失败：', res);
      }
    });
  },
  hideCodeBox: function() {
    this.closeSocket();
    this.setData({
      showCodeBox: false
    })
  }
})