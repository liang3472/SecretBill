cc.Class({
  extends: cc.Component,

  properties: {
    billPre: cc.Prefab,
    dialogLayer: cc.Node
  },

  // use this for initialization
  init: function (game) {
    this.isDataOver = false;
    this.game = game;
    this.animation = this.node.getComponent(cc.Animation);

    this.isOpen = false;
    this.pointCount = 0;
    this.node.on('touchstart', function () {
      this.isOpen = true;
      this.openBill();
    }.bind(this));
  },

  changeLoadingText: function () {
    if (this.pointCount > 3) {
      this.loading.string = this.loading.string.split('.')[0];
      this.pointCount = 0;
    } else {
      this.loading.string += '.';
      this.pointCount += 1;
    }
  },

  openBill: function () {
    if (this.isOpen) {
      this.game.soundMng.playPickBill();
      this.showBillInfo();
      this.node.active = false;
      this.node.removeFromParent();
    }
  },

  showBillInfo: function () {
    this.billList = cc.instantiate(this.billPre);
    this.dialogLayer.addChild(this.billList);
    if (this.isDataOver) {
      var billInfoCom = this.billList.getComponent('BillInfo');
      billInfoCom.loadfinish();
    }
  },

  show: function () {
    if (this.animation) {
      this.animation.play('bill');
    }
  },

  loadfinish: function () {
    this.isDataOver = true;
    if (this.billList) {
      var billInfoCom = this.billList.getComponent('BillInfo');
      billInfoCom.loadfinish();
    }
  }

});
