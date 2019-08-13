class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        //load our images or sounds
        this.load.spritesheet('blocks', 'images/blocks.png', {
            frameWidth: 64,
            frameHeight: 84
        });

        this.load.image('btnPlayAgain', 'images/btnPlayAgain.png');
        this.load.image('btnStart', 'images/btnStart.png');
    }
    create() {
        mt.mediaManager.setBackground('background');
        this.blockGroup = this.add.group();
        this.clickLock = false;
        this.colorArray = [];
        this.centerBlock = null;

        for (var i = 0; i < 25; i++) {
            var color = Phaser.Math.Between(0, mt.model.numberOfColors);
            this.colorArray.push(color);
        }
        //define our objects
        var xx = 0; // x position of the block
        var yy = 0;
        var k = 0; // counter
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                var block = this.add.image(0, 0, 'blocks');
                this.blockGroup.add(block);
                block.displayWidth = game.config.width / 5;
                block.displayHeight = game.config.height / 5;
                block.setFrame(this.colorArray[k]);
                // block.setOrigin(0, 0);
                // offset
                block.x = xx + block.displayWidth / 2;
                block.y = yy + block.displayHeight / 2;
                if (i == 2 && j == 2) {
                    this.centerBlock = block;
                } else {
                    block.setInteractive();
                }
                xx += block.displayWidth;
                k++;
            }
            xx = 0;
            yy += block.displayHeight;
        }
        this.colorArray[12] = -1;

        this.pickColor();

        this.input.on('gameobjectdown', this.selectBlock, this);

        this.timer = new CircleTimer({ scene: this });
        this.timer.x = this.centerBlock.x;
        this.timer.y = this.centerBlock.y;

        this.timer.setCallback(this.timeUp, this);
        this.timer.start();

        this.scoreText = this.add
            .text(0, 0, '0', {
                fontSize: game.config.width / 10,
                color: '#000000'
            })
            .setOrigin(0.5);
        Align.center(this.scoreText);
    }

    timeUp() {
        // if time elapses - game over
        this.doGameOver();
    }

    selectBlock(pointer, block) {
        // if the frame of the block clicked is the same
        // as that of the center block
        if (this.clickLock) {
            console.log('locked');
            return;
        }
        if (block.frame.name == this.centerBlock.frame.name) {
            block.removeInteractive();
            this.fall(block);
            this.pickColor();

            // play effect
            var effect = new Effect({ scene: this, effectNumber: 5 });
            //Align.center(effect);
            effect.x = block.x;
            effect.y = block.y;

            mt.model.score++;
            mt.mediaManager.playSound('right');
            this.scoreText.setText(mt.model.score);
        } else {
            // if you pick a wrong color - game over
            mt.mediaManager.playSound('wrong');
            this.doGameOver();
            return;
        }

        this.timer.reset();
    }

    fall(block) {
        this.tweens.add({
            targets: block,
            duration: 1000,
            scaleX: 0,
            scaleY: 0
        });
    }

    pickColor() {
        // take an element off the first of the array
        //var color = this.colorArray.shift();
        // instead
        // pick a random element from the array and splice

        // the scene restarts but the model retains
        // data critical to the game - in this case
        // the numberOfColors variable
        if (this.colorArray.length == 0) {
            mt.mediaManager.playSound('levelUp');
            mt.model.numberOfColors++;
            if (mt.model.numberOfColors > 7) {
                mt.model.numberOfColors = 7;
            }
            mt.mediaManager.stopMusic();
            this.scene.restart();
            // next level
            return;
        }

        var index = Phaser.Math.Between(0, this.colorArray.length - 1);
        var color = this.colorArray.splice(index, 1);
        // this returns an array with first element being the number
        // to make sure it works on all browsers
        var color = color[0]; // or tack on [0] to above line

        if (color == -1) {
            this.pickColor();
            return;
        }
        this.centerBlock.setFrame(color);
    }

    doGameOver() {
        mt.mediaManager.stopMusic();
        // when game over player can't click blocks anymore
        this.clickLock = true;
        this.timer.visible = false;
        this.timer.stop();
        // loop through the blockGroup and make all remaining fall
        this.blockGroup.children.iterate(child => {
            this.fall(child);
        });
        // if function() was passed this would need to be bound like
        // .bind(this);
        this.time.addEvent({
            delay: 1200,
            callback: this.doGameOver2,
            callbackScope: this,
            loop: false
        });
    }

    doGameOver2() {
        this.scene.start('SceneOver');
    }

    update() {
        //constant running loop
    }
}
