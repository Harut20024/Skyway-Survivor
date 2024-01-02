class Line {
  constructor(x, y, length, thickness) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.thickness = thickness;
    this.rotation = 0;
    this.img = null;
  }
  loadImage(path) {
    this.img = path;
  }

  display() {
    push();
    translate(this.x + this.length / 2, this.y + this.thickness / 2);
    rotate(this.rotation);

    if (this.img) {
      imageMode(CENTER);
      image(this.img, 0, 0, this.length, this.thickness);
    }

    pop();
  }

  updateRotation() {
    this.rotation += PI / 15;
  }
  collidesWithBullet(bullet) {
    return (
      plane.x > this.x / 1.2 &&
      plane.x < this.x + this.length * 1.6 &&
      plane.y > this.y &&
      plane.y < this.y + this.thickness * 2
    );
  }

  collidesWith(plane) {
    return (
      plane.x < this.x + this.length &&
      plane.x + plane.width > this.x &&
      plane.y < this.y + this.thickness &&
      plane.y + plane.height > this.y
    );
  }
  move(dx) {
    this.x += dx;
  }
}
