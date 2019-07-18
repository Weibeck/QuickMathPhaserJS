    // Initialize Phaser
    var game = new Phaser.Game(520, 800, Phaser.AUTO, 'gameDiv');
    // Define global variable
    game.global = {
        score: 0,
        minus: 0,
        level: 0
    };
    // add states 
    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('countdown', countDownState);
    game.state.add('menu', menuState);
    game.state.add('play', playState);
    game.state.add('playminus', playMinusState);
    game.state.add('howtoplay', howToPlayState)
    // start boot state
    game.state.start('boot')
