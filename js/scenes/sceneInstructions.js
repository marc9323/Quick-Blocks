class SceneInstructions extends Phaser.Scene {
    constructor() {
        super('SceneInstructions');
    }

    preload() {
        //
    }

    create() {
        this.aGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });

        this.back = this.add.image(0, 0, 'titleBack');
        this.back.setOrigin(0, 0);
        this.back.displayWidth = game.config.width;
        this.back.displayHeight = game.config.height;

        // use titleBack temporarily vs 'sample'
        this.sampleImage = this.add.image(0, 0, 'titleBack').setOrigin(0.5);
        Align.scaleToGameW(this.sampleImage, 1); // .5
        Align.scaleToGameH(this.sampleImage, 1); // remove
        Align.center(this.sampleImage); // remove
        //this.aGrid.placeAtIndex(27, this.sampleImage);

        this.text1 = this.add.text(
            0,
            0,
            'Click the same color block\n as the center block\nbefore time runs out',
            {
                color: '#000000',
                fontSize: game.config.width / 30,
                backgroundColor: '#ffffff'
            }
        );
        this.text1.setOrigin(0.5, 0.5);
        this.aGrid.placeAtIndex(71, this.text1);

        this.btnStart = new TextButton({
            scene: this,
            key: 'green',
            event: mt.constants.SHOW_TITLE,
            text: 'Home',
            params: this.scene,
            scale: 0.35,
            textScale: 25, // in textbutton we use to divide width by
            textColor: '#ffffff'
        });

        this.aGrid.placeAtIndex(93, this.btnStart);

        // this.aGrid.showNumbers();
    }

    update() {
        //
    }
}
