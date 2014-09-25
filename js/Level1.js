Level1 = function(game) {

    this.game = game;
    this.map = null;
    this.layerGround = null;
    this.layerBackground = null;
    this.layerDoor = null;
    this.imageFinish = null;
}

Level1.prototype = {

    preload: function() {
        this.game.load.tilemap('test', './assets/level1v03.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', './assets/spritesheetV2.png');
        this.game.load.image('finish', 'assets/text.png');
    },

    create: function() {
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


    },

    update: function() {

    }

}