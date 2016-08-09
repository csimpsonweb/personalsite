var menuState = {
    create: function() {

        //Load the background image
        this.background = game.add.sprite(0, 0, 'loadscreen');
        this.background.anchor.x = 0;
        this.background.anchor.y = 0;

        // How to start the game
        var playLabel = game.add.text(game.world.centerX, 280, 'Play Game', { font: '30px Arial', fill: '#ffffff' });
        playLabel.anchor.setTo(0.5, 0.5);
        playLabel.inputEnabled = true;
        playLabel.events.onInputDown.add(this.start, this);
        // Add a mute button
        this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound,
            this);
        this.muteButton.input.useHandCursor = true;
        if (game.sound.mute) {
            this.muteButton.frame = 1;
        }
        // Start the game when the up arrow key is pressed
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.addOnce(this.start, this);

        if(true){
        this.menuMusic = game.add.audio('menuMusic',1,false);
        this.menuMusic.play();
        }
    },

    toggleSound: function() {
        game.sound.mute = !game.sound.mute;
        this.muteButton.frame = game.sound.mute ? 1 : 0;
    },
    start: function() {
        this.menuMusic.stop();
        game.state.start('play');
    }
};