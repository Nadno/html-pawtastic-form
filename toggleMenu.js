let active = false;

const menu = document.querySelector(".l-intro__header");

document.querySelector(".toggle-menu")
  .addEventListener("click", (event) => {
    event.stopPropagation();
    active = !active;

    if (active) {
      document.body.style.overflowY = "hidden";
      menu.classList.add("on");
    } else {
      document.body.style.overflowY = "initial";
      menu.classList.remove("on")
    }
  });