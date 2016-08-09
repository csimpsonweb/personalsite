var menuState = {

	create: function() { 

		this.background = game.add.sprite(0, 0, 'loadscreen');
		this.background.anchor.x = 0;
		this.background.anchor.y = 0;

		// Name of the game
		var nameLabel = game.add.text(game.world.centerX, 80, 'Astro Lander', { font: '50px Arial', fill: '#ffffff' });
		nameLabel.anchor.setTo(0.5, 0.5);

		// How to start the game
		var startLabel = game.add.text(game.world.centerX, game.world.height-80, 'press the up arrow key to start', { font: '25px Arial', fill: '#ffffff' });
		startLabel.anchor.setTo(0.5, 0.5);	
		//game.add.tween(startLabel).to({angle: -2}, 500).to({angle:2}, 500).loop().start(); 

		// Add a mute button
		//this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
		//this.muteButton.input.useHandCursor = true;
		//if (!game.global.sound) {
		//	this.muteButton.frame = 1;
		//}

		// Start the game when the up arrow key is pressed
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.addOnce(this.start, this);
	},

	toggleSound: function() {
		game.global.sound = ! game.global.sound;
		this.muteButton.frame = game.global.sound ? 0 : 1;		
	},

	start: function() {
		game.state.start('play');	
	}
};