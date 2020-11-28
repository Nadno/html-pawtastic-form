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
  confirm: /^[a-zA-Z-0-9]{6,30}$/,
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

const ERROR = {
  INVALID: "invalid",
  OFF: "off",
  EMPTY: "empty",
};

const createResult = (error) => {
  const result = {
    ok: false,
  };

  if (error) {
    result.error = error;
  } else {
    result.ok = true;
  }

  return result;
};

function validTests(tests) {
  for (let [valid, error] of tests) {
    if (!valid()) {
      return createResult(error);
    }
  }
  return createResult();
}

const Validation = {
  policy: function (name) {
    if (signUpData[name]) {
      return createResult();
    }
    return createResult(ERROR.OFF);
  },

  petBirthDay: function (name) {
    const [year] = signUpData[name].split("-");
    const MIN_YEAR = biggerOrEqualThan(year, 1950);
    const MAX_YEAR = lessOrEqualThan(year, 2020);

    if (!MIN_YEAR()) return createResult(ERROR.INVALID);
    if (!MAX_YEAR()) return createResult(ERROR.INVALID);

    return createResult();
  },

  petType: function (name) {
    const TYPES = ["dog", "cat", "birdy", "hamster"];
    if (TYPES.includes(signUpData[name])) {
      return createResult();
    }
    return createResult(ERROR.INVALID);
  },

  petGender: function (name) {
    const TYPES = ["male", "female"];
    if (TYPES.includes(signUpData[name])) {
      return createResult();
    }
    return createResult(ERROR.INVALID);
  },

  petSpayedOrNeutered: function (name) {
    const TYPES = ["true", "false"];
    if (TYPES.includes(signUpData[name])) {
      return createResult();
    }
    return createResult(ERROR.INVALID);
  },

  petWeight: function (name) {
    const TYPES = ["5/10", "10/15", "15/20", "20/25"];
    if (TYPES.includes(signUpData[name])) {
      return createResult();
    }
    return createResult(ERROR.INVALID);
  },

  petPhoto: function (name) {},

  altPhone: function (name) {
    const HAS_VALUE = signUpData[name].length > 0;
    if (HAS_VALUE) {
      if (validPattern(patternFor["phone"], signUpData[name])()) {
        return createResult();
      } else {
        return createResult(ERROR.INVALID);
      }
    }

    return createResult();
  },

  default: function (name) {
    if (NOT_NULLS.includes(name)) {
      const tests = [[notNull(signUpData[name]), ERROR.EMPTY]];

      if (patternFor[name])
        tests.push([
          validPattern(patternFor[name], signUpData[name]),
          ERROR.INVALID,
        ]);
      return validTests(tests);
    }

    return createResult();
  },
};

const getStepInputs = (step) => {
  const inputFor = {
    first: ["zip-code"],
    second: ["email", "policy"],
    third: ["first-name", "last-name", "phone", "alt-phone", "cpf"],
    fourth: ["pet-type"],
    fifth: ["pet-name", "pet-gender", "pet-spayed-or-neutered", "pet-weight"],
  };
  return inputFor[step];
};

export const checkFormStep = (step) => {
  let result;
  getStepInputs(step).forEach((inputName) => {
    const name = getVarName(inputName);

    if (Validation[name]) {
      result = Validation[name](name);
    } else {
      result = Validation.default(name);
    }

    result.field = inputName;
    if (result.ok) {
      unsetInputError(inputName);
    } else {
      setInputError(result);
    }
  });

  return result.ok;
};

export default signUpData;
