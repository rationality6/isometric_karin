import PhaserSceneTool from "./PhaserSceneTool";

import Tile from "./isometric/Tile";

class GameScene extends PhaserSceneTool {
  private cameraMoveSpeed: number = 6;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("GameScene");
  }

  create() {
    const logo = this.add.image(200, -200, "interpretLogoWithCat");
    logo.setDisplaySize(200, 60);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCamera();
    const tiles = new Tile(this);
    tiles.setPlaceTiles();

    this.add.image(0, 83, "karin").setDepth(200).setScale(0.5);


    this.setZoomKeys()
    this.setIce()

    this.add.sprite(0, 0, 'sky').setDepth(-1)
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
        (key, event) => {
          console.log("Minus Clicked");
          if (this.cameras.main.zoom > 0.25) {
            this.cameras.main.zoom -= 0.25;
          }
        },
        this
      );

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      console.log('wheel');
    });

  }

  setIce() {
    const snowParticles = this.add.particles(-500, -500, 'karin', {
      x: { min: -200, max: 1000 }, // 화면 넓게 스폰 영역 설정
      y: -50,
      speedX: { min: 100, max: 200 },  // 우측으로 날리는 바람 속도 (대각선 핵심)
      speedY: { min: 150, max: 300 },  // 아래로 떨어지는 속도
      scale: { min: 0.2, max: 0.8 },   // 눈송이 크기 다양화
      alpha: { min: 0.3, max: 1.0 },   // 투명도 랜덤
      lifespan: 4000,                  // 유지 시간 (ms)
      frequency: 40,                   // 생성 주기
      blendMode: 'ADD'                 // 빛나는 효과 (선택 사항)
    });
  }

}

export default GameScene;
