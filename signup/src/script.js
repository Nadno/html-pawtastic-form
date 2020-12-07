"use strict";
import element from "./getElements.js";
import { ValidFormStep } from "./form.js";
import "./setForm.js";

const STEPS = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
];
const SIGNUP_FORM = ".sign-up";

const MAX_STEPS = 6;
let step = 4;

const radiosTo = document.querySelectorAll(".radio__to");

const getIdForStep = (step) => `#${STEPS[step]}`;
export const getStepName = () => STEPS[step];

const addAndRemoveHidden = (lastStep, nextStep) => {
  element(lastStep).setAttribute("hidden", "");
  element(nextStep).removeAttribute("hidden");
  element(".side").style.backgroundImage = `url(../images/sign-up__${step}.jpg)`;
};

const setRadioStep = () => {
  const FIRST_RADIO = step === 2;
  if (FIRST_RADIO) return (radiosTo[0].checked = true);

  const BETWEEN_THIRD_AND_FOURTH = step === 3 || step === 4;
  if (BETWEEN_THIRD_AND_FOURTH) return (radiosTo[1].checked = true);

  const SIXTH_RADIO = step === 5;
  if (SIXTH_RADIO) return (radiosTo[2].checked = true);

  const LAST_RADIO = step === 6;
  if (LAST_RADIO) return (radiosTo[3].checked = true);
};

const changeToSecond = (toggle = "add") => {
  element("footer").classList[toggle]("change__point");
  element(".side__content").classList[toggle]("change__point");
};

const nextButton = () => {
  const button = element("button[type=\"submit\"]").disabled;
  if (step === (MAX_STEPS - 1)) {
    return button.disabled = true;
  } else if (button.disabled) {
    return button.disabled = false;
  }
};

function nextStep(e) {
  e.preventDefault();
  nextButton();

  if (ValidFormStep(STEPS[step])) {
    step++;
    const lastStep = getIdForStep(step - 1);
    const nextStep = getIdForStep(step);
    addAndRemoveHidden(lastStep, nextStep);

    if (step === 2) changeToSecond();
    setRadioStep();
  };
}

function backStep(e) {
  e.preventDefault();
  nextButton();

  step--;
  const lastStep = getIdForStep(step + 1);
  const nextStep = getIdForStep(step);
  addAndRemoveHidden(lastStep, nextStep);

  if (step === 1) changeToSecond("remove");
  setRadioStep();
}

element(SIGNUP_FORM).addEventListener("submit", (e) => {
  if (step !== MAX_STEPS) return nextStep(e);
});
element("#back-btn").addEventListener("click", backStep);
