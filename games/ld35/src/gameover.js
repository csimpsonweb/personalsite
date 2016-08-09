var GameStates = GameStates || {};

GameStates.GameOver = function (game) {

};

GameStates.GameOver.prototype = {
    create: function () {

        var loadscreen = this.add.sprite(0,0, 'congratsscreen');

        this.buttnbck = this.add.sprite(270, 230, 'play');
        this.buttnbck.scale.setTo(0.2, 0.2);
        this.buttnbck.inputEnabled = true;
        this.buttnbck.events.onInputDown.add(this.restart, this);
    },

    restart: function() {

        this.game.state.start('MainMenu');
        window.location.reload();
    }
};