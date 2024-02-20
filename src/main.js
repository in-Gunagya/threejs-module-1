import Scene from "./module2/light";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas.webgl");
  new Scene({ canvas});
});
