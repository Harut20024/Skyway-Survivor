class Star {
    constructor(x, y) {
      this.x = x;
      this.y = y; 
      this.size = 50; 
    }
  
    display() {
      image(starImg, this.x, this.y, this.size, this.size);
    }
  
    collidesWith(plane) {
      return (
        plane.x < this.x + this.size &&
        plane.x + plane.width > this.x &&
        plane.y < this.y + this.size &&
        plane.y + plane.height > this.y
      );
    }
  }
  