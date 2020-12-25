// Source: https://konvajs.org/docs/sandbox/Editable_Text.html
// Edited by: Saket Roy [25/12]

const addTextNode = (data) => {
  const textNode = new Konva.Text({
    x: image.x(),
    y: image.y(),
    draggable: true,
    id: data.id,
    text: data.text,
    fontSize: data.fontSize,
    fontFamily: data.fontFamily,
    fill: data.fill,
    // Function works accurately but fails after rotating text
    // dragBoundFunc: (pos) => {
    //   let w = image.width();
    //   let h = image.height();

    //   let tex_w = textNode.width();
    //   let tex_h = textNode.height();

    //   return {
    //     x: Math.min(w + image.x() - tex_w, Math.max(pos.x, image.x())),
    //     y: Math.min(h + image.y() - tex_h, Math.max(pos.y, image.y())),
    //   };
    // },
  });

  const tr = new Konva.Transformer({
    node: textNode,
    enabledAnchors: ["middle-left", "middle-right"],
    // set minimum width of text
    boundBoxFunc: (oldBox, newBox) => {
      newBox.width = Math.max(30, newBox.width);
      return newBox;
    },
  });

  textNode.on("transform", function () {
    // reset scale, so only width is changing by transformer
    textNode.setAttrs({
      width: textNode.width() * textNode.scaleX(),
      scaleX: 1,
    });
  });

  layer.add(textNode);
  layer.add(tr);
  layer.draw();

  textNode.on("dblclick", () => {
    // hide text node and transformer:
    textNode.hide();
    tr.hide();
    layer.draw();

    // at first lets find position of text node relative to the stage:
    var textPosition = textNode.absolutePosition();

    // then lets find position of stage container on the page:
    var stageBox = stage.container().getBoundingClientRect();

    // so position of textarea will be the sum of positions above:
    var areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    // create textarea and style it
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);

    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = textNode.text();
    textarea.style.position = "absolute";
    textarea.style.top = areaPosition.y + "px";
    textarea.style.left = areaPosition.x + "px";
    textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
    textarea.style.height =
      textNode.height() - textNode.padding() * 2 + 5 + "px";
    textarea.style.fontSize = textNode.fontSize() + "px";
    textarea.style.border = "none";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "none";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transformOrigin = "left top";
    textarea.style.textAlign = textNode.align();
    textarea.style.color = textNode.fill();
    rotation = textNode.rotation();
    var transform = "";
    if (rotation) {
      transform += "rotateZ(" + rotation + "deg)";
    }

    var px = 0;

    transform += "translateY(-" + px + "px)";
    textarea.style.transform = transform;

    // reset height
    textarea.style.height = "auto";

    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + "px";

    textarea.focus();

    function removeTextarea() {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener("click", handleOutsideClick);
      textNode.show();
      tr.show();
      tr.forceUpdate();
      layer.draw();
    }

    function setTextareaWidth(newWidth) {
      if (!newWidth) {
        // set width for placeholder
        newWidth = textNode.placeholder.length * textNode.fontSize();
      }
      // some extra fixes on different browsers

      textarea.style.width = newWidth + "px";
    }

    textarea.addEventListener("keydown", function (e) {
      // hide on enter
      // but don't hide on shift + enter
      if (e.key === "Enter" && !e.key === "Shift") {
        textNode.text(textarea.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.key === "Escape") {
        removeTextarea();
      }
    });

    textarea.addEventListener("keydown", function (e) {
      scale = textNode.getAbsoluteScale().x;
      setTextareaWidth(textNode.width() * scale);
      textarea.style.height = "auto";
      textarea.style.height =
        textarea.scrollHeight + textNode.fontSize() + "px";
    });

    function handleOutsideClick(e) {
      if (e.target !== textarea) {
        textNode.text(textarea.value);
        removeTextarea();
      }
    }
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  });
};

const removeTextNode = (id) => {
  let textNode = layer.findOne(`#${id}`);
  textNode.remove();
  layer.draw();
};
