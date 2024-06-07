/* ------------------------------------------------------------
   Tunnel Visualization
   ------------------------------------------------------------ */
// global variables
var pieces, radius, mapMouseX, mapMouseY;
var colorPalette = "#700505";
var colorPalette2 = "#f9c406";
var colorPalette3 = "#bab1a1";

var x = 1300;
var y = 50;

function Tunnel() {

    // Name of the visualization
    this.name = 'tunnel';
    var gui;

    // Setup function for initializing the visualization
    this.setup = function() {
        pieces = 4;
        radius = windowHeight / 4;

        gui = createGui('Tunnel GUI');
        gui.setPosition(width - 200, 0);

        // Slider ranges for GUI controls
        sliderRange(1000, windowWidth, 20);
        gui.addGlobals('x');
        sliderRange(0, windowHeight, 20);
        gui.addGlobals('y');
        gui.addGlobals('colorPalette');
        gui.addGlobals('colorPalette2');
        gui.addGlobals('colorPalette3');

        gui.hide();
    }

    // Call the setup function to initialize the visualization
    this.setup();

    // Function to handle resizing
    this.onResize = function() {
        gui.setPosition(width - 200, 0);
    }

    // Call onResize when the window is resized
    this.onResize();

    // Draw method for Tunnel visualization
    this.draw = function() {
        push();
        background(bg3);

        fourier.analyze();
        var bass = fourier.getEnergy("bass");
        var treble = fourier.getEnergy(100, 150);
        var mid = fourier.getEnergy("mid");

        var mapbass = map(bass, 0, 255, -100, 800);
        var scalebass = map(bass, 0, 255, 0.5, 1.2);

        var mapMid = map(mid, 0, 255, -radius / 4, radius * 4);
        var scaleMid = map(mid, 0, 255, 1, 1.5);

        var mapTreble = map(treble, 0, 255, -radius / 4, radius * 4);
        var scaleTreble = map(treble, 0, 255, 1, 1.5);

        mapMouseX = map(x, 0, width, 2, 0.1); 
        mapMouseY = map(y, 0, height, windowHeight / 8, windowHeight / 6);

        pieces = mapMouseX;
        radius = mapMouseY;

        translate(width / 2, height / 2);

        for (i = 0; i < pieces; i += 0.01) {
            rotate(TWO_PI / pieces);

            /*----------  BASS  ----------*/
            push();
            strokeWeight(3);
            stroke(colorPalette);
            scale(scalebass);
            rotate(frameCount * -0.5);
            line(mapbass, radius / 2, radius, radius);
            line(-mapbass, -radius / 2, radius, radius);
            pop();

            /*----------  MID  ----------*/
            push();
            strokeWeight(4);
            stroke(colorPalette2);
            scale(scaleMid);
            line(mapMid, radius, radius * 2, radius * 2);
            pop();

            /*----------  TREMBLE  ----------*/
            push();
            stroke(colorPalette3);
            scale(scaleTreble);
            line(mapTreble, radius / 2, radius, radius);
            pop();
        }
        pop();
    }

    // Function to show the GUI when this visualization is selected
    this.selectVisual = function() {
        console.log("show")
        gui.show()
    }

    // Function to hide the GUI when this visualization is deselected
    this.unSelectVisual = function() {
        console.log("hide");
        gui.hide();
    }
}
