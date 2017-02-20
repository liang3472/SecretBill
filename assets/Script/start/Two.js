cc.Class({
    extends: cc.Component,

    properties: {
        breath: cc.Node,
        smok: cc.Node
    },

    // use this for initialization
    init: function () {
        this.breathAnimation = this.breath.getComponent(cc.Animation);
        this.smokAnimation = this.smok.getComponent(cc.Animation);
    },

    show: function () {
        this.node.active = true;
        if(this.breathAnimation){
            this.breathAnimation.play('breath_show');
        }
        if(this.smokAnimation){
            this.smokAnimation.play('smok_show');
        }
    },

    dimiss: function () {
        if(this.breathAnimation){
            this.breathAnimation.play('breath_dimiss');
        }
        if(this.smokAnimation){
            this.smokAnimation.play('smok_dimiss');
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
