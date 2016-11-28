import Phaser from 'phaser';

export default class extends Phaser.Sprite {

    constructor({
        game,
        x,
        y,
        asset
    }) {
        super(game, x, y, asset);

        this.game = game;
        this.anchor.setTo(0.5);
        this._angle = 0;
    }

    update() {
        // this.angle += 1;
        // this._angle += Math.PI / 64;
        // this.x = this.game.world.centerX + 150 * Math.abs(Math.cos(this._angle));
    }
}
