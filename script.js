let planeImages = [];
let lines1Images = [];
let lines2Images = [];
let lines3Images = [];
let lines4Images = [];
let lines = [];
let stars = [];
let bulletes = [];
let hearthes = [];
let bullets = [];
let EagleImg = [];
let score = 0;
let bullet = 10;
let starCount = 0;
let eagleAnimationIndex = 0;
let lastEagleUpdateTime = 1000;
let bulletImg;
let startImg;
let chooseImg;
let mainOfGameImg;
let pauseImg;
let shootSound,
  hitSound,
  coinSound,
  successSound,
  reloadSound,
  looseSound,
  openSound,
  mainSound;
let playImg, replayImg;
let winImg, looseImg;
let starImg, hearthImg;
let lastCollisionTime = 0;
let lastBulletTime = 0;
let plane, selectedPlaneName;
let showDamageEffect = false;
let damageEffectDuration = 200;
let lastDamageTime = 0;
let gameOver = false;
let hasSoundPlayed = false,
  openSoundPlayed = false,
  looseSoundPlayed = false;
mainSoundPlayed = false;
let wingame = false;
let starAdded = false;
let gamePause = false;
let choosePlane = false;
let showStartText = false;
let gameStarted = false;
let startOfGame = true;
let lives = 5;
let nessCountOfStars = 5;
let selectedPlaneIndex = -1;
let planeNames = [
  "a-20a",
  "a-24",
  "b-17",
  "b-19",
  "b-24",
  "b-25",
  "b-26",
  "b-29",
  "f4f",
  "p-38",
  "kate",
  "p-39",
  "p-40",
  "p-51",
  "sb2c",
  "Airbus",
];

function preload() {
  shootSound = loadSound("sounds/shoot.mp3");
  hitSound = loadSound("sounds/hit.mp3");
  coinSound = loadSound("sounds/coin.mp3");
  successSound = loadSound("sounds/success.mp3");
  openSound = loadSound("sounds/open.mp3");
  looseSound = loadSound("sounds/loose.mp3");
  mainSound = loadSound("sounds/main.mp3");
  reloadSound = loadSound("sounds/reload.mp3");

  bulletImg = loadImage("images/objectsImg/arm.png");
  heartImg = loadImage("images/objectsImg/hearth.png");
  starImg = loadImage("images/objectsImg/star.png");
  pauseImg = loadImage("images/GameAction/pause.png");
  startImg = loadImage("images/GameAction/Start.png");
  playImg = loadImage("images/GameAction/play.png");
  replayImg = loadImage("images/GameAction/replay.png");
  chooseImg = loadImage("images/GameAction/select.png");
  looseImg = loadImage("images/GameAction/Loose.png");
  winImg = loadImage("images/GameAction/win.png");
  mainOfGameImg = loadImage("images/Backgraund.png");

  planeImages.push(loadImage("images/planes/a-20a.png"));
  planeImages.push(loadImage("images/planes/a-24.png"));
  planeImages.push(loadImage("images/planes/b-17.png"));
  planeImages.push(loadImage("images/planes/b-19.png"));
  planeImages.push(loadImage("images/planes/b-24.png"));
  planeImages.push(loadImage("images/planes/b-25.png"));
  planeImages.push(loadImage("images/planes/b-26.png"));
  planeImages.push(loadImage("images/planes/b-29.png"));
  planeImages.push(loadImage("images/planes/f4f.png"));
  planeImages.push(loadImage("images/planes/p-38.png"));
  planeImages.push(loadImage("images/planes/kate.png"));
  planeImages.push(loadImage("images/planes/p-39.png"));
  planeImages.push(loadImage("images/planes/p-40.png"));
  planeImages.push(loadImage("images/planes/p-51.png"));
  planeImages.push(loadImage("images/planes/sb2c.png"));
  planeImages.push(loadImage("images/planes/Airbus.png"));

  for (i = 1; i <= 5; i++) {
    EagleImg.push(loadImage(`images/Stars/${i}.png`));
  }

  for (i = 1; i <= 5; i++) {
    lines1Images.push(loadImage(`images/Level1/${i}.png`));
  }
  for (i = 1; i <= 5; i++) {
    lines2Images.push(loadImage(`images/Level2/${i}.png`));
  }
  for (i = 1; i <= 5; i++) {
    lines3Images.push(loadImage(`images/Level3/${i}.png`));
  }
  for (i = 1; i <= 5; i++) {
    lines4Images.push(loadImage(`images/Level4/${i}.png`));
  }

  let planeX = windowWidth / 3;
  let planeY = windowHeight - 100;
  plane = new Plane(planeX, planeY, 100, 100);
}

function setup() {
  let canvasWidth = windowWidth / 1.5;
  let canvasHeight = windowHeight;

  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("main");
}

function draw() {
  if (startOfGame) {
    mainSound.stop();
    setGradient(0, 0, width, height);

    // Center 'mainOfGameImg' image
    let mainOfGameImgWidth = width;
    let mainOfGameImgHeight = height / 1.2;
    let mainOfGameImgX = width / 2 - mainOfGameImgWidth / 2;
    let mainOfGameImgY = height / 20;
    image(
      mainOfGameImg,
      mainOfGameImgX,
      mainOfGameImgY,
      mainOfGameImgWidth,
      mainOfGameImgHeight
    );

    // Center 'playImg' image
    let playImgWidth = width / 4;
    let playImgHeight = width / 13.5;
    let playImgX = width / 2 - playImgWidth / 2;
    let playImgY = height / 1.7;

    image(playImg, playImgX, playImgY, playImgWidth, playImgHeight);
  } else if (gameStarted && !gameOver && !wingame && !gamePause) {
    MainGame();
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].display();

      if (bullets[i].isOffScreen()) {
        bullets.splice(i, 1);
      }
    }
  } else if (gamePause) {
    mainSound.setVolume(0.1);

    fill(0, 0, 0, 5);
    rect(0, 0, width, height);

    let imgWidth = width / 4;
    let imgHeight = width / 12;
    let pauseImgY = height / 2 - imgHeight / 2;
    let replayImgY = pauseImgY + imgHeight + 40;

    image(pauseImg, width / 2 - imgWidth / 2, pauseImgY, imgWidth, imgHeight);
    image(replayImg, width / 2 - imgWidth / 2, replayImgY, imgWidth, imgHeight);

    return;
  } else if (!gameOver && !wingame) {
    mainSound.stop();
    if (!openSoundPlayed) {
      openSound.play();
      openSoundPlayed = true;
    }
    ChoosePlane();
  } else {
    mainSound.stop();
    OverGameShow();
  }

  if (showDamageEffect) {
    if (millis() - lastDamageTime <= damageEffectDuration) {
      drawDamageEffect();
    } else {
      showDamageEffect = false;
    }
  }
}

function mouseClicked() {
  if (!choosePlane) {
    let rows = 4;
    let cols = 4;
    let gridWidth = width / 2;
    let gridHeight = height / 2;
    let imgWidth = gridWidth / cols;
    let imgHeight = gridHeight / rows;
    let imgSize = min(imgWidth, imgHeight);
    let startX = width / 2 - gridWidth / 2;
    let startY = height / 1.7 - gridHeight / 2;

    for (let i = 0; i < planeImages.length; i++) {
      let col = i % cols;
      let row = floor(i / cols);
      let x = startX + col * imgWidth + imgWidth / 2 - imgSize / 2;
      let y = startY + row * imgHeight * 1.2 + imgHeight / 2 - imgSize / 2;

      if (
        mouseX >= x &&
        mouseX <= x + imgSize &&
        mouseY >= y &&
        mouseY <= y + imgSize
      ) {
        selectedPlaneIndex = i;
        selectedPlaneName = planeNames[i];
        break;
      }
    }
  }
  if (
    showStartText &&
    mouseX > width / 2.2 - 50 &&
    mouseX < width / 1.8 + 50 &&
    mouseY > height / 4 - 25 &&
    mouseY < height / 4 + 25
  ) {
    startGame();
    userStartAudio();
  }
  let playImgWidth = width / 4;
  let playImgHeight = width / 13.5;
  let playImgX = width / 2 - playImgWidth / 2;
  let playImgY = height / 1.7;
  if (
    startOfGame &&
    mouseX > playImgX &&
    mouseX < playImgX + playImgWidth &&
    mouseY > playImgY &&
    mouseY < playImgY + playImgHeight
  ) {
    startOfGame = false;
    showStartText = true;
  }

  let replayImgWidth = width / 4;
  let replayImgHeight = width / 12;
  let looseImgHeight = width / 11;
  let replayImgX = width / 2 - replayImgWidth / 2;
  let replayImgY = height / 3 + looseImgHeight + 60;

  if (
    gameOver &&
    mouseX > replayImgX &&
    mouseX < replayImgX + replayImgWidth &&
    mouseY > replayImgY &&
    mouseY < replayImgY + replayImgHeight
  ) {
    startOfGame = true;
    gameOver = false;
    gameStarted = false;
    wingame = false;
    choosePlane = false;
    hasSoundPlayed = false;
    openSoundPlayed = false;
    starAdded = false;
    looseSoundPlayed = false;
    mainSoundPlayed = false;
    score = 0;
    lives = 5;
    selectedPlaneName = "";
    bullet = 10;
    bulletes = [];
    hearthes = [];
    starCount = 0;
    nessCountOfStars = 5;
    bullets = [];
    stars = [];
    lines = [];
  }
  if (gamePause) {
    // Dimensions and positions of the pause and replay images
    let imgWidth = width / 4;
    let imgHeight = width / 12;
    let pauseImgY = height / 2 - imgHeight / 2;
    let replayImgY = pauseImgY + imgHeight + 40;

    if (
      mouseX > width / 2 - imgWidth / 2 &&
      mouseX < width / 2 + imgWidth / 2 &&
      mouseY > pauseImgY &&
      mouseY < pauseImgY + imgHeight
    ) {
      gamePause = !gamePause; // Toggle pause state
    }

    if (
      mouseX > width / 2 - imgWidth / 2 &&
      mouseX < width / 2 + imgWidth / 2 &&
      mouseY > replayImgY &&
      mouseY < replayImgY + imgHeight
    ) {
      startOfGame = true;
      gameOver = false;
      gameStarted = false;
      starAdded = false;
      wingame = false;
      hasSoundPlayed = false;
      openSoundPlayed = false;
      looseSoundPlayed = false;
      choosePlane = false;
      mainSoundPlayed = false;
      gamePause = false;
      score = 0;
      lives = 5;
      selectedPlaneName = "";
      bullet = 10;
      bulletes = [];
      hearthes = [];
      starCount = 0;
      nessCountOfStars = 5;
      bullets = [];
      stars = [];
      lines = [];
    }
  }
}
function keyPressed() {
  if (startOfGame && keyCode === ENTER) {
    userStartAudio();
    startOfGame = false;
    showStartText = true;
  }
  if (showStartText && keyCode === ENTER) {
    startGame();
  }
  if ((wingame || gameOver) && keyCode === ENTER) {
    startOfGame = true;
    gameOver = false;
    gameStarted = false;
    wingame = false;
    hasSoundPlayed = false;
    openSoundPlayed = false;
    starAdded = false;
    looseSoundPlayed = false;
    mainSoundPlayed = false;
    gamePause = false;
    score = 0;
    lives = 5;
    selectedPlaneName = "";
    choosePlane = false;
    bullet = 10;
    bulletes = [];
    hearthes = [];
    starCount = 0;
    nessCountOfStars = 5;
    bullets = [];
    stars = [];
    lines = [];
  }
  if (gameStarted && !wingame && !gameOver && keyCode === ESCAPE) {
    gamePause = !gamePause;
  }
}
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

function drawDamageEffect() {
  let edgeThickness = 20;

  let red1 = color(255, 0, 0);
  let red2 = color(100, 0, 0);

  setGradientRed(0, 0, width, edgeThickness, red1, red2);
  setGradientRed(0, height - edgeThickness, width, edgeThickness, red1, red2);
  setGradientRed(0, 0, edgeThickness, height, red1, red2);
  setGradientRed(width - edgeThickness, 0, edgeThickness, height, red1, red2);
}

function startGame() {
  if (selectedPlaneName) {
    gameStarted = true;
    choosePlane = true;
    showStartText = false;
  }
}

function setGradientRed(x, y, w, h, c1, c2) {
  noFill();

  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function setGradient(x, y, w, h) {
  noFill();

  let c1 = color("#000000");
  let c2 = color("#1A272F");
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
/////////Main Game logic
function MainGame() {
  let transY = height / 2 - plane.y;
  translate(0, transY);
  if (score < 25) background("#160018");
  else if (score < 50) background("#111A1F");
  else if (score < 75) background("#484729");
  else if (score <= 100) background("#2D0600");

  mainSound.setVolume(0.3);
  if (!mainSoundPlayed) {
    mainSound.loop();
    mainSoundPlayed = true;
  }

  plane.display();
  MoveOfPlane();
  AddingLines();
  DisplayAndCheckStars();
  DisplayAndCheckHearths();
  DisplayAndCheckBullets();
  resetMatrix();
  ShowScore();
  if (score === 90) {
    wingame = true;
  }
  if (keyIsDown(32) && gameStarted && bullet > 0) {
    let currentTime = millis();
    if (currentTime - lastBulletTime > 200) {
      bullet--;
      let bulletX = plane.x + plane.width / 2;
      let bulletY = plane.y + plane.height / 2;
      let transYOffset = transY;
      shootSound.play();
      bullets.push(
        new Bullet(bulletX, bulletY, plane.width, plane.height, transYOffset)
      );
      lastBulletTime = currentTime;
    }
  }
}
function DisplayAndCheckStars() {
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].display();

    if (stars[i].collidesWith(plane)) {
      coinSound.play();
      starCount++;
      stars.splice(i, 1);
    }
  }
}
function DisplayAndCheckHearths() {
  for (let i = hearthes.length - 1; i >= 0; i--) {
    hearthes[i].display();

    if (hearthes[i].collidesWith(plane)) {
      coinSound.play();
      lives++;
      hearthes.splice(i, 1);
    }
  }
}
function DisplayAndCheckBullets() {
  for (let i = bulletes.length - 1; i >= 0; i--) {
    bulletes[i].display();

    if (bulletes[i].collidesWith(plane)) {
      reloadSound.play();
      bullet += 5;
      bulletes.splice(i, 1);
    }
  }
}

/////////////////
function addLine(index, lineY, length, thickness) {
  let newLine = new Line(random(0, width - length), lineY, length, thickness);
  let imageArray = getImageArray(index);
  newLine.loadImage(imageArray);
  lines.push(newLine);
}

function getImageArray(index) {
  if (score < 25) return lines1Images[index];
  else if (score < 50) return lines2Images[index];
  else if (score < 75) return lines3Images[index];
  else return lines4Images[index];
}
function linesAction(line, imageArray) {
  if (line.img === imageArray[1]) line.move(10);
  if (line.img === imageArray[2]) line.updateRotation();
  if (line.img === imageArray[3] && line.x < 0) line.move(3);
  if (line.img === imageArray[4]) {
    if (line.x > windowWidth / 1.5 - line.length) line.move(-5);
  }
}
//////////////

function AddingLines() {
  let removedLines = 0;
  let lineY = plane.y - height / 2 - 150;
  let existingLine = lines.find((line) => Math.abs(line.y - lineY) < 300);

  if (
    !existingLine ||
    existingLine.img === lines1Images[3] ||
    existingLine.img === lines1Images[4]
  ) {
    // Add lines based on frame count and score
    if (frameCount % 60 === 0) {
      addLine(0, lineY, 150, 30);
    } else if (frameCount % 100 === 0) {
      addLine(1, lineY, 150, 30);
    } else if (frameCount % 140 === 0) {
      addLine(2, lineY, 150, 150);
    } else if (frameCount % 155 === 0) {
      let newLine4 = new Line(-width / 10, lineY, width / 3, width / 9);
      if (score < 25) newLine4.loadImage(lines1Images[3]);
      else if (score < 50) newLine4.loadImage(lines2Images[3]);
      else if (score < 75) newLine4.loadImage(lines3Images[3]);
      else if (score <= 100) newLine4.loadImage(lines4Images[3]);
      lines.push(newLine4);

      // Image 3 is placed at windowWidth / 1.8
      let newLine3 = new Line(windowWidth / 1.8, lineY, width / 3, width / 9);
      if (score < 25) newLine3.loadImage(lines1Images[4]);
      else if (score < 50) newLine3.loadImage(lines2Images[4]);
      else if (score < 75) newLine3.loadImage(lines3Images[4]);
      else if (score <= 100) newLine3.loadImage(lines4Images[4]);
      lines.push(newLine3);
    } else if (frameCount % 311 === 0) {
      let newBullet = new Ammo(random(width / 6, width / 1.4), lineY);
      bulletes.push(newBullet);
    } else if (frameCount % 411 === 0) {
      let newHearth = new Hearth(random(width / 6, width / 1.4), lineY);
      hearthes.push(newHearth);
    }

    if ([19, 39, 59, 79].includes(score)) {
      starAdded = false;
    }

    if (
      nessCountOfStars > 0 &&
      [20, 40, 60, 80].includes(score) &&
      !starAdded
    ) {
      let newStar = new Star(random(width / 6, width / 1.4), lineY);
      stars.push(newStar);
      nessCountOfStars--;
      starAdded = true;
    }
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    if (!lines[i]) continue;

    lines[i].display();

    if (lines[i].collidesWith(plane)) {
      let currentTime = millis();

      if (currentTime - lastCollisionTime > 1000) {
        lives--;
        hitSound.play();
        lastCollisionTime = currentTime;
        lines.splice(i, 1);

        if (lives <= 0) {
          gameOver = true;
          break;
        }

        showDamageEffect = true;
        lastDamageTime = currentTime;
      }
      break;
    }

    for (let j = bullets.length - 1; j >= 0; j--) {
      if (lines[i].collidesWithBullet(bullets[j])) {
        bullets.splice(j, 1);
        lines.splice(i, 1);
        break;
      }
    }

    if (lines[i]) {
      let imageArray;
      if (score < 25) imageArray = lines1Images;
      else if (score < 50) imageArray = lines2Images;
      else if (score < 75) imageArray = lines3Images;
      else if (score <= 100) imageArray = lines4Images;

      linesAction(lines[i], imageArray);

      if (lines[i].y > plane.y + height / 2) {
        removedLines++;
        lines.splice(i, 1);
      }
    }

    if (removedLines > 0) {
      lines = lines.filter((line) => line.y < plane.y + height / 2);
      score += removedLines;
    }
  }
}

function OverGameShow() {
  textSize(24);
  noStroke();
  textAlign(CENTER, CENTER);
  fill(255);
  if (gameOver) {
    clear();
    background("black");
    setGradient(0, 0, width, height);
    if (!looseSoundPlayed) {
      looseSound.play();
      looseSoundPlayed = true;
    }
    let looseImgWidth = width / 3;
    let looseImgHeight = width / 11;
    image(
      looseImg,
      width / 2 - looseImgWidth / 2,
      height / 3,
      looseImgWidth,
      looseImgHeight
    );

    let replayImgWidth = width / 4;
    let replayImgHeight = width / 12;
    let replayImgY = height / 3 + looseImgHeight + 60;
    image(
      replayImg,
      width / 2 - replayImgWidth / 2,
      replayImgY,
      replayImgWidth,
      replayImgHeight
    );
  } else if (wingame) {
    clear();
    background("black");
    setGradient(0, 0, width, height);
    if (!hasSoundPlayed) {
      successSound.play();
      hasSoundPlayed = true;
    }
    image(winImg, width / 3, height / 4, width / 3, width / 11);

    if (millis() - lastEagleUpdateTime > 800) {
      lastEagleUpdateTime = millis();
      if (eagleAnimationIndex < starCount - 1) {
        eagleAnimationIndex++;
      } else {
        eagleAnimationIndex = 0;
      }
    }

    image(
      EagleImg[eagleAnimationIndex],
      width / 2.9,
      height / 2.3,
      width / 3.5,
      width / 5
    );
  }
}
function ShowScore() {
  textSize(24);
  noStroke();
  textAlign(CENTER, CENTER);
  fill(255);
  // text(`Score: ${score}`, width / 2, 30);

  textAlign(LEFT, CENTER);
  text(`Bullets: ${bullet}`, 60, 30);
  image(bulletImg, 30, 15, 20, 20);

  textAlign(RIGHT, CENTER);
  for (let i = 0; i < lives; i++) {
    image(heartImg, width - (40 + i * 30), 15, 30, 30);
  }
  for (let i = 0; i < starCount; i++) {
    image(starImg, width - (40 + i * 35), 40, 40, 40);
  }
}

function MoveOfPlane() {
  if (score < 25) plane.move(0, -10);
  else if (score < 50) plane.move(0, -14);
  else if (score < 75) plane.move(0, -16);
  else if (score <= 100) plane.move(0, -18);

  if (keyIsDown(LEFT_ARROW)) {
    if (score < 25) plane.move(-10, 0);
    else if (score < 50) plane.move(-14, 0);
    else if (score < 75) plane.move(-16, 0);
    else if (score <= 100) plane.move(-18, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    if (score < 25) plane.move(10, 0);
    else if (score < 50) plane.move(14, 0);
    else if (score < 75) plane.move(16, 0);
    else if (score <= 100) plane.move(18, 0);
  }
}
function ChoosingPlane() {
  let rows = 4;
  let cols = 4;
  let gridWidth = width / 2;
  let gridHeight = height / 2;
  let imgWidth = gridWidth / cols;
  let imgHeight = gridHeight / rows;
  let imgSize = min(imgWidth, imgHeight);
  let startX = width / 2 - gridWidth / 2;
  let startY = height / 1.7 - gridHeight / 2;

  for (let i = 0; i < planeImages.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = startX + col * imgWidth + imgWidth / 2 - imgSize / 2;
    let y = startY + row * imgHeight * 1.2 + imgHeight / 2 - imgSize / 2;

    if (selectedPlaneIndex === i) {
      fill("#00b6d7");
      rect(x - 5, y - 5, imgSize + 10, imgSize + 10);
      plane.loadImage(planeImages[i]);
    }

    image(planeImages[i], x, y, imgSize, imgSize);
  }
}

/////////choose Plane menu logic
function ChoosePlane() {
  setGradient(0, 0, width, height);
  textSize(34);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  // Center the "Choose Your Plane" image
  let chooseImgWidth = 400;
  let chooseImgHeight = 30;
  image(
    chooseImg,
    width / 2 - chooseImgWidth / 2,
    height / 9.4,
    chooseImgWidth,
    chooseImgHeight
  );

  textSize(24);
  fill(255);
  text(
    ` ${selectedPlaneName ? `'${selectedPlaneName}'` : ""} `,
    width / 2,
    height / 6
  );

  ChoosingPlane();

  if (selectedPlaneName !== "" && !gameStarted) {
    displayStartText();
  }
}

function displayStartText() {
  fill(255);
  textSize(50);
  textAlign(CENTER, CENTER);
  let imageY = height / 8 + 55;
  let imgWidth = width * 0.15;
  let imgHeight = imgWidth * 0.5;
  let imgX = width / 2 - imgWidth / 2;
  image(startImg, imgX, imageY, imgWidth, imgHeight);

  showStartText = true;
  showStartText = true;
}
function displayPlaneSelection() {
  let rows = 4;
  let cols = 4;
  let gridWidth = width / 2;
  let gridHeight = height / 2;
  let imgWidth = gridWidth / cols;
  let imgHeight = gridHeight / rows;
  let imgSize = min(imgWidth, imgHeight);

  let startX = width / 2 - gridWidth / 2;
  let startY = height / 1.7 - gridHeight / 2;

  for (let i = 0; i < planeImages.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let x = startX + col * imgWidth + imgWidth / 2 - imgSize / 2;
    let y = startY + row * imgHeight * 1.2 + imgHeight / 2 - imgSize / 2;

    image(planeImages[i], x, y, imgSize, imgSize);
  }
}
//////////////////////////////////////////////
