var countDownState = {

    create: function () {
        // Create 3 seconds event
        game.time.events.add(Phaser.Timer.SECOND * 3, this.startGame, this);
    },

    // Start next state
    startGame: function () {
        if (game.global.level == 1){
            game.state.start('play');
        } else {
        game.state.start('playminus');
        }
    },
    
    // Show timer in debug text
    render: function () {
        game.debug.text("Game starts in: " + Math.round(game.time.events.duration / 1000  ), 170, 400);
    }

};
