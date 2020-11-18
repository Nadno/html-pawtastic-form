const getParent = (field) =>
  document.querySelector(`#${field}`).parentNode;
const getSpanError = (field) =>
  getParent(field).querySelector(".input__error");

export const setErrorFor = (field, error) => {
  getSpanError(field).innerHTML = "*" + customMessage(field, error);
  getParent(field).classList.add("error");
};

export const unsetErrorFor = (field) => {
  getSpanError(field).innerHTML = "";
  getParent(field).classList.remove("error");
};

export const setErrorForCustomSelect = (name, error) => {
  const element = document.querySelector(`#${name}`);
  element.querySelector(".input__error").innerHTML = "*" + customMessage(name, error);
  element.classList.add("error");
};

export const unsetErrorForCustomSelect = (name) => {
  const element = document.querySelector(`#${name}`);
  element.querySelector(".input__error").innerHTML = "";
  element.classList.remove("error");
}

function customMessage(field, error) {
  const messages = {
    default: {
      empty: "Required",
      invalid: "Invalid",
    },
    birth: {
      min: "O ano mínimo permitido é 1950",
      max: "Não pode escolher um ano a frente do atual",
      minYearsOld: "Você deve ter no mínimo 13 anos",
    },
    confirm: {
      empty: "Confirm your password",
      invalid: "min eight figures, without special characters",
      notEqual: "The passwords is not equal",
    },
    policy: {
      off: "This options is required",
    },
  };

  if (messages[field]) return messages[field][error];
  return messages["default"][error];
}