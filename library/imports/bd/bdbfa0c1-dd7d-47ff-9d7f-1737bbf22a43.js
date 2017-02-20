var OpenDoor = require('OpenDoor');
var EndBg = require('EndBg');

cc.Class({
  'extends': cc.Component,

  properties: {
    doorBg: cc.Node,
    openDoor: OpenDoor,
    dooLight: cc.Node,
    endBg: EndBg
  },

  // use this for initialization
  onLoad: function onLoad() {
    this.endBg.init();
    this.animation = this.node.getComponent(cc.Animation);
  },

  show: function show() {
    this.node.active = true;
    this.animation.play('sunLight');
  },

  maxLight: function maxLight() {
    this.doorBg.active = false;
    this.openDoor.node.active = true;
  },

  animEnd: function animEnd() {
    this.node.active = false;
    this.openDoor.showText();
    this.dooLight.removeFromParent();
    this.endBg.showBg();
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});