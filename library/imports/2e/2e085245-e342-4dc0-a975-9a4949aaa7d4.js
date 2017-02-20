cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.on('touchend', (function () {
            if (this.callback) {
                this.callback();
            }
            this.node.removeFromParent();
        }).bind(this));
    },

    setCallBack: function setCallBack(callback) {
        this.callback = callback;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});