Level1 = function(game) {

    this.game = game;
    this.map = null;
    this.layerGround = null;
    this.layerBackground = null;

}

Level1.prototype = {

    preload: function() {
        this.game.load.tilemap('test', './assets/test21by21.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', './assets/spritesheet.png');
    },

    create: function() {

        // Skapar tilemappen
        this.map = this.game.add.tilemap('test');
        this.map.addTilesetImage('spritesheet', 'tiles');

        // Kollision med allt
        this.map.setCollisionByExclusion([ ]);
        this.layerGround = this.map.createLayer('ground');
        this.layerBackground = this.map.createLayer('background');
        
        this.layerBackground.resizeWorld();
        this.layerGround.resizeWorld();
        this.layerBackground.debug = true;
        this.layerGround.debug = true;



    },

    update: function() {

    }

}