function updateMiniprogram() {
  // 检查小程序更新并应用
  const updateManager = wx.getUpdateManager();
  let version;
  updateManager.onCheckForUpdate(res1 => {
    // 找到更新
    if (res1.hasUpdate) {
      // 提示用户获取到更新
      updateManager.onUpdateReady(() => {
        // 更新下载就绪，提示用户重新启动
        wx.showModal({
          title: "更新提示",
          content: "版本已经更新完毕,重启应用",
          showCancel: false,
          confirmText: "确定",
          success: res => {
            // 用户确认，应用更新
            if (res.confirm) updateManager.applyUpdate();
          }
        });
      });
      updateManager.onUpdateFailed(() => {
        // 更新下载失败，提示用户网络出现问题
        wx.showModal({
          title: "小程序更新下载失败，请检查您的网络！",
          content: "新版本已经上线~，请删除当前版本，重新搜索小程序进入！"
        });
      });
    }
  });
}

function timeFormat(type, date) {
  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(type)) type = type.replace(RegExp.$1,
    (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(type))
      type = type.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
  return type;
}


//将50、35、00等形式转化成[1,1,1,1,1]的形式
function convertToStarsArray(stars) {
  var num = stars;
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      if ((i - num) === 0.5) {
        array.push(0.5)
      } else {
        array.push(0);
      }
    }
  }
  return array;
}

function http(url, param) {
  var app = getApp();
  let token = wx.getStorageSync('token') || '';
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'POST',
      data: param ? param : '',
      header: {
        "content-type": "application/json",
        "Authorization": 'Bearer ' + token
      },
      success: function(res) {
        console.log(res)
        if (res.data.errorCode === 2000) {
          //TODO
          wx.showToast({
            title: res.data.errorMessage,
            icon: 'none',
            duration: 2000
          });
        }
        resolve(res.data);
      },
      fail: function(res) {
        wx.showModal({
          title: '请求超时',
          content: '请检查网络后重试',
          showCancel: false
        });
      }
    });
  });
}


//二维码每四位加空格
function qrCodeFormat(data) {
  if (data != null) {
    console.info('二维码每四位加空格', typeof data);
    data = data.toString();
    let floor = Math.floor((data.length + 1) / 4);
    let tmp = '';
    for (let i = 0; i <= floor; i++) {
      tmp += data.slice(i * 4, (i + 1) * 4) + ' ';
    }
    tmp = tmp.trim();
    return tmp;
  } else {
    return '';
  }
}

// 将对象拼成key=value格式
function stringifyParams(data) {
  if (data instanceof Object) {
    let str = '';
    for (let key in data) {
      str += '&' + key + '=' + data[key];
    }
    return '?' + str.slice(1)
  } else {
    return ''
  }
}

// 将字符串转化成数组
function handleStringToArr(str, reg) {
  if (str != null) {
    str = str.trim();
    let arr = str.split(reg);
    for (let i in arr) {
      arr[i] = arr[i].trim();
    }
    return arr;
  } else {
    return [];
  }

}

//格式化时间,将yyyy-MM-dd hh-mm-ss转换成MM.dd
function convertDate(data, key) {
  if (data[0] && key && data[0][key]) {
    data.map(item => {
      let arr = item[key].match(/\d{4}-(\d{2})-(\d{2})/);
      item[key] = arr[1] + '.' + arr[2];
    });
  }
  return data;
}

// 将秒转换成时分秒
function formatSecondsToTime(seconds, type) {
  if (type) {
    return [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
      ]
      .join(":")
      .replace(/\b(\d)\b/g, "0$1");
  } else {
    return [
        parseInt(seconds / 60 / 60),
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
      ]
      .join(":")
      .replace(/\b(\d)\b/g, "0$1");
  }

}

function coutDown(date, type) {
  let timeStr = parseInt(date / 1000);
  if (type === 'day') {
    let day = parseInt(timeStr / 60 / 60 / 24, 10);
    day >= 10 ? day : '0' + day
    return day >= 10 ? day : '0' + day;
  }
  if (type === 'hour') {
    let hours = parseInt(timeStr / 60 / 60 % 24, 10)
    return hours >= 10 ? hours : '0' + hours;
  }
  if (type === 'minute') {
    let minute = parseInt(timeStr / 60 % 60, 10);
    return minute >= 10 ? minute : '0' + minute;
  }
  if (type === 'seconds') {
    let seconds = parseInt(timeStr % 60, 10);
    return seconds >= 10 ? seconds : '0' + seconds;
  }
}
//重新获取  更新本地session
function updateSession() {
  var app = getApp();
  let url = app.globalData.urlBase + "/spread/mp/auth/session"
  http(url, {}).then(res => {
    if (res.errorCode === 9000) {
      wx.setStorageSync('g_userInfo', res)
    }
  })
}
// 获取用户信息
function asyncGetUserInfo(data) {
  let _this = this;
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              res.code = data;
              resolve(res)
              console.log('授权成功')
            }
          })
        } else {
          wx.navigateTo({
            url: "/pages/index/get-auth/get-auth?type=userInfo"
          });
          console.log('授权失败')
        }
      }
    })
  });
}
//请求token
function postUserInfo(res) {
  var app = getApp();
  let url = app.globalData.urlBase + 'spread/mp/auth/login',
    _this = this;
  let param = {
    code: res.code,
    avator: res.userInfo.avatarUrl,
    nickname: res.userInfo.nickName,
    country: res.userInfo.country,
    province: res.userInfo.province,
    city: res.userInfo.city,
    sex: res.userInfo.gender,
    lat: 30,
    lon: 30
  };
  //util里获取不到当前作用域，所以不能直接在上边then
  return http(url, param)
}

//存储token后 再请求用户数据
function processToken(data) {
  var app = getApp();
  let url = app.globalData.urlBase + '/spread/mp/auth/session',
    _this = this;
  if (data.errorCode === 9000) {
    wx.setStorageSync('token', data.token)
    return http(url, {})
  } else {
    wx.showToast({
      title: '登录失败,后端无数据返回。' + data.errorMessage,
      icon: 'none',
      duration: 5000
    });
  }
}

function processAuthMess(res) {
  return new Promise((resolve, reject) => {
    if (res.errorCode === 9000) {
      let userInfo = res;
      console.log('111111111', res);
      console.log('请求用户数据成功')
      wx.setStorageSync('g_userInfo', userInfo)
      resolve();
    } else {
      wx.showToast({
        title: '登录失败,后端无数据返回。' + res.errorMessage,
        icon: 'none',
        duration: 5000
      });
    }
  })
}

function reloadUserInfo() {
  let url = app.globalData.urlBase + '/spread/mp/auth/session';
  util.http(url, {}).then((res) => {
    if (res.errorCode === 9000) {
      let userInfo = {
        avatar: res.avatar,
        currentLevel: res.currentLevel,
        isSpreader: res.isSpreader,
        isVip: res.isVip,
        nickname: res.nickname,
        unionId: res.unionId,
        upSpreader: res.upSpreader,
        mobile: res.mobile,
        custId: res.custId,
        isCounter: res.isCounter
      }
      wx.setStorageSync('g_userInfo', userInfo);
    }
  })
}
// 带分页的接口调用函数
function getMoreData(loadingMore) {
  if (loadingMore) {
    if (this.data.isHasMore === false) {
      return;
    } else {
      this.setData({
        isLoadingMore: true
      });
    }
  }
  let url = '';
  let param = {};
  if (loadingMore) param.pageIndex = this.pageData.pageIndex + 1;
  util.http(url, param).then(data => {
    if (data.errorCode === 9000) {
      let sData = {};
      this.pageData = data.data;
      if (loadingMore) {
        sData.RecommendData = this.data.RecommendData.concat(data.result);
        sData.isLoadingMore = false;
      } else {
        sData.RecommendData = data.result;
        sData.isLoading = false;
      }
      sData.isHasMore = (data.data.pageIndex + 1) === data.data.pageCount ? false : true;
      this.setData(sData);
    }
  });
}


function socketConnect() {
  return new Promise(resolve => {
    let app = getApp(),
      custId = wx.getStorageSync('g_userInfo').custId;
    let url = app.globalData.socketUrl + custId;
    wx.connectSocket({
      url,
      method: 'POST',
      success: res => {
        console.info('socketConnect - success -res', res);
        resolve(res);
      },
      fail: res => {
        console.info('socketConnect - fail -res', res);
      }
    });
  });

}

function closeSocketFn() {
  wx.closeSocket();
  console.log('关闭socket')
}

function parse_url(url) { //定义函数
  var pattern = /(\w+)=(\w+)/ig; //定义正则表达式
  var parames = {}; //定义数组
  url.replace(pattern, function(a, b, c) {
    parames[b] = c;
  });
  return parames; //返回这个数组.
}

function sequentialLoadImg() {
  
}

module.exports = {
  updateMiniprogram,
  http,
  convertToStarsArray,
  qrCodeFormat,
  stringifyParams,
  handleStringToArr,
  convertDate,
  formatSecondsToTime,
  socketConnect,
  closeSocketFn,
  timeFormat,
  postUserInfo,
  asyncGetUserInfo,
  processToken,
  processAuthMess,
  parse_url,
  coutDown,
  reloadUserInfo,
  updateSession,
  sequentialLoadImg
}