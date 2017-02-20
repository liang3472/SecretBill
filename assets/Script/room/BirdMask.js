var Gloable = require('Gloable');
cc.Class({
    extends: cc.Component,

    properties: {
        bird: cc.Node,
        birdAnim: cc.AnimationClip,
        audio: cc.AudioClip
    },

    // use this for initialization
    onLoad: function () {
        this.animation = this.bird.getComponent(cc.Animation);
        this.animation.addClip(this.birdAnim, 'target');
    },
    
    show: function () {
        this.node.active = true;
        this.animation.play('target');
        this.playSound(this.audio);
    },

    dimiss: function () {
        this.node.active = false;
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
