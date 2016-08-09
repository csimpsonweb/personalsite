var Game_Over = {

    preload : function() {
        // Load the needed image for this game screen.
        game.load.image('gameover', './assets/images/gameover.png');

        game.load.audio('waaa', './assets/sfx/waaa.mp3');
    },

    create : function() {

        // Create button to start game like in Menu.
        this.add.button(0, 0, 'gameover', this.startGame, this);
        this.music = game.add.audio('waaa');

        // Add text with information about the score from last game.
        game.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#000", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });

        this.music.play();
    },

    startGame: function () {

        // Change the state back to Game.
        this.state.start('Menu');

    }

};