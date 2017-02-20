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