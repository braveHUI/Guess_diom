//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    if (app.globalData.userInfo == null) {
      this.bindLogin();
    }
    //  else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  //开始游戏
  bindBegin: function () {
    var that = this;
    if (this.data.userInfo.sesion >= app.globalData.sesionTotal) {
      wx.navigateTo({
        url: '../success/success'
      });
    } else {
      wx.navigateTo({
        url: '../guess/guess'     
        });
    }
  },
  //用户登入
  bindLogin: function(e){
    var that = this;
    //微信登入
    wx.login({
      success: function (loginRes) {
        if (loginRes.code){
          // 查看是否授权
          wx.getSetting({
            success: function(res){
              if (res.authSetting['scope.userInfo']){
                // 微信获取用户信息
                wx.getUserInfo({
                  success: function(result){
                    console.log("已获取用户信息");
                    //执行登入
                    that.wxlogin(loginRes.code,result.userInfo.nickName,result.userInfo.avatarUrl)
                  }
                });
              }
              else {
                wx.showToast({
                  title: '请先授权用户信息',
                  icon: "none"
                });
              }
            }
          });
        }
      }
    });
  },
  //服务器登入
  wxlogin:function(code, nickname, avatar){
    var that = this;
    console.log(code, nickname, avatar)
    wx.showLoading({
      title: '正在登入中',
      mask: true
    });
    wx.request({
      url: 'http://127.0.0.1:5000/api/users/wx_login/',
      data: {
        code: code,
        nickname:nickname,
        avatar:avatar,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(response){
        var userInfo = response.data.data.userInfo;
        var sesionTotal = response.data.data.sesionTotal;
        var token = response.data.data.token;
        console.log(response)
        // 将Token写入缓存
        try {
          wx.setStorageSync('token', token)
        }catch(e){
          console.log('storage token error')
        }
        app.globalData.sesionTotal = sesionTotal;
        if (userInfo.userId > 0) {
          app.globalData.userInfo = userInfo;
          that.setData({
            userInfo: userInfo,
            hasUserInfo:true
          });
        }
      },
      fail: function(){
        console.log("wxlogin fail");
        wx.showToast({
          title: '登入失败',
          icon: 'none'
        });
      },
      complete: function(){
        wx.hideLoading();
      }

    });
  },
  // 查看排行榜
  bindRank: function () {
    wx.navigateTo({
      url: '../rank/rank'
    });
  }
})
