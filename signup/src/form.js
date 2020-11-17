const formData = {
  second: {
    email: "",
    password: "",
    confirm: "",
    policy: false,
  },

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
  }
};

const NOT_NULLS = [
  "email",
  "password",
  "confirm",
  "policy",
  "firstName",
  "lastName",
  "phone",
  "cpf",
  "petType",
  "petName",
  "petBreed",
  "gender",
];

const validation = {
  default: function(value, field) {

  },

  notNull: function(value, field) {

  }
};