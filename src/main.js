import Scene from "./hidr8/hidr8";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas.webgl");
  new Scene({ canvas});
});
