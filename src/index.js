let width = 540;
let height = 540;
arr = [];
const stage = new Konva.Stage({
  container: "canvas-ctr",
  width,
  height,
});

const layer = new Konva.Layer();

stage.add(layer);

const vid = document.createElement("video");
vid.src = "./assets/running.webm";
vid.loop = true;

const image = new Konva.Image({
  image: vid,
  draggable: false,
});

layer.add(image);
layer.draw();

const addText = (data) => {
  let simpleText = new Konva.Text({
    x: image.x(),
    y: image.y(),
    draggable: true,
    id: data.id,
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

  arr.push(data.id);

  layer.add(simpleText);
};

const removeText = (id) => {
  let textNode = layer.findOne(`#${id}`);
  textNode.remove();
  layer.draw();
};

const anim = new Konva.Animation(() => {}, layer);

vid.addEventListener("loadedmetadata", () => {
  image.width(vid.videoWidth * 0.75);
  image.height(vid.videoHeight * 0.75);

  image.x((stage.width() - image.width()) / 2);
  image.y((stage.height() - image.height()) / 2);
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
  let fill = document.getElementById("font-color-input").value.toString();
  let id = `konva_text_${arr.length}`;

  let data = {
    id,
    text,
    fontSize,
    fontFamily,
    fill,
  };

  addText(data);
});
