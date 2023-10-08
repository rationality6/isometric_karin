class NumberParticle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "number-particle");

    const x_offset = x - 50
    const y_offset = y - 10

    this.text = this.scene.add.text(x_offset, y_offset, `${x}, ${y}`, {
      fontSize: "20px",
      color: "#000",
    });

    setTimeout(() => {
      this.text.destroy();
    }, 1000);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update(time, delta) {
    this.text.y = this.text.y - 1;
  }
}

export default NumberParticle;
