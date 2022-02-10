// Globale variabler
var nextShot = 0;
var bullets;
var fireRate = 300;
var boxOne;
var boxTwo;
var boxThree;
var boxFour;
var A;
var B;
var C = 0;
var playerText = "";
var enemyCountDead = 0;
var gameOverText = "";

var playMinusState = {
    // Create function (executes en gang på start)
    create: function () {
        // lokale variabler
        this.countDown = 60;
        this.countDownText = 60;
        this.WPM = 0;
        this.counter = 0;
        game.global.minus = 0;
        score = 0;

        // initiate the world function
        this.createWorld();

        // Create Sounds
        this.gameSound = game.add.audio('gameSound');
        this.gameSound.loop = true;
        this.gameSound.play();
        this.gameSound.volume = 0.04;
        // Laser sound
        this.laserSound = game.add.audio('laserSound');
        this.laserSound.volume = 0.1;
        // Explode sound
        this.explosionSound = game.add.audio('explosionSound');
        this.explosionSound.volume = 0.3;
        // Game over sound
        this.gameoverSound = game.add.audio('gameoverSound');
        this.gameoverSound.volume = 0.1;
        // Game win sound
        this.gameWinSound = game.add.audio('gameWinSound');
        this.gameWinSound.volume = 0.1;

        // Add clock & coin 
        var image = game.add.image(260, 40, 'clock_coin');
        image.anchor.setTo(0.5, 0.5);

        // Locale variable
        var delay = 0;
        // for loop til at spawne 10 x 4 stjerner
        for (var i = 0; i < 10; i++) {
            // spawn stjerner
            var sprite = game.add.sprite(game.rnd.integerInRange(20, 480), -40, 'ball');
            var sprite2 = game.add.sprite(game.rnd.integerInRange(20, 480), -20, 'ball-2');
            var sprite3 = game.add.sprite(game.rnd.integerInRange(20, 480), -30, 'ball-4');
            var sprite4 = game.add.sprite(game.rnd.integerInRange(20, 480), -40, 'ball-3');
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

        // Get keyboard object(up,down,left,right)
        this.cursor = game.input.keyboard.createCursorKeys();

        // Create enemy group
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;

        // Create player 
        this.player = game.add.sprite(260, 700, 'ship-animated');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 0;
        this.player.body.velocity.x = 0;
        // Player animation
        var flyship = this.player.animations.add('flyship');
        this.player.animations.play('flyship', 15, true);

        // Create bullet group - https://phaser.io/examples/v2/arcade-physics/shoot-the-pointer
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(20, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outsideBoundsKill', true);

        //  An explosion pool http://codeperfectionist.com/articles/phaser-js-tutorial-building-a-polished-space-shooter-game-part-3/
        this.explosions = game.add.group();
        this.explosions.enableBody = true;
        this.explosions.physicsBodyType = Phaser.Physics.ARCADE;
        this.explosions.createMultiple(30, 'kaboom');
        this.explosions.setAll('anchor.x', 0);
        this.explosions.setAll('anchor.y', 0);
        this.explosions.forEach(function (explosion) {
            explosion.animations.add('kaboom');
        });

        // Create a score text
        this.scoreLabel = game.add.text(440, 40, '0x', {
            font: '15px Press Start 2P',
            fill: '#ffffff'
        })
        this.scoreLabel.anchor.setTo(0.5, 0.5);
        // Create calculation per minute text
        this.WPM = game.add.text(245, 40, '0', {
            font: '25px Press Start 2P',
            fill: '#ffffff'
        })
        // Create calculation per minute text
        this.mathPerMin = game.add.text(260, 30, 'Math Per Minute', {
            font: '15px Press Start 2P',
            fill: '#ffffff'
        })
        this.mathPerMin.anchor.setTo(0.5, 0.5);
        // Create countdown text
        this.countDownText = game.add.text(80, 45, ' 60', {
            font: '15px Press Start 2P',
            fill: '#ffffff'
        })
        this.countDownText.anchor.setTo(0.5, 0.5);

        // Spawn enemies
        this.createEnemy();

        // Events
        this.timer1 = game.time.events.loop(Phaser.Timer.SECOND, this.counterNow, this);
        this.timer2 = game.time.events.loop(Phaser.Timer.SECOND, this.countDownNow, this);

        // definer R til keyboard input , ondown callback
        var R = game.input.keyboard.addKey(Phaser.Keyboard.R);
        R.onDown.add(this.restartGame, this);
    },

    // Update function (loop 60 per sec)
    update: function () {
        // loop for collision
        game.physics.arcade.collide(bullets, enemies, this.bulletDie,
            null, this);
        game.physics.arcade.collide(this.player, this.layer);
        game.physics.arcade.collide(bullets, this.layer, this.bulletKill, null, this);
        game.physics.arcade.collide(enemies, this.layer, this.playerKill, null, this);
        game.physics.arcade.collide(this.player, enemies, this.playerKill, null, this);


        // loop for controls
        this.playerControl();
        // Shoot control
        if (this.cursor.up.isDown) {
            this.playerShoot();
        }

        // loop for player position
        playerText.x = Math.floor(this.player.x + this.player.width / 2);
        playerText.y = Math.floor(this.player.y + this.player.height / 2 + 35);

        // loop when to spawn new enemies
        if (enemyCountDead == 4) {
            this.createEnemy();
        }

        // loop for game complete
        if (this.countDown == 0) {
            this.gameComplete();
        }

        if (this.countDown > 30 && this.countDown < 45) {
            boxOne.body.velocity.y = 50;
            boxTwo.body.velocity.y = 50;
            boxThree.body.velocity.y = 50;
            boxFour.body.velocity.y = 50;
        } else if (this.countDown < 30) {
            boxOne.body.velocity.y = 75;
            boxTwo.body.velocity.y = 75;
            boxThree.body.velocity.y = 75;
            boxFour.body.velocity.y = 75;
        }
    },

    // counter til calculation per minute
    counterNow: function () {
        this.counter++;
        this.WPM.setText(Math.round(((score / this.counter) * 60)));
    },

    // counter til 1 minut countdown
    countDownNow: function () {
        this.countDown--;
        this.countDownText.setText(" " + Math.round(this.countDown));

    },

    // Create world through tilemap
    createWorld: function () {
        this.map = game.add.tilemap('map');
        this.map.addTilesetImage('tileset', 'tilesetImage');
        this.layer = this.map.createLayer('walls');
        this.layer.resizeWorld();
        this.map.setCollision(1);
    },

    // Control the player with arrow keys
    playerControl: function () {
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -550;
        } else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 550;
        } else {
            this.player.body.velocity.x = 0;
        }
    },

    // Shoot function
    playerShoot: function () {
        if (game.time.now > nextShot && bullets.countDead() > 0 && this.player.alive == true) {
            nextShot = game.time.now + fireRate;
            var bullet = bullets.getFirstDead(); // tjek om der er bullets er døde, eller har vi ikke nogen at spawne
            bullet.reset(this.player.x - 8, this.player.y - 65); // reset til at spawne bullet sprite på current player position
            game.physics.arcade.moveToXY(bullet, this.player.x, -10, 1000);
            this.laserSound.play();
        }

    },

    // Spawn boxes function
    createEnemy: function () {
        boxOne = enemies.create(35, 70, 'block0');
        boxOne.value = 1;
        boxOne.body.velocity.y = 35;
        boxOne.alpha = 0.6;

        boxTwo = enemies.create(150, 70, 'block1');
        boxTwo.value = 2;
        boxTwo.body.velocity.y = 35;
        boxTwo.alpha = 0.6;

        boxThree = enemies.create(265, 70, 'block2');
        boxThree.value = 3;
        boxThree.body.velocity.y = 35;
        boxThree.alpha = 0.6;

        boxFour = enemies.create(380, 70, 'block3');
        boxFour.value = 4;
        boxFour.body.velocity.y = 35;
        boxFour.alpha = 0.6;

        // timeout function to spawn boxes with a delay
        setTimeout(function () {
            game.add.tween(boxOne).to({
                alpha: 1
            }, 100, Phaser.Easing.None, true);
            game.add.tween(boxTwo).to({
                alpha: 1
            }, 400, Phaser.Easing.None, true);
            game.add.tween(boxThree).to({
                alpha: 1
            }, 700, Phaser.Easing.None, true);
            game.add.tween(boxFour).to({
                alpha: 1
            }, 1000, Phaser.Easing.None, true);
        }, 200);

        // We reset the dead counter
        enemyCountDead = 0;
        // We make a math problem 
        this.makeProblem();
    },

    // Kill bullets function
    bulletKill: function (bullets, layer) {
        bullets.kill();
    },

    // Kill boxes function
    bulletDie: function (bullets, enemies) {
        if (enemies.value == C) {
            bullets.kill();
            enemies.kill();
            this.explosionSound.play();
            playerText.kill();
            this.mathProblem();
            enemyCountDead++; // We count every enemy we kill to know when to respawn
            score += 1;
            this.scoreLabel.text = score + "x";
            //  And create an explosion
            var explosion = this.explosions.getFirstExists(false); // samme koncept som bullets spawn 
            explosion.reset(enemies.body.x, enemies.body.y);
            explosion.play('kaboom', 23, false, true);
        } else if (enemies.value != C) {
            bullets.kill();
            this.playerKill();
        }
    },

    // player kill function
    playerKill: function (bullets) {
        boxOne.kill();
        boxTwo.kill();
        boxThree.kill();
        boxFour.kill();
        this.player.kill();
        playerText.kill();
        game.time.events.remove(this.timer1);
        game.time.events.remove(this.timer2);
        this.gameSound.stop();
        this.gameoverSound.play();
        // Explode player
        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(this.player.body.x, this.player.body.y);
        explosion.play('kaboom', 30, false, true);
        // print game over text
        gameOverText = game.add.text(250, 300, 'Game Over', {
            font: '50px Press Start 2P',
            fill: '#ffffff'
        })
        gameOverText.anchor.set(0.5);
        // restart
        var restartButton = game.add.button(175, 375, 'restartBut', this.restartGame, this);
        restartButton.anchor.setTo(0.5, 0.5);
        // menu
        var menuButton = game.add.button(350, 375, 'menuBut', this.returnMenu, this);
        menuButton.anchor.setTo(0.5, 0.5);
    },

    // Create math problem function
    makeProblem: function () {
        var found = false;
        while (!found) {
            A = game.rnd.integerInRange(1, 8);
            B = game.rnd.integerInRange(2, 8);
            C = A - B;
            if (!(C > 4 || C < 1)) {
                found = true;
            }
        }
        if (found) { // If we find valid numbers then loop it to check against boxes
            this.mathProblem();
        }
    },

    // Loop function, check if result matches a box 
    mathProblem: function () {
        // to avoid "Maximum call stack size exceeded." we return if everything is dead
        if (enemies.countLiving() < 1) {
            return;
            // We loop every box to check if our problem match with ALIVE box
        } else if (C == boxOne.value && boxOne.alive == false) {
            this.makeProblem();
        } else if (C == boxTwo.value && boxTwo.alive == false) {
            this.makeProblem();
        } else if (C == boxThree.value && boxThree.alive == false) {
            this.makeProblem();
        } else if (C == boxFour.value && boxFour.alive == false) {
            this.makeProblem();
            // if it matches, then we print the problem
        } else {
            this.printMath();

        }

    },

    // Print the problem on the ship
    printMath: function () {
        var playerStyle = {
            font: "25px Arial",
            fill: "#ffffff",
            wordWrap: true,
            align: "center",
        };
        playerText = game.add.text(0, 0, A + " - " + B + " =", playerStyle);
        playerText.anchor.set(1.05);
    },

    gameComplete: function () {
        if (this.gameWinSound.isPlaying == false) {
            // Kill remaining boxes
            boxOne.kill();
            boxTwo.kill();
            boxThree.kill();
            boxFour.kill();
            // Stop sounds
            this.gameSound.stop();
            this.laserSound.stop();
            this.explosionSound.stop();
            // Stop events
            game.time.events.remove(this.timer1);
            game.time.events.remove(this.timer2);
            // Play win sound
            this.gameWinSound.play();
            // Define new highscore so we can check if its higher
            game.global.minus = Math.round(((score / this.counter) * 60));
            // If the score is higher than the best score
            if (game.global.minus > localStorage.getItem('bestScoreMinus')) {
                // Then update the best score
                localStorage.setItem('bestScoreMinus', game.global.minus);
            }
            var goodGameText = game.add.text(260, 300, 'Good Game!', {
                font: '50px Press Start 2P',
                fill: '#ffffff'
            })
            goodGameText.anchor.setTo(0.5);
            // restart
            var restartButton = game.add.button(175, 475, 'restartBut', this.restartGame, this);
            restartButton.anchor.setTo(0.5, 0.5);
            // menu
            var menuButton = game.add.button(350, 475, 'menuBut', this.returnMenu, this);
            menuButton.anchor.setTo(0.5, 0.5);
            // print game complete
            gameCompleteText = game.add.text(250, 350, 'MPM: ' + Math.round(((score / this.counter) * 60)), {
                font: '25px Press Start 2P',
                fill: '#ffffff'
            })
            gameCompleteText.anchor.set(0.5);
            // pick evaluation
            if (Math.round((score / this.counter) * 60 <= 25)) {
                var textSummary = "Practice more!"
            } else if (Math.round((score / this.counter) * 60 <= 45)) {
                var textSummary = "Getting Better!"
            } else if (Math.round((score / this.counter) * 60 <= 60)) {
                var textSummary = "Good Job!"
            } else if (Math.round((score / this.counter) * 60 >= 60)) {
                var textSummary = "LEGENDARY PLAYED!"
            }
            var printSummary = game.add.text(260, 400, textSummary, {
                font: '25px Press Start 2P',
                fill: '#ffffff'
            })
            printSummary.anchor.setTo(0.5);
        } else {
            return;
        }
    },

    restartGame: function () {
        this.gameoverSound.stop();
        this.gameWinSound.stop();
        this.gameSound.stop();
        game.state.start('countdown');
    },

    returnMenu: function () {
        this.gameSound.stop();
        this.gameWinSound.stop();
        this.gameoverSound.stop();
        game.state.start('menu');
    }
};
