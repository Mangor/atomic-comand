import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
    init() {}

    preload() {
        // this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
        // this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
        // centerGameObjects([this.loaderBg, this.loaderBar]);
        // this.load.setPreloadSprite(this.loaderBar);
        //
        // load your assets
        //

        this.load.image('mushroom', 'assets/img/mushroom2.png');
        this.game.load.shader('oldWorldTerminal', 'assets/shaders/oldWorldTerminal.frag');
    }

    create() {
        let text = this.add.text(this.world.centerX, this.game.height - 30, 'Press \'space\' key to start', {
            font: '16px Arial',
            fill: '#0f0',
            align: 'center'
        });
        text.anchor.setTo(0.5, 0.5);
        text.alpha = 0.1;
        var tween = game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true);
        tween.repeat(-1, 2000);
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'splash');
        this.game.input.keyboard.onDownCallback = () => {
            if (game.input.keyboard.event.keyCode == 32) {
                this.state.start('Game');
            }
            //console.log(game.input.keyboard.event.keyCode);
        };

        var scanlineFilter = new Phaser.Filter(game, null, this.game.cache.getShader('oldWorldTerminal'));
        this.game.world.filters = [scanlineFilter];
    }
}
