GameStates.LevelSelect = function(game) {};
GameStates.LevelSelect.prototype = {
	create: function(){
		
		var storyboard = this.add.sprite(0, 0, 'storyboard');

        this.buttnplay = this.add.sprite(this.world.width-100, this.world.height-80, 'play');
        this.buttnplay.scale.setTo(0.4, 0.4);
        this.buttnplay.inputEnabled = true;
        this.buttnplay.events.onInputDown.add(this.play, this);
		
	},
	play: function() {
		this.game.state.start('Game');
	},
};
