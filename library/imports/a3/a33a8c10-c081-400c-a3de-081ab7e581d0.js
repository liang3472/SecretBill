var Object = require('Object');
var Proxy = require('Proxy');
var Phone = require('Phone');
var BirdMask = require('BirdMask');
var Lamp = require('Lamp');
var SoundManager = require('SoundManager');
var Music = require('Music');

var find = {
  window: false,
  tellphone: false,
  wang: false
};

cc.Class({
  'extends': cc.Component,

  properties: {
    shoeBox: Object,
    bug: Object,
    window: Object,
    progress: cc.Label,
    phone: Phone,
    lampProxy: Proxy,
    lamp: Lamp,
    birdMask: BirdMask,
    tellphoneProxy: Proxy,
    wang: Object,
    room: cc.ScrollView,
    soundMng: SoundManager,
    music: Music,
    dialogLayer: cc.Node,
    findkeyDialog: cc.Prefab,
    tip: cc.Prefab,
    wangSay: cc.Label,
    windowSay: cc.Label,
    tellphoneSay: cc.Label
  },

  // use this for initialization
  onLoad: function onLoad() {
    this.score = 0;
    this.music.init(this);
    //cc.director.setDisplayStats(true);
    cc.director.preloadScene('end');

    this.lookRoom();
    this.init();

    document.addEventListener('eleme_app_didBecomeActive', function () {
      cc.game.resume();
    });
    document.addEventListener('eleme_app_willResignActive', function () {
      cc.game.pause();
    });
  },

  lookRoom: function lookRoom() {
    cc.eventManager.setEnabled(false);
    this.scheduleOnce(function () {
      this.room.scrollToPercentHorizontal(1, 1, false);
    }, 0);
    this.scheduleOnce(function () {
      this.room.scrollToPercentHorizontal(0, 2, false);
    }, 1);
    this.scheduleOnce(function () {
      this.room.scrollToPercentHorizontal(0.5, 1, false);
    }, 3);
    this.scheduleOnce(function () {
      cc.eventManager.setEnabled(true);
    }, 4);
  },

  init: function init() {
    var start = '_start';
    var end = '_end';
    var wangCount = 0;

    this.wangSay.string = '据我八年的观察，你最爱吃的餐厅是XXX，我也一样喜欢呢~';
    this.windowSay.string = '我看你八年来有钱在外卖上花999块钱，却年年交不上房租！这是逼我发飙吗！';
    this.tellphoneSay.string = '听你隔壁的王叔叔说，八年来你得过999个饿了么红包，有999块钱呢，过年回家要给我大红包哦！';

    // 鞋盒事件
    this.node.on(this.shoeBox.node.name + start, (function (event) {
      cc.log(this.shoeBox.node.name + ' start');
    }).bind(this));
    this.node.on(this.shoeBox.node.name + end, (function (event) {
      cc.log(this.shoeBox.node.name + ' end');
      this.bug.node.active = true;
      this.bug.startAnim();
    }).bind(this));

    // 小强事件
    this.node.on(this.bug.node.name + start, (function (event) {
      cc.log(this.bug.node.name + ' start');
    }).bind(this));
    this.node.on(this.bug.node.name + end, (function (event) {
      cc.log(this.bug.node.name + ' end');
      this.bug.node.active = true;
    }).bind(this));

    // 灯事件
    this.node.on(this.lampProxy.getTargetNode().name + start, (function (event) {
      cc.log(this.lampProxy.getTargetNode().name + ' start');
    }).bind(this));
    this.node.on(this.lampProxy.getTargetNode().name + end, (function (event) {
      cc.log(this.lampProxy.getTargetNode().name + ' end');
      if (this.lamp.getState()) {
        this.birdMask.show();
      } else {
        this.birdMask.dimiss();
      }
    }).bind(this));

    // 窗事件
    this.node.on(this.window.node.name + start, (function (event) {
      cc.log(this.window.node.name + ' start');
      cc.eventManager.setEnabled(false);
      this.room.scrollToPercentHorizontal(0.1, 0.6, false);
    }).bind(this));
    this.node.on(this.window.node.name + end, (function (event) {
      cc.log(this.window.node.name + ' end');
      cc.eventManager.setEnabled(true);

      if (!find.window) {
        find.window = true;
        this.addScore();
      }
    }).bind(this));

    // 电话事件
    this.node.on(this.tellphoneProxy.getTargetNode().name + start, (function (event) {
      cc.log(this.tellphoneProxy.getTargetNode().name + ' start');
      cc.eventManager.setEnabled(false);
      this.room.scrollToPercentHorizontal(0.5, 0.6, false);
    }).bind(this));
    this.node.on(this.tellphoneProxy.getTargetNode().name + end, (function (event) {
      cc.log(this.tellphoneProxy.getTargetNode().name + ' end');
      cc.eventManager.setEnabled(true);

      if (!find.tellphone) {
        find.tellphone = true;
        this.addScore();
      }
    }).bind(this));

    // 老王事件
    this.node.on(this.wang.node.name + start, (function (event) {
      cc.log(this.wang.node.name + ' start');
      cc.eventManager.setEnabled(false);
      this.room.scrollToPercentHorizontal(0.85, 0.6, false);
    }).bind(this));
    this.node.on(this.wang.node.name + end, (function (event) {
      cc.log(this.wang.node.name + ' end');
      cc.eventManager.setEnabled(true);
      if (wangCount >= 1 && !find.wang) {
        find.wang = true;
        this.addScore();
      }
      wangCount += 1;
    }).bind(this));

    this.node.on('GameAnimEnd', (function (event) {
      this.soundMng.playKnock();
      this.scheduleOnce(this.showTip, 1.5);
    }).bind(this));
  },

  showTip: function showTip() {
    var tipNode = cc.instantiate(this.tip);
    this.dialogLayer.addChild(tipNode);
  },

  addScore: function addScore() {
    this.score += 1;
    this.showFindkeyDialog((function () {
      var scaleBig = cc.scaleBy(0.15, 1.5, 1.5);
      var scaleNomal = scaleBig.reverse();
      var anim = cc.sequence(scaleBig, scaleNomal);
      this.progress.node.runAction(anim);
      this.progress.string = this.score;
      this.soundMng.playFindKey();

      if (this.checkState()) {
        this.gameOver();
      }
    }).bind(this));
  },

  showFindkeyDialog: function showFindkeyDialog(func) {
    var dialogNode = cc.instantiate(this.findkeyDialog);
    var comp = dialogNode.getComponent('FindKeyDialog');
    comp.setCallBack(func);
    this.dialogLayer.addChild(dialogNode);
  },

  checkState: function checkState() {
    return find.window && find.tellphone && find.wang;
  },

  gameOver: function gameOver() {
    this.room.scrollToPercentHorizontal(0.5, 2);
    this.scheduleOnce(function () {
      this.phone.playEndAnim();
    }, 2);
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});