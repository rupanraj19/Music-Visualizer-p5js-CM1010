/* ------------------------------------------------------------
   Needle Visualization
   ------------------------------------------------------------ */
var needleFill = '#292923';
var needleStroke = '#00ff88';

// Constructor function to draw the needles
function Needles() {
  // Name of the visualization
  this.name = "needles";
  var gui;

  this.setup = function() {
    /*-----------GUI-------------*/
    gui = createGui('Needles GUI');
    gui.setPosition(width - 200, 0);

    gui.addGlobals('needleFill', 'needleStroke');

    gui.hide();
  };

  this.setup();

  // How large is the arc of the needle plot
  var minAngle = PI + PI / 10;
  var maxAngle = TWO_PI - PI / 10;

  this.plotsAcross = 2;
  this.plotsDown = 2;

  // Frequencies used by the energy function to retrieve a value for each plot
  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];

  // Resize the plot sizes when the screen is resized
  this.onResize = function() {
    this.pad = width / 20;
    this.plotWidth = (width - this.pad) / this.plotsAcross;
    this.plotHeight = (height - this.pad) / this.plotsDown;
    this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;

    var leftOverWidth = width - 2 * this.plotWidth;
    var leftOverHeight = height - 2 * this.plotHeight;
    this.widthSpacer = leftOverWidth / 3;
    this.heightSpacer = leftOverHeight / 3;
  };

  // Call onResize to set initial values when the object is created
  this.onResize();

  // Draw the plots to the screen
  this.draw = function() {
    background(0) // Set a black background
    push();
    angleMode(RADIANS);

    // Create an array of amplitude values from the fft
    fourier.analyze();
    // Iterator for selecting frequency bin
    var currentBin = 0;
    fill(needleFill);

    // Nested for loop to place plots in 2x2 grid
    for (var i = 0; i < this.plotsDown; i++) {
      for (var j = 0; j < this.plotsAcross; j++) {
        var widthOffset = (j + 1) * this.widthSpacer;
        var heightOffset = (i + 1) * this.heightSpacer;

        // Calculate the size and position of the plots
        var x = j * this.plotWidth + widthOffset;
        var y = i * this.plotHeight + heightOffset;
        var w = this.plotWidth;
        var h = this.plotHeight;

        // Draw a rectangle at that location and size
        noStroke();
        rect(x, y, w, h);

        // Add the ticks
        var centreX = this.plotWidth / 2 + this.plotWidth * j + widthOffset;
        var bottomY = this.plotHeight * (i + 1) + (i + 1) * this.heightSpacer;
        this.ticks(centreX, bottomY, this.frequencyBins[currentBin]);

        var energy = fourier.getEnergy(this.frequencyBins[currentBin]);

        // Add the needle
        this.needle(energy, centreX, bottomY);

        currentBin++;
      }
    }

    pop();
  };

 
  this.needle = function(energy, centreX, bottomY) {
    push();
    stroke(needleStroke);
    strokeWeight(6)
    // Translate so 0 is at the bottom of the needle
    translate(centreX, bottomY);
    // Map the energy to the angle for the plot
    theta = map(energy, 0, 255, minAngle, maxAngle);
    // Calculate x and y coordinates from angle for the length of the needle
    var x = this.dialRadius * cos(theta); // Adjusted to -cos(theta)
    var y = this.dialRadius * sin(theta);
    // Draw the needle
    line(0, 0, x, y);
    pop();
  };

  
  this.ticks = function(centreX, bottomY, freqLabel) {
    // 8 ticks from pi to 2pi
    var nextTickAngle = minAngle;
    push();
    stroke(needleStroke);
    fill('#333333');
    translate(centreX, bottomY);
    // Draw the semi-circle for the bottom of the needle
    fill('#870bc1')
    arc(0, 0, 50, 50, PI, 2 * PI);
    textAlign(CENTER);
    textSize(24);
    strokeWeight(4)

    for (var i = 0; i < 9; i++) {
      // For each tick, work out the start and end coordinates based on its angle from the needle's origin
      var x = this.dialRadius * cos(nextTickAngle);
      var x1 = (this.dialRadius - 5) * cos(nextTickAngle);

      var y = this.dialRadius * sin(nextTickAngle);
      var y1 = (this.dialRadius - 5) * sin(nextTickAngle);
      // set color red to last two ticks
      if(i >= 7){
        stroke("red");
      }
      line(x, y, x1, y1);
      nextTickAngle += PI / 10;

    }
    noStroke()
    text(freqLabel, 0, -(this.plotHeight / 2));
    pop();
  };

  // Function to show the GUI
  this.selectVisual = function() {
    console.log("show");
    gui.show();
  };

  // Function to hide the GUI
  this.unSelectVisual = function() {
    console.log("hide");
    gui.hide();
  };
}

