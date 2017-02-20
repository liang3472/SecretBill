var Gloable = require('Gloable');
cc.Class({
  extends: cc.Component,

  properties: {
    say: cc.Node,
    openAudio: cc.AudioClip,
    closeAudio: cc.AudioClip,
    sayAudio: cc.AudioClip
  },

  onSay: function () {
    this.say.active = true;
    this.playSound(this.sayAudio);
  },

  onEnd: function () {
    this.say.active = false;
  },

  open: function () {
    this.playSound(this.openAudio);
  },
  
  close: function () {
    this.playSound(this.closeAudio);
  },

  /**
   * 播放音效(不循环)
   */
  playSound: function (sound) {
    if(sound && Gloable.shouldPlayAudio){
      cc.audioEngine.playEffect(sound, false);
    }
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});
