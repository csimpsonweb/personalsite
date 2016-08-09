window.onload = function () {

    //var game = new Phaser.Game(960, 640, Phaser.AUTO, '');
	var game = new Phaser.Game(600, 400, Phaser.CANVAS);

    //  Add the States your game has.
    game.state.add('Boot', GameStates.Boot);
    game.state.add('Preloader', GameStates.Preloader);
    game.state.add('MainMenu', GameStates.MainMenu);
    game.state.add('LevelSelect', GameStates.LevelSelect);
    game.state.add('Achievements', GameStates.Achievements);
    game.state.add('Game', GameStates.Game);
    game.state.add('EndGame', GameStates.EndGame);
    game.state.add('NoPotion', GameStates.NoPotion);
    game.state.add('GameOver', GameStates.GameOver);
    game.state.add('TimeOver', GameStates.TimeOver);

    //  Now start the Boot state.
    game.state.start('Boot');

};
