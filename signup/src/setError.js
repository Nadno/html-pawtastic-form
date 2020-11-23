import { getVarName } from "./script.js";

const getParent = (field) => document.querySelector(`#${field}`).parentNode;
const getSpanError = (field) => getParent(field).querySelector(".input__error");

export const toggleSpanError = ({ error, inputType }, field) => {
  const errorTo = (to, { action, text }) => {
    const CUSTOM_SELECT = "radio";

    switch (to) {
      case CUSTOM_SELECT: {
        const element = document.querySelector(`#${field.name}`);
        element.querySelector(".input__error").innerHTML = text;
        element.classList[action]("error");
        break;
      }
      default: {
        getSpanError(field.id).innerHTML = text;
        getParent(field.id).classList[action]("error");
        break;
      }
    }
  };

  if (error) {
    errorTo(inputType, {
      action: "add",
      text: `*${customMessage(field.varName, error)}`,
    });
  } else if (field) {
    errorTo(inputType, { action: "remove", text: "" });
  }
};

function customMessage(field, error) {
  const messages = {
    default: {
      empty: "Required",
      invalid: "Invalid",
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
