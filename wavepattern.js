/* ------------------------------------------------------------
   Wave pattern
   ------------------------------------------------------------ */
// Neon color palette
var neonColors = ['#FF00FF', '#00FFFF', '#FFA500', '#00FF00']; 

// Constructor function to create the WavePattern visualization
function WavePattern() {
  // Visualization name
  this.name = "wavepattern";
  
  // Draw function to render the visualization
  this.draw = function() {
    background(bg2); 

    // Add an animated effect by changing the color over time
    var neonIndex = floor(frameCount / 30) % neonColors.length; // Change color every 30 frames
    var currentNeonColor = neonColors[neonIndex];

    push();
    noFill();
    stroke(currentNeonColor); // Use the current neon color
    strokeWeight(3);

    beginShape();
    var wave = fourier.waveform();
    for (var i = 0; i < wave.length; i++) {
      var x = map(i, 0, wave.length, 600, width - 600);
      var y = map(wave[i], -1, 1, 0, height);
      vertex(x, y);
    }
    endShape();

    pop();
  };
}
