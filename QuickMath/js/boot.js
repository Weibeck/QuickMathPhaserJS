var bootState = {
    preload: function () {
        // load assets for this state
        game.load.image('startBut', 'assets/start_button.png');
        game.load.image('progressBar', 'assets/progressBar.png');
    },

    create: function () {
        // game settings
        game.stage.backgroundColor = '#000000';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;

        // Chrome enable autoplay http://www.html5gamedevs.com/topic/37399-games-sounds-suddenly-stopped-playing-and-browser-console-says-the-audiocontext-was-not-allowed-to-start/
        this.game.input.onDown.addOnce(() => {
            this.game.sound.context.resume();
        });

        // Start Button
        this.mBut = game.add.button(250, 400, 'startBut', this.nextState, this);
        this.mBut.anchor.setTo(0.5, 0.5);
        this.mBut.alpha = 1;
    },

    // Next State function
    nextState: function () {

        game.state.start('load');

    }
};
