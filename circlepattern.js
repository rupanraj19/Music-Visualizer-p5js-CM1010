/*------------------------------ Circle Pattern Visualisation------------------------*/

// Global variables
var particles = [];
var color1 = '#CE389C';

// Circle Pattern visualisation constructor
function CirclePattern() {
  // name of the visualisation
  this.name = 'circlepattern';

  this.setup = function() {
    /*-----------GUI-------------*/
    gui = createGui('Circlepattern GUI');
    gui.setPosition(width - 200, 0);

    gui.addGlobals('color1');

    gui.hide();
  };

  this.setup();

  this.draw = function() {
    push();
    angleMode(DEGREES);
    colorMode(HSB);
    background(0);
    translate(width / 2, height / 2);

    // Analyze audio frequencies
    fourier.analyze();
    var amp = fourier.getEnergy(20, 200);

    if (amp > 230) {
      rotate(random(-0.5, 0.5));
    }

    var alpha = map(amp, 0, 255, 100, 150);
    fill(0, alpha);
    noStroke();
    strokeWeight(3);
    noFill();

    var wave = fourier.waveform();

    for (var t = -1; t <= 1; t += 2) {
      for (var i = 0; i <= 180; i += 4) {
        var index = floor(map(i, 0, 180, 10, wave.length - 1));
        var r = map(wave[index], -1, 1, 50, 300);
        var x = r * sin(i) * t;
        var y = r * cos(i);
        stroke(color1);
        line(0, 0, x, y);
      }
    }
    noStroke();
    colorMode(RGB);
    fill(255, 134, 234, 100);
    ellipse(0, 0, 250);
    image(logo, -120, -120, 225, 225);
    colorMode(HSB);

    // Create and update particles
    var p = new CircleParticle();
    particles.push(p);

    for (var i = particles.length - 1; i >= 0; i--) {
      if (!particles[i].edges()) {
        particles[i].update(amp > 200);
        particles[i].show();
      } else {
        particles.splice(i, 1);
      }
    }
    pop();
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
