import { getStepName } from "./script.js";
import { setInputError, unsetInputError } from "./setError.js";
import {
  biggerOrEqualThan,
  lessOrEqualThan,
  notNull,
  isEqual,
  validPattern,
} from "./validData.js";

const signUpData = {
  email: "",
  password: "",
  confirm: "",
  policy: "",
  firstName: "",
  lastName: "",
  phone: "",
  altPhone: "",
  cpf: "",
  petType: "",
  petName: "",
  petBreed: "",
  petGender: "",
  petBirthDay: "",
  petSpayedOrNeutered: "",
  petWeight: "",
  favoriteThings: {
    kisses: false,
    walk: false,
    barking: false,
    snuggling: false,
    treats: false,
    playingFetch: false,
    naps: false,
    toys: false,
  },
  petDetail: "",
};

const inputNameToVarName = (namePart, index) => {
  if (index > 0) return namePart[0].toUpperCase() + namePart.slice(1);
  return namePart;
};

export const getVarName = (field) =>
  field.split("-").map(inputNameToVarName).join("");

const patternFor = {
  email: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/,
  password: /^[a-zA-Z-0-9]{6,30}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
  phone: /\d{2}\s\9\d{4}\-\d{4}/,
};

const NOT_NULLS = [
  "email",
  "policy",
  "firstName",
  "lastName",
  "phone",
  "cpf",
  "petName",
];
const CUSTOM_SELECTS = [
  "petType",
  "petSpayedOrNeutered",
  "petWeight",
  "petGender",
];

const ERROR = {
  INVALID: "invalid",
  OFF: "off",
  EMPTY: "empty",
  NOT_EQUAL: "notEqual",
};

const createResult = (error) =>
  error
    ? {
        ok: false,
        action: setInputError,
        error,
      }
    : {
        ok: true,
        action: unsetInputError,
      };

function validTests(tests) {
  for (let [valid, error] of tests) {
    if (!valid()) {
      return createResult(error);
    }
  }
  return createResult();
}

function validTextInput(name) {
  const tests = [[notNull(signUpData[name]), ERROR.EMPTY]];

  if (patternFor[name])
    tests.push([
      validPattern(patternFor[name], signUpData[name]),
      ERROR.INVALID,
    ]);
  return validTests(tests);
}

function validCustomSelect(name) {
  const TYPES = {
    petType: ["dog", "cat", "birdy", "hamster"],
    petGender: ["male", "female"],
    petSpayedOrNeutered: ["true", "false"],
    petWeight: ["5/10", "10/15", "15/20", "20/25"],
  };

  if (TYPES[name].includes(signUpData[name])) return createResult();
  return createResult(ERROR.INVALID);
}

const Validation = {
  policy: function () {
    if (signUpData.policy) {
      return createResult();
    }
    return createResult(ERROR.OFF);
  },

  password: function () {
    const tests = [
      [notNull(signUpData.password), ERROR.EMPTY],
      [validPattern(patternFor.password, signUpData.password), ERROR.INVALID],
    ];

    return validTests(tests);
  },

  confirm: function () {
    const tests = [
      [notNull(signUpData.password), ERROR.EMPTY],
      [isEqual(signUpData.password, signUpData.confirm), ERROR.NOT_EQUAL],
    ];

    return validTests(tests);
  },

  petBirthDay: function () {
    const [year] = signUpData.petBirthDay.split("-");
    const MIN_YEAR = biggerOrEqualThan(year, 1950);
    const MAX_YEAR = lessOrEqualThan(year, 2020);

    if (!MIN_YEAR()) return createResult(ERROR.INVALID);
    if (!MAX_YEAR()) return createResult(ERROR.INVALID);

    return createResult();
  },

  petPhoto: function () {},

  altPhone: function () {
    const HAS_VALUE = signUpData.altPhone.length > 0;
    if (HAS_VALUE) {
      if (validPattern(patternFor["phone"], signUpData.altPhone)()) {
        return createResult();
      } else {
        return createResult(ERROR.INVALID);
      }
    }

    return createResult();
  },

  default: function (name) {
    if (NOT_NULLS.includes(name)) {
      return validTextInput(name);
    } else if (CUSTOM_SELECTS.includes(name)) {
      return validCustomSelect(name);
    }

    return createResult();
  },
};

const getStepInputs = (step) => {
  const inputFor = {
    first: ["zip-code"],
    second: ["email", "password", "confirm", "policy"],
    third: ["first-name", "last-name", "phone", "alt-phone", "cpf"],
    fourth: ["pet-type"],
    fifth: ["pet-name", "pet-gender", "pet-spayed-or-neutered", "pet-weight"],
  };
  return inputFor[step];
};

const validInputs = (inputs) => {
  let oks = [];

  for (let inputName of inputs) {
    const name = getVarName(inputName);
    const result = Validation[name]
      ? Validation[name]()
      : Validation.default(name);

    result.field = inputName;
    result.action(result);

    oks.push(result.ok);
  }

  return oks.every((ok) => ok);
};

export const checkFormStep = (step) => validInputs(getStepInputs(step));

export default signUpData;
