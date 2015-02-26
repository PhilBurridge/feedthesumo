Preloader = function(game) {};

Preloader.prototype = {

    preload: function() {
        // Menu
        this.game.load.image('menu', './assets/menu/mainMenu.png');
        this.game.load.image('menuLevels', './assets/menu/levelsMenuV2.png');
        this.game.load.image('newGame', './assets/menu/newGameButtonV2.png');
        this.game.load.image('levels', './assets/menu/levelButtonV2.png');
        // Knappar
        this.game.load.image('lvl1', './assets/menu/levelOneButtonV2.png');
        this.game.load.image('lvl2', './assets/menu/levelTwoButtonV2.png');
        this.game.load.image('lvl3', './assets/menu/levelThreeButtonV2.png');
        this.game.load.image('lvl4', './assets/menu/levelFourButtonV2.png');
        this.game.load.image('lvl5', './assets/menu/levelFiveButton.png');
        this.game.load.image('lvl6', './assets/menu/levelSixButton.png');
        this.game.load.image('lvl7', './assets/menu/levelSevenButton.png');
        this.game.load.image('lvl8', './assets/menu/levelEightButton.png');
        this.game.load.image('lvl9', './assets/menu/levelNineButton.png');
        this.game.load.image('restart', './assets/menu/knappRestart.png');
        this.game.load.image('mainMenuButton', './assets/menu/mainMenuButtonV2.png');
        // TIMES UP MENU
        this.game.load.image('timesUpMenu', './assets/menu/timesUpMenu.png');
        this.game.load.image('timesUpNextLevelButton', './assets/menu/timesUpNextLevel.png');
        this.game.load.image('timesUpNextRestart', './assets/menu/timesUpRestart.png');
        this.game.load.image('timesUpWeight', './assets/menu/timesUpWeight.png');
        this.game.load.image('timesUpYouLost', './assets/menu/timesUpYouLost.png');
        this.game.load.image('timesUpYouWon', './assets/menu/youWonText.png');
        this.game.load.image('timesUpMoreFood', './assets/menu/timesUpMoreFood.png');
        this.game.load.image('enemySumo', './assets/sumo/enemySumo.png');
        this.game.load.image('expl1', './assets/sumo/sumoExpl1.png');
        this.game.load.image('expl2', './assets/sumo/sumoExpl2.png');
        this.game.load.image('expl3', './assets/sumo/sumoExpl3.png');
        //
        // MAP
        //
        this.game.load.tilemap('test2', './assets/map/level1v04.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles2', './assets/map/spritesheetV2.png');
        this.game.load.image('background', 'assets/map/backgroundV4.png');

        //
        //  DIV
        //
        this.game.load.image('sumoGreen', 'assets/sumo/lonleySumo.png');
        this.game.load.image('meatStick', 'assets/food/meat_bone.png');
        this.game.load.image('chicken', 'assets/food/chicken.png');
        this.game.load.image('cake', 'assets/food/cake.png');
        this.game.load.image('bird', 'assets/div/bird1.png');
        this.game.load.image('birdFood', 'assets/div/birdFood.png');
        this.game.load.image('ribs', 'assets/food/ribs.png');
        this.game.load.image('shootFire', 'assets/player/shootFire.png');
        this.game.load.image('explosion', 'assets/div/explosion.png');
        this.game.load.image('hungryBubble', 'assets/sumo/feedMeBubbleFirst.png');
        this.game.load.image('foodCart', 'assets/div/foodCart.png');
        this.game.load.spritesheet('baddie', 'assets/div/baddie.png', 32, 32);

        // Player
        this.game.load.spritesheet('player', 'assets/player/dude.png', 32, 48);

        // Laddar ljud
        game.load.audio('dmg', 'assets/sound/TakeDamage7.wav');
        game.load.audio('birdSound', 'assets/sound/birdSound.m4a');
        game.load.audio('pickUp', 'assets/sound/pickUp1.m4a');
        game.load.audio('eating', 'assets/sound/eatingSumo2.m4a');
        game.load.audio('explosion', 'assets/sound/explosion.m4a');
    },
    create: function() {
        this.game.state.start('mainmenu');
    }
};