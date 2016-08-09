var game;

game = new Phaser.Game(600, 450, Phaser.AUTO, '');

game.state.add('Menu', Menu);

// Adding the Game state.
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

game.state.start('Menu');