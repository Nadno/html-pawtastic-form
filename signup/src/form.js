import {
  setErrorFor,
  setErrorForCustomSelect,
  unsetErrorFor,
  unsetErrorForCustomSelect,
} from "./setError.js";

const data = {
  email: "",
  password: "",
  confirm: "",
  policy: false,

  third: {
    firstName: "",
    lastName: "",
    phone: "",
    altPhone: "",
    cpf: "",
  },

  fourth: {
    petType: "",
  },

  fifth: {
    petName: "",
    petPhoto: "",
    petBreed: "",
    petBirthDay: "",
    petGender: "",
    petSpayedOrNeutered: false,
    petWeight: "",
  },

  sixth: {
    favoriteThings: {
      givingKisses: false,
      walks: false,
      barking: false,
      snuggling: false,
      treats: false,
      playingFetch: false,
      naps: false,
      toys: false,
    },
    additionalInformation: "",
  },
};

export const setForm = ({ field, value }) => {
  data[field] = value;
  console.log(`***${field}: `, data[field]);
};

const patternFor = {
  email: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/,
  confirm: /^[a-zA-Z-0-9]{6,30}$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
  phone: /\d{2}\s\9\d{4}\-\d{4}/,
};

const NOT_NULLS = [
  "email",
  "excluir-password",
  "excluir-confirm",
  "policy",
  "firstName",
  "lastName",
  "phone",
  "cpf",
  "excluir-petType",
  "petName",
  "excluir-gender",
];
const notNull = (value) => () => value.trim() !== "";
const validPattern = (pattern, value) => () => new RegExp(pattern).test(value);

const inputNameToVarName = (namePart, index) => {
  if (index > 0) return namePart[0].toUpperCase() + namePart.slice(1);
  return namePart;
};
export const getVarName = (field) =>
  field.split("-").map(inputNameToVarName).join("");

const removeDuplicates = (list) => Array.from(new Set(list));
const getInputNames = (fields) =>
  removeDuplicates(fields.map(({ name, id }) => ({ name, id })));

export function checkStepValues(step) {
  const fields = Array.from(
    document.querySelector(step).querySelectorAll("input")
  );
  const names = getInputNames(fields);

  console.log(names);
  // names.forEach((name) => {
  //   console.log(`***${name}: `, data[getVarName(name)]);
  //   if (Validation[name]) {
  //     console.log(`***${getVarName(name)}: `, Validation[name](name));
  //   } else {
  //     console.log("***default: ", Validation.default(name));
  //   }
  // });
}

function validTests(tests) {
  for (let [valid, error, field] of tests) {
    if (!valid()) {
      return {
        error,
        field,
      };
    }
  }
  return true;
}

const Validation = {
  policy: function (input, name) {
    if (input.checked) {
      return true;
    }
    return {
      field: input.id,
      error: "off",
    };
  },

  petType: function (input, name) {
    const TYPES = ["dog", "cat", "birdy", "hamster"];
    if (TYPES.includes(input.value)) {
      return true;
    }
    return {
      inputType: "customSelect",
      field: input.name,
      error: "invalid",
    };
  },

  petSex: function (input, name) {
    const TYPES = ["male", "female"];
    if (TYPES.includes(input.value)) {
      return true;
    }
    return {
      inputType: "customSelect",
      field: input.name,
      error: "invalid",
    };
  },

  petSpayedOrNeutered: function (input, name) {
    const TYPES = ["true", "false"];
    if (TYPES.includes(input.value)) {
      return true;
    }
    return {
      inputType: "customSelect",
      field: input.name,
      error: "invalid",
    };
  },

  petWeight: function (input, name) {
    const TYPES = ["5/10", "10/15", "15/20", "20/25"];
    if (TYPES.includes(input.value)) {
      return true;
    }
    return {
      inputType: "customSelect",
      field: input.name,
      error: "invalid",
    };
  },

  petPhoto: function (input, name) {},

  altPhone: function (input, name) {
    const HAS_VALUE = input.value.length > 0;
    if (HAS_VALUE && validPattern(patternFor["phone"], input.value)()) {
      return true;
    } else {
      return {
        field: input.id,
        error: "invalid",
      };
    }
  },

  default: function (input, name) {
    if (NOT_NULLS.includes(name)) {
      const tests = [[notNull(input.value), "empty", input.id]];
      if (patternFor[name])
        tests.push([
          validPattern(patternFor[name], input.value),
          "invalid",
          input.id,
        ]);
      return validTests(tests);
    }
    return true;
  },
};

export default Validation;
