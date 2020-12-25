// Source: https://konvajs.org/docs/shapes/Image.html
// Edited By: Saket Roy 25/12

// Function to move all anchor elements accurately on image resize
function update(activeAnchor) {
  var group = activeAnchor.getParent();

  var topLeft = group.get(".topLeft")[0];
  var topRight = group.get(".topRight")[0];
  var bottomRight = group.get(".bottomRight")[0];
  var bottomLeft = group.get(".bottomLeft")[0];
  var image = group.get("Image")[0];

  var anchorX = activeAnchor.getX();
  var anchorY = activeAnchor.getY();

  // update anchor positions
  switch (activeAnchor.getName()) {
    case "topLeft":
      topRight.y(anchorY);
      bottomLeft.x(anchorX);
      break;
    case "topRight":
      topLeft.y(anchorY);
      bottomRight.x(anchorX);
      break;
    case "bottomRight":
      bottomLeft.y(anchorY);
      topRight.x(anchorX);
      break;
    case "bottomLeft":
      bottomRight.y(anchorY);
      topLeft.x(anchorX);
      break;
  }

  image.position(topLeft.position());

  var width = topRight.getX() - topLeft.getX();
  var height = bottomLeft.getY() - topLeft.getY();
  if (width && height) {
    image.width(width);
    image.height(height);
  }
}

function addAnchor(group, x, y, name) {
  var anchor = new Konva.Circle({
    x: x,
    y: y,
    stroke: "#666",
    fill: "#ddd",
    strokeWidth: 2,
    radius: 5,
    name: name,
    draggable: true,
    dragOnTop: false,
  });

  anchor.on("dragmove", function () {
    update(this);
    layer.draw();
  });
  anchor.on("mousedown touchstart", function () {
    group.draggable(false);
    this.moveToTop();
  });
  anchor.on("dragend", function () {
    group.draggable(true);
    layer.draw();
  });
  // add hover styling
  anchor.on("mouseover", function () {
    var layer = this.getLayer();
    document.body.style.cursor = "pointer";
    this.strokeWidth(4);
    layer.draw();
  });
  anchor.on("mouseout", function () {
    var layer = this.getLayer();
    document.body.style.cursor = "default";
    this.strokeWidth(2);
    layer.draw();
  });

  group.add(anchor);
}

const addImageOverlay = () => {
  const img = new Konva.Image({
    width: 50,
    height: 50,
  });

  const imgGrp = new Konva.Group({
    x: 180,
    y: 50,
    draggable: true,
  });
  layer.add(imgGrp);
  imgGrp.add(img);

  addAnchor(imgGrp, 0, 0, "topLeft");
  addAnchor(imgGrp, 50, 0, "topRight");
  addAnchor(imgGrp, 50, 50, "bottomRight");
  addAnchor(imgGrp, 0, 50, "bottomLeft");

  var imgObj = new Image();
  imgObj.onload = function () {
    img.image(imgObj);
    layer.draw();
  };

  imgObj.src = "./assets/img/sun.png";
};
