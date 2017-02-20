var SoundManager = require('SoundManager');
var DoorLight = require('DoorLight');
var Music = require('Music');

cc.Class({
    'extends': cc.Component,

    properties: {
        soundMng: SoundManager,
        doorLight: DoorLight,
        music: Music
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.music.init(this);
        this.doorLight.init(this);

        document.addEventListener('eleme_app_didBecomeActive', function () {
            cc.game.resume();
        });
        document.addEventListener('eleme_app_willResignActive', function () {
            cc.game.pause();
        });
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },