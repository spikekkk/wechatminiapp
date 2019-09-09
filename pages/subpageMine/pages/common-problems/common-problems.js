// pages/mine/common-problems/common-problems.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qusetions: [],
    slide: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const qusetions = [{
        'title': '会员卡激活有效期是多久？',
        'results': '激活有效期限截至2019年12月31日，未在此日期前激活的实体卡将自动作废，请您在购卡后及时激活使用。'
      },
      {
        'title': '会员卡可以绑定多张吗？',
        'results': '惠吧会员卡为实名制卡，小程序需要获取会员的微信授权，同时绑定会员的手机号码。一个手机号码最多只能同时绑定一张成人卡和一张亲子卡，不可同时绑定多张成人卡或多张亲子卡。'
      },
      {
        'title': '会员卡可以给朋友使用（绑定朋友信息）吗？',
        'results': '不建议，因为相当于绑定了朋友的身份信息，以后如果在需要身份证核验的乐园，需要提供朋友的身份证，有可能导致自己无法入园。、'
      },
      {
        'title': '会员卡激活绑定爸爸（或妈妈）信息之后，下次能让妈妈（或爸爸）带孩子进乐园游玩吗？',
        'results': '实名制卡，出票人信息绑定身份证。如果绑定身份证之后出票，更换人员进场，惠吧会员卡不能保证一定能顺利入园。建议绑定常用人员的信息。如果双人出行比较多，建议购买1张亲子卡+1张成人卡。或者购买2张亲子卡（二宝家庭）'
      },
      {
        'title': '会员卡激活后能转让吗？',
        'results': '惠吧会员卡是实名制会员卡，景区乐园仅限本人使用。激活之后不得转让、转赠、转赠或变现。'
      },
      {
        'title': '可以同时预约好几个景区乐园吗？',
        'results': '会员使用免费游玩景区乐园权限时，每张卡每次只可预约1个景区乐园。'
      },
      {
        'title': '预约成功之后可以更改选择其他乐园游玩吗？',
        'results': '不可以，会员确认订单预约乐园后，订单即被锁定；如需更改预约的乐园景区，您可以取消订单后重新预约。'
      },
      {
        'title': '预约以后，因为各种原因需要取消预约，取消预约的规则是怎么样的？',
        'results': '若因您个人原因无法前往预约场所，需提前24小时申请取消订单。如您未能提前24小时申请取消订单，平台将扣除30%的保证金。如会员在预约日当天未能前往预约场所，平台将扣除全额保证金。某些特殊景区乐园取消预约无法退还保证金，请您在预约时慎重考虑，提前安排好出行计划，无法退还保证金的景区乐园可在“惠吧会员卡”官方小程序查询，在您预约时也会有相应提示和说明。'
      },
      {
        'title': '预约之后如何入园游玩？',
        'results': '会员在预约的游玩日前2天内，将在注册手机号上收到对应的票务信息。请及时关注手机短信（安卓手机如未收到可以先看下拦截通知）。如会员在游玩日前一天还未收到票务短信（确认手机号未欠费以及未被拦截），及时和惠吧会员卡联系，联系电话：0571-56103830，或在小程序内联系客服。一般提供身份证入园或者短信电子票的形式，大部分乐园都不需要在现场换票。直接在入园闸机处使用身份证或者我们短信生成的二维码即可入园。'
      },
      {
        'title': '同时绑定会员卡和亲子卡，2个卡的预约时间不一样？',
        'results': '目前会员卡和亲子卡的库存是分开设置的，所以会导致2个卡的预约时间不一样。亲子卡乐园和成人卡乐园在“门票图片左上角”都有明显标识（亲子卡专属和成人卡专属），建议您仔细查看小程序上的提示。'
      },
      {
        'title': '购买了亲子卡，游玩的时候可以只去一个大人吗？',
        'results': '可以，亲子卡支持单独预约成人票，只需要在小程序单独预约成人票即可。'
      },
      {
        'title': '儿童入园的时候需要提供什么凭证吗',
        'results': '如是免票儿童，或者是享受儿童票的儿童，入场的时候无需提供身份证明，只需提供短信核销二维码。部分乐园需要提供儿童学生证或者身份证、户口本，请关注预约说明。部分乐园在成人携带一名儿童的情况下，不允许带第二名免票儿童入场。（具体请咨询相关景区）'
      },
      {
        'title': '去景区游玩之后可以立刻预约其他景区吗？',
        'results': '会员已经预约成功，在本次游玩乐园的当天中午12点之后，即可进行下一次预约。（比如您预约了10月1日的成都欢乐谷游玩，在10月1日12点之后，即可进行下一次预约。）'
      },
      {
        'title': '为何收取保证金？保证金收取标准是？',
        'results': '为了避免出现恶意预约的情况，保证会员的权益更有保障，惠吧会员卡需要您在预约的时候支付保证金。预约景区乐园时需预付门票费用作为保证金，保证金金额以该景区乐园公布的标准价格计算，具体以实际支付为准。在按时游玩之后，该笔保证金予以退还。'
      },
      {
        'title': '保证金退回到哪里？',
        'results': '保证金在游玩日之后的一个工作日内退还至会员付款时的银行卡或其他付款账户中。'
      }
    ];
    this.slideArr = [];
    qusetions.forEach((item, index) => {
      if (index === 0) {
        this.slideArr.push(true)
      } else {
        this.slideArr.push(false)
      }
    })
    this.setData({
      qusetions: qusetions,
      slide: this.slideArr
    })
  },
  slideAction: function(e) {
    let index = e.currentTarget.dataset.index;
    this.slideArr[index] = !this.slideArr[index];
    console.log(this.slideArr);
    this.setData({
      slide: this.slideArr
    })
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

  },
  makePhoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: '0571-56103830'
    })
  }
})