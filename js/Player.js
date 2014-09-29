Player = function(game) {

    this.game = game;
    this.sprite = null;
    this.cursors = null;
    this.jumpButton = null;
    this.hasFoodItem = false;
    this.sound = null;

};

Player.prototype = {

    preload: function() {
        this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);
    },

    create: function() {
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
    },

    collectFood: function(player, food) {
        food.kill();
        this.hasFoodItem = true;
        console.log('Collected food, , hasFoodItem =' + this.hasFoodItem);

        this.game.add.tween(level1.imageFinish).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None).start();
    },

    dropFood: function() {
    if(this.hasFoodItem)
        {
            this.hasFoodItem = false;
            console.log('Droped the food, , hasFoodItem =' + level1.enemy.x);
            level1.createFoodItem( this.sprite.x, this.sprite.y - 40, true);
            this.sound.play('');
        }
    },

    update: function() {
        // Nollställer rörelse
        this.sprite.body.velocity.x = 0;
        // TODO
        //player.body.drag.setTo(false, true);

        //Kollision mellan spelare och layer
        //console.log(this.sprite, level1.layerGround);
        this.game.physics.arcade.collide(this.sprite, level1.layerGround);
        //this.game.physics.arcade.collide(this.sprite, level1.layerGround, function(){console.log('hej')});

        this.game.physics.arcade.overlap(this.sprite, level1.foodItems, this.collectFood, null, this);
        this.game.physics.arcade.overlap(this.sprite, level1.enemy, this.dropFood, null, this);

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
    }

}