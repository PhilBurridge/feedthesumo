Preloader = function(game) {};

Preloader.prototype = {

    preload: function() {
        // Menu
        this.game.load.tilemap('test', './assets/test21by21.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', './assets/spritesheet.png');
        this.game.load.image('menu', './assets/startscreen.png');
        this.game.load.image('button', './assets/button.png');
        // Level1
        //
        // MAP
        //
        this.game.load.tilemap('test2', './assets/level1v03.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles2', './assets/spritesheetV2.png');
        this.game.load.image('finish', 'assets/text.png');

        //
        //  DIV
        //
        this.game.load.image('sumoGreen', 'assets/lonleySumo.png');    
        this.game.load.image('food', 'assets/star.png');
        this.game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        // Player
        this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);

        // Laddar ljud
        game.load.audio('dmg', 'assets/sound/TakeDamage7.wav');
    },
    create: function() {
        this.game.state.start('mainmenu');
    }
};