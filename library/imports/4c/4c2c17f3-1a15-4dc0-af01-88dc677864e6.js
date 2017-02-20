cc.Class({
    'extends': cc.Component,

    properties: {
        text1: cc.Node,
        text2: cc.Node
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.text1Anim = this.text1.getComponent(cc.Animation);
        this.text2Anim = this.text2.getComponent(cc.Animation);
    },

    showText: function showText() {
        this.text1Anim.play('text1');
        this.text2Anim.play('text2');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});