const validator = require("validator");

const validateArticle = (param) => {
  let validateTitle =
    !validator.isEmpty(param.title) &&
    validator.isLength(param.title, { min: 5, max: undefined });
  let validateContent = !validator.isEmpty(param.content);

  if (!validateTitle || !validateContent) {
    throw new Error("No se ha validado la información");
  }
};

module.exports = validateArticle;
