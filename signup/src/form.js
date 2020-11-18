import { setErrorFor, unsetErrorFor } from "./setError.js";

const formData = {
  email: "",
  password: "",
  confirm: "",
  policy: false,

  firstName: "",
  lastName: "",
  phone: "",
  altPhone: "",
  cpf: "",

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

function validTests([valid, error, field]) {
  if (!valid()) {
    setErrorFor(field, error);
    return false;
  }
  unsetErrorFor(field);
  return true;
}

const Validation = {
  policy: function (input, name) {
    formData[name] = input.checked;
    if (input.checked) {
      unsetErrorFor(input.id);
      return true;
    };
    setErrorFor(input.id, "off");
  },

  petType: function (input, field) {
    const TYPES = ["dog", "cat", "birdy", "hamster"];
    if (TYPES.includes(input.value)) {
      console.log("ok");
    }
  },

  petPhoto: function (input, name) {},

  altPhone: function (input, name) {
    const HAS_VALUE = input.value.length > 0;
    if (HAS_VALUE) {
      if (validPattern(patternFor["phone"], input.value)()) {
        unsetErrorFor(input.id);
        return true;
      }
      setErrorFor(input.id, "invalid");
    } else {
      unsetErrorFor(input.id);
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
      return tests.every(validTests);
    }
  },
};

export default Validation;
