cc.Class({
  'extends': cc.Component,

  properties: {},

  // use this for initialization
  onLoad: function onLoad() {
    this.node.on('touchend', function () {
      cc.director.loadScene('end');
    });
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});