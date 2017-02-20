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