var GameStates = GameStates || {};

GameStates.EndGame = function (game) {

};

GameStates.EndGame.prototype = {
    create: function () {

        var loadscreen = this.add.sprite(0,0, 'gameoverscreen');

        this.buttnbck = this.add.sprite(270, 230, 'play');
        this.buttnbck.scale.setTo(0.4, 0.4);
        this.buttnbck.inputEnabled = true;
        this.buttnbck.events.onInputDown.add(this.restart, this);
    },

    restart: function() {

        this.game.state.start('Game');
    }
};