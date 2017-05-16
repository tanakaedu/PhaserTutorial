var playState = {
    player: null,
  create: function() {
      var self = this;
      self.player = game.add.sprite(300, 200, "characters");
      self.player.frame = 4;
      game.add.existing(self.player);
      self.player.anchor.setTo(.5, 1);

      self.player.animations.add('wait', [4], 1, true);       // 秒間1回切り替え。1パターンしかないのでアニメしないけど
      game.physics.enable(self.player, Phaser.Physics.ARCADE);
      game.input.activePointer.capture = true;

  },
  update: function() {
      var self = this;
      if (game.input.activePointer.isDown) {
          if (game.input.x < self.player.x) {
              self.player.body.velocity.x -= 10;
          } else if (game.input.x > self.player.x) {
              self.player.body.velocity.x += 10;
          }
      }
  }
};
