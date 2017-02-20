var SunLight = require('SunLight');

cc.Class({
    extends: cc.Component,

    properties: {
        sunLight: SunLight,
    },

    // use this for initialization
    init: function (game) {
        this.game = game;
        this.state = false;

        this.node.on('touchstart', function () {
            this.game.soundMng.psuseDoorLight();
            this.sunLight.show();
        }.bind(this));
    },
    
    animStart: function () {
        if(!this.state){
            this.game.soundMng.playDoorLight();
            this.state = true;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
