import { useState, useEffect } from "react";

export default function useValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

useEffect(() => {
    const isAllFieldsValid = Object.values(errors).every((error) => error === "");
    const areAllFieldsFilled = Object.values(values).every((value) => value !== "");
    setIsValid(isAllFieldsValid && areAllFieldsFilled);
  }, [values, errors]);
  

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((error) => ({ ...error, [name]: e.target.validationMessage }));
  };

  const resetValidation = (values = {}, errors = {}) => {
    setValues(values);
    setErrors(errors);
  };

  return {
    values,
    errors,
    isValid,
    onChange,
    setValues,
    resetValidation,
  };
}
