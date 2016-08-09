EPT.Game = function(game) {};
EPT.Game.prototype = {
	create: function() {
		this._score = 0;
		this._time = 10;
		this.gamePaused = false;
		this.runOnce = false;
/*
		var fontGameplay = { font: "32px Arial", fill: "#000" };
		var textGameplay = this.add.text(100, 75, 'Gameplay screen', fontGameplay);

		var buttonDummy = this.add.button(this.world.width*0.5, this.world.height*0.5, 'clickme', this.addPoints, this);
		buttonDummy.anchor.set(0.5,0.5);
		buttonDummy.alpha = 0;
		buttonDummy.scale.set(0.1);
		this.add.tween(buttonDummy).to({alpha: 1}, 1000, Phaser.Easing.Exponential.Out, true);
		this.add.tween(buttonDummy.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Exponential.Out, true);

		this.currentTimer = game.time.create();
		this.currentTimer.loop(Phaser.Timer.SECOND, function() {
			this._time--;
			if(this._time) {
				this.textTime.setText('Time left: '+this._time);
			}
			else {
				this.stateStatus = 'gameover';
			}
		}, this);
*/
		//this.currentTimer.start();


		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.chopper = game.add.sprite(300,300,"chopper");
		this.chopper.anchor.x = 0.5;
		this.chopper.anchor.y = 0.5;

		game.physics.arcade.enable(this.chopper);
	    this.chopper.body.gravity.y = 1000;  


		this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.spaceKey.onDown.add(this.jump, this); 

		this.game.load.image('pipe', 'assets/pipe.png');

		this.pipes = game.add.group(); // Create a group
		this.pipes.enableBody = true;  // Add physics to the group
		this.pipes.createMultiple(20, 'pipe'); // Create 20 pipes

		this.timer = game.time.events.loop(1500, 
    	this.addRowOfPipes, this); 

		this.initUI();
	},
	addOnePipe: function(x, y) {
    // Get the first dead pipe of our group
    this.pipe = this.pipes.getFirstDead();

    // Set the new position of the pipe
    this.pipe.reset(x, y);

    // Add velocity to the pipe to make it move left
    this.pipe.body.velocity.x = -200; 

    // Kill the pipe when it's no longer visible 
    this.pipe.checkWorldBounds = true;
    this.pipe.outOfBoundsKill = true;
	},
	addRowOfPipes: function() {
    // Pick where the hole will be
    this.hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes 
    for (var i = 0; i < 8; i++)
        if (i != this.hole && i != this.hole + 1) 
            this.addOnePipe(800, i * 60 + 20);   
	},
	jump: function() {
    // Add a vertical velocity to the bird
    this.chopper.body.velocity.y = -350;
	},
	initUI: function() {
		this.buttonPause = this.add.button(this.world.width-20, 20, 'button-pause', this.managePause, this, 1, 0, 2);
		this.buttonPause.anchor.set(1,0);

		var fontScore = { font: "32px Arial", fill: "#000" };
		var fontScoreWhite =  { font: "32px Arial", fill: "#FFF" };
		//this.textScore = this.add.text(30, this.world.height-20, 'Score: '+this._score, fontScore);
		//this.textScore.anchor.set(0,1);

		//this.textTime = this.add.text(this.world.width-30, this.world.height-20, 'Time left: '+this._time, fontScore);
		//this.textTime.anchor.set(1,1);

		this.buttonPause.y = -this.buttonPause.height-20;
		this.add.tween(this.buttonPause).to({y: 20}, 1000, Phaser.Easing.Exponential.Out, true);

		var fontTitle = { font: "48px Arial", fill: "#000", stroke: "#FFF", strokeThickness: 10 };

		this.screenPausedGroup = this.add.group();
		this.screenPausedBg = this.add.sprite(0, 0, 'overlay');
		this.screenPausedText = this.add.text(this.world.width*0.5, 100, 'Paused', fontTitle);
		this.screenPausedText.anchor.set(0.5,0);
		this.buttonAudio = this.add.button(this.world.width-20, 20, 'button-audio', this.clickAudio, this, 1, 0, 2);
		this.buttonAudio.anchor.set(1,0);
		this.screenPausedBack = this.add.button(150, this.world.height-100, 'button-mainmenu', this.stateBack, this, 1, 0, 2);
		this.screenPausedBack.anchor.set(0,1);
		this.screenPausedContinue = this.add.button(this.world.width-150, this.world.height-100, 'button-continue', this.managePause, this, 1, 0, 2);
		this.screenPausedContinue.anchor.set(1,1);
		this.screenPausedGroup.add(this.screenPausedBg);
		this.screenPausedGroup.add(this.screenPausedText);
		this.screenPausedGroup.add(this.buttonAudio);
		this.screenPausedGroup.add(this.screenPausedBack);
		this.screenPausedGroup.add(this.screenPausedContinue);
		this.screenPausedGroup.visible = false;

		this.buttonAudio.setFrames(EPT._audioOffset+1, EPT._audioOffset+0, EPT._audioOffset+2);

		this.screenGameoverGroup = this.add.group();
		this.screenGameoverBg = this.add.sprite(0, 0, 'overlay');
		this.screenGameoverText = this.add.text(this.world.width*0.5, 100, 'Game over', fontTitle);
		this.screenGameoverText.anchor.set(0.5,0);
		this.screenGameoverBack = this.add.button(150, this.world.height-100, 'button-mainmenu', this.stateBack, this, 1, 0, 2);
		this.screenGameoverBack.anchor.set(0,1);
		this.screenGameoverRestart = this.add.button(this.world.width-150, this.world.height-100, 'button-restart', this.stateRestart, this, 1, 0, 2);
		this.screenGameoverRestart.anchor.set(1,1);
		this.screenGameoverScore = this.add.text(this.world.width*0.5, 300, 'Score: '+this._score, fontScoreWhite);
		this.screenGameoverScore.anchor.set(0.5,0.5);
		this.screenGameoverGroup.add(this.screenGameoverBg);
		this.screenGameoverGroup.add(this.screenGameoverText);
		this.screenGameoverGroup.add(this.screenGameoverBack);
		this.screenGameoverGroup.add(this.screenGameoverRestart);
		this.screenGameoverGroup.add(this.screenGameoverScore);
		this.screenGameoverGroup.visible = false;
	},
	update: function() {
		switch(this.stateStatus) {
			case 'paused': {
				if(!this.runOnce) {
					this.statePaused();
					this.runOnce = true;
				}
				break;
			}
			case 'gameover': {
				if(!this.runOnce) {
					this.stateGameover();
					this.runOnce = true;
				}
				break;
			}
			case 'playing': {
				this.statePlaying();
			}
			default: {
			}
		}
		if (this.chopper.inWorld == false)
        this.restartGame();
	},
	restartGame: function() {
   		// Start the 'main' state, which restarts the game
	    this.state.start('MainMenu');
	},
	managePause: function() {
		this.gamePaused =! this.gamePaused;
		if(EPT._audioStatus) {
			EPT._soundClick.play();
		}
		if(this.gamePaused) {
			this.stateStatus = 'paused';
		}
		else {
			this.stateStatus = 'playing';
			this.runOnce = false;
		}
	},
	statePlaying: function() {
		this.screenPausedGroup.visible = false;
		//this.currentTimer.resume();
	},
	statePaused: function() {
		this.screenPausedGroup.visible = true;
		//this.currentTimer.pause();
	},
	stateGameover: function() {
		this.screenGameoverGroup.visible = true;
		//this.currentTimer.stop();
		this.screenGameoverScore.setText('Score: '+this._score);
		storageAPI.setHighscore('EPT-highscore',this._score);
	},
	addPoints: function() {
		this._score += 10;
		this.textScore.setText('Score: '+this._score);
		var randX = this.rnd.integerInRange(200,this.world.width-200);
		var randY = this.rnd.integerInRange(200,this.world.height-200);
		var pointsAdded = this.add.text(randX, randY, '+10',
			{ font: "48px Arial", fill: "#000", stroke: "#FFF", strokeThickness: 10 });
		pointsAdded.anchor.set(0.5, 0.5);
		this.add.tween(pointsAdded).to({ alpha: 0, y: randY-50 }, 1000, Phaser.Easing.Linear.None, true);
	},
	clickAudio: function() {
		if(!EPT._audioStatus) {
			EPT._soundClick.play();
		}
		EPT._manageAudio('switch',this);
	},
	stateRestart: function() {
		if(EPT._audioStatus) {
			EPT._soundClick.play();
		}
		this.screenGameoverGroup.visible = false;
		this.gamePaused = false;
		this.runOnce = false;
		//this.currentTimer.start();
		this.stateStatus = 'playing';
		this.state.restart(true);
	},
	stateBack: function() {
		if(EPT._audioStatus) {
			EPT._soundClick.play();
		}
		this.screenGameoverGroup.visible = false;
		this.gamePaused = false;
		this.runOnce = false;
		//this.currentTimer.start();
		this.stateStatus = 'playing';
		// this.state.restart(true);
		this.state.start('MainMenu');
	}
};