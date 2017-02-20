cc.Class({
  extends: cc.Component,

  properties: {
    nickName: cc.Label,
    firstText: cc.RichText,
    secondText: cc.RichText,
    thirdText: cc.RichText,
    fourthText: cc.RichText,
    fifthText: cc.RichText,
    sixthText: cc.RichText,
    button: cc.Node,
    loading: cc.Label
  },

  onLoad: function () {
    this.pointCount = 0;
    this.schedule(function () {
      this.changeLoadingText();
    }, 0.5, cc.macro.REPEAT_FOREVER);
  },

  changeLoadingText: function () {
    if(this.pointCount > 3){
      this.loading.string = this.loading.string.split('.')[0];
      this.pointCount = 0;
    }else{
      this.loading.string += '.';
      this.pointCount += 1;
    }
  },

  setNickName: function (text) {
    this.nickName.string = text;
  },

  setFirstText: function (text) {
    this.firstText.string = text;
  },

  setSecondText: function (text) {
    this.secondText.string = text;
  },

  setThirdText: function (text) {
    this.thirdText.string = text;
  },

  setFourthText: function (text) {
    this.fourthText.string = text;
  },

  setFifthText: function (text) {
    this.fifthText.string = text;
  },

  setSixthText: function (text) {
    this.sixthText.string = text;
  },

  loadfinish: function () {
    this.loading.node.active = false;
    this.button.active = true;
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
