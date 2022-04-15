let index = 0;
const handleKeyPress = ({ code }) => {
  const options = document.querySelectorAll(".dropdown__panel-item");
  
  function move() {
    if (index < 0) { index = options.length - 1; }
    if (index >= options.length) { index = 0; }
  }

  switch (code) {
    case "ArrowUp": index -= 1;
      break;
    case "ArrowDown": index += 1;
      break;
    default: index = 0;
      break;
  }

  move();
  options[index].focus();
};

export default () => {
  const panel = document.querySelector(".dropdown__panel");
  panel.classList.toggle("dropdown__panel--isVisible");

  if (panel.classList.contains("dropdown__panel--isVisible")) {
      console.log('add')
    panel.addEventListener("keyup", handleKeyPress);
  } else {
    panel.removeEventListener("keyup", handleKeyPress);
  }
};
