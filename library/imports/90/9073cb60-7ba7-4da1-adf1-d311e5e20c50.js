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