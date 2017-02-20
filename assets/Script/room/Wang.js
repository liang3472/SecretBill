var Gloable = require('Gloable');
cc.Class({
    extends: cc.Component,

    properties: {
        changeAnim: cc.AnimationClip,
        openAudio: cc.AudioClip,
        closeAudio: cc.AudioClip,
        hiAudio: cc.AudioClip,
        wangSay: cc.AudioClip,
        shoutAudio: cc.AudioClip,
        sayNode: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this.count = 0;
        this.animation = this.node.getComponent(cc.Animation);
        this.node.on('wang_start', function () {
        }.bind(this));
        this.node.on('wang_end', function () {
            this.animation.addClip(this.changeAnim, 'target');
        }.bind(this));
    },
    
    open: function () {
        this.playSound(this.openAudio);
    },
    
    close: function () {
        this.playSound(this.closeAudio);
    },
    
    shout: function () {
        this.playSound(this.shoutAudio);
    },
    
    sayHi: function () {
        this.playSound(this.hiAudio);
    },

    sayStart: function () {
        this.sayNode.active = true;
        this.playSound(this.wangSay);
    },

    sayEnd: function () {
        this.sayNode.active = false;
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
