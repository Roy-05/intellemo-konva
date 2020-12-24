let width = 800;
let height = 600;

const stage = new Konva.Stage({
  container: "canvas-ctr",
  width,
  height,
});

const layer = new Konva.Layer();

stage.add(layer);

const vid = document.createElement("video");
vid.src = "./assets/running.webm";
const image = new Konva.Image({
  image: vid,
  draggable: false,
  x: 50,
  y: 20,
});

layer.add(image);
layer.draw();

var simpleText = new Konva.Text({
  x: image.x(),
  y: image.y(),
  draggable: true,
  text: "Get Motivated!",
  fontSize: 30,
  fontFamily: "san-serif",
  fill: "black",
});

const anim = new Konva.Animation(() => {}, layer);

vid.addEventListener("loadedmetadata", () => {
  image.width(vid.videoWidth * 0.75);
  image.height(vid.videoHeight * 0.75);

  simpleText.dragBoundFunc((pos) => {
    let w = image.width();
    let h = image.height();

    let tex_w = simpleText.width();
    let tex_h = simpleText.height();
    let x, y;

    if (pos.x < image.x()) {
      x = image.x();
    } else if (pos.x > w + image.x() - tex_w) {
      x = w - tex_w + image.x();
    } else {
      x = pos.x;
    }

    if (pos.y < image.y()) {
      y = image.y();
    } else if (pos.y > h + image.y() - tex_h) {
      y = h + image.y() - tex_h;
    } else {
      y = pos.y;
    }

    return { x, y };
  });
  layer.draw();
});

document.getElementById("play").addEventListener("click", () => {
  layer.add(simpleText);
  vid.play();
  anim.start();
});

document.getElementById("pause").addEventListener("click", () => {
  vid.pause();
  anim.stop();
});
