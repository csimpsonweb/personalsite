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
		// ...
		game.load.image('player', 'assets/blaster_spaceship.png');
		game.load.image('starfield', 'assets/starfield.png', 700,900);
		game.load.image('bullet', 'assets/bullet.png');
		game.load.image('bullet', 'assets/bullet.png');
		game.load.image('enemyBullet', 'assets/enemy-bullet.png');
		game.load.image('enemy', 'assets/enemy.png');
		game.load.image('enemyship', 'assets/enemyship.png');
		game.load.image('boss', 'assets/boss.png');
		game.load.image('powerup', 'assets/powerup.png');
		game.load.spritesheet('explosion', 'assets/explosion.png', 32, 32);
		game.load.image('loadscreen', 'assets/loadscreen.png');
		// Audio
		game.load.audio('playerFire','assets/audio/soundEffects/gun.wav', true);
		game.load.audio('explosion', ['assets/audio/explosion.wav']);
		game.load.audio('powerUp', ['assets/audio/powerup.wav']);
		game.load.audio('playerExplosion', ['assets/audio/player-explosion.wav']);
		game.load.audio('enemyFire', ['assets/audio/enemy-fire.wav']);
		game.load.audio('gameMusic',['assets/audio/gameMusic.wav']);
		game.load.audio('menuMusic',['assets/audio/menuMusic.wav']);
	},


	create: function() { 
		game.state.start('menu');
	}
};