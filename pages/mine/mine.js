// pages/my/my.js
var app = getApp()
var util = require("../../utils/util")
let paddingWidth = 72,
  cardWidth = 608,
  marginWidth = 30;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: [{
        img: "/images/icon/menpiao.png",
        text: "门票",
        num: ""
      },
      {
        img: "/images/icon/xiaofeika.png",
        text: "消费卡",
        num: ""
      }
    ],
    device: [{
        iconUrl: "/images/icon/icon-shoucang.png",
        title: "我的收藏",
        // desc: "进行中"
        desc: ""
      },
      {
        iconUrl: "/images/icon/icon-jh.png",
        title: "激活会员卡",
        // desc: "进行中"
        desc: ""
      }
    ],
    mineNumData: {},
    summaryInfoData: null,
    levelImage: "",
    isLoading: true,
    indexOfCurrentDevice: null,
    ticketNum: 0,
    consumerCardNum: 0,
    activePlaycard: 0,
    showPlayCardList: false,
    playCardList: [],
    showCustomerServicr: false,
    choseAnimate: false,
    haveCard: false,
    navHeight: 0,
    customerServiceImg: "https://img.ishanshan.com/gimg/user/n///1561380477.jpg",
    cardOffsetX: 0,
    moveableAreaWidth: 0,
    moveableViewWidth: 0,
    cardList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getTabBar().setData({
    //     active: "mine"
    // })
    // wx.getSystemInfo({
    //   success: function(res) {
    //     console.log('phone-mess-----------------------------------', res);
    //   },
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // let url = app.globalData.urlBase + "/spread/mp/mine/getMineNum"
    // util.http(url, {}).then(res => {
    //   this.data.info[0].num = res.ticketNum
    //   this.data.info[1].num = res.consumerCardNum
    //   this.setData({
    //     info: this.data.info
    //   })
    // })
    util.updateSession();
    this.setAniation()
    this.getMyCardList();
    let url = app.globalData.urlBase + "/spread/mp/auth/session"
    util.http(url, {}).then(res => {
      if (res.errorCode === 9000) {
        this.setData({
          userInfo: res,
          isLoading: true
        })
        /*是否购买会员卡*/
        if (res.vipLevel > 1) {
          this.setData({
            haveCard: true
          })
          console.log(
            "是否有卡--------",
            wx.getStorageSync("g_userInfo")
          )
        }
      }
    })
  },
  getMyCardList: function() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          navHeight: res.statusBarHeight
        })
      }
    })
    // return false;
    this.scrollIndex = 0;
    let url = app.globalData.urlBase + '/spread/mp/mine/queryMineSuperCard',
      _this = this;
    util.http(url, {}).then(res => {
      if (res.errorCode === 9000) {
        let list = res.superCards;
        _this.cardNum = list.length
        let moveableAreaWidth = list.length * cardWidth + (list.length - 1) * marginWidth,
          moveableViewWidth = list.length * cardWidth + (list.length - 1) * marginWidth + 2 * paddingWidth;
        list.forEach(item => {
          item.rights = item.buyNotice.split('<br>');
          return item;
        })
        this.setData({
          moveableAreaWidth: moveableAreaWidth,
          moveableViewWidth: moveableViewWidth,
          cardOffsetX: 0,
          cardList: list
        })
      } else {

      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      indexOfCurrentDevice: null
    })
  },
  //跳转首页
  goHead: function() {
    wx.switchTab({
      url: "/pages/index/index"
    })
  },
  canQrcode: function() {
    wx.navigateTo({
      url: '/pages/subpageMine/pages/write-off/write-off',
    })

  },
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

  showPlayCardListAction: function() {
    let url = app.globalData.urlBase + "/spread/mp/mine/queryMineSuperCard"
    util.http(url, {}).then(res => {
      if (res.superCards) {
        this.setData({
          showPlayCardList: true,
          playCardList: res.superCards
        })
      } else {
        wx.showModal({
          title: "提示",
          content: "暂无会员卡",
          showCancel: false
        })
      }
    })
  },
  hidePlaycardList: function() {
    this.setData({
      showPlayCardList: false
    })
  },
  hideCS: function() {
    this.setData({
      showCustomerServicr: false
    })
  },
  customerServiceAction: function() {
    this.setData({
      showCustomerServicr: true
    })
  },
  toPlaycardDetail: function(e) {
    let cardId = e.currentTarget.dataset.cardId
    this.setData({
      choseAnimate: true
    })

    setTimeout(() => {
      this.setData({
        choseAnimate: false
      })
      wx.navigateTo({
        url: "/pages/mine/my-playcard"
      })
    }, 100)
  },
  onNavToSubpage: function(e) {
    let index = e.currentTarget.dataset.index
    let pageArr = ["my-tickets/my-tickets", "expense-card/expense-card"]
    wx.navigateTo({
      url: pageArr[index]
    })
  },

  onNavToDevice: function(e) {
    let index = e.currentTarget.dataset.index
    let deviceArr = [
      "/pages/subpageMine/pages/my-collections/my-collections",
      "/pages/subpageMine/pages/activation/activation"
    ]
    this.setData({
      indexOfCurrentDevice: index
    })
    setTimeout(() => {
      if (deviceArr[index] != null) {
        wx.navigateTo({
          url: deviceArr[index]
        })
      } else {
        wx.showToast({
          title: "正在努力开发中，敬请期待。",
          icon: "none",
          duration: 1500
        })
        this.setData({
          indexOfCurrentDevice: null
        })
      }
    }, 100)
  },
  navigateToPaycardDetail: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/mine/my-playcard/my-playcard?id=" + id
    })
  },
  //跳转常用联系人
  contactsAction: function() {
    wx.navigateTo({
      url: "/pages/mine/contacts/contacts"
    })

    // wx.navigateTo({
    //   url: "/pages/index/ticket/ticket-detail/purchase/pay-success/pay-success",
    // })
  },
  setAniation: function() {
    var animationUp = wx.createAnimation({
      timingFunction: "ease-in-out"
    })
    this.animationUp = animationUp
  },
  downloadImage: function() {
    //https://img.ishanshan.com/gimg/user/n///1561380477.jpg

    // wx.saveImageToPhotosAlbum(Object object)
    let img = this.data.customerServiceImg
    wx.getImageInfo({
      src: img,
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success(res) {
            wx.showToast({
              title: "下载成功",
              icon: "none"
            })
          }
        })
      }
    })
  },
  movableChange: function(e) {
    // console.log(e);
  },
  touchStart: function(e) {
    // console.log('start', e)
    this.touchXstart = e.changedTouches[0].pageX;

  },
  touchMove: function(e) {
    // console.log('move', e)
  },
  touchEnd: function(e) {

    this.touchXmove = e.changedTouches[0].pageX;
    let metla = this.touchXstart - this.touchXmove;

    let scrollWidth = cardWidth + paddingWidth - 50;

    let distance = 0;

    if (metla > 10) {
      if (Math.abs(metla) > 100) {
        if (this.scrollIndex >= this.cardNum - 1) {
          this.scrollIndex = this.cardNum - 1;
        } else {
          this.scrollIndex++;
          distance = -(scrollWidth * this.scrollIndex);
          this.setData({
            cardOffsetX: distance
          })
        }
      }

      distance = -(scrollWidth * this.scrollIndex);
      this.setData({
        cardOffsetX: distance
      })

    } else if (metla < -10) {
      if (Math.abs(metla) > 100) {
        if (this.scrollIndex <= 0) {
          this.scrollIndex = 0;
        } else {
          this.scrollIndex--;
          distance = -(scrollWidth * this.scrollIndex);
          this.setData({
            cardOffsetX: distance
          })
        }
      }
      distance = -(scrollWidth * this.scrollIndex);
      this.setData({
        cardOffsetX: distance
      })

    } else {
      let cardArr = this.data.cardList[this.scrollIndex];
      if (!cardArr.expireTime) {
        wx.navigateTo({
          url: '/pages/index/playcard/playcard?spuId=' + cardArr.id,
        })
      }
    }
  },
  clickCard: function(e) {
    // let index = e.currentTarget.dataset.index;
    // let distance = scrollWidth * index;
    // this.setData({
    //   cardOffsetX: -distance
    // })
    let id = e.currentTarget.dataset.id,
      expiretime = e.currentTarget.dataset.expiretime;
    if (expiretime) {
      wx.navigateTo({
        url: '/pages/index/playcard/playcard?spuId=' + id,
      })
    }
  },
  onNavToGuidepage: function() {
    wx.navigateTo({
      url: '/pages/subpageMine/pages/booking-guide/booking-guide',
    })
  },
  onNavToCustomerService: function() {
    wx.navigateTo({
      url: '/pages/subpageMine/pages/customer-service/customer-service',
    })
  },
  viewPlatformAgreement: function() {
    wx.navigateTo({
      url: '/pages/subpageMine/pages/platform-agreement/platform-agreement',
    })
  },
  navigateToMerchantsSettled() {
    wx.navigateTo({
      url: '/pages/subpageMine/pages/merchants-settled/merchants-settled',
    })
  }
})