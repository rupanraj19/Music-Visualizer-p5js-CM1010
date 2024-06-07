/* ------------------------------------------------------------
   ControlsAndInput Constructor
   ------------------------------------------------------------ */
var playlistVisible = false; // Initially, the playlist is hidden

function ControlsAndInput() {
  // Properties
  this.menuDisplayed = false;
  this.x = windowWidth / 2 + 100;
  this.y = windowHeight / 1.12;
  this.width = 55;
  this.height = 55;

  // Playback button displayed in the top left of the screen
  this.playbackButton = new PlaybackButton();
  this.fullscreenButton = new FullscreenButton();

  // Handle mouse click events
  this.mousePressed = function() {
    // Check if the playback button has been clicked
    var isPlaybackButtonClicked = this.playbackButton.hitCheck();
    var isFullscreenButtonClicked = this.fullscreenButton.hitCheck();

    if (isPlaybackButtonClicked) {
      console.log("Playback button clicked");
    }

    if (isFullscreenButtonClicked) {
      // Handle fullscreen button click
      console.log("Fullscreen button clicked");
      toggleFullscreen();
    }

    // Check if the click is on the next song button
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      if (sound.isPlaying()) {
        nextSong(); // Call the nextSong function to load and play the next song
      }
    }

    // Check if the click is on the previous song button
    if (
      mouseX < this.x - 150 &&
      mouseX > this.x - 200 &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      if (sound.isPlaying()) {
        previousSong(); // Call the previousSong function to load and play the previous song
      }
    }

    // Check if the mouse is over the playlist toggle button or shape
    if (
      mouseX > this.x - 350 &&
      mouseX < this.x - 255 &&
      mouseY > this.y - 5 &&
      mouseY < this.y + 50
    ) {
      // Toggle the playlist visibility
      playlistVisible = !playlistVisible;
    }

  };

  // Respond to keyboard key presses
  // @param keycode The ASCII code of the key pressed
  this.keyPressed = function(keycode) {
    console.log(keycode);
  };

  // Draw the playback button and potentially the menu
  this.draw = function() {
    push();

    // Draw the playback button
    this.playbackButton.draw();
    this.fullscreenButton.draw();
    //  playlist toggle button
    image(list, this.x - 310, this.y + 2, this.width, this.height);

    // Draw the playlist container if it's visible
    if (playlistVisible) {
    stroke("#ea638c");
    strokeWeight(5)
    fill(211, 211, 211, 100);
    rect(25, 50, 500, height);
    noStroke();
    // Draw playlist items inside the container
    textSize(36)
    fill(255)
    text("SONGS", 250, 80)
    textSize(32);
    textAlign(LEFT, CENTER);

    for (var i = 0; i < playlist.length; i++) {
      var y = 130 + i * 50; // vertical position
      text((i+1)+ "." + playlist[i].name, 52, y); // Display song names
    }
    }
    pop();
  };
}

/* ------------------------------------------------------------
   FullscreenButton Object
   ------------------------------------------------------------ */
function FullscreenButton() {
  // Properties
  this.x = windowWidth / 2 + 200;
  this.y = windowHeight / 1.12;
  this.width = 55;
  this.height = 55;

  // Check if the button is clicked
  this.hitCheck = function() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      return true;
    }
    return false;
  };

  // Draw the fullscreen button
  this.draw = function() {
    image(fscreen, this.x + 10, this.y, this.width, this.height);
  };
}

/* ------------------------------------------------------------
   Toggle Fullscreen Function
   ------------------------------------------------------------ */
function toggleFullscreen() {
  var fs = fullscreen();
  fullscreen(!fs);
}

