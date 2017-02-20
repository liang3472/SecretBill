var Gloable = require('Gloable');
cc.Class({
  extends: cc.Component,

  properties: {
    bgmAudio: cc.AudioClip,
    pickBill: cc.AudioClip,
    findKey: cc.AudioClip,
    doorLight: cc.AudioClip,
    knock: cc.AudioClip,
    isLoop: true
  },

  playKnock: function () {
    this.playSound(this.knock);
  },

  playFindKey: function () {
    this.playSound(this.findKey);
  },

  playPickBill: function () {
    this.playSound(this.pickBill);
  },

  playDoorLight: function () {
    this.doorLightAudio = this.playSound(this.doorLight);
  },

  psuseDoorLight: function () {
    cc.audioEngine.pause(this.doorLightAudio);
  },

  /**
   * 播放音效(不循环)
   */
  playSound: function (sound) {
    if (sound && Gloable.shouldPlayAudio) {
      var id = cc.audioEngine.playEffect(sound, false);
      return id;
    }
    return null;
  },

  /**
   * 播放音效(不循环)
   */
  playBGMSound: function () {
    this.bgmId = cc.audioEngine.playEffect(this.bgmAudio, this.isLoop);
  },

  pauseBGMSound: function () {
    cc.audioEngine.pause(this.bgmId);
  }
});
