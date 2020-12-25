// Created By Saket Roy 25/12
// To understand KonvaJS

// Set the size of the canvas (Stage)
const WIDTH = 540;
const HEIGHT = 540;

// A counter to give each text overlay item a unique id
let counter = 1;

// Global variables to set up Konva and load the video to the canvas
let stage, layer, vid, text, image, anim;

// Initialization function to set up Konva
const init = () => {
  // Create the base canvas (Stage) where all rendering happens
  stage = new Konva.Stage({
    container: "canvas-ctr",
    width: WIDTH,
    height: HEIGHT,
  });

  // Create a Layer (which is just another self-contained canvas element)
  layer = new Konva.Layer();

  // Append the Layer to the Stage
  stage.add(layer);
};

// Set up the video on Konva
const setUpVideo = () => {
  vid = document.createElement("video");
  vid.src = "./assets/video/journey.mp4";
  vid.loop = true;

  text = new Konva.Text({
    text: "Loading video...",
    width: stage.width(),
    height: stage.height(),
    align: "center",
    verticalAlign: "middle",
  });

  image = new Konva.Image({
    image: vid,
    draggable: false,
  });

  layer.add(text);
  layer.add(image);
  layer.draw();

  anim = new Konva.Animation(() => {}, layer);

  vid.addEventListener("loadedmetadata", () => {
    text.text("Press PLAY...");
    image.width(vid.videoWidth);
    image.height(vid.videoHeight);

    image.x((stage.width() - image.width()) / 2);
    image.y((stage.height() - image.height()) / 2);

    layer.draw();
  });
};

// Event Handler to play the video
const playVideo = () => {
  text.destroy();
  vid.play();
  anim.start();
};

// Event Handler to pause the video
const pauseVideo = () => {
  vid.pause();
  anim.stop();
};

// Event Handler to add the text overlay to video
const addTextOverlay = () => {
  let text = document.getElementById("add-text-field").value,
    fontFamily = document.getElementById("font-style-select").value,
    fontSize = document.getElementById("font-size-select").value,
    fill = document.getElementById("font-color-input").value.toString(),
    id = `konva_text_${counter}`;

  counter++;

  let data = {
    id,
    text,
    fontSize,
    fontFamily,
    fill,
  };

  addTextNode(data);
};

// Initialize the canvas on DOMContentLoad
document.addEventListener("DOMContentLoaded", () => {
  init();
  setUpVideo();
});

// Event Listeners for various events
document.getElementById("play").addEventListener("click", playVideo);
document.getElementById("pause").addEventListener("click", pauseVideo);
document
  .getElementById("text-submit")
  .addEventListener("click", addTextOverlay);
document.getElementById("add-image").addEventListener("click", addImageOverlay);
