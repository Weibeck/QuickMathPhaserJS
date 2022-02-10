var loadState = {
    preload: function () {
        // Add a 'loading...' label for this state
        var loadingLabel = game.add.text(game.width / 2, game.height / 2,
            'loading...', {
                font: '30px Press Start 2P',
                fill: '#ffffff'
            });
        loadingLabel.anchor.setTo(0.5, 0.5);
        // Display the progress bar
        var progressBar = game.add.sprite(game.width / 2, 450,
            'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        // This function will be executed at the beginning
        // That's where we load the game's assets
        game.load.image('block0', 'assets/blockOne.png'); // https://piq.codeus.net/picture/22004/question-block
        game.load.image('block1', 'assets/blockTwo.png'); // https://piq.codeus.net/picture/22004/question-block
        game.load.image('block2', 'assets/blockThree.png'); // https://piq.codeus.net/picture/22004/question-block
        game.load.image('block3', 'assets/blockFour.png'); // https://piq.codeus.net/picture/22004/question-block
        game.load.spritesheet('ship-animated', 'assets/ship-animated.png', 93, 114, 10); // https://github.com/photonstorm/phaser-examples/archive/master.zip
        game.load.image('bullet', 'assets/bullet.png') // https://github.com/photonstorm/phaser-examples/archive/master.zip
        game.load.image('tilesetImage', 'assets/tileset.png');
        game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('ball', 'assets/star-1.png');
        game.load.image('ball-2', 'assets/star-2.png');
        game.load.image('ball-3', 'assets/star-3.png');
        game.load.image('ball-4', 'assets/star-4.png');
        game.load.image('startPlusMath', 'assets/plus_button.png');
        game.load.image('startMinusMath', 'assets/minus_button.png')
        game.load.image('howToPlayBut', 'assets/help_button.png')
        game.load.image('menuBut', 'assets/menu_button.png');
        game.load.image('restartBut', 'assets/restart_button.png');
        game.load.spritesheet('kaboom', 'assets/explosion.png', 128, 128); // https://github.com/photonstorm/phaser-examples/archive/master.zip
        game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
        game.load.image('clock_coin', 'assets/clock_coin.png'); // https://www.iconspng.com/image/49448/pixel-gold-coin og https://piq.codeus.net/picture/47694/mini-clock
        game.load.image('logo', 'assets/logo.png');
        game.load.audio('menuSound', ['assets/menuSound.mp3']); // http://freemusicarchive.org/music/Mr_Spastic/8_to_16_Bit/b3ta_B1t3r
        game.load.audio('gameSound', ['assets/gameSound.mp3']); // http://freemusicarchive.org/music/Komiku/Poupis_incredible_adventures_/Komiku_-_Poupis_incredible_adventures__-_58_Universe_big_takedown
        game.load.audio('laserSound', ['assets/laserSound.wav']); // https://opengameart.org/content/laser-fire
        game.load.audio('explosionSound', ['assets/explosionSound.wav']); // https://opengameart.org/content/9-explosion-sounds
        game.load.audio('gameoverSound', ['assets/gameoverSound.mp3']); // https://grfilms.net/v-sound-effects-pack-3-50-non-copyrighted-sound-effects-good-for-improving-youtube-videos-DoElE2f_QdM.html
        game.load.audio('gameWinSound', ['assets/gameWinSound.mp3']); // https://opengameart.org/content/steppin-up
        game.load.spritesheet('howToPlay', 'assets/how_to_play.png', 520, 791, 5);
    },
    // Go to next state
    create: function () {
        game.state.start('menu');
    }
};
