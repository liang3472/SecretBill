require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Anim":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e75bb6A2pVPxL5eIRj/J0gG', 'Anim');
// Script/start/Anim.js

cc.Class({
    'extends': cc.Component,

    properties: {
        animName: ''
    },

    animEnd: function animEnd() {
        this.node.dispatchEvent(new cc.Event.EventCustom(this.animName, true));
    }

});

cc._RFpop();
},{}],"BillInfo":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fadccVTBrtJ8qm7kt5uPxu0', 'BillInfo');
// Script/start/BillInfo.js

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

cc._RFpop();
},{}],"Bill":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a8e12LS/klD1Zu6N+vtUFc8', 'Bill');
// Script/start/Bill.js

cc.Class({
  'extends': cc.Component,

  properties: {
    billPre: cc.Prefab,
    dialogLayer: cc.Node
  },

  // use this for initialization
  init: function init(game) {
    this.isDataOver = false;
    this.game = game;
    this.animation = this.node.getComponent(cc.Animation);

    this.isOpen = false;
    this.pointCount = 0;
    this.node.on('touchstart', (function () {
      this.isOpen = true;
      this.openBill();
    }).bind(this));
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

  openBill: function openBill() {
    if (this.isOpen) {
      this.game.soundMng.playPickBill();
      this.showBillInfo();
      this.node.active = false;
      this.node.removeFromParent();
    }
  },

  showBillInfo: function showBillInfo() {
    this.billList = cc.instantiate(this.billPre);
    this.dialogLayer.addChild(this.billList);
    if (this.isDataOver) {
      var billInfoCom = this.billList.getComponent('BillInfo');
      billInfoCom.loadfinish();
    }
  },

  show: function show() {
    if (this.animation) {
      this.animation.play('bill');
    }
  },

  loadfinish: function loadfinish() {
    this.isDataOver = true;
    if (this.billList) {
      var billInfoCom = this.billList.getComponent('BillInfo');
      billInfoCom.loadfinish();
    }
  }

});

cc._RFpop();
},{}],"BirdMask":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0eff5kQVTxFCYtDGoQ9Ki+u', 'BirdMask');
// Script/room/BirdMask.js

var Gloable = require('Gloable');
cc.Class({
    'extends': cc.Component,

    properties: {
        bird: cc.Node,
        birdAnim: cc.AnimationClip,
        audio: cc.AudioClip
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.animation = this.bird.getComponent(cc.Animation);
        this.animation.addClip(this.birdAnim, 'target');
    },

    show: function show() {
        this.node.active = true;
        this.animation.play('target');
        this.playSound(this.audio);
    },

    dimiss: function dimiss() {
        this.node.active = false;
    },

    /**
     * 播放音效(不循环)
     */
    playSound: function playSound(sound) {
        if (sound && Gloable.shouldPlayAudio) {
            cc.audioEngine.playEffect(sound, false);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"Gloable":"Gloable"}],"ButtomToRoom":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e317czNOZBK2rbFpyGWSR+A', 'ButtomToRoom');
// Script/start/ButtomToRoom.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},

    onClick: function onClick() {
        cc.director.loadScene('room');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"DoorLight":[function(require,module,exports){
"use strict";
cc._RFpush(module, '32064nDGkdGAZKfE9UJATkf', 'DoorLight');
// Script/end/DoorLight.js

var SunLight = require('SunLight');

cc.Class({
    'extends': cc.Component,

    properties: {
        sunLight: SunLight
    },

    // use this for initialization
    init: function init(game) {
        this.game = game;
        this.state = false;

        this.node.on('touchstart', (function () {
            this.game.soundMng.psuseDoorLight();
            this.sunLight.show();
        }).bind(this));
    },

    animStart: function animStart() {
        if (!this.state) {
            this.game.soundMng.playDoorLight();
            this.state = true;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"SunLight":"SunLight"}],"EmptyBtn":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9f4damUUjZKW7/BfdFeuffX', 'EmptyBtn');
// Script/start/EmptyBtn.js

var Gloable = require('Gloable');
cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {},

    toEleme: function toEleme() {
        location.href = decodeURIComponent(Gloable.CONFiG.goUrl);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"Gloable":"Gloable"}],"EndBg":[function(require,module,exports){
"use strict";
cc._RFpush(module, '439edn7/QxGPr3pCL+oGc9G', 'EndBg');
// Script/end/EndBg.js

var Option = require('Option');

cc.Class({
    'extends': cc.Component,

    properties: {
        option: Option
    },

    // use this for initialization
    init: function init() {
        this.option.init();
        this.animation = this.node.getComponent(cc.Animation);
    },

    showBg: function showBg() {
        this.node.active = true;
        this.animation.play('endBg');
    },

    showOption: function showOption() {
        this.option.showOption();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"Option":"Option"}],"EndScene":[function(require,module,exports){
"use strict";
cc._RFpush(module, '8bae7hWLR1BT69giRbFoaYH', 'EndScene');
// Script/end/EndScene.js

var SoundManager = require('SoundManager');
var DoorLight = require('DoorLight');
var Music = require('Music');

cc.Class({
    'extends': cc.Component,

    properties: {
        soundMng: SoundManager,
        doorLight: DoorLight,
        music: Music
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.music.init(this);
        this.doorLight.init(this);

        document.addEventListener('eleme_app_didBecomeActive', function () {
            cc.game.resume();
        });
        document.addEventListener('eleme_app_willResignActive', function () {
            cc.game.pause();
        });
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"DoorLight":"DoorLight","Music":"Music","SoundManager":"SoundManager"}],"FindKeyDialog":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2e085JF40JNwKl1mklJqqfU', 'FindKeyDialog');
// Script/room/FindKeyDialog.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on('touchend', (function () {
            if (this.callback) {
                this.callback();
            }
            this.node.removeFromParent();
        }).bind(this));
    },

    setCallBack: function setCallBack(callback) {
        this.callback = callback;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"GameManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a33a8wQwIFADKPeCBq35YHQ', 'GameManager');
// Script/room/GameManager.js

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

cc._RFpop();
},{"BirdMask":"BirdMask","Lamp":"Lamp","Music":"Music","Object":"Object","Phone":"Phone","Proxy":"Proxy","SoundManager":"SoundManager"}],"Gloable":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4ab9dPxONdJypIgCZRDpzqR', 'Gloable');
// Script/Gloable.js

module.exports = {
  CONFiG: {
    shareConfig: {
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

  setConfig: function setConfig(config) {
    this.CONFiG = config;
  },

  EVENT_SHARE: 3687, // 传递温暖
  EVENT_ELEME: 3688, // 我要取暖
  EVENT_BILL: 3689, // 查看完整账单
  EVENT_VIP: 3690, // 购买会员卡
  EVENT_START: 3692 // 开始我的8年记忆
};

cc._RFpop();
},{}],"Lamp":[function(require,module,exports){
"use strict";
cc._RFpush(module, '2547aTLF4VE5IUezUz2krHj', 'Lamp');
// Script/room/Lamp.js

var Gloable = require('Gloable');

cc.Class({
  'extends': cc.Component,

  properties: {
    onAnim: cc.AnimationClip,
    offAnim: cc.AnimationClip,
    onAudio: cc.AudioClip,
    offAudio: cc.AudioClip
  },

  // use this for initialization
  onLoad: function onLoad() {
    this.state = false;
    this.animation = this.node.getComponent(cc.Animation);
  },

  animEnd: function animEnd() {
    this.state = !this.state;
    if (this.state) {
      this.animation.addClip(this.offAnim, 'target');
    } else {
      this.animation.addClip(this.onAnim, 'target');
    }
  },

  animStart: function animStart() {
    if (!this.state) {
      this.playSound(this.onAudio);
    } else {
      this.playSound(this.offAudio);
    }
  },

  /**
   * 播放音效(不循环)
   */
  playSound: function playSound(sound) {
    if (sound && Gloable.shouldPlayAudio) {
      cc.audioEngine.playEffect(sound, false);
    }
  },

  getState: function getState() {
    return !this.state;
  }
});

cc._RFpop();
},{"Gloable":"Gloable"}],"Music":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fba32/DQm1AuqkJgPS5vGSH', 'Music');
// Script/Music.js

var Gloable = require('Gloable');

cc.Class({
  'extends': cc.Component,

  properties: {
    onMusic: cc.SpriteFrame,
    offMusic: cc.SpriteFrame
  },

  // use this for initialization
  init: function init(game) {
    this.game = game;
    this.updateSp();
    this.node.on('touchend', (function () {
      this.switchState();
    }).bind(this));
  },

  switchState: function switchState() {
    Gloable.musicState = !Gloable.musicState;
    this.updateSp();
  },

  updateSp: function updateSp() {
    var sp;
    if (Gloable.musicState) {
      sp = this.onMusic;
      this.game.soundMng.playBGMSound();
    } else {
      sp = this.offMusic;
      this.game.soundMng.pauseBGMSound();
    }
    this.node.getComponent(cc.Sprite).spriteFrame = sp;
  },

  onDisable: function onDisable() {
    this.game.soundMng.pauseBGMSound();
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

cc._RFpop();
},{"Gloable":"Gloable"}],"Object":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ce8efZGfkBIdbcPil1Jv7Q+', 'Object');
// Script/room/Object.js

var Gloable = require('Gloable');

cc.Class({
  'extends': cc.Component,

  properties: {
    targetAnim: cc.AnimationClip, // 该节点上的动画
    isTouchAble: true,
    isReplay: true,
    audio: cc.AudioClip
  },

  // use this for initialization
  onLoad: function onLoad() {
    if (this.targetAnim) {
      this.isTouched = false;
      this.animation = this.node.getComponent(cc.Animation);
      this.animation.addClip(this.targetAnim, 'target');
      if (this.isTouchAble) {
        this.node.on('touchend', this.onTouch, this);
      }
    }
  },

  onTouch: function onTouch() {
    if (this.isReplay || !this.isTouched) {
      this.startAnim();
      this.isTouched = true;
      this.playSound(this.audio);
    }
  },

  startAnim: function startAnim() {
    this.animation.play('target');
    cc.log(this.node.name + '_start send');
    this.node.dispatchEvent(new cc.Event.EventCustom(this.node.name + '_start', true));
  },

  onDisable: function onDisable() {
    this.node.off('touchend', this.onTouch);
  },

  animEnd: function animEnd() {
    cc.log(this.node.name + '_end send');
    this.node.dispatchEvent(new cc.Event.EventCustom(this.node.name + '_end', true));
  },

  /**
   * 播放音效(不循环)
   */
  playSound: function playSound(sound) {
    if (sound && Gloable.shouldPlayAudio) {
      cc.audioEngine.playEffect(sound, false);
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

cc._RFpop();
},{"Gloable":"Gloable"}],"One":[function(require,module,exports){
"use strict";
cc._RFpush(module, '642d2Nzs5BPwpZX/HzIzd0L', 'One');
// Script/start/One.js

cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    init: function init() {
        this.animation = this.node.getComponent(cc.Animation);
    },

    show: function show() {
        if (this.animation) {
            this.animation.play('doortext_show');
        }
    },

    dimiss: function dimiss() {
        if (this.animation) {
            this.animation.play('doortext_dimiss');
        }
    },

    onDimiss: function onDimiss() {
        this.node.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"OpenDoor":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4c2c1fzGhVNwK8BiNxneGTm', 'OpenDoor');
// Script/end/OpenDoor.js

cc.Class({
    'extends': cc.Component,

    properties: {
        text1: cc.Node,
        text2: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.text1Anim = this.text1.getComponent(cc.Animation);
        this.text2Anim = this.text2.getComponent(cc.Animation);
    },

    showText: function showText() {
        this.text1Anim.play('text1');
        this.text2Anim.play('text2');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"OptionBtn":[function(require,module,exports){
"use strict";
cc._RFpush(module, '44e04p9jtpGprrXa+64QVur', 'OptionBtn');
// Script/end/OptionBtn.js

cc.Class({
  "extends": cc.Component,

  properties: {},

  toShare: function toShare() {},

  toShow: function toShow() {},

  toVip: function toVip() {},

  toGo: function toGo() {}

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

cc._RFpop();
},{}],"Option":[function(require,module,exports){
"use strict";
cc._RFpush(module, '6deb5BQMyZD9pvVfkS1CPmu', 'Option');
// Script/end/Option.js

cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    init: function init() {
        this.animation = this.node.getComponent(cc.Animation);
    },

    showOption: function showOption() {
        this.node.active = true;
        this.animation.play('option');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"Phone":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f79f45FdbhIoZ7uGjwGOzgl', 'Phone');
// Script/room/Phone.js

var Gloable = require('Gloable');

cc.Class({
    'extends': cc.Component,

    properties: {
        phoneCallAnim: cc.AnimationClip,
        audio: cc.AudioClip
    },

    // use this for initialization
    onLoad: function onLoad() {},

    playEndAnim: function playEndAnim() {
        var animation = this.node.getComponent(cc.Animation);
        animation.addClip(this.phoneCallAnim, 'target');
        animation.play('target');
        this.playSound(this.audio);
    },

    gameAnimEnd: function gameAnimEnd() {
        this.node.dispatchEvent(new cc.Event.EventCustom('GameAnimEnd', true));
    },

    /**
     * 播放音效(不循环)
     */
    playSound: function playSound(sound) {
        if (sound && Gloable.shouldPlayAudio) {
            cc.audioEngine.playEffect(sound, false);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"Gloable":"Gloable"}],"Proxy":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a79cfffLhJIVItW0CSIzP41', 'Proxy');
// Script/room/Proxy.js

var Gloable = require('Gloable');
cc.Class({
  'extends': cc.Component,

  properties: {
    targetAnim: cc.AnimationClip, // 该节点上的动画
    proxyNode: cc.Node,
    isReplay: true,
    audio: cc.AudioClip
  },

  // use this for initialization
  onLoad: function onLoad() {
    if (this.proxyNode || this.targetAnim) {
      this.isTouched = false;
      this.isActive = this.proxyNode.active;
      this.animation = this.proxyNode.getComponent(cc.Animation);
      this.animation.addClip(this.targetAnim, 'target');
      this.node.on('touchend', this.onTouch, this);
    }
  },

  onTouch: function onTouch() {
    if (this.isReplay || !this.isTouched) {
      this.startAnim();
      this.isTouched = true;
      this.playSound(this.audio);
    }
  },

  startAnim: function startAnim() {
    if (!this.isActive) {
      this.proxyNode.active = true;
    }
    this.animation.play('target');
    cc.log(this.proxyNode.name + '_start send');
    this.proxyNode.dispatchEvent(new cc.Event.EventCustom(this.proxyNode.name + '_start', true));
  },

  onDisable: function onDisable() {
    this.proxyNode.off('touchend', this.onTouch);
  },

  animEnd: function animEnd() {
    if (!this.isActive) {
      this.proxyNode.active = false;
    }
    cc.log(this.proxyNode.name + '_end send');
    this.proxyNode.dispatchEvent(new cc.Event.EventCustom(this.node.name + '_end', true));
  },

  getTargetNode: function getTargetNode() {
    return this.proxyNode;
  },

  /**
   * 播放音效(不循环)
   */
  playSound: function playSound(sound) {
    if (sound && Gloable.shouldPlayAudio) {
      cc.audioEngine.playEffect(sound, false);
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

cc._RFpop();
},{"Gloable":"Gloable"}],"SoundManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9073ctge6dNoa3x0xHl4gxQ', 'SoundManager');
// Script/SoundManager.js

var Gloable = require('Gloable');
cc.Class({
  'extends': cc.Component,

  properties: {
    bgmAudio: cc.AudioClip,
    pickBill: cc.AudioClip,
    findKey: cc.AudioClip,
    doorLight: cc.AudioClip,
    knock: cc.AudioClip,
    isLoop: true
  },

  playKnock: function playKnock() {
    this.playSound(this.knock);
  },

  playFindKey: function playFindKey() {
    this.playSound(this.findKey);
  },

  playPickBill: function playPickBill() {
    this.playSound(this.pickBill);
  },

  playDoorLight: function playDoorLight() {
    this.doorLightAudio = this.playSound(this.doorLight);
  },

  psuseDoorLight: function psuseDoorLight() {
    cc.audioEngine.pause(this.doorLightAudio);
  },

  /**
   * 播放音效(不循环)
   */
  playSound: function playSound(sound) {
    if (sound && Gloable.shouldPlayAudio) {
      var id = cc.audioEngine.playEffect(sound, false);
      return id;
    }
    return null;
  },

  /**
   * 播放音效(不循环)
   */
  playBGMSound: function playBGMSound() {
    this.bgmId = cc.audioEngine.playEffect(this.bgmAudio, this.isLoop);
  },

  pauseBGMSound: function pauseBGMSound() {
    cc.audioEngine.pause(this.bgmId);
  }
});

cc._RFpop();
},{"Gloable":"Gloable"}],"StartSence":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'cb028gRLA9Ez7v6nedVZh2e', 'StartSence');
// Script/start/StartSence.js

var One = require('One');
var Two = require('Two');
var Bill = require('Bill');
var SoundManager = require('SoundManager');
var Music = require('Music');
var Gloable = require('Gloable');

var State = {
  ZERO: 0,
  ONE: 1,
  TWO: 2
};

cc.Class({
  'extends': cc.Component,

  properties: {
    one: One,
    two: Two,
    doorMask: cc.Node,
    bill: Bill,
    soundMng: SoundManager,
    music: Music
  },

  onLoad: function onLoad() {
    var _this = this;

    this.state = State.ZERO;
    this.isLoaded = false;
    this.one.init();
    this.two.init();
    this.bill.init(this);
    this.music.init(this);

    cc.director.preloadScene('room', function () {
      _this.bill.loadfinish();
    });

    this.initBill();

    this.doorMaskAnimation = this.doorMask.getComponent(cc.Animation);
    this.doorMaskAnimation.play('doormask_show');

    this.isRunning = false;
    this.one.show();
    this.node.on('touchend', (function () {
      if (!this.isRunning) {
        switch (this.state) {
          case State.TWO:
            this.two.dimiss();
            this.doorMaskAnimation.play('doormask_dimiss');
            this.bill.show();
            this.state = State.ZERO;
            break;
          case State.ZERO:
            break;
        }
        this.isRunning = true;
      }
    }).bind(this));

    this.node.on('ONE', (function () {
      this.state = State.ONE;
      this.one.dimiss();
      this.two.show();
    }).bind(this));

    this.node.on('TWO', (function () {
      this.state = State.TWO;
      this.isRunning = false;
    }).bind(this));

    document.addEventListener('eleme_app_didBecomeActive', function () {
      cc.game.resume();
    });
    document.addEventListener('eleme_app_willResignActive', function () {
      cc.game.pause();
    });
  },

  initBill: function initBill() {
    this.isLoaded = true;
    this.bill.openBill();
  }
});

cc._RFpop();
},{"Bill":"Bill","Gloable":"Gloable","Music":"Music","One":"One","SoundManager":"SoundManager","Two":"Two"}],"SunLight":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bdbfaDB3X1H/51/Fze78ipD', 'SunLight');
// Script/end/SunLight.js

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

cc._RFpop();
},{"EndBg":"EndBg","OpenDoor":"OpenDoor"}],"TellPhone":[function(require,module,exports){
"use strict";
cc._RFpush(module, '941ccOfUBBIbKft+6i2jbgA', 'TellPhone');
// Script/room/TellPhone.js

var Gloable = require('Gloable');
cc.Class({
  'extends': cc.Component,

  properties: {
    onAnim: cc.AnimationClip,
    diAudio: cc.AudioClip,
    sayAudio: cc.AudioClip,
    sayNode: cc.Node
  },

  // use this for initialization
  onLoad: function onLoad() {
    this.animation = this.node.getComponent(cc.Animation);
  },

  animEnd: function animEnd() {
    this.sayNode.active = false;
    this.animation.addClip(this.onAnim, 'target');
  },

  animStart: function animStart() {
    this.playSound(this.diAudio);
  },

  say: function say() {
    this.sayNode.active = true;
    this.playSound(this.sayAudio);
  },

  /**
   * 播放音效(不循环)
   */
  playSound: function playSound(sound) {
    if (sound && Gloable.shouldPlayAudio) {
      cc.audioEngine.playEffect(sound, false);
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

cc._RFpop();
},{"Gloable":"Gloable"}],"Tip":[function(require,module,exports){
"use strict";
cc._RFpush(module, '027e4CpRQhNlJvq7xYSwCvP', 'Tip');
// Script/room/Tip.js

cc.Class({
  'extends': cc.Component,

  properties: {},

  // use this for initialization
  onLoad: function onLoad() {
    this.node.on('touchend', function () {
      cc.director.loadScene('end');
    });
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

cc._RFpop();
},{}],"Two":[function(require,module,exports){
"use strict";
cc._RFpush(module, '271c6Lo8sZKJ6ACGNvKH8Xp', 'Two');
// Script/start/Two.js

cc.Class({
    'extends': cc.Component,

    properties: {
        breath: cc.Node,
        smok: cc.Node
    },

    // use this for initialization
    init: function init() {
        this.breathAnimation = this.breath.getComponent(cc.Animation);
        this.smokAnimation = this.smok.getComponent(cc.Animation);
    },

    show: function show() {
        this.node.active = true;
        if (this.breathAnimation) {
            this.breathAnimation.play('breath_show');
        }
        if (this.smokAnimation) {
            this.smokAnimation.play('smok_show');
        }
    },

    dimiss: function dimiss() {
        if (this.breathAnimation) {
            this.breathAnimation.play('breath_dimiss');
        }
        if (this.smokAnimation) {
            this.smokAnimation.play('smok_dimiss');
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"Wang":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f06a2T4h29KfZn6VgCzrCz5', 'Wang');
// Script/room/Wang.js

var Gloable = require('Gloable');
cc.Class({
    'extends': cc.Component,

    properties: {
        changeAnim: cc.AnimationClip,
        openAudio: cc.AudioClip,
        closeAudio: cc.AudioClip,
        hiAudio: cc.AudioClip,
        wangSay: cc.AudioClip,
        shoutAudio: cc.AudioClip,
        sayNode: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.count = 0;
        this.animation = this.node.getComponent(cc.Animation);
        this.node.on('wang_start', (function () {}).bind(this));
        this.node.on('wang_end', (function () {
            this.animation.addClip(this.changeAnim, 'target');
        }).bind(this));
    },

    open: function open() {
        this.playSound(this.openAudio);
    },

    close: function close() {
        this.playSound(this.closeAudio);
    },

    shout: function shout() {
        this.playSound(this.shoutAudio);
    },

    sayHi: function sayHi() {
        this.playSound(this.hiAudio);
    },

    sayStart: function sayStart() {
        this.sayNode.active = true;
        this.playSound(this.wangSay);
    },

    sayEnd: function sayEnd() {
        this.sayNode.active = false;
    },

    /**
     * 播放音效(不循环)
     */
    playSound: function playSound(sound) {
        if (sound && Gloable.shouldPlayAudio) {
            cc.audioEngine.playEffect(sound, false);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"Gloable":"Gloable"}],"Window":[function(require,module,exports){
"use strict";
cc._RFpush(module, '0d81fIiO3lIGa3ac/7bGWBY', 'Window');
// Script/room/Window.js

var Gloable = require('Gloable');
cc.Class({
  'extends': cc.Component,

  properties: {
    say: cc.Node,
    openAudio: cc.AudioClip,
    closeAudio: cc.AudioClip,
    sayAudio: cc.AudioClip
  },

  onSay: function onSay() {
    this.say.active = true;
    this.playSound(this.sayAudio);
  },

  onEnd: function onEnd() {
    this.say.active = false;
  },

  open: function open() {
    this.playSound(this.openAudio);
  },

  close: function close() {
    this.playSound(this.closeAudio);
  },

  /**
   * 播放音效(不循环)
   */
  playSound: function playSound(sound) {
    if (sound && Gloable.shouldPlayAudio) {
      cc.audioEngine.playEffect(sound, false);
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

cc._RFpop();
},{"Gloable":"Gloable"}]},{},["Gloable","Music","SoundManager","DoorLight","EndBg","EndScene","OpenDoor","Option","OptionBtn","SunLight","BirdMask","FindKeyDialog","GameManager","Lamp","Object","Phone","Proxy","TellPhone","Tip","Wang","Window","Anim","Bill","BillInfo","ButtomToRoom","EmptyBtn","One","StartSence","Two"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IgNC5hcHAvQ29udGVudHMvUmVzb3VyY2VzL2FwcC5hc2FyL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvU2NyaXB0L3N0YXJ0L0FuaW0uanMiLCJhc3NldHMvU2NyaXB0L3N0YXJ0L0JpbGxJbmZvLmpzIiwiYXNzZXRzL1NjcmlwdC9zdGFydC9CaWxsLmpzIiwiYXNzZXRzL1NjcmlwdC9yb29tL0JpcmRNYXNrLmpzIiwiYXNzZXRzL1NjcmlwdC9zdGFydC9CdXR0b21Ub1Jvb20uanMiLCJhc3NldHMvU2NyaXB0L2VuZC9Eb29yTGlnaHQuanMiLCJhc3NldHMvU2NyaXB0L3N0YXJ0L0VtcHR5QnRuLmpzIiwiYXNzZXRzL1NjcmlwdC9lbmQvRW5kQmcuanMiLCJhc3NldHMvU2NyaXB0L2VuZC9FbmRTY2VuZS5qcyIsImFzc2V0cy9TY3JpcHQvcm9vbS9GaW5kS2V5RGlhbG9nLmpzIiwiYXNzZXRzL1NjcmlwdC9yb29tL0dhbWVNYW5hZ2VyLmpzIiwiYXNzZXRzL1NjcmlwdC9HbG9hYmxlLmpzIiwiYXNzZXRzL1NjcmlwdC9yb29tL0xhbXAuanMiLCJhc3NldHMvU2NyaXB0L011c2ljLmpzIiwiYXNzZXRzL1NjcmlwdC9yb29tL09iamVjdC5qcyIsImFzc2V0cy9TY3JpcHQvc3RhcnQvT25lLmpzIiwiYXNzZXRzL1NjcmlwdC9lbmQvT3BlbkRvb3IuanMiLCJhc3NldHMvU2NyaXB0L2VuZC9PcHRpb25CdG4uanMiLCJhc3NldHMvU2NyaXB0L2VuZC9PcHRpb24uanMiLCJhc3NldHMvU2NyaXB0L3Jvb20vUGhvbmUuanMiLCJhc3NldHMvU2NyaXB0L3Jvb20vUHJveHkuanMiLCJhc3NldHMvU2NyaXB0L1NvdW5kTWFuYWdlci5qcyIsImFzc2V0cy9TY3JpcHQvc3RhcnQvU3RhcnRTZW5jZS5qcyIsImFzc2V0cy9TY3JpcHQvZW5kL1N1bkxpZ2h0LmpzIiwiYXNzZXRzL1NjcmlwdC9yb29tL1RlbGxQaG9uZS5qcyIsImFzc2V0cy9TY3JpcHQvcm9vbS9UaXAuanMiLCJhc3NldHMvU2NyaXB0L3N0YXJ0L1R3by5qcyIsImFzc2V0cy9TY3JpcHQvcm9vbS9XYW5nLmpzIiwiYXNzZXRzL1NjcmlwdC9yb29tL1dpbmRvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTtBQUNJO0FBQ0o7QUFDSTtBQUNJO0FBQ1I7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0U7QUFDRjtBQUNFO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDQTtBQUNFO0FBQ047QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNFO0FBQ0E7QUFDTjtBQUNNO0FBQ0E7QUFDTjtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNKO0FBQ0E7QUFDRTtBQUNFO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNKO0FBQ0E7QUFDRTtBQUNFO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNFO0FBQ0Y7QUFDRTtBQUNFO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNKO0FBQ0k7QUFDQTtBQUNBO0FBQ0U7QUFDQTtBQUNOO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDRTtBQUNBO0FBQ047QUFDTTtBQUNBO0FBQ047QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ047QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNBO0FBQ0E7QUFDRTtBQUNBO0FBQ047QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNFO0FBQ047QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNBO0FBQ0U7QUFDQTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ1I7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ1I7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ1I7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNJO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDSTtBQUNKO0FBQ0k7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBR0k7QUFDRTtBQUROO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNSO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ1E7QUFDSTtBQUNBO0FBQ1o7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNJO0FBQ0E7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0k7QUFDSjtBQUNJO0FBQ0o7QUFDQTtBQUVJO0FBQUo7QUFJSTtBQUNJO0FBRlI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNJO0FBQ0o7QUFDSTtBQUNJO0FBQ1I7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ1I7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0E7QUFDSTtBQUNJO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDUjtBQUNRO0FBQ0k7QUFDWjtBQUNRO0FBQ0k7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNJO0FBQ0o7QUFDSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNJO0FBQ0k7QUFDaEI7QUFDWTtBQUNaO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDQTtBQUNBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0U7QUFDRjtBQUNFO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0E7QUFDSjtBQUNJO0FBQ0o7QUFDSTtBQUNBO0FBQ0o7QUFDSTtBQUNFO0FBQ047QUFDSTtBQUNFO0FBQ047QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNBO0FBQ0U7QUFDTjtBQUNJO0FBQ0U7QUFDTjtBQUNJO0FBQ0U7QUFDTjtBQUNJO0FBQ0U7QUFDTjtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNKO0FBQ0k7QUFDQTtBQUNBO0FBQ0o7QUFDQTtBQUNJO0FBQ0U7QUFDTjtBQUNJO0FBQ0U7QUFDQTtBQUNBO0FBQ047QUFDQTtBQUNBO0FBQ0k7QUFDRTtBQUNOO0FBQ0k7QUFDRTtBQUNBO0FBQ047QUFDQTtBQUNBO0FBQ0k7QUFDRTtBQUNOO0FBQ0k7QUFDRTtBQUNBO0FBQ0U7QUFDUjtBQUNRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNFO0FBQ0E7QUFDQTtBQUNOO0FBQ0k7QUFDRTtBQUNBO0FBQ047QUFDTTtBQUNFO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0U7QUFDQTtBQUNBO0FBQ047QUFDSTtBQUNFO0FBQ0E7QUFDTjtBQUNNO0FBQ0U7QUFDQTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDRTtBQUNBO0FBQ0E7QUFDTjtBQUNJO0FBQ0U7QUFDQTtBQUNBO0FBQ0U7QUFDQTtBQUNSO0FBQ007QUFDTjtBQUNBO0FBRUk7QUFDRTtBQUNBO0FBQU47QUFDQTtBQUNBO0FBRUU7QUFDRTtBQUNBO0FBQUo7QUFDQTtBQUVFO0FBQ0U7QUFDQTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFOO0FBRU07QUFDRTtBQUFSO0FBQ0E7QUFDQTtBQUNBO0FBRUU7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUFKO0FBQ0E7QUFFRTtBQUNFO0FBQUo7QUFDQTtBQUVFO0FBQ0U7QUFDQTtBQUNFO0FBQU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TkE7QUFDRTtBQUNFO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ047QUFDSTtBQUNBO0FBQ0o7QUFDRTtBQUNGO0FBQ0U7QUFDQTtBQUNBO0FBQ0Y7QUFDRTtBQUNFO0FBQ0o7QUFDQTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDRjtBQUNFO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0E7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNBO0FBQ0U7QUFDTjtBQUNNO0FBQ047QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNFO0FBQ047QUFDTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDRTtBQUNOO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDRTtBQUNGO0FBQ0U7QUFDRTtBQUNBO0FBQ0o7QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNBO0FBQ0E7QUFDRTtBQUNOO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDQTtBQUNKO0FBQ0E7QUFDRTtBQUNFO0FBQ0E7QUFDRTtBQUNBO0FBQ047QUFDTTtBQUNBO0FBQ047QUFDSTtBQUNKO0FBQ0E7QUFDRTtBQUNFO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNFO0FBQ0Y7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0o7QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDRTtBQUNBO0FBQ0E7QUFDTjtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNKO0FBQ0E7QUFDRTtBQUNFO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0U7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNJO0FBQ0o7QUFDSTtBQUNKO0FBQ0E7QUFFSTtBQUNJO0FBQVI7QUFDQTtBQUVJO0FBQ0k7QUFDSTtBQUFaO0FBQ0E7QUFDQTtBQUVJO0FBQ0k7QUFDSTtBQUFaO0FBQ0E7QUFDQTtBQUVJO0FBQ0k7QUFBUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNBO0FBQ1I7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ1I7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNFO0FBQ0Y7QUFDRTtBQUNGO0FBQ0U7QUFDRjtBQUVFO0FBQUY7QUFHRTtBQURGO0FBSUU7QUFGRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0k7QUFDSjtBQUNJO0FBQ0o7QUFDQTtBQUdJO0FBQ0k7QUFEUjtBQUNBO0FBR0k7QUFDSTtBQUNBO0FBRFI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNJO0FBQ0o7QUFDSTtBQUNJO0FBQ0E7QUFDUjtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBR0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQURSO0FBQ0E7QUFHSTtBQUNJO0FBRFI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdJO0FBQ0k7QUFDSTtBQURaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDRTtBQUNGO0FBQ0U7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ047QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNOO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDRTtBQUNOO0FBQ0k7QUFDQTtBQUNBO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNFO0FBQ047QUFDSTtBQUNBO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNFO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNFO0FBQ0Y7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNKO0FBQ0E7QUFDRTtBQUNFO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNKO0FBQ0E7QUFDRTtBQUNFO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDRTtBQUNFO0FBQ0E7QUFDTjtBQUNJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRTtBQUNBO0FBQ0E7QUFDRjtBQUNBO0FBQ0E7QUFDRTtBQUNGO0FBQ0U7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSjtBQUNBO0FBQ0U7QUFDRjtBQUNBO0FBREk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0o7QUFESTtBQUNFO0FBR047QUFDQTtBQURJO0FBR0o7QUFESTtBQUNBO0FBR0o7QUFESTtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0U7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQU07QUFFTjtBQUFNO0FBRVY7QUFHUjtBQUNBO0FBQ0E7QUFESTtBQUNFO0FBQ0E7QUFDQTtBQUdOO0FBQ0E7QUFESTtBQUNFO0FBQ0E7QUFHTjtBQUNBO0FBREk7QUFDRTtBQUdOO0FBREk7QUFDRTtBQUdOO0FBQ0E7QUFDQTtBQURFO0FBQ0U7QUFDQTtBQUdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0U7QUFDRjtBQUNFO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDSjtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0E7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNBO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDQTtBQUNKO0FBQ0E7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDRTtBQUNGO0FBQ0U7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNBO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0U7QUFDRTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0U7QUFDRjtBQUNFO0FBQ0Y7QUFDQTtBQUNFO0FBQ0U7QUFDRTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0k7QUFDSjtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNSO0FBQ0E7QUFDSTtBQUNJO0FBQ0E7QUFDSTtBQUNaO0FBQ1E7QUFDSTtBQUNaO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDSTtBQUNaO0FBQ1E7QUFDSTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDSTtBQUNKO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNSO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBRUE7QUFDSTtBQUFaO0FBQ0E7QUFDQTtBQUVJO0FBQ0k7QUFBUjtBQUNBO0FBRUk7QUFDSTtBQUFSO0FBQ0E7QUFFSTtBQUNJO0FBQVI7QUFDQTtBQUVJO0FBQ0k7QUFBUjtBQUNBO0FBRUk7QUFDSTtBQUNBO0FBQVI7QUFDQTtBQUVJO0FBQ0k7QUFBUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUk7QUFDSTtBQUNJO0FBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNFO0FBQ0Y7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDQTtBQUNKO0FBQ0E7QUFDRTtBQUNFO0FBQ0o7QUFDQTtBQUNFO0FBQ0U7QUFDSjtBQUNBO0FBQ0U7QUFDRTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRTtBQUNFO0FBQ0U7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgYW5pbU5hbWU6ICcnXG4gICAgfSxcblxuICAgIGFuaW1FbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRpc3BhdGNoRXZlbnQobmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKHRoaXMuYW5pbU5hbWUsIHRydWUpKTtcbiAgICB9XG5cbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuICAgIG5pY2tOYW1lOiBjYy5MYWJlbCxcbiAgICBmaXJzdFRleHQ6IGNjLlJpY2hUZXh0LFxuICAgIHNlY29uZFRleHQ6IGNjLlJpY2hUZXh0LFxuICAgIHRoaXJkVGV4dDogY2MuUmljaFRleHQsXG4gICAgZm91cnRoVGV4dDogY2MuUmljaFRleHQsXG4gICAgZmlmdGhUZXh0OiBjYy5SaWNoVGV4dCxcbiAgICBzaXh0aFRleHQ6IGNjLlJpY2hUZXh0LFxuICAgIGJ1dHRvbjogY2MuTm9kZSxcbiAgICBsb2FkaW5nOiBjYy5MYWJlbFxuICB9LFxuXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucG9pbnRDb3VudCA9IDA7XG4gICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNoYW5nZUxvYWRpbmdUZXh0KCk7XG4gICAgfSwgMC41LCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUik7XG4gIH0sXG5cbiAgY2hhbmdlTG9hZGluZ1RleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZih0aGlzLnBvaW50Q291bnQgPiAzKXtcbiAgICAgIHRoaXMubG9hZGluZy5zdHJpbmcgPSB0aGlzLmxvYWRpbmcuc3RyaW5nLnNwbGl0KCcuJylbMF07XG4gICAgICB0aGlzLnBvaW50Q291bnQgPSAwO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5sb2FkaW5nLnN0cmluZyArPSAnLic7XG4gICAgICB0aGlzLnBvaW50Q291bnQgKz0gMTtcbiAgICB9XG4gIH0sXG5cbiAgc2V0Tmlja05hbWU6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdGhpcy5uaWNrTmFtZS5zdHJpbmcgPSB0ZXh0O1xuICB9LFxuXG4gIHNldEZpcnN0VGV4dDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICB0aGlzLmZpcnN0VGV4dC5zdHJpbmcgPSB0ZXh0O1xuICB9LFxuXG4gIHNldFNlY29uZFRleHQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdGhpcy5zZWNvbmRUZXh0LnN0cmluZyA9IHRleHQ7XG4gIH0sXG5cbiAgc2V0VGhpcmRUZXh0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgIHRoaXMudGhpcmRUZXh0LnN0cmluZyA9IHRleHQ7XG4gIH0sXG5cbiAgc2V0Rm91cnRoVGV4dDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICB0aGlzLmZvdXJ0aFRleHQuc3RyaW5nID0gdGV4dDtcbiAgfSxcblxuICBzZXRGaWZ0aFRleHQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdGhpcy5maWZ0aFRleHQuc3RyaW5nID0gdGV4dDtcbiAgfSxcblxuICBzZXRTaXh0aFRleHQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdGhpcy5zaXh0aFRleHQuc3RyaW5nID0gdGV4dDtcbiAgfSxcblxuICBsb2FkZmluaXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5sb2FkaW5nLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5idXR0b24uYWN0aXZlID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgLy8gfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuICAgIGJpbGxQcmU6IGNjLlByZWZhYixcbiAgICBkaWFsb2dMYXllcjogY2MuTm9kZVxuICB9LFxuXG4gIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICBpbml0OiBmdW5jdGlvbiAoZ2FtZSkge1xuICAgIHRoaXMuaXNEYXRhT3ZlciA9IGZhbHNlO1xuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG5cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMucG9pbnRDb3VudCA9IDA7XG4gICAgdGhpcy5ub2RlLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5vcGVuQmlsbCgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgY2hhbmdlTG9hZGluZ1RleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5wb2ludENvdW50ID4gMykge1xuICAgICAgdGhpcy5sb2FkaW5nLnN0cmluZyA9IHRoaXMubG9hZGluZy5zdHJpbmcuc3BsaXQoJy4nKVswXTtcbiAgICAgIHRoaXMucG9pbnRDb3VudCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9hZGluZy5zdHJpbmcgKz0gJy4nO1xuICAgICAgdGhpcy5wb2ludENvdW50ICs9IDE7XG4gICAgfVxuICB9LFxuXG4gIG9wZW5CaWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmdhbWUuc291bmRNbmcucGxheVBpY2tCaWxsKCk7XG4gICAgICB0aGlzLnNob3dCaWxsSW5mbygpO1xuICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICB9XG4gIH0sXG5cbiAgc2hvd0JpbGxJbmZvOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5iaWxsTGlzdCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmlsbFByZSk7XG4gICAgdGhpcy5kaWFsb2dMYXllci5hZGRDaGlsZCh0aGlzLmJpbGxMaXN0KTtcbiAgICBpZiAodGhpcy5pc0RhdGFPdmVyKSB7XG4gICAgICB2YXIgYmlsbEluZm9Db20gPSB0aGlzLmJpbGxMaXN0LmdldENvbXBvbmVudCgnQmlsbEluZm8nKTtcbiAgICAgIGJpbGxJbmZvQ29tLmxvYWRmaW5pc2goKTtcbiAgICB9XG4gIH0sXG5cbiAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmFuaW1hdGlvbikge1xuICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgnYmlsbCcpO1xuICAgIH1cbiAgfSxcblxuICBsb2FkZmluaXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pc0RhdGFPdmVyID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5iaWxsTGlzdCkge1xuICAgICAgdmFyIGJpbGxJbmZvQ29tID0gdGhpcy5iaWxsTGlzdC5nZXRDb21wb25lbnQoJ0JpbGxJbmZvJyk7XG4gICAgICBiaWxsSW5mb0NvbS5sb2FkZmluaXNoKCk7XG4gICAgfVxuICB9XG5cbn0pO1xuIiwidmFyIEdsb2FibGUgPSByZXF1aXJlKCdHbG9hYmxlJyk7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBiaXJkOiBjYy5Ob2RlLFxuICAgICAgICBiaXJkQW5pbTogY2MuQW5pbWF0aW9uQ2xpcCxcbiAgICAgICAgYXVkaW86IGNjLkF1ZGlvQ2xpcFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmJpcmQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmFkZENsaXAodGhpcy5iaXJkQW5pbSwgJ3RhcmdldCcpO1xuICAgIH0sXG4gICAgXG4gICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgndGFyZ2V0Jyk7XG4gICAgICAgIHRoaXMucGxheVNvdW5kKHRoaXMuYXVkaW8pO1xuICAgIH0sXG5cbiAgICBkaW1pc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7pn7PmlYgo5LiN5b6q546vKVxuICAgICAqL1xuICAgIHBsYXlTb3VuZDogZnVuY3Rpb24gKHNvdW5kKSB7XG4gICAgICAgIGlmKHNvdW5kICYmIEdsb2FibGUuc2hvdWxkUGxheUF1ZGlvKXtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3Qoc291bmQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgXG4gICAgfSxcbiAgICBcbiAgICBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ3Jvb20nKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG4iLCJ2YXIgU3VuTGlnaHQgPSByZXF1aXJlKCdTdW5MaWdodCcpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzdW5MaWdodDogU3VuTGlnaHQsXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIGluaXQ6IGZ1bmN0aW9uIChnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc291bmRNbmcucHN1c2VEb29yTGlnaHQoKTtcbiAgICAgICAgICAgIHRoaXMuc3VuTGlnaHQuc2hvdygpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG4gICAgXG4gICAgYW5pbVN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmKCF0aGlzLnN0YXRlKXtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zb3VuZE1uZy5wbGF5RG9vckxpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsInZhciBHbG9hYmxlID0gcmVxdWlyZSgnR2xvYWJsZScpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICB9LFxuICAgIFxuICAgIHRvRWxlbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9IGRlY29kZVVSSUNvbXBvbmVudChHbG9hYmxlLkNPTkZpRy5nb1VybCk7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwidmFyIE9wdGlvbiA9IHJlcXVpcmUoJ09wdGlvbicpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBvcHRpb246IE9wdGlvbixcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm9wdGlvbi5pbml0KCk7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgIH0sXG5cbiAgICBzaG93Qmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoJ2VuZEJnJyk7XG4gICAgfSxcblxuICAgIHNob3dPcHRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5vcHRpb24uc2hvd09wdGlvbigpO1xuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsInZhciBTb3VuZE1hbmFnZXIgPSByZXF1aXJlKCdTb3VuZE1hbmFnZXInKTtcbnZhciBEb29yTGlnaHQgPSByZXF1aXJlKCdEb29yTGlnaHQnKTtcbnZhciBNdXNpYyA9IHJlcXVpcmUoJ011c2ljJyk7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNvdW5kTW5nOiBTb3VuZE1hbmFnZXIsXG4gICAgICAgIGRvb3JMaWdodDogRG9vckxpZ2h0LFxuICAgICAgICBtdXNpYzogTXVzaWNcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubXVzaWMuaW5pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5kb29yTGlnaHQuaW5pdCh0aGlzKTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdlbGVtZV9hcHBfZGlkQmVjb21lQWN0aXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZ2FtZS5yZXN1bWUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2VsZW1lX2FwcF93aWxsUmVzaWduQWN0aXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZih0aGlzLmNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBzZXRDYWxsQmFjazogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG4iLCJ2YXIgT2JqZWN0ID0gcmVxdWlyZSgnT2JqZWN0Jyk7XG52YXIgUHJveHkgPSByZXF1aXJlKCdQcm94eScpO1xudmFyIFBob25lID0gcmVxdWlyZSgnUGhvbmUnKTtcbnZhciBCaXJkTWFzayA9IHJlcXVpcmUoJ0JpcmRNYXNrJyk7XG52YXIgTGFtcCA9IHJlcXVpcmUoJ0xhbXAnKTtcbnZhciBTb3VuZE1hbmFnZXIgPSByZXF1aXJlKCdTb3VuZE1hbmFnZXInKTtcbnZhciBNdXNpYyA9IHJlcXVpcmUoJ011c2ljJyk7XG5cbnZhciBmaW5kID0ge1xuICB3aW5kb3c6IGZhbHNlLFxuICB0ZWxscGhvbmU6IGZhbHNlLFxuICB3YW5nOiBmYWxzZVxufTtcblxuY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuICAgIHNob2VCb3g6IE9iamVjdCxcbiAgICBidWc6IE9iamVjdCxcbiAgICB3aW5kb3c6IE9iamVjdCxcbiAgICBwcm9ncmVzczogY2MuTGFiZWwsXG4gICAgcGhvbmU6IFBob25lLFxuICAgIGxhbXBQcm94eTogUHJveHksXG4gICAgbGFtcDogTGFtcCxcbiAgICBiaXJkTWFzazogQmlyZE1hc2ssXG4gICAgdGVsbHBob25lUHJveHk6IFByb3h5LFxuICAgIHdhbmc6IE9iamVjdCxcbiAgICByb29tOiBjYy5TY3JvbGxWaWV3LFxuICAgIHNvdW5kTW5nOiBTb3VuZE1hbmFnZXIsXG4gICAgbXVzaWM6IE11c2ljLFxuICAgIGRpYWxvZ0xheWVyOiBjYy5Ob2RlLFxuICAgIGZpbmRrZXlEaWFsb2c6IGNjLlByZWZhYixcbiAgICB0aXA6IGNjLlByZWZhYixcbiAgICB3YW5nU2F5OiBjYy5MYWJlbCxcbiAgICB3aW5kb3dTYXk6IGNjLkxhYmVsLFxuICAgIHRlbGxwaG9uZVNheTogY2MuTGFiZWxcbiAgfSxcblxuICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5tdXNpYy5pbml0KHRoaXMpO1xuICAgIC8vY2MuZGlyZWN0b3Iuc2V0RGlzcGxheVN0YXRzKHRydWUpO1xuICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgnZW5kJyk7XG5cbiAgICB0aGlzLmxvb2tSb29tKCk7XG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdlbGVtZV9hcHBfZGlkQmVjb21lQWN0aXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2MuZ2FtZS5yZXN1bWUoKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdlbGVtZV9hcHBfd2lsbFJlc2lnbkFjdGl2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNjLmdhbWUucGF1c2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICBsb29rUm9vbTogZnVuY3Rpb24gKCkge1xuICAgIGNjLmV2ZW50TWFuYWdlci5zZXRFbmFibGVkKGZhbHNlKTtcbiAgICB0aGlzLnNjaGVkdWxlT25jZShmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJvb20uc2Nyb2xsVG9QZXJjZW50SG9yaXpvbnRhbCgxLCAxLCBmYWxzZSk7XG4gICAgfSwgMCk7XG4gICAgdGhpcy5zY2hlZHVsZU9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yb29tLnNjcm9sbFRvUGVyY2VudEhvcml6b250YWwoMCwgMiwgZmFsc2UpO1xuICAgIH0sIDEpO1xuICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucm9vbS5zY3JvbGxUb1BlcmNlbnRIb3Jpem9udGFsKDAuNSwgMSwgZmFsc2UpO1xuICAgIH0sIDMpO1xuICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNjLmV2ZW50TWFuYWdlci5zZXRFbmFibGVkKHRydWUpO1xuICAgIH0sIDQpO1xuICB9LFxuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RhcnQgPSAnX3N0YXJ0JztcbiAgICB2YXIgZW5kID0gJ19lbmQnO1xuICAgIHZhciB3YW5nQ291bnQgPSAwO1xuXG4gICAgdGhpcy53YW5nU2F5LnN0cmluZyA9ICfmja7miJHlhavlubTnmoTop4Llr5/vvIzkvaDmnIDniLHlkIPnmoTppJDljoXmmK9YWFjvvIzmiJHkuZ/kuIDmoLfllpzmrKLlkaJ+JztcbiAgICB0aGlzLndpbmRvd1NheS5zdHJpbmcgPSAn5oiR55yL5L2g5YWr5bm05p2l5pyJ6ZKx5Zyo5aSW5Y2W5LiK6IqxOTk55Z2X6ZKx77yM5Y205bm05bm05Lqk5LiN5LiK5oi/56ef77yB6L+Z5piv6YC85oiR5Y+R6aOZ5ZCX77yBJztcbiAgICB0aGlzLnRlbGxwaG9uZVNheS5zdHJpbmcgPSAn5ZCs5L2g6ZqU5aOB55qE546L5Y+U5Y+U6K+077yM5YWr5bm05p2l5L2g5b6X6L+HOTk55Liq6aW/5LqG5LmI57qi5YyF77yM5pyJOTk55Z2X6ZKx5ZGi77yM6L+H5bm05Zue5a626KaB57uZ5oiR5aSn57qi5YyF5ZOm77yBJztcblxuICAgIC8vIOmei+ebkuS6i+S7tlxuICAgIHRoaXMubm9kZS5vbih0aGlzLnNob2VCb3gubm9kZS5uYW1lICsgc3RhcnQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgY2MubG9nKHRoaXMuc2hvZUJveC5ub2RlLm5hbWUgKyAnIHN0YXJ0Jyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5vZGUub24odGhpcy5zaG9lQm94Lm5vZGUubmFtZSArIGVuZCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjYy5sb2codGhpcy5zaG9lQm94Lm5vZGUubmFtZSArICcgZW5kJyk7XG4gICAgICB0aGlzLmJ1Zy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmJ1Zy5zdGFydEFuaW0oKTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgLy8g5bCP5by65LqL5Lu2XG4gICAgdGhpcy5ub2RlLm9uKHRoaXMuYnVnLm5vZGUubmFtZSArIHN0YXJ0LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGNjLmxvZyh0aGlzLmJ1Zy5ub2RlLm5hbWUgKyAnIHN0YXJ0Jyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5vZGUub24odGhpcy5idWcubm9kZS5uYW1lICsgZW5kLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGNjLmxvZyh0aGlzLmJ1Zy5ub2RlLm5hbWUgKyAnIGVuZCcpO1xuICAgICAgdGhpcy5idWcubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAvLyDnga/kuovku7ZcbiAgICB0aGlzLm5vZGUub24odGhpcy5sYW1wUHJveHkuZ2V0VGFyZ2V0Tm9kZSgpLm5hbWUgKyBzdGFydCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjYy5sb2codGhpcy5sYW1wUHJveHkuZ2V0VGFyZ2V0Tm9kZSgpLm5hbWUgKyAnIHN0YXJ0Jyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5vZGUub24odGhpcy5sYW1wUHJveHkuZ2V0VGFyZ2V0Tm9kZSgpLm5hbWUgKyBlbmQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgY2MubG9nKHRoaXMubGFtcFByb3h5LmdldFRhcmdldE5vZGUoKS5uYW1lICsgJyBlbmQnKTtcbiAgICAgIGlmICh0aGlzLmxhbXAuZ2V0U3RhdGUoKSkge1xuICAgICAgICB0aGlzLmJpcmRNYXNrLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYmlyZE1hc2suZGltaXNzKCk7XG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIOeql+S6i+S7tlxuICAgIHRoaXMubm9kZS5vbih0aGlzLndpbmRvdy5ub2RlLm5hbWUgKyBzdGFydCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjYy5sb2codGhpcy53aW5kb3cubm9kZS5uYW1lICsgJyBzdGFydCcpO1xuICAgICAgY2MuZXZlbnRNYW5hZ2VyLnNldEVuYWJsZWQoZmFsc2UpO1xuICAgICAgdGhpcy5yb29tLnNjcm9sbFRvUGVyY2VudEhvcml6b250YWwoMC4xLCAwLjYsIGZhbHNlKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHRoaXMubm9kZS5vbih0aGlzLndpbmRvdy5ub2RlLm5hbWUgKyBlbmQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgY2MubG9nKHRoaXMud2luZG93Lm5vZGUubmFtZSArICcgZW5kJyk7XG4gICAgICBjYy5ldmVudE1hbmFnZXIuc2V0RW5hYmxlZCh0cnVlKTtcblxuICAgICAgaWYgKCFmaW5kLndpbmRvdykge1xuICAgICAgICBmaW5kLndpbmRvdyA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkU2NvcmUoKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgLy8g55S16K+d5LqL5Lu2XG4gICAgdGhpcy5ub2RlLm9uKHRoaXMudGVsbHBob25lUHJveHkuZ2V0VGFyZ2V0Tm9kZSgpLm5hbWUgKyBzdGFydCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjYy5sb2codGhpcy50ZWxscGhvbmVQcm94eS5nZXRUYXJnZXROb2RlKCkubmFtZSArICcgc3RhcnQnKTtcbiAgICAgIGNjLmV2ZW50TWFuYWdlci5zZXRFbmFibGVkKGZhbHNlKTtcbiAgICAgIHRoaXMucm9vbS5zY3JvbGxUb1BlcmNlbnRIb3Jpem9udGFsKDAuNSwgMC42LCBmYWxzZSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5vZGUub24odGhpcy50ZWxscGhvbmVQcm94eS5nZXRUYXJnZXROb2RlKCkubmFtZSArIGVuZCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjYy5sb2codGhpcy50ZWxscGhvbmVQcm94eS5nZXRUYXJnZXROb2RlKCkubmFtZSArICcgZW5kJyk7XG4gICAgICBjYy5ldmVudE1hbmFnZXIuc2V0RW5hYmxlZCh0cnVlKTtcblxuICAgICAgaWYgKCFmaW5kLnRlbGxwaG9uZSkge1xuICAgICAgICBmaW5kLnRlbGxwaG9uZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRkU2NvcmUoKTtcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgLy8g6ICB546L5LqL5Lu2XG4gICAgdGhpcy5ub2RlLm9uKHRoaXMud2FuZy5ub2RlLm5hbWUgKyBzdGFydCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBjYy5sb2codGhpcy53YW5nLm5vZGUubmFtZSArICcgc3RhcnQnKTtcbiAgICAgIGNjLmV2ZW50TWFuYWdlci5zZXRFbmFibGVkKGZhbHNlKTtcbiAgICAgIHRoaXMucm9vbS5zY3JvbGxUb1BlcmNlbnRIb3Jpem9udGFsKDAuODUsIDAuNiwgZmFsc2UpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ub2RlLm9uKHRoaXMud2FuZy5ub2RlLm5hbWUgKyBlbmQsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgY2MubG9nKHRoaXMud2FuZy5ub2RlLm5hbWUgKyAnIGVuZCcpO1xuICAgICAgY2MuZXZlbnRNYW5hZ2VyLnNldEVuYWJsZWQodHJ1ZSk7XG4gICAgICBpZiAod2FuZ0NvdW50ID49IDEgJiYgIWZpbmQud2FuZykge1xuICAgICAgICBmaW5kLndhbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmFkZFNjb3JlKCk7XG4gICAgICB9XG4gICAgICB3YW5nQ291bnQgKz0gMTtcbiAgICB9LmJpbmQodGhpcykpO1xuXG5cbiAgICB0aGlzLm5vZGUub24oJ0dhbWVBbmltRW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB0aGlzLnNvdW5kTW5nLnBsYXlLbm9jaygpO1xuICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5zaG93VGlwLCAxLjUpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgc2hvd1RpcDogZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aXBOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50aXApO1xuICAgIHRoaXMuZGlhbG9nTGF5ZXIuYWRkQ2hpbGQodGlwTm9kZSk7XG4gIH0sXG5cbiAgYWRkU2NvcmU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNjb3JlICs9IDE7XG4gICAgdGhpcy5zaG93RmluZGtleURpYWxvZyhmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2NhbGVCaWcgPSBjYy5zY2FsZUJ5KDAuMTUsIDEuNSwgMS41KTtcbiAgICAgIHZhciBzY2FsZU5vbWFsID0gc2NhbGVCaWcucmV2ZXJzZSgpO1xuICAgICAgdmFyIGFuaW0gPSBjYy5zZXF1ZW5jZShzY2FsZUJpZywgc2NhbGVOb21hbCk7XG4gICAgICB0aGlzLnByb2dyZXNzLm5vZGUucnVuQWN0aW9uKGFuaW0pO1xuICAgICAgdGhpcy5wcm9ncmVzcy5zdHJpbmcgPSB0aGlzLnNjb3JlO1xuICAgICAgdGhpcy5zb3VuZE1uZy5wbGF5RmluZEtleSgpO1xuXG4gICAgICBpZiAodGhpcy5jaGVja1N0YXRlKCkpIHtcbiAgICAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgc2hvd0ZpbmRrZXlEaWFsb2c6IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgdmFyIGRpYWxvZ05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZpbmRrZXlEaWFsb2cpO1xuICAgIHZhciBjb21wID0gZGlhbG9nTm9kZS5nZXRDb21wb25lbnQoJ0ZpbmRLZXlEaWFsb2cnKTtcbiAgICBjb21wLnNldENhbGxCYWNrKGZ1bmMpO1xuICAgIHRoaXMuZGlhbG9nTGF5ZXIuYWRkQ2hpbGQoZGlhbG9nTm9kZSk7XG4gIH0sXG5cbiAgY2hlY2tTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmaW5kLndpbmRvdyAmJiBmaW5kLnRlbGxwaG9uZSAmJiBmaW5kLndhbmc7XG4gIH0sXG5cbiAgZ2FtZU92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJvb20uc2Nyb2xsVG9QZXJjZW50SG9yaXpvbnRhbCgwLjUsIDIpO1xuICAgIHRoaXMuc2NoZWR1bGVPbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucGhvbmUucGxheUVuZEFuaW0oKTtcbiAgICB9LCAyKTtcbiAgfVxuXG4gIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgLy8gfSxcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIENPTkZpRzoge1xuICAgIHNoYXJlQ29uZmlnOntcbiAgICAgIHNvdXJjZTogJycsIC8vIOadpea6kO+8jOeUqOS6jue7n+iuoVxuICAgICAgdGFyZ2V0czogWyd3ZWl4aW4nLCAnd2VpeGluX3RpbWVsaW5lJ10sIC8vIOWIhuS6q+aMiemSrlxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgdGV4dDogJycsXG4gICAgICBkZXNjOiAnJyxcbiAgICAgIHVybDogJycsXG4gICAgICBsaW5rOiAnJyxcbiAgICAgIGltYWdlX3VybDogJycsXG4gICAgICBpbWdVcmw6ICcnXG4gICAgfSxcbiAgICB2aXBVcmw6ICcnLFxuICAgIGdvVXJsOiAnJ1xuICB9LFxuICBNSVNTQklMTDoge30sXG5cbiAgbXVzaWNTdGF0ZTogdHJ1ZSxcbiAgc2hhcmVJZDogJycsXG4gIHNob3VsZFBsYXlBdWRpbzogY2Muc3lzLm9zICE9PSBjYy5zeXMuT1NfQU5EUk9JRCxcblxuICBzZXRDb25maWc6IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICB0aGlzLkNPTkZpRyA9IGNvbmZpZztcbiAgfSxcblxuICBFVkVOVF9TSEFSRTogMzY4NywgICAgICAgICAgLy8g5Lyg6YCS5rip5pqWXG4gIEVWRU5UX0VMRU1FOiAzNjg4LCAgICAgICAgICAvLyDmiJHopoHlj5bmmpZcbiAgRVZFTlRfQklMTDogMzY4OSwgICAgICAgICAgIC8vIOafpeeci+WujOaVtOi0puWNlVxuICBFVkVOVF9WSVA6IDM2OTAsICAgICAgICAgICAgLy8g6LSt5Lmw5Lya5ZGY5Y2hXG4gIEVWRU5UX1NUQVJUOiAzNjkyICAgICAgICAgICAvLyDlvIDlp4vmiJHnmoQ45bm06K6w5b+GXG59O1xuIiwidmFyIEdsb2FibGUgPSByZXF1aXJlKCdHbG9hYmxlJyk7XG5cbmNjLkNsYXNzKHtcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gIHByb3BlcnRpZXM6IHtcbiAgICBvbkFuaW06IGNjLkFuaW1hdGlvbkNsaXAsXG4gICAgb2ZmQW5pbTogY2MuQW5pbWF0aW9uQ2xpcCxcbiAgICBvbkF1ZGlvOiBjYy5BdWRpb0NsaXAsXG4gICAgb2ZmQXVkaW86IGNjLkF1ZGlvQ2xpcCxcbiAgfSxcblxuICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICB9LFxuXG4gIGFuaW1FbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN0YXRlID0gIXRoaXMuc3RhdGU7XG4gICAgaWYgKHRoaXMuc3RhdGUpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLmFkZENsaXAodGhpcy5vZmZBbmltLCAndGFyZ2V0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLmFkZENsaXAodGhpcy5vbkFuaW0sICd0YXJnZXQnKTtcbiAgICB9XG4gIH0sXG5cbiAgYW5pbVN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlKSB7XG4gICAgICB0aGlzLnBsYXlTb3VuZCh0aGlzLm9uQXVkaW8pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBsYXlTb3VuZCh0aGlzLm9mZkF1ZGlvKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOaSreaUvumfs+aViCjkuI3lvqrnjq8pXG4gICAqL1xuICBwbGF5U291bmQ6IGZ1bmN0aW9uIChzb3VuZCkge1xuICAgIGlmKHNvdW5kICYmIEdsb2FibGUuc2hvdWxkUGxheUF1ZGlvKXtcbiAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3Qoc291bmQsIGZhbHNlKTtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0U3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIXRoaXMuc3RhdGU7XG4gIH1cbn0pO1xuIiwidmFyIEdsb2FibGUgPSByZXF1aXJlKCdHbG9hYmxlJyk7XG5cbmNjLkNsYXNzKHtcbiAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gIHByb3BlcnRpZXM6IHtcbiAgICBvbk11c2ljOiBjYy5TcHJpdGVGcmFtZSxcbiAgICBvZmZNdXNpYzogY2MuU3ByaXRlRnJhbWVcbiAgfSxcblxuICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgaW5pdDogZnVuY3Rpb24gKGdhbWUpIHtcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIHRoaXMudXBkYXRlU3AoKTtcbiAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zd2l0Y2hTdGF0ZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgc3dpdGNoU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICBHbG9hYmxlLm11c2ljU3RhdGUgPSAhR2xvYWJsZS5tdXNpY1N0YXRlO1xuICAgIHRoaXMudXBkYXRlU3AoKTtcbiAgfSxcbiAgXG4gIHVwZGF0ZVNwOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNwO1xuICAgIGlmIChHbG9hYmxlLm11c2ljU3RhdGUpIHtcbiAgICAgIHNwID0gdGhpcy5vbk11c2ljO1xuICAgICAgdGhpcy5nYW1lLnNvdW5kTW5nLnBsYXlCR01Tb3VuZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcCA9IHRoaXMub2ZmTXVzaWM7XG4gICAgICB0aGlzLmdhbWUuc291bmRNbmcucGF1c2VCR01Tb3VuZCgpO1xuICAgIH1cbiAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcDtcbiAgfSxcbiAgXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZ2FtZS5zb3VuZE1uZy5wYXVzZUJHTVNvdW5kKCk7XG4gIH1cblxuICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gIC8vIH0sXG59KTtcbiIsInZhciBHbG9hYmxlID0gcmVxdWlyZSgnR2xvYWJsZScpO1xuXG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgdGFyZ2V0QW5pbTogY2MuQW5pbWF0aW9uQ2xpcCwgLy8g6K+l6IqC54K55LiK55qE5Yqo55S7XG4gICAgaXNUb3VjaEFibGU6IHRydWUsXG4gICAgaXNSZXBsYXk6IHRydWUsXG4gICAgYXVkaW86IGNjLkF1ZGlvQ2xpcFxuICB9LFxuXG4gIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZih0aGlzLnRhcmdldEFuaW0pe1xuICAgICAgdGhpcy5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgdGhpcy5hbmltYXRpb24uYWRkQ2xpcCh0aGlzLnRhcmdldEFuaW0sICd0YXJnZXQnKTtcbiAgICAgIGlmICh0aGlzLmlzVG91Y2hBYmxlKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2gsIHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBvblRvdWNoOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNSZXBsYXkgfHwgIXRoaXMuaXNUb3VjaGVkKSB7XG4gICAgICB0aGlzLnN0YXJ0QW5pbSgpO1xuICAgICAgdGhpcy5pc1RvdWNoZWQgPSB0cnVlO1xuICAgICAgdGhpcy5wbGF5U291bmQodGhpcy5hdWRpbyk7XG4gICAgfVxuICB9LFxuXG4gIHN0YXJ0QW5pbTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoJ3RhcmdldCcpO1xuICAgIGNjLmxvZyh0aGlzLm5vZGUubmFtZSArICdfc3RhcnQgc2VuZCcpO1xuICAgIHRoaXMubm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBjYy5FdmVudC5FdmVudEN1c3RvbSh0aGlzLm5vZGUubmFtZSArICdfc3RhcnQnLCB0cnVlKSk7XG4gIH0sXG5cbiAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ub2RlLm9mZigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2gpO1xuICB9LFxuXG4gIGFuaW1FbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjYy5sb2codGhpcy5ub2RlLm5hbWUgKyAnX2VuZCBzZW5kJyk7XG4gICAgdGhpcy5ub2RlLmRpc3BhdGNoRXZlbnQobmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKHRoaXMubm9kZS5uYW1lICsgJ19lbmQnLCB0cnVlKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOaSreaUvumfs+aViCjkuI3lvqrnjq8pXG4gICAqL1xuICBwbGF5U291bmQ6IGZ1bmN0aW9uIChzb3VuZCkge1xuICAgIGlmKHNvdW5kICYmIEdsb2FibGUuc2hvdWxkUGxheUF1ZGlvKXtcbiAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3Qoc291bmQsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgfSxcbiAgICBcbiAgICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmKHRoaXMuYW5pbWF0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoJ2Rvb3J0ZXh0X3Nob3cnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgZGltaXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmKHRoaXMuYW5pbWF0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoJ2Rvb3J0ZXh0X2RpbWlzcycpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICBvbkRpbWlzczogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwiY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGV4dDE6IGNjLk5vZGUsXG4gICAgICAgIHRleHQyOiBjYy5Ob2RlXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRleHQxQW5pbSA9IHRoaXMudGV4dDEuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMudGV4dDJBbmltID0gdGhpcy50ZXh0Mi5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICB9LFxuXG4gICAgc2hvd1RleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50ZXh0MUFuaW0ucGxheSgndGV4dDEnKTtcbiAgICAgICAgdGhpcy50ZXh0MkFuaW0ucGxheSgndGV4dDInKTtcbiAgICB9XG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxufSk7XG4iLCJjYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7fSxcblxuICB0b1NoYXJlOiBmdW5jdGlvbiAoKSB7XG4gIH0sXG5cbiAgdG9TaG93OiBmdW5jdGlvbiAoKSB7XG4gIH0sXG5cbiAgdG9WaXA6IGZ1bmN0aW9uICgpIHtcbiAgfSxcblxuICB0b0dvOiBmdW5jdGlvbiAoKSB7XG4gIH1cblxuICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICB9LFxuXG4gICAgc2hvd09wdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgnb3B0aW9uJyk7XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwidmFyIEdsb2FibGUgPSByZXF1aXJlKCdHbG9hYmxlJyk7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBob25lQ2FsbEFuaW06IGNjLkFuaW1hdGlvbkNsaXAsXG4gICAgICAgIGF1ZGlvOiBjYy5BdWRpb0NsaXAsXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgfSxcblxuICAgIHBsYXlFbmRBbmltOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIGFuaW1hdGlvbi5hZGRDbGlwKHRoaXMucGhvbmVDYWxsQW5pbSwgJ3RhcmdldCcpO1xuICAgICAgICBhbmltYXRpb24ucGxheSgndGFyZ2V0Jyk7XG4gICAgICAgIHRoaXMucGxheVNvdW5kKHRoaXMuYXVkaW8pO1xuICAgIH0sXG5cbiAgICBnYW1lQW5pbUVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChuZXcgY2MuRXZlbnQuRXZlbnRDdXN0b20oJ0dhbWVBbmltRW5kJywgdHJ1ZSkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmkq3mlL7pn7PmlYgo5LiN5b6q546vKVxuICAgICAqL1xuICAgIHBsYXlTb3VuZDogZnVuY3Rpb24gKHNvdW5kKSB7XG4gICAgICAgIGlmKHNvdW5kICYmIEdsb2FibGUuc2hvdWxkUGxheUF1ZGlvKXtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3Qoc291bmQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsInZhciBHbG9hYmxlID0gcmVxdWlyZSgnR2xvYWJsZScpO1xuY2MuQ2xhc3Moe1xuICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgcHJvcGVydGllczoge1xuICAgIHRhcmdldEFuaW06IGNjLkFuaW1hdGlvbkNsaXAsIC8vIOivpeiKgueCueS4iueahOWKqOeUu1xuICAgIHByb3h5Tm9kZTogY2MuTm9kZSxcbiAgICBpc1JlcGxheTogdHJ1ZSxcbiAgICBhdWRpbzogY2MuQXVkaW9DbGlwXG4gIH0sXG5cbiAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIGlmKHRoaXMucHJveHlOb2RlIHx8IHRoaXMudGFyZ2V0QW5pbSl7XG4gICAgICB0aGlzLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRoaXMucHJveHlOb2RlLmFjdGl2ZTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5wcm94eU5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICB0aGlzLmFuaW1hdGlvbi5hZGRDbGlwKHRoaXMudGFyZ2V0QW5pbSwgJ3RhcmdldCcpO1xuICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIHRoaXMub25Ub3VjaCwgdGhpcyk7XG4gICAgfVxuICB9LFxuXG4gIG9uVG91Y2g6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1JlcGxheSB8fCAhdGhpcy5pc1RvdWNoZWQpIHtcbiAgICAgIHRoaXMuc3RhcnRBbmltKCk7XG4gICAgICB0aGlzLmlzVG91Y2hlZCA9IHRydWU7XG4gICAgICB0aGlzLnBsYXlTb3VuZCh0aGlzLmF1ZGlvKTtcbiAgICB9XG4gIH0sXG5cbiAgc3RhcnRBbmltOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICB0aGlzLnByb3h5Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KCd0YXJnZXQnKTtcbiAgICBjYy5sb2codGhpcy5wcm94eU5vZGUubmFtZSArICdfc3RhcnQgc2VuZCcpO1xuICAgIHRoaXMucHJveHlOb2RlLmRpc3BhdGNoRXZlbnQobmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKHRoaXMucHJveHlOb2RlLm5hbWUgKyAnX3N0YXJ0JywgdHJ1ZSkpO1xuICB9LFxuXG4gIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucHJveHlOb2RlLm9mZigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2gpO1xuICB9LFxuXG4gIGFuaW1FbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMucHJveHlOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjYy5sb2codGhpcy5wcm94eU5vZGUubmFtZSArICdfZW5kIHNlbmQnKTtcbiAgICB0aGlzLnByb3h5Tm9kZS5kaXNwYXRjaEV2ZW50KG5ldyBjYy5FdmVudC5FdmVudEN1c3RvbSh0aGlzLm5vZGUubmFtZSArICdfZW5kJywgdHJ1ZSkpO1xuICB9LFxuXG4gIGdldFRhcmdldE5vZGU6ZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb3h5Tm9kZTtcbiAgfSxcblxuICAvKipcbiAgICog5pKt5pS+6Z+z5pWIKOS4jeW+queOrylcbiAgICovXG4gIHBsYXlTb3VuZDogZnVuY3Rpb24gKHNvdW5kKSB7XG4gICAgaWYoc291bmQgJiYgR2xvYWJsZS5zaG91bGRQbGF5QXVkaW8pe1xuICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChzb3VuZCwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgLy8gfSxcbn0pO1xuIiwidmFyIEdsb2FibGUgPSByZXF1aXJlKCdHbG9hYmxlJyk7XG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgYmdtQXVkaW86IGNjLkF1ZGlvQ2xpcCxcbiAgICBwaWNrQmlsbDogY2MuQXVkaW9DbGlwLFxuICAgIGZpbmRLZXk6IGNjLkF1ZGlvQ2xpcCxcbiAgICBkb29yTGlnaHQ6IGNjLkF1ZGlvQ2xpcCxcbiAgICBrbm9jazogY2MuQXVkaW9DbGlwLFxuICAgIGlzTG9vcDogdHJ1ZVxuICB9LFxuXG4gIHBsYXlLbm9jazogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGxheVNvdW5kKHRoaXMua25vY2spO1xuICB9LFxuXG4gIHBsYXlGaW5kS2V5OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wbGF5U291bmQodGhpcy5maW5kS2V5KTtcbiAgfSxcblxuICBwbGF5UGlja0JpbGw6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBsYXlTb3VuZCh0aGlzLnBpY2tCaWxsKTtcbiAgfSxcblxuICBwbGF5RG9vckxpZ2h0OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5kb29yTGlnaHRBdWRpbyA9IHRoaXMucGxheVNvdW5kKHRoaXMuZG9vckxpZ2h0KTtcbiAgfSxcblxuICBwc3VzZURvb3JMaWdodDogZnVuY3Rpb24gKCkge1xuICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlKHRoaXMuZG9vckxpZ2h0QXVkaW8pO1xuICB9LFxuXG4gIC8qKlxuICAgKiDmkq3mlL7pn7PmlYgo5LiN5b6q546vKVxuICAgKi9cbiAgcGxheVNvdW5kOiBmdW5jdGlvbiAoc291bmQpIHtcbiAgICBpZiAoc291bmQgJiYgR2xvYWJsZS5zaG91bGRQbGF5QXVkaW8pIHtcbiAgICAgIHZhciBpZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3Qoc291bmQsIGZhbHNlKTtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOaSreaUvumfs+aViCjkuI3lvqrnjq8pXG4gICAqL1xuICBwbGF5QkdNU291bmQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmJnbUlkID0gY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLmJnbUF1ZGlvLCB0aGlzLmlzTG9vcCk7XG4gIH0sXG5cbiAgcGF1c2VCR01Tb3VuZDogZnVuY3Rpb24gKCkge1xuICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlKHRoaXMuYmdtSWQpO1xuICB9XG59KTtcbiIsInZhciBPbmUgPSByZXF1aXJlKCdPbmUnKTtcbnZhciBUd28gPSByZXF1aXJlKCdUd28nKTtcbnZhciBCaWxsID0gcmVxdWlyZSgnQmlsbCcpO1xudmFyIFNvdW5kTWFuYWdlciA9IHJlcXVpcmUoJ1NvdW5kTWFuYWdlcicpO1xudmFyIE11c2ljID0gcmVxdWlyZSgnTXVzaWMnKTtcbnZhciBHbG9hYmxlID0gcmVxdWlyZSgnR2xvYWJsZScpO1xuXG52YXIgU3RhdGUgPSB7XG4gIFpFUk86IDAsXG4gIE9ORTogMSxcbiAgVFdPOiAyXG59O1xuXG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgb25lOiBPbmUsXG4gICAgdHdvOiBUd28sXG4gICAgZG9vck1hc2s6IGNjLk5vZGUsXG4gICAgYmlsbDogQmlsbCxcbiAgICBzb3VuZE1uZzogU291bmRNYW5hZ2VyLFxuICAgIG11c2ljOiBNdXNpY1xuICB9LFxuXG4gIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5aRVJPO1xuICAgIHRoaXMuaXNMb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9uZS5pbml0KCk7XG4gICAgdGhpcy50d28uaW5pdCgpO1xuICAgIHRoaXMuYmlsbC5pbml0KHRoaXMpO1xuICAgIHRoaXMubXVzaWMuaW5pdCh0aGlzKTtcblxuICAgIGNjLmRpcmVjdG9yLnByZWxvYWRTY2VuZSgncm9vbScsICgpPT4ge1xuICAgICAgdGhpcy5iaWxsLmxvYWRmaW5pc2goKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW5pdEJpbGwoKTtcblxuICAgIHRoaXMuZG9vck1hc2tBbmltYXRpb24gPSB0aGlzLmRvb3JNYXNrLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgIHRoaXMuZG9vck1hc2tBbmltYXRpb24ucGxheSgnZG9vcm1hc2tfc2hvdycpO1xuXG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLm9uZS5zaG93KCk7XG4gICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgY2FzZSBTdGF0ZS5UV086XG4gICAgICAgICAgICB0aGlzLnR3by5kaW1pc3MoKTtcbiAgICAgICAgICAgIHRoaXMuZG9vck1hc2tBbmltYXRpb24ucGxheSgnZG9vcm1hc2tfZGltaXNzJyk7XG4gICAgICAgICAgICB0aGlzLmJpbGwuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLlpFUk87XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFN0YXRlLlpFUk86XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMubm9kZS5vbignT05FJywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLk9ORTtcbiAgICAgIHRoaXMub25lLmRpbWlzcygpO1xuICAgICAgdGhpcy50d28uc2hvdygpO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLm5vZGUub24oJ1RXTycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5UV087XG4gICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdlbGVtZV9hcHBfZGlkQmVjb21lQWN0aXZlJywgZnVuY3Rpb24gKCkge1xuICAgICAgY2MuZ2FtZS5yZXN1bWUoKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdlbGVtZV9hcHBfd2lsbFJlc2lnbkFjdGl2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNjLmdhbWUucGF1c2UoKTtcbiAgICB9KTtcbiAgfSxcblxuICBpbml0QmlsbDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xuICAgIHRoaXMuYmlsbC5vcGVuQmlsbCgpO1xuICB9XG59KTtcbiIsInZhciBPcGVuRG9vciA9IHJlcXVpcmUoJ09wZW5Eb29yJyk7XG52YXIgRW5kQmcgPSByZXF1aXJlKCdFbmRCZycpO1xuXG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgZG9vckJnOiBjYy5Ob2RlLFxuICAgIG9wZW5Eb29yOiBPcGVuRG9vcixcbiAgICBkb29MaWdodDogY2MuTm9kZSxcbiAgICBlbmRCZzogRW5kQmdcbiAgfSxcblxuICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmRCZy5pbml0KCk7XG4gICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gIH0sXG5cbiAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoJ3N1bkxpZ2h0Jyk7XG4gIH0sXG4gIFxuICBtYXhMaWdodDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZG9vckJnLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMub3BlbkRvb3Iubm9kZS5hY3RpdmUgPSB0cnVlO1xuICB9LFxuICBcbiAgYW5pbUVuZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLm9wZW5Eb29yLnNob3dUZXh0KCk7XG4gICAgdGhpcy5kb29MaWdodC5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgdGhpcy5lbmRCZy5zaG93QmcoKTtcbiAgfVxuXG4gIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgLy8gfSxcbn0pO1xuIiwidmFyIEdsb2FibGUgPSByZXF1aXJlKCdHbG9hYmxlJyk7XG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgb25BbmltOiBjYy5BbmltYXRpb25DbGlwLFxuICAgIGRpQXVkaW86IGNjLkF1ZGlvQ2xpcCxcbiAgICBzYXlBdWRpbzogY2MuQXVkaW9DbGlwLFxuICAgIHNheU5vZGU6IGNjLk5vZGVcbiAgfSxcblxuICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gIH0sXG5cbiAgYW5pbUVuZDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2F5Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmFuaW1hdGlvbi5hZGRDbGlwKHRoaXMub25BbmltLCAndGFyZ2V0Jyk7XG4gIH0sXG4gIFxuICBhbmltU3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBsYXlTb3VuZCh0aGlzLmRpQXVkaW8pO1xuICB9LFxuXG4gIHNheTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2F5Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucGxheVNvdW5kKHRoaXMuc2F5QXVkaW8pO1xuICB9LFxuXG4gIC8qKlxuICAgKiDmkq3mlL7pn7PmlYgo5LiN5b6q546vKVxuICAgKi9cbiAgcGxheVNvdW5kOiBmdW5jdGlvbiAoc291bmQpIHtcbiAgICBpZihzb3VuZCAmJiBHbG9hYmxlLnNob3VsZFBsYXlBdWRpbyl7XG4gICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHNvdW5kLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAvLyB9LFxufSk7XG4iLCJjYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7fSxcblxuICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZW5kJyk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gIC8vIH0sXG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGJyZWF0aDogY2MuTm9kZSxcbiAgICAgICAgc21vazogY2MuTm9kZVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYnJlYXRoQW5pbWF0aW9uID0gdGhpcy5icmVhdGguZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuc21va0FuaW1hdGlvbiA9IHRoaXMuc21vay5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICB9LFxuXG4gICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgaWYodGhpcy5icmVhdGhBbmltYXRpb24pe1xuICAgICAgICAgICAgdGhpcy5icmVhdGhBbmltYXRpb24ucGxheSgnYnJlYXRoX3Nob3cnKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnNtb2tBbmltYXRpb24pe1xuICAgICAgICAgICAgdGhpcy5zbW9rQW5pbWF0aW9uLnBsYXkoJ3Ntb2tfc2hvdycpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRpbWlzczogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZih0aGlzLmJyZWF0aEFuaW1hdGlvbil7XG4gICAgICAgICAgICB0aGlzLmJyZWF0aEFuaW1hdGlvbi5wbGF5KCdicmVhdGhfZGltaXNzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5zbW9rQW5pbWF0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuc21va0FuaW1hdGlvbi5wbGF5KCdzbW9rX2RpbWlzcycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwidmFyIEdsb2FibGUgPSByZXF1aXJlKCdHbG9hYmxlJyk7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBjaGFuZ2VBbmltOiBjYy5BbmltYXRpb25DbGlwLFxuICAgICAgICBvcGVuQXVkaW86IGNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgY2xvc2VBdWRpbzogY2MuQXVkaW9DbGlwLFxuICAgICAgICBoaUF1ZGlvOiBjYy5BdWRpb0NsaXAsXG4gICAgICAgIHdhbmdTYXk6IGNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgc2hvdXRBdWRpbzogY2MuQXVkaW9DbGlwLFxuICAgICAgICBzYXlOb2RlOiBjYy5Ob2RlXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMubm9kZS5vbignd2FuZ19zdGFydCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd3YW5nX2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmFkZENsaXAodGhpcy5jaGFuZ2VBbmltLCAndGFyZ2V0Jyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcbiAgICBcbiAgICBvcGVuOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGxheVNvdW5kKHRoaXMub3BlbkF1ZGlvKTtcbiAgICB9LFxuICAgIFxuICAgIGNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGxheVNvdW5kKHRoaXMuY2xvc2VBdWRpbyk7XG4gICAgfSxcbiAgICBcbiAgICBzaG91dDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBsYXlTb3VuZCh0aGlzLnNob3V0QXVkaW8pO1xuICAgIH0sXG4gICAgXG4gICAgc2F5SGk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGF5U291bmQodGhpcy5oaUF1ZGlvKTtcbiAgICB9LFxuXG4gICAgc2F5U3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zYXlOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucGxheVNvdW5kKHRoaXMud2FuZ1NheSk7XG4gICAgfSxcblxuICAgIHNheUVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNheU5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOaSreaUvumfs+aViCjkuI3lvqrnjq8pXG4gICAgICovXG4gICAgcGxheVNvdW5kOiBmdW5jdGlvbiAoc291bmQpIHtcbiAgICAgICAgaWYoc291bmQgJiYgR2xvYWJsZS5zaG91bGRQbGF5QXVkaW8pe1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChzb3VuZCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcbn0pO1xuIiwidmFyIEdsb2FibGUgPSByZXF1aXJlKCdHbG9hYmxlJyk7XG5jYy5DbGFzcyh7XG4gIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgc2F5OiBjYy5Ob2RlLFxuICAgIG9wZW5BdWRpbzogY2MuQXVkaW9DbGlwLFxuICAgIGNsb3NlQXVkaW86IGNjLkF1ZGlvQ2xpcCxcbiAgICBzYXlBdWRpbzogY2MuQXVkaW9DbGlwXG4gIH0sXG5cbiAgb25TYXk6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNheS5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucGxheVNvdW5kKHRoaXMuc2F5QXVkaW8pO1xuICB9LFxuXG4gIG9uRW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zYXkuYWN0aXZlID0gZmFsc2U7XG4gIH0sXG5cbiAgb3BlbjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGxheVNvdW5kKHRoaXMub3BlbkF1ZGlvKTtcbiAgfSxcbiAgXG4gIGNsb3NlOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wbGF5U291bmQodGhpcy5jbG9zZUF1ZGlvKTtcbiAgfSxcblxuICAvKipcbiAgICog5pKt5pS+6Z+z5pWIKOS4jeW+queOrylcbiAgICovXG4gIHBsYXlTb3VuZDogZnVuY3Rpb24gKHNvdW5kKSB7XG4gICAgaWYoc291bmQgJiYgR2xvYWJsZS5zaG91bGRQbGF5QXVkaW8pe1xuICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChzb3VuZCwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgLy8gfSxcbn0pO1xuIl19