Levels = function(game) {

    this.game = game;
    this.map = null;
    this.layerGround = null;
    this.layerBackground = null;
    this.layerDoor = null;
    this.button = null;
    this.level = null;

}

Levels.prototype = {

    create: function() {
        //game.stage.backgroundColor = '#ADD8E6';
        var spriteBack = this.game.add.sprite(0, 0, 'background');
        spriteBack.alpha = 0.4;

        // Skapar tilemappen
        this.map = this.game.add.tilemap('test2');
        this.map.addTilesetImage('spritesheetV2', 'tiles2');
        this.layerGround = this.map.createLayer('ground');
        this.layerBackground = this.map.createLayer('background');
        this.layerDoor = this.map.createLayer('door');

        this.layerGround.alpha = 0.4;
        this.layerBackground.alpha = 0.4;
        this.layerDoor.alpha = 0.4;
        
        this.game.add.sprite(200, 100, 'menuLevels');
        
        var buttonPosX = 300;

        this.button = game.add.button(buttonPosX, 230, 'lvl1', this.startLvl1, this);
        this.button = game.add.button(buttonPosX += 30, 230, 'lvl2', this.startLvl2, this);
        this.button = game.add.button(buttonPosX += 30, 230, 'lvl3', this.startLvl3, this);
        this.button = game.add.button(buttonPosX += 30, 230, 'lvl4', this.startLvl4, this);
        this.button = game.add.button(buttonPosX += 30, 230, 'lvl5', this.startLvl5, this);
        this.button = game.add.button(buttonPosX += 30, 230, 'lvl6', this.startLvl6, this);
        buttonPosX = 300;
        this.button = game.add.button(buttonPosX, 280, 'lvl7', this.startLvl7, this);
        this.button = game.add.button(buttonPosX += 30, 280, 'lvl8', this.startLvl8, this);
        this.button = game.add.button(buttonPosX += 30, 280, 'lvl9', this.startLvl9, this);
        //this.button = game.add.button(buttonPosX += 30, 280, 'lvl4', this.startLvl4, this);
        //this.button = game.add.button(buttonPosX += 30, 280, 'lvl4', this.startLvl4, this);
        //this.button = game.add.button(buttonPosX += 30, 280, 'lvl4', this.startLvl4, this);
        this.button = game.add.button(320, 340, 'mainMenuButton', this.toMainMenu, this);

        
        this.layerBackground.resizeWorld();
        this.layerGround.resizeWorld();
    },

    startLvl1: function() {
        this.game.currentLevel = 1;
        this.game.state.start('game');
    },

    startLvl2: function() {
        this.game.currentLevel = 2;
        this.game.state.start('game');
    },

    startLvl3: function() {
        this.game.currentLevel = 3;
        this.game.state.start('game');
    },

    startLvl4: function() {
        this.game.currentLevel = 4;
        this.game.state.start('game');
    },

    startLvl5: function() {
        this.game.currentLevel = 5;
        this.game.state.start('game');
    },

    startLvl6: function() {
        this.game.currentLevel = 6;
        this.game.state.start('game');
    },

    startLvl7: function() {
        this.game.currentLevel = 7;
        this.game.state.start('game');
    },

    startLvl8: function() {
        this.game.currentLevel = 8;
        this.game.state.start('game');
    },

    startLvl9: function() {
        this.game.currentLevel = 9;
        this.game.state.start('game');
    },

    toMainMenu: function() {
        this.game.state.start('mainmenu');
    },

}