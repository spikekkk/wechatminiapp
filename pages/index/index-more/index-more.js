// pages/index/index-more/index-more.js
const app = getApp()
const util = require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendData: [],
    btnTxt: '会员免费',
    selectArr: [],
    sliderShowBool: false,
    locationCity: '杭州',
    district: '',
    selectedTitleIndex: 0,
    noData: false,
    listLoading: true,
    goodsTypeTitle: '商品类型',
    cardTypeTitle: '卡类型',
    activeTabIndex: 0,
    cardTypeSlideShow: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let chosenCity = options.city;
    wx.setStorageSync('chosenCity', chosenCity);
    this.queryMineSuperCard()

    this.startLoadData();

  },
  onShow: function() {

  },

  onShow: function() {

  },
  startLoadData: function() {
    let userInfo = wx.getStorageSync('g_userInfo'),
      locationCity = wx.getStorageSync('chosenCity');
    if (locationCity) {
      this.setData({
        locationCity: locationCity
      })
    }
    if (userInfo.vipLevel > 1) {
      this.setData({
        btnTxt: '立即预约'
      })
    }
    this.pageIndex = 0;
    this.pageSize = 10;
    this.hasMoreData = true;



    this.asyncGetLocation().then(res => {
      this.lat = res.latitude;
      this.lon = res.longitude
      this.postCity(res);
    }).catch(() => {
      this.firstPostList();
    });
  },
  queryMineSuperCard: function(cardOwnerStatus) {

    let url = app.globalData.urlBase + '/spread/mp/goods/findCardForMorePage',
      _this = this;
    return util.http(url, {
      cardOwnerStatus
    });

  },
  // 获取授权的位置信息
  asyncGetLocation: function() {
    let _this = this,
      locationObj = {};
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: "wgs84",
        success: res => {
          locationObj = res;
          console.info("成功获取了Location:", res)
          resolve(locationObj)
        },
        fail: res => {
          console.info("拒绝授权Location:", res)
          wx.showModal({
            content: '惠吧需要您的地理位置授权',
            confirmText: '去开启',
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success(res) {
                    if (res.authSetting['scope.userLocation'] === true) {
                      _this.startLoadData();
                    } else {
                      console.log('拒绝授权');
                    }
                  }
                })
              } else if (res.cancel) {
                reject();
              }
            }
          })
        }
      })
    })
  },
  postCity: function(e) {
    let url = app.globalData.urlBase + "spread/mp/goods/shopLocation",
      _this = this;
    util.http(url, {
      lat: e.latitude,
      lon: e.longitude
    }).then((res) => {
      let city = res.city,
        chosenCity = wx.getStorageSync('chosenCity');
      if (chosenCity && city.indexOf(chosenCity) === -1) {
        wx.showModal({
          title: '提示',
          content: '当前地址和定位地址不一致',
          confirmText: '使用定位',
          cancelText: '继续',
          success(res) {
            if (res.confirm) {

            } else if (res.cancel) {
              city = chosenCity;
            }
            wx.setStorageSync('chosenCity', city)
            _this.setData({
              locationCity: city
            })
            _this.firstPostList();
          }
        })
      } else {
        _this.setData({
          locationCity: city
        })
        _this.firstPostList();
      }
    })
  },
  firstPostList: function() {
    this.queryMineSuperCard().then(res => {
      if (res.errorCode === 9000) {
        if (!this.cardType) {
          let myCard = res.cardList.filter(item => {
            return item.customerHasCurrentCard == 1;
          })
          let notMyCard = res.cardList.filter(item => {
            return item.customerHasCurrentCard != 1;
          })
          let selectedCard = notMyCard[0];
          if (myCard.length > 0) {
            selectedCard = myCard[0];
          }
          this.cardType = selectedCard.goodsType;
          this.setData({
            cardTypeTitle: selectedCard.spuName
          })
        }
        this.setData({
          goodsTab: res.cardList
        })
        this.postListData().then((res) => {
          this.hasMoreData = res.results.length === this.pageSize;
          this.setData({
            recommendData: res.results,
            listLoading: false,
            noData: !res.data || res.data.pageCount === 0
          })
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  sliderShow: function(e) {

    let typeName = e.currentTarget.dataset.parameter,
      selectArr = [];
    if (typeName === 'cardType') {
      this.setData({
        sliderShowBool: !this.data.sliderShowBool,
        selectArr: this.selectArr
      })
    }
    if (typeName === 'goodsType') {
      selectArr = [{
        title: '全部',
        type: 'goodsType',
        typeNum: ''
      }, {
        title: '门票',
        type: 'goodsType',
        typeNum: '101'
      }, {
        title: '消费卡',
        type: 'goodsType',
        typeNum: '102'
      }, {
        title: '课程',
        type: 'goodsType',
        typeNum: '103'
      }];
      this.setData({
        sliderShowBool: !this.data.sliderShowBool,
        cardTypeSlideShow: false,
        selectArr: selectArr
      })
    }
  },
  closeSlide: function() {
    this.setData({
      sliderShowBool: false,
      cardTypeSlideShow: false
    })
  },
  addressChange: function(e) {
    let address = e.detail.value;
    this.province = address[0];
    this.city = address[1];
    this.district = address[2];
    this.pageIndex = 0;
    this.setData({
      locationCity: this.city,
      recommendData: [],
      selectedTitleIndex: 0,
      province: this.province,
      district: this.district
    })
    wx.setStorageSync('chosenCity', this.city);
    this.firstPostList();
  },
  tabFilter: function(e) {
    let obj = e.currentTarget.dataset,
      index = obj.index,
      type = obj.type,
      para = obj.para,
      title = obj.title;

    if (type === 'goodsType') {
      this.goodsType = para || 0;
      this.setData({
        goodsTypeTitle: para ? title : '卡类型'
      })
    }
    if (type === 'cardType') {
      this.cardType = para || 0;
      this.setData({
        cardTypeTitle: para ? title : '商品类型'
      })
    }
    this.pageIndex = 0;
    this.setData({
      sliderShowBool: false,
      recommendData: []
    })
    this.firstPostList();
  },
  choseCardType: function(e) {
    let type = e.currentTarget.dataset.type,
      index = e.currentTarget.dataset.index,
      cardName = e.currentTarget.dataset.title;
    this.cardType = type;
    this.pageIndex = 0;
    this.setData({
      cardTypeSlideShow: false,
      cardTypeTitle: cardName
    })
    this.firstPostList();
  },
  choseAllOrBuy: function(e) {
    let cardOwnerStatus = e.currentTarget.dataset.type
    this.queryMineSuperCard(cardOwnerStatus).then(res => {
      this.setData({
        goodsTab: res.cardList
      })
    })
  },
  goodsNameSearch: function(e) {
    let val = e.detail.value;
    this.goodsName = val;
    this.firstPostList();
  },
  cardTypeSlideShowAct: function() {
    this.setData({
      cardTypeSlideShow: !this.data.cardTypeSlideShow,
      sliderShowBool: false
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.hasMoreData || this.noData) {
      this.setData({
        listLoading: false
      })
      return false;
    }
    this.pageIndex++;
    this.postListData().then((res) => {
      this.hasMoreData = res.results.length === this.pageSize;
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
    let city = wx.getStorageSync('chosenCity') || '杭州',
      url = app.globalData.urlBase + '/spread/mp/goods/queryMoreGoods';
    ///spread/mp/goods/queryMoreGoods

    let params = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      province: this.province,
      city: city.indexOf('市') > 0 ? city : city + '市',
      district: this.district
    }
    if (this.goodsType) {
      params.goodsType = this.goodsType;
    }
    if (this.cardType) {
      params.cardType = this.cardType;
    }
    if (this.goodsName) {
      params.goodsName = this.goodsName;
    }
    if (this.lat || this.lon) {
      params.lat = this.lat;
      params.lon = this.lon;
    }
    return util.http(url, params)
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
    this.hasMoreData = true;
    this.pageIndex = 0;
    this.postListData().then(res => {
      if (res.errorCode === 9000) {
        this.hasMoreData = res.results.length === this.pageSize;
        this.setData({
          recommendData: res.results
        })
      }
      wx.stopPullDownRefresh();
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})