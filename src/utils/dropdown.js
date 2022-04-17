let index = 0;
/**function that handle the keypress event */
const handleKeyPress = ({ code }) => {
  const options = document.querySelectorAll(".dropdown__panel-item");

  /**
   * if we reach any limit of the array we set either the last or first element as selected
   */
  function move() {
    if (index < 0) {
      index = options.length - 1;
    }
    if (index >= options.length) {
      index = 0;
    }
  }
  /**
   * when pressing the key arrow up, we go backward the array of items
   * when pressing the key arrow down, we go forward the array of items
   */
  switch (code) {
    case "ArrowUp":
      index -= 1;
      break;
    case "ArrowDown":
      index += 1;
      break;
    default:
      index = 0;
      break;
  }

  move();
  /** set focus in the selected item */
  options[index].focus();
};

/** toggle the dropdown panel when click the dropdown */
export default () => {
  const panel = document.querySelector(".dropdown__panel");
  panel.classList.toggle("dropdown__panel--isVisible");

  /** when the dropdown panel is visible we add the keypress event to navigate the dropdown with the arrow keys */
  if (panel.classList.contains("dropdown__panel--isVisible")) {
    panel.addEventListener("keyup", handleKeyPress);
  } else {
    /** when we hide the dropdown panel we remove the keypress event */
    panel.removeEventListener("keyup", handleKeyPress);
  }
};
