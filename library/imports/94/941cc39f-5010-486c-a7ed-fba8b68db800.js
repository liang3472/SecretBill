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