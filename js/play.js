var playState = {
    player: null,
    enemy: {
    },
  create: function() {
      var self = this;
      self.player = game.add.sprite(300, 200, "dude");
      self.player.frame = 4;
      self.player.dest = {x: self.player.x, y: self.player.y};
      game.add.existing(self.player);
      self.player.anchor.setTo(.5, 1);

      self.player.animations.add('wait', [4], 1, true);       // 秒間1回切り替え。1パターンしかないのでアニメしないけど
      self.player.animations.add('walk', [0,1,2,3], 10, true);  // 歩きアニメ
      game.physics.enable(self.player, Phaser.Physics.ARCADE);
      game.input.activePointer.capture = true;

      // 敵の追加
      self.enemy = game.add.sprite(100, 100, 'characters');
      self.enemy.frame = 544;
      game.add.existing(self.enemy);
      game.physics.enable(self.enemy, Phaser.Physics.ARCADE);
      self.enemy.anchor.setTo(.5, 1);
      self.enemy.scale.x = -1;
      self.enemy.body.immovable = true;
  },
  update: function() {
      var self = this;
      if (game.input.activePointer.isDown) {
          self.player.dest.x = game.input.x;
          self.player.dest.y = game.input.y;
      }

      game.physics.arcade.collide(self.player, self.enemy, function() {
          self.stopPlayer();
      });

      self.movePlayer();
  },
  movePlayer: function() {
      var self = this;
      // 距離が10ピクセルより小さければ静止
      if (Math.abs(self.player.x-self.player.dest.x) < 10) {
          self.player.body.velocity.x = 0;
      } else if (self.player.dest.x < self.player.x) {
          // 目的地が小さい時は左移動
          self.player.body.velocity.x = -80;
          // パターンを反転
          self.player.scale.x = 1;
      } else {
          // 目的地が大きい時は右移動
          self.player.body.velocity.x = 80;
          // パターンを正方向
          self.player.scale.x = -1;
      }

      // 距離が10ピクセルより小さければ静止
      if (Math.abs(self.player.y-self.player.dest.y)<10) {
          self.player.body.velocity.y = 0;
      } else if (self.player.dest.y < self.player.y) {
          // 目的地が小さい時は上移動
          self.player.body.velocity.y = -80;
      } else {
          // 目的地が大きい時は下移動
          self.player.body.velocity.y = 80;
      }

      // 速度が0ならアニメを停止
      if (self.player.body.velocity.getMagnitude() == 0) {
          self.player.animations.play('wait');
      }
      else {
          self.player.animations.play('walk');
      }
  },
  stopPlayer: function() {
      var self = this;
      self.player.dest.x = self.player.x;
      self.player.dest.y = self.player.y;
      self.player.body.velocity.x = self.player.body.velocity.y = 0;
  }
};
