const convertBoolToNumber = (bool) => {
  return bool ? "1" : "0";
};

module.exports = {
  generateMask: function (options) {
    return `${convertBoolToNumber(options.country)}${convertBoolToNumber(
      options.city
    )}${convertBoolToNumber(options.server)}`;
  },
};
