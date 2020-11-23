"use strict";
import Validation, { setForm } from "./form.js";
import { toggleSpanError } from "./setError.js";

const STEPS_ID = [
  "#first",
  "#second",
  "#third",
  "#fourth",
  "#fifth",
  "#sixth",
  "#seventh",
];
const MAX_STEPS = 7;
let step = 0;

const radiosTo = document.querySelectorAll(".radio__to");

const inputNameToVarName = (namePart, index) => {
  if (index > 0) return namePart[0].toUpperCase() + namePart.slice(1);
  return namePart;
};

export const getVarName = (field) =>
  field.split("-").map(inputNameToVarName).join("");

const element = (name) => document.querySelector(name);
const addAndRemoveHidden = (lastStep, nextStep) => {
  element(lastStep).setAttribute("hidden", "");
  element(nextStep).removeAttribute("hidden");
  element("#pet-slide").src = `../images/sign-up__${step}.jpg`;
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

const change = {
  1: () => element(STEPS_ID[step]).parentNode.removeAttribute("hidden"),
  2: (toggle = "add") => {
    element("footer").classList[toggle]("change__point");
    element(".side__content").classList[toggle]("change__point");
  },
};

function nextStep(e) {
  e.preventDefault();
  if (step === MAX_STEPS) {
    return;
  }

  step++;
  const lastStep = STEPS_ID[step - 1];
  const nextStep = STEPS_ID[step];
  addAndRemoveHidden(lastStep, nextStep);

  if (change[step]) change[step]();
  setRadioStep();
}

function backStep(e) {
  e.preventDefault();

  step--;
  const lastStep = STEPS_ID[step + 1];
  const nextStep = STEPS_ID[step];
  addAndRemoveHidden(lastStep, nextStep);

  if (step === 1) change["2"]("remove");
  setRadioStep();
}

element(".zip-code").addEventListener("submit", nextStep);
element(".sign-up").addEventListener("submit", (e) => {
  if (step !== MAX_STEPS) return nextStep(e);
});
element("#back-btn").addEventListener("click", backStep);

const inputs = element(".sign-up").querySelectorAll("input");

const isString = (value) => () => typeof value === "string";

for (let input of inputs) {
  const name = getVarName(input.name);
  const field = { id: input.id, name: input.name, varName: name };
  let validate;

  if (Validation[name]) {
    validate = Validation[name];
  } else {
    validate = Validation.default;
  }

  input.addEventListener("blur", ({target}) => {
    setForm({ field: name, input: target, });
    
    const result = validate(name);
    result.inputType = input.type;
 
    if (result.ok) return toggleSpanError(result, field);
    
    toggleSpanError(result, field);
  });
}
