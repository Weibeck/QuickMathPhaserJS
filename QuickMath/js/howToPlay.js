var howToPlayState = {

    create: function () {
        // Create Sprite & Add animation 
        this.spriteHowToPlay = game.add.sprite(0, 0, 'howToPlay');
        this.spriteHowToPlay.animations.add('changeFrame');
        this.spriteHowToPlay.animations.play('changeFrame', 0.2, true);
    },

    update: function () {
        // Check when to return to menu
        if (this.spriteHowToPlay.animations.currentAnim.frame > 3) {
            this.goBackToMenu();
        }
    },
        // Back to menu state   
    goBackToMenu: function () {
        game.state.start('menu');
    }

};
