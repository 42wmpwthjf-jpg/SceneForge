const studentID = "202316327";
const seed = 6327;

const shapeCount = 8 + seed % 8;
const paletteSize = 3 + seed % 4;
const fractalDepth = 4 + seed % 3;

let currentView = 1;

let objects = [];
let randomValue = seed;

let triangleCount = 0;
let transformCount = 0;

let cameraMode = "perspective";


// Measurements

let testDepths = [1, 2, 3, 4, 5];
let triangleResults = [];

let testSizes = [5, 10, 15, 20, 25];
let shapeResults = [];


// Colors

let colors = [
  [15, 92, 160],
  [50, 170, 145],
  [245, 130, 48],
  [185, 55, 95],
  [95, 70, 170],
  [235, 200, 65]
];


function setup() {

  createCanvas(920, 680, WEBGL);

  createObjects();

  runMeasurements();

  console.log("SceneForge");
  console.log("Student ID: " + studentID);
  console.log("Seed: " + seed);
  console.log("Objects: " + shapeCount);
  console.log("Palette size: " + paletteSize);
  console.log("Fractal depth: " + fractalDepth);
}


function draw() {

  background(248, 250, 252);


  if (currentView === 1) {
    patternView();
  }

  else if (currentView === 2) {
    recursiveDesign();
  }

  else if (currentView === 3) {
    motionView();
  }

  else if (currentView === 4) {
    cameraView();
  }

  else if (currentView === 5) {
    resultsView();
  }


  drawHeader();
}


// Random generator

function nextRandom() {

  randomValue =
    (1103515245 * randomValue + 12345) % 2147483648;

  return randomValue / 2147483648;
}


function randomBetween(minValue, maxValue) {

  return minValue +
    nextRandom() *
    (maxValue - minValue);
}


// Create the seeded objects

function createObjects() {

  objects = [];

  randomValue = seed;

  let columns = 5;


  for (let i = 0; i < shapeCount; i++) {

    let row = floor(i / columns);
    let column = i % columns;


    let x =
      -280 +
      column * 140 +
      randomBetween(-24, 24);


    let y =
      -150 +
      row * 145 +
      randomBetween(-22, 22);


    let typeNumber =
      floor(nextRandom() * 3);


    let type;


    if (typeNumber === 0) {

      type = "square";

    }

    else if (typeNumber === 1) {

      type = "circle";

    }

    else {

      type = "triangle";
    }


    let size =
      randomBetween(40, 88);


    let colorIndex =
      floor(nextRandom() * paletteSize);


    let rotation =
      randomBetween(
        -PI / 2.5,
        PI / 2.5
      );


    let scaleValue =
      randomBetween(
        0.65,
        1.25
      );


    objects.push({

      type: type,

      x: x,

      y: y,

      size: size,

      colorIndex: colorIndex,

      rotation: rotation,

      scaleValue: scaleValue
    });
  }
}


// Header

function drawHeader() {

  push();

  resetMatrix();

  translate(
    -width / 2,
    -height / 2
  );


  fill(35, 50, 70);

  noStroke();


  textSize(20);

  text(
    "SceneForge - Raghad 202316327",
    25,
    30
  );


  textSize(13);

  text(
    "1 Pattern | 2 Recursive Design | 3 Motion | 4 Camera | 5 Results",
    25,
    55
  );


  text(
    "Seed: " +
    seed +
    "   Objects: " +
    shapeCount +
    "   Palette: " +
    paletteSize +
    "   Depth: " +
    fractalDepth,
    25,
    80
  );


  pop();
}


// MODULE 1

function patternView() {

  push();

  translate(0, 70);


  for (
    let i = 0;
    i < objects.length;
    i++
  ) {

    let obj = objects[i];

    let c =
      colors[obj.colorIndex];


    push();

    translate(
      obj.x,
      obj.y
    );


    fill(
      c[0],
      c[1],
      c[2],
      225
    );


    stroke(
      30,
      45,
      60
    );

    strokeWeight(1);


    drawObject(
      obj.type,
      obj.size
    );


    pop();
  }


  pop();


  showMessage(
    "Module 1 - Pattern View | Objects: " +
    shapeCount
  );
}


// Draw basic shapes

function drawObject(type, size) {

  if (type === "circle") {

    circle(
      0,
      0,
      size
    );
  }


  else if (type === "square") {

    rectMode(CENTER);

    rect(
      0,
      0,
      size,
      size
    );
  }


  else {

    triangle(

      -size * 0.5,
      size * 0.4,

      0,
      -size * 0.6,

      size * 0.5,
      size * 0.4
    );
  }
}


// MODULE 2

function recursiveDesign() {

  triangleCount = 0;


  push();

  translate(
    0,
    80
  );


  noStroke();


  makeFractal(

    -270,
    -170,

    270,
    -170,

    0,
    270,

    fractalDepth
  );


  pop();


  showMessage(
    "Module 2 - Sierpinski Gasket | Triangles: " +
    triangleCount
  );
}


// Sierpinski recursion

function makeFractal(
  x1,
  y1,
  x2,
  y2,
  x3,
  y3,
  depth
) {


  // Base case

  if (depth === 0) {

    triangleCount++;


    // Red color

    fill(
      237,
      49,
      19
    );


    triangle(

      x1,
      y1,

      x2,
      y2,

      x3,
      y3
    );


    return;
  }


  let mid12X =
    (x1 + x2) / 2;

  let mid12Y =
    (y1 + y2) / 2;


  let mid23X =
    (x2 + x3) / 2;

  let mid23Y =
    (y2 + y3) / 2;


  let mid31X =
    (x3 + x1) / 2;

  let mid31Y =
    (y3 + y1) / 2;


  makeFractal(

    x1,
    y1,

    mid12X,
    mid12Y,

    mid31X,
    mid31Y,

    depth - 1
  );


  makeFractal(

    mid12X,
    mid12Y,

    x2,
    y2,

    mid23X,
    mid23Y,

    depth - 1
  );


  makeFractal(

    mid31X,
    mid31Y,

    mid23X,
    mid23Y,

    x3,
    y3,

    depth - 1
  );
}


// MODULE 3

function motionView() {

  transformCount = 0;


  push();

  translate(
    0,
    70
  );


  for (
    let i = 0;
    i < objects.length;
    i++
  ) {

    let obj = objects[i];

    let c =
      colors[obj.colorIndex];


    let movement =
      sin(
        frameCount * 0.015 + i
      );


    push();


    // Translation

    translate(
      obj.x,
      obj.y
    );

    transformCount++;


    // Rotation

    rotate(
      obj.rotation +
      movement * 0.35
    );

    transformCount++;


    // Scale

    let newScale =
      obj.scaleValue *
      (0.9 + movement * 0.12);


    scale(newScale);

    transformCount++;


    fill(
      c[0],
      c[1],
      c[2],
      220
    );


    stroke(
      35,
      50,
      70
    );


    drawObject(
      obj.type,
      obj.size * 0.75
    );


    pop();
  }


  pop();


  showMessage(
    "Module 3 - Motion | Transformations: " +
    transformCount
  );
}


// MODULE 4

function cameraView() {


  if (
    cameraMode === "perspective"
  ) {

    perspective(

      PI / 3,

      width / height,

      1,

      3000
    );
  }


  else {

    ortho(

      -460,
      460,

      -340,
      340,

      1,
      3000
    );
  }


  let angle =
    frameCount * 0.002;


  let cameraX =
    cos(angle) * 850;


  let cameraZ =
    sin(angle) * 850;


  let cameraY = 180;


  camera(

    cameraX,
    cameraY,
    cameraZ,

    0,
    0,
    0,

    0,
    1,
    0
  );


  ambientLight(120);


  directionalLight(

    255,
    255,
    255,

    -0.5,
    0.5,
    -1
  );


  for (
    let i = 0;
    i < objects.length;
    i++
  ) {

    let obj = objects[i];

    let c =
      colors[obj.colorIndex];


    let z =
      (i % 5 - 2) * 100;


    push();


    translate(

      obj.x,

      obj.y * 0.55,

      z
    );


    rotateX(
      obj.rotation * 0.4
    );


    rotateY(
      obj.rotation
    );


    ambientMaterial(

      c[0],
      c[1],
      c[2]
    );


    if (
      obj.type === "circle"
    ) {

      sphere(
        obj.size * 0.35
      );
    }


    else if (
      obj.type === "square"
    ) {

      box(

        obj.size * 0.65,

        obj.size * 0.65,

        obj.size * 0.40
      );
    }


    else {

      cone(

        obj.size * 0.35,

        obj.size * 0.75
      );
    }


    pop();
  }


  // Camera information

  push();

  resetMatrix();

  translate(
    -width / 2,
    -height / 2
  );


  fill(
    35,
    50,
    70
  );

  noStroke();


  textSize(20);

  text(
    "Module 4 - Camera View",
    25,
    115
  );


  textSize(16);

  text(
    "Current Projection: " +
    cameraMode,
    25,
    145
  );


  textSize(14);

  text(
    "Press P = Perspective",
    25,
    175
  );


  text(
    "Press O = Orthographic",
    25,
    200
  );


  pop();
}


// MODULE 5

function resultsView() {

  triangleCount = 0;


  countFractalTriangles(
    fractalDepth
  );


  let expectedTriangles =
    pow(
      3,
      fractalDepth
    );


  let totalTransforms =
    shapeCount * 3;


  push();

  resetMatrix();

  translate(
    -width / 2,
    -height / 2
  );


  fill(
    35,
    50,
    70
  );

  noStroke();


  textSize(22);

  text(
    "Module 5 - Results",
    35,
    125
  );


  textSize(15);


  text(
    "Objects drawn per frame: " +
    shapeCount,
    35,
    160
  );


  text(
    "Recursive triangles: " +
    triangleCount,
    35,
    185
  );


  text(
    "Expected: 3^" +
    fractalDepth +
    " = " +
    expectedTriangles,
    35,
    210
  );


  text(
    "Transform operations: " +
    totalTransforms,
    35,
    235
  );


  text(
    "Maximum recursion level: " +
    fractalDepth,
    35,
    260
  );


  text(
    "Complexity: O(3^d)",
    35,
    285
  );


  // Graph A

  textSize(16);

  text(
    "Graph A - Triangles vs Depth",
    480,
    145
  );


  stroke(
    35,
    50,
    70
  );


  line(
    480,
    360,
    870,
    360
  );


  line(
    480,
    180,
    480,
    360
  );


  noStroke();


  for (
    let i = 0;
    i < testDepths.length;
    i++
  ) {

    let x =
      500 + i * 85;


    let y =
      360 -
      map(
        triangleResults[i],
        0,
        250,
        0,
        150
      );


    fill(
      237,
      49,
      19
    );


    circle(
      x,
      y,
      8
    );


    if (i > 0) {

      let oldX =
        500 + (i - 1) * 85;


      let oldY =
        360 -
        map(
          triangleResults[i - 1],
          0,
          250,
          0,
          150
        );


      stroke(
        237,
        49,
        19
      );


      line(
        oldX,
        oldY,
        x,
        y
      );


      noStroke();
    }


    fill(
      35,
      50,
      70
    );


    text(
      testDepths[i],
      x - 3,
      380
    );
  }


  text(
    "Depth",
    650,
    400
  );


  // Graph B

  textSize(16);

  text(
    "Graph B - Objects vs Scene Size",
    480,
    440
  );


  stroke(
    35,
    50,
    70
  );


  line(
    480,
    635,
    870,
    635
  );


  line(
    480,
    475,
    480,
    635
  );


  noStroke();


  for (
    let i = 0;
    i < testSizes.length;
    i++
  ) {

    let x =
      500 + i * 85;


    let y =
      635 -
      map(
        shapeResults[i],
        0,
        30,
        0,
        130
      );


    fill(
      50,
      92,
      160
    );


    circle(
      x,
      y,
      8
    );


    if (i > 0) {

      let oldX =
        500 + (i - 1) * 85;


      let oldY =
        635 -
        map(
          shapeResults[i - 1],
          0,
          30,
          0,
          130
        );


      stroke(
        50,
        92,
        160
      );


      line(
        oldX,
        oldY,
        x,
        y
      );


      noStroke();
    }


    fill(
      35,
      50,
      70
    );


    text(
      testSizes[i],
      x - 6,
      655
    );
  }


  text(
    "Scene Size",
    640,
    675
  );


  pop();
}


// Count triangles for measurements

function countFractalTriangles(depth) {

  if (depth === 0) {

    triangleCount++;

    return;
  }


  countFractalTriangles(
    depth - 1
  );


  countFractalTriangles(
    depth - 1
  );


  countFractalTriangles(
    depth - 1
  );
}


// Measurements

function runMeasurements() {

  triangleResults = [];

  shapeResults = [];


  // Fractal measurements

  for (
    let i = 0;
    i < testDepths.length;
    i++
  ) {

    let depth =
      testDepths[i];


    let total = 0;


    for (
      let run = 0;
      run < 3;
      run++
    ) {

      total =
        total +
        pow(3, depth);
    }


    let average =
      total / 3;


    triangleResults.push(
      average
    );
  }


  // Scene size measurements

  for (
    let i = 0;
    i < testSizes.length;
    i++
  ) {

    let size =
      testSizes[i];


    let total = 0;


    for (
      let run = 0;
      run < 3;
      run++
    ) {

      total =
        total + size;
    }


    let average =
      total / 3;


    shapeResults.push(
      average
    );
  }
}


// Bottom message

function showMessage(message) {

  push();

  resetMatrix();

  translate(
    -width / 2,
    -height / 2
  );


  fill(
    35,
    50,
    70
  );

  noStroke();

  textSize(14);


  text(
    message,
    25,
    height - 25
  );


  pop();
}


// Keyboard controls

function keyPressed() {


  if (key === "1") {

    currentView = 1;
  }


  else if (key === "2") {

    currentView = 2;
  }


  else if (key === "3") {

    currentView = 3;
  }


  else if (key === "4") {

    currentView = 4;
  }


  else if (key === "5") {

    currentView = 5;
  }


  else if (
    key === "p" ||
    key === "P"
  ) {

    if (currentView === 4) {

      cameraMode = "perspective";
    }
  }


  else if (
    key === "o" ||
    key === "O"
  ) {

    if (currentView === 4) {

      cameraMode = "orthographic";
    }
  }
}