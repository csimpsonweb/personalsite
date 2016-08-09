var endState = {

	create: function() { 

		this.background = game.add.sprite(0, 0, 'endscreen');
		this.background.anchor.x = 0;
		this.background.anchor.y = 0;

		// Name of the game
		var nameLabel = game.add.text(game.world.centerX, 80, 'Your Awesome', { font: '50px Arial', fill: '#ffffff' });
		nameLabel.anchor.setTo(0.5, 0.5);


		// Start the game when the up arrow key is pressed
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		upKey.onDown.addOnce(this.start, this);
	},

	start: function() {
		game.state.start('menu');	
	}
};