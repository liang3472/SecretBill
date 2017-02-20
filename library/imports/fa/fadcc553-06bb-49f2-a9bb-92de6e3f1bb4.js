cc.Class({
  'extends': cc.Component,

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

  onLoad: function onLoad() {
    this.pointCount = 0;
    this.schedule(function () {
      this.changeLoadingText();
    }, 0.5, cc.macro.REPEAT_FOREVER);
  },

  changeLoadingText: function changeLoadingText() {
    if (this.pointCount > 3) {
      this.loading.string = this.loading.string.split('.')[0];
      this.pointCount = 0;
    } else {
      this.loading.string += '.';
      this.pointCount += 1;
    }
  },

  setNickName: function setNickName(text) {
    this.nickName.string = text;
  },

  setFirstText: function setFirstText(text) {
    this.firstText.string = text;
  },

  setSecondText: function setSecondText(text) {
    this.secondText.string = text;
  },

  setThirdText: function setThirdText(text) {
    this.thirdText.string = text;
  },

  setFourthText: function setFourthText(text) {
    this.fourthText.string = text;
  },

  setFifthText: function setFifthText(text) {
    this.fifthText.string = text;
  },

  setSixthText: function setSixthText(text) {
    this.sixthText.string = text;
  },

  loadfinish: function loadfinish() {
    this.loading.node.active = false;
    this.button.active = true;
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});