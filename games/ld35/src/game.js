var GameStates = GameStates || {};
//title screen
GameStates.Game = function() {};
GameStates.Game.prototype = {
    create: function() {
        this._score = 0;
        this._time = 60;
        this.gamePaused = false;
        this.runOnce = false;
        this.potionCollected = false;
        this.potionCount = 0;

        this.map = this.game.add.tilemap('level1');
        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('tiles', 'gameTiles');
        //create layer
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');
        //collision on blockedLayer
        this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();
        this.createItems();
        this.createEmeralds();
        this.createPotion();
        this.createFinish();

        //create player
        this.result = this.findObjectsByType('playerStart', this.map, 'player');
        this.player = this.add.sprite(this.result[0].x, this.result[0].y, 'player');
        this.game.physics.arcade.enable(this.player);

        this.badguyresult = this.findObjectsByType('enemyStart', this.map, 'enemy');
        this.badguy1 = this.add.sprite(this.badguyresult[0].x, this.badguyresult[0].y, 'badguy1');
        this.game.physics.arcade.enable(this.badguy1);

        this.badguy2result = this.findObjectsByType('enemyStart', this.map, 'enemy2');
        this.badguy2 = this.add.sprite(this.badguy2result[0].x, this.badguy2result[0].y, 'badguy1');
        this.game.physics.arcade.enable(this.badguy2);

        this.badguy3result = this.findObjectsByType('enemyStart', this.map, 'enemy3');
        this.badguy3 = this.add.sprite(this.badguy3result[0].x, this.badguy3result[0].y, 'badguy1');
        this.game.physics.arcade.enable(this.badguy3);

        this.badguy4result = this.findObjectsByType('enemyStart', this.map, 'enemy4');
        this.badguy4 = this.add.sprite(this.badguy4result[0].x, this.badguy4result[0].y, 'badguy1');
        this.game.physics.arcade.enable(this.badguy4);

        this.player.body.gravity.y = 800;
        this.badguy1.body.gravity.y = 800;
        //the camera will follow the player in the world
        this.game.camera.follow(this.player);
        //resizes the game world to match the layer dimensions
        this.backgroundlayer.resizeWorld();
        // Add sounds
        this.jumpSound = this.game.add.audio('audio-jump');
        this.hitSound = this.game.add.audio('audio-hit');
        this.timeSound = this.game.add.audio('audio-time');
        this.enemySound = this.game.add.audio('audio-enemy');
        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();
        // Add jump key (spacebar)
        this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shiftkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

        this.gameTime = this.game.time.create();
        this.gameTime.loop(Phaser.Timer.SECOND, function() {
            this._time--;
            if(this._time) {
                this.textTime.setText('Time left: '+this._time);
            }
            else {
                this.stateStatus = 'gameover';
            }
        }, this);
        this.gameTime.start();
        var fontScore = { font: "16px Arial", fill: "#FFF" };
        this.textTime = this.add.text(this.world.width-80, this.world.height-140, 'Time left: '+this._time, fontScore);
        this.textTime.anchor.set(1,1);
    },
    findObjectsByType: function(type, map, layer) {

        var result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                // Phaser uses top left, Tiled bottom left so we have to adjust
                // also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                // so they might not be placed in the exact position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
        //topleft
        var badguyresult = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                element.y -= map.tileHeight;
                badguyresult.push(element);
            }
        });
        return badguyresult;
        //topright
        var badguy2result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                element.y -= map.tileHeight;
                badguy2result.push(element);
            }
        });
        return badguy2result;
        //bttmleft
        var badguy3result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                element.y -= map.tileHeight;
                badguy3result.push(element);
            }
        });
        return badguy3result;
        //bttmright
        var badguy4result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                element.y -= map.tileHeight;
                badguy4result.push(element);
            }
        });
        return badguy4result;

    },
    createItems: function() {
        //create items
        this.items = this.game.add.group();
        this.items.enableBody = true;
        var item;
        result = this.findObjectsByType('item', this.map, 'objectsLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.items);
        }, this);
    },
    createEmeralds: function() {
        //create doors
        this.emeralds = this.game.add.group();
        this.emeralds.enableBody = true;
        //var emerald;    
        result = this.findObjectsByType('emerald', this.map, 'objectsLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.emeralds);
        }, this);
    },
    createPotion: function() {
        //create doors
        this.potions = this.game.add.group();
        this.potions.enableBody = true;
        //var emerald;    
        result = this.findObjectsByType('potion', this.map, 'objectsLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.potions);
        }, this);
    },
    createFinish: function() {
        //create doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;
        //var emerald;    
        result = this.findObjectsByType('door', this.map, 'finish');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.doors);
        }, this);
    },
    //create a sprite from an object
    createFromTiledObject: function(element, group) {
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
    },
    initUI: function() {

        var fontScoreWhite = {
            font: "20px monochrome",
            fill: "#FFF"
        };
        this.textScore = this.add.text(30, 100, 'Score: '+this._score, fontScoreWhite);
        this.textScore.anchor.set(0,1);

        this.buttonAudio = this.add.button(this.world.width - 20, 20, 'button-audio', this.clickAudio, this, 1, 0, 2);
        this.buttonAudio.anchor.set(1, 0);
        this.buttonAudio.scale.setTo(0.5, 0.5);
        this.buttonAudio.setFrames(GameStates._audioOffset + 1, GameStates._audioOffset + 0, GameStates._audioOffset + 2);

    },
    update: function() {
        //collision
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.badguy1, this.blockedLayer);
        this.game.physics.arcade.collide(this.badguy2, this.blockedLayer);
        this.game.physics.arcade.collide(this.badguy3, this.blockedLayer);
        this.game.physics.arcade.collide(this.badguy4, this.blockedLayer);

        this.game.physics.arcade.overlap(this.player, this.items, this.collectCoin, null, this);
        this.game.physics.arcade.overlap(this.player, this.emeralds, this.collectEmeralds, null, this);
        this.game.physics.arcade.overlap(this.player, this.potions, this.collectPotion, null, this);

        this.game.physics.arcade.overlap(this.player, this.doors, this.gameover, null, this);

        this.game.physics.arcade.overlap(this.player, this.badguy1, this.endGame, null, this);
        this.game.physics.arcade.overlap(this.player, this.badguy2, this.endGame, null, this);
        this.game.physics.arcade.overlap(this.player, this.badguy3, this.endGame, null, this);
        this.game.physics.arcade.overlap(this.player, this.badguy4, this.endGame, null, this);


        //player movement
        this.player.body.velocity.x = 0;
        this.movePlayer();
        this.moveEnemy();

        if(this._time === 0){
            this.timeRanOut();
            this.timeSound.play();
        }
        //console.log(this.badguy3.x);
        //console.log(this.badguy4.x);

    },
    movePlayer: function() {

        if (this.shiftkey.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y = -350;
            this.jumpSound.play();
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 150;
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 150;
        }
    },
    moveEnemy: function() {
        //badguy1
        if (this.badguy1.x === 304) {

            this.badguy1.body.velocity.x += 60;

        } else if(this.badguy1.x === 720){

            this.badguy1.body.velocity.x -= 60;

        } else if(this.badguy1.x === 288){

            this.badguy1.body.velocity.x += 60;
        }
       //badguy1
        if (this.badguy2.x === 1104) {

            this.badguy2.body.velocity.x += 60;

        }  else if(this.badguy2.x === 2272){

            this.badguy2.body.velocity.x -= 60;

        } else if(this.badguy2.x === 1088){

            this.badguy2.body.velocity.x += 60;
        }
        //badguy3
        if (this.badguy3.x === 880) {

            this.badguy3.body.velocity.x += 60;

        }  else if(this.badguy3.x === 1120){

            this.badguy3.body.velocity.x -= 60;

        } else if(this.badguy3.x === 864){

            this.badguy3.body.velocity.x += 60;
        }
        //badguy4
        if (this.badguy4.x === 1831) {

            this.badguy4.body.velocity.x -= 60;

        }  else if(this.badguy4.x === 1392){

            this.badguy4.body.velocity.x += 60;

        } else if(this.badguy4.x === 1824){

            this.badguy4.body.velocity.x -= 60;
        }
    },
    collectCoin: function(player, collectable) {
        console.log('you have collected a coin!');
        this.hitSound.play();
        //remove sprite
        this.addPoints();
        collectable.destroy();
    },
    collectEmeralds: function(player, emerald) {
        console.log('you collected an emerald!');
        this.hitSound.play();
        //remove sprite
        this.addPoints();
        emerald.destroy();
    },
    collectPotion: function(player, potion) {
        console.log('you collected the potion gooooooooooooo!');
        this.hitSound.play();
        this.potionCollected = true;
        potion.destroy();
        this.potionCount++;
        console.log(this.potionCount);
    },
    endGame: function() {

        this.enemySound.play();
        this.game.state.start('EndGame');
        console.log('you died');

    },
    timeRanOut: function() {

        this.game.state.start('TimeOver');
        console.log('time ran out my friend');

    },
    nopotionRestart: function() {

        this.timeSound.play();
        this.game.state.start('NoPotion');
        console.log('you did not collect the potion');

    },
    gameover: function(player, door) {
       
       if(this.potionCollected != false && this.potionCount === 3){
            storageAPI.set('GameStates-highscore',this._score);
            console.log("you score : "+ this._score + " points");
            console.log('way to go - you completed teh level');
            this.enemySound.play();
            this.game.state.start('GameOver');

       } else {
            this.timeSound.play();
            console.log('you need to collect the potion');
            this.nopotionRestart();
       }

    },
    addPoints: function() {
        this._score += 10;
        //this.textScore.setText('Score: ' + this._score);
        var randX = this.rnd.integerInRange(200, this.world.width - 200);
        var randY = this.rnd.integerInRange(200, this.world.height - 200);
        var pointsAdded = this.add.text(randX, randY, '+10', {
            font: "48px monochrome",
            fill: "#000",
            stroke: "#FFF",
            strokeThickness: 10
        });
        pointsAdded.anchor.set(0.5, 0.5);
        this.add.tween(pointsAdded).to({
            alpha: 0,
            y: randY - 50
        }, 1000, Phaser.Easing.Linear.None, true);
    },
    render: function() {

    },
};