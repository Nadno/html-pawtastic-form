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
const BACK_STEP_BUTTON = "#back-btn";

let step = 0;

const radiosTo = document.querySelectorAll(".radio__to");

const getIdForStep = (step) => `#${STEPS[step]}`;
export const getStepName = () => STEPS[step];

const addAndRemoveHidden = (lastStep, nextStep) => {
  element(lastStep).setAttribute("hidden", "");
  element(nextStep).removeAttribute("hidden");
  element(
    ".side"
  ).style.backgroundImage = `url(../images/sign-up__${step}.jpg)`;
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

const toggleButton = (action) => {
  const NEXT_STEP_BUTTON = "#next-btn";
  const button = {
    next: {
      third: function enableBackButton() {
        element(BACK_STEP_BUTTON).disabled = false;
      },
      seventh: function disableNextButton() {
        element(NEXT_STEP_BUTTON).disabled = true;
      },
    },
    back: {
      second: function disableBackButton() {
        element(BACK_STEP_BUTTON).disabled = true;
      },
      sixth: function enableNextButton() {
        element(NEXT_STEP_BUTTON).disabled = false;
      },
    },
  };
  const buttonActionForStep = button?.[action]?.[STEPS[step]];
  if (buttonActionForStep) buttonActionForStep();
};

function nextStep(e) {
  e.preventDefault();

  const LAST_STEP = step === 6;
  if (LAST_STEP) return;

  if (ValidFormStep(STEPS[step])) {
    step++;
    const lastStep = getIdForStep(step - 1);
    const nextStep = getIdForStep(step);
    toggleButton("next");
    addAndRemoveHidden(lastStep, nextStep);

    setRadioStep();


    if (step >= 2) {
      element(".side__content").classList.add("change__point");
      element(`#to-${step}`).checked = true;
    } else {
      element(".side__content").classList.remove("change__point");
    }
  }
}
element(SIGNUP_FORM).addEventListener("submit", nextStep);

function backStep(e) {
  e.preventDefault();

  step--;
  const lastStep = getIdForStep(step + 1);
  const nextStep = getIdForStep(step);
  toggleButton("back");
  addAndRemoveHidden(lastStep, nextStep);

  setRadioStep();
}
element(BACK_STEP_BUTTON).addEventListener("click", backStep);
