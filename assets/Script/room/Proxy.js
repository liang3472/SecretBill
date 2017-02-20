var Gloable = require('Gloable');
cc.Class({
  extends: cc.Component,

  properties: {
    targetAnim: cc.AnimationClip, // 该节点上的动画
    proxyNode: cc.Node,
    isReplay: true,
    audio: cc.AudioClip
  },

  // use this for initialization
  onLoad: function () {
    if(this.proxyNode || this.targetAnim){
      this.isTouched = false;
      this.isActive = this.proxyNode.active;
      this.animation = this.proxyNode.getComponent(cc.Animation);
      this.animation.addClip(this.targetAnim, 'target');
      this.node.on('touchend', this.onTouch, this);
    }
  },

  onTouch: function () {
    if (this.isReplay || !this.isTouched) {
      this.startAnim();
      this.isTouched = true;
      this.playSound(this.audio);
    }
  },

  startAnim: function () {
    if (!this.isActive) {
      this.proxyNode.active = true;
    }
    this.animation.play('target');
    cc.log(this.proxyNode.name + '_start send');
    this.proxyNode.dispatchEvent(new cc.Event.EventCustom(this.proxyNode.name + '_start', true));
  },

  onDisable: function () {
    this.proxyNode.off('touchend', this.onTouch);
  },

  animEnd: function () {
    if (!this.isActive) {
      this.proxyNode.active = false;
    }
    cc.log(this.proxyNode.name + '_end send');
    this.proxyNode.dispatchEvent(new cc.Event.EventCustom(this.node.name + '_end', true));
  },

  getTargetNode:function () {
    return this.proxyNode;
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
