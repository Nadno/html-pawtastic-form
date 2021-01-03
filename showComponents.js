const isVisibleOnVertical = (element) => {
  let position = element.getBoundingClientRect();
  const vpHeight = window.innerHeight - 50;
  return (
    (position.top <= 0 && position.bottom > 0) ||
    (position.top > 0 && position.top < vpHeight)
  );
};

const SCHEDULE_COMPONENT = "c-schedule";
const TESTIMONIAL_COMPONENT = "c-testimonial";
const IMAGE_COMPONENT = "c-image";
const ICON_COMPONENT = "c-option__icon";

const toAnimation = {
  default: {
      transform: "initial",
      opacity: 1,
  },

  [ICON_COMPONENT]: {
    transform: "translate(-50%, -50%)",
    opacity: 1,
  },
};

const animationOptions = {
  [SCHEDULE_COMPONENT]: {
    id: "show-schedule-button",
    delay: 200,
    duration: 600,
    fill: "forwards",
  },

  [TESTIMONIAL_COMPONENT]: {
    id: "show-comment",
    delay: 300,
    duration: 600,
    fill: "forwards",
  },

  [IMAGE_COMPONENT]: {
    id: "show-image",
    delay: 500,
    duration: 800,
    fill: "forwards",
  },

  [ICON_COMPONENT]: {
    id: "show-icon",
    delay: 200,
    duration: 400,
    fill: "forwards",
  },
};

const getComponents = (name) => document.querySelectorAll(`.${name}`);
const components = [
  ...getComponents(ICON_COMPONENT),
  ...getComponents(IMAGE_COMPONENT),
  ...getComponents(SCHEDULE_COMPONENT),
  ...getComponents(TESTIMONIAL_COMPONENT),
];

const setComponentAnimation = () => {
  if (components.length) {
    const from = {};
    const animation = [from];
    const showComponents = (component, index) => {
      if (isVisibleOnVertical(component)) {
        const [componentName] = component.className.split(" ");
        const options = animationOptions[componentName];

        animation.push(
          toAnimation[componentName]
            ? toAnimation[componentName]
            : toAnimation.default
        );
        component.animate(animation, options);
        components.splice(index, 1);
      }
    };

    components.forEach(showComponents);
  }
};

window.addEventListener("scroll", setComponentAnimation);
window.addEventListener("resize", setComponentAnimation);
