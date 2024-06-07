/* ------------------------------------------------------------
   Fireworks Visualisation
------------------------------------------------------------ */

var maxRockets = 10; // Set the maximum number of rockets
var rocketSpeed = 6;

function Fireworks() {
  // Properties
  this.name = "fireworks";
  var rockets = [];
  var fireworks;
  var gui;

  // Setup function
  this.setup = function() {
    // Initialize background, angle mode, and frame rate
    background(0);
    angleMode(DEGREES);
    frameRate(60);
    beatDetect = new BeatDetect();
    fireworks = new UpdateEffects();

    /*-----------GUI-------------*/
    gui = createGui('Fireworks GUI');
    gui.setPosition(width - 200, 0);

    sliderRange(0,20,2);
    gui.addGlobals('maxRockets', 'rocketSpeed');

    gui.hide();
  };

  // Initialize setup
  this.setup();

  // Function to handle resizing
  this.onResize = function() {
    gui.setPosition(width - 200, 0);
  } 

  // Draw function
  this.draw = function() {
    // Set background and analyze audio frequencies
    background(0);
    var spectrum = fourier.analyze();
    var beats = fourier.getEnergy('bass')
    
    // Check for beat detection and add rockets
    if (beatDetect.detectBeat(spectrum)) {
      fireworks.addFirework();
    }
    
    if(beats > 200){
      if(rockets.length < maxRockets){
      rockets.push(new Rocket(random(width), height));
      }
    }
    
    // Update and draw rockets
    for (var i = rockets.length - 1; i >= 0; i--) {
      rockets[i].update();
      rockets[i].draw();

      // Remove rockets when they go off-screen
      if (rockets[i].offscreen()) {
        rockets.splice(i, 1);
      }
    }
    fireworks.update();
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

/* ------------------------------------------------------------
   Rocket Object
   ------------------------------------------------------------ */
function Rocket(x, y) {
  // Properties
  this.x = x; // Random initial x position
  this.y = y;
  this.speed = rocketSpeed;

  // Draw the rocket
  this.draw = function() {
    // Update rocket position and color
    this.update();

    // Draw rocket image
    image(rocket, this.x, this.y, 80, 80); 
  };

  // Update rocket position
  this.update = function() {
    this.y -= this.speed; // Move upward
  };

  // Check if the rocket is off-screen
  this.offscreen = function() {
    return this.y < -80;
  };
}

/* ------------------------------------------------------------
   Effects Object
   ------------------------------------------------------------ */
function Effects(colour, x, y) {
  // Properties
  var colour = colour;
  var x = x;
  var y = y;
  var fireworkparticle = [];
  this.depleted = false;

  // Create firework particles
  for (var i = 0; i < 360; i++) {
    fireworkparticle.push(new FireworkParticle(x, y, colour, i, 10));
  }

  // Draw the effects
  this.draw = function() {
    // Draw firework particles
    for (var i = 0; i < fireworkparticle.length; i += 18) {
      fireworkparticle[i].draw();
    }

    // Check if fireworks are depleted
    if (fireworkparticle[0].speed <= 0) {
      this.depleted = true;
    }
  };
}

/* ------------------------------------------------------------
   UpdateEffects Object
   ------------------------------------------------------------ */
function UpdateEffects() {
  // Array to hold fireworks
  var fireworks = [];

  // Add a new firework effect
  this.addFirework = function() {
    var fire_colour = null;

    // Generate random RGB color values
    var r = random(0, 255);
    var g = random(0, 255);
    var b = random(0, 255);
    fire_colour = color(r, g, b);

    // Generate random coordinates for the firework
    var fwork_x = random(width * 0.2, width * 0.8);
    var fwork_y = random(height * 0.2, height * 0.8);

    // Create a new firework effect and add it to the array
    var firework = new Effects(fire_colour, fwork_x, fwork_y);
    fireworks.push(firework);
  };

  // Update and draw all fireworks
  this.update = function() {
    for (var i = 0; i < fireworks.length; i++) {
      fireworks[i].draw();

      // Check if fireworks are depleted and remove them from the array
      if (fireworks[i].depleted) {
        fireworks.splice(i, 1);
      }
    }
  };
}
