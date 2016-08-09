var loadState = {

	preload: function () {		
		// Add a loading label 
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Add a progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		// Load all assets
		game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
		game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);
		game.load.spritesheet('ship', 'assets/ship.png', 50, 50);
		game.load.image('loadscreen', 'assets/space-sunrise.png', 700, 500);
		game.load.image('endscreen', 'assets/endScreen.png', 700, 500);
		game.load.image('background', 'assets/background.png', 700, 500);
		game.load.image('ground', 'assets/ground.png', 50, 50);
	},

	create: function() { 
		game.state.start('menu');
	}
};