// Global variables for the controls and input
var controls = null;
var vis = null; // Store visualizations in a container
var sound = null; // Variable for the p5 sound object
var fourier; // Variable for p5 fast Fourier transform
var visualizationSelector;
var songDuration = 0;
var songPosition = 0;
var songInput;

// Playlist array with song information
var playlist = [
  { name: 'ALONE', path: 'music/alone.mp3' },
  { name: "SPECTRE", path: "music/The_Spectre.mp3" }
];

var currentSongIndex = 0;

// Preload function
function preload() {
  // Load the initial song
  sound = loadSound(playlist[currentSongIndex].path, function () {
    songDuration = sound.duration();
    songPosition = 0; // Start the song position from 0
  });

  livebg = createVideo('assets/livebg.mp4');
  livebg.hide();
  livebg.loop();

  // Load images for icons and backgrounds
  bg2 = loadImage('assets/bg2.jpg');
  bg3 = loadImage('assets/bg3.jpg');
  play = loadImage('assets/play.png');
  pause = loadImage('assets/pause.png');
  next = loadImage('assets/next.png');
  previous = loadImage('assets/previous.png');
  fscreen = loadImage('assets/fs.png');
  list = loadImage('assets/list.png');
  logo = loadImage('assets/logo.png');
  rocket = loadImage('assets/rocket.png');
}

// Setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  controls = new ControlsAndInput();

  // Instantiate the FFT object for audio analysis
  fourier = new p5.FFT();

  // Create a new visualisation container and add visualisations
  vis = new Visualisations();
  vis.add(new Spectrum());
  vis.add(new WavePattern());
  vis.add(new Needles());
  vis.add(new CirclePattern());
  vis.add(new RidgePlot());
  vis.add(new BlockMidHighLow())
  vis.add(new Fireworks());
  vis.add(new Dpattern());
  vis.add(new Tunnel());

  // Create a dropdown menu to select visualizations
  visualizationSelector = createSelect();
  visualizationSelector.position(windowWidth / 2 + 300, windowHeight / 1.12 + 5);

  // Populate dropdown options
  for (var i = 0; i < vis.visuals.length; i++) {
    visualizationSelector.option(vis.visuals[i].name);
  }

  visualizationSelector.changed(changeVisualization);

  // Create the song input element
  songInput = createFileInput(fileSelected);
  songInput.class('FileInput');
  songInput.position(0,0);

}

// Draw function
function draw() {
  // Draw the selected visualisation
  vis.selectedVisual.draw();

  // Draw the controls on top
  controls.draw();

  // Calculate song position and update the progress bar
  if (sound && sound.isPlaying()) {
    songPosition = sound.currentTime();
  }

}

// Change Visualization function
function changeVisualization() {
  var selectedValue = visualizationSelector.value();

  // Use the existing selectVisual method if the visualization exists
  if (vis.selectedVisual) {
    vis.selectVisual(selectedValue);
  } else {
    // Create the visualization if it doesn't exist yet
    vis.createVisual(selectedValue);
  }
}

// Mouse Clicked function
function mouseClicked() {
  controls.mousePressed();
}

// Key Pressed function
function keyPressed() {
  controls.keyPressed(keyCode);
}

// Window Resized function
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (vis.selectedVisual.hasOwnProperty('onResize')) {
    vis.selectedVisual.onResize();
  }
}

// Next Song function
function nextSong() {
  // Stop the current song
  sound.stop();

  // Increment the current song index
  currentSongIndex++;
  if (currentSongIndex >= playlist.length) {
    currentSongIndex = 0;
  }

  // Load the next song and update duration and position
  sound = loadSound(playlist[currentSongIndex].path, function () {
    songDuration = sound.duration();
    songPosition = 0; // Reset song position to start
    sound.play(); // Start playing the new song
  });
}

// Previous Song function
function previousSong() {
  // Stop the current song
  sound.stop();

  // Decrement the current song index
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1; // Wrap around to the last song
  }

  // Load the previous song and update duration and position
  sound = loadSound(playlist[currentSongIndex].path, function () {
    songDuration = sound.duration();
    songPosition = 0; // Reset song position to start
    sound.play(); // Start playing the previous song
  });
}

// Callback function for file input
function fileSelected(file) {
  if (file.type === 'audio') {
    // Create a new entry in the playlist with the file's name and path
    playlist.push({ name: file.name, path: file.data });

    // Update the visualization if needed
    changeVisualization();

    // Optionally, you can reset the song to the newly uploaded song
    currentSongIndex = playlist.length - 1;
    sound.stop();
    sound = loadSound(playlist[currentSongIndex].path, function () {
      songDuration = sound.duration();
      songPosition = 0;
      sound.play();
    });
  } else {
    alert('Please select an audio file.');
  }
}
