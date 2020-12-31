const isVisibleOnVertical = (element) => {
  let position = element.getBoundingClientRect();
  const vpHeight = window.innerHeight - 50;
  return (
    (position.top <= 0 && position.bottom > 0) ||
    (position.top > 0 && position.top < vpHeight)
  );
};

const SCHEDULE_COMPONENT = "c-schedule";
const TESTIMONIAL_COMPONENT = "c-testimonial"

const scheduleComponents = document.querySelectorAll(`.${SCHEDULE_COMPONENT}`);
const testimonialComponents = document.querySelectorAll(`.${TESTIMONIAL_COMPONENT}`);
const animations = {
  [SCHEDULE_COMPONENT]: {
    animation: [
      {},
      {
        transform: "initial",
        opacity: 1,
      },
    ],
    options: {
      id: "show-schedule-button",
      delay: 200,
      duration: 600,
      fill: "forwards",
    },
  },
  [TESTIMONIAL_COMPONENT]: {
    animation: [
      {},
      {
        transform: "initial",
        opacity: 1,
      },
    ],
    options: {
      id: "show-comment",
      delay: 200,
      duration: 600,
      fill: "forwards",
    },
  },
};

const components = [...scheduleComponents, ...testimonialComponents];
const setComponentsAnimate = () => {
  components.forEach((component) => {
    if (isVisibleOnVertical(component)) {
      const [componentName] = component.className.split(" ")
      const { animation, options } = animations[componentName];
      component.animate(animation, options);
    }
  });
};

window.addEventListener("scroll", setComponentsAnimate);
window.addEventListener("resize", setComponentsAnimate);
