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
  extends: cc.Component,

  properties: {
    one: One,
    two: Two,
    doorMask: cc.Node,
    bill: Bill,
    soundMng: SoundManager,
    music: Music
  },

  onLoad: function () {
    this.state = State.ZERO;
    this.isLoaded = false;
    this.one.init();
    this.two.init();
    this.bill.init(this);
    this.music.init(this);

    cc.director.preloadScene('room', ()=> {
      this.bill.loadfinish();
    });

    this.initBill();

    this.doorMaskAnimation = this.doorMask.getComponent(cc.Animation);
    this.doorMaskAnimation.play('doormask_show');

    this.isRunning = false;
    this.one.show();
    this.node.on('touchend', function () {
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
    }.bind(this));

    this.node.on('ONE', function () {
      this.state = State.ONE;
      this.one.dimiss();
      this.two.show();
    }.bind(this));

    this.node.on('TWO', function () {
      this.state = State.TWO;
      this.isRunning = false;
    }.bind(this));

    document.addEventListener('eleme_app_didBecomeActive', function () {
      cc.game.resume();
    });
    document.addEventListener('eleme_app_willResignActive', function () {
      cc.game.pause();
    });
  },

  initBill: function () {
    this.isLoaded = true;
    this.bill.openBill();
  }
});
