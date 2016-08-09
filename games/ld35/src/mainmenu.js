var GameStates = GameStates || {};

GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {
    create: function () {

        var loadscreen = this.add.sprite(0,0, 'loadscreen');

        storageAPI.initUnset('GameStates-highscore', 0);
        var highscore = storageAPI.get('GameStates-highscore') || 0;

        var buttonStart = this.add.button(this.world.width-20, this.world.height-20, 'play', this.clickStart, this, 1, 0, 2);
        buttonStart.anchor.set(1);
        buttonStart.scale.setTo(0.5, 0.5);

        buttonStart.x = this.world.width+buttonStart.width+20;
        this.add.tween(buttonStart).to({x: this.world.width-20}, 500, Phaser.Easing.Exponential.Out, true);


    },
    clickStart: function() {
        if(GameStates._audioStatus) {
            GameStates._soundClick.play();
        }
        this.game.state.start('LevelSelect');
    }
};