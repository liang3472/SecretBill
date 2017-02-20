var Option = require('Option');

cc.Class({
    extends: cc.Component,

    properties: {
        option: Option,
    },

    // use this for initialization
    init: function () {
        this.option.init();
        this.animation = this.node.getComponent(cc.Animation);
    },

    showBg: function () {
        this.node.active = true;
        this.animation.play('endBg');
    },

    showOption: function () {
        this.option.showOption();
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
