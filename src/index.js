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

const addText = (data) => {
  let simpleText = new Konva.Text({
    x: image.x(),
    y: image.y(),
    draggable: true,
    name: data.name,
    text: data.text,
    fontSize: data.fontSize,
    fontFamily: data.fontFamily,
    fill: data.fill,
    dragBoundFunc: (pos) => {
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
    },
  });

  arr.push(simpleText);
  layer.add(simpleText);
};

const anim = new Konva.Animation(() => {}, layer);

vid.addEventListener("loadedmetadata", () => {
  image.width(vid.videoWidth * 0.75);
  image.height(vid.videoHeight * 0.75);
});

document.getElementById("play").addEventListener("click", () => {
  vid.play();
  anim.start();
});

document.getElementById("pause").addEventListener("click", () => {
  vid.pause();
  anim.stop();
});

document.getElementById("text-submit").addEventListener("click", () => {
  let text = document.getElementById("add-text-field").value;
  let fontFamily = document.getElementById("font-style-select").value;
  let fontSize = document.getElementById("font-size-select").value;
  let name = `konva_text_${arr.length}`;

  console.log(name);
  let data = {
    name,
    text,
    fontSize,
    fontFamily,
    fill: "black",
  };

  addText(data);
});
