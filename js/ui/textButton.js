class TextButton extends UIBlock {
    constructor(config) {
        super();
        this.scene = config.scene;

        // in this case 0, 0 is the center of the uiblock
        // adds image to scene and gets reference
        this.back = this.scene.add.image(0, 0, config.key);
        this.back.setInteractive();
        this.back.on('pointerdown', this.pressed, this);
        // // add to the ui block
        this.add(this.back);

        // set a default scale
        if (!config.scale) {
            config.scale = 0.5;
        }

        Align.scaleToGameW(this.back, config.scale);

        if (!config.textScale) {
            config.textScale = 30;
        }

        if (!config.textColor) {
            config.textColor = '#ffffff';
        }

        // scene
        this.textfield = this.scene.add.text(0, 0, config.text, {
            fontSize: game.config.width / config.textScale,
            color: config.textColor
        });
        this.textfield.setOrigin(0.5);
        // uiblock
        this.add(this.textfield);

        if (config.callBack) {
            this.callBack = config.callBack;
        }

        if (config.callBackScope) {
            this.callBackScope = config.callBackScope;
        }

        if (config.event) {
            this.event = config.event;
        }

        if (config.params) {
            this.params = config.params;
        }
    }

    pressed() {
        if (this.callBack) {
            if (this.callBackScope) {
                // call the callBack and set the scope
                this.callBack.call(this.callBackScope);
            } else {
                // apply works like call but scope isn't passed as first param
                this.callBack.apply();
            }
        }

        if (this.event) {
            if (this.params) {
                mt.emitter.emit(this.event, this.params);
            } else {
                mt.emitter.emit(this.event);
            }
        }
    }
}
