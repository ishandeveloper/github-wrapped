import gsap from "gsap";

let mouseDown = false,
  mouseX = 0,
  mouseY = 0,
  pivotElement,
  baseElement;

export const graphThreeEntry = (pivot, base) => {
  pivotElement = pivot;
  baseElement = base;
  initLanding();
  addMouseHandler(document.querySelector("canvas"));
};

const initLanding = (base) => {
  const timeline = gsap.timeline();

  if (pivotElement) {
    pivotElement.rotation.y = 0.25;
  }

  timeline.timeScale(2);

  if (baseElement && pivotElement) {
    timeline
      .to(
        pivotElement.rotation,
        {
          x: 0,
          y: -0.25,
          z: 0,
        },
        "+=0.5"
      )
      .to(
        pivotElement.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
        },
        "+=0.5"
      )
      .to(
        pivotElement.scale,
        {
          x: 1,
          y: 1,
          z: 1,
        },
        "-=1"
      );
  }
};

const addMouseHandler = (canvas) => {
  canvas.addEventListener("mousemove", (e) => onMouseMove(e), false);
  canvas.addEventListener("mousedown", (e) => onMouseDown(e), false);
  canvas.addEventListener("mouseup", (e) => onMouseUp(e), false);
  canvas.addEventListener("wheel", (e) => onMouseWheel(e), false);
};

const onMouseMove = (evt) => {
  if (!mouseDown) {
    return;
  }

  evt.preventDefault();

  const deltaX = evt.clientX - mouseX;
  const deltaY = evt.clientY - mouseY;

  mouseX = evt.clientX;
  mouseY = evt.clientY;
  rotateScene(deltaX, deltaY);
};

const onMouseDown = (evt) => {
  evt.preventDefault();

  mouseDown = true;
  mouseX = evt.clientX;
  mouseY = evt.clientY;
};

const onMouseUp = (evt) => {
  evt.preventDefault();

  mouseDown = false;
};

const onMouseWheel = (evt) => {
  evt.preventDefault();
  zoomScene(evt.deltaY);
};
const rotateScene = (deltaX, deltaY) => {
  if (deltaX < 0 && pivotElement.rotation.y > -0.75) {
    pivotElement.rotation.y += deltaX / 100;
  } else if (deltaX > 0 && pivotElement.rotation.y < 0.75) {
    pivotElement.rotation.y += deltaX / 100;
  }

  if (deltaY < 0 && pivotElement.rotation.x > -0.75) {
    pivotElement.rotation.x += deltaY / 100;
  } else if (deltaY > 0 && pivotElement.rotation.x < 0.75) {
    pivotElement.rotation.x += deltaY / 100;
  }
};

const zoomScene = (deltaY) => {
  if (deltaY < 0 && pivotElement.scale.x > 0.75) {
    pivotElement.scale.x += deltaY / 100;
    pivotElement.scale.y += deltaY / 100;
    pivotElement.scale.z += deltaY / 100;
  } else if (deltaY > 0 && pivotElement.scale.x < 1.5) {
    pivotElement.scale.x += deltaY / 100;
    pivotElement.scale.y += deltaY / 100;
    pivotElement.scale.z += deltaY / 100;
  }
};
