import Phaser from 'phaser';
import WebFont from 'webfontloader';

export default class extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#000';
        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);
    }

    preload() {
        WebFont.load({
            google: {
                families: ['Nunito']
            },
            active: this.fontsLoaded
        });

        let text = this.add.text(this.world.centerX, this.world.centerY, 'Planning diversion...', {
            font: '16px Arial',
            fill: '#0f0',
            align: 'center'
        });
        text.anchor.setTo(0.5, 0.5);

        //this.load.image('loaderBg', './assets/img/loader-bg.png');
        //this.load.image('loaderBar', './assets/img/loader-bar.png');
        this.load.image('splash', 'assets/img/splash.svg');
    }

    render() {
        if (this.fontsReady) {
            this.state.start('Splash');
        }
    }

    fontsLoaded() {
        this.fontsReady = true;
    }

}
