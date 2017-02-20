module.exports = {
  CONFiG: {
    shareConfig:{
      source: '', // 来源，用于统计
      targets: ['weixin', 'weixin_timeline'], // 分享按钮
      title: '',
      text: '',
      desc: '',
      url: '',
      link: '',
      image_url: '',
      imgUrl: ''
    },
    vipUrl: '',
    goUrl: ''
  },
  MISSBILL: {},

  musicState: true,
  shareId: '',
  shouldPlayAudio: cc.sys.os !== cc.sys.OS_ANDROID,

  setConfig: function (config) {
    this.CONFiG = config;
  },

  EVENT_SHARE: 3687,          // 传递温暖
  EVENT_ELEME: 3688,          // 我要取暖
  EVENT_BILL: 3689,           // 查看完整账单
  EVENT_VIP: 3690,            // 购买会员卡
  EVENT_START: 3692           // 开始我的8年记忆
};
