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

const scheduleComponents = document.querySelectorAll(`.${SCHEDULE_COMPONENT}`);
const testimonialComponents = document.querySelectorAll(
  `.${TESTIMONIAL_COMPONENT}`
);
const imageComponents = document.querySelectorAll(`.${IMAGE_COMPONENT}`);

const animation = [
  {},
  {
    transform: "initial",
    opacity: 1,
  },
];

const animationOptions = {
  [SCHEDULE_COMPONENT]:  {
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
};

const components = [
  ...imageComponents,
  ...scheduleComponents,
  ...testimonialComponents,
];
const setComponentsAnimate = () => {
  if (components.length) {
    components.forEach((component, index) => {
      if (isVisibleOnVertical(component)) {
        const [componentName] = component.className.split(" ");
        const options = animationOptions[componentName];
        component.animate(animation, options);

        components.splice(index, 1);
      }
    });
  }
};

window.addEventListener("scroll", setComponentsAnimate);
window.addEventListener("resize", setComponentsAnimate);
