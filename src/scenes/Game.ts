import PhaserSceneTool from "./PhaserSceneTool";

import Tile from "./isometric/Tile";

class GameScene extends PhaserSceneTool {
  private cameraMoveSpeed: number = 6;
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

  setZoomKeys() {
    // Zoom keys
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).on(
      "down",
      function (key, event) {
        console.log("Plus Clicked");
        if (this.cameras.main.zoom < 2) {
          this.cameras.main.zoom += 0.25;
        }
      },
      this
    );

    let minusKey = this.input.keyboard
      .addKey(Phaser.Input.Keyboard.KeyCodes.S)
      .on(
        "down",
        function (key, event) {
          console.log("Minus Clicked");
          if (this.cameras.main.zoom > 0.25) {
            this.cameras.main.zoom -= 0.25;
          }
        },
        this
      );

    this.input.on(
      "wheel",
      function (pointer, gameObjects, deltaX, deltaY, deltaZ) {}
    );
  }

  create() {
    const logo = this.add.image(200, -200, "interpretLogoWithCat");
    logo.setDisplaySize(200, 60);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCamera();
    const tiles = new Tile(this);
    tiles.setPlaceTiles();

    this.add.image(0, 83, "karin").setDepth(200).setScale(0.5);
  }


}

export default GameScene;
