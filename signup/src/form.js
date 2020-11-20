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

const createError = (field) => ({
  inputType: "select",
  error: "invalid",
  field,
  ok: false,
});

const notNull = (value) => () => value.trim() !== "";
const validPattern = (pattern, value) => () => new RegExp(pattern).test(value);

const inputNameToVarName = (namePart, index) => {
  if (index > 0) return namePart[0].toUpperCase() + namePart.slice(1);
  return namePart;
};
export const getVarName = (field) =>
  field.split("-").map(inputNameToVarName).join("");


function validTests(tests, field) {
  let result = {
    inputType: "text",
    field,
    ok: true,
  };

  for (let [valid, error] of tests) {
    if (!valid()) {
      Object.assign(result, {
        error,
        ok: false,
      });
      return result;
    }
  }

  return result;
}

const Validation = {
  policy: function (input, name) {
    if (input.checked) {
      return {
        inputType: "check",
        field: input.id,
        ok: true,
      };
    }
    return {
      inputType: "check",
      field: input.id,
      error: "off",
    };
  },

  petType: function (input, name) {
    const TYPES = ["dog", "cat", "birdy", "hamster"];
    if (TYPES.includes(input.value)) {
      return {
        inputType: "select",
        field: input.name,
        ok: true,
      };
    }
    return createError(input.name);
  },

  petSex: function (input, name) {
    const TYPES = ["male", "female"];
    if (TYPES.includes(input.value)) {
      return {
        inputType: "select",
        field: input.name,
        ok: true,
      };
    }
    return createError(input.name);
  },

  petSpayedOrNeutered: function (input, name) {
    const TYPES = ["true", "false"];
    if (TYPES.includes(input.value)) {
      return {
        inputType: "select",
        field: input.name,
        ok: true,
      };
    }
    return createError(input.name);
  },

  petWeight: function (input, name) {
    const TYPES = ["5/10", "10/15", "15/20", "20/25"];
    if (TYPES.includes(input.value)) {
      return {
        inputType: "select",
        field: input.name,
        ok: true,
      };
    }
    return createError(input.name);
  },

  petPhoto: function (input, name) {},

  altPhone: function (input, name) {
    const HAS_VALUE = input.value.length > 0;
    const result = {
      inputType: "text",
      field: input.name,
      ok: true,
    };

    if (HAS_VALUE) {
      if (validPattern(patternFor["phone"], input.value)()) {
        return result;
      } else {
        result.error = "invalid";
        result.ok = false;
        return result;
      }
    }
    return result;
  },

  default: function (input, name) {
    if (NOT_NULLS.includes(name)) {
      const tests = [[notNull(input.value), "empty"]];
      if (patternFor[name])
        tests.push([validPattern(patternFor[name], input.value), "invalid"]);
      return validTests(tests, input.id);
    }

    return {
      inputType: "text",
      ok: true,
    };
  },
};

export default Validation;
