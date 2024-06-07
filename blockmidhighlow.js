/* ------------------------------------------------------------
   Blockmidhighlow 
  ------------------------------------------------------------ */
  
// Global variables
var rotateThresh, progThresh, seedThresh;
var strokeWidth = 4;
var strokeColor = '#7300ff';
var lineColor = '#ff0066';
var fillColor = '#ffb3eb';
var shape = ['circle', 'triangle', 'square', 'pentagon', 'star'];
var drawStroke = true;
var drawFill = true;
var rotation = 0.05;
var speed = 1;

// Constructor for the Block Mid High Low Visualisation
function BlockMidHighLow() {
  // name of the visualisation
  this.name = "blockmidhighlow";

  // Variables for controlling noise and GUI
  var noiseStep = 0.01;
  var prog = 0;
  var gui;

  // Setup function for initializing the visualisation
  this.setup = function() {
    // Initialize threshold values
    rotateThresh = 67;
    progThresh = 180;
    seedThresh = 180;

    // Create a GUI for controlling parameters
    gui = createGui('BlockMidHighLow GUI');
    gui.setPosition(width - 220, 0);

    // Add slider controls to the GUI
    sliderRange(0.001, 1, 0.001);
    gui.addGlobals('noiseStep');

    sliderRange(0, 255, 1);
    gui.addGlobals('rotateThresh',
                   'progThresh',
                   'seedThresh'
    );

    sliderRange(0, 10, 1);
    gui.addGlobals('speed');

    gui.addGlobals(
      'shape',
      'label',
      'fillColor', 
      'strokeColor',
      'strokeWidth', 
      'drawFill',
      'drawStroke',
      'lineColor'
    );

    gui.hide();
  }

  this.setup();

  this.onResize = function() {
    // Adjust GUI position on resize
    gui.setPosition(width - 220, 0);
  }

  this.onResize();

  this.draw = function() {
    background(0)

    // Analyze the audio frequencies
    fourier.analyze();
    var b = fourier.getEnergy('bass');
    var t = fourier.getEnergy('treble');

    // Call the rotatingBlocks and noiseLine functions
    rotatingBlocks(b);
    noiseLine(b, t);
  }

  // Function for creating rotating blocks based on audio energy
  function rotatingBlocks(energy) {
    var r = map(energy, 0, 100, 120, 150) - 20;
    var incr = width / (10 - 1);

    push();
    rectMode(CENTER);
    translate(width / 2, height / 2);

    if (energy > rotateThresh) {
      rotate(rotation * speed);
    }

    if (drawFill) {
      fill(fillColor);
    } else {
      noFill();
    }

    if (drawStroke) {
      stroke(strokeColor);
      strokeWeight(strokeWidth);
    } else {
      noStroke();
    }

    // Draw a row of shapes
    for (var i = 0; i < 10; i++) {
      var posX = i * incr - width / 2;
      var posY = 0;

      switch (shape) {
        case 'triangle':
          ngon(3, posX, posY, r);
          break;
        case 'circle':
          ellipse(posX, posY, r, r);
          break;
        case 'square':
          rect(posX, posY, r, r);
          break;
        case 'pentagon':
          ngon(5, posX, posY, r);
          break;
        case 'star':
          star(6, posX, posY, r / sqrt(3), r);
          break;
      }
    }
    rotation += 0.05;
    pop();
  }

  // Function for creating a noise-based line
  function noiseLine(energy1, energy2) {
    push();
    translate(width / 2, height / 2);
    beginShape();
    noFill();

    if (drawStroke) {
      stroke(lineColor);
      strokeWeight(strokeWidth);
    } else {
      noStroke();
    }

    for (var i = 0; i < 100; i++) {
      var x = map(noise(i * noiseStep + prog), 0, 1, -250, 250);
      var y = map(noise(i * noiseStep + prog + 1000), 0, 1, -250, 250);
      vertex(x, y);
    }
    endShape();

    if (energy1 > progThresh) {
      prog += 0.05;
    }

    if (energy2 > seedThresh) {
      noiseSeed();
    }
    pop();
  }

  // Function for drawing regular polygons
  function ngon(n, x, y, d) {
    beginShape();
    for (var i = 0; i < n; i++) {
      var angle = TWO_PI / n * i;
      angleMode(RADIANS)
      var px = x + cos(angle) * d / 2;
      var py = y - sin(angle) * d / 2;
      vertex(px, py);
    }
    endShape(CLOSE);
  }

  // Function for drawing stars
  function star(n, x, y, d1, d2) {
    beginShape();
    for (var i = 0; i < 2 * n; i++) {
      var d;
      if (i % 2 === 1) {
        d = d1;
      } else {
        d = d2;
      }
      var angle = PI / n * i;
      angleMode(RADIANS)
      var px = x + cos(angle) * d / 2;
      var py = y - sin(angle) * d / 2;
      vertex(px, py);
    }
    endShape(CLOSE);
  }

  this.selectVisual = function() {
    console.log('show');
    gui.show();
  };

  this.unSelectVisual = function() {
    console.log('hide');
    gui.hide();
  };
}
