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

};

Game.prototype = {      
    create: function() {
        //
        // From player
        //
        this.sprite = this.game.add.sprite(300, game.world.height - 180, 'player');
        //game.physics.arcade.enable(player);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        // Spelarens egenskaper
        this.sprite.body.bounce.y = 0.1;
        this.sprite.body.gravity.y = 800;
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

        this.map.setCollisionByExclusion([]);
        this.layerGround = this.map.createLayer('ground');
        this.layerGround.resizeWorld();

        // Kunna hoppa igenom lager id: 635, 665
        this.map.forEach(function (tile) {
            if (tile.index === 636) { 
                //console.log(tile);
                tile.collideDown = false;
            } 
        }, this, 0, 0, this.map.width, this.map.height, this.layerGround);

        //
        // SUMO
        //
        this.sumo = this.game.add.sprite(400, this.game.world.height - 145, 'sumoGreen');
        this.game.physics.enable(this.sumo, Phaser.Physics.ARCADE);
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
    }, 

    createLevel: function(lvl) {
        switch(lvl) {
                case 1: {
                        this.food = this.foodItems.create(200, this.game.world.height - 80, 'food');
                        this.game.physics.enable(this.food, Phaser.Physics.ARCADE);
                    break;
                }
                case 2: {
                        this.food = this.foodItems.create(220, this.game.world.height - 130, 'food');
                        break;
                } case 3: {
                        this.food = this.foodItems.create(220, this.game.world.height - 130, 'food');
                        this.game.physics.enable(this.food, Phaser.Physics.ARCADE);
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
            this.sprite.body.velocity.y = -500;
        }

        // HUD
        this.gameTime = Math.round((this.game.time.now - this.game.time._started)/1000);
        this.gameTimeText.text = 'Time: ' + this.gameTime;
    }
};