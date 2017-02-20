cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    init: function init() {
        this.animation = this.node.getComponent(cc.Animation);
    },

    show: function show() {
        if (this.animation) {
            this.animation.play('doortext_show');
        }
    },

    dimiss: function dimiss() {
        if (this.animation) {
            this.animation.play('doortext_dimiss');
        }
    },

    onDimiss: function onDimiss() {
        this.node.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});