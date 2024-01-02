class Bullet {
  constructor(x, y, planeWidth, planeHeight, offsetY) {
    this.x = x;
    this.currentY = y; 
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.offsetY = offsetY; 
    this.radius = 4;
    this.speed = 10;
  }

  update() {
    this.currentY -= this.speed;
    this.y = this.currentY + this.offsetY;
  }

  display() {
    fill(255, 0, 0); 
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  isOffScreen() {
    return this.currentY + this.offsetY < 300;
}
}
