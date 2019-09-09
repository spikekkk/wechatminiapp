// pages/index/index.js
const app = getApp()
const util = require("../../utils/util")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recommendData: [],
    enterLoading: true,
    listLoading: true,
    templateData: {},
    btnTxt: "会员免费",
    pulldownRefreshBool: false,
    cityNavmenuTop: 0,
    goodsNavmenuTop: 0,
    cityNavFixed: 0,
    goodsNavFixed: false,
    citiesArr: [],
    goodsTab: [],
    activeTabIndex: 0,
    goodsListPadTop: 100,
    specialSwiperCurIndex: 1,
    weekNewArr: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.options = options
    util.updateMiniprogram();

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    this.firstOfAll();
  },
  firstOfAll: function() {
    var promise = new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          console.info("wx.login成功:", res)
          this.code = res.code;
          resolve(res.code)
        },
        fail: res => {
          console.info(" wx.login失败：", res)
        }
      })
    })
    promise
      .then(util.asyncGetUserInfo)
      .then(util.postUserInfo)
      .then(util.processToken)
      .then(util.processAuthMess)
      .then(this.postAllData)

    var that = this;
    var query = wx.createSelectorQuery();
    query.select('#cityNav').boundingClientRect()
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
      if (that.data.cityNavmenuTop === 0) {
        that.setData({
          cityNavmenuTop: res[0].top + res[1].scrollTop
        })
      }
    });
    this.pageSize = 5
    this.hasMoreData = true
  },
  postAllData: function() {
    let userInfo = wx.getStorageSync("g_userInfo")
    if (userInfo.vipLevel > 1) {
      this.setData({
        btnTxt: "立即预约"
      })
    }

    // if (this.data.recommendData.length > 0) {
    //   return false;
    // }
    /**会员卡查询 */
    let url = app.globalData.urlBase + "spread/mp/goods/findSuperCard";
    util.http(url, {}).then(res => {
      this.setData({
        superCardList: res.superCardList,
        enterLoading: false
      })
      wx.setStorage({
        key: "superCardData",
        data: res.superCardList
      })
    })
    /**热门城市查询 */

    let hotCityUrl = app.globalData.urlBase + '/spread/mp/goods/promoteCity';
    util.http(hotCityUrl, {
      tagSource: '1'
    }).then(res => {
      if (res.errorCode === 9000) {
        this.setData({
          citiesArr: res.cityList
        })
      }
    });

    /*查询本周上新 */
    let weekNewUrl = app.globalData.urlBase + '/spread/mp/goods/goodsShowNew';
    util.http(weekNewUrl, {}).then(res => {
      if (res.errorCode === 9000) {
        this.setData({
          weekNewArr: res.results
        })
      }
    });
    /**查询已有会员卡类型-->根据卡类型-->首次查询列表 */
    this.cardTypeQuery();
  },
  cardTypeQuery: function() {
    /** 已有会员卡查询*/
    let cardTypeUrl = app.globalData.urlBase + '/spread/mp/goods/superCardTypeInfo';
    util.http(cardTypeUrl, {}).then(res => {
      if (res.errorCode === 9000) {
        let goodsListPadTop = 100;
        if (res.cardTypeList.length === 1) {
          goodsListPadTop = 70;
        }
        this.cardType = res.cardTypeList[0].goodsType;
        let myCardList = wx.getStorageSync('myCardList');

        if (this.pageIndex >= 0 && (JSON.stringify(myCardList) === JSON.stringify(res.cardTypeList))) {
          return;
        } else {
          wx.pageScrollTo({
            scrollTop: 0
          })
          this.setData({
            goodsTab: res.cardTypeList,
            goodsListPadTop: goodsListPadTop
          })
          wx.setStorageSync('myCardList', res.cardTypeList);
          if (res.cardTypeList.length > 1) {
            var query = wx.createSelectorQuery(),
              that = this;
            query.select('#goodsNav').boundingClientRect();
            query.selectViewport().scrollOffset();
            query.exec(function(res) {
              if (that.data.goodsNavmenuTop === 0) {
                that.setData({
                  goodsNavmenuTop: res[0].top + res[1].scrollTop
                })
              }
            });
          }
          /**首次查询列表 */
          this.firstPostList();
        }
      }
    })

  },
  firstPostList: function() {
    /**首次商品列表查询 */
    this.pageIndex = 0
    this.postListData().then(res => {
      this.hasMoreData = res.results.length === this.pageSize
      wx.setStorageSync("recommendList", res.results)
      this.setData({
        recommendData: res.results,
        listLoading: false
      })
    })
  },
  onHide: function() {
    // this.setData({
    //   recommendData: [],
    //   enterLoading: true,
    //   listLoading: true,
    //   templateData: {},
    //   btnTxt: "会员免费",
    //   pulldownRefreshBool: false,
    //   cityNavmenuTop: 0,
    //   goodsNavmenuTop: 0,
    //   goodsNavFixed: 0,
    //   cityNavFixed: 0,
    //   citiesArr: [],
    //   goodsTab: [],
    //   activeTabIndex: 0,
    //   goodsListPadTop: 160
    // })
    // this.index = 0;
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.hasMoreData) {
      this.setData({
        listLoading: false
      })
      return false
    }
    this.pageIndex++;
    this.postListData().then(res => {
      console.log("findAll-------length-------", res.results.length)
      this.hasMoreData = res.results.length === this.pageSize
      this.setData({
        recommendData: this.data.recommendData.concat(res.results),
        listLoading: false
      })
    })
  },
  postListData: function() {
    this.setData({
      listLoading: true
    })
    let _this = this;
    let url = app.globalData.urlBase + "spread/mp/goods/findAll";
    //this.type

    return util.http(url, {
      goodsTag: "2",
      tagSource: "1",
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      cardType: this.cardType
    })
  },
  onNavToGoodsDetail: function(e) {
    let param = util.stringifyParams({
      goodsId: e.target.dataset.goodsid,
      goodsType: e.target.dataset.goodstype
    })
    // wx.navigateTo({
    //   url: '/pages/index/ticket/ticket-detail/ticket-detail' + param
    // });
  },
  choseCity: function(e) {
    let city = e.currentTarget.dataset.city;
    wx.navigateTo({
      url: '/pages/index/index-more/index-more?city=' + city,
    })
  },
  choseCardType: function(e) {
    let type = e.currentTarget.dataset.type,
      index = e.currentTarget.dataset.index;
    this.setData({
      activeTabIndex: index
    })
    this.cardType = type;
    this.pageIndex = 0;
    this.setData({
      recommendData: [],
      listLoading: true
    })
    this.postListData().then(res => {
      this.hasMoreData = res.results.length === this.pageSize
      this.setData({
        recommendData: res.results,
        listLoading: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.unpaidInterval)
  },
  onPageScroll: function(e) {
    var that = this;
    if (that.data.cityNavmenuTop === 0) {
      return false;
    }
    if (e.scrollTop > that.data.cityNavmenuTop) {
      that.setData({
        cityNavFixed: true
      })
    } else {
      that.setData({
        cityNavFixed: false
      })
    }
    if (that.data.goodsNavmenuTop == 0) {
      return false;
    }
    if (e.scrollTop + 50 > that.data.goodsNavmenuTop) {
      that.setData({
        goodsNavFixed: true
      })
    } else {
      that.setData({
        goodsNavFixed: false
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.postAllData();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 600);
  },
  swiperCurIndexChange: function(e) {
    let specialSwiperCurIndex = e.detail + 1;
    this.setData({
      specialSwiperCurIndex
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})