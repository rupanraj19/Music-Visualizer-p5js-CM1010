/* ------------------------------------------------------------
   3D Pattern 
   ------------------------------------------------------------ */

// global variables
var angle = 0.05;
var useNormalMaterial = false;
var useFill = false;
var terrainstroke = '#eb05cc';
var cols, rows;
var scl = 150;
var w = 2000;
var h = 1300;
var flying = 0;
var terrain = [];

// 3D Pattern visualisation
function Dpattern() {
  // name of the visualisation
  this.name = '3dpattern';
  this.graphic = null;
  this.graphic2 = null;
  var gui;

  this.setup = function() {
    // Create a graphics context with WEBGL
    this.graphic = createGraphics(width, height, WEBGL);
    this.graphic2 = createGraphics(width, height, WEBGL);

    /*-----------GUI-------------*/
    gui = createGui('3dpattern GUI');
    gui.setPosition(width - 200, 0);

    // Set slider range and add GUI controls
    sliderRange(0.001, 1, 0.001);
    gui.addGlobals(
      'useNormalMaterial',
      'useFill',
      'terrainstroke'
    );

    gui.hide();

    cols = w / scl;
    rows = h / scl;

    // Initialize the terrain array
    for (var x = 0; x < cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0; //a default value for now
      }
    }
  };

  this.setup();

  // Function to handle resizing
  this.onResize = function() {
    gui.setPosition(width - 200, 0);
  }

  this.draw = function() {
    // live Background and 3D pattern
    image(livebg,0,0,windowWidth,windowHeight);
   
    fourier.analyze();
    var amp = fourier.getEnergy(20, 300);

    // Update Perlin noise less frequently
    this.updatePerlinNoise();
    
    // Draw the 3D pattern
    this.graphic2.background(0,0,0,50);
    this.graphic2.push();
    this.graphic2.translate(0, 150);
    this.graphic2.rotateX(PI / 2.1);
    if(useFill){
      this.graphic2.fill('#290c5e');
    }else{
      this.graphic2.noFill();
    }
    this.graphic2.stroke(terrainstroke);
    this.graphic2.strokeWeight(3);
    this.graphic2.translate(-w / 2, -h / 2 + 100);
    for (var y = 0; y < rows - 1; y++) {
      this.graphic2.beginShape(TRIANGLE_STRIP);
      for (var x = 0; x < cols; x++) {
        this.graphic2.vertex(x * scl, y * scl, terrain[x][y]);
        this.graphic2.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      }
      this.graphic2.endShape();
    }
    this.graphic2.pop(); // End 3D pattern

    // Draw the torus
    this.graphic.background(0, 0, 0, 50);
    this.graphic.push();
    this.graphic.translate(0, -200, 10);
    this.graphic.rotateX(angle * 0.4);
    this.graphic.rotateY(angle * 0.5);
    this.graphic.rotateZ(angle * 0.3);

    if (useNormalMaterial) {
      this.graphic.normalMaterial();
    } else {
      this.graphic.pointLight(255, 0, 0, -200, 0, 10);
      this.graphic.pointLight(0, 0, 255, 200, 0, -10);

      this.graphic.directionalLight(255, 0, 0, 200, 0, 0);
      this.graphic.directionalLight(0, 255, 0, 0, 200, 0);
    }

    this.graphic.noStroke();
    this.graphic.torus(amp*0.5 , 40);
    this.graphic.pop();

    angle += 0.03;

    image(this.graphic2,0,0, windowWidth, windowHeight);
    image(this.graphic, 0, 0, windowWidth, windowHeight);
  };

  this.updatePerlinNoise = function() {
    flying -= 0.12;
    var yoff = flying;
    var beat = fourier.getEnergy('bass');
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        terrain[x][y] = map(noise(xoff, yoff), 0, 1, -200, -100 + beat);
        xoff += 0.2;
      }
      yoff += 0.2;
    }
  };

  this.selectVisual = function() {
    console.log('show');
    gui.show();
  };

  this.unSelectVisual = function() {
    console.log('hide');
    gui.hide();
  };
}
