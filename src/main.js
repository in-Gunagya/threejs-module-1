import Scene from "./scenes/3dText";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas.webgl");
  new Scene({ canvas});
});
