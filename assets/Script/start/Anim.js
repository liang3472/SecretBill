cc.Class({
    extends: cc.Component,

    properties: {
        animName: ''
    },

    animEnd: function () {
        this.node.dispatchEvent(new cc.Event.EventCustom(this.animName, true));
    }

});
