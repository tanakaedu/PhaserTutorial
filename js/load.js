//load.js
var loadState={
	preload: function(){
		game.load.baseURL = 'http://examples.phaser.io/assets/';
		game.load.crossOrigin = 'anonymous';


		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizonally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		/**** Load graphics assets ****/
		game.load.spritesheet('characters', 'games/starstruck/dude.png', 32, 48);
		/**** Load audio assets ****/

 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
