class Model {
    constructor() {
        this.numberOfColors = 4;
        this.score = 0;

        this._musicOn = true;
        this._sfxOn = true;
    }

    // setter - takes the place of the variable
    set musicOn(val) {
        this._musicOn = val;
        console.log(val);
        mt.emitter.emit(mt.constants.MUSIC_CHANGED);
    }

    get musicOn() {
        return this._musicOn;
    }

    set sfxOn(val) {
        this._sfxOn = val;
        mt.emitter.emit(mt.constants.SOUND_CHANGED);
    }

    get sfxOn() {
        return this._sfxOn;
    }
}
