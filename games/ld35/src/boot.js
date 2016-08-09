var GameStates = GameStates || {};
// Boot will take care of initializing a few settings,

// HIGHSCORE & AUDIO API - refernece to Enclave phaser Template
// declare the object that will hold all game states
var GameStates = {
    //quite common to add game variables/constants in here
    _manageAudio: function(mode, game) {
    if(mode == 'init') {
        storageAPI.initUnset('GameStates-audio', true);
        GameStates._audioStatus = storageAPI.get('GameStates-audio');
        GameStates._soundClick = game.add.audio('audio-click');
        // GameStates._soundMusic = game.add.audio('audio-theme',1,true);
    }
    else if(mode == 'switch') {
        GameStates._audioStatus =! GameStates._audioStatus;
        storageAPI.set('GameStates-audio',GameStates._audioStatus);
    }
    // GameStates._audioOffset = (GameStates._audioStatus) ? 0 : 4;
    if(GameStates._audioStatus) {
        GameStates._audioOffset = 0;
        // GameStates._soundMusic.play('',0,1,true);
    }
    else {
        GameStates._audioOffset = 4;
        // GameStates._soundMusic.stop();
    }
    game.buttonAudio.setFrames(GameStates._audioOffset+1, GameStates._audioOffset+0, GameStates._audioOffset+2);
}
};

GameStates.Boot = function (game) {  //declare the boot state

};

GameStates.Boot.prototype = {
    preload: function () {
        // load assets to be used later in the preloader e.g. for loading screen / splashscreen
        this.load.image('preloaderBar', 'assets/preloader-bar.png');
    },
    create: function () {
        // setup game environment
        // scale, input etc..
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // call next state
        this.state.start('Preloader');
    }
};

