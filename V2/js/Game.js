Game = function(game) {
    // Player
    this.game = game;
    this.sprite = null;
    this.cursors = null;
    this.jumpButton = null;
    this.hasFoodItem = false;
    this.sound = null;
    // LEVEL
    this.map = null;
    this.layerGround = null;
    this.layerBackground = null;
    this.layerDoor = null;
    this.imageFinish = null;
    this.sumo = null;
    this.enemy = null;
    this.foodItems = null;
    this.food = null;
    // HUD
    this.score = 0;
    this.scoreText = null;
    this.gameTime = 0;
    this.gameTimeText = null;
    // LEVEL
    this.levelNumber = 1;
    this.sumoScale = 0.6;
    this.talkBubble = null;

};

Game.prototype = {      
    create: function() {
        

        //
        // From LEVEL
        //
        game.stage.backgroundColor = '#ADD8E6';
        this.imageFinish = game.add.sprite(game.world.centerX, game.world.centerY, 'finish');
        this.imageFinish.anchor.setTo(0.5, 0.5);
        this.imageFinish.alpha = 0;

        // Skapar tilemappen
        this.map = this.game.add.tilemap('test2');
        this.map.addTilesetImage('spritesheetV2', 'tiles2');

        this.map = this.game.add.tilemap('test2');
        this.map.addTilesetImage('spritesheetV2', 'tiles2');

        //this.layerGround.setCollisionByExclusion([]);

        
        this.layerBackground = this.map.createLayer('background');
        this.layerGround = this.map.createLayer('ground');
        this.layerDoor = this.map.createLayer('door');
        this.map.setCollision(636, true, 'ground');
        this.map.setCollision(303, true, 'ground');
        this.map.setCollision(304, true, 'ground');
        this.map.setCollision(782, true, 'ground');
        this.map.setCollision(736, true, 'ground');
        this.map.setCollision(737, true, 'ground');
        this.map.setCollision(738, true, 'ground');
        this.map.setCollision(785, true, 'ground');
        this.map.setCollision(815, true, 'ground');

        //this.layerDoor = this.map.createLayer('door');

        this.layerGround.resizeWorld();
        this.layerBackground.resizeWorld();
        this.layerDoor.resizeWorld();

        // Kunna hoppa igenom lager id: 635, 665
        this.map.forEach(function (tile) {
            if (tile.index === 636 || tile.index === 782 || tile.index === 736 || tile.index === 737 || tile.index === 738 || tile.index === 785 || tile.index === 815 ) { 
                //console.log(tile);
                tile.collideDown = false;
                tile.collideLeft = false;
                tile.collideRight = false;
            } 
        }, this, 0, 0, this.map.width, this.map.height, this.layerGround);

        //
        // SUMO
        //
        this.sumo = this.game.add.sprite(400, this.game.world.height - 145, 'sumoGreen');
        this.game.physics.enable(this.sumo, Phaser.Physics.ARCADE);
        this.sumo.scale.x = this.sumoScale;
        this.sumo.scale.y = this.sumoScale;
        this.sumo.body.gravity.y = 800;
        this.sumo.enableBody = true;

        //
        // Food
        //
        this.foodItems = this.game.add.group();
        this.foodItems.enableBody = true;
        //game.physics.enable(foodItems, Phaser.Physics.ARCADE);
        //createFoodItem(foodItems, 200, 110, false);

        //
        // HUD
        //
        this.scoreText = this.game.add.text(16, 16, 'Weight Gain: 0kg', { fontSize: '32px', fill: '#00FF00' });
        this.gameTimeText = this.game.add.text(300, 16, 'Time: 0', { fontSize: '32px', fill: '#00FF00' });


        this.createLevel(this.levelNumber);
        //
        // From player
        //
        this.sprite = this.game.add.sprite(300, game.world.height - 180, 'player');
        //game.physics.arcade.enable(player);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        // Spelarens egenskaper
        this.sprite.body.bounce.y = 0.1;
        this.sprite.body.gravity.y = 900;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(20, 32, 5, 16);
        // TODO
        this.DRAG = 600;
        this.sprite.body.drag.setTo(this.DRAG, 0); // x, y

        // Spelarens animationer (Bara i början?)
        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 7], 10, true);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.sound = game.add.audio('dmg');
    }, 

    createLevel: function(lvl) {
        switch(lvl) {
                case 1: {
                        // IM HUNGRY Bubble
                        this.talkBubble = this.game.add.sprite(this.sumo.x + 26, this.sumo.y + 25, 'hungryBubble');
                        this.game.time.events.add(Phaser.Timer.SECOND * 4, function() {this.game.add.tween(this.talkBubble).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);}, this);
                        // Create food
                        this.food = this.foodItems.create(200, this.game.world.height - 80, 'meatStick');
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food.body.gravity.y = 800;
                        //this.game.physics.enable(this.food, Phaser.Physics.ARCADE);
                    break;
                }
                case 2: {
                        this.food = this.foodItems.create(220, this.game.world.height - 130, 'cake');
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food.body.gravity.y = 800;
                        break;
                } 
                case 3: {
                        this.food = this.foodItems.create(220, this.game.world.height - 80, 'meatStick');
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food.body.gravity.y = 800;
                        //
                        // Enemy
                        //
                        this.enemy = this.game.add.sprite(300, this.game.world.height - 80, 'baddie');
                        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
                        this.enemy.enableBody = false;
                        this.enemy.body.gravity.y = 800;
                        // move enemy
                        var tween = this.game.add.tween(this.enemy)
                        .to({x:400}, 1000, Phaser.Easing.Linear.None, false, 0, Number.MAX_VALUE,true)
                        .loop()
                        .start();
                        break;
                        }
                default: {
                    break;
                } 
            }
    },

    createFoodItem: function(x, y, bool) {
        this.food = this.foodItems.create(x, y, 'food');

        if(bool) 
        {
            this.food.body.bounce.y = 0.3;
            this.food.body.gravity.y = 800;
            this.food.body.velocity.y = -180
        }
    },

    feedTheSumo: function() {
        if(this.hasFoodItem)
        {
            this.score += 5;
            this.scoreText.text = 'Weight Gain: ' + this.score + 'kg';
            this.hasFoodItem = false;
            console.log('feed sumo, hasFoodItem = ' + this.hasFoodItem);
            this.levelNumber++;
            this.game.add.tween(this.imageFinish).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
            this.sumoScale += 0.2;

            // Ta bort prat bubblan om matad
            this.talkBubble.alpha = 0;

            // Gör sumon större
            var tween = this.game.add.tween(this.sumo.scale)
            .to({x:this.sumoScale - 0.2,y:this.sumoScale - 0.2}, 500, Phaser.Easing.Back.Out)
            .to({x:this.sumoScale - 0.1,y:this.sumoScale - 0.1}, 500, Phaser.Easing.Back.Out)
            .to({x:this.sumoScale,y:this.sumoScale}, 500, Phaser.Easing.Back.Out)
            .start();

            // Sumo blinkar
            var tween = this.game.add.tween(this.sumo)
            .to({alpha:0.5}, 250, Phaser.Easing.Back.Out)
            .to({alpha:1}, 250, Phaser.Easing.Back.Out)
            .to({alpha:0.5}, 250, Phaser.Easing.Back.Out)
            .to({alpha:1}, 250, Phaser.Easing.Back.Out)
            .to({alpha:0.5}, 250, Phaser.Easing.Back.Out)
            .to({alpha:1}, 250, Phaser.Easing.Back.Out)
            .start();

            // End screen
            this.game.time.events.add(Phaser.Timer.SECOND * 4, function() {this.game.state.start('game');}, this);
            // TODO
            //starvingSumo();
            //console.log(startTime);
        }
    },

    collectFood: function(player, food) {
        food.kill();
        this.hasFoodItem = true;
        console.log('Collected food, , hasFoodItem =' + this.hasFoodItem);
    },

    dropFood: function() {
        if(this.hasFoodItem)
            {
                this.hasFoodItem = false;
                console.log('Droped the food, , hasFoodItem =' + this.enemy.x);
                this.createFoodItem(this.sprite.x, this.sprite.y - 40, true);
                this.sound.play('');
            }
    },

    update: function() {
        // LEVEL
        this.game.physics.arcade.collide(this.foodItems, this.layerGround);
        this.game.physics.arcade.collide(this.sumo, this.layerGround);
        this.game.physics.arcade.collide(this.enemy, this.layerGround);

        this.game.physics.arcade.overlap(this.sprite, this.sumo, this.feedTheSumo, null, this);
        // PLAYER
        // Nollställer rörelse
        this.sprite.body.velocity.x = 0;
        this.game.physics.arcade.collide(this.sprite, this.layerGround);
        //this.map.setTileIndexCallback(636, function () {console.log('hit the tile so bad!'), this, this.layerGround});

        //this.game.physics.arcade.collide(this.sprite, this.layerGround, function(){console.log('hej')});

        this.game.physics.arcade.overlap(this.sprite, this.foodItems, this.collectFood, null, this);
        this.game.physics.arcade.overlap(this.sprite, this.enemy, this.dropFood, null, this);

        // Vänster / höger
        if (this.cursors.left.isDown)
        {
            //  Vänster
            this.sprite.body.velocity.x = -150;
            this.sprite.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            this.sprite.body.velocity.x = 150;
            this.sprite.animations.play('right');
        }
        else
        {
            this.sprite.animations.stop();
            this.sprite.frame = 4;
        }

        // Hoppa
        if (this.jumpButton.isDown && this.sprite.body.blocked.down)
        {
            this.sprite.body.velocity.y = -400;
        }

        // HUD
        this.gameTime = Math.round((this.game.time.now - this.game.time._started)/1000);
        this.gameTimeText.text = 'Time: ' + this.gameTime;
    }
};