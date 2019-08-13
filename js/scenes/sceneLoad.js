class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }

    preload() {
        this.progText = this.add
            .text(0, 0, '0%', {
                color: '#ffffff',
                fontSize: game.config.width / 10
            })
            .setOrigin(0.5);
        Align.center(this.progText);

        // to use different effects change the num here
        // and then in scene main change effectNumber
        // when the effect is created
        Effect.preload(this, 5);
        // event listener for load progress
        this.load.on('progress', this.showProgress, this);

        this.load.image('titleBack', 'images/titleBack.jpg');
        this.load.image('btnStart', 'images/btnStart.png');
        // button backs
        this.load.image('blue', 'images/buttons/blue.png');
        this.load.image('green', 'images/buttons/green.png');
        this.load.image('orange', 'images/buttons/orange.png');
        this.load.image('red', 'images/buttons/red.png');

        // this.load.image('sample', 'images/sample.png');

        this.load.audio('right', 'audio/right.wav');
        this.load.audio('wrong', 'audio/wrong.wav');
        this.load.audio('levelUp', 'audio/levelUp.wav');
        this.load.audio('background', 'audio/background.mp3');
    }

    create() {
        // to listen for events,mt is a global variable
        // we use the emiiter inside the controller
        // so it must be created first
        mt.emitter = new Phaser.Events.EventEmitter();
        // global variable so accessible thru entire game code
        mt.controller = new Controller();
        // hook media manager up to global mt
        mt.mediaManager = new MediaManager({ scene: this });

        // after loading all above
        this.scene.start('SceneTitle');
    }

    update() {}

    showProgress(prog) {
        var per = Math.floor((prog / 1) * 100);
        this.progText.setText(per + '%');
    }
}
