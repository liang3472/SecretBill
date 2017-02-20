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