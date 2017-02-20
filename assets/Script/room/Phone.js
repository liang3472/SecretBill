var Gloable = require('Gloable');

cc.Class({
    extends: cc.Component,

    properties: {
        phoneCallAnim: cc.AnimationClip,
        audio: cc.AudioClip,
    },

    // use this for initialization
    onLoad: function () {

    },

    playEndAnim: function () {
        var animation = this.node.getComponent(cc.Animation);
        animation.addClip(this.phoneCallAnim, 'target');
        animation.play('target');
        this.playSound(this.audio);
    },

    gameAnimEnd: function () {
        this.node.dispatchEvent(new cc.Event.EventCustom('GameAnimEnd', true));
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
