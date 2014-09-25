HUD = function(game) {
    this.game = game;
    this.score = 0;
    this.scoreText = null;
    this.gameTime = 0;
    this.gameTimeText = null;
};

HUD.prototype = {

    create: function() {
        this.scoreText = this.game.add.text(16, 16, 'Weight Gain: 0kg', { fontSize: '32px', fill: '#00FF00' });
        this.gameTimeText = this.game.add.text(300, 16, 'Time: 0', { fontSize: '32px', fill: '#00FF00' });
    },


    update: function() {
        this.gameTime = Math.round((this.game.time.now - this.game.time._started)/1000);
        this.gameTimeText.text = 'Time: ' + this.gameTime;
    }  
}
