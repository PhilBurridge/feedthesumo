Level1 = function(game) {

    this.game = game;
    this.map = null;
    this.layerGround = null;
    this.layerBackground = null;
    this.layerDoor = null;
    this.imageFinish = null;
    this.sumo = null;
    this.enemy = null;
    this.foodItems = null;
    this.food = null;
}

Level1.prototype = {

    preload: function() {
        //
        // MAP
        //
        this.game.load.tilemap('test', './assets/level1v03.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', './assets/spritesheetV2.png');
        this.game.load.image('finish', 'assets/text.png');

        //
        //  DIV
        //
        this.game.load.image('sumoGreen', 'assets/lonleySumo.png');    
        this.game.load.image('food', 'assets/star.png');
        this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);

    },

    create: function() {
        //
        // MAP
        //
        game.stage.backgroundColor = '#ADD8E6';
        this.imageFinish = game.add.sprite(game.world.centerX, game.world.centerY, 'finish');
        this.imageFinish.anchor.setTo(0.5, 0.5);
        this.imageFinish.alpha = 0;

        // Skapar tilemappen
        this.map = this.game.add.tilemap('test');
        this.map.addTilesetImage('spritesheetV2', 'tiles');

        this.map.setCollisionByExclusion([]);

        //this.map.setCollision(301);
        //this.map.setCollision(302);
        //this.map.setCollision(303);
        this.layerGround = this.map.createLayer('ground');
        //this.layerBackground = this.map.createLayer('background');

        //this.layerDoor = this.map.createLayer('door');
        
        //this.layerBackground.resizeWorld();
        this.layerGround.resizeWorld();
        //this.layerDoor.resizeWorld();

        //this.layerBackground.debug = true;
        //this.layerGround.debug = true;
        //this.layerGround.alpha = 0;

        //
        // SUMO
        //
        this.sumo = this.game.add.sprite(400, this.game.world.height - 145, 'sumoGreen');
        this.game.physics.enable(this.sumo, Phaser.Physics.ARCADE);
        this.sumo.body.gravity.y = 800;
        this.sumo.enableBody = true;

        //
        // Enemy
        //
        this.enemy = this.game.add.sprite(300, this.game.world.height - 130, 'baddie');
        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.enableBody = false;
        this.enemy.body.gravity.y = 800;

        // move enemy
        var tween = this.game.add.tween(this.enemy)
        .to({x:400}, 1000, Phaser.Easing.Linear.None, false, 0, Number.MAX_VALUE,true)
        .loop()
        .start();

        //
        // Food
        //
        this.foodItems = this.game.add.group();
        this.foodItems.enableBody = true;
        //game.physics.enable(foodItems, Phaser.Physics.ARCADE);
        //createFoodItem(foodItems, 200, 110, false);

        this.food = this.foodItems.create(200, game.world.height - 110, 'food');
        this.game.physics.enable(this.food, Phaser.Physics.ARCADE);


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
        if(player.hasFoodItem)
        {
            hud.score += 5;
            hud.scoreText.text = 'Weight Gain: ' + hud.score + 'kg';
            player.hasFoodItem = false;
            console.log('feed sumo, hasFoodItem = ' + player.hasFoodItem);
            // TODO
            //starvingSumo();
            //console.log(startTime);
        }
    },

    update: function() {
        this.game.physics.arcade.collide(this.foodItems, this.layerGround);
        this.game.physics.arcade.collide(this.sumo, this.layerGround);
        this.game.physics.arcade.collide(this.enemy, this.layerGround);

        this.game.physics.arcade.overlap(player.sprite, this.sumo, this.feedTheSumo, null, this);

    }

}