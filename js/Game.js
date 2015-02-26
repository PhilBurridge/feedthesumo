Game = function(game) {
    // Player
    this.game = game;
    this.sprite = null;
    this.cursors = null;
    this.jumpButton = null;
    this.shootButton = null;
    this.hasFoodItem = false;
    this.numberOfFood = 0;
    // LEVEL
    this.backGroundSprite = null;
    this.map = null;
    this.layerGround = null;
    this.layerBackground = null;
    this.layerDoor = null;
    this.sumo = null;
    this.sumoWeight = null;
    this.enemy = null;
    this.foodItems = null;
    this.food = null;
    this.shootParticles = null;
    this.shoot = null;
    this.shootDirection = 1;
    this.foodCart = null;
    // HUD
    this.score = 0;
    this.scoreText = null;
    this.gameTime = 0;
    this.gameTimeText = null;
    this.restartButton = null;
    // LEVEL
    this.timeUpTimer = null;
    this.levelNumber = 1;
    this.sumoScale = 0.6;
    this.talkBubble = null;
    this.bird = null;
    this.birdNoFood = null;
    this.gameTimeResults = 0;
    this.matchWeight = 0;
    // SOUND
    this.takeDmg = null;
    this.birdSound = null;
    this.eatingSumo = null;
    this.pickUp = null;
    // TIMES UP MENU
    this.timesUpMenu = null;
    this.timesUpWeight = null;
    this.timesUpLost = null;
    this.timesUpWon = null;
    this.timesUpMoreFood = null;
    this.timesUpEnemySumo = null;
    this.timesUpRestartButton = null;
    this.timesUpNextLevelButton = null;
    this.timesUpWeightText = null;
    this.timesUpSumo = null;
    this.noMoreFood = 0;
    this.noMoreFoodBool = false;
    // Cast
    this.explode = 0;
};

Game.prototype = {      
    create: function() {
        //
        // From LEVEL
        //
        //game.stage.backgroundColor = '#ADD8E6';
        this.backGroundSprite = this.game.add.sprite(0, 0, 'background');

        // Skapar tilemappen
        this.map = this.game.add.tilemap('test2');
        this.map.addTilesetImage('spritesheetV2', 'tiles2');


        // LAYERS from Tiled
        this.layerBackground = this.map.createLayer('background');
        this.layerGround = this.map.createLayer('ground');
        this.layerDoor = this.map.createLayer('door');

        // Set collision med alla tiles från 'ground' layer
        this.map.setCollision(636, true, 'ground');
        this.map.setCollision(303, true, 'ground');
        this.map.setCollision(304, true, 'ground');
        this.map.setCollision(782, true, 'ground');
        this.map.setCollision(736, true, 'ground');
        this.map.setCollision(737, true, 'ground');
        this.map.setCollision(738, true, 'ground');
        this.map.setCollision(785, true, 'ground');
        this.map.setCollision(815, true, 'ground');


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
        this.sumoWeight = 160;
        this.talkBubble = this.game.add.sprite(this.sumo.x - 18, this.sumo.y - 40, 'hungryBubble');
        this.talkBubble.alpha = 0;

        // div map objects
        this.foodCart = this.game.add.sprite(100, game.world.height - 100, 'foodCart');
        this.foodCart.alpha = 0;
        //
        // Food
        //
        this.foodItems = this.game.add.group();
        this.foodItems.enableBody = true;
        //game.physics.enable(foodItems, Phaser.Physics.ARCADE);
        //createFoodItem(foodItems, 200, 110, false);

        // SHOOT
        this.shootParticles = this.game.add.group();
        this.shootParticles.enableBody = true;

        //
        // HUD
        //
        this.scoreText = this.game.add.text(16, 16, 'Current Weight: ' + this.sumoWeight + 'kg', { fontSize: '32px', fill: '#fc5343' });
        this.gameTimeText = this.game.add.text(350, 16, 'Countdown: 0', { fontSize: '32px', fill: '#fc5343' });

        this.restartButton = game.add.button(750, 10, 'restart', this.restartLevel, this);


        // Create lvl
        this.createLevel(this.game.currentLevel);

        //
        // From player
        //
        this.sprite = this.game.add.sprite(300, game.world.height - 75, 'player');
        //game.physics.arcade.enable(player);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        // Spelarens egenskaper
        this.sprite.body.bounce.y = 0.1;
        this.sprite.body.gravity.y = 900;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.setSize(20, 32, 5, 16);
        // TODO
        /*this.DRAG = 600;
        this.sprite.body.drag.setTo(this.DRAG, 0); */

        // Spelarens animationer (Bara i början?)
        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 7], 10, true);

        //
        // INPUT
        //
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.X);

        //
        // SOUND
        //
        this.takeDmg = game.add.audio('dmg');
        this.birdSound = game.add.audio('birdSound');
        this.eatingSumo = game.add.audio('eating');
        this.pickUp = game.add.audio('pickUp');

        //
        // TIMES UP MENU
        //


    }, 

    restartLevel: function() {
        this.game.state.start('game');
    },

    createLevel: function(lvl) {
        switch(lvl) {
                case 1: 
                        // SET LEVEL GOALS
                        this.matchWeight = 170;
                        this.game.currentLevel = 1;
                        game.time.reset();
                        // Time before level done
                        this.timeUpTimer = 15;
                        // IM HUNGRY Bubble
                        this.talkBubble.alpha = 1;
                        this.game.time.events.add(Phaser.Timer.SECOND * 4, function() {this.game.add.tween(this.talkBubble).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);}, this);
                        
                        // create FOOD
                        // this.foodCart = this.game.add.sprite(100, game.world.height - 100, 'foodCart');
                        this.foodCart.x = 100;
                        this.foodCart.y = game.world.height - 100;
                        this.foodCart.alpha = 1;
                        this.foodCart.scale.x = 1.2;
                        this.foodCart.scale.y = 1.2;
                        //this.foodCart.enableBody = true;
                        for(var i = 0; i < 1; i++)
                        {    
                            this.noMoreFood++;
                            this.food = this.foodItems.create(this.foodCart.x, this.foodCart.y, 'meatStick');
                            this.food.scale.x = 0.6;
                            this.food.scale.y = 0.6;
                            if(i % 2)
                                var directionOfFood = -1;
                            else
                                var directionOfFood = 1;

                            var tween = this.game.add.tween(this.food)
                            .to({x:this.foodCart.x + (directionOfFood * 20 * i), y:this.foodCart.y - 30 }, 500, Phaser.Easing.Linear.None)
                            .start();
                            this.food.body.bounce.y = 0.3;
                            this.food.body.gravity.y = 800;
                        }                      
                    break;

                case 2: 
                        // SET LEVEL GOALS
                        this.matchWeight = 170;
                        this.game.currentLevel = 2;
                        game.time.reset();
                        // Time before level done
                        this.timeUpTimer = 15;

                        // create FOOD
                        this.food = this.foodItems.create(230, this.game.world.height - 130, 'cake');
                        this.noMoreFood++;
                        this.food.scale.x = 0.5;
                        this.food.scale.y = 0.5;
                        this.food.body.gravity.y = 800;
                        break;
                 
                case 3: 
                        // SET LEVEL GOALS
                        this.matchWeight = 180;
                        this.game.currentLevel = 3;
                        game.time.reset();
                        // Time before level done
                        this.timeUpTimer = 12;

                        // create FOOD
                        this.food = this.foodItems.create(230, this.game.world.height - 126, 'meatStick');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(166, this.game.world.height - 216, 'cake');
                        this.noMoreFood++;
                        this.food.scale.x = 0.5;
                        this.food.scale.y = 0.5;
                        this.food = this.foodItems.create(230, this.game.world.height - 290, 'ribs');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;

                        this.food.body.gravity.y = 800;
                        
                        break;
                         
                case 4: 
                        // SET LEVEL GOALS
                        this.matchWeight = 180;
                        this.game.currentLevel = 4;
                        game.time.reset();
                        // Time before level done
                        this.timeUpTimer = 10;

                        // create FOOD
                        this.food = this.foodItems.create(166, this.game.world.height - 216, 'cake');
                        this.noMoreFood++;
                        this.food.scale.x = 0.5;
                        this.food.scale.y = 0.5;

                        //
                        // Bird
                        //
                        this.bird = this.game.add.sprite(800, this.game.world.height - 300, 'birdFood');
                        this.game.physics.enable(this.bird, Phaser.Physics.ARCADE);
                        this.bird.enableBody = false;
                        // move bird
                        var tween = this.game.add.tween(this.bird)
                        .to({x:600}, 2000, Phaser.Easing.Linear.None)
                        .start();

                        this.game.time.events.add(Phaser.Timer.SECOND * 2, function() {
                            this.bird.kill();
                            this.food = this.foodItems.create(590, this.game.world.height - 300, 'ribs');
                            this.noMoreFood++;
                            this.food.scale.x = 0.6;
                            this.food.scale.y = 0.6;
                            this.food.body.gravity.y = 800;
                            this.bird = this.game.add.sprite(600, this.game.world.height - 300, 'bird');
                            this.game.physics.enable(this.bird, Phaser.Physics.ARCADE);
                            this.bird.enableBody = false;

                            var tween = this.game.add.tween(this.bird)
                            .to({x:820}, 2000, Phaser.Easing.Linear.None)
                            .start();
                            }, this);
                          
                        break;
                case 5: 
                        // SET LEVEL GOALS
                        this.matchWeight = 190;
                        this.game.currentLevel = 5;
                        game.time.reset();
                        // Time before level done
                        this.timeUpTimer = 12;

                        // create FOOD
                        this.food = this.foodItems.create(60, this.game.world.height - 440, 'meatStick');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(166, this.game.world.height - 216, 'cake');
                        this.noMoreFood++;
                        this.food.scale.x = 0.5;
                        this.food.scale.y = 0.5;
                        this.food = this.foodItems.create(230, this.game.world.height - 290, 'ribs');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(590, this.game.world.height - 168, 'ribs');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        
                        break;
                case 6: 
                        // SET LEVEL GOALS
                        this.matchWeight = 180;
                        this.game.currentLevel = 6;
                        game.time.reset();
                        // Time before level done
                        this.timeUpTimer = 15;

                        // create FOOD
                        this.food = this.foodItems.create(10, this.game.world.height - 440, 'meatStick');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(590, this.game.world.height - 168, 'ribs');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;

                        //
                        // Enemy
                        //
                        this.enemy = this.game.add.sprite(30, this.game.world.height - 440, 'baddie');
                        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
                        this.enemy.enableBody = false;
                        this.enemy.body.gravity.y = 800;
                        // move enemy
                        var tween = this.game.add.tween(this.enemy)
                        .to({x:80}, 1000, Phaser.Easing.Linear.None, false, 0, Number.MAX_VALUE,true)
                        .loop()
                        .start();
                        
                        break;
                case 7:

                        // SET LEVEL GOALS
                        this.matchWeight = 190;
                        this.game.currentLevel = 7;
                        game.time.reset();
                        // Time before level done
                        this.timeUpTimer = 12;



                        // Create FOOD
                        this.food = this.foodItems.create(166, this.game.world.height - 216, 'cake');
                        this.noMoreFood++;
                        this.food.scale.x = 0.5;
                        this.food.scale.y = 0.5;
                        this.food = this.foodItems.create(590, this.game.world.height - 168, 'ribs');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(10, this.game.world.height - 440, 'meatStick');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        /*var maxFood = 4;
                        for(var i = 0; i < maxFood; i++) {
                            this.noMoreFood++;
                            this.food = this.foodItems.create(220 - (i * 20), this.game.world.height - 80, 'meatStick');
                            this.food.scale.x = 0.6;
                            this.food.scale.y = 0.6;
                            this.food.body.gravity.y = 800;
                        }*/

                        //
                        // Enemy
                        //
                        /*this.enemy = this.game.add.sprite(300, this.game.world.height - 60, 'baddie');
                        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
                        this.enemy.enableBody = false;
                        this.enemy.body.gravity.y = 800;
                        // move enemy
                        var tween = this.game.add.tween(this.enemy)
                        .to({x:400}, 1000, Phaser.Easing.Linear.None, false, 0, Number.MAX_VALUE,true)
                        .loop()
                        .start();*/

                        //
                        // Bird
                        //
                        this.bird = this.game.add.sprite(600, 80, 'bird');
                        this.game.physics.enable(this.bird, Phaser.Physics.ARCADE);
                        this.bird.enableBody = false;
                        // move bird
                        var tween = this.game.add.tween(this.bird)
                        .to({x:700}, 1000, Phaser.Easing.Linear.None, false, 0, Number.MAX_VALUE,true)
                        .loop()
                        .start();
                    break;
                case 8: 
                        // SET LEVEL GOALS
                        this.matchWeight = 220;
                        this.game.currentLevel = 8;
                        game.time.reset();
                        // Time before level done
                        this.timeUpTimer = 14;

                        // create FOOD
                        this.food = this.foodItems.create(10, this.game.world.height - 440, 'meatStick');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(620, this.game.world.height - 168, 'ribs');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(166, this.game.world.height - 216, 'cake');
                        this.noMoreFood++;
                        this.food.scale.x = 0.5;
                        this.food.scale.y = 0.5;
                        this.food = this.foodItems.create(580, this.game.world.height - 164, 'chicken');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(40, this.game.world.height - 440, 'meatStick');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(230, this.game.world.height - 126, 'meatStick');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;


                        //
                        // Enemy
                        //
                        /*this.enemy = this.game.add.sprite(30, this.game.world.height - 440, 'baddie');
                        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
                        this.enemy.enableBody = false;
                        this.enemy.body.gravity.y = 800;
                        // move enemy
                        var tween = this.game.add.tween(this.enemy)
                        .to({x:80}, 1000, Phaser.Easing.Linear.None, false, 0, Number.MAX_VALUE,true)
                        .loop()
                        .start();*/
                        
                        break;
                     case 9: 
                        // SET LEVEL GOALS
                        this.matchWeight = 180;
                        this.game.currentLevel = 9;
                        game.time.reset();
                        // Time before level done
                        this.timeUpTimer = 15;

                        // create FOOD
                        this.food = this.foodItems.create(10, this.game.world.height - 440, 'meatStick');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food = this.foodItems.create(590, this.game.world.height - 168, 'ribs');
                        this.noMoreFood++;
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;

                        //
                        // Enemy
                        //
                        this.enemy = this.game.add.sprite(30, this.game.world.height - 440, 'baddie');
                        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
                        this.enemy.enableBody = false;
                        this.enemy.body.gravity.y = 800;
                        // move enemy
                        var tween = this.game.add.tween(this.enemy)
                        .to({x:80}, 1000, Phaser.Easing.Linear.None, false, 0, Number.MAX_VALUE,true)
                        .loop()
                        .start();
                        
                        break;
                        
                default: 
                    break;         
            }
    },

    createFoodItem: function(x, y, bool) {
        this.food = this.foodItems.create(x, y, 'meatStick');

        if(bool) 
        {
            this.food.scale.x = 0.6;
            this.food.scale.y = 0.6;
            this.food.body.bounce.y = 0.3;
            this.food.body.gravity.y = 800;
            this.food.body.velocity.y = -180
        }
    },

    feedTheSumo: function() {
        if(this.hasFoodItem)
        {
            // - FUL LEK
            this.explode+=this.numberOfFood
            //
            this.eatingSumo.play('');
            // keeps track if there is any more food on the map
            this.noMoreFood -= this.numberOfFood;
            console.log(this.noMoreFood);
            // No more food, start end game animation after X seconds
            if(this.noMoreFood == 0)
                this.game.time.events.add(Phaser.Timer.SECOND * 2.5, function() {this.noMoreFoodBool = true;}, this);
                
            // Add the sumos weight and remove food carried
            this.sumoWeight += 10 * this.numberOfFood;
            this.score += 10 * this.numberOfFood;
            // TWEEN
            this.sumoScale += 0.2;
            this.sumoScale += 0.1 * this.numberOfFood;

            this.numberOfFood = 0;
            this.scoreText.text = 'Current Weight: ' + this.sumoWeight + 'kg';
            this.hasFoodItem = false;
            console.log('feed sumo, hasFoodItem = ' + this.hasFoodItem);

            // Ta bort prat bubblan om matad
            if(this.game.currentLevel == 1)
                this.talkBubble.alpha = 0;

            // En variant av sumo större
            /*var tween = this.game.add.tween(this.sumo.scale)
            .to({x:this.sumoScale - 0.08 * this.numberOfFood,y:this.sumoScale - 0.08 * this.numberOfFood}, 500, Phaser.Easing.Back.Out)
            .to({x:this.sumoScale - 0.04 * this.numberOfFood,y:this.sumoScale - 0.04 * this.numberOfFood}, 500, Phaser.Easing.Back.Out)
            .to({x:this.sumoScale,y:this.sumoScale}, 500, Phaser.Easing.Back.Out)
            .start();*/

            //
            // Skämt för casten, SumoExplode
            //
           /* if(this.explode >= 3) {
                var tween = this.game.add.tween(this.sumo.scale)
                .to({x:this.sumoScale - 0.2,y:this.sumoScale - 0.2}, 500, Phaser.Easing.Back.Out)
                .to({x:this.sumoScale - 0.1,y:this.sumoScale - 0.1}, 500, Phaser.Easing.Back.Out)
                .to({x:this.sumoScale,y:this.sumoScale}, 500, Phaser.Easing.Back.Out)
                .start();

                this.game.time.events.add(Phaser.Timer.SECOND * 0.8, function() {
                    this.sumo.alpha = 0;
                    var explo = game.add.sprite(this.sumo.x, this.sumo.y, 'expl1');
                    var tween = this.game.add.tween(explo)
                    .to({alpha:0}, 1000, Phaser.Easing.Linear.None)
                    .start();
                    }, this);

                this.game.time.events.add(Phaser.Timer.SECOND * 0.9, function() {
                    for(var i = 0; i < 8; i++) {
                        this.noMoreFood++;
                        this.food = this.foodItems.create(this.sumo.x, this.sumo.y, 'meatStick');
                        this.food.scale.x = 0.6;
                        this.food.scale.y = 0.6;
                        this.food.body.gravity.y = 500;
                        this.food.body.velocity.y = -500 +  (i *80);
                        //this.food.body.velocity.x = -20;
                        if(i % 2)
                            this.food.body.velocity.x = -20 + (i * -20);
                        else
                            this.food.body.velocity.x = 20 + (i * 20);
                    }
                }, this);
                this.game.time.events.add(Phaser.Timer.SECOND * 1, function() { this.sumo.kill();}, this);
                
             
            } else {*/

            // "Animationerna" för sumon växer
            var tween = this.game.add.tween(this.sumo.scale)
            .to({x:this.sumoScale - 0.2,y:this.sumoScale - 0.2}, 500, Phaser.Easing.Back.Out)
            .to({x:this.sumoScale - 0.1,y:this.sumoScale - 0.1}, 500, Phaser.Easing.Back.Out)
            .to({x:this.sumoScale,y:this.sumoScale}, 500, Phaser.Easing.Back.Out)
            .start();

            this.numberOfFood = 0;
            this.scoreText.text = 'Current Weight: ' + this.sumoWeight + 'kg';
            this.hasFoodItem = false;
            console.log('feed sumo, hasFoodItem = ' + this.hasFoodItem);

            // Sumo blinkar
            var tween = this.game.add.tween(this.sumo)
            .to({alpha:0.5}, 125, Phaser.Easing.Back.Out)
            .to({alpha:1}, 125, Phaser.Easing.Back.Out)
            .to({alpha:0.5}, 125, Phaser.Easing.Back.Out)
            .to({alpha:1}, 125, Phaser.Easing.Back.Out)
            .to({alpha:0.5}, 125, Phaser.Easing.Back.Out)
            .to({alpha:1}, 125, Phaser.Easing.Back.Out) 
            .to({alpha:0.5}, 125, Phaser.Easing.Back.Out)
            .to({alpha:1}, 125, Phaser.Easing.Back.Out)
            .to({alpha:0.5}, 125, Phaser.Easing.Back.Out)
            .to({alpha:1}, 125, Phaser.Easing.Back.Out)
            .start();
            //}
        }
    },

    collectFood: function(player, food) {
        food.kill();
        this.pickUp.play('');
        this.hasFoodItem = true;
        // increment number of food items carried
        this.numberOfFood++;
        // Make player slower when carrying food
        this.sprite.body.gravity.y += 50;
        console.log('Numer of food items: ' + this.numberOfFood + ' Players gravity: ' + this.sprite.body.gravity.y);
        
    },

    dropFood: function() {
        if(this.hasFoodItem)
            {
                this.hasFoodItem = false;
                
                for (var i = 0; i <= this.numberOfFood; i++) {
                    this.numberOfFood--;
                    this.createFoodItem(this.sprite.x, this.sprite.y - 20, true);
                }
                console.log('Droped the food, , hasFoodItem =' + this.enemy.x);
                this.takeDmg.play('');
            }
    },

    shootFireBall: function() {
        this.shoot = this.shootParticles.create(this.sprite.x + 10, this.sprite.y + 10, 'shootFire');
        this.shoot.body.velocity.x = 200 * this.shootDirection;
    },

    dropBirdFood: function() {
        //if(this.hasFoodItem)
            //{
                //this.hasFoodItem = false;
                this.bird.kill();
                this.birdNoFood = this.game.add.sprite(this.bird.x, this.bird.y, 'bird');
                this.game.physics.enable(this.birdNoFood, Phaser.Physics.ARCADE);
                this.birdNoFood.body.gravity.y = 800;

                
                console.log('Droped the food, , hasFoodItem =' + this.bird.x);
                this.noMoreFood++;
                this.createFoodItem(this.bird.x, this.bird.y, true);
                this.takeDmg.play('');

                var tween = this.game.add.tween(this.birdNoFood)
                .to({alpha:0.5}, 125, Phaser.Easing.Back.Out)
                .to({alpha:1}, 125, Phaser.Easing.Back.Out)
                .to({alpha:0.5}, 125, Phaser.Easing.Back.Out)
                .to({alpha:1}, 125, Phaser.Easing.Back.Out)
                .to({alpha:0.5}, 125, Phaser.Easing.Back.Out)
                .to({alpha:1}, 125, Phaser.Easing.Back.Out) 
                .to({alpha:0.5}, 125, Phaser.Easing.Back.Out)
                .to({alpha:1}, 125, Phaser.Easing.Back.Out)
                .start();

                this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {this.birdNoFood.kill()}, this);
            //}
    },

    timesUp: function() {
        // dim the background
        this.layerGround.alpha = 0.4;
        this.layerBackground.alpha = 0.4;
        this.layerDoor.alpha = 0.4;
        this.backGroundSprite.alpha = 0.4;
        this.foodCart.alpha = 0;
        this.foodItems.forEach( function(food){
            food.alpha = 0;
        });
        // IMAGES
        this.timesUpMenu = game.add.sprite(200, 100, 'timesUpMenu');
        this.timesUpWeight = game.add.sprite(260, 150, 'timesUpWeight');
        this.timesUpLost = game.add.sprite(300, 240, 'timesUpYouLost');
        this.timesUpWon = game.add.sprite(300,240, 'timesUpYouWon');
        this.timesUpMoreFood = game.add.sprite(300, 300, 'timesUpMoreFood');
       
        // TEXT
        this.timesUpWeightText = this.game.add.text(420, 172, '', { fontSize: '32px', fill: '#fffff' });
        this.timesUpWeightText.text = this.sumoWeight + 'kg';

        this.timesUpLost.alpha = 0;
        this.timesUpWon.alpha = 0;
        this.timesUpMoreFood.alpha = 0;


        this.timesUpEnemySumo = game.add.sprite(480, 284, 'enemySumo');
        this.game.physics.enable(this.timesUpEnemySumo, Phaser.Physics.ARCADE);
        var tween = this.game.add.tween(this.timesUpEnemySumo)
        .to({x:400}, 1000, Phaser.Easing.Linear.None)
        .start();

        this.sumo.alpha = 0;

        this.timesUpSumo = this.game.add.sprite(320, 284, 'sumoGreen');
        this.game.physics.enable(this.timesUpSumo, Phaser.Physics.ARCADE);
        var tween2 = this.game.add.tween(this.timesUpSumo)
        .to({x:400}, 1000, Phaser.Easing.Linear.None)
        .start();

        // WIN OR LOOOSe
        if(this.sumoWeight >= this.matchWeight) {
            // WON
            // TWEEN ENEMY SUMO
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
            var tween = this.game.add.tween(this.timesUpEnemySumo)
            .to({x:800}, 2000, Phaser.Easing.Linear.None)
            .start();
            var tween = this.game.add.tween(this.timesUpEnemySumo)
            .to({y:250}, 2000, Phaser.Easing.Linear.None)
            .start();
            var tween = this.add.tween(this.timesUpEnemySumo).to({angle:'+180'}, 2000, Phaser.Easing.Linear.None, true, 100);
            }, this);

            console.log('WOOON')
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function() {
            this.timesUpWon.alpha = 1;
            
            var tweenWon = this.game.add.tween(this.timesUpWon.scale)
                .to({x:1,y:1}, 500, Phaser.Easing.Back.Out)
                .to({x:0.98,y:0.98}, 500, Phaser.Easing.Back.Out)
                .to({x:1,y:1}, 500, Phaser.Easing.Back.Out)
                .start();

            }, this);

            this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                this.timesUpSumo.alpha = 0;
                this.timesUpEnemySumo.alpha = 0;
                
                this.timesUpRestartButton = game.add.button(253, 350, 'timesUpNextRestart', 
                    this.restartLevel, this);
                this.timesUpNextLevelButton = game.add.button(393, 350, 'timesUpNextLevelButton', function() {
                    this.game.currentLevel++;
                    this.game.state.start('game');
                    }, this);
            }, this);

        } else {
            // LOST
            console.log('LOOOST')
            // TWEEN SUMO
            this.game.time.events.add(Phaser.Timer.SECOND * 1, function() {
            var tween = this.game.add.tween(this.timesUpSumo)
            .to({x:0}, 2000, Phaser.Easing.Linear.None)
            .start();
            var tween = this.game.add.tween(this.timesUpSumo)
            .to({y:250}, 2000, Phaser.Easing.Linear.None)
            .start();
            var tween = this.add.tween(this.timesUpSumo).to({angle:'-180'}, 2000, Phaser.Easing.Linear.None, true, 100);
            }, this);

            // TWEEN TEXT
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function() {
            this.timesUpLost.alpha = 1;
            
            var tweenWon = this.game.add.tween(this.timesUpLost.scale)
                .to({x:1,y:1}, 500, Phaser.Easing.Back.Out)
                .to({x:0.98,y:0.98}, 500, Phaser.Easing.Back.Out)
                .to({x:1,y:1}, 500, Phaser.Easing.Back.Out)
                .start();

            }, this);

            this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                this.timesUpSumo.alpha = 0;
                this.timesUpEnemySumo.alpha = 0;
                
                this.timesUpRestartButton = game.add.button(253, 350, 'timesUpNextRestart', 
                    this.restartLevel, this);
                this.button = game.add.button(393, 350, 'mainMenuButton', function() {
                    this.game.state.start('mainmenu');
                    }, this);
                }, this);
        }

        
        
    },

    update: function() {

        var bajs = false;
        // TIMES UP
        if(this.timeUpTimer == Math.floor(this.gameTime/100)/10 || this.noMoreFoodBool && bajs != true) {
            bajs = true;
            // Dont eneter the loop again in the same game
            this.noMoreFoodBool = false;
            this.game.time.reset();
            // Run end of game animations
            this.timesUp();
            // Set stuff not to be visible during end scrren
            this.scoreText.alpha = 0;
            this.gameTimeText.alpha = 0;
            this.sprite.alpha = 0;
            this.sumoScale = 0.6;
        }

        // LEVEL
        this.game.physics.arcade.collide(this.foodItems, this.layerGround);
        this.game.physics.arcade.collide(this.sumo, this.layerGround);
        this.game.physics.arcade.collide(this.enemy, this.layerGround);
        this.game.physics.arcade.collide(this.birdNoFood, this.layerGround);

        this.game.physics.arcade.overlap(this.sprite, this.sumo, this.feedTheSumo, null, this);
        // PLAYER
        // Nollställer rörelse
        this.sprite.body.velocity.x = 0;
        // Check collisions and overlap
        this.game.physics.arcade.collide(this.sprite, this.layerGround);
        this.game.physics.arcade.overlap(this.sprite, this.foodItems, this.collectFood, null, this);
        this.game.physics.arcade.overlap(this.sprite, this.enemy, this.dropFood, null, this);
        this.game.physics.arcade.collide(this.sprite, this.bird, this.dropBirdFood, null, this);

        // SHOOT PARTICLES;
        this.game.physics.arcade.overlap(this.shootParticles, this.bird, function(particle, bird) {
            bird.kill();
            this.birdSound.play('');
            particle.kill();
            this.createFoodItem(bird.x, bird.y, true);
            var blabla = game.add.sprite(bird.x, bird.y, 'explosion');
            blabla.scale.x = 2;
            blabla.scale.y = 2;
            this.game.add.tween(blabla).to( {alpha: 0 }, 500, Phaser.Easing.Linear.None).start();
        }, null, this);

        // Vänster / höger
        if (this.cursors.left.isDown)
        {
            //  Vänster
            this.shootDirection = -1;
            this.sprite.body.velocity.x = -150 + (10 * this.numberOfFood);
            this.sprite.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            this.shootDirection = 1;
            this.sprite.body.velocity.x = 150 - (10 * this.numberOfFood);
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

        // SHOOT
         if (/*this.shootButton.isDown && !*/this.shootButton.justPressed(1))
        {
            this.shootFireBall();
        }

        // HUD
        this.gameTime = Math.round((this.game.time.now - this.game.time._started));
        var showTime = (this.timeUpTimer - (Math.floor(this.gameTime/100)/10).toFixed(1));
        this.gameTimeText.text = 'Countdown: ' + showTime.toFixed(1);
    }
};