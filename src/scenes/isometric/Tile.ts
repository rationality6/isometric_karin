import NumberParticle from "../effects/NumberParticle";

class TileManager {
  private tileSize: number = 64;
  private scene: any;
  private tiles: Phaser.GameObjects.Polygon[][] = []; // 2차원 배열로 타일들을 관리

  constructor(scene) {
    this.scene = scene;
  }

  // 5x5 타일을 생성하고 배열에 저장
  setPlaceTiles() {
    for (let i = 0; i < 5; i++) {
      this.tiles[i] = []; // 행(Row) 초기화
      for (let j = 0; j < 5; j++) {
        const x = j * this.tileSize;
        const y = i * this.tileSize;

        // 생성된 타일을 받아와서 배열에 저장
        const tile = this.placetile(x, y, i, j);
        this.tiles[i][j] = tile;
      }
    }
  }

  // 개별 타일 생성 및 이벤트 설정
  placetile(x, y, row, col) {
    const isoPoint = this.cartesianToIsometric(new Phaser.Geom.Point(x, y));

    const tile = this.scene.add.polygon(
      isoPoint.x,
      isoPoint.y,
      this.isometricSquare(),
      0xeeeeee // 기본 타일 색상 (회색조)
    );

    tile.setData({ row, col, visited: false });
    const tileCenter = tile.getCenter();

    tile
      .setOrigin(0.5, 0.5)
      .setInteractive(
        new Phaser.Geom.Polygon(this.isometricSquare()),
        Phaser.Geom.Polygon.Contains
      )
      .on("pointerover", () => {
        // 1. 테두리 및 파티클 효과
        tile.setStrokeStyle(4, 0x7878ff, 0.5);
        new NumberParticle(this.scene, tileCenter.x, tileCenter.y);

        // 2. 마우스 올렸을 때 색상 변경 (예: 연한 파란색 0xd0d0ff)
        tile.setFillStyle(0xd0d0ff);
        tile.visited = true
      })
      .on("pointerout", () => {
        // 3. 마우스 벗어났을 때 테두리 제거 및 원래 색상으로 복구
        tile.setStrokeStyle(0);
        // tile.setFillStyle(0xeeeeee);
      });

    this.scene.input.enableDebug(tile, 0xff00ff);

    return tile;
  }

  cartesianToIsometric(cartPt) {
    return new Phaser.Geom.Point(
      cartPt.x - cartPt.y,
      (cartPt.x + cartPt.y) / 2
    );
  }

  isometricSquare() {
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

export default TileManager;