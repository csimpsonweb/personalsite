// Initialize Phaser
var game = new Phaser.Game(700, 900, Phaser.AUTO, 'gameDiv');

// Our 'global' variable
game.global = {
	score: 0,
	// Add other global variables
	bullets: true,
	fireRate: 100,
	nextFire: 0,
	enemy: true,
	enemyKill: true,
	ship: true,
};

// Define states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

// Start the "boot" state
game.state.start('boot');