export default function checkInputValidity(formElement) {
  const { validation, value } = formElement;
  let error = [true, ""];

  if (validation.isEmail) {
    const re = /\S+@\S+\.\S+/; //really simple regex validation!
    const isValid = re.test(value);
    const msg = `${!isValid ? "Please enter a valid email." : ""}`;
    error = !isValid ? [isValid, msg] : error;
  }
  if (validation.minLength) {
    const isValid = value.length >= validation.minLength;
    const msg = `${!isValid ? "Password must be at least 4 characters" : ""}`;
    error = !isValid ? [isValid, msg] : error;
  }
  if (validation.required) {
    const isValid = value.trim() !== "";
    const msg = `${!isValid ? "This field is required." : ""}`;
    error = !isValid ? [isValid, msg] : error;
  }
  formElement.touched = true;
  formElement.valid = error[0];
  formElement.validationMsg = error[1];

  return formElement;
}
