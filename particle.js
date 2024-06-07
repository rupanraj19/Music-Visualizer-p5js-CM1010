/* ------------------------------------------------------------
   FireworkParticle Object
   ------------------------------------------------------------ */
function FireworkParticle(x, y, colour, angle, speed) {
  // Properties
  var x = x;
  var y = y;
  var angle = angle;
  this.speed = speed;
  this.colour = colour;
  this.age = 255;

  // Draw the particle
  this.draw = function() {
    // Update particle position and color
    this.update();
    var r = red(this.colour) - (255 - this.age);
    var g = green(this.colour) - (255 - this.age);
    var b = blue(this.colour) - (255 - this.age);
    var c = color(r, g, b);
    fill(c);
    this.age -= 1;
    ellipse(x, y, 10, 10);
  };

  // Update particle position
  this.update = function() {
    // Update particle speed and position
    this.speed -= 0.1;
    x += cos(angle) * speed + noise(frameCount) * 10;
    y += sin(angle) * speed + noise(frameCount) * 10;
  };
}

/* ------------------------------------------------------------
   Circlepattern Particles 
------------------------------------------------------------ */
function CircleParticle() {
  // Particle properties
  this.pos = p5.Vector.random2D().mult(250);
  this.vel = createVector(0, 0);
  this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
  this.w = random(3, 5);
  this.color = color(random(255), random(255), random(255));

  // Particle update function
  this.update = function(cond) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  };

  // Check if particle is outside the canvas
  this.edges = function() {
    if (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Display particle
  this.show = function() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 4);
  };
}
