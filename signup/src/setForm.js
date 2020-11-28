import element from "./getElements.js";
import signUpData, { getVarName } from "./form.js";

const invalidField = (field) =>
  signUpData?.[field] === undefined || signUpData?.[field] === null;

export const setForm = ({ target }) => {
  const name = getVarName(target.name);
  if (invalidField(name)) return;

  if (target.type === "checkbox") {
    signUpData[name] = target.checked;
  } else {
    signUpData[name] = target.value;
  }
};

const inputs = element(".sign-up").querySelectorAll("input");
for (let input of inputs) {
  if (input.name === "favorite-things") continue;
  input.addEventListener("change", setForm);
}

const invalidFavoriteField = (field) =>
  signUpData.favoriteThings?.[field] === undefined ||
  signUpData.favoriteThings?.[field] === null;

const setAllFavoriteThings = (target) => {
  Object.keys(signUpData.favoriteThings).forEach((key) => {
    signUpData.favoriteThings[key] = target.checked;
  });

  favoritesInputs.forEach((input) => {
    if (input.name !== "all") input.checked = target.checked;
  });
};

const setFavoriteThings = ({ target }) => {
  if (target.id === "select-all") return setAllFavoriteThings(target);

  const name = getVarName(target.id);
  if (invalidFavoriteField(name)) return;
  signUpData.favoriteThings[name] = target.checked;
};

const favoritesInputs = element("#sixth").querySelectorAll("input");
favoritesInputs.forEach((input) =>
  input.addEventListener("change", setFavoriteThings)
);

element("#pet-detail").addEventListener(
  "change",
  ({ target }) => (signUpData.petDetail = target.value)
);
