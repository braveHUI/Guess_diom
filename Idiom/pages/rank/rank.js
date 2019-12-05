// pages/rank/rank.js
//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    rankData: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bindRank();
  },
  bindRank: function () {
    var that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true
    });
    wx.request({
      url: 'http://127.0.0.1:5000/api/rank',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization": "Bearer " + wx.getStorageSync('token'),
      },
      success: function (res) {
        console.log("bindRank res:" + res.data);
        if (res.data.code == 1) {
          that.setData({
            rankData: res.data.data
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            mask: true
          });
        }
      },
      fail: function () {
        console.log("post index/rank fail");
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  }
})
