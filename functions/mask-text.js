/**
 * Mask text
 * @param {string} maskType
 * @param {Function} onChangeText
 * @returns {Function}
 */
function maskText(maskType, onChangeText) {
  return function (text) {
    switch (maskType) {
      case "number":
        onChangeText(text.replace(/\D/g, ""));
        break;
      case "cpf":
        onChangeText(
          text
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1")
        );
        break;
      case "cnpj":
        onChangeText(
          text
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1")
        );
        break;
      case "phone":
        onChangeText(
          text
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
            .replace(/(-\d{4})\d+?$/, "$1")
        );
        break;
      case "cep":
        onChangeText(
          text
            .replace(/\D/g, "")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{3})\d+?$/, "$1")
        );
        break;
      case "data":
        onChangeText(
          text
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})\d+?$/, "$1")
        );
        break;
      case "money":
        onChangeText(
          text
            .replace(/\D/g, "")
            .replace(/^(\d{1})$/g, "0,0$1")
            .replace(/^(\d{2})$/g, "0,$1")
            .replace(/^(\d{1,})(\d{2})$/g, "$1,$2")
            .replace(/^00(,\d{2})$/g, "0$1")
            .replace(/^00(\d)(,\d{2})$/g, "$1$2")
            .replace(/^0(\d)(,\d{2})$/g, "$1$2")
            .replace(/^(\d{1,})(,\d{2})$/g, "R$ $1$2")
        );
        break;
      default:
        break;
    }
  };
}

module.exports = {
  maskText,
};
