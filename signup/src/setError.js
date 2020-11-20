const getParent = (field) => document.querySelector(`#${field}`).parentNode;
const getSpanError = (field) => getParent(field).querySelector(".input__error");

export const toggleSpanError = ({ field, error, inputType }) => {
  const errorTo = {
    text: (action, text) => {
      getSpanError(field).innerHTML = text;
      getParent(field).classList[action]("error");
    },
    select: (action, text) => {
      const element = document.querySelector(`#${field}`);
      element.querySelector(".input__error").innerHTML = text;
      element.classList[action]("error");
    },
  };

  if (error) {
    errorTo[inputType]("add", `* ${customMessage(field, error)}`);
  } else {
    errorTo[inputType]("remove", "");
  }
};

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
      off: "This option is required",
    },
  };

  if (messages[field]) return messages[field][error];
  return messages["default"][error];
}
