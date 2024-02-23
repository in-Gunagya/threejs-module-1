import Scene from "./module2/shadows";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector("canvas.webgl");
  new Scene({ canvas});
});
