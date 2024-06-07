/* ------------------------------------------------------------
   Playback Button
   ------------------------------------------------------------ */
function PlaybackButton() {
  // Position and size of the playback button
  this.x = windowWidth / 2;
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
      // Toggle play/pause when the button is clicked
      if (sound.isPlaying()) {
        sound.pause();
      } else {
        sound.loop();
      }
      return true;
    }
    return false;
  };

  // Draw the playback button
  this.draw = function() {
    var maxBarWidth = 600; // Maximum width of the progress bar
    var barRatio = songPosition / songDuration; // Calculate the ratio of position to duration
    var barWidth = maxBarWidth * barRatio; // Calculate the actual width of the red bar
    var barX = this.x - 260; // Adjust the position
    var progressBarY = this.y + this.height + 5; // Y-coordinate of the progress bar

    // Draw a translucent black background for the button and progress bar
    stroke("#ea638c");
    fill(0, 0, 0, 20);
    rect(this.x - 400, this.y - 8, this.width + 900, this.height + 30);
    noFill();
    noStroke();
    fill("pink");
    textSize(22);
    text(`${playlist[currentSongIndex].name}`, this.x - 350, this.y + 35); //song name

    // Use a single image that toggles between play and pause based on sound.isPlaying()
    var buttonImage;

    if (sound.isPlaying()) {
      buttonImage = pause;
    } else {
      buttonImage = play;
    }

    // Draw the playback button, next button, and previous button
    image(buttonImage, this.x, this.y, this.width, this.height);
    image(next, this.x + 100, this.y, this.width, this.height);
    image(previous, this.x - 100, this.y, this.width, this.height);

    // Draw the purple background progress bar
    fill("#6b5598");
    rect(barX, progressBarY, maxBarWidth, 10);

    // Draw the rosepink progress bar covering the purple one
    fill("#fb1084");
    rect(barX, progressBarY, barWidth, 10);

    // Draw the time labels on the progress bar
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    noStroke();
    var songPositionFormatted = formatTime(songPosition);
    var songDurationFormatted = formatTime(songDuration);
    text(songPositionFormatted, barX - 30, progressBarY + 5); // Adjust the position
    text(songDurationFormatted, barX + maxBarWidth + 30, progressBarY + 5); // Adjust the position
  };
}

// Function to format time in minutes and seconds
function formatTime(timeInSeconds) {
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = Math.floor(timeInSeconds % 60);
  return nf(minutes, 2) + ":" + nf(seconds, 2);
}

