// Container function for managing visualizations
function Visualisations() {
  // Array to store visualizations
  this.visuals = [];
  // Currently selected visualization, set to null until a visualization is loaded
  this.selectedVisual = null;

  // Add a new visualization to the array
  // @param vis: A visualization object
  this.add = function(vis) {
    this.visuals.push(vis);
    // If selectedVisual is null, set the new visualization as the current visualization
    if (this.selectedVisual == null) {
      this.selectVisual(vis.name);
    }
  };

  // Select a visualization using its name property
  // @param visName: Name property of the visualization
  this.selectVisual = function(visName) {

    if (this.selectedVisual != null) {
      if (this.selectedVisual.hasOwnProperty('unSelectVisual')) {
        this.selectedVisual.unSelectVisual();
      }
    }

    for (var i = 0; i < this.visuals.length; i++) {
      if (visName == this.visuals[i].name) {
        this.selectedVisual = this.visuals[i];
        if (this.selectedVisual.hasOwnProperty("selectVisual")) {
          this.selectedVisual.selectVisual();
        }
      }
    }
  };
}
