import { useState } from "react";

export default function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);

  const onChange = (e) => {
    const { name, value, form } = e.target;
    const valid = e.target.validity.valid;
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((error) => ({ ...error, [name]: e.target.validationMessage }));
    setIsInputValid((validity) => ({...validity, [name]: valid}))
    setIsValid(form.checkValidity());
  };

  const resetValidation = (values = {}, errors = {}) => {
    setValues(values);
    setErrors(errors);
  };

  return {
    values,
    errors,
    isValid,
    isInputValid,
    onChange,
    setValues,
    resetValidation,
  };
}
