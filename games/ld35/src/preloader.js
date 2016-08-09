var GameStates = GameStates || {};
// Preloader will load all of the assets like graphics and audio
GameStates.Preloader = function (game) {
    this.preloadBar = null;

}

GameStates.Preloader.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);

        // load all game assets
        this.load.image('loadscreen', 'assets/img/loadscreen.png');
        this.load.image('timescreen', 'assets/img/timescreen.png');
        this.load.image('congratsscreen', 'assets/img/congratsscreen.png');
        this.load.image('nopotion', 'assets/img/nopotion.png');
        this.load.image('gameoverscreen', 'assets/img/gameoverscreen.png');
        this.load.image('storyboard', 'assets/img/storyboard.png');
        this.load.image('overlay', 'assets/img/overlay.png');
        this.load.image('player', 'assets/img/pixeldude.png');
        this.load.image('coin', 'assets/img/coin.png');
        this.load.image('emerald', 'assets/img/emerald.png');
        this.load.image('potion', 'assets/img/poision.png');
        this.load.image('door', 'assets/img/door.png');
        this.load.image('badguy1', 'assets/img/badguy1.png');
        this.load.image('play', 'assets/img/play.png');
        this.load.image('wizard', 'assets/img/wizard.png');

        // loading in the tiled assets
        this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'assets/img/tiles.png');

        // audio
        this.load.audio('audio-hit','assets/sfx/hit.mp3');
        this.load.audio('audio-jump','assets/sfx/jump.mp3');
        this.load.audio('audio-time','assets/sfx/time.mp3');
        this.load.audio('audio-enemy','assets/sfx/enemycontact.mp3');

    },

    create: function () {
        //call next state
        this.state.start('MainMenu');
    }
};