Mainmenu = function(game) {

    this.game = game;
    this.map = null;
    this.layerGround = null;
    this.layerBackground = null;
    this.button = null;

}

Mainmenu.prototype = {

    preload: function() {
        this.game.load.tilemap('test', './assets/test21by21.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', './assets/spritesheet.png');
        this.game.load.image('menu', './assets/startscreen.png');
        this.game.load.image('button', './assets/button.png');


    },

    create: function() {
        game.stage.backgroundColor = '#ADD8E6';

        // Skapar tilemappen
        this.map = this.game.add.tilemap('test');
        this.map.addTilesetImage('spritesheet', 'tiles');
        this.layerGround = this.map.createLayer('ground');
        this.layerBackground = this.map.createLayer('background');
        
        this.game.add.sprite(200, 100, 'menu');
        
        this.button = game.add.button(325, 300, 'button', this.actionOnClick);

        
        this.layerBackground.resizeWorld();
        this.layerGround.resizeWorld();
        this.layerBackground.debug = true;
        this.layerGround.debug = true;



    },

    actionOnClick: function() {
        console.log('jag är en knapp');
        this.game.state.start('level1');
    //background.visible =! background.visible;
    },

    update: function() {

    }

}