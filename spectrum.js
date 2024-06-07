/* ------------------------------------------------------------
   Spectrum Visualization
   ------------------------------------------------------------ */
var rectWidth = 20; // Initial height of the rectangles

function Spectrum() {
  // Visualization name
  this.name = "spectrum";
  var gui;

  // Setup function for initializing the visualization
  this.setup = function() {

    /*-----------GUI-------------*/
    gui = createGui('Spectrum GUI');
    gui.setPosition(width - 200, 0);

    gui.addGlobals('rectWidth'); // Add a controller for rectWidth

    gui.hide();
  }

  // Call the setup function to initialize the visualization
  this.setup();

  // Function to handle resizing
  this.onResize = function() {
    gui.setPosition(width - 200, 0);
  }
  
  // Draw method for Spectrum visualization
  this.draw = function() {
    background(0)

    push();
    // Analyze the audio spectrum using p5 FFT
    var spectrum = fourier.analyze();
    noStroke();
    colorMode(HSB);

    // Iterate over the spectrum array
    for (var i = 0; i < spectrum.length; i++) {
      // Map the index to the horizontal position on the canvas
      var x = map(i, 0, spectrum.length, 0, width);
    
      // Map the spectrum value to the height of the rectangle using rectWidth
      var h = map(spectrum[i], 0, 255, rectWidth, height) 

      // Set the fill color based on a random hue value
      fill(i, 255, 255);
      stroke(0)

      // Draw a rectangle representing the spectrum data
      rect(x, height - h, rectWidth, h);
    }

    pop();
  };

  // Function to show the GUI when this visualization is selected
  this.selectVisual = function(){
    console.log("show");
    gui.show();
  }

  // Function to hide the GUI when this visualization is deselected
  this.unSelectVisual = function(){
    console.log("hide");
    gui.hide();
  }
}
