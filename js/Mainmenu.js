MainMenu = function(game) {

    this.game = game;
    this.map = null;
    this.layerGround = null;
    this.layerBackground = null;
    this.layerDoor = null;
    this.button = null;
    this.level = null;

}

MainMenu.prototype = {

    create: function() {
        //game.stage.backgroundColor = '#ADD8E6';
        var spriteBack = this.game.add.sprite(0, 0, 'background');
        spriteBack.alpha = 0.4;

        // Skapar tilemappen (bakgrunden)
        this.map = this.game.add.tilemap('test2');
        this.map.addTilesetImage('spritesheetV2', 'tiles2');
        this.layerGround = this.map.createLayer('ground');
        this.layerBackground = this.map.createLayer('background');
        this.layerDoor = this.map.createLayer('door');

        this.layerGround.alpha = 0.4;
        this.layerBackground.alpha = 0.4;
        this.layerDoor.alpha = 0.4;
        
        this.game.add.sprite(200, 100, 'menu');
        
        this.button = game.add.button(325, 220, 'newGame', this.actionOnClick, this);
        this.button = game.add.button(325, 270, 'levels', this.showLevels, this);
        
        this.layerBackground.resizeWorld();
        this.layerGround.resizeWorld();
    },

    actionOnClick: function() {
        this.game.currentLevel = 1;
        this.game.state.start('game');
    },
    showLevels: function() {
        this.game.state.start('levels');
    },

}