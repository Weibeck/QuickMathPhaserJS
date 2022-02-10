
var menuAnimation = [];
var menuState = {
    create: function () {
        // Create world 
        this.createWorld();
        
        // Reset global variable level
        game.global.level = 0;
        
        // Add logo
        var logoMaff = game.add.image(250, 150, 'logo');
        logoMaff.anchor.setTo(0.5, 0.5);
        logoMaff.scale.setTo(0.3, 0.3);

        // Add buttons
        // Plus Math Button
        this.startPlus = game.add.button(250, 300, 'startPlusMath', this.startPlusMath, this);
        this.startPlus.anchor.setTo(0.5, 0.5);
        this.startPlus.alpha = 1;
        
        // Minus Math Button
        this.startMinus = game.add.button(250, 350, 'startMinusMath', this.startMinusMath, this);
        this.startMinus.anchor.setTo(0.5, 0.5);
        this.startMinus.alpha = 1;
        
        // How To Play Button
        this.howToPlayBut = game.add.button(250, 400, 'howToPlayBut', this.startHowToPlay, this);
        this.howToPlayBut.anchor.setTo(0.5, 0.5);
        this.howToPlayBut.alpha = 1;
        
        // Mute Button
        this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound, this);
        this.muteButton.frame = game.sound.mute ? 1 : 0;

        // Check cache for bestscore data
        if (!localStorage.getItem('bestScore')) {
            // Create & set bestscore in cache to 0
            localStorage.setItem('bestScore', 0);
        }
        // Minus score
        if (!localStorage.getItem('bestScoreMinus')) {
            localStorage.setItem('bestScoreMinus', 0);
        }

        // text for score
        var scoreTextingz = 'Best Plus Score: ' + localStorage.getItem('bestScore') + '\nBest Minus Score: ' + localStorage.getItem('bestScoreMinus');

        // Create text for score
        var scoreLabel = game.add.text(game.width / 2, 225, scoreTextingz, {
            font: '15px Press Start 2P',
            fill: '#ffffff',
            align: 'center'
        });
        scoreLabel.anchor.setTo(0.5, 0.5);

        // Add boxes to background
        for (var i = 0; i < 4; i++) {
            menuAnimation[i] = game.add.sprite(game.rnd.integerInRange(10, 400), game.rnd.integerInRange(170, 250), 'block' + i);
            game.physics.enable(menuAnimation[i], Phaser.Physics.ARCADE);
            menuAnimation[i].body.collideWorldBounds = true;
            menuAnimation[i].body.velocity.setTo(game.rnd.integerInRange(-50, 50));
            menuAnimation[i].body.gravity.setTo(0, game.rnd.integerInRange(170, 190));
            menuAnimation[i].body.bounce.setTo(1);
            game.world.sendToBack(menuAnimation[i]);
        }
        
        // Old Code to spawn boxes to background
          /*     menuAnimation = game.add.sprite(260, 230, 'blockOne');
        game.physics.enable(menuAnimation, Phaser.Physics.ARCADE);
        menuAnimation.body.collideWorldBounds = true;
        menuAnimation.body.velocity.setTo(50);
        menuAnimation.body.gravity.setTo(0, 180);
        menuAnimation.body.bounce.setTo(1);
        game.world.sendToBack(menuAnimation);

        menuAnimation1 = game.add.sprite(100, 230, 'blockTwo');
        game.physics.enable(menuAnimation1, Phaser.Physics.ARCADE);
        menuAnimation1.body.collideWorldBounds = true;
        menuAnimation1.body.velocity.setTo(40);
        menuAnimation1.body.gravity.setTo(0, 190);
        menuAnimation1.body.bounce.setTo(1);
        game.world.sendToBack(menuAnimation1);

        menuAnimation2 = game.add.sprite(300, 250, 'blockThree');
        game.physics.enable(menuAnimation2, Phaser.Physics.ARCADE);
        menuAnimation2.body.collideWorldBounds = true;
        menuAnimation2.body.velocity.setTo(-5);
        menuAnimation2.body.gravity.setTo(0, 190);
        menuAnimation2.body.bounce.setTo(1);
        game.world.sendToBack(menuAnimation2);

        menuAnimation3 = game.add.sprite(50, 170, 'blockFour');
        game.physics.enable(menuAnimation3, Phaser.Physics.ARCADE);
        menuAnimation3.body.collideWorldBounds = true;
        menuAnimation3.body.velocity.setTo(-10);
        menuAnimation3.body.gravity.setTo(0, 190);
        menuAnimation3.body.bounce.setTo(1);
        game.world.sendToBack(menuAnimation3);*/
        
        // Send layer to back 
        game.world.sendToBack(this.layer);

        // Local Variable for delay
        var delay = 0;
        // for loop til at spawne 10 x 4 stjerner
        for (var i = 0; i < 10; i++) {
            // spawn stjerner
            var sprite = game.add.sprite(game.rnd.integerInRange(20, 480), -40, 'ball');
            var sprite2 = game.add.sprite(game.rnd.integerInRange(20, 480), -20, 'ball-2');
            var sprite3 = game.add.sprite(game.rnd.integerInRange(20, 480), -30, 'ball-4');
            var sprite4 = game.add.sprite(game.rnd.integerInRange(20, 480), -40, 'ball-3');
            game.world.sendToBack(sprite);
            game.world.sendToBack(sprite2);
            game.world.sendToBack(sprite3);
            game.world.sendToBack(sprite4);
            // Scale en af stjernerne mindre for at skabe bedre flow (real fordi der er decimal)
            sprite2.scale.set(game.rnd.realInRange(0.1, 0.6));
            // speed variable (random)
            var speed = game.rnd.between(500, 5000);
            // Tween hvordan stjernerne falder
            game.add.tween(sprite).to({
                y: 800
            }, (speed + Math.random()), Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
            delay += 40;
            game.add.tween(sprite2).to({
                y: 1000
            }, (speed + Math.random()), Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
            delay += 20;
            game.add.tween(sprite3).to({
                y: 1200
            }, (speed + Math.random()), Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
            delay += 80;
            game.add.tween(sprite4).to({
                y: 1800
            }, (speed + Math.random()), Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
            delay += 50;
        }

        // Add menu sound
        this.menuSound = game.add.audio('menuSound')
        this.menuSound.loop = true;
        this.menuSound.volume = 0.1;

        // Play if not playing
        if (this.menuSound.isPlaying == false) {
            this.menuSound.play();
        }
    },
    update: function () {
        // Check collisions
        game.physics.arcade.collide(menuAnimation[0], this.layer);
        game.physics.arcade.collide(menuAnimation[1], this.layer);
        game.physics.arcade.collide(menuAnimation[2], this.layer);
        game.physics.arcade.collide(menuAnimation[3], this.layer);
    },
    // Create world through tilemap
    createWorld: function () {
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('tileset', 'tilesetImage');
        this.layer = this.map.createLayer('walls');
        this.layer.resizeWorld();
        this.map.setCollision(1);
    },

    // Sound function
    toggleSound: function () {
        game.sound.mute = !game.sound.mute;
        this.muteButton.frame = game.sound.mute ? 1 : 0;
    },

    // Start countdown
    start: function () {
        this.menuSound.stop();
        game.state.start('countdown');
    },

    // Start Plus math & set level variable
    startPlusMath: function () {
        this.menuSound.stop();
        game.global.level = 1;
        game.state.start('countdown');
    },

    // Start Minus math & set level variable
    startMinusMath: function () {
        this.menuSound.stop();
        game.global.level = 0;
        game.state.start('countdown');
    },

    // Start how to play state
    startHowToPlay: function () {
        this.menuSound.stop();
        game.state.start('howtoplay');
    }
};
