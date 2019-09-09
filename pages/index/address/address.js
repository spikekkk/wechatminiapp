// pages/index/address/address.js
var app = getApp()
const util = require("../../../utils/util")
import cities from './city.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: cities.city,
    letterArr: [],
    toView: 'hot',
    hotCities: ['北京', '常德', '常州', '成都', '大连', '广州', '杭州', '衡阳', '南京', '上海', '邵阳', '深圳', '苏州', '武汉', '长沙', '重庆'],
    activeIndex: 0,
    positionCity: '杭州'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let letterArr = ['hot'],
      chosenCity = wx.getStorageSync('chosenCity');
    cities.city.map((item) => {
      letterArr.push(item.title);
    })
    this.setData({
      letterArr: letterArr,
      positionCity: chosenCity
    })
    let hotCityUrl = app.globalData.urlBase + '/spread/mp/goods/promoteCity';
    util.http(hotCityUrl, {
      tagSource: '1'
    }).then(res => {
      if (res.errorCode === 9000) {
        this.setData({
          hotCities: res.cityList
        })
      }
    });
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
  citySearch: function(e) {
    let city = e.detail.value;
    if (!city) {
      return false;
    }
    this.prevPageCitySearch(city);
  },
  choseLetter: function(e) {
    let letter = e.currentTarget.dataset.letter,
      index = e.currentTarget.dataset.index;
    this.setData({
      toView: letter,
      activeIndex: index
    })
  },
  touchStart: function(e) {
    this.startPageY = e.changedTouches[0].pageY;
    this.startIndex = e.currentTarget.dataset.index;
    console.log(this.startIndex);
    console.log('滑动开始');
  },
  touchMove: function(e) {
    let letterHeight = 20;
    let endIndex = this.startIndex + Math.floor((e.changedTouches[0].pageY - this.startPageY) / letterHeight);
    let letterArr = this.data.letterArr;
    if (endIndex <= 0) {
      endIndex = 0;
    }
    if (endIndex >= letterArr.length - 1) {
      endIndex = letterArr.length - 1;
    }
    this.setData({
      toView: letterArr[endIndex],
      activeIndex: endIndex
    })
  },
  choseCity: function(e) {
    let city = e.currentTarget.dataset.city;
    this.prevPageCitySearch(city)
  },
  prevPageCitySearch: function(city) {
    let pages = getCurrentPages(),
      prevPage = pages[pages.length - 2];
    wx.setStorageSync('chosenCity', city);
    prevPage.acceptCity(city);
    wx.navigateBack({
      delta: 1
    })
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