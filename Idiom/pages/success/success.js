// pages/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindReback: function () {
    wx.navigateBack({
      delta: 2
    });
  },
  // 分享回调
  onShareAppMessage: function(res){
    if (res.from == 'button'){
      // 来自页面内的转发按钮
      console.log(res.target)
      console.log(1111111111)
    }
    return {
      title: '通关毫无压力， 看你了!',
      path: '/pages/index/index',
      success: function(res){
        // 分享成功
        wx.showToast({
          title: '分享成功',
          icon: 'success'
        });
      },
      fail: function(res){
        // 分享失败
        wx.showToast({
          title: '分享失败',
          icon: 'none'
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})