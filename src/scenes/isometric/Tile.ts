import NumberParticle from "../effects/NumberParticle";

class Tile {
  private tileSize: number = 64;

  constructor(scene) {
    this.scene = scene;
    this.tileSize = 64;
  }

  setPlaceTiles() {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const x = j * this.tileSize;
        const y = i * this.tileSize;

        this.placetile(x, y);
      }
    }
  }

  isometricSqure(tileSize) {
    return [
      this.tileSize,
      0,
      0,
      this.tileSize / 2,
      0 + this.tileSize,
      this.tileSize,
      0 + this.tileSize * 2,
      this.tileSize / 2,
    ];
  }

  placetile(x, y) {
    const isoPoint = this.cartesianToIsometric(new Phaser.Geom.Point(x, y));

    const tile = this.scene.add.polygon(
      isoPoint.x,
      isoPoint.y,
      this.isometricSqure(),
      0xeeeeee
    );

    const tileCenter = tile.getCenter();

    tile
      .setOrigin(0.5, 0.5)
      .setInteractive(
        new Phaser.Geom.Polygon(this.isometricSqure(this.tileSize)),
        Phaser.Geom.Polygon.Contains
      )
      .on("pointerover", (event) => {
        tile.setStrokeStyle(4, 0x7878ff, 0.5);
        new NumberParticle(this.scene, tileCenter.x, tileCenter.y);
      })
      .on("pointerout", (event) => {
        tile.setStrokeStyle(0);
      });

    this.scene.input.enableDebug(tile, 0xff00ff);
  }

  cartesian(cartPt) {
    return new Phaser.Geom.Point(cartPt.x, cartPt.y);
  }

  cartesianToIsometric(cartPt) {
    return new Phaser.Geom.Point(
      cartPt.x - cartPt.y,
      (cartPt.x + cartPt.y) / 2
    );
  }

  isometricToCartesian(isoPt) {
    let tempPt = new Phaser.Geom.Point();
    tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
    tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
    return tempPt;
  }

  isometricSqure() {
    return [
      this.tileSize,
      0,
      0,
      this.tileSize / 2,
      0 + this.tileSize,
      this.tileSize,
      0 + this.tileSize * 2,
      this.tileSize / 2,
    ];
  }
}

export default Tile;
