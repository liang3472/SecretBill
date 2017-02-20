var OpenDoor = require('OpenDoor');
var EndBg = require('EndBg');

cc.Class({
  extends: cc.Component,

  properties: {
    doorBg: cc.Node,
    openDoor: OpenDoor,
    dooLight: cc.Node,
    endBg: EndBg
  },

  // use this for initialization
  onLoad: function () {
    this.endBg.init();
    this.animation = this.node.getComponent(cc.Animation);
  },

  show: function () {
    this.node.active = true;
    this.animation.play('sunLight');
  },
  
  maxLight: function () {
    this.doorBg.active = false;
    this.openDoor.node.active = true;
  },
  
  animEnd: function () {
    this.node.active = false;
    this.openDoor.showText();
    this.dooLight.removeFromParent();
    this.endBg.showBg();
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
