import PhaserSceneTool from "./PhaserSceneTool";
import NumberParticle from "./effects/NumberParticle";
class GameScene extends PhaserSceneTool {
  // private cameraMoveSpeed: number = 6;
  private tileSize: number = 64; // pixels
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("GameScene");
  }

  setCamera() {
    this.cameras.main
      .setBounds(-2048, -2048, 2048 * 2, 2048 * 2, true) // TODO what should this be?
      .centerOn(0, 50)
      .setZoom(1);
  }

  setPlaceTile() {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const x = j * this.tileSize;
        const y = i * this.tileSize;
        this.placetile.call(this, x, y); // Place tiles in isometric coordinates
      }
    }
  }

  setZoomKeys(){
    // Zoom keys
    // this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).on(
    //   "down",
    //   function (key, event) {
    //     console.log("Plus Clicked");
    //     if (this.cameras.main.zoom < 2) {
    //       this.cameras.main.zoom += 0.25;
    //     }
    //   },
    //   this
    // );

    // let minusKey = this.input.keyboard
    //   .addKey(Phaser.Input.Keyboard.KeyCodes.S)
    //   .on(
    //     "down",
    //     function (key, event) {
    //       console.log("Minus Clicked");
    //       if (this.cameras.main.zoom > 0.25) {
    //         this.cameras.main.zoom -= 0.25;
    //       }
    //     },
    //     this
    //   );

    // this.input.on(
    //   "wheel",
    //   function (pointer, gameObjects, deltaX, deltaY, deltaZ) {}
    // );
  }

  create() {
    const logo = this.add.image(200, -200, "interpretLogoWithCat");
    logo.setDisplaySize(200, 60);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCamera();
    this.setPlaceTile();

    this.add.image(0, 83, "karin")
    .setDepth(1)
    .setScale(0.5);
  }

  placetile(x, y) {
    const isoPoint = this.cartesianToIsometric(new Phaser.Geom.Point(x, y));

    const tile = this.add
      .polygon(
        isoPoint.x,
        isoPoint.y,
        [
          this.tileSize,
          0,
          0,
          this.tileSize / 2,
          0 + this.tileSize,
          this.tileSize,
          0 + this.tileSize * 2,
          this.tileSize / 2,
        ],
        0xeeeeee
      )
      // const tile = this.add.sprite(isoPoint.x, isoPoint.y, 'grass')
      .setOrigin(0.5, 0.5)
      // .setDepth(y)
      .setInteractive(
        new Phaser.Geom.Polygon([
          this.tileSize,
          0,
          0,
          this.tileSize / 2,
          0 + this.tileSize,
          this.tileSize,
          0 + this.tileSize * 2,
          this.tileSize / 2,
        ]),
        Phaser.Geom.Polygon.Contains
      )
      .on("pointerover", function (event) {
        this.setStrokeStyle(4, 0x7878ff, 0.5);
        new NumberParticle(this.scene, isoPoint.x, isoPoint.y);
      })
      .on("pointerout", function (event) {
        this.setStrokeStyle(0);
      });

    this.input.enableDebug(tile, 0xff00ff);
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
    var tempPt = new Phaser.Geom.Point();
    tempPt.x = (2 * isoPt.y + isoPt.x) / 2;
    tempPt.y = (2 * isoPt.y - isoPt.x) / 2;
    return tempPt;
  }
}

export default GameScene;
