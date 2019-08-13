//var game;
// var model;
// var emitter;

var mt; // minimal template

window.onload = function() {
    var isMobile = navigator.userAgent.indexOf('Mobile');
    if (isMobile == -1) {
        // 'Mobile' not present
        isMobile = navigator.userAgent.indexOf('Tablet');
    }
    var w = 480;
    var h = 640;
    if (isMobile != -1) {
        // we are on a mobile device
        w = window.innerWidth;
        h = window.innerHeight;
    }
    var config = {
        type: Phaser.AUTO,
        width: w,
        height: h,
        parent: 'phaser-game',
        scene: [
            SceneLoad,
            SceneTitle,
            SceneInstructions,
            SceneSettings,
            SceneMain,
            SceneOver
        ]
    };
    mt = {};
    mt.model = new Model();
    game = new Phaser.Game(config);
    mt.game = game;
    mt.constants = new Constants();
};

// set height and width of the config object to the height and width of
// the device screen only if we are on a mobile device
// on a laptop or desktop we want the game to be 640- x 480
