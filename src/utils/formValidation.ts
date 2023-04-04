const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[1-9])(?=.*[!@#$%]).{8,}$/;
const TODAY = new Date().toDateString();

const textInputValidation = (str: string) => !!(str && (str.length >= 2 && str.length < 25))

const dateInputValidation = (date: string) => !!(date && new Date(date).toDateString() < TODAY);
const emailInputValidation = (email: string) => !!(email && EMAIL_REGEXP.test(email));
const passwordValidation = (password: string) => !!(password && PASSWORD_REGEXP.test(password))
const passwordConfirmationValidation = (
  primaryPsw: string,
  confirmedPsw: string
) => !!( primaryPsw && confirmedPsw && (primaryPsw.localeCompare(confirmedPsw) === 0 ? true : false));

export {
  textInputValidation,
  dateInputValidation,
  passwordConfirmationValidation,
  emailInputValidation,
  passwordValidation
};
