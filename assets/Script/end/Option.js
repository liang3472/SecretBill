cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    init: function () {
        this.animation = this.node.getComponent(cc.Animation);
    },

    showOption: function () {
        this.node.active = true;
        this.animation.play('option');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
