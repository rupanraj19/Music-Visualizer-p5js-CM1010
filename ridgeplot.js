/* ------------------------------------------------------------
   Ridge Plot
   ------------------------------------------------------------ */
var output = [];
var startX;
var startY;
var endY;
var spectrum_width;
var speed = 0.7;

function RidgePlot() {
  // Name of the visualization
  this.name = 'ridgeplot';

  // Set initial values for startX, startY, endY, and spectrum_width
  this.setup = function(){
  this.startX = width / 5;
  this.endY = height / 7;
  this.startY = height - this.endY;
  this.spectrum_width = (width / 5) * 3;
  }
  this.setup();
  // Add a new wave to the output array
  this.addWave = function() {
    var w = fourier.waveform();
    var output_wave = [];
    var smallScale = 3;
    var bigScale = 40;

    for (var i = 0; i < w.length; i++) {
      if (i % 20 == 0) {
        var x = map(i, 0, 1024, this.startX, this.startX + this.spectrum_width);

        if (i < 1024 * 0.25 || i > 1024 * 0.75) {
          var y = map(w[i], -1, 1, -smallScale, smallScale);
          output_wave.push({ x: x, y: this.startY + y });
        } else {
          var y = map(w[i], -1, 1, -bigScale, bigScale);
          output_wave.push({ x: x, y: this.startY + y });
        }
      }
    }
    output.push(output_wave);
  };

  // Draw the ridge plot and FPS counter
  this.draw = function() {
    background(0);
    push()
    fill("##7300ff");
    stroke("#ff0066");
    strokeWeight(2);

    // Add a new wave to the output array every 20 frames
    if (frameCount % 20 == 0) {
      this.addWave();
    }

    // Draw the lines for each wave in the output array
    for (var i = 0; i < output.length; i++) {
      var o = output[i];
      beginShape();
      for (var j = 0; j < o.length; j++) {
        o[j].y -= speed;
        vertex(o[j].x, o[j].y);
      }
      endShape();

      // Remove the wave from the output array if its y coordinate is smaller than endY
      if (o[0].y < this.endY) {
        output.splice(i, 1);
      }
    }

    // Calculate and display FPS
    var fps = frameRate(); // Get the current frame rate
    fill(255); // Set text color to white
    textSize(34);
    stroke(0)
    text("FPS: " + fps.toFixed(0), windowWidth - 200, 50); // Display FPS at (x, y)
    pop()
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
