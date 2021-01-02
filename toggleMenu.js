let active = false;

const menu = document.querySelector(".l-intro__header");

document.querySelector(".toggle-menu")
  .addEventListener("click", (event) => {
    event.stopPropagation();
    active = !active;

    if (active) {
      menu.classList.add("on");
      document.body.style.overflowY = "hidden";
    } else {
      menu.classList.remove("on")
      document.body.style.overflowY = "initial";
    }
  });