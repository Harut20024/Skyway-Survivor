class Plane {
  constructor(x, y, width, height) {
    this.img = null;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  loadImage(path) {
    this.img = path;
  }

  display() {
    if (this.img) {
      image(this.img, this.x, this.y, this.width, this.height);
    }
  }

  move(dx, dy) {
    let newX = this.x + dx;
    let newY = this.y + dy;

    this.y = newY;
    if (newX >= 0 && newX <=  windowWidth / 1.5 - this.width) {
      this.x = newX;
    }
  }
}
