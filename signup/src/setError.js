const getParent = (field) => document.querySelector(`#${field}`).parentNode;
const getSpanError = (field) => getParent(field).querySelector(".input__error");

export const setInputError = ({ error, field }) => {
  getSpanError(field).innerHTML = 
    `*${customMessage(field, error)}`;
  getParent(field).classList.add("error");
};

export const unsetInputError = ({ field }) => {
  getSpanError(field).innerHTML = "";
  getParent(field).classList.remove("error");
};

function customMessage(field, error) {
  const messages = {
    default: {
      empty: "Required",
      invalid: "Invalid",
    },
    confirm: {
      notEqual: "The passwords is not equal",
    },
    password: {
      invalid: "Minimum 3 figures, only with letters and numbers"
    },
    policy: {
      off: "This option is required",
    },
  };

  if (messages[field]?.[error]) return messages[field][error];
  return messages.default[error];
}
