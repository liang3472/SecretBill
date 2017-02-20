var Gloable = require('Gloable');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {

    },
    
    toEleme: function () {
        location.href = decodeURIComponent(Gloable.CONFiG.goUrl);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
